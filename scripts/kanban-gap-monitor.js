#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const workspaceRoot = path.resolve(__dirname, "..");
const convexApp = path.join(workspaceRoot, "convex-app");
const logsDir = path.join(workspaceRoot, "logs");
const logFile = path.join(logsDir, "kanban-gap-monitor.log");

function loadConvexEnv() {
  const envFile = path.join(convexApp, ".env.local");
  const env = { ...process.env };
  if (!fs.existsSync(envFile)) {
    return env;
  }
  for (const raw of fs.readFileSync(envFile, "utf-8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eqIndex = line.indexOf("=");
    if (eqIndex === -1) continue;
    const key = line.slice(0, eqIndex).trim();
    const value = line.slice(eqIndex + 1).trim();
    if (value && env[key] === undefined) {
      env[key] = value;
    }
  }
  return env;
}

function runConvex(functionPath, payload = {}) {
  const args = [
    "convex",
    "run",
    `${functionPath}:default`,
    JSON.stringify(payload),
  ];
  const result = execFileSync("npx", args, {
    cwd: convexApp,
    env: loadConvexEnv(),
    encoding: "utf-8",
  }).trim();
  if (!result) {
    return null;
  }
  return JSON.parse(result);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function appendLogLine(line) {
  ensureDir(logsDir);
  fs.appendFileSync(logFile, `${line}\n`);
}

function describeGaps(gaps) {
  return gaps.map((gap) => `${gap.columnId}/${gap.type}: ${gap.message}`).join(" | ");
}

function main() {
  const board = runConvex("queries/getKanbanBoard") || {};
  const gaps = Array.isArray(board.gaps) ? board.gaps : [];
  const summary = describeGaps(gaps);
  const timestamp = new Date().toISOString();
  appendLogLine(`${timestamp} | gaps=${gaps.length} | ${summary || "none"}`);

  if (gaps.length === 0) {
    console.log("No kanban gaps detected.");
    return;
  }

  const agents = runConvex("queries/getAgents") || [];
  const torv = agents.find((agent) => agent.name === "torv");
  if (!torv || !torv._id) {
    console.warn("Unable to find torv in agents table; skipping notifications.");
    return;
  }

  const details = `${summary} (metrics: ${JSON.stringify(board.metrics || {})})`;
  runConvex("mutations/recordActivity", {
    agentId: torv._id,
    type: "kanban-gap",
    details,
  });
  runConvex("mutations/queueKanbanNotification", {
    agentId: torv._id,
    priority: "high",
    message: `Kanban board gaps detected: ${summary}`,
  });
  console.log(`Logged ${gaps.length} kanban gap(s) and queued notification.`);
}

try {
  main();
} catch (error) {
  appendLogLine(`ERROR | ${(error && error.message) || error}`);
  console.error("Kanban gap monitor failed:", error);
  process.exit(1);
}
