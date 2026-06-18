@echo off
title NETRA-RAIL Python Backend Launcher
color 0B
echo ==============================================
echo       NETRA-RAIL PYTHON FASTAPI CORE
echo ==============================================
echo.

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH!
    echo Please install Python and try again.
    pause
    exit /b 1
)

:: Create virtual environment if missing
if not exist "backend\.venv\" (
    echo [SYSTEM] Creating virtual environment (.venv)...
    python -m venv backend\.venv
)

echo [SYSTEM] Activating virtual environment...
call backend\.venv\Scripts\activate

echo [SYSTEM] Installing Python dependencies from requirements.txt...
pip install -r backend\requirements.txt

echo.
echo [SYSTEM] Starting FastAPI Server on http://127.0.0.1:8000 ...
python backend\main.py

pause
