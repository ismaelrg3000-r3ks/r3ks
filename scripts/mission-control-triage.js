#!/usr/bin/env node
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const workspaceRoot = path.resolve(__dirname, "..");
const convexApp = path.join(workspaceRoot, "convex-app");
const logsDir = path.join(workspaceRoot, "logs");
const logFile = path.join(logsDir, "mission-control-triage.log");
const stateFile = path.join(logsDir, "mission-control-triage.last");
const backlogPath = path.join(workspaceRoot, "tasks", "mission-control-backlog.md");
const relevantAgents = ["torv", "rams", "hint"];

const convexEnv = loadConvexEnv();

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function loadConvexEnv() {
  const envFile = path.join(convexApp, ".env.local");
  const envelope = { ...process.env };
  if (!fs.existsSync(envFile)) {
    return envelope;
  }
  for (const row of fs.readFileSync(envFile, "utf-8").split(/\r?\n/)) {
    const trimmed = row.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (value && !envelope[key]) {
      envelope[key] = value;
    }
  }
  return envelope;
}

function runConvex(functionPath, payload = {}) {
  const args = ["convex", "run", `${functionPath}:default`, JSON.stringify(payload)];
  const result = execFileSync("npx", args, {
    cwd: convexApp,
    encoding: "utf-8",
    env: convexEnv,
  }).trim();
  return result ? JSON.parse(result) : null;
}

function appendLog(message) {
  ensureDir(logsDir);
  fs.appendFileSync(logFile, `${new Date().toISOString()} | ${message}\n`);
}

function addBacklogEntry(entryId, agentName, summary, nextActions, timestamp) {
  ensureDir(path.dirname(backlogPath));
  let backlogContent = fs.existsSync(backlogPath) ? fs.readFileSync(backlogPath, "utf-8") : "";
  if (!backlogContent.includes("## Auto-triage suggestions")) {
    backlogContent += `\n## Auto-triage suggestions\n\n`;
    fs.writeFileSync(backlogPath, backlogContent, "utf-8");
  }
  if (backlogContent.includes(entryId)) {
    return;
  }

  const isoDate = new Date(timestamp * 1000).toISOString();
  const header = `- [ ] (handoff:${entryId}) ${agentName} handoff (${isoDate}): ${summary}`;
  const actionLines = nextActions
    .map((action) => `  - ${action}`)
    .join("\n");
  const block = `${header}\n${actionLines}\n  - source: mission-control-triage auto-router`;
  fs.appendFileSync(backlogPath, `${block}\n\n`, "utf-8");
}

function buildNextActions(agentName, openTasks, staleTasks) {
  const actions = [];
  if (openTasks > 0) {
    actions.push(`Prioritize ${openTasks} open task${openTasks === 1 ? "" : "s"} for ${agentName}.`);
  }
  if (staleTasks > 0) {
    actions.push(`Unblock ${staleTasks} stale task${staleTasks === 1 ? "" : "s"}.`);
  }
  switch (agentName) {
    case "torv":
      actions.push("Double-check instrumentation/cron health before the mission check completes.");
      break;
    case "rams":
      actions.push("Review dashboards/docs for clarity and flag confusing spots.");
      break;
    case "hint":
      actions.push("Surface any workflow automation ideas and record them for the knowledge base.");
      break;
    default:
      actions.push("Document the latest observations in Convex so the squad can react.");
  }
  if (actions.length === 0) {
    actions.push("Keep the Mission Control knowledge loop updated.");
  }
  return actions;
}

function main() {
  try {
    ensureDir(logsDir);

    const agents = runConvex("queries/getAgents", {}) || [];
    const agentMap = new Map(agents.map((agent) => [agent.name.toLowerCase(), agent]));
    const baseTimestamp = Math.floor(Date.now() / 1000);
    let insertedAny = false;
    let backlogEntries = 0;
    const counts = { task: 0, content: 0, knowledge: 0 };

    relevantAgents.forEach((agentName, index) => {
      const agent = agentMap.get(agentName);
      if (!agent || !agent._id) {
        appendLog(`Agent ${agentName} not found; skipping auto handoff.`);
        return;
      }

      const openTasks = agent.openTasks ?? 0;
      const staleTasks = agent.staleTasks ?? 0;
      const status = agent.status || agent.heartbeatStatus || "unknown";
      const lastError = agent.lastError || "none";
      const timestamp = baseTimestamp + index;

      const summary = `status=${status}; openTasks=${openTasks}; staleTasks=${staleTasks}; lastError=${lastError}`;
      const nextActions = buildNextActions(agentName, openTasks, staleTasks);
      const classification = [];
      if (openTasks + staleTasks > 0) {
        classification.push("task");
      }
      if (["rams", "hint"].includes(agentName)) {
        classification.push("content");
      }
      if (!classification.includes("knowledge")) {
        classification.push("knowledge");
      }

      const references = ["Mission Control backlog", "agent-monitoring logs"];

      const payload = {
        agentId: agent._id,
        agentName,
        timestamp,
        summary,
        nextActions,
        classification,
        references,
      };

      classification.forEach((cls) => {
        if (counts[cls] !== undefined) {
          counts[cls] += 1;
        }
      });

      const result = runConvex("mutations/logHandoff", payload);
      if (!result || !result.success) {
        appendLog(`Failed to store handoff for ${agentName}.`);
        return;
      }

      const entryId = result.id ? String(result.id) : `${agentName}-${timestamp}-${Math.floor(Math.random() * 1000000)}`;
      if (!result.id) {
        appendLog(`Logged handoff for ${agentName} (fallback id ${entryId}).`);
      } else {
        appendLog(`Logged handoff ${entryId} for ${agentName}.`);
      }
      insertedAny = true;

      if (classification.includes("task")) {
        addBacklogEntry(entryId, agentName, summary, nextActions, timestamp);
        backlogEntries += 1;
        appendLog(`Appended backlog entry for ${agentName} (${entryId}).`);
      }
      if (classification.includes("content")) {
        const docTitle = `Auto triage ${agentName} ${new Date(timestamp * 1000).toISOString()}`;
        const docBody = `${summary}\n\nNext actions:\n- ${nextActions.join("\n- ")}`;
        runConvex("mutations/createDocument", {
          agentId: agent._id,
          title: docTitle,
          body: docBody,
          tags: ["mission-control", "content"],
        });
        appendLog(`Created document for ${agentName} insight.`);
      }
      if (classification.includes("knowledge")) {
        const activityDetails = `${summary}; actions: ${nextActions.join(" | ")}`;
        runConvex("mutations/recordActivity", {
          agentId: agent._id,
          type: "knowledge",
          details: activityDetails,
        });
        appendLog(`Recorded knowledge activity for ${agentName}.`);
      }
    });

    if (insertedAny) {
      const timestamp = Math.floor(Date.now() / 1000);
      const summary = `tasks:${counts.task}, content:${counts.content}, knowledge:${counts.knowledge}`;
      runConvex("mutations/recordGoalProgress", {
        timestamp,
        summary,
        taskCount: counts.task,
        contentCount: counts.content,
        knowledgeCount: counts.knowledge,
        backlogEntries,
        notes: "Mission Control triage run progress",
      });
      fs.writeFileSync(stateFile, String(baseTimestamp), "utf-8");
      appendLog("Mission Control triage run completed.");
    } else {
      appendLog("Mission Control triage run had no relevant agents.");
    }
  } catch (error) {
    appendLog(`mission-control-triage failed: ${error}`);
    console.error(error);
    process.exitCode = 1;
  }
}

main();
