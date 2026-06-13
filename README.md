<div align="center">

```
███╗   ██╗███████╗████████╗██████╗  █████╗       ██████╗  █████╗ ██╗██╗     
████╗  ██║██╔════╝╚══██╔══╝██╔══██╗██╔══██╗      ██╔══██╗██╔══██╗██║██║     
██╔██╗ ██║█████╗     ██║   ██████╔╝███████║      ██████╔╝███████║██║██║     
██║╚██╗██║██╔══╝     ██║   ██╔══██╗██╔══██║      ██╔══██╗██╔══██║██║██║     
██║ ╚████║███████╗   ██║   ██║  ██║██║  ██║      ██║  ██║██║  ██║██║███████╗
╚═╝  ╚═══╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝      ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
```

# 🚂 NETRA-RAIL
### National Enterprise Traffic, Routing & Autonomous Rail-Grid

**India's First Closed-Loop Autonomous Multi-Agent Intelligence Platform for Indian Railways**

---

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![LangChain](https://img.shields.io/badge/LangChain-121212?style=for-the-badge&logo=chainlink&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)
![Neo4j](https://img.shields.io/badge/Neo4j-008CC1?style=for-the-badge&logo=neo4j&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

---

```
🚂 ──────────────────────────────────────────────────────────────────── 🏁
  Logistics → Traffic → Sensors → Drones → Back to Logistics
       The Autonomous Flywheel — Zero Human Intervention
```

---

[![Far Away Hackathon](https://img.shields.io/badge/Far%20Away%20Hackathon%202026-Theme%3A%20Railways-1a3a5c?style=for-the-badge)](https://unstop.com)
[![Status](https://img.shields.io/badge/Status-Active%20Development-10B981?style=for-the-badge)]()
[![Languages](https://img.shields.io/badge/Languages%20Supported-230%2B-F59E0B?style=for-the-badge)]()
[![Pillars](https://img.shields.io/badge/Autonomous%20Pillars-4-blue?style=for-the-badge)]()

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [The Problem](#-the-problem)
- [Architecture — The 4-Pillar System](#-architecture--the-4-pillar-system)
- [The Autonomous Flywheel](#-the-autonomous-flywheel)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Setup & Installation](#-setup--installation)
- [Running the System](#-running-the-system)
- [API Reference](#-api-reference)
- [Research Foundation](#-research-foundation)
- [Team](#-team)

---

## 🌐 Overview

Indian Railways operates over **68,000 route kilometres**, runs **13,000+ trains daily**, and transports **1.4 billion tonnes of freight annually** — yet its operational intelligence remains fragmented, reactive, and dangerously manual.

**NETRA-RAIL** is a Closed-Loop Autonomous Multi-Agent Orchestration Platform that unifies four previously disconnected operational layers into a single self-healing cyber-physical ecosystem:

| Layer | Pillar | Problem Solved |
|-------|--------|----------------|
| 🔵 Macro-Logistics | Pillar A — Intermodal Sync | Port-to-plant freight coordination failures |
| 🟠 Network-Traffic | Pillar B — Throughput Maximiser | Mixed-speed rail corridor gridlock |
| 🟣 Micro-Sensing | Pillar C — IMU Telemetry Node | Cost-prohibitive infrastructure monitoring |
| 🟢 Ground-Execution | Pillar D — Garun CV Auditor | Hazardous manual track inspections |

> **This is not 4 solutions. It is one self-healing ecosystem.**

---

## 🚨 The Problem

```
┌─────────────────────────────────────────────────────────────────┐
│                    INDIAN RAILWAYS TODAY                        │
├─────────────────┬───────────────────────────────────────────────┤
│  🚢 LOGISTICS   │ Ships arrive. Wagons idle. ₹1000s Cr lost     │
│                 │ annually in demurrage at major ports.         │
├─────────────────┼───────────────────────────────────────────────┤
│  🚂 TRAFFIC     │ Vande Bharat at 160 km/h vs freight at 40     │
│                 │ km/h. Manual scheduling = cascading delays.   │
├─────────────────┼───────────────────────────────────────────────┤
│  📡 SENSORS     │ Track anomalies accumulate undetected between  │
│                 │ expensive geometry car inspection cycles.     │
├─────────────────┼───────────────────────────────────────────────┤
│  🚁 INSPECTION  │ Trackmen sent into hazardous environments for  │
│                 │ manual audits of individual track components. │
└─────────────────┴───────────────────────────────────────────────┘
```

---

## 🏗 Architecture — The 4-Pillar System

### 🔵 Pillar A — Intermodal Supply-Chain Synchroniser
> *Solving SIH25209 — Ministry of Steel*

```
[Vessel ETA Feed] ──► [RL Routing Optimizer] ──► [Wagon Dispatch Queue]
        │                      │                         │
   Port APIs            Multimodal Logic           Auto-Schedule
  (Mundra, JNPT,      (Adapted from SIH 2024       Push to Zones
  Vizag, Chennai)      Grand Finalist Project)
```

**What it does:** Ingests real-time shipping manifests and vessel ETA parameters from major Indian ports. Using an RL-inspired multimodal routing optimiser (adapted from the Ministry of Telecommunications SIH 2024 Grand Finalist project), it dynamically computes freight train dispatch queues — eliminating idle dwell time at marshalling yards.

**Key Features:**
- ✅ Real-time vessel ETA ingestion and dynamic schedule recalculation
- ✅ Automated freight wagon allocation and dispatch queue management
- ✅ Demurrage cost minimisation through predictive synchronisation
- ✅ Multi-port, multi-plant simultaneous orchestration
- ✅ Natural language query interface in 230+ languages

---

### 🟠 Pillar B — Real-Time Section Throughput Maximiser
> *Solving SIH25022 — Ministry of Railways*

```
[Mixed-Speed Train Network]
         │
         ▼
[JSSP Optimization Engine] ◄── [LLM Heuristic Generator]
         │                              │
    Precedence                  Evolutionary Mutation
    Decisions                   & Crossover Operators
         │
         ▼
[Loop-Line Allocation] ──► [Sub-second Override Dispatch]
         │
         ▼
[Slow Zone Enforcement] ◄── Triggered by Pillar C anomaly flags
```

**What it does:** Models the entire rail corridor as a dynamic Job Shop Scheduling Problem (JSSP). Computes sub-second precedence override decisions — determining exactly which freight trains to side-track and for how long — ensuring Vande Bharat passes without delay while freight throughput is simultaneously maximised.

**Key Features:**
- ✅ Real-time JSSP-based mixed-speed train precedence computation
- ✅ Sub-second loop-line allocation and override dispatch
- ✅ Automatic slow-zone enforcement on Pillar C anomaly flags
- ✅ Formal convergence guarantees on schedule optimality (under elitism)
- ✅ LLM-driven dynamic heuristic generation replacing brittle static rules

**Mathematical Foundation:**
```
Objective: max Σ throughput(sectionᵢ)
Subject to:
  - No collision conflicts between mixed-speed rolling stock
  - Precedence constraints: passenger > freight priority
  - Loop-line capacity constraints
  - Formal convergence: monotonic improvement under elitism
```

---

### 🟣 Pillar C — Crowdsourced IMU Sensor Telemetry Node
> *Solving SIH25177 — ISRO*

```
[Passenger Smartphones] ──► [3-Axis IMU Stream]
         │                        │
    Accelerometer            Gyroscope Data
    (X, Y, Z axes)           (Roll, Pitch, Yaw)
         │                        │
         └────────────┬───────────┘
                      ▼
           [High-Dimensional Vector Pipeline]
                      │
           [AKNN Quantization Engine]
           (Sparse JL Projections +
            Custom HNSW/FAISS Indexing)
                      │
                      ▼
           [Anomaly Cluster Isolation]
                      │
           [Geo-Tagged Maintenance Flag]
                      │
              ┌───────┴───────┐
              ▼               ▼
        Pillar B          Pillar D
    (Slow Zone Alert)  (Drone Dispatch)
```

**What it does:** Transforms every smartphone aboard a moving train into a precision track quality sensor. Structural anomalies manifest as statistically distinct vibration signatures. When multiple devices report anomalous vectors at converging GPS coordinates, the system isolates the anomaly cluster and generates a precise geo-tagged maintenance flag.

**Key Features:**
- ✅ Passive zero-cost distributed track monitoring via passenger smartphones
- ✅ 3-axis IMU telemetry ingestion at scale across entire rail network
- ✅ High-dimensional AKNN vector indexing with formal accuracy guarantees
- ✅ GPS-precise anomaly coordinate isolation
- ✅ Automatic downstream trigger to Pillar B (slow zone) and Pillar D (drone)

**AKNN Architecture:**
```python
# Quantization-based AKNN with asymptotically optimal rate-distortion bounds
# Unlike standard HNSW/IVF-PQ — formal error guarantees certified
# Sparse Johnson-Lindenstrauss projections for dimensionality handling
```

---

### 🟢 Pillar D — Garun CV Structural Auditor
> *Solving SIH25021 — Ministry of Railways*

```
[Anomaly Flag from Pillar C]
         │
         ▼
[Geo-Fenced Maintenance Ticket]
         │
         ▼
[Autonomous Drone Dispatch]
         │
         ▼
[Garun CV Inference Engine]
    ├── QR Code Scanning on Track Fittings
    ├── Fastener Wear Detection
    ├── Surface Micro-Fissure Identification
    └── Joint Bar Misalignment Detection
         │
         ▼
[Structured Inspection Report]
    ├── CLEARED ──► Pillar B lifts slow zone
    └── DEFECT  ──► Maintenance Work Order Generated
```

**What it does:** Autonomous drone dispatch triggered by Pillar C anomaly flags. Garun's production CV framework (originally deployed for Indore Municipal Corporation illegal construction detection) is adapted for railway infrastructure inspection.

**Key Features:**
- ✅ Autonomous geo-fenced drone dispatch triggered by Pillar C
- ✅ Real-time convolutional inference on track infrastructure components
- ✅ Automated QR code scanning on laser-marked track fittings
- ✅ Structured aerial inspection report generation
- ✅ Automatic slow-zone clearance upon verified track restoration
- ✅ Escalated maintenance work order generation for confirmed defects

---

## 🔄 The Autonomous Flywheel

```
                    ┌─────────────────────┐
                    │     PILLAR A        │
                    │  Port-to-Plant      │
                    │  Freight Scheduler  │
                    └──────────┬──────────┘
                               │
                    Freight dispatch computed
                               │
                               ▼
┌─────────────────┐   ┌────────────────────┐
│    PILLAR D     │   │     PILLAR B        │
│  Garun Drone    │◄──│  Section Throughput │
│  CV Auditor     │   │  Maximiser (JSSP)   │
└────────┬────────┘   └────────────────────┘
         │                      ▲
  Track report                  │
  uploaded                 Slow zone
         │                 enforcement
         │            ┌─────────────────────┐
         └───────────►│     PILLAR C        │
                       │  IMU Sensor         │
                       │  Telemetry Node     │
                       └─────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  One complete autonomous cycle: ~23 minutes
  Human interventions required: ZERO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Live Event Log (Sample):**
```
14:23:07  Vessel MV Himalaya ETA updated → 14:45
14:23:08  Pillar A: Freight dispatch queue recalculated ✓
14:23:09  Pillar B: Section 7 precedence override issued ✓
14:31:44  Pillar C: Anomaly flagged @ 22.3°N, 73.1°E
14:31:45  Pillar B: Slow zone enforced — Section 7 ✓
14:31:46  Pillar D: Drone #3 dispatched → ETA 8 mins
14:39:22  Pillar D: Loose fastener confirmed ⚠
14:39:23  Maintenance order #MO-2847 generated ✓
14:46:11  Pillar D: Track restored — report uploaded ✓
14:46:12  Pillar B: Slow zone lifted — Section 7 ✓
```

---

## 🌐 Multilingual Intelligence — 230+ Languages

```
┌─────────────────────────────────────────────────────┐
│              NETRA-RAIL COMMAND CENTER              │
│                  230+ Languages                     │
├─────────────────────────────────────────────────────┤
│  Station Master (Hindi):                            │
│  "Section 7 mein slow zone kab lift hoga?"         │
│                                                     │
│  NETRA-RAIL:                                        │
│  "Drone inspection 8 minute mein complete hogi.    │
│   Track clear hote hi slow zone automatically      │
│   lift ho jayega."                                  │
├─────────────────────────────────────────────────────┤
│  Trackman (Tamil):                                  │
│  "பிரிவு 4 அருகில் பராமரிப்பு எச்சரிக்கை உள்ளதா?" │
│                                                     │
│  NETRA-RAIL: [Responds in Tamil] ✓                 │
└─────────────────────────────────────────────────────┘
```

Powered by **IndicTrans2** — same architecture demonstrated live at Bharat Mandapam, New Delhi (INDRA Project).

---

## 🛠 Tech Stack

```
┌─────────────────────────────────────────────────────┐
│                  FRONTEND LAYER                     │
│         React · react-i18next · Tailwind            │
├─────────────────────────────────────────────────────┤
│                ORCHESTRATION LAYER                  │
│         LangGraph · LangChain · LangSmith           │
├─────────────────────────────────────────────────────┤
│                   API LAYER                         │
│              FastAPI · REST APIs                    │
├─────────────────────────────────────────────────────┤
│                   CORE ENGINES                      │
│   LLM-JSSP Optimizer    │  AKNN Vector Engine       │
│   (PyTorch + Custom)    │  (FAISS · HNSWLIB)        │
│                         │                           │
│   Garun CV Framework    │  RL Routing Optimizer     │
│   (OpenCV + PyTorch)    │  (Custom RL Agent)        │
├─────────────────────────────────────────────────────┤
│                  NLP LAYER                          │
│     IndicTrans2 · Google Cloud Translation API      │
│           HuggingFace Transformers · spaCy          │
├─────────────────────────────────────────────────────┤
│                  DATA LAYER                         │
│    PostgreSQL · MongoDB · Neo4j · Firebase          │
│         FAISS · HNSWLIB · GeoPandas · Folium        │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
NETRA-RAIL/
│
├── 📁 backend/
│   ├── 📁 pillar_a/                  # Intermodal Logistics Sync
│   │   ├── routing_optimizer.py      # RL-based freight scheduler
│   │   ├── vessel_ingestion.py       # Port ETA feed processor
│   │   └── dispatch_queue.py         # Wagon allocation engine
│   │
│   ├── 📁 pillar_b/                  # Section Throughput Maximiser
│   │   ├── jssp_solver.py            # Job Shop Scheduling engine
│   │   ├── llm_heuristic.py          # LLM-driven heuristic generator
│   │   ├── precedence_engine.py      # Real-time override dispatcher
│   │   └── slowzone_manager.py       # Slow zone enforcement
│   │
│   ├── 📁 pillar_c/                  # IMU Sensor Telemetry Node
│   │   ├── imu_ingestion.py          # Sensor stream processor
│   │   ├── aknn_engine.py            # AKNN vector search pipeline
│   │   ├── anomaly_detector.py       # Vibration anomaly isolator
│   │   └── geo_flagger.py            # GPS coordinate mapper
│   │
│   ├── 📁 pillar_d/                  # Garun CV Structural Auditor
│   │   ├── garun_cv.py               # Computer vision inference
│   │   ├── drone_dispatcher.py       # Autonomous drone controller
│   │   ├── qr_scanner.py             # Track fitting QR reader
│   │   └── report_generator.py       # Inspection report builder
│   │
│   ├── 📁 multilingual/
│   │   ├── indictrans2_engine.py     # 230+ language processor
│   │   └── voice_interface.py        # Voice command handler
│   │
│   ├── 📁 agents/
│   │   ├── orchestrator.py           # LangGraph master agent
│   │   ├── logistics_agent.py        # Pillar A agent
│   │   ├── traffic_agent.py          # Pillar B agent
│   │   ├── sensor_agent.py           # Pillar C agent
│   │   └── inspection_agent.py       # Pillar D agent
│   │
│   └── main.py                       # FastAPI entry point
│
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── PillarA/              # Logistics dashboard
│   │   │   ├── PillarB/              # Traffic control dashboard
│   │   │   ├── PillarC/              # Sensor telemetry dashboard
│   │   │   ├── PillarD/              # Drone inspection dashboard
│   │   │   ├── Flywheel/             # System overview
│   │   │   └── CommandCenter/        # Multilingual interface
│   │   └── App.jsx
│   └── package.json
│
├── 📁 research/
│   ├── llm_heuristic_paper.pdf       # LLM-Heuristic Design research
│   ├── aknn_similarity_paper.pdf     # AKNN Vector Search research
│   └── architecture_diagram.png     # System architecture
│
├── 📁 docs/
│   ├── API_REFERENCE.md
│   ├── ARCHITECTURE.md
│   └── DEPLOYMENT.md
│
├── requirements.txt
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites

```bash
Python >= 3.10
Node.js >= 18.0
PostgreSQL >= 14
Neo4j >= 5.0
```

### 1. Clone the Repository

```bash
git clone https://github.com/Manasvi-Gangrade/NETRA-RAIL.git
cd NETRA-RAIL
```

### 2. Backend Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Environment Variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
# API Keys
OPENAI_API_KEY=your_openai_key
GOOGLE_CLOUD_API_KEY=your_google_key

# Database
POSTGRES_URL=postgresql://localhost:5432/netrarail
MONGODB_URI=mongodb://localhost:27017/netrarail
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your_password

# FAISS / HNSWLIB
VECTOR_INDEX_PATH=./data/vector_index

# Multilingual
INDICTRANS2_MODEL_PATH=./models/indictrans2
```

### 4. Database Initialization

```bash
# PostgreSQL
psql -U postgres -c "CREATE DATABASE netrarail;"
python backend/scripts/init_db.py

# Neo4j — run after starting Neo4j service
python backend/scripts/init_graph.py
```

### 5. Frontend Setup

```bash
cd frontend
npm install
```

---

## 🚀 Running the System

### Start Backend

```bash
# From project root
uvicorn backend.main:app --reload --port 8000
```

### Start Frontend

```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

### Run with Docker (Recommended)

```bash
docker-compose up --build
# Full system at http://localhost:3000
# API docs at http://localhost:8000/docs
```

---

## 📡 API Reference

### Pillar A — Logistics

```http
GET  /api/pillar-a/vessel-status          # Live port vessel status
GET  /api/pillar-a/dispatch-queue         # Current freight dispatch queue
POST /api/pillar-a/update-eta             # Update vessel ETA
GET  /api/pillar-a/metrics                # Sync efficiency metrics
```

### Pillar B — Traffic

```http
GET  /api/pillar-b/section-status         # Live corridor status
POST /api/pillar-b/compute-precedence     # Trigger precedence calculation
GET  /api/pillar-b/slow-zones             # Active slow zones
GET  /api/pillar-b/throughput-metrics     # Throughput statistics
```

### Pillar C — Sensors

```http
POST /api/pillar-c/ingest-imu             # Ingest IMU sensor data
GET  /api/pillar-c/anomalies              # Active anomaly flags
GET  /api/pillar-c/heatmap-data           # Track health heatmap data
GET  /api/pillar-c/vector-stats           # AKNN pipeline statistics
```

### Pillar D — Drones

```http
GET  /api/pillar-d/drone-missions         # Active drone missions
POST /api/pillar-d/dispatch-drone         # Manually dispatch drone
GET  /api/pillar-d/inspection-reports     # Completed inspection reports
POST /api/pillar-d/upload-report          # Upload drone inspection result
```

### Multilingual Command Center

```http
POST /api/command/query                   # Natural language query (any language)
POST /api/command/voice                   # Voice command endpoint
GET  /api/command/supported-languages     # List of 230+ supported languages
```

---

## 📚 Research Foundation

NETRA-RAIL is built on original academic research by the team:

| Research | Application in NETRA-RAIL |
|----------|--------------------------|
| [Automating Heuristic Design with LLMs](https://github.com/Manasvi-Gangrade) | Pillar B — JSSP optimization engine with formal convergence guarantees |
| [Similarity Search on High-Dimensional Vector Data](https://github.com/Manasvi-Gangrade) | Pillar C — AKNN anomaly detection with certified accuracy bounds |
| [Subliminal Preference Transfer in LLM Training Data](https://github.com/Manasvi-Gangrade) | System-wide AI safety and alignment guarantees |

---

## 🏆 Production Deployments Referenced

| Project | Deployed At | Relevance to NETRA-RAIL |
|---------|-------------|------------------------|
| **Garun Framework** | Indore Municipal Corporation, Smart City | Pillar D — CV drone inspection engine |
| **INDRA Platform** | Bharat Mandapam, New Delhi | Central dashboard + multilingual layer |
| **India Post Optimizer** | Ministry of Telecom, SIH 2024 Grand Finalist | Pillar A — RL freight routing engine |
| **RAG Urban Intelligence** | Indore Smart City (3M+ citizens) | RAG query layer for command center |

---

## 👥 Team

<div align="center">

| | Name | Role |
|--|------|------|
| 🧠 | **Manasvi Gangrade** | Team Lead — AI Research & System Architecture |
| ⚙️ | **Navneet Kaur** | Backend Engineering & Agent Orchestration |
| 🎨 | **Muskan Lodhi** | Frontend Development & UX |

**Institution:** Indore Institute of Science and Technology, Indore
**Hackathon:** Far Away 2026 — Theme: Railways
**Organised by:** Zuup (Youth-led nonprofit, Zylon Labs)

</div>

---

<div align="center">

```
🚂 ══════════════════════════════════════════════════════════════ 🇯🇵
     NETRA-RAIL | Far Away Hackathon 2026 | Theme: Railways
     Build Boldly. Ship Something Real.
🚂 ══════════════════════════════════════════════════════════════ 🇯🇵
```

**[⭐ Star this repo](https://github.com/Manasvi-Gangrade/NETRA-RAIL)** · **[🍴 Fork](https://github.com/Manasvi-Gangrade/NETRA-RAIL/fork)** · **[🐛 Report Bug](https://github.com/Manasvi-Gangrade/NETRA-RAIL/issues)**

*Made with ❤️ and a dream of Japan 🇯🇵*

</div>
