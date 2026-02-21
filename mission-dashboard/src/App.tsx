import './App.css'

const metrics = [
  { label: 'Signal Stability', value: '96%', detail: 'Realtime handshake strength', trend: '+4% vs last sprint' },
  { label: 'Task Throughput', value: '18/30', detail: 'Active ops completed', trend: '+3 new briefs' },
  { label: 'Resource Buffer', value: '78%', detail: 'CPU + mental load light', trend: 'Humming along' },
  { label: 'Comm Pulse', value: '42 msgs', detail: 'Cohort annotations today', trend: 'Idle game energy: +12' },
]

const agents = [
  {
    name: 'kami',
    focus: 'Narratives + visual threads',
    status: 'Wireframe sprint',
    energy: 82,
    tasks: ['Mission deck polish', 'UX roadmap note'],
    icon: '✨',
  },
  {
    name: 'torv',
    focus: 'DevOps + automation',
    status: 'Syncing logs',
    energy: 69,
    tasks: ['Bridge mission-control data', 'Map idle-game pacing'],
    icon: '🛠️',
  },
  {
    name: 'rams',
    focus: 'Clarity audits',
    status: 'Listening to signals',
    energy: 54,
    tasks: ['Sanity check KB entries', 'Log vulnerability notes'],
    icon: '🧭',
  },
  {
    name: 'hint',
    focus: 'Research + strategy',
    status: 'Scanning niches',
    energy: 91,
    tasks: ['Profile idle-game analogues', 'Build research brief'],
    icon: '🔎',
  },
]

const logEntries = [
  '12:02 — Kami swapped neon tokens for mission badges.',
  '11:44 — Torv spun up a low-latency loop to keep agents feeling present.',
  '11:10 — Hint surfaced three niche archetypes that could shape the dashboard story.',
  '10:55 — Rams tagged a knowledge gap, queued it for the next micro-retro.',
]

const resourceNodes = [
  { label: 'Design Fuel', value: '6/8 sparks', emoji: '🎨' },
  { label: 'Data Stream', value: '45 events/min', emoji: '📡' },
  { label: 'Calm Meter', value: 'Tranquil', emoji: '🧘' },
]

type Metric = (typeof metrics)[number]

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <article className="metric-card">
      <header>
        <p>{metric.label}</p>
        <span>{metric.value}</span>
      </header>
      <p className="metric-detail">{metric.detail}</p>
      <p className="metric-trend">{metric.trend}</p>
    </article>
  )
}

function AgentCard({ agent }: { agent: (typeof agents)[number] }) {
  return (
    <article className="agent-card">
      <div className="agent-header">
        <div className="agent-icon">{agent.icon}</div>
        <div>
          <p className="agent-name">{agent.name}</p>
          <p className="agent-focus">{agent.focus}</p>
        </div>
        <span className="agent-energy">{agent.energy}%</span>
      </div>
      <p className="agent-status">{agent.status}</p>
      <ul>
        {agent.tasks.map((task) => (
          <li key={task}>{task}</li>
        ))}
      </ul>
    </article>
  )
}

function MissionLog() {
  return (
    <section className="mission-log">
      <header>
        <h3>Mission log</h3>
        <p>Idle game ticker style</p>
      </header>
      <ul>
        {logEntries.map((entry) => (
          <li key={entry}>{entry}</li>
        ))}
      </ul>
    </section>
  )
}

function ResourceBar() {
  return (
    <section className="resource-bar">
      {resourceNodes.map((node) => (
        <div key={node.label} className="resource-node">
          <span className="resource-emoji">{node.emoji}</span>
          <div>
            <p>{node.label}</p>
            <strong>{node.value}</strong>
          </div>
        </div>
      ))}
    </section>
  )
}

function App() {
  return (
    <div className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Mission Control / Virtual Office</p>
          <h1>Agent cockpit</h1>
          <p className="hero-subtitle">
            A playful workspace that mirrors our crew’s energy, research, and niche-tuned metrics. Each
            customer can swap the signals to match their own industry story.
          </p>
        </div>
        <ResourceBar />
      </header>

      <section className="metrics-grid">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="agents-panel">
        <div className="section-heading">
          <h2>Agents at work</h2>
          <p>Live statuses, focus shifts, and task trails</p>
        </div>
        <div className="agent-grid">
          {agents.map((agent) => (
            <AgentCard key={agent.name} agent={agent} />
          ))}
        </div>
      </section>

      <MissionLog />
    </div>
  )
}

export default App
