#!/usr/bin/env node
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const workspaceRoot = path.resolve(__dirname, "..");
const convexApp = path.join(workspaceRoot, "convex-app");
const logsDir = path.join(workspaceRoot, "logs");
const logFile = path.join(logsDir, "mission-control-vision-report.log");
const reportFile = path.join(logsDir, "mission-control-vision-report.md");
const convexEnv = loadConvexEnv();
const WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

function loadConvexEnv() {
  const envFile = path.join(convexApp, ".env.local");
  const env = { ...process.env };
  if (!fs.existsSync(envFile)) return env;
  for (const line of fs.readFileSync(envFile, "utf-8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!env[key] && value) env[key] = value;
  }
  return env;
}

function runConvex(queryPath, payload = {}) {
  const args = ["convex", "run", `${queryPath}:default`, JSON.stringify(payload)];
  const result = execFileSync("npx", args, {
    cwd: convexApp,
    encoding: "utf-8",
    env: convexEnv,
  }).trim();
  return result ? JSON.parse(result) : [];
}

function ensureLogsDir() {
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
}

function summarize(goals, progress) {
  const goalMap = new Map();
  const now = Date.now();
  const since = now - WINDOW_MS;
  goals.forEach((goal) => goalMap.set(String(goal.id), goal));

  const buckets = new Map();
  const overall = { taskCount: 0, contentCount: 0, knowledgeCount: 0, backlogEntries: 0 };

  progress.forEach((entry) => {
    if (entry.timestamp * 1000 < since) return;
    const key = entry.goalId ? String(entry.goalId) : "__general__";
    if (!buckets.has(key)) {
      buckets.set(key, { entries: 0, tasks: 0, content: 0, knowledge: 0, backlog: 0 });
    }
    const bucket = buckets.get(key);
    bucket.entries += 1;
    bucket.tasks += entry.taskCount;
    bucket.content += entry.contentCount;
    bucket.knowledge += entry.knowledgeCount;
    bucket.backlog += entry.backlogEntries;

    overall.taskCount += entry.taskCount;
    overall.contentCount += entry.contentCount;
    overall.knowledgeCount += entry.knowledgeCount;
    overall.backlogEntries += entry.backlogEntries;
  });

  return { goalMap, buckets, overall };
}

function buildReport(goals, progressSummary) {
  const when = new Date().toISOString();
  const lines = [
    `# Mission Control Vision Report ${when}`,
    "",
    `*Window*: last 7 days`,
    "",
  ];

  const { goalMap, buckets, overall } = progressSummary;

  lines.push("## Goal progress at a glance", "");
  if (buckets.size === 0) {
    lines.push("No goal progress recorded in the window.", "");
  } else {
    for (const [key, bucket] of buckets.entries()) {
      const goal = goalMap.get(key);
      const title = goal
        ? `*${goal.name}* (${goal.type}${goal.status ? ` — ${goal.status}` : ""})`
        : "*General mission progress*";
      lines.push(title);
      lines.push(`- ${bucket.entries} retried progress row(s)`);
      lines.push(`- Tasks: ${bucket.tasks}, Content hits: ${bucket.content}, Knowledge logs: ${bucket.knowledge}`);
      lines.push(`- Backlog entries generated: ${bucket.backlog}`);
      if (goal?.metric) lines.push(`- Target metric: ${goal.metric}`);
      if (goal?.targetDate) {
        const date = new Date(goal.targetDate).toISOString().split("T")[0];
        lines.push(`- Target date: ${date}`);
      }
      lines.push("");
    }
  }

  lines.push("## Overall metrics", "");
  lines.push(`- Tasks touched: ${overall.taskCount}`);
  lines.push(`- Content signals: ${overall.contentCount}`);
  lines.push(`- Knowledge traces: ${overall.knowledgeCount}`);
  lines.push(`- Backlog entries: ${overall.backlogEntries}`);
  lines.push("", "## Notes", "");
  lines.push("- Checked Convex progress table and mission-control triage outputs.");
  lines.push("- File updated by cron/script for review.");
  return lines.join("\n");
}

function main() {
  try {
    ensureLogsDir();
    const goals = runConvex("queries/getVisionGoals") || [];
    const progress = runConvex("queries/getGoalProgress") || [];
    const summary = summarize(goals, progress);
    const report = buildReport(goals, summary);
    fs.writeFileSync(reportFile, report + "\n", "utf-8");
    fs.appendFileSync(logFile, `${new Date().toISOString()} | vision report refreshed\n`, "utf-8");
    console.log(report);
  } catch (error) {
    console.error("vision report failed", error);
    ensureLogsDir();
    fs.appendFileSync(logFile, `${new Date().toISOString()} | vision report failed: ${error}\n`, "utf-8");
    process.exitCode = 1;
  }
}

main();
