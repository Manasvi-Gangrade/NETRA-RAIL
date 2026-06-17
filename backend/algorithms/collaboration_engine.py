"""
NETRA-RAIL Live Collaboration & Non-Disruptive Update Engine
Handles multi-operator synchronization, background slow zone advisories, and state persistence.
"""

import json
import os
from datetime import datetime
from typing import Dict, List, Any

class CollaborationSyncEngine:
    def __init__(self, data_dir: str):
        self.data_dir = data_dir

    def _get_path(self, filename: str) -> str:
        return os.path.join(self.data_dir, filename)

    def load_json(self, filename: str, default_val: Any) -> Any:
        path = self._get_path(filename)
        if os.path.exists(path):
            try:
                with open(path, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception:
                return default_val
        return default_val

    def save_json(self, filename: str, data: Any) -> None:
        path = self._get_path(filename)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

    def get_live_stream_state(self) -> Dict[str, Any]:
        history = self.load_json("command_history.json", [])
        slow_zones = self.load_json("slow_zones.json", [])
        return {
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "active_operators_online": 4,
            "slow_zones_count": len(slow_zones),
            "slow_zones": slow_zones,
            "history": history,
            "latest_transaction": history[-1] if history else None,
            "protocol": "Python Real-Time Non-Disruptive Sync"
        }

    def trigger_remote_simulation(self) -> Dict[str, Any]:
        history = self.load_json("command_history.json", [])
        slow_zones = self.load_json("slow_zones.json", [])

        sec_num = (len(history) % 10) + 1
        operators = ["Station Master (Surat)", "Port Logistics Dispatcher (Mundra)", "Garun Drone Operator #3", "JSSP Traffic Coordinator (Vadodara)"]
        op_name = operators[len(history) % len(operators)]

        action = f"Remote Override: {op_name} updated Section {sec_num} speed restriction"
        query = f"[Remote - {op_name}] Enforce safety speed limit 30 km/h on Section {sec_num}"
        reply = f"Remote directive synced. Enforced safety speed limit on Section {sec_num}. Shared live grid state updated across all terminals."

        slow_zones.append({
            "section": f"Section {sec_num}",
            "speed_limit": 30,
            "reason": f"Updated remotely by {op_name}",
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })
        self.save_json("slow_zones.json", slow_zones)

        entry = {
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "user_query": query,
            "language": "English (Remote Sync)",
            "bot_response": reply,
            "action_triggered": action
        }
        history.append(entry)
        self.save_json("command_history.json", history)

        return {
            "status": "success",
            "entry": entry,
            "operator": op_name,
            "total_history": len(history)
        }
