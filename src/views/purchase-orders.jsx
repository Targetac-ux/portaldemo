// PortalProv — Purchase Orders (list, form, detail)

function PurchaseOrdersView({ role }) {
  const [view, setView] = React.useState('list'); // list | form | detail
  const [selected, setSelected] = React.useState(null);

  if (view === 'form') return <POForm onClose={() => setView('list')} />;
  if (view === 'detail' && selected) return <PODetail po={selected} onBack={() => setView('list')} role={role} />;

  return (
    <div>
      <PageHeader
        title={role === 'supplier' ? 'Mis órdenes de compra' : 'Órdenes de compra'}
        subtitle={role === 'supplier' ? 'Órdenes recibidas de Grupo Inmobiliario CDMX.' : 'Crea, aprueba y rastrea órdenes de compra a tus proveedores.'}
        actions={role === 'buyer' && (
          <React.Fragment>
            <button className="btn btn-outline"><Icon name="download" size={14} /> Exportar</button>
            <button className="btn btn-primary" onClick={() => setView('form')}>
              <Icon name="plus" size={14} strokeWidth={2.4} /> Nueva OC
            </button>
          </React.Fragment>
        )}
      />

      {/* KPI strip */}
      <div style={{ padding: '20px 28px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, borderBottom: '1px solid var(--border-1)' }}>
        <MiniStat label="Abiertas" value="42" tone="info" />
        <MiniStat label="En tránsito" value="8" tone="accent" />
        <MiniStat label="Pendientes aprobación" value="3" tone="warning" />
        <MiniStat label="Monto YTD" value="$8.6M" tone="success" />
      </div>

      {/* Filters */}
      <div style={{ padding: '16px 28px', display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{ position: 'relative', width: 280 }}>
          <Icon name="search" size={14} stroke="var(--text-4)" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
          <input className="input" style={{ paddingLeft: 30 }} placeholder="Buscar OC, proveedor…" />
        </div>
        <button className="btn btn-outline btn-sm">Estado: Todos <Icon name="chevronDown" size={12} /></button>
        <button className="btn btn-outline btn-sm">Proveedor <Icon name="chevronDown" size={12} /></button>
        <button className="btn btn-outline btn-sm"><Icon name="calendar" size={12} /> Últimos 30 días</button>
        <div style={{ flex: 1 }} />
        <button className="btn btn-ghost btn-icon btn-sm" title="Vista lista"><Icon name="list" size={14} stroke="var(--accent)" /></button>
        <button className="btn btn-ghost btn-icon btn-sm" title="Vista cards"><Icon name="grid" size={14} /></button>
      </div>

      <div style={{ padding: '0 28px 28px' }}>
        <div className="card" style={{ overflow: 'hidden' }}>
          <table className="table">
            <thead>
              <tr>
                <th>OC</th>
                <th>Proveedor</th>
                <th>Fecha</th>
                <th>Entrega</th>
                <th>Items</th>
                <th style={{ textAlign: 'right' }}>Monto</th>
                <th>Estado</th>
                <th>Owner</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Data.purchaseOrders.map(po => (
                <tr key={po.id} style={{ cursor: 'pointer' }} onClick={() => { setSelected(po); setView('detail'); }}>
                  <td className="mono" style={{ color: 'var(--accent)' }}>{po.id}</td>
                  <td style={{ color: 'var(--text-1)' }}>{po.supplier}</td>
                  <td>{po.fecha}</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <Icon name="calendar" size={12} stroke="var(--text-4)" /> {po.entrega}
                    </span>
                  </td>
                  <td className="num">{po.items}</td>
                  <td style={{ textAlign: 'right' }} className="num">{Data.fmtMXN(po.monto)}</td>
                  <td><StatusBadge tone={po.tone}>{po.estado}</StatusBadge></td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <Avatar name={po.owner} size={20} />
                      <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{po.owner.split(' ')[0]}</span>
                    </span>
                  </td>
                  <td onClick={e => e.stopPropagation()}>
                    <button className="btn btn-ghost btn-icon btn-sm"><Icon name="more" size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 12, color: 'var(--text-4)' }}>8 órdenes · página 1 de 6</div>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="btn btn-ghost btn-sm" disabled><Icon name="chevronLeft" size={12} /></button>
              {[1, 2, 3, 4].map(n => (
                <button key={n} className={'btn btn-sm ' + (n === 1 ? 'btn-secondary' : 'btn-ghost')}>{n}</button>
              ))}
              <button className="btn btn-ghost btn-sm">…</button>
              <button className="btn btn-ghost btn-sm">6</button>
              <button className="btn btn-ghost btn-sm"><Icon name="chevronRight" size={12} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value, tone }) {
  return (
    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border-1)', borderRadius: 10, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: `var(--${tone}-soft)`, color: `var(--${tone})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="cart" size={16} />
      </div>
      <div>
        <div style={{ fontSize: 11, color: 'var(--text-4)' }}>{label}</div>
        <div className="num" style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-1)' }}>{value}</div>
      </div>
    </div>
  );
}

function POForm({ onClose }) {
  const [items, setItems] = React.useState([
    { desc: 'Switch Cisco Catalyst 9300 48-port PoE+', qty: 4, unit: 'pza', price: 38500, tax: 16 },
    { desc: 'Cable UTP Cat6A 305m caja azul', qty: 6, unit: 'caja', price: 4800, tax: 16 },
    { desc: 'Rack 42U 800×1000 con organizadores', qty: 1, unit: 'pza', price: 18200, tax: 16 },
  ]);

  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const iva = items.reduce((s, i) => s + i.qty * i.price * i.tax / 100, 0);
  const total = subtotal + iva;

  return (
    <div>
      <PageHeader
        title="Nueva orden de compra"
        subtitle="Crea una OC manualmente o desde una cotización adjudicada."
        actions={
          <React.Fragment>
            <button className="btn btn-outline" onClick={onClose}>Cancelar</button>
            <button className="btn btn-outline">Guardar borrador</button>
            <button className="btn btn-primary"><Icon name="send" size={14} /> Enviar a aprobación</button>
          </React.Fragment>
        }
      />

      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Header section */}
          <div className="card">
            <div className="card-header"><h3 className="card-title">Información general</h3></div>
            <div className="card-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="Proveedor" select options={Data.suppliers.filter(s => s.estado === 'Activo').map(s => s.name)} />
              <Field label="Centro de costo" select options={['CC-001 — IT Corporativo', 'CC-014 — Infraestructura', 'CC-027 — Oficinas Nuevas']} />
              <Field label="Fecha de emisión" value="26 may 2026" />
              <Field label="Fecha de entrega requerida" value="04 jun 2026" />
              <Field label="Dirección de entrega" select options={['Av. Insurgentes Sur 1602, CDMX', 'Av. Constitución 100, Monterrey', 'Av. López Mateos 3401, Guadalajara']} />
              <Field label="Términos de pago" select options={['Net 30', 'Net 45', 'Net 60', 'Contado']} />
            </div>
          </div>

          {/* Line items */}
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Partidas</h3>
                <div className="card-sub">{items.length} líneas · {items.reduce((s, i) => s + i.qty, 0)} unidades</div>
              </div>
              <button className="btn btn-outline btn-sm">Importar desde RFQ</button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: 32 }}>#</th>
                  <th>Descripción</th>
                  <th style={{ width: 70 }}>Cant.</th>
                  <th style={{ width: 60 }}>UM</th>
                  <th style={{ width: 110, textAlign: 'right' }}>Precio unit.</th>
                  <th style={{ width: 60 }}>IVA</th>
                  <th style={{ width: 120, textAlign: 'right' }}>Importe</th>
                  <th style={{ width: 32 }}></th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, idx) => (
                  <tr key={idx}>
                    <td className="mono" style={{ color: 'var(--text-4)' }}>{idx + 1}</td>
                    <td>
                      <input className="input" style={{ height: 30, background: 'transparent', border: 'none', padding: 0 }} defaultValue={it.desc} />
                    </td>
                    <td><input className="input num" style={{ height: 30, textAlign: 'right' }} defaultValue={it.qty} /></td>
                    <td><input className="input" style={{ height: 30 }} defaultValue={it.unit} /></td>
                    <td><input className="input num" style={{ height: 30, textAlign: 'right' }} defaultValue={it.price} /></td>
                    <td><span style={{ color: 'var(--text-3)' }}>{it.tax}%</span></td>
                    <td style={{ textAlign: 'right' }} className="num">{Data.fmtMXNshort(it.qty * it.price)}</td>
                    <td><button className="btn btn-ghost btn-icon btn-sm"><Icon name="x" size={12} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-1)' }}>
              <button className="btn btn-ghost btn-sm"><Icon name="plus" size={12} strokeWidth={2.4} /> Agregar partida</button>
            </div>
          </div>

          {/* Notes */}
          <div className="card">
            <div className="card-header"><h3 className="card-title">Notas internas</h3></div>
            <div className="card-body">
              <textarea className="textarea" placeholder="Notas visibles para el proveedor y aprobadores…" />
            </div>
          </div>
        </div>

        {/* Right column — summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 80, alignSelf: 'flex-start' }}>
          <div className="card">
            <div className="card-header"><h3 className="card-title">Resumen</h3></div>
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <SumRow label="Subtotal" value={Data.fmtMXN(subtotal)} />
              <SumRow label="IVA (16%)" value={Data.fmtMXN(iva)} />
              <div style={{ height: 1, background: 'var(--border-1)', margin: '4px 0' }} />
              <SumRow label={<span style={{ fontSize: 14, color: 'var(--text-1)', fontWeight: 500 }}>Total</span>} value={<span style={{ fontSize: 18, color: 'var(--text-1)', fontWeight: 600 }} className="num">{Data.fmtMXN(total)}</span>} />
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h3 className="card-title">Aprobadores</h3></div>
            <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { name: 'María E. Rodríguez', role: 'Comprador · L1', auto: true },
                { name: 'Jorge Castillo', role: 'Gerente de Compras · L2', auto: true },
                { name: 'Patricia Vázquez', role: 'CFO · L3 (>$200K)', auto: true },
              ].map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar name={a.name} size={28} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: 'var(--text-1)', fontWeight: 500 }}>{a.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-4)' }}>{a.role}</div>
                  </div>
                  {a.auto && <span style={{ fontSize: 10, color: 'var(--text-4)' }}>auto</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SumRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <span style={{ fontSize: 13, color: 'var(--text-3)' }}>{label}</span>
      <span className="num" style={{ fontSize: 13, color: 'var(--text-1)', fontWeight: 500 }}>{value}</span>
    </div>
  );
}

function PODetail({ po, onBack, role }) {
  const timeline = [
    { d: '23 may · 09:18', who: 'Carlos Mendoza', what: 'Creó la orden', tone: 'info', done: true },
    { d: '23 may · 11:02', who: 'María E. Rodríguez', what: 'Aprobó (L1)', tone: 'success', done: true },
    { d: '23 may · 14:38', who: 'Jorge Castillo', what: 'Aprobó (L2)', tone: 'success', done: true },
    { d: '23 may · 16:10', who: 'Sistema', what: 'Notificó al proveedor', tone: 'accent', done: true },
    { d: '24 may · 08:42', who: 'Hardware Pacífico', what: 'Confirmó recepción', tone: 'success', done: true },
    { d: '26 may · 10:00', who: 'Hardware Pacífico', what: 'Mercancía en tránsito', tone: 'info', done: true, current: true },
    { d: 'Estimado 04 jun', who: '', what: 'Recepción en almacén', tone: 'neutral', done: false },
    { d: 'Pendiente', who: '', what: 'Factura emitida', tone: 'neutral', done: false },
    { d: 'Pendiente', who: '', what: 'Pago liberado', tone: 'neutral', done: false },
  ];

  return (
    <div>
      <PageHeader
        title={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <span className="mono" style={{ color: 'var(--accent)' }}>{po.id}</span>
          <StatusBadge tone={po.tone}>{po.estado}</StatusBadge>
        </span>}
        subtitle={po.supplier}
        actions={
          <React.Fragment>
            <button className="btn btn-outline" onClick={onBack}><Icon name="arrowLeft" size={14} /> Volver</button>
            <button className="btn btn-outline"><Icon name="download" size={14} /> PDF</button>
            <button className="btn btn-outline">Duplicar</button>
            {role === 'buyer' && <button className="btn btn-danger">Cancelar OC</button>}
          </React.Fragment>
        }
      />

      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Summary card */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              <DetailStat label="Monto total" value={Data.fmtMXN(po.monto)} />
              <DetailStat label="Partidas" value={po.items} />
              <DetailStat label="Fecha emisión" value={po.fecha} />
              <DetailStat label="Entrega esperada" value={po.entrega} />
            </div>
          </div>

          {/* Line items */}
          <div className="card">
            <div className="card-header"><h3 className="card-title">Partidas</h3></div>
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: 32 }}>#</th>
                  <th>Descripción</th>
                  <th style={{ width: 70 }}>Cant.</th>
                  <th style={{ width: 60 }}>UM</th>
                  <th style={{ width: 120, textAlign: 'right' }}>Precio unit.</th>
                  <th style={{ width: 140, textAlign: 'right' }}>Importe</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { d: 'Switch Cisco Catalyst 9300 48-port PoE+', q: 4, u: 'pza', p: 38500 },
                  { d: 'Cable UTP Cat6A 305m caja azul', q: 6, u: 'caja', p: 4800 },
                  { d: 'Rack 42U 800×1000 con organizadores', q: 1, u: 'pza', p: 18200 },
                ].slice(0, po.items > 3 ? 3 : po.items).map((it, i) => (
                  <tr key={i}>
                    <td className="mono" style={{ color: 'var(--text-4)' }}>{i + 1}</td>
                    <td style={{ color: 'var(--text-1)' }}>{it.d}</td>
                    <td className="num">{it.q}</td>
                    <td>{it.u}</td>
                    <td style={{ textAlign: 'right' }} className="num">{Data.fmtMXN(it.p)}</td>
                    <td style={{ textAlign: 'right' }} className="num">{Data.fmtMXN(it.q * it.p)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="5" style={{ textAlign: 'right', color: 'var(--text-3)' }}>Subtotal</td>
                  <td style={{ textAlign: 'right' }} className="num">{Data.fmtMXN(po.monto / 1.16)}</td>
                </tr>
                <tr>
                  <td colSpan="5" style={{ textAlign: 'right', color: 'var(--text-3)' }}>IVA 16%</td>
                  <td style={{ textAlign: 'right' }} className="num">{Data.fmtMXN(po.monto - po.monto / 1.16)}</td>
                </tr>
                <tr>
                  <td colSpan="5" style={{ textAlign: 'right', color: 'var(--text-1)', fontWeight: 500 }}>Total</td>
                  <td style={{ textAlign: 'right', color: 'var(--text-1)', fontWeight: 600, fontSize: 14 }} className="num">{Data.fmtMXN(po.monto)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Related */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="card">
              <div className="card-header"><h3 className="card-title">Factura asociada</h3></div>
              <div style={{ padding: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-3)', color: 'var(--text-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="invoice" size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="mono" style={{ color: 'var(--accent)', fontSize: 13 }}>FAC-A-1184</div>
                    <div style={{ fontSize: 11, color: 'var(--text-4)' }}>Subida 24 may · UUID 7F8A2C9D…</div>
                  </div>
                  <StatusBadge tone="warning">En aprobación</StatusBadge>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header"><h3 className="card-title">Origen</h3></div>
              <div style={{ padding: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-3)', color: 'var(--text-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="rfq" size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="mono" style={{ color: 'var(--accent)', fontSize: 13 }}>RFQ-026-114</div>
                    <div style={{ fontSize: 11, color: 'var(--text-4)' }}>Suministro de servidores rack 2U</div>
                  </div>
                  <StatusBadge tone="success">Adjudicada</StatusBadge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 80, alignSelf: 'flex-start' }}>
          <div className="card">
            <div className="card-header"><h3 className="card-title">Timeline de estados</h3></div>
            <div style={{ padding: '18px 20px 8px' }}>
              {timeline.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, position: 'relative', minHeight: 44 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%',
                      background: t.done ? `var(--${t.tone})` : 'var(--bg-3)',
                      border: t.current ? '2px solid var(--accent)' : 'none',
                      boxShadow: t.current ? '0 0 0 3px var(--accent-soft)' : 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginTop: 2
                    }}>
                      {t.done && <Icon name="check" size={10} stroke="white" strokeWidth={3} />}
                    </div>
                    {i < timeline.length - 1 && <div style={{ width: 2, flex: 1, background: t.done ? `var(--${t.tone})` : 'var(--border-1)', opacity: t.done ? 0.4 : 1 }} />}
                  </div>
                  <div style={{ flex: 1, paddingBottom: 14 }}>
                    <div style={{ fontSize: 13, color: t.done ? 'var(--text-1)' : 'var(--text-4)', fontWeight: t.current ? 500 : 400 }}>{t.what}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 2 }}>
                      {t.d}{t.who && ' · ' + t.who}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h3 className="card-title">Comentarios</h3></div>
            <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <Avatar name="Jorge Castillo" size={28} />
                <div style={{ flex: 1, background: 'var(--bg-1)', borderRadius: 8, padding: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-4)', marginBottom: 4 }}>
                    <span style={{ color: 'var(--text-2)', fontWeight: 500 }}>Jorge Castillo</span>
                    <span>23 may · 14:38</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-2)' }}>Aprobado. Asegurar que la entrega coincida con la ventana del data center.</div>
                </div>
              </div>
              <textarea className="textarea" placeholder="Agregar comentario…" style={{ minHeight: 60 }} />
              <button className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-end' }}>Comentar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailStat({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 16, color: 'var(--text-1)', fontWeight: 500, marginTop: 4 }} className="num">{value}</div>
    </div>
  );
}

Object.assign(window, { PurchaseOrdersView });
