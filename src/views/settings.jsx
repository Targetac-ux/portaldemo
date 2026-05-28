// PortalProv — Settings (tenant)

function SettingsView() {
  const [tab, setTab] = React.useState('general');
  return (
    <div>
      <PageHeader
        title="Configuración"
        subtitle="Personaliza tu workspace, módulos activos y permisos por rol."
        actions={<button className="btn btn-primary">Guardar cambios</button>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: 'calc(100% - 100px)' }}>
        <aside style={{ borderRight: '1px solid var(--border-1)', padding: '20px 14px' }}>
          {[
            { id: 'general', label: 'General', icon: 'building' },
            { id: 'brand', label: 'Marca', icon: 'sparkles' },
            { id: 'modules', label: 'Módulos', icon: 'layers' },
            { id: 'team', label: 'Equipo', icon: 'suppliers' },
            { id: 'roles', label: 'Roles & permisos', icon: 'lock' },
            { id: 'integrations', label: 'Integraciones', icon: 'link' },
            { id: 'notifications', label: 'Notificaciones', icon: 'bell' },
            { id: 'billing', label: 'Facturación', icon: 'dollar' },
          ].map(s => (
            <button key={s.id} onClick={() => setTab(s.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%',
              padding: '8px 10px', background: tab === s.id ? 'var(--bg-2)' : 'transparent',
              color: tab === s.id ? 'var(--text-1)' : 'var(--text-3)',
              border: 'none', borderRadius: 6, cursor: 'pointer', textAlign: 'left',
              fontSize: 13, fontWeight: tab === s.id ? 500 : 400, marginBottom: 2
            }}>
              <Icon name={s.icon} size={14} stroke={tab === s.id ? 'var(--accent)' : 'currentColor'} />
              {s.label}
            </button>
          ))}
        </aside>

        <div style={{ padding: 28 }}>
          {tab === 'general' && <SettingsGeneral />}
          {tab === 'brand' && <SettingsBrand />}
          {tab === 'modules' && <SettingsModules />}
          {tab === 'team' && <SettingsTeam />}
          {tab === 'roles' && <SettingsRoles />}
          {tab === 'integrations' && <SettingsIntegrations />}
          {tab === 'notifications' && <SettingsNotifications />}
          {tab === 'billing' && <SettingsBilling />}
        </div>
      </div>
    </div>
  );
}

function SettingsGeneral() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720 }}>
      <SettingSection title="Información de la empresa" desc="Datos fiscales y de contacto del tenant.">
        <Field label="Razón social" value="Grupo Inmobiliario CDMX SA de CV" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Field label="RFC" value="GIC180415H89" mono />
          <Field label="Régimen fiscal" select options={['601 — General Personas Morales']} />
        </div>
        <Field label="Domicilio fiscal" value="Av. Insurgentes Sur 1602, Crédito Constructor, CDMX, 03940" />
      </SettingSection>

      <SettingSection title="Zona horaria y moneda" desc="">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Field label="Zona horaria" select options={['America/Mexico_City (GMT-6)', 'America/Monterrey (GMT-6)', 'America/Tijuana (GMT-8)']} />
          <Field label="Moneda principal" select options={['MXN — Peso mexicano', 'USD — Dólar estadounidense']} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Field label="Formato de fecha" select options={['DD/MM/AAAA (26/05/2026)', 'AAAA-MM-DD (2026-05-26)']} />
          <Field label="Idioma" select options={['Español (México)', 'English (US)']} />
        </div>
      </SettingSection>
    </div>
  );
}

function SettingsBrand() {
  const colors = ['#38bdf8', '#34d399', '#a78bfa', '#fb923c', '#f472b6', '#0ea5e9'];
  const [selected, setSelected] = React.useState('#38bdf8');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720 }}>
      <SettingSection title="Logo" desc="Se mostrará en la sidebar y en los correos automáticos.">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 72, height: 72, borderRadius: 14, background: 'linear-gradient(135deg, var(--accent), var(--purple))', color: 'var(--bg-0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 28, fontFamily: 'var(--font-mono)' }}>P</div>
          <div style={{ flex: 1 }}>
            <button className="btn btn-outline btn-sm">Subir logo</button>
            <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 6 }}>SVG, PNG o JPG · cuadrado · mínimo 256px</div>
          </div>
        </div>
      </SettingSection>

      <SettingSection title="Color de acento" desc="Aplica al estado, botones primarios y elementos activos.">
        <div style={{ display: 'flex', gap: 12 }}>
          {colors.map(c => (
            <button key={c} onClick={() => setSelected(c)} style={{
              width: 40, height: 40, borderRadius: 10, background: c,
              border: selected === c ? '2px solid var(--text-1)' : '2px solid transparent',
              padding: 0, cursor: 'pointer', position: 'relative'
            }}>
              {selected === c && <Icon name="check" size={16} stroke="white" strokeWidth={2.4} style={{ position: 'absolute', top: 10, left: 10 }} />}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <Field label="" placeholder="#000000" value={selected} mono />
        </div>
      </SettingSection>

      <SettingSection title="Tema por defecto" desc="">
        <div style={{ display: 'flex', gap: 12 }}>
          {[{ id: 'dark', label: 'Oscuro', bg: '#0b1220' }, { id: 'light', label: 'Claro', bg: '#f8fafc' }, { id: 'auto', label: 'Automático', bg: 'linear-gradient(135deg, #0b1220 50%, #f8fafc 50%)' }].map(t => (
            <button key={t.id} style={{
              flex: 1, padding: 16, background: 'var(--bg-2)', border: '1px solid ' + (t.id === 'dark' ? 'var(--accent)' : 'var(--border-1)'),
              borderRadius: 10, cursor: 'pointer', textAlign: 'left'
            }}>
              <div style={{ width: '100%', height: 60, background: t.bg, borderRadius: 6, marginBottom: 10 }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: 'var(--text-1)', fontWeight: 500 }}>{t.label}</span>
                {t.id === 'dark' && <Icon name="check" size={14} stroke="var(--accent)" strokeWidth={2.4} />}
              </div>
            </button>
          ))}
        </div>
      </SettingSection>
    </div>
  );
}

function SettingsModules() {
  const modules = [
    { id: 'suppliers', name: 'Proveedores', desc: 'Catálogo, onboarding, cumplimiento.', on: true, plan: 'Core' },
    { id: 'po', name: 'Órdenes de compra', desc: 'Crear, aprobar y rastrear OCs.', on: true, plan: 'Core' },
    { id: 'inv', name: 'Facturación CFDI', desc: 'Recepción, validación y conciliación 3-way.', on: true, plan: 'Core' },
    { id: 'rfq', name: 'Cotizaciones (RFQ)', desc: 'Solicitar y comparar propuestas.', on: true, plan: 'Pro' },
    { id: 'cat', name: 'Catálogos punchout', desc: 'Integración con catálogos electrónicos.', on: false, plan: 'Pro' },
    { id: 'budget', name: 'Presupuestos y centros de costo', desc: 'Asignación y control de gasto.', on: true, plan: 'Pro' },
    { id: 'contracts', name: 'Contratos', desc: 'Repositorio y vigencias.', on: false, plan: 'Enterprise' },
    { id: 'esg', name: 'ESG / Diversidad de proveedores', desc: 'Métricas de impacto y reportes.', on: false, plan: 'Enterprise' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 720 }}>
      {modules.map(m => (
        <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, background: 'var(--bg-2)', border: '1px solid var(--border-1)', borderRadius: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14, color: 'var(--text-1)', fontWeight: 500 }}>{m.name}</span>
              <Pill tone={m.plan === 'Core' ? 'success' : m.plan === 'Pro' ? 'accent' : 'purple'}>{m.plan}</Pill>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>{m.desc}</div>
          </div>
          <Toggle on={m.on} onChange={() => {}} />
        </div>
      ))}
    </div>
  );
}

function SettingsTeam() {
  const team = [
    { name: 'Comprador', email: 'mrodriguez@grupocdmx.mx', role: 'Comprador', last: 'hace 12 min' },
    { name: 'Carlos Mendoza López', email: 'cmendoza@grupocdmx.mx', role: 'Comprador', last: 'hace 1 h' },
    { name: 'Jorge Castillo Reyes', email: 'jcastillo@grupocdmx.mx', role: 'Gerente Compras', last: 'hace 2 h' },
    { name: 'Patricia Vázquez Torres', email: 'pvazquez@grupocdmx.mx', role: 'CFO', last: 'ayer' },
    { name: 'Ana Sofía Hernández', email: 'ahernandez@grupocdmx.mx', role: 'Comprador', last: 'hace 3 d' },
  ];
  return (
    <div style={{ maxWidth: 880 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--text-1)' }}>Miembros del equipo</h3>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-3)' }}>{team.length} usuarios · 3 plazas disponibles</p>
        </div>
        <button className="btn btn-primary"><Icon name="plus" size={14} strokeWidth={2.4} /> Invitar miembro</button>
      </div>
      <div className="card">
        <table className="table">
          <thead><tr><th>Usuario</th><th>Rol</th><th>Último acceso</th><th></th></tr></thead>
          <tbody>
            {team.map((u, i) => (
              <tr key={i}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={u.name} size={32} />
                    <div>
                      <div style={{ color: 'var(--text-1)', fontWeight: 500 }}>{u.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-4)' }}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td><Pill tone={u.role === 'CFO' ? 'purple' : u.role === 'Gerente Compras' ? 'accent' : 'neutral'}>{u.role}</Pill></td>
                <td>{u.last}</td>
                <td><button className="btn btn-ghost btn-icon btn-sm"><Icon name="more" size={14} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SettingsRoles() {
  const perms = ['Ver', 'Crear', 'Editar', 'Aprobar', 'Eliminar'];
  const roles = ['Comprador', 'Gerente Compras', 'CFO', 'Solo lectura'];
  const modules = ['Proveedores', 'Órdenes de compra', 'Facturas', 'RFQ', 'Configuración'];
  const matrix = {
    'Comprador':         [['V', 'V', 'V', '', ''], ['V', 'V', 'V', '', ''], ['V', '', '', '', ''], ['V', 'V', 'V', '', ''], ['', '', '', '', '']],
    'Gerente Compras':   [['V', 'V', 'V', 'V', ''], ['V', 'V', 'V', 'V', ''], ['V', '', 'V', 'V', ''], ['V', 'V', 'V', 'V', ''], ['V', '', '', '', '']],
    'CFO':               [['V', '', '', 'V', ''], ['V', '', '', 'V', ''], ['V', '', '', 'V', ''], ['V', '', '', 'V', ''], ['V', 'V', 'V', '', '']],
    'Solo lectura':      [['V', '', '', '', ''], ['V', '', '', '', ''], ['V', '', '', '', ''], ['V', '', '', '', ''], ['', '', '', '', '']],
  };
  return (
    <div style={{ maxWidth: 980 }}>
      <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: 'var(--text-1)' }}>Matriz de permisos por rol</h3>
      <div className="card" style={{ overflow: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Módulo</th>
              {roles.map(r => (
                <th key={r} colSpan={5} style={{ textAlign: 'center', borderLeft: '1px solid var(--border-1)' }}>{r}</th>
              ))}
            </tr>
            <tr>
              <th></th>
              {roles.map(r => perms.map((p, i) => (
                <th key={r + p} style={{ textAlign: 'center', fontSize: 10, padding: '6px 4px', borderLeft: i === 0 ? '1px solid var(--border-1)' : 'none' }}>{p}</th>
              )))}
            </tr>
          </thead>
          <tbody>
            {modules.map((m, mi) => (
              <tr key={m}>
                <td style={{ color: 'var(--text-1)', fontWeight: 500 }}>{m}</td>
                {roles.map(r => matrix[r][mi].map((v, pi) => (
                  <td key={r + pi} style={{ textAlign: 'center', borderLeft: pi === 0 ? '1px solid var(--border-1)' : 'none', padding: '8px 4px' }}>
                    {v === 'V' ? <Icon name="check" size={14} stroke="var(--success)" strokeWidth={2.4} /> : <span style={{ color: 'var(--text-5)' }}>—</span>}
                  </td>
                )))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SettingsIntegrations() {
  const integrations = [
    { name: 'SAP ERP', desc: 'Sincronización bidireccional de OCs y facturas.', status: 'connected', icon: 'B' },
    { name: 'Microsoft 365', desc: 'SSO y notificaciones a Teams.', status: 'connected', icon: 'M' },
    { name: 'SAT (PAC: Solución Factible)', desc: 'Validación de CFDI en tiempo real.', status: 'connected', icon: 'S' },
    { name: 'Slack', desc: 'Notificaciones a canales del equipo.', status: 'disconnected', icon: 's' },
    { name: 'QuickBooks', desc: 'Exportación contable.', status: 'disconnected', icon: 'Q' },
    { name: 'DocuSign', desc: 'Firma electrónica de contratos.', status: 'disconnected', icon: 'D' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, maxWidth: 880 }}>
      {integrations.map(i => (
        <div key={i.name} className="card" style={{ padding: 18, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--text-1)', fontSize: 16, fontFamily: 'var(--font-mono)' }}>{i.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, color: 'var(--text-1)', fontWeight: 500 }}>{i.name}</span>
              {i.status === 'connected' && <StatusBadge tone="success">Conectado</StatusBadge>}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>{i.desc}</div>
            <button className="btn btn-outline btn-sm" style={{ marginTop: 12 }}>
              {i.status === 'connected' ? 'Configurar' : 'Conectar'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function SettingsNotifications() {
  const channels = [['Email', true], ['In-app', true], ['Slack', false], ['SMS', false]];
  const events = [
    ['Nueva OC requiere mi aprobación', [true, true, false, true]],
    ['Factura subida por proveedor', [true, true, false, false]],
    ['RFQ recibe nueva cotización', [true, true, false, false]],
    ['Proveedor completa onboarding', [false, true, false, false]],
    ['Documento de cumplimiento por vencer', [true, true, false, true]],
  ];
  return (
    <div className="card" style={{ maxWidth: 720, overflow: 'hidden' }}>
      <table className="table">
        <thead>
          <tr>
            <th>Evento</th>
            {channels.map(([c]) => <th key={c} style={{ textAlign: 'center' }}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {events.map(([e, vals]) => (
            <tr key={e}>
              <td style={{ color: 'var(--text-1)' }}>{e}</td>
              {vals.map((v, i) => (
                <td key={i} style={{ textAlign: 'center' }}>
                  <Toggle on={v} onChange={() => {}} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SettingsBilling() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720 }}>
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Pill tone="accent">Plan Pro</Pill>
            <div style={{ fontSize: 26, fontWeight: 600, color: 'var(--text-1)', marginTop: 8 }} className="num">$4,800 <span style={{ fontSize: 13, color: 'var(--text-4)', fontWeight: 400 }}>MXN / mes</span></div>
            <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>Hasta 50 usuarios · 200 proveedores · RFQ ilimitadas</div>
          </div>
          <button className="btn btn-outline">Cambiar plan</button>
        </div>
        <div style={{ marginTop: 20, padding: 14, background: 'var(--bg-1)', borderRadius: 8, display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-4)' }}>Próxima factura</div>
            <div style={{ fontSize: 14, color: 'var(--text-1)', marginTop: 2 }} className="num">15 jun 2026 · {Data.fmtMXN(4800)}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-4)' }}>Método de pago</div>
            <div style={{ fontSize: 14, color: 'var(--text-1)', marginTop: 2 }} className="mono">VISA ··· 4429</div>
          </div>
        </div>
      </div>

      <SettingSection title="Uso este mes" desc="">
        <UsageRow label="Usuarios activos" value={32} max={50} />
        <UsageRow label="Proveedores activos" value={147} max={200} />
        <UsageRow label="Almacenamiento de documentos" value={4.2} max={20} unit="GB" />
        <UsageRow label="RFQ enviadas" value="—" max="ilimitadas" />
      </SettingSection>
    </div>
  );
}

function UsageRow({ label, value, max, unit = '' }) {
  const numeric = typeof value === 'number' && typeof max === 'number';
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
        <span style={{ color: 'var(--text-2)' }}>{label}</span>
        <span className="num" style={{ color: 'var(--text-1)' }}>{value}{unit && ' ' + unit} <span style={{ color: 'var(--text-4)' }}>/ {max}{unit && ' ' + unit}</span></span>
      </div>
      {numeric && <Progress value={(value / max) * 100} />}
    </div>
  );
}

function SettingSection({ title, desc, children }) {
  return (
    <div className="card" style={{ padding: 22 }}>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>{title}</h3>
        {desc && <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--text-3)' }}>{desc}</p>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>
    </div>
  );
}

Object.assign(window, { SettingsView });
