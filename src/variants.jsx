// PortalProv — Variantes (componentes para Design Canvas)

// =========================================
// DASHBOARD LAYOUTS — 3 variantes
// =========================================

function DashHero() {
  return (
    <div style={{ background: 'var(--bg-1)', minHeight: '100%', padding: 32 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>Spend YTD · Mayo 2026</div>
          <div style={{ fontSize: 64, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.04em', lineHeight: 1 }} className="num">$36.3M</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--success)', fontWeight: 500 }}>
              <Icon name="arrowUp" size={13} /> +16.2%
            </span>
            <span style={{ fontSize: 13, color: 'var(--text-4)' }}>vs. mismo periodo 2025</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['6M', '12M', 'YTD'].map(p => (
            <button key={p} className={'btn btn-sm ' + (p === 'YTD' ? 'btn-secondary' : 'btn-ghost')}>{p}</button>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 24, marginBottom: 24 }}>
        <LineChart data={Data.spendByMonth} color="#38bdf8" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
        <KpiCard label="OC abiertas" value="42" trend="+4" icon="cart" />
        <KpiCard label="Facturas por aprobar" value="5" trend="=2 nuevas" icon="invoice" accent="var(--warning-soft)" />
        <KpiCard label="Días promedio pago" value="28" trend="-2 días" icon="clock" />
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Top 3 proveedores</h3>
            <div className="card-sub">Por gasto este mes</div>
          </div>
        </div>
        <div>
          {Data.suppliers.filter(s => s.spend > 0).sort((a, b) => b.spend - a.spend).slice(0, 3).map(s => (
            <div key={s.id} style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar name={s.name} size={36} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: 'var(--text-1)', fontWeight: 500 }}>{s.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-4)' }}>{s.ordenes} órdenes · {s.categoria}</div>
              </div>
              <div className="num" style={{ fontSize: 16, color: 'var(--text-1)', fontWeight: 600 }}>{Data.fmtMXNshort(s.spend)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashGrid() {
  return (
    <div style={{ background: 'var(--bg-1)', minHeight: '100%', padding: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, marginBottom: 16 }}>
        <DenseKpi label="Spend mes" value="$8.6M" delta="+16%" tone="success" />
        <DenseKpi label="OC abiertas" value="42" delta="+4" tone="info" />
        <DenseKpi label="Pendientes" value="5" delta="+2" tone="warning" />
        <DenseKpi label="DPO" value="28d" delta="-2d" tone="success" />
        <DenseKpi label="RFQ activas" value="3" delta="=" tone="neutral" />
        <DenseKpi label="Proveedores" value="147" delta="+3" tone="info" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
        <div className="card" style={{ padding: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--text-4)', marginBottom: 8 }}>SPEND ÚLT. 6M</div>
          <LineChart data={Data.spendByMonth} height={140} />
        </div>
        <div className="card" style={{ padding: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--text-4)', marginBottom: 8 }}>CATEGORÍAS</div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', height: 140 }}>
            <Donut data={Data.spendByCategory} size={120} thickness={18} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11 }}>
              {Data.spendByCategory.slice(0, 4).map(c => (
                <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: c.color }} />
                  <span style={{ flex: 1, color: 'var(--text-2)' }}>{c.name}</span>
                  <span className="num" style={{ color: 'var(--text-1)' }}>{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card" style={{ padding: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--text-4)', marginBottom: 8 }}>ACTIVIDAD</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 11 }}>
            {Data.activity.slice(0, 4).map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: `var(--${a.tone})`, marginTop: 5 }} />
                <div style={{ flex: 1, color: 'var(--text-3)', lineHeight: 1.4 }}>
                  <span style={{ color: 'var(--text-1)' }}>{a.who}</span> {a.what} {a.target && <span className="mono" style={{ color: 'var(--accent)' }}>{a.target}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '10px 14px', fontSize: 11, color: 'var(--text-4)', borderBottom: '1px solid var(--border-1)' }}>TOP PROVEEDORES</div>
        <table className="table">
          <thead><tr><th>Proveedor</th><th>RFC</th><th style={{ textAlign: 'right' }}>Spend</th><th>OC</th><th>Score</th></tr></thead>
          <tbody>
            {Data.suppliers.filter(s => s.spend > 0).slice(0, 4).map(s => (
              <tr key={s.id}>
                <td style={{ color: 'var(--text-1)' }}>{s.name}</td>
                <td className="mono" style={{ fontSize: 11, color: 'var(--text-4)' }}>{s.rfc}</td>
                <td style={{ textAlign: 'right' }} className="num">{Data.fmtMXNshort(s.spend)}</td>
                <td className="num">{s.ordenes}</td>
                <td><span className="num" style={{ color: s.score >= 85 ? 'var(--success)' : 'var(--warning)' }}>{s.score}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DenseKpi({ label, value, delta, tone }) {
  return (
    <div className="card" style={{ padding: 12 }}>
      <div style={{ fontSize: 10, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-1)' }} className="num">{value}</div>
      <div style={{ fontSize: 10, color: `var(--${tone})`, marginTop: 2 }}>{delta}</div>
    </div>
  );
}

function DashList() {
  const rows = [
    { label: 'Gasto del mes', v: '$8.6M', delta: '+16.2%', deltaTone: 'success', spark: [4.2, 5.1, 4.8, 6.2, 7.4, 8.6] },
    { label: 'OC abiertas', v: '42', delta: '+4 esta semana', deltaTone: 'info', spark: [32, 35, 38, 36, 40, 42] },
    { label: 'Facturas por aprobar', v: '5', delta: '$684K pendientes', deltaTone: 'warning', spark: [3, 4, 6, 5, 7, 5] },
    { label: 'Días promedio pago', v: '28', delta: '-2 vs. abril', deltaTone: 'success', spark: [34, 33, 31, 32, 30, 28] },
    { label: 'RFQ activas', v: '3', delta: '5 en evaluación', deltaTone: 'neutral', spark: [2, 4, 3, 5, 4, 3] },
    { label: 'Score promedio proveedores', v: '87', delta: '+3 puntos', deltaTone: 'success', spark: [82, 83, 84, 85, 86, 87] },
  ];
  return (
    <div style={{ background: 'var(--bg-1)', minHeight: '100%', padding: 32 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--text-1)' }}>Resumen ejecutivo</h2>
        <span style={{ fontSize: 11, color: 'var(--text-4)' }}>Lun 26 may, 2026 · 11:42</span>
      </div>
      <p style={{ margin: '0 0 18px', fontSize: 13, color: 'var(--text-3)' }}>Vista compacta para revisión diaria.</p>

      <div className="card">
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '18px 20px', borderBottom: i < rows.length - 1 ? '1px solid var(--border-1)' : 'none', gap: 16 }}>
            <div style={{ flex: '1 1 0', minWidth: 0 }}>
              <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{r.label}</div>
            </div>
            <div style={{ flex: '0 0 120px', textAlign: 'right' }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-1)' }} className="num">{r.v}</div>
            </div>
            <div style={{ flex: '0 0 160px', textAlign: 'right', fontSize: 12, color: `var(--${r.deltaTone})` }}>{r.delta}</div>
            <div style={{ flex: '0 0 100px' }}>
              <Sparkline data={r.spark} width={100} height={28} color={`var(--${r.deltaTone === 'neutral' ? 'accent' : r.deltaTone})`} />
            </div>
            <Icon name="chevronRight" size={14} stroke="var(--text-5)" />
          </div>
        ))}
      </div>
    </div>
  );
}

// =========================================
// SIDEBAR VARIANTS — 3 variantes
// =========================================

function SidebarExpanded() {
  return <Sidebar role="buyer" current="dashboard" onNav={() => {}} collapsed={false} />;
}

function SidebarCollapsed() {
  return <Sidebar role="buyer" current="dashboard" onNav={() => {}} collapsed={true} />;
}

function SidebarSectioned() {
  const sections = [
    { title: 'General', items: [{ id: 'dashboard', label: 'Inicio', icon: 'dashboard' }] },
    { title: 'Procurement', items: [
      { id: 'rfq', label: 'Cotizaciones', icon: 'rfq', badge: 3 },
      { id: 'po', label: 'Órdenes', icon: 'cart' },
      { id: 'invoices', label: 'Facturas', icon: 'invoice', badge: 5 },
    ]},
    { title: 'Proveedores', items: [
      { id: 'suppliers', label: 'Catálogo', icon: 'suppliers', badge: 2 },
      { id: 'onboarding', label: 'Onboarding', icon: 'shield' },
      { id: 'compliance', label: 'Cumplimiento', icon: 'checkCircle' },
    ]},
    { title: 'Workspace', items: [
      { id: 'settings', label: 'Configuración', icon: 'settings' },
      { id: 'team', label: 'Equipo', icon: 'user' },
    ]},
  ];
  return (
    <aside style={{ width: 232, background: 'var(--bg-0)', borderRight: '1px solid var(--border-1)', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '18px 18px', borderBottom: '1px solid var(--border-1)', height: 60, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg, var(--accent), var(--purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg-0)', fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-mono)' }}>P</div>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>PortalProv</span>
          <span style={{ fontSize: 10, color: 'var(--text-4)' }}>Grupo Inmobiliario CDMX</span>
        </div>
      </div>
      <nav style={{ flex: 1, padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto' }}>
        {sections.map((sec, i) => (
          <div key={i}>
            <div style={{ fontSize: 10, color: 'var(--text-5)', fontWeight: 500, padding: '4px 10px 6px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{sec.title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {sec.items.map(item => (
                <div key={item.id} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px',
                  background: item.id === 'dashboard' ? 'var(--bg-3)' : 'transparent',
                  color: item.id === 'dashboard' ? 'var(--text-1)' : 'var(--text-3)',
                  borderRadius: 6, fontSize: 13, cursor: 'pointer'
                }}>
                  <Icon name={item.icon} size={14} stroke={item.id === 'dashboard' ? 'var(--accent)' : 'currentColor'} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 999, background: 'var(--accent-soft)', color: 'var(--accent)', fontWeight: 500 }}>{item.badge}</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

// =========================================
// TABLE STYLES — 3 variantes
// =========================================

function TableRows({ supplier }) {
  return Data.suppliers.slice(0, 6).map(s => (
    <tr key={s.id}>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar name={s.name} size={26} />
          <div>
            <div style={{ color: 'var(--text-1)', fontWeight: 500 }}>{s.name}</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--text-4)' }}>{s.id}</div>
          </div>
        </div>
      </td>
      <td><span className="mono" style={{ fontSize: 12, color: 'var(--text-3)' }}>{s.rfc}</span></td>
      <td>{s.categoria}</td>
      <td><StatusBadge tone={s.estadoTone}>{s.estado}</StatusBadge></td>
      <td style={{ textAlign: 'right' }} className="num">{s.spend ? Data.fmtMXNshort(s.spend) : '—'}</td>
    </tr>
  ));
}

function TableBordered() {
  return (
    <div style={{ background: 'var(--bg-1)', padding: 24, minHeight: '100%' }}>
      <div style={{ marginBottom: 12, display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Bordered</h3>
        <span style={{ fontSize: 11, color: 'var(--text-4)' }}>· bordes en cada celda · clásico enterprise</span>
      </div>
      <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
        <table className="table" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Proveedor', 'RFC', 'Categoría', 'Estado', 'Spend YTD'].map((h, i) => (
                <th key={h} style={{ borderRight: i < 4 ? '1px solid var(--border-1)' : 'none' }}>{h === 'Spend YTD' ? <span style={{ display: 'block', textAlign: 'right' }}>{h}</span> : h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Data.suppliers.slice(0, 6).map(s => (
              <tr key={s.id}>
                <td style={{ borderRight: '1px solid var(--border-1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={s.name} size={26} />
                    <div>
                      <div style={{ color: 'var(--text-1)', fontWeight: 500 }}>{s.name}</div>
                      <div className="mono" style={{ fontSize: 11, color: 'var(--text-4)' }}>{s.id}</div>
                    </div>
                  </div>
                </td>
                <td style={{ borderRight: '1px solid var(--border-1)' }}><span className="mono" style={{ fontSize: 12, color: 'var(--text-3)' }}>{s.rfc}</span></td>
                <td style={{ borderRight: '1px solid var(--border-1)' }}>{s.categoria}</td>
                <td style={{ borderRight: '1px solid var(--border-1)' }}><StatusBadge tone={s.estadoTone}>{s.estado}</StatusBadge></td>
                <td style={{ textAlign: 'right' }} className="num">{s.spend ? Data.fmtMXNshort(s.spend) : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableStriped() {
  return (
    <div style={{ background: 'var(--bg-1)', padding: 24, minHeight: '100%' }}>
      <div style={{ marginBottom: 12, display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Striped</h3>
        <span style={{ fontSize: 11, color: 'var(--text-4)' }}>· filas alternadas · lectura larga</span>
      </div>
      <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Proveedor</th><th>RFC</th><th>Categoría</th><th>Estado</th><th style={{ textAlign: 'right' }}>Spend YTD</th>
            </tr>
          </thead>
          <tbody>
            {Data.suppliers.slice(0, 6).map((s, i) => (
              <tr key={s.id} style={{ background: i % 2 === 1 ? 'var(--bg-1)' : 'transparent' }}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={s.name} size={26} />
                    <div>
                      <div style={{ color: 'var(--text-1)', fontWeight: 500 }}>{s.name}</div>
                      <div className="mono" style={{ fontSize: 11, color: 'var(--text-4)' }}>{s.id}</div>
                    </div>
                  </div>
                </td>
                <td><span className="mono" style={{ fontSize: 12, color: 'var(--text-3)' }}>{s.rfc}</span></td>
                <td>{s.categoria}</td>
                <td><StatusBadge tone={s.estadoTone}>{s.estado}</StatusBadge></td>
                <td style={{ textAlign: 'right' }} className="num">{s.spend ? Data.fmtMXNshort(s.spend) : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableMinimal() {
  return (
    <div style={{ background: 'var(--bg-1)', padding: 24, minHeight: '100%' }}>
      <div style={{ marginBottom: 12, display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Minimal</h3>
        <span style={{ fontSize: 11, color: 'var(--text-4)' }}>· sin bordes · estilo Linear / Vercel</span>
      </div>
      <div style={{ background: 'transparent' }}>
        <table className="table" style={{ background: 'transparent' }}>
          <thead>
            <tr>
              <th style={{ background: 'transparent', borderBottom: 'none', paddingBottom: 16 }}>Proveedor</th>
              <th style={{ background: 'transparent', borderBottom: 'none' }}>RFC</th>
              <th style={{ background: 'transparent', borderBottom: 'none' }}>Categoría</th>
              <th style={{ background: 'transparent', borderBottom: 'none' }}>Estado</th>
              <th style={{ background: 'transparent', borderBottom: 'none', textAlign: 'right' }}>Spend YTD</th>
            </tr>
          </thead>
          <tbody>
            {Data.suppliers.slice(0, 6).map(s => (
              <tr key={s.id}>
                <td style={{ borderBottom: 'none', padding: '10px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={s.name} size={26} />
                    <div>
                      <div style={{ color: 'var(--text-1)', fontWeight: 500 }}>{s.name}</div>
                      <div className="mono" style={{ fontSize: 11, color: 'var(--text-4)' }}>{s.id}</div>
                    </div>
                  </div>
                </td>
                <td style={{ borderBottom: 'none' }}><span className="mono" style={{ fontSize: 12, color: 'var(--text-3)' }}>{s.rfc}</span></td>
                <td style={{ borderBottom: 'none' }}>{s.categoria}</td>
                <td style={{ borderBottom: 'none' }}><StatusBadge tone={s.estadoTone}>{s.estado}</StatusBadge></td>
                <td style={{ borderBottom: 'none', textAlign: 'right' }} className="num">{s.spend ? Data.fmtMXNshort(s.spend) : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =========================================
// EMPTY STATES — 3 variantes
// =========================================

function EmptyIllustration() {
  return (
    <div style={{ background: 'var(--bg-1)', padding: 32, minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: 520, padding: 56, textAlign: 'center' }}>
        <svg width="160" height="120" viewBox="0 0 160 120" style={{ display: 'block', margin: '0 auto 24px' }}>
          <defs>
            <linearGradient id="docG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1f2a44" />
              <stop offset="100%" stopColor="#111a2e" />
            </linearGradient>
          </defs>
          {/* back doc */}
          <rect x="34" y="20" width="72" height="92" rx="6" fill="url(#docG)" stroke="var(--border-2)" />
          {/* front doc */}
          <rect x="54" y="34" width="72" height="80" rx="6" fill="var(--bg-3)" stroke="var(--border-3)" />
          <line x1="64" y1="50" x2="116" y2="50" stroke="var(--border-3)" strokeWidth="2" strokeLinecap="round" />
          <line x1="64" y1="60" x2="106" y2="60" stroke="var(--border-3)" strokeWidth="2" strokeLinecap="round" />
          <line x1="64" y1="70" x2="116" y2="70" stroke="var(--border-3)" strokeWidth="2" strokeLinecap="round" />
          <line x1="64" y1="80" x2="96" y2="80" stroke="var(--border-3)" strokeWidth="2" strokeLinecap="round" />
          {/* plus circle */}
          <circle cx="120" cy="36" r="14" fill="var(--accent)" />
          <path d="M120 30 V 42 M114 36 H 126" stroke="var(--bg-0)" strokeWidth="2.4" strokeLinecap="round" />
          {/* sparkle */}
          <path d="M30 80 l2 4 l4 2 l-4 2 l-2 4 l-2 -4 l-4 -2 l4 -2 z" fill="var(--purple)" />
        </svg>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--text-1)' }}>Aún no tienes facturas</h3>
        <p style={{ margin: '8px 0 24px', fontSize: 13, color: 'var(--text-3)', maxWidth: 360, marginLeft: 'auto', marginRight: 'auto' }}>
          Cuando tus proveedores suban CFDIs aparecerán aquí. También puedes cargarlos manualmente.
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button className="btn btn-outline">Ver guía</button>
          <button className="btn btn-primary"><Icon name="upload" size={14} /> Cargar primera factura</button>
        </div>
      </div>
    </div>
  );
}

function EmptyMinimal() {
  return (
    <div style={{ background: 'var(--bg-1)', padding: 32, minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: 520, padding: '48px 32px', textAlign: 'center' }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--bg-3)', color: 'var(--text-3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <Icon name="inbox" size={20} />
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>Sin facturas</div>
        <p style={{ margin: '6px 0 18px', fontSize: 12, color: 'var(--text-4)' }}>
          Tu bandeja está vacía.
        </p>
        <button className="btn btn-secondary btn-sm">Cargar CFDI</button>
      </div>
    </div>
  );
}

function EmptyCTA() {
  return (
    <div style={{ background: 'var(--bg-1)', padding: 32, minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 560, padding: 40, textAlign: 'center', background: 'linear-gradient(135deg, var(--bg-2), rgba(56,189,248,0.04))', border: '1px solid var(--border-2)', borderRadius: 16, position: 'relative', overflow: 'hidden' }}>
        <svg style={{ position: 'absolute', top: 0, right: 0, opacity: 0.5 }} width="220" height="220">
          <defs>
            <radialGradient id="ctaglow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="180" cy="40" r="100" fill="url(#ctaglow)" />
        </svg>
        <div style={{ position: 'relative' }}>
          <Pill tone="accent">Primer paso</Pill>
          <h2 style={{ margin: '14px 0 6px', fontSize: 22, fontWeight: 600, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Empieza por agregar proveedores</h2>
          <p style={{ margin: '0 0 24px', fontSize: 14, color: 'var(--text-3)' }}>
            Invita o registra a tus proveedores actuales. Validamos automáticamente su información tributaria contra el SAT.
          </p>
          <button className="btn btn-primary btn-lg" style={{ padding: '0 24px', fontSize: 14 }}><Icon name="plus" size={16} strokeWidth={2.4} /> Agregar proveedor</button>
          <div style={{ marginTop: 18, fontSize: 12, color: 'var(--text-4)' }}>
            ¿Tienes muchos proveedores? <a href="#" style={{ color: 'var(--accent)' }}>Importa un CSV →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  DashHero, DashGrid, DashList,
  SidebarExpanded, SidebarCollapsed, SidebarSectioned,
  TableBordered, TableStriped, TableMinimal,
  EmptyIllustration, EmptyMinimal, EmptyCTA,
});
