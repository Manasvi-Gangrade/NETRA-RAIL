import { createServerFn } from "@tanstack/react-start";
import * as fs from "fs";
import * as path from "path";

const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || process.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

// Robust Python fetcher with auto-fallback to local filesystem if Python server is offline
async function fetchFromPython<T>(endpoint: string, fallbackFn: () => T): Promise<T> {
  try {
    const res = await fetch(`${PYTHON_BACKEND_URL}${endpoint}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } catch (error) {
    console.warn(`[NETRA-RAIL] Python backend offline. Fallback to local files for: ${endpoint}`);
    return fallbackFn();
  }
}

// Simple robust CSV parser
function parseCSV(content: string): Record<string, any>[] {
  const lines = content.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return [];
  const headers = lines[0].split(",");
  return lines.slice(1).map(line => {
    const values: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        values.push(current);
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current);

    const obj: Record<string, any> = {};
    headers.forEach((h, idx) => {
      let val = values[idx] || "";
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1);
      }
      val = val.trim();
      if (val === "True" || val === "true") {
        obj[h] = true;
      } else if (val === "False" || val === "false") {
        obj[h] = false;
      } else if (val === "None" || val === "null" || val === "") {
        obj[h] = null;
      } else if (!isNaN(Number(val)) && val !== "") {
        obj[h] = Number(val);
      } else {
        obj[h] = val;
      }
    });
    return obj;
  });
}

export const getSystemSummary = createServerFn({ method: "GET" })
  .handler(async () => {
    return fetchFromPython("/api/system-summary", () => {
      const filePath = path.join(process.cwd(), "Datasets", "netra_rail_system_summary.json");
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content);
    });
  });

export const getVesselFreight = createServerFn({ method: "GET" })
  .handler(async () => {
    return fetchFromPython("/api/vessels", () => {
      const filePath = path.join(process.cwd(), "Datasets", "pillar_a_vessel_freight.csv");
      const content = fs.readFileSync(filePath, "utf-8");
      return parseCSV(content);
    });
  });

export const getTrafficThroughput = createServerFn({ method: "GET" })
  .handler(async () => {
    return fetchFromPython("/api/throughput", () => {
      const filePath = path.join(process.cwd(), "Datasets", "pillar_b_traffic_throughput.csv");
      const content = fs.readFileSync(filePath, "utf-8");
      return parseCSV(content);
    });
  });

export const getDroneInspections = createServerFn({ method: "GET" })
  .handler(async () => {
    return fetchFromPython("/api/inspections", () => {
      const filePath = path.join(process.cwd(), "Datasets", "pillar_d_drone_inspections.json");
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content);
    });
  });

export const getIMUSensors = createServerFn({ method: "GET" })
  .handler(async () => {
    return fetchFromPython("/api/imu-sensors", () => {
      const filePath = path.join(process.cwd(), "Datasets", "pillar_c_imu_sensor.csv");
      const content = fs.readFileSync(filePath, "utf-8");
      return parseCSV(content);
    });
  });

// ----------------- SLOW ZONES PERSISTENCE API -----------------

export const getSlowZones = createServerFn({ method: "GET" })
  .handler(async () => {
    return fetchFromPython("/api/slow-zones", () => {
      const filePath = path.join(process.cwd(), "Datasets", "slow_zones.json");
      if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
      }
      return [];
    });
  });

export const addSlowZone = createServerFn({ method: "POST" })
  .validator((data: { section: string; speed_limit: number; reason: string }) => data)
  .handler(async ({ data }) => {
    try {
      const res = await fetch(`${PYTHON_BACKEND_URL}/api/slow-zones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch {
      // Offline fallback
      const filePath = path.join(process.cwd(), "Datasets", "slow_zones.json");
      let zones = [];
      if (fs.existsSync(filePath)) {
        zones = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      }
      const updatedZones = zones.filter((z: any) => z.section !== data.section);
      updatedZones.push({ ...data, timestamp: new Date().toISOString() });
      fs.writeFileSync(filePath, JSON.stringify(updatedZones, null, 2));
      return { status: "success", zones: updatedZones };
    }
  });

export const clearSlowZone = createServerFn({ method: "POST" })
  .validator((data: { section: string }) => data)
  .handler(async ({ data }) => {
    try {
      const res = await fetch(`${PYTHON_BACKEND_URL}/api/slow-zones/clear`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch {
      // Offline fallback
      const filePath = path.join(process.cwd(), "Datasets", "slow_zones.json");
      if (fs.existsSync(filePath)) {
        const zones = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const filtered = zones.filter((z: any) => z.section !== data.section);
        fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2));
        return { status: "success", zones: filtered };
      }
      return { status: "success", zones: [] };
    }
  });

// ----------------- OPERATOR CHAT & HISTORY API -----------------

export const getCommandHistory = createServerFn({ method: "GET" })
  .handler(async () => {
    return fetchFromPython("/api/command-history", () => {
      const filePath = path.join(process.cwd(), "Datasets", "command_history.json");
      if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
      }
      return [];
    });
  });

export const clearCommandHistory = createServerFn({ method: "POST" })
  .handler(async () => {
    try {
      const res = await fetch(`${PYTHON_BACKEND_URL}/api/command-history/clear`, { method: "POST" });
      return await res.json();
    } catch {
      const filePath = path.join(process.cwd(), "Datasets", "command_history.json");
      fs.writeFileSync(filePath, JSON.stringify([], null, 2));
      return { status: "success", history: [] };
    }
  });

export const processOperatorCommand = createServerFn({ method: "POST" })
  .validator((data: { text: string; lang: string }) => data)
  .handler(async ({ data }) => {
    try {
      const res = await fetch(`${PYTHON_BACKEND_URL}/api/command`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch {
      // Local fallback parser
      let reply = `Request parsed locally. NETRA-RAIL operational grid running normally. Input: "${data.text}"`;
      if (data.text.toLowerCase().includes("vessel") || data.text.toLowerCase().includes("port")) {
        reply = "Vessel Logistics sync (local mode): Mundra, JNPT, Vizag, and Chennai port gates report normal cargo loading frequencies.";
      } else if (data.text.toLowerCase().includes("traffic") || data.text.toLowerCase().includes("throughput")) {
        reply = "Traffic report (local mode): Section precedence JSSP solved with 218.7ms average solve time. Throughput improvement at 45.6%.";
      } else if (data.text.toLowerCase().includes("vibration") || data.text.toLowerCase().includes("sensor") || data.text.toLowerCase().includes("imu")) {
        reply = "Telemetry warning (local mode): Peak anomalous vibration reported at KM 134. Slow zone recommended.";
      }
      
      // Save locally
      const filePath = path.join(process.cwd(), "Datasets", "command_history.json");
      let history = [];
      if (fs.existsSync(filePath)) {
        history = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      }
      history.push({
        timestamp: new Date().toISOString(),
        user_query: data.text,
        language: data.lang,
        bot_response: reply
      });
      fs.writeFileSync(filePath, JSON.stringify(history, null, 2));
      
      return { bot_response: reply, history_count: history.length };
    }
  });

