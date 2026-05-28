// PortalProv — Shared UI components

function StatusBadge({ tone = 'neutral', children, icon = true }) {
  const cls = 'badge badge-' + tone;
  return (
    <span className={cls}>
      {icon && <span className="dot" style={{ background: 'currentColor' }} />}
      {children}
    </span>
  );
}

function Pill({ children, tone = 'neutral' }) {
  return <span className={'badge badge-' + tone}>{children}</span>;
}

function Avatar({ name, size = 28, tone }) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(s => s[0]).join('').toUpperCase();
  const gradients = [
    'linear-gradient(135deg, #0284c7, #a78bfa)',
    'linear-gradient(135deg, #0d9488, #34d399)',
    'linear-gradient(135deg, #b45309, #fbbf24)',
    'linear-gradient(135deg, #9333ea, #ec4899)',
    'linear-gradient(135deg, #0369a1, #38bdf8)',
  ];
  const idx = name.charCodeAt(0) % gradients.length;
  return (
    <span className="avatar" style={{ width: size, height: size, fontSize: size * 0.42, background: tone || gradients[idx] }}>
      {initials}
    </span>
  );
}

function KpiCard({ label, value, sub, trend, icon, accent }) {
  const positive = trend && trend.startsWith('+');
  const neutral = trend && trend.startsWith('=');
  return (
    <div className="card" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14, minHeight: 116 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500 }}>{label}</div>
        {icon && <div style={{ width: 28, height: 28, borderRadius: 8, background: accent || 'var(--accent-soft)', color: accent ? '#fff' : 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={icon} size={14} />
        </div>}
      </div>
      <div>
        <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--text-1)', letterSpacing: '-0.02em' }} className="num">{value}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
          {trend && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 11, fontWeight: 500, color: neutral ? 'var(--text-4)' : positive ? 'var(--success)' : 'var(--danger)' }}>
              <Icon name={positive ? 'arrowUp' : neutral ? 'arrowRight' : 'arrowDown'} size={11} />
              {trend.replace(/^[+=\-]/, '')}
            </span>
          )}
          {sub && <span style={{ fontSize: 11, color: 'var(--text-4)' }}>{sub}</span>}
        </div>
      </div>
    </div>
  );
}

// Tiny sparkline (no library)
function Sparkline({ data, width = 120, height = 36, color = 'var(--accent)', fill = true }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return [x, y];
  });
  const d = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const area = d + ` L${width},${height} L0,${height} Z`;
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      {fill && <path d={area} fill={color} opacity="0.12" />}
      <path d={d} stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// Bar chart
function BarChart({ data, height = 200, color = '#38bdf8' }) {
  const max = Math.max(...data.map(d => d.v));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height, paddingBottom: 24, position: 'relative' }}>
      {data.map((d, i) => {
        const h = (d.v / max) * (height - 40);
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 11, color: 'var(--text-3)' }} className="num">${d.v.toFixed(1)}M</div>
            <div style={{ width: '100%', maxWidth: 56, height: h, background: `linear-gradient(180deg, ${color}, ${color}66)`, borderRadius: '4px 4px 0 0', position: 'relative' }} />
            <div style={{ position: 'absolute', bottom: 0, fontSize: 11, color: 'var(--text-4)' }}>{d.m}</div>
          </div>
        );
      })}
    </div>
  );
}

// Donut / pie
function Donut({ data, size = 160, thickness = 22 }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const radius = (size - thickness) / 2;
  const circ = 2 * Math.PI * radius;
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--border-1)" strokeWidth={thickness} />
      {data.map((d, i) => {
        const len = (d.value / total) * circ;
        const dash = `${len} ${circ - len}`;
        const dashoffset = -offset;
        offset += len;
        return (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={d.color}
            strokeWidth={thickness}
            strokeDasharray={dash}
            strokeDashoffset={dashoffset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        );
      })}
      <text x="50%" y="48%" textAnchor="middle" fill="var(--text-1)" fontSize="22" fontWeight="600" fontFamily="var(--font-sans)">100%</text>
      <text x="50%" y="62%" textAnchor="middle" fill="var(--text-4)" fontSize="10">distribución</text>
    </svg>
  );
}

// Line chart with grid
function LineChart({ data, height = 240, color = '#38bdf8' }) {
  const width = 600;
  const padding = { top: 20, right: 16, bottom: 28, left: 40 };
  const max = Math.max(...data.map(d => d.v)) * 1.1;
  const min = 0;
  const w = width - padding.left - padding.right;
  const h = height - padding.top - padding.bottom;
  const pts = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * w;
    const y = padding.top + h - ((d.v - min) / (max - min)) * h;
    return [x, y, d];
  });
  const path = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const area = path + ` L${pts[pts.length-1][0]},${padding.top + h} L${pts[0][0]},${padding.top + h} Z`;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map(t => ({ y: padding.top + h - t * h, v: (min + t * (max - min)).toFixed(1) }));
  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height, display: 'block' }}>
      {ticks.map((t, i) => (
        <g key={i}>
          <line x1={padding.left} y1={t.y} x2={width - padding.right} y2={t.y} stroke="var(--border-1)" strokeDasharray="2 4" />
          <text x={padding.left - 8} y={t.y + 3} textAnchor="end" fontSize="10" fill="var(--text-4)" fontFamily="var(--font-sans)">${t.v}M</text>
        </g>
      ))}
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#lineGrad)" />
      <path d={path} stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p[0]} cy={p[1]} r="3" fill="var(--bg-1)" stroke={color} strokeWidth="2" />
          <text x={p[0]} y={height - 10} textAnchor="middle" fontSize="11" fill="var(--text-3)" fontFamily="var(--font-sans)">{p[2].m}</text>
        </g>
      ))}
    </svg>
  );
}

// Empty state
function EmptyState({ icon = 'inbox', title, body, action }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', textAlign: 'center', gap: 12 }}>
      <div style={{ width: 56, height: 56, borderRadius: 14, background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)' }}>
        <Icon name={icon} size={22} />
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>{title}</div>
        {body && <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4, maxWidth: 360 }}>{body}</div>}
      </div>
      {action}
    </div>
  );
}

// Tabs
function Tabs({ items, value, onChange }) {
  return (
    <div className="tabs">
      {items.map(t => (
        <button key={t.id} className={'tab' + (value === t.id ? ' active' : '')} onClick={() => onChange(t.id)}>
          {t.label}
          {t.count != null && <span style={{ marginLeft: 6, padding: '0 6px', background: 'var(--bg-3)', color: 'var(--text-3)', fontSize: 10, borderRadius: 4 }}>{t.count}</span>}
        </button>
      ))}
    </div>
  );
}

// Progress bar
function Progress({ value, color = 'var(--accent)' }) {
  return (
    <div style={{ height: 6, background: 'var(--bg-3)', borderRadius: 3, overflow: 'hidden', width: '100%' }}>
      <div style={{ height: '100%', width: value + '%', background: color, borderRadius: 3, transition: 'width 300ms' }} />
    </div>
  );
}

// Step indicator
function Stepper({ steps, current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: done ? 'var(--accent)' : active ? 'var(--accent-soft-2)' : 'var(--bg-3)',
                color: done ? 'var(--accent-text)' : active ? 'var(--accent)' : 'var(--text-4)',
                border: '1px solid ' + (active ? 'var(--accent)' : 'transparent'),
                fontSize: 12, fontWeight: 600
              }}>
                {done ? <Icon name="check" size={14} strokeWidth={2.4} /> : i + 1}
              </div>
              <div style={{ fontSize: 13, color: active ? 'var(--text-1)' : done ? 'var(--text-2)' : 'var(--text-4)', fontWeight: active ? 500 : 400 }}>{s}</div>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: done ? 'var(--accent)' : 'var(--border-1)', margin: '0 14px' }} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// Toggle
function Toggle({ on, onChange, label }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => onChange && onChange(!on)}>
      <span style={{
        width: 32, height: 18, borderRadius: 10, padding: 2,
        background: on ? 'var(--accent)' : 'var(--bg-3)',
        transition: 'background 150ms', flexShrink: 0,
        position: 'relative'
      }}>
        <span style={{
          width: 14, height: 14, borderRadius: '50%', background: 'white',
          transform: on ? 'translateX(14px)' : 'translateX(0)',
          transition: 'transform 150ms', display: 'block'
        }} />
      </span>
      {label && <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{label}</span>}
    </label>
  );
}

Object.assign(window, { StatusBadge, Pill, Avatar, KpiCard, Sparkline, BarChart, Donut, LineChart, EmptyState, Tabs, Progress, Stepper, Toggle });
