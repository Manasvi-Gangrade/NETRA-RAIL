# NETRA-RAIL
### National Enterprise Traffic, Routing & Autonomous Rail-Grid

**India's First Closed-Loop Autonomous Multi-Agent Intelligence Platform for Indian Railways**

![Tagline](https://img.shields.io/badge/India's%20First-Closed--Loop%20Autonomous%20Multi--Agent%20Intelligence%20Platform%20for%20Indian%20Railways-F59E0B?style=for-the-badge)

---

<div align="center">

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![LangChain](https://img.shields.io/badge/LangChain-121212?style=for-the-badge&logo=chainlink&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)
![Neo4j](https://img.shields.io/badge/Neo4j-008CC1?style=for-the-badge&logo=neo4j&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

[![Far Away Hackathon](https://img.shields.io/badge/Far%20Away%20Hackathon%202026-Theme%3A%20Railways-1a3a5c?style=for-the-badge)](https://unstop.com)
[![Status](https://img.shields.io/badge/Status-Active%20Development-10B981?style=for-the-badge)]()
[![Languages](https://img.shields.io/badge/Languages%20Supported-230%2B-F59E0B?style=for-the-badge)]()
[![Pillars](https://img.shields.io/badge/Autonomous%20Pillars-4-blue?style=for-the-badge)]()

</div>

---

<div align="center">

![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&pause=1000&color=1a3a5c&center=true&vCenter=true&width=700&lines=Logistics+%E2%86%92+Traffic+%E2%86%92+Sensors+%E2%86%92+Drones;The+Autonomous+Flywheel+%E2%80%94+Zero+Human+Intervention;68%2C000+Route+KM+%7C+13%2C000%2B+Trains+%7C+4+Pillars;Build+Boldly.+Ship+Something+Real.)

</div>

---

![TOC](https://img.shields.io/badge/Table%20of%20Contents-1a3a5c?style=for-the-badge)

- [Overview](#overview)
- [The Problem](#the-problem)
- [Architecture — The 4-Pillar System](#architecture--the-4-pillar-system)
- [The Autonomous Flywheel](#the-autonomous-flywheel)
- [Multilingual Intelligence](#multilingual-intelligence--230-languages)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Running the System](#running-the-system)
- [API Reference](#api-reference)
- [Research Foundation](#research-foundation)
- [Team](#team)

---

![Overview](https://img.shields.io/badge/Overview-What%20is%20NETRA--RAIL%3F-10B981?style=for-the-badge)

Indian Railways operates over **68,000 route kilometres**, runs **13,000+ trains daily**, and transports **1.4 billion tonnes of freight annually** — yet its operational intelligence remains fragmented, reactive, and dangerously manual.

**NETRA-RAIL** is a Closed-Loop Autonomous Multi-Agent Orchestration Platform that unifies four previously disconnected operational layers into a single self-healing cyber-physical ecosystem:

| Layer | Pillar | Problem Solved |
|-------|--------|----------------|
| Macro-Logistics | Pillar A — Intermodal Sync | Port-to-plant freight coordination failures |
| Network-Traffic | Pillar B — Throughput Maximiser | Mixed-speed rail corridor gridlock |
| Micro-Sensing | Pillar C — IMU Telemetry Node | Cost-prohibitive infrastructure monitoring |
| Ground-Execution | Pillar D — Garun CV Auditor | Hazardous manual track inspections |

> **This is not 4 solutions. It is one self-healing ecosystem.**

---

![Problem](https://img.shields.io/badge/The%20Problem-Indian%20Railways%20Running%20Blind-DC2626?style=for-the-badge)

```
+------------------+----------------------------------------------+
|  INDIAN RAILWAYS TODAY                                          |
+------------------+----------------------------------------------+
|  LOGISTICS       | Ships arrive. Wagons idle.                   |
|                  | Crores lost annually in demurrage at ports.  |
+------------------+----------------------------------------------+
|  TRAFFIC         | Vande Bharat at 160 km/h vs freight at 40   |
|                  | km/h. Manual scheduling = cascading delays.  |
+------------------+----------------------------------------------+
|  SENSORS         | Track anomalies accumulate undetected between|
|                  | expensive geometry car inspection cycles.    |
+------------------+----------------------------------------------+
|  INSPECTION      | Trackmen sent into hazardous environments    |
|                  | for manual audits of track components.       |
+------------------+----------------------------------------------+
```

---

![Architecture](https://img.shields.io/badge/Architecture-The%204--Pillar%20System-1a3a5c?style=for-the-badge)

![PillarA](https://img.shields.io/badge/PILLAR%20A-Intermodal%20Supply--Chain%20Synchroniser-1a3a5c?style=for-the-badge)
![SIH](https://img.shields.io/badge/Solving-SIH25209%20%7C%20Ministry%20of%20Steel-64748b?style=flat-square)

```
[Vessel ETA Feed] --> [RL Routing Optimizer] --> [Wagon Dispatch Queue]
        |                      |                         |
   Port APIs            Multimodal Logic           Auto-Schedule
  (Mundra, JNPT,      (Adapted from SIH 2024       Push to Zones
  Vizag, Chennai)      Grand Finalist Project)
```

**What it does:** Ingests real-time shipping manifests and vessel ETA parameters from major Indian ports. Using an RL-inspired multimodal routing optimiser (adapted from the Ministry of Telecommunications SIH 2024 Grand Finalist project), it dynamically computes freight train dispatch queues — eliminating idle dwell time at marshalling yards.

**Key Features:**
- Real-time vessel ETA ingestion and dynamic schedule recalculation
- Automated freight wagon allocation and dispatch queue management
- Demurrage cost minimisation through predictive synchronisation
- Multi-port, multi-plant simultaneous orchestration
- Natural language query interface in 230+ languages

---

![PillarB](https://img.shields.io/badge/PILLAR%20B-Real--Time%20Section%20Throughput%20Maximiser-F59E0B?style=for-the-badge)
![SIH](https://img.shields.io/badge/Solving-SIH25022%20%7C%20Ministry%20of%20Railways-64748b?style=flat-square)

```
[Mixed-Speed Train Network]
         |
         v
[JSSP Optimization Engine] <-- [LLM Heuristic Generator]
         |                              |
    Precedence                  Evolutionary Mutation
    Decisions                   & Crossover Operators
         |
         v
[Loop-Line Allocation] --> [Sub-second Override Dispatch]
         |
         v
[Slow Zone Enforcement] <-- Triggered by Pillar C anomaly flags
```

**What it does:** Models the entire rail corridor as a dynamic Job Shop Scheduling Problem (JSSP). Computes sub-second precedence override decisions — determining exactly which freight trains to side-track and for how long — ensuring Vande Bharat passes without delay while freight throughput is simultaneously maximised.

**Key Features:**
- Real-time JSSP-based mixed-speed train precedence computation
- Sub-second loop-line allocation and override dispatch
- Automatic slow-zone enforcement on Pillar C anomaly flags
- Formal convergence guarantees on schedule optimality (under elitism)
- LLM-driven dynamic heuristic generation replacing brittle static rules

**Mathematical Foundation:**
```
Objective: max sum(throughput(section_i))
Subject to:
  - No collision conflicts between mixed-speed rolling stock
  - Precedence constraints: passenger > freight priority
  - Loop-line capacity constraints
  - Formal convergence: monotonic improvement under elitism
```

---

![PillarC](https://img.shields.io/badge/PILLAR%20C-Crowdsourced%20IMU%20Sensor%20Telemetry%20Node-7C3AED?style=for-the-badge)
![SIH](https://img.shields.io/badge/Solving-SIH25177%20%7C%20ISRO-64748b?style=flat-square)

```
[Passenger Smartphones] --> [3-Axis IMU Stream]
         |                        |
    Accelerometer            Gyroscope Data
    (X, Y, Z axes)           (Roll, Pitch, Yaw)
         |                        |
         +------------+-----------+
                      |
                      v
           [High-Dimensional Vector Pipeline]
                      |
           [AKNN Quantization Engine]
           (Sparse JL Projections +
            Custom HNSW/FAISS Indexing)
                      |
                      v
           [Anomaly Cluster Isolation]
                      |
           [Geo-Tagged Maintenance Flag]
                      |
              +-------+-------+
              v               v
        Pillar B          Pillar D
    (Slow Zone Alert)  (Drone Dispatch)
```

**What it does:** Transforms every smartphone aboard a moving train into a precision track quality sensor. Structural anomalies manifest as statistically distinct vibration signatures. When multiple devices report anomalous vectors at converging GPS coordinates, the system isolates the anomaly cluster and generates a precise geo-tagged maintenance flag.

**Key Features:**
- Passive zero-cost distributed track monitoring via passenger smartphones
- 3-axis IMU telemetry ingestion at scale across entire rail network
- High-dimensional AKNN vector indexing with formal accuracy guarantees
- GPS-precise anomaly coordinate isolation
- Automatic downstream trigger to Pillar B (slow zone) and Pillar D (drone)

---

![PillarD](https://img.shields.io/badge/PILLAR%20D-Garun%20CV%20Structural%20Auditor-10B981?style=for-the-badge)
![SIH](https://img.shields.io/badge/Solving-SIH25021%20%7C%20Ministry%20of%20Railways-64748b?style=flat-square)

```
[Anomaly Flag from Pillar C]
         |
         v
[Geo-Fenced Maintenance Ticket]
         |
         v
[Autonomous Drone Dispatch]
         |
         v
[Garun CV Inference Engine]
    +-- QR Code Scanning on Track Fittings
    +-- Fastener Wear Detection
    +-- Surface Micro-Fissure Identification
    +-- Joint Bar Misalignment Detection
         |
         v
[Structured Inspection Report]
    +-- CLEARED --> Pillar B lifts slow zone
    +-- DEFECT  --> Maintenance Work Order Generated
```

**What it does:** Autonomous drone dispatch triggered by Pillar C anomaly flags. Garun's production CV framework (originally deployed for Indore Municipal Corporation illegal construction detection) is adapted for railway infrastructure inspection.

**Key Features:**
- Autonomous geo-fenced drone dispatch triggered by Pillar C
- Real-time convolutional inference on track infrastructure components
- Automated QR code scanning on laser-marked track fittings
- Structured aerial inspection report generation
- Automatic slow-zone clearance upon verified track restoration
- Escalated maintenance work order generation for confirmed defects

---

![Flywheel](https://img.shields.io/badge/The%20Autonomous%20Flywheel-Zero%20Human%20Intervention-F59E0B?style=for-the-badge)

```
                 +---------------------+
                 |      PILLAR A       |
                 |  Port-to-Plant      |
                 |  Freight Scheduler  |
                 +----------+----------+
                            |
               Freight dispatch computed
                            |
                            v
+----------------+   +---------------------+
|   PILLAR D     |   |      PILLAR B        |
|  Garun Drone   +<--+  Section Throughput  |
|  CV Auditor    |   |  Maximiser (JSSP)    |
+-------+--------+   +---------------------+
        |                       ^
  Track report                  |
  uploaded                 Slow zone
        |                  enforcement
        |             +---------------------+
        +------------>+      PILLAR C        |
                      |  IMU Sensor          |
                      |  Telemetry Node      |
                      +---------------------+

---------------------------------------------------
  One complete autonomous cycle: ~23 minutes
  Human interventions required: ZERO
---------------------------------------------------
```

**Live Event Log (Sample):**
```
14:23:07  Vessel MV Himalaya ETA updated --> 14:45
14:23:08  Pillar A: Freight dispatch queue recalculated
14:23:09  Pillar B: Section 7 precedence override issued
14:31:44  Pillar C: Anomaly flagged @ 22.3 N, 73.1 E
14:31:45  Pillar B: Slow zone enforced -- Section 7
14:31:46  Pillar D: Drone #3 dispatched --> ETA 8 mins
14:39:22  Pillar D: Loose fastener confirmed
14:39:23  Maintenance order #MO-2847 generated
14:46:11  Pillar D: Track restored -- report uploaded
14:46:12  Pillar B: Slow zone lifted -- Section 7
```

---

![Multilingual](https://img.shields.io/badge/Multilingual%20Intelligence-230%2B%20Languages%20Supported-7C3AED?style=for-the-badge)

```
+-------------------------------------------------------+
|              NETRA-RAIL COMMAND CENTER                |
|                  230+ Languages                       |
+-------------------------------------------------------+
|  Station Master (Hindi):                              |
|  "Section 7 mein slow zone kab lift hoga?"           |
|                                                       |
|  NETRA-RAIL:                                          |
|  "Drone inspection 8 minute mein complete hogi.      |
|   Track clear hote hi slow zone automatically        |
|   lift ho jayega."                                    |
+-------------------------------------------------------+
|  Trackman (Tamil):                                    |
|  "பிரிவு 4 அருகில் பராமரிப்பு எச்சரிக்கை உள்ளதா?"   |
|                                                       |
|  NETRA-RAIL: [Responds in Tamil]                     |
+-------------------------------------------------------+
```

Powered by **IndicTrans2** — same architecture demonstrated live at Bharat Mandapam, New Delhi (INDRA Project).

---

![TechStack](https://img.shields.io/badge/Tech%20Stack-Research--Proven%20%26%20Production--Deployed-1a3a5c?style=for-the-badge)

```
+-------------------------------------------------------+
|                   FRONTEND LAYER                      |
|          React . react-i18next . Tailwind             |
+-------------------------------------------------------+
|               ORCHESTRATION LAYER                     |
|          LangGraph . LangChain . LangSmith            |
+-------------------------------------------------------+
|                    API LAYER                          |
|               FastAPI . REST APIs                     |
+-------------------------------------------------------+
|                    CORE ENGINES                       |
|   LLM-JSSP Optimizer     |   AKNN Vector Engine       |
|   (PyTorch + Custom)     |   (FAISS . HNSWLIB)        |
|                          |                            |
|   Garun CV Framework     |   RL Routing Optimizer     |
|   (OpenCV + PyTorch)     |   (Custom RL Agent)        |
+-------------------------------------------------------+
|                    NLP LAYER                          |
|      IndicTrans2 . Google Cloud Translation API       |
|            HuggingFace Transformers . spaCy           |
+-------------------------------------------------------+
|                    DATA LAYER                         |
|     PostgreSQL . MongoDB . Neo4j . Firebase           |
|          FAISS . HNSWLIB . GeoPandas . Folium         |
+-------------------------------------------------------+
```

---

![Structure](https://img.shields.io/badge/Project%20Structure-Codebase%20Layout-10B981?style=for-the-badge)

```
NETRA-RAIL/
│
├── 📁 backend/
│   ├── 📁 pillar_a/
│   │   ├── routing_optimizer.py
│   │   ├── vessel_ingestion.py
│   │   └── dispatch_queue.py
│   │
│   ├── 📁 pillar_b/
│   │   ├── jssp_solver.py
│   │   ├── llm_heuristic.py
│   │   ├── precedence_engine.py
│   │   └── slowzone_manager.py
│   │
│   ├── 📁 pillar_c/
│   │   ├── imu_ingestion.py
│   │   ├── aknn_engine.py
│   │   ├── anomaly_detector.py
│   │   └── geo_flagger.py
│   │
│   ├── 📁 pillar_d/
│   │   ├── garun_cv.py
│   │   ├── drone_dispatcher.py
│   │   ├── qr_scanner.py
│   │   └── report_generator.py
│   │
│   ├── 📁 multilingual/
│   │   ├── indictrans2_engine.py
│   │   └── voice_interface.py
│   │
│   ├── 📁 agents/
│   │   ├── orchestrator.py
│   │   ├── logistics_agent.py
│   │   ├── traffic_agent.py
│   │   ├── sensor_agent.py
│   │   └── inspection_agent.py
│   │
│   └── main.py
│
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 📁 PillarA/
│   │   │   ├── 📁 PillarB/
│   │   │   ├── 📁 PillarC/
│   │   │   ├── 📁 PillarD/
│   │   │   ├── 📁 Flywheel/
│   │   │   └── 📁 CommandCenter/
│   │   └── App.jsx
│   └── package.json
│
├── 📁 research/
│   ├── llm_heuristic_paper.pdf
│   ├── aknn_similarity_paper.pdf
│   └── architecture_diagram.png
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

![Setup](https://img.shields.io/badge/Setup%20%26%20Installation-Get%20NETRA--RAIL%20Running-1a3a5c?style=for-the-badge)

![Pre](https://img.shields.io/badge/Prerequisites-Required%20Versions-64748b?style=flat-square)

```bash
Python >= 3.10
Node.js >= 18.0
PostgreSQL >= 14
Neo4j >= 5.0
```

![Step1](https://img.shields.io/badge/Step%201-Clone%20the%20Repository-1a3a5c?style=flat-square)

```bash
git clone https://github.com/Manasvi-Gangrade/NETRA-RAIL.git
cd NETRA-RAIL
```

![Step2](https://img.shields.io/badge/Step%202-Backend%20Setup-1a3a5c?style=flat-square)

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

![Step3](https://img.shields.io/badge/Step%203-Environment%20Variables-1a3a5c?style=flat-square)

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

![Step4](https://img.shields.io/badge/Step%204-Database%20Initialization-1a3a5c?style=flat-square)

```bash
# PostgreSQL
psql -U postgres -c "CREATE DATABASE netrarail;"
python backend/scripts/init_db.py

# Neo4j
python backend/scripts/init_graph.py
```

![Step5](https://img.shields.io/badge/Step%205-Frontend%20Setup-1a3a5c?style=flat-square)

```bash
cd frontend
npm install
```

---

![Running](https://img.shields.io/badge/Running%20the%20System-Start%20All%20Pillars-10B981?style=for-the-badge)

![RunA](https://img.shields.io/badge/Run-Start%20Backend-10B981?style=flat-square)

```bash
uvicorn backend.main:app --reload --port 8000
```

![RunB](https://img.shields.io/badge/Run-Start%20Frontend-10B981?style=flat-square)

```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

![RunC](https://img.shields.io/badge/Run-Docker%20%28Recommended%29-10B981?style=flat-square)

```bash
docker-compose up --build
# Full system at http://localhost:3000
# API docs at http://localhost:8000/docs
```

---

![API](https://img.shields.io/badge/API%20Reference-All%20Endpoints-F59E0B?style=for-the-badge)

![APIa](https://img.shields.io/badge/Pillar%20A-Logistics%20Endpoints-1a3a5c?style=flat-square)

```http
GET  /api/pillar-a/vessel-status
GET  /api/pillar-a/dispatch-queue
POST /api/pillar-a/update-eta
GET  /api/pillar-a/metrics
```

![APIb](https://img.shields.io/badge/Pillar%20B-Traffic%20Endpoints-F59E0B?style=flat-square)

```http
GET  /api/pillar-b/section-status
POST /api/pillar-b/compute-precedence
GET  /api/pillar-b/slow-zones
GET  /api/pillar-b/throughput-metrics
```

![APIc](https://img.shields.io/badge/Pillar%20C-Sensor%20Endpoints-7C3AED?style=flat-square)

```http
POST /api/pillar-c/ingest-imu
GET  /api/pillar-c/anomalies
GET  /api/pillar-c/heatmap-data
GET  /api/pillar-c/vector-stats
```

![APId](https://img.shields.io/badge/Pillar%20D-Drone%20Endpoints-10B981?style=flat-square)

```http
GET  /api/pillar-d/drone-missions
POST /api/pillar-d/dispatch-drone
GET  /api/pillar-d/inspection-reports
POST /api/pillar-d/upload-report
```

![APIe](https://img.shields.io/badge/Command%20Center-Multilingual%20Endpoints-7C3AED?style=flat-square)

```http
POST /api/command/query
POST /api/command/voice
GET  /api/command/supported-languages
```

---

![Research](https://img.shields.io/badge/Research%20Foundation-Original%20Academic%20Work-7C3AED?style=for-the-badge)

NETRA-RAIL is built on original academic research by the team:

| Research | Application in NETRA-RAIL |
|----------|--------------------------|
| Automating Heuristic Design with LLMs | Pillar B — JSSP optimization engine with formal convergence guarantees |
| Similarity Search on High-Dimensional Vector Data | Pillar C — AKNN anomaly detection with certified accuracy bounds |
| Subliminal Preference Transfer in LLM Training Data | System-wide AI safety and alignment guarantees |

---

![Deployments](https://img.shields.io/badge/Production%20Deployments-Real%20World%20Proven-10B981?style=for-the-badge)

| Project | Deployed At | Relevance to NETRA-RAIL |
|---------|-------------|------------------------|
| Garun Framework | Indore Municipal Corporation, Smart City | Pillar D — CV drone inspection engine |
| INDRA Platform | Bharat Mandapam, New Delhi | Central dashboard + multilingual layer |
| India Post Optimizer | Ministry of Telecom, SIH 2024 Grand Finalist | Pillar A — RL freight routing engine |
| RAG Urban Intelligence | Indore Smart City (3M+ citizens) | RAG query layer for command center |

---

![Team](https://img.shields.io/badge/Team-The%20Builders-F59E0B?style=for-the-badge)

<div align="center">

| Name | Role |
|------|------|
| **Manasvi Gangrade** | Team Lead — AI Research & System Architecture |
| **Navneet Kaur** | Backend Engineering & Agent Orchestration |
| **Muskan Lodhi** | Frontend Development & UX |

**Institution:** Indore Institute of Science and Technology, Indore

**Hackathon:** Far Away 2026 — Theme: Railways

</div>

---

<div align="center">

![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&size=16&pause=1000&color=F59E0B&center=true&vCenter=true&width=600&lines=NETRA-RAIL+%7C+Far+Away+Hackathon+2026;Theme%3A+Railways+%7C+Build+Boldly.+Ship+Something+Real.;Top+5+%E2%86%92+Fully+Sponsored+Japan+Trip+%F0%9F%87%AF%F0%9F%87%B5)

[![Star](https://img.shields.io/github/stars/Manasvi-Gangrade/NETRA-RAIL?style=social)](https://github.com/Manasvi-Gangrade/NETRA-RAIL)

*Made with love and a dream of Japan*

</div>
