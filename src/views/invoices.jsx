// PortalProv — Invoices (list, CFDI upload, comparison vs PO, approval)

function InvoicesView({ role }) {
  const [view, setView] = React.useState('list');
  const [selected, setSelected] = React.useState(null);

  if (view === 'upload') return <InvoiceUpload onClose={() => setView('list')} />;
  if (view === 'detail' && selected) return <InvoiceDetail invoice={selected} onBack={() => setView('list')} role={role} />;

  return (
    <div>
      <PageHeader
        title={role === 'supplier' ? 'Mis facturas' : 'Facturas'}
        subtitle={role === 'supplier' ? 'Sube CFDIs y consulta el estado de cobro.' : 'Recibe, concilia y aprueba facturas CFDI 4.0 de tus proveedores.'}
        actions={
          <React.Fragment>
            <button className="btn btn-outline"><Icon name="download" size={14} /> Exportar</button>
            <button className="btn btn-primary" onClick={() => setView('upload')}>
              <Icon name="upload" size={14} /> {role === 'supplier' ? 'Subir CFDI' : 'Cargar factura'}
            </button>
          </React.Fragment>
        }
      />

      <div style={{ padding: '20px 28px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, borderBottom: '1px solid var(--border-1)' }}>
        <KpiCard label="Por aprobar" value="5" sub="$684,420 MXN" trend="+2" icon="invoice" accent="var(--warning-soft)" />
        <KpiCard label="Aprobadas (mes)" value="34" sub="$1.92M MXN" trend="+8" icon="checkCircle" />
        <KpiCard label="Pagadas (mes)" value="28" sub="$1.62M MXN" trend="+5" icon="dollar" />
        <KpiCard label="Vencidas" value="0" sub="todas al día" trend="=0" icon="alert" />
      </div>

      {/* Filters */}
      <div style={{ padding: '16px 28px', display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{ position: 'relative', width: 280 }}>
          <Icon name="search" size={14} stroke="var(--text-4)" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
          <input className="input" style={{ paddingLeft: 30 }} placeholder="Folio, UUID o proveedor…" />
        </div>
        <button className="btn btn-outline btn-sm">Estado: Todos <Icon name="chevronDown" size={12} /></button>
        <button className="btn btn-outline btn-sm">Proveedor <Icon name="chevronDown" size={12} /></button>
        <button className="btn btn-outline btn-sm"><Icon name="calendar" size={12} /> Mayo 2026</button>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12, color: 'var(--text-4)' }}>{Data.invoices.length} facturas</div>
      </div>

      <div style={{ padding: '0 28px 28px' }}>
        <div className="card" style={{ overflow: 'hidden' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Folio</th>
                <th>UUID</th>
                <th>Proveedor</th>
                <th>OC</th>
                <th>Fecha</th>
                <th>Vencimiento</th>
                <th style={{ textAlign: 'right' }}>Total</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Data.invoices.map(inv => (
                <tr key={inv.id} style={{ cursor: 'pointer' }} onClick={() => { setSelected(inv); setView('detail'); }}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Icon name="fileText" size={14} stroke="var(--text-4)" />
                      <span className="mono" style={{ color: 'var(--accent)' }}>{inv.id}</span>
                    </div>
                  </td>
                  <td><span className="mono" style={{ fontSize: 11, color: 'var(--text-4)' }}>{inv.uuid.slice(0, 13)}…</span></td>
                  <td style={{ color: 'var(--text-1)' }}>
                    {inv.supplier}
                    <div className="mono" style={{ fontSize: 10, color: 'var(--text-4)' }}>{inv.rfc}</div>
                  </td>
                  <td><span className="mono" style={{ color: 'var(--accent)' }}>{inv.oc}</span></td>
                  <td>{inv.fecha}</td>
                  <td>{inv.vencimiento}</td>
                  <td style={{ textAlign: 'right' }} className="num">{Data.fmtMXN(inv.total)}</td>
                  <td><StatusBadge tone={inv.tone}>{inv.estado}</StatusBadge></td>
                  <td onClick={e => e.stopPropagation()}>
                    <button className="btn btn-ghost btn-icon btn-sm"><Icon name="more" size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function InvoiceUpload({ onClose }) {
  const [step, setStep] = React.useState(0); // 0 drop, 1 parsing, 2 review
  const [parsed, setParsed] = React.useState(false);

  React.useEffect(() => {
    if (step === 1) {
      const t = setTimeout(() => { setStep(2); setParsed(true); }, 1200);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <div>
      <PageHeader
        title="Cargar factura CFDI"
        subtitle="Sube el XML y PDF. Validaremos contra el SAT y emparejaremos con la OC."
        actions={<button className="btn btn-outline" onClick={onClose}>Cancelar</button>}
      />

      <div style={{ padding: 28, maxWidth: 980, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {step === 0 && (
          <div className="card" style={{ padding: 32 }}>
            <div style={{ border: '2px dashed var(--border-2)', borderRadius: 12, padding: 48, textAlign: 'center', background: 'var(--bg-1)' }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <Icon name="upload" size={28} />
              </div>
              <div style={{ fontSize: 16, color: 'var(--text-1)', fontWeight: 500 }}>Arrastra el XML del CFDI aquí</div>
              <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 6 }}>o haz click para seleccionar el archivo · XML + PDF · máx. 10 MB</div>
              <div style={{ marginTop: 18, display: 'flex', gap: 8, justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={() => setStep(1)}><Icon name="upload" size={14} /> Seleccionar archivo</button>
                <button className="btn btn-outline">Pegar XML</button>
              </div>
              <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--border-1)', display: 'flex', justifyContent: 'center', gap: 18, fontSize: 11, color: 'var(--text-4)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="shield" size={12} stroke="var(--success)" /> Validación SAT en tiempo real</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="zap" size={12} stroke="var(--accent)" /> Emparejado automático con OC</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="checkCircle" size={12} stroke="var(--info)" /> CFDI 4.0</span>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="card" style={{ padding: 40 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { l: 'Validando estructura XML', done: true },
                { l: 'Consultando SAT (verificación UUID)', done: true },
                { l: 'Emparejando con OC-2026-00481', done: false, working: true },
                { l: 'Generando preview de conciliación', done: false },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: s.done ? 'var(--success-soft)' : s.working ? 'var(--accent-soft)' : 'var(--bg-3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: s.done ? 'var(--success)' : s.working ? 'var(--accent)' : 'var(--text-5)'
                  }}>
                    {s.done ? <Icon name="check" size={14} strokeWidth={2.4} /> : s.working ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" style={{ animation: 'spin 1s linear infinite' }}>
                        <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="20 30" strokeLinecap="round" />
                        <style>{`@keyframes spin { from {transform: rotate(0deg);} to {transform: rotate(360deg);} }`}</style>
                      </svg>
                    ) : null}
                  </div>
                  <span style={{ flex: 1, fontSize: 13, color: s.done ? 'var(--text-2)' : 'var(--text-1)' }}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && parsed && (
          <React.Fragment>
            <div style={{ background: 'var(--success-soft)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: 8, padding: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
              <Icon name="checkCircle" size={18} stroke="var(--success)" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: 'var(--text-1)', fontWeight: 500 }}>CFDI validado contra SAT · UUID 7F8A2C9D-44B1-4E10-9D52-2B91E8C3A047</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>Emparejada automáticamente con OC-2026-00481</div>
              </div>
            </div>

            <ComparisonView />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button className="btn btn-outline" onClick={onClose}>Guardar borrador</button>
              <button className="btn btn-primary" onClick={onClose}><Icon name="send" size={14} /> Enviar a aprobación</button>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

function ComparisonView() {
  const lines = [
    { d: 'Switch Cisco Catalyst 9300 48-port PoE+', qPO: 4, qInv: 4, pPO: 38500, pInv: 38500 },
    { d: 'Cable UTP Cat6A 305m caja azul', qPO: 6, qInv: 6, pPO: 4800, pInv: 4800 },
    { d: 'Rack 42U 800×1000 con organizadores', qPO: 1, qInv: 1, pPO: 18200, pInv: 18200 },
    { d: 'Servicio de instalación on-site', qPO: 0, qInv: 1, pPO: 0, pInv: 14800 },
  ];
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Conciliación factura ↔ OC</h3>
          <div className="card-sub">3 partidas coinciden · 1 partida nueva</div>
        </div>
        <StatusBadge tone="warning">1 discrepancia</StatusBadge>
      </div>
      <div style={{ padding: '0 0 16px' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Descripción</th>
              <th style={{ textAlign: 'right' }}>OC cant.</th>
              <th style={{ textAlign: 'right' }}>FAC cant.</th>
              <th style={{ textAlign: 'right' }}>OC precio</th>
              <th style={{ textAlign: 'right' }}>FAC precio</th>
              <th style={{ textAlign: 'right' }}>Importe</th>
              <th>Match</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l, i) => {
              const match = l.qPO === l.qInv && l.pPO === l.pInv && l.qPO > 0;
              const newLine = l.qPO === 0;
              return (
                <tr key={i} style={{ background: newLine ? 'var(--warning-soft)' : 'transparent' }}>
                  <td style={{ color: 'var(--text-1)' }}>{l.d}</td>
                  <td style={{ textAlign: 'right' }} className="num">{l.qPO || '—'}</td>
                  <td style={{ textAlign: 'right' }} className="num">{l.qInv}</td>
                  <td style={{ textAlign: 'right' }} className="num">{l.pPO ? Data.fmtMXNshort(l.pPO) : '—'}</td>
                  <td style={{ textAlign: 'right' }} className="num">{Data.fmtMXNshort(l.pInv)}</td>
                  <td style={{ textAlign: 'right' }} className="num">{Data.fmtMXN(l.qInv * l.pInv)}</td>
                  <td>
                    {match && <StatusBadge tone="success">Match</StatusBadge>}
                    {newLine && <StatusBadge tone="warning">Nueva</StatusBadge>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border-1)', background: 'var(--bg-1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 360, marginLeft: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 12, color: 'var(--text-4)' }}>Total OC</span>
            <span style={{ fontSize: 12, color: 'var(--text-4)' }}>Total factura</span>
            <span style={{ fontSize: 13, color: 'var(--text-1)', fontWeight: 500 }}>Diferencia</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
            <span className="num" style={{ fontSize: 12, color: 'var(--text-3)' }}>{Data.fmtMXN(248640)}</span>
            <span className="num" style={{ fontSize: 12, color: 'var(--text-3)' }}>{Data.fmtMXN(263440)}</span>
            <span className="num" style={{ fontSize: 14, color: 'var(--warning)', fontWeight: 600 }}>+{Data.fmtMXN(14800)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvoiceDetail({ invoice, onBack, role }) {
  return (
    <div>
      <PageHeader
        title={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <span className="mono" style={{ color: 'var(--accent)' }}>{invoice.id}</span>
          <StatusBadge tone={invoice.tone}>{invoice.estado}</StatusBadge>
        </span>}
        subtitle={invoice.supplier}
        actions={
          <React.Fragment>
            <button className="btn btn-outline" onClick={onBack}><Icon name="arrowLeft" size={14} /> Volver</button>
            <button className="btn btn-outline"><Icon name="download" size={14} /> XML</button>
            <button className="btn btn-outline"><Icon name="download" size={14} /> PDF</button>
            {role === 'buyer' && invoice.estado === 'En aprobación' && (
              <React.Fragment>
                <button className="btn btn-danger"><Icon name="x" size={14} /> Rechazar</button>
                <button className="btn btn-primary"><Icon name="check" size={14} strokeWidth={2.4} /> Aprobar</button>
              </React.Fragment>
            )}
          </React.Fragment>
        }
      />

      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            <DetailStat label="Subtotal" value={Data.fmtMXN(invoice.subtotal)} />
            <DetailStat label="IVA 16%" value={Data.fmtMXN(invoice.iva)} />
            <DetailStat label="Total" value={Data.fmtMXN(invoice.total)} />
            <DetailStat label="Vencimiento" value={invoice.vencimiento} />
          </div>

          {/* CFDI summary */}
          <div className="card">
            <div className="card-header"><h3 className="card-title">Datos del CFDI</h3></div>
            <div className="card-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
              <InfoRow label="UUID" value={<span className="mono" style={{ fontSize: 11 }}>{invoice.uuid}</span>} />
              <InfoRow label="Folio" value={<span className="mono">{invoice.id}</span>} />
              <InfoRow label="Tipo CFDI" value="I — Ingreso" />
              <InfoRow label="Método pago" value="PUE — Pago en una exhibición" />
              <InfoRow label="Forma pago" value="03 — Transferencia electrónica" />
              <InfoRow label="Moneda" value="MXN" />
              <InfoRow label="RFC emisor" value={<span className="mono">{invoice.rfc}</span>} />
              <InfoRow label="RFC receptor" value={<span className="mono">GIC180415H89</span>} />
            </div>
          </div>

          <ComparisonView />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 80, alignSelf: 'flex-start' }}>
          <div className="card">
            <div className="card-header"><h3 className="card-title">Flujo de aprobación</h3></div>
            <div style={{ padding: '18px 20px' }}>
              {[
                { who: 'María E. Rodríguez', role: 'Comprador', state: 'done', when: 'hace 2 h' },
                { who: 'Jorge Castillo', role: 'Gerente Compras', state: 'current', when: 'pendiente' },
                { who: 'Patricia Vázquez', role: 'CFO', state: 'pending', when: 'pendiente' },
              ].map((a, i) => {
                const tone = a.state === 'done' ? 'success' : a.state === 'current' ? 'accent' : 'neutral';
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--border-1)' : 'none' }}>
                    <div style={{ position: 'relative' }}>
                      <Avatar name={a.who} size={32} />
                      {a.state === 'done' && (
                        <div style={{ position: 'absolute', bottom: -2, right: -2, width: 14, height: 14, borderRadius: '50%', background: 'var(--success)', border: '2px solid var(--bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon name="check" size={8} stroke="white" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, color: 'var(--text-1)', fontWeight: 500 }}>{a.who}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-4)' }}>{a.role} · {a.when}</div>
                    </div>
                    <StatusBadge tone={tone}>{a.state === 'done' ? 'Aprobó' : a.state === 'current' ? 'Pendiente' : 'En espera'}</StatusBadge>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h3 className="card-title">Documentos adjuntos</h3></div>
            <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { name: invoice.id + '.xml', size: '12 KB', icon: 'fileText' },
                { name: invoice.id + '.pdf', size: '184 KB', icon: 'fileText' },
                { name: 'remision-001.pdf', size: '92 KB', icon: 'fileText' },
              ].map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
                  <Icon name={d.icon} size={14} stroke="var(--text-3)" />
                  <span style={{ flex: 1, fontSize: 12, color: 'var(--text-2)' }}>{d.name}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-4)' }}>{d.size}</span>
                  <button className="btn btn-ghost btn-icon btn-sm"><Icon name="download" size={12} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { InvoicesView });
