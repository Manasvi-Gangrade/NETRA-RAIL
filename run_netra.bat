@echo off
title NETRA-RAIL Launcher
color 0E
echo ==============================================
echo        NETRA-RAIL AUTONOMOUS PLATFORM
echo ==============================================
echo.

:: Check if node_modules exists, install if missing
if not exist "node_modules\" (
    echo [SYSTEM] node_modules not found. Running bun install...
    call bun install
) else (
    echo [SYSTEM] node_modules exists. Skipping install.
)

echo.
echo [SYSTEM] Starting NETRA-RAIL Dev Server...
call bun dev

pause
