// PortalProv — Suppliers (list, onboarding wizard, detail)

function SuppliersView() {
  const [tab, setTab] = React.useState('list');
  const [selected, setSelected] = React.useState(null);
  const [wizard, setWizard] = React.useState(false);

  if (wizard) return <SupplierWizard onClose={() => setWizard(false)} />;
  if (selected) return <SupplierDetail supplier={selected} onBack={() => setSelected(null)} />;

  return (
    <div>
      <PageHeader
        title="Proveedores"
        subtitle="Gestiona tu catálogo de proveedores, su documentación tributaria y desempeño."
        actions={
          <React.Fragment>
            <button className="btn btn-outline"><Icon name="download" size={14} /> Exportar</button>
            <button className="btn btn-primary" onClick={() => setWizard(true)}>
              <Icon name="plus" size={14} strokeWidth={2.4} /> Onboarding
            </button>
          </React.Fragment>
        }
      />

      {/* Filter bar */}
      <div style={{ padding: '16px 28px', display: 'flex', gap: 10, alignItems: 'center', borderBottom: '1px solid var(--border-1)' }}>
        <div style={{ position: 'relative', width: 280 }}>
          <Icon name="search" size={14} stroke="var(--text-4)" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
          <input className="input" style={{ paddingLeft: 30 }} placeholder="Buscar por nombre, RFC o ID…" />
        </div>
        <button className="btn btn-outline btn-sm"><Icon name="filter" size={12} /> Categoría</button>
        <button className="btn btn-outline btn-sm">Estado: Todos <Icon name="chevronDown" size={12} /></button>
        <button className="btn btn-outline btn-sm">Sede <Icon name="chevronDown" size={12} /></button>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12, color: 'var(--text-4)' }}>{Data.suppliers.length} proveedores · 2 en revisión</div>
      </div>

      {/* Tabs (segmented) */}
      <div style={{ padding: '0 28px' }}>
        <div className="tabs">
          {[
            { id: 'list', label: 'Todos', count: Data.suppliers.length },
            { id: 'active', label: 'Activos', count: Data.suppliers.filter(s => s.estado === 'Activo').length },
            { id: 'review', label: 'En revisión', count: Data.suppliers.filter(s => s.estado === 'En revisión').length },
            { id: 'sus', label: 'Suspendidos', count: Data.suppliers.filter(s => s.estado === 'Suspendido').length },
          ].map(t => (
            <button key={t.id} className={'tab' + (tab === t.id ? ' active' : '')} onClick={() => setTab(t.id)}>
              {t.label}
              <span style={{ marginLeft: 6, padding: '0 6px', background: 'var(--bg-3)', color: 'var(--text-3)', fontSize: 10, borderRadius: 4 }}>{t.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: 28 }}>
        <div className="card" style={{ overflow: 'hidden' }}>
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 36 }}><input type="checkbox" /></th>
                <th>Proveedor</th>
                <th>RFC</th>
                <th>Categoría</th>
                <th>Sede</th>
                <th>Estado</th>
                <th style={{ textAlign: 'right' }}>Spend YTD</th>
                <th style={{ textAlign: 'right' }}>Score</th>
                <th style={{ width: 40 }}></th>
              </tr>
            </thead>
            <tbody>
              {Data.suppliers.filter(s => {
                if (tab === 'list') return true;
                if (tab === 'active') return s.estado === 'Activo';
                if (tab === 'review') return s.estado === 'En revisión';
                return s.estado === 'Suspendido';
              }).map(s => (
                <tr key={s.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(s)}>
                  <td onClick={e => e.stopPropagation()}><input type="checkbox" /></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={s.name} size={28} />
                      <div>
                        <div style={{ color: 'var(--text-1)', fontWeight: 500 }}>{s.name}</div>
                        <div className="mono" style={{ fontSize: 11, color: 'var(--text-4)' }}>{s.id}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="mono" style={{ fontSize: 12, color: 'var(--text-3)' }}>{s.rfc}</span></td>
                  <td>{s.categoria}</td>
                  <td><span style={{ color: 'var(--text-3)' }}>{s.sede}</span></td>
                  <td><StatusBadge tone={s.estadoTone}>{s.estado}</StatusBadge></td>
                  <td style={{ textAlign: 'right' }} className="num">{s.spend ? Data.fmtMXNshort(s.spend) : '—'}</td>
                  <td style={{ textAlign: 'right' }}>
                    {s.score ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <span className="num" style={{ color: s.score >= 85 ? 'var(--success)' : s.score >= 70 ? 'var(--warning)' : 'var(--danger)', fontWeight: 500 }}>{s.score}</span>
                      </span>
                    ) : <span style={{ color: 'var(--text-5)' }}>—</span>}
                  </td>
                  <td onClick={e => e.stopPropagation()}>
                    <button className="btn btn-ghost btn-icon btn-sm"><Icon name="more" size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 12, color: 'var(--text-4)' }}>Mostrando 1–9 de 9 proveedores</div>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="btn btn-ghost btn-sm" disabled><Icon name="chevronLeft" size={12} /></button>
              <button className="btn btn-secondary btn-sm">1</button>
              <button className="btn btn-ghost btn-sm" disabled><Icon name="chevronRight" size={12} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SupplierDetail({ supplier, onBack }) {
  const [tab, setTab] = React.useState('overview');

  return (
    <div>
      <PageHeader
        title={supplier.name}
        subtitle={supplier.razon}
        actions={
          <React.Fragment>
            <button className="btn btn-outline" onClick={onBack}><Icon name="arrowLeft" size={14} /> Volver</button>
            <button className="btn btn-outline">Suspender</button>
            <button className="btn btn-primary"><Icon name="edit" size={14} /> Editar</button>
          </React.Fragment>
        }
        meta={
          <React.Fragment>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Avatar name={supplier.name} size={20} /><span style={{ color: 'var(--text-3)', fontSize: 12 }}><span className="mono">{supplier.id}</span></span>
            </span>
            <span style={{ color: 'var(--text-5)' }}>·</span>
            <StatusBadge tone={supplier.estadoTone}>{supplier.estado}</StatusBadge>
            <span style={{ color: 'var(--text-5)' }}>·</span>
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}>RFC <span className="mono" style={{ color: 'var(--text-2)' }}>{supplier.rfc}</span></span>
            <span style={{ color: 'var(--text-5)' }}>·</span>
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{supplier.categoria}</span>
          </React.Fragment>
        }
      />

      <div style={{ padding: '0 28px' }}>
        <Tabs
          items={[
            { id: 'overview', label: 'Resumen' },
            { id: 'docs', label: 'Documentos', count: 6 },
            { id: 'orders', label: 'Órdenes', count: supplier.ordenes },
            { id: 'invoices', label: 'Facturas', count: 18 },
            { id: 'contacts', label: 'Contactos' },
            { id: 'history', label: 'Historial' },
          ]}
          value={tab}
          onChange={setTab}
        />
      </div>

      <div style={{ padding: 28 }}>
        {tab === 'overview' && <SupplierOverview supplier={supplier} />}
        {tab === 'docs' && <SupplierDocs supplier={supplier} />}
        {tab === 'orders' && <SupplierOrders supplier={supplier} />}
        {tab === 'invoices' && <SupplierInvoicesTab />}
        {tab === 'contacts' && <SupplierContacts supplier={supplier} />}
        {tab === 'history' && <SupplierHistory />}
      </div>
    </div>
  );
}

function SupplierOverview({ supplier }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <KpiCard label="Spend YTD" value={Data.fmtMXNshort(supplier.spend)} sub="2026" trend="+12.3%" icon="dollar" />
          <KpiCard label="Órdenes activas" value={supplier.ordenes} sub="último año" trend="+4" icon="cart" />
          <KpiCard label="Score" value={supplier.score} sub="rendimiento global" trend={supplier.score >= 85 ? '+2' : '-3'} icon="star" />
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Tendencia de spend</h3>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="btn btn-sm btn-secondary">6M</button>
              <button className="btn btn-sm btn-ghost">12M</button>
            </div>
          </div>
          <div style={{ padding: 24 }}>
            <LineChart data={Data.spendByMonth.map(d => ({ ...d, v: d.v * 0.4 }))} color="#38bdf8" />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Últimas órdenes</h3>
            <button className="btn btn-ghost btn-sm">Ver todas <Icon name="arrowRight" size={12} /></button>
          </div>
          <table className="table">
            <thead><tr><th>OC</th><th>Fecha</th><th>Items</th><th style={{ textAlign: 'right' }}>Monto</th><th>Estado</th></tr></thead>
            <tbody>
              {Data.purchaseOrders.filter(p => p.supplier === supplier.name).slice(0, 5).map(po => (
                <tr key={po.id}>
                  <td className="mono" style={{ color: 'var(--accent)' }}>{po.id}</td>
                  <td>{po.fecha}</td>
                  <td className="num">{po.items}</td>
                  <td style={{ textAlign: 'right' }} className="num">{Data.fmtMXN(po.monto)}</td>
                  <td><StatusBadge tone={po.tone}>{po.estado}</StatusBadge></td>
                </tr>
              ))}
              {Data.purchaseOrders.filter(p => p.supplier === supplier.name).length === 0 && (
                <tr><td colSpan="5"><EmptyState title="Sin órdenes recientes" body="Cuando emitas órdenes a este proveedor aparecerán aquí." /></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="card">
          <div className="card-header"><h3 className="card-title">Información fiscal</h3></div>
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <InfoRow label="Razón social" value={supplier.razon} />
            <InfoRow label="RFC" value={<span className="mono">{supplier.rfc}</span>} />
            <InfoRow label="Régimen fiscal" value="601 — General Personas Morales" />
            <InfoRow label="CP fiscal" value={<span className="mono">06600</span>} />
            <InfoRow label="Uso de CFDI" value="G03 — Gastos en general" />
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h3 className="card-title">Contacto principal</h3></div>
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar name={supplier.contacto} size={40} />
              <div>
                <div style={{ fontSize: 14, color: 'var(--text-1)', fontWeight: 500 }}>{supplier.contacto}</div>
                <div style={{ fontSize: 12, color: 'var(--text-4)' }}>Gerente Comercial</div>
              </div>
            </div>
            <InfoRow label="Email" value={<a href="#" style={{ color: 'var(--accent)', textDecoration: 'none' }}>{supplier.email}</a>} />
            <InfoRow label="Teléfono" value={<span className="mono">{supplier.telefono}</span>} />
            <InfoRow label="Sede" value={supplier.sede} />
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h3 className="card-title">Cumplimiento</h3></div>
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { l: 'Constancia situación fiscal', v: 'Vigente · 12 abr 2026', tone: 'success' },
              { l: 'Opinión 32-D', v: 'Positiva · 02 may 2026', tone: 'success' },
              { l: 'Acta constitutiva', v: 'Recibida', tone: 'success' },
              { l: 'Póliza de seguro', v: 'Vence en 23 días', tone: 'warning' },
            ].map(d => (
              <div key={d.l} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Icon name={d.tone === 'success' ? 'checkCircle' : 'alert'} size={14} stroke={`var(--${d.tone})`} />
                <div style={{ flex: 1, fontSize: 12 }}>
                  <div style={{ color: 'var(--text-2)' }}>{d.l}</div>
                  <div style={{ color: 'var(--text-4)', fontSize: 11 }}>{d.v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
      <span style={{ fontSize: 12, color: 'var(--text-4)' }}>{label}</span>
      <span style={{ fontSize: 13, color: 'var(--text-1)', textAlign: 'right' }}>{value}</span>
    </div>
  );
}

function SupplierDocs({ supplier }) {
  const docs = [
    { name: 'Constancia situación fiscal 2026.pdf', size: '184 KB', date: '12 abr 2026', tone: 'success', label: 'Vigente' },
    { name: 'Opinión positiva 32-D.pdf', size: '92 KB', date: '02 may 2026', tone: 'success', label: 'Vigente' },
    { name: 'Acta constitutiva.pdf', size: '1.2 MB', date: '15 ene 2025', tone: 'neutral', label: 'Archivado' },
    { name: 'Comprobante domicilio.pdf', size: '320 KB', date: '15 ene 2025', tone: 'neutral', label: 'Archivado' },
    { name: 'Poliza responsabilidad civil.pdf', size: '420 KB', date: '20 jun 2025', tone: 'warning', label: 'Vence en 23 días' },
    { name: 'Certificación ISO 9001.pdf', size: '880 KB', date: '01 mar 2025', tone: 'neutral', label: 'Vigente hasta 2028' },
  ];
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Documentos</h3>
          <div className="card-sub">{docs.length} documentos · todos vigentes</div>
        </div>
        <button className="btn btn-primary"><Icon name="upload" size={14} /> Subir documento</button>
      </div>
      <div>
        {docs.map((d, i) => (
          <div key={i} style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-3)', color: 'var(--text-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="fileText" size={16} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'var(--text-1)', fontSize: 13, fontWeight: 500 }}>{d.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 2 }}>{d.size} · subido {d.date}</div>
            </div>
            <StatusBadge tone={d.tone}>{d.label}</StatusBadge>
            <button className="btn btn-ghost btn-icon btn-sm"><Icon name="download" size={14} /></button>
            <button className="btn btn-ghost btn-icon btn-sm"><Icon name="more" size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SupplierOrders({ supplier }) {
  const list = Data.purchaseOrders.filter(p => p.supplier === supplier.name);
  if (list.length === 0) return <div className="card"><EmptyState title="Sin órdenes" body="Cuando emitas órdenes a este proveedor aparecerán aquí." action={<button className="btn btn-primary"><Icon name="plus" size={14} strokeWidth={2.4} /> Nueva OC</button>} /></div>;
  return (
    <div className="card">
      <table className="table">
        <thead><tr><th>OC</th><th>Fecha</th><th>Entrega</th><th>Items</th><th style={{ textAlign: 'right' }}>Monto</th><th>Estado</th></tr></thead>
        <tbody>
          {list.map(po => (
            <tr key={po.id}>
              <td className="mono" style={{ color: 'var(--accent)' }}>{po.id}</td>
              <td>{po.fecha}</td>
              <td>{po.entrega}</td>
              <td className="num">{po.items}</td>
              <td style={{ textAlign: 'right' }} className="num">{Data.fmtMXN(po.monto)}</td>
              <td><StatusBadge tone={po.tone}>{po.estado}</StatusBadge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SupplierInvoicesTab() {
  return (
    <div className="card">
      <table className="table">
        <thead><tr><th>Factura</th><th>UUID</th><th>Fecha</th><th style={{ textAlign: 'right' }}>Total</th><th>Estado</th></tr></thead>
        <tbody>
          {Data.invoices.slice(0, 4).map(inv => (
            <tr key={inv.id}>
              <td className="mono" style={{ color: 'var(--accent)' }}>{inv.id}</td>
              <td><span className="mono" style={{ fontSize: 11, color: 'var(--text-4)' }}>{inv.uuid.slice(0, 18)}…</span></td>
              <td>{inv.fecha}</td>
              <td style={{ textAlign: 'right' }} className="num">{Data.fmtMXN(inv.total)}</td>
              <td><StatusBadge tone={inv.tone}>{inv.estado}</StatusBadge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SupplierContacts({ supplier }) {
  const contacts = [
    { name: supplier.contacto, role: 'Gerente Comercial', email: supplier.email, phone: supplier.telefono, primary: true },
    { name: 'José Antonio Méndez', role: 'Cuentas por cobrar', email: 'jmendez@' + supplier.email.split('@')[1], phone: '+52 55 4421 1908', primary: false },
    { name: 'Laura Martínez Cruz', role: 'Logística', email: 'lmartinez@' + supplier.email.split('@')[1], phone: '+52 55 8810 4427', primary: false },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {contacts.map((c, i) => (
        <div key={i} className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <Avatar name={c.name} size={40} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: 'var(--text-1)', fontWeight: 500 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-4)' }}>{c.role}</div>
            </div>
            {c.primary && <StatusBadge tone="accent">Principal</StatusBadge>}
          </div>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-3)' }}>
              <Icon name="mail" size={12} /><span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.email}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-3)' }}>
              <Icon name="bell" size={12} /><span className="mono">{c.phone}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SupplierHistory() {
  const events = [
    { d: '24 may 2026', t: '11:42', who: 'Comprador', what: 'Aprobó factura FAC-A-1183', tone: 'success' },
    { d: '23 may 2026', t: '09:18', who: 'Carlos Mendoza', what: 'Creó orden OC-2026-00478', tone: 'info' },
    { d: '12 abr 2026', t: '14:08', who: 'Sistema', what: 'Renovó constancia fiscal automáticamente', tone: 'accent' },
    { d: '02 may 2026', t: '08:30', who: 'Comprador', what: 'Recibió opinión 32-D positiva', tone: 'success' },
    { d: '15 ene 2025', t: '10:00', who: 'Sistema', what: 'Onboarding completado · estado: Activo', tone: 'success' },
  ];
  return (
    <div className="card">
      <div className="card-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {events.map((e, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 56, fontSize: 11, color: 'var(--text-4)', textAlign: 'right' }}>
                <div>{e.d}</div>
                <div className="mono">{e.t}</div>
              </div>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 32 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: `var(--${e.tone})`, marginTop: 4 }} />
                {i < events.length - 1 && <div style={{ width: 1, flex: 1, background: 'var(--border-1)', minHeight: 18 }} />}
              </div>
              <div style={{ flex: 1, paddingBottom: 6 }}>
                <div style={{ fontSize: 13, color: 'var(--text-1)' }}>{e.what}</div>
                <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 2 }}>por {e.who}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SupplierWizard({ onClose }) {
  const [step, setStep] = React.useState(0);
  const steps = ['Información básica', 'Datos fiscales', 'Documentos', 'Contactos', 'Revisión'];

  return (
    <div>
      <PageHeader
        title="Onboarding de proveedor"
        subtitle="Registra un nuevo proveedor en 5 pasos. Los documentos pueden completarse luego."
        actions={<button className="btn btn-outline" onClick={onClose}><Icon name="x" size={14} /> Cancelar</button>}
      />

      <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border-1)' }}>
        <Stepper steps={steps} current={step} />
      </div>

      <div style={{ padding: 28, maxWidth: 880, margin: '0 auto' }}>
        <div className="card" style={{ padding: 28 }}>
          {step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Información básica</h2>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-3)' }}>Datos generales del proveedor.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
                <Field label="Nombre comercial" placeholder="Tecnología Avanzada de México" />
                <Field label="ID interno (autogenerado)" value="SUP-2128" readonly mono />
              </div>
              <Field label="Razón social" placeholder="Tecnología Avanzada de México SA de CV" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <Field label="Categoría" select options={['Hardware', 'Software', 'Servicios', 'Logística', 'Suministros', 'Consultoría']} />
                <Field label="País" select options={['México', 'Estados Unidos', 'Canadá']} />
                <Field label="Sitio web" placeholder="https://" />
              </div>
              <Field label="Descripción / servicios" textarea placeholder="Breve descripción de los productos o servicios que ofrece…" />
            </div>
          )}

          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Datos fiscales</h2>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-3)' }}>Información requerida para la emisión de CFDI.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Field label="RFC" placeholder="XXX######XXX" mono />
                <Field label="CURP del representante legal" placeholder="" mono />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Field label="Régimen fiscal" select options={['601 — General Personas Morales', '603 — Personas Morales con fines no lucrativos', '612 — Personas Físicas con Actividades Empresariales']} />
                <Field label="Uso de CFDI por defecto" select options={['G01 — Adquisición de mercancías', 'G03 — Gastos en general', 'I04 — Equipo de cómputo y accesorios']} />
              </div>
              <Field label="Domicilio fiscal" placeholder="Calle, número, colonia" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <Field label="Código postal" placeholder="06600" mono />
                <Field label="Estado" select options={['Ciudad de México', 'Nuevo León', 'Jalisco', 'Querétaro']} />
                <Field label="Municipio" placeholder="Cuauhtémoc" />
              </div>
              <div style={{ background: 'var(--info-soft)', border: '1px solid var(--border-1)', borderRadius: 8, padding: 14, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Icon name="info" size={16} stroke="var(--info)" />
                <div style={{ fontSize: 12, color: 'var(--text-2)' }}>
                  Validaremos el RFC contra el SAT al guardar. Si la constancia es reciente, el formulario se autocompletará.
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Documentos requeridos</h2>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-3)' }}>Sube los documentos vigentes del proveedor. Puedes completarlos luego.</p>
              </div>
              {[
                { name: 'Constancia de situación fiscal', required: true, done: true, fname: 'CSF_2026.pdf' },
                { name: 'Opinión positiva 32-D', required: true, done: true, fname: 'opinion-32d.pdf' },
                { name: 'Acta constitutiva', required: true, done: false },
                { name: 'Comprobante de domicilio', required: false, done: false },
                { name: 'Póliza responsabilidad civil', required: false, done: false },
              ].map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, border: '1px dashed var(--border-2)', borderRadius: 8, background: d.done ? 'var(--success-soft)' : 'transparent', borderStyle: d.done ? 'solid' : 'dashed' }}>
                  <Icon name={d.done ? 'checkCircle' : 'upload'} size={18} stroke={d.done ? 'var(--success)' : 'var(--text-4)'} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: 'var(--text-1)', fontWeight: 500 }}>{d.name} {d.required && <span style={{ color: 'var(--danger)' }}>*</span>}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 2 }}>{d.done ? d.fname + ' · subido' : 'Arrastra el archivo o haz click para seleccionar · PDF hasta 10 MB'}</div>
                  </div>
                  {d.done ? (
                    <button className="btn btn-ghost btn-sm"><Icon name="x" size={12} /></button>
                  ) : (
                    <button className="btn btn-outline btn-sm">Seleccionar</button>
                  )}
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Contactos</h2>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-3)' }}>Designa al menos un contacto principal.</p>
              </div>
              <div className="card" style={{ padding: 18, background: 'var(--bg-1)', border: '1px solid var(--border-2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Contacto principal</div>
                  <StatusBadge tone="accent">Requerido</StatusBadge>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Field label="Nombre completo" placeholder="Comprador" />
                  <Field label="Puesto" placeholder="Gerente Comercial" />
                  <Field label="Email" placeholder="contacto@empresa.mx" />
                  <Field label="Teléfono" placeholder="+52 55 0000 0000" mono />
                </div>
              </div>
              <button className="btn btn-outline" style={{ alignSelf: 'flex-start' }}><Icon name="plus" size={12} strokeWidth={2.4} /> Agregar otro contacto</button>
            </div>
          )}

          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Revisión</h2>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-3)' }}>Confirma la información antes de enviar a revisión interna.</p>
              </div>
              <div className="card" style={{ padding: 20 }}>
                <ReviewRow label="Nombre comercial" value="Tecnología Avanzada de México" />
                <ReviewRow label="Razón social" value="Tecnología Avanzada de México SA de CV" />
                <ReviewRow label="RFC" value={<span className="mono">TAM150823A47</span>} />
                <ReviewRow label="Categoría" value="Hardware" />
                <ReviewRow label="Sede" value="Ciudad de México" />
                <ReviewRow label="Documentos" value="2 de 3 requeridos cargados" tone="warning" />
                <ReviewRow label="Contacto principal" value="Comprador · mrodriguez@tecavanzada.mx" last />
              </div>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--text-2)' }}>
                <input type="checkbox" defaultChecked style={{ marginTop: 2 }} />
                Confirmo que la información proporcionada es verídica y autorizo la validación contra SAT.
              </label>
            </div>
          )}

          {/* Actions */}
          <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border-1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="btn btn-ghost" onClick={() => step > 0 && setStep(step - 1)} disabled={step === 0}>
              <Icon name="arrowLeft" size={14} /> Anterior
            </button>
            <div style={{ fontSize: 12, color: 'var(--text-4)' }}>Paso {step + 1} de {steps.length}</div>
            {step < steps.length - 1 ? (
              <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
                Siguiente <Icon name="arrowRight" size={14} />
              </button>
            ) : (
              <button className="btn btn-primary" onClick={onClose}>
                <Icon name="check" size={14} strokeWidth={2.4} /> Enviar a revisión
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder, value, readonly, mono, select, options, textarea }) {
  return (
    <div>
      <label className="label">{label}</label>
      {textarea ? (
        <textarea className="textarea" placeholder={placeholder} defaultValue={value} />
      ) : select ? (
        <select className="input">
          {options && options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input className={'input ' + (mono ? 'mono' : '')} placeholder={placeholder} defaultValue={value} readOnly={readonly} />
      )}
    </div>
  );
}

function ReviewRow({ label, value, tone, last }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: last ? 'none' : '1px solid var(--border-1)' }}>
      <span style={{ flex: '0 0 200px', fontSize: 12, color: 'var(--text-4)' }}>{label}</span>
      <span style={{ flex: 1, fontSize: 13, color: tone ? `var(--${tone})` : 'var(--text-1)' }}>{value}</span>
    </div>
  );
}

Object.assign(window, { SuppliersView });
