# NETRA-RAIL Full-Stack Python Integration Guide

NETRA-RAIL has been upgraded with a fully functional **FastAPI (Python)** backend! 

This architecture connects your React frontend with a high-performance Python data service that loads, queries, and filters the rail dataset CSVs using `pandas` dynamically.

---

## 🚀 How to Start the Python Backend

We have created a one-click launcher for Windows.

1. **Launch the Backend**:
   * Double-click on `run_python_backend.bat` in the root folder of the project.
   * This batch file will automatically:
     * Check if Python is installed.
     * Create a isolated virtual environment (`backend/.venv`).
     * Install the required dependencies (`fastapi`, `uvicorn`, `pandas`).
     * Start the FastAPI server on `http://127.0.0.1:8000`.

2. **Access API Documentation**:
   * Once running, open [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) in your browser to view the interactive Swagger API documentation.

---

## ⚡ How the Integration Works

We built a **dual-mode robust fallback system**:

* **Python Online Mode**: 
  When the FastAPI server is running, the React app queries Python endpoints. The Python server uses `pandas` to search and filter through real-time CSV datasets (Vessels, JSSP schedules, IMU sensors) to generate context-aware replies for the operator chatbot and logs.
* **Auto-Fallback Mode**: 
  If the Python server is offline, the React app's TanStack Server Functions automatically catch the error, log a warning, and fall back to reading local files. **The application will never crash.**

---

## ⚙️ Interactive Sync Features Added

1. **Smart Chatbot Response**: 
   Ask the chatbot actual questions like:
   * *"What is the status of vessels in Mundra?"* (Queries `pillar_a_vessel_freight.csv`)
   * *"Show traffic throughput frequency"* (Queries `pillar_b_traffic_throughput.csv`)
   * *"Are there track vibration anomalies?"* (Queries `pillar_c_imu_sensor.csv`)
2. **Central Transaction Audit Feed**:
   * A live audit table is rendered at the bottom of the **Command Center** showing database logs, timestamps, language modality, and triggered actions.
3. **Persisted Slow Zones**:
   * Enforcing a slow zone in the **Flywheel Simulation** (Step 4) writes the speed restriction to the backend database (`slow_zones.json`). 
   * You can see the logs in the Transaction Audit feed, or ask the chatbot, and it will confirm the active status until the simulation is reset or cleared!
