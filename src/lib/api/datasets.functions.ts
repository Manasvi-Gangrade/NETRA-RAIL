import { createServerFn } from "@tanstack/react-start";
import * as fs from "fs";
import * as path from "path";

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
    const filePath = path.join(process.cwd(), "Datasets", "netra_rail_system_summary.json");
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  });

export const getVesselFreight = createServerFn({ method: "GET" })
  .handler(async () => {
    const filePath = path.join(process.cwd(), "Datasets", "pillar_a_vessel_freight.csv");
    const content = fs.readFileSync(filePath, "utf-8");
    return parseCSV(content);
  });

export const getTrafficThroughput = createServerFn({ method: "GET" })
  .handler(async () => {
    const filePath = path.join(process.cwd(), "Datasets", "pillar_b_traffic_throughput.csv");
    const content = fs.readFileSync(filePath, "utf-8");
    return parseCSV(content);
  });

export const getDroneInspections = createServerFn({ method: "GET" })
  .handler(async () => {
    const filePath = path.join(process.cwd(), "Datasets", "pillar_d_drone_inspections.json");
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  });

export const getIMUSensors = createServerFn({ method: "GET" })
  .handler(async () => {
    const filePath = path.join(process.cwd(), "Datasets", "pillar_c_imu_sensor.csv");
    const content = fs.readFileSync(filePath, "utf-8");
    return parseCSV(content);
  });
