# Nexus Code

Codex-style personal AI coding workspace with an IDE, file explorer, AI agent panel, online model support, and an offline coding engine.

## Modes
- Online: connect the web app to the included Node API.
- Offline: browser-side coding assistant remains available without internet.
- Local provider: point MODEL_BASE_URL at an OpenAI-compatible local model server.

## Run
npm install
npm run dev

API:
cd server
npm install
npm start

Set MODEL_BASE_URL, MODEL_API_KEY and MODEL_NAME on the API server, then click Provider in the web app.

## Security
This foundation intentionally does not execute arbitrary shell commands from a public browser. A production agent should add authentication, isolated containers, file permissions, command allowlists, rate limits and audit logging before enabling execution.
