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
    role: 'Lead storyteller',
    status: 'Wireframe sprint',
    energy: 82,
    tasks: ['Mission deck polish', 'UX roadmap note'],
    icon: '✨',
  },
  {
    name: 'torv',
    role: 'Automation engineer',
    status: 'Syncing logs',
    energy: 69,
    tasks: ['Bridge mission-control data', 'Map idle-game pacing'],
    icon: '🛠️',
  },
  {
    name: 'rams',
    role: 'Clarity auditor',
    status: 'Listening to signals',
    energy: 54,
    tasks: ['Sanity check KB entries', 'Log vulnerability notes'],
    icon: '🧭',
  },
  {
    name: 'hint',
    role: 'Research scout',
    status: 'Scanning niches',
    energy: 91,
    tasks: ['Profile idle-game analogues', 'Build research brief'],
    icon: '🔎',
  },
]

const kanbanColumns = [
  {
    title: 'Inbox',
    items: ['Capture niche stories', 'Collect agent updates'],
  },
  {
    title: 'Assigned',
    items: ['Craft automation lab pitch', 'Sketch creative agency glow'],
  },
  {
    title: 'In progress',
    items: ['Wireframe menu + tools', 'Prototype agent interactions'],
  },
  {
    title: 'Review',
    items: ['Sync with hint/kami group share'],
  },
  {
    title: 'Done',
    items: ['Mission Control base layout'],
  },
]

type Metric = (typeof metrics)[number]

type Agent = (typeof agents)[number]

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

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <article className="agent-card">
      <div className="agent-header">
        <div className="agent-icon">{agent.icon}</div>
        <div>
          <p className="agent-name">{agent.name}</p>
          <p className="agent-focus">{agent.role}</p>
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

const liveFilters = ['All agents', 'Tasks', 'Comments', 'Decisions', 'Docs', 'Status']

const liveEntries = [
  { type: 'Tasks', text: 'Hint marked “pipeline storyboard” as top priority.' },
  { type: 'Comments', text: 'Kami dropped a color cue in the hero panel.' },
  { type: 'Status', text: 'Torv reports stable latency across automations.' },
  { type: 'Decisions', text: 'Group approved the menu layout for the tycoon controls.' },
]

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

function KanbanBoard() {
  return (
    <section className="kanban-board">
      <header>
        <h3>Mission queue</h3>
        <p>Drag, drop, or tap to keep things flowing.</p>
      </header>
      <div className="kanban-columns">
        {kanbanColumns.map((column) => (
          <article key={column.title} className="kanban-column">
            <h4>{column.title}</h4>
            <ul>
              {column.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function LiveFeed() {
  return (
    <section className="live-feed">
      <header>
        <h3>Live feed</h3>
        <div className="live-tabs">
          {liveFilters.map((filter) => (
            <button key={filter}>{filter}</button>
          ))}
        </div>
      </header>
      <ul>
        {liveEntries.map((entry) => (
          <li key={entry.text}>
            <span className="live-tag">{entry.type}</span>
            {entry.text}
          </li>
        ))}
      </ul>
    </section>
  )
}

function ControlHeader() {
  return (
    <header className="control-header">
      <div>
        <p className="eyebrow">Mission Control</p>
        <h1>Virtual office tycoon</h1>
        <p className="hero-subtitle">
          Interactive cockpit for non-technical folks. Track agents, tasks, and the story behind each signal.
        </p>
      </div>
      <div className="header-stats">
        <p>Active agents · 4</p>
        <p>Tasks in queue · 18</p>
        <div className="header-actions">
          <button>Docs</button>
          <span>online</span>
        </div>
        <p>{new Date().toLocaleString()}</p>
      </div>
    </header>
  )
}

function App() {
  return (
    <div className="page-shell">
      <ControlHeader />
      <ResourceBar />
      <section className="dashboard-columns">
        <div className="agents-panel">
          <div className="section-heading">
            <h2>Agents</h2>
            <p>Role + status</p>
          </div>
          <div className="agent-grid">
            {agents.map((agent) => (
              <AgentCard key={agent.name} agent={agent} />
            ))}
          </div>
        </div>
        <KanbanBoard />
      </section>
      <section className="metrics-grid">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>
      <LiveFeed />
      <MissionLog />
    </div>
  )
}

export default App
