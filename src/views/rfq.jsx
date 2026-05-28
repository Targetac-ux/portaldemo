// PortalProv — RFQ (list, create, side-by-side comparison)

function RFQView({ role }) {
  const [view, setView] = React.useState('list');
  const [selected, setSelected] = React.useState(null);

  if (view === 'create') return <RFQCreate onClose={() => setView('list')} />;
  if (view === 'detail' && selected) return <RFQDetail rfq={selected} onBack={() => setView('list')} role={role} />;

  return (
    <div>
      <PageHeader
        title={role === 'supplier' ? 'Solicitudes de cotización' : 'Cotizaciones'}
        subtitle={role === 'supplier' ? 'Responde a las RFQs que recibes de tus clientes.' : 'Crea solicitudes de cotización (RFQ) y compara propuestas lado a lado.'}
        actions={role === 'buyer' && (
          <React.Fragment>
            <button className="btn btn-outline">Plantillas</button>
            <button className="btn btn-primary" onClick={() => setView('create')}>
              <Icon name="plus" size={14} strokeWidth={2.4} /> Nueva RFQ
            </button>
          </React.Fragment>
        )}
      />

      <div style={{ padding: '20px 28px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, borderBottom: '1px solid var(--border-1)' }}>
        <MiniStatRFQ label="Abiertas" value="3" tone="info" icon="rfq" />
        <MiniStatRFQ label="En evaluación" value="2" tone="accent" icon="layers" />
        <MiniStatRFQ label="Adjudicadas (mes)" value="4" tone="success" icon="checkCircle" />
        <MiniStatRFQ label="Ahorro YTD" value="$340K" tone="purple" icon="trending" />
      </div>

      <div style={{ padding: '16px 28px', display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{ position: 'relative', width: 280 }}>
          <Icon name="search" size={14} stroke="var(--text-4)" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
          <input className="input" style={{ paddingLeft: 30 }} placeholder="Buscar RFQ por ID o título…" />
        </div>
        <button className="btn btn-outline btn-sm">Estado: Todos <Icon name="chevronDown" size={12} /></button>
        <button className="btn btn-outline btn-sm">Categoría <Icon name="chevronDown" size={12} /></button>
      </div>

      <div style={{ padding: '0 28px 28px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {Data.rfqs.map(r => (
          <div key={r.id} className="card" style={{ cursor: 'pointer', transition: 'border-color 120ms' }} onClick={() => { setSelected(r); setView('detail'); }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-2)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-1)'}
          >
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span className="mono" style={{ fontSize: 11, color: 'var(--accent)' }}>{r.id}</span>
                <StatusBadge tone={r.tone}>{r.estado}</StatusBadge>
                <div style={{ flex: 1 }} />
                <span style={{ fontSize: 11, color: 'var(--text-4)' }}>Cierra {r.cierre}</span>
              </div>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 500, color: 'var(--text-1)' }}>{r.titulo}</h3>
              <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="suppliers" size={13} stroke="var(--text-4)" />
                  <span style={{ fontSize: 12, color: 'var(--text-3)' }}><span style={{ color: 'var(--text-1)', fontWeight: 500 }}>{r.respuestas}</span>/{r.invitados} respuestas</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Avatar name={r.owner} size={20} />
                  <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{r.owner}</span>
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <Progress value={(r.respuestas / r.invitados) * 100} color={`var(--${r.tone === 'neutral' ? 'text-4' : r.tone})`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniStatRFQ({ label, value, tone, icon }) {
  return (
    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border-1)', borderRadius: 10, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: `var(--${tone}-soft)`, color: `var(--${tone})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={16} />
      </div>
      <div>
        <div style={{ fontSize: 11, color: 'var(--text-4)' }}>{label}</div>
        <div className="num" style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-1)' }}>{value}</div>
      </div>
    </div>
  );
}

function RFQCreate({ onClose }) {
  return (
    <div>
      <PageHeader
        title="Nueva solicitud de cotización"
        subtitle="Define los requisitos, invita proveedores y define la fecha límite."
        actions={
          <React.Fragment>
            <button className="btn btn-outline" onClick={onClose}>Cancelar</button>
            <button className="btn btn-outline">Guardar borrador</button>
            <button className="btn btn-primary"><Icon name="send" size={14} /> Publicar RFQ</button>
          </React.Fragment>
        }
      />

      <div style={{ padding: 28, maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div className="card-header"><h3 className="card-title">Información general</h3></div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Field label="Título" placeholder="Switches gestionados 48 puertos PoE" />
              <Field label="Descripción / requerimientos" textarea placeholder="Describe los productos o servicios, especificaciones técnicas, plazos…" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                <Field label="Categoría" select options={['Hardware', 'Software', 'Servicios', 'Logística']} />
                <Field label="Fecha límite respuesta" value="03 jun 2026" />
                <Field label="Entrega requerida" value="15 jun 2026" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Field label="Moneda" select options={['MXN', 'USD']} />
                <Field label="Términos de pago" select options={['Net 30', 'Net 45', 'Net 60']} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Partidas solicitadas</h3>
              <button className="btn btn-outline btn-sm"><Icon name="plus" size={12} strokeWidth={2.4} /> Agregar</button>
            </div>
            <table className="table">
              <thead><tr><th style={{ width: 32 }}>#</th><th>Descripción</th><th>Cantidad</th><th>UM</th><th>Especificación</th></tr></thead>
              <tbody>
                {[
                  { d: 'Switch 48 puertos PoE+ Cat6', q: 8, u: 'pza', spec: 'Layer 3, 740W PoE budget' },
                  { d: 'Módulo SFP+ 10G LR', q: 16, u: 'pza', spec: 'Multimodo, alcance 10km' },
                  { d: 'Patch cord fibra LC-LC 5m', q: 32, u: 'pza', spec: 'OS2 amarillo' },
                ].map((it, i) => (
                  <tr key={i}>
                    <td className="mono" style={{ color: 'var(--text-4)' }}>{i + 1}</td>
                    <td style={{ color: 'var(--text-1)' }}>{it.d}</td>
                    <td className="num">{it.q}</td>
                    <td>{it.u}</td>
                    <td style={{ color: 'var(--text-3)' }}>{it.spec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Proveedores invitados</h3>
                <div className="card-sub">5 proveedores seleccionados</div>
              </div>
              <button className="btn btn-outline btn-sm">Agregar proveedores</button>
            </div>
            <div className="card-body" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {Data.suppliers.filter(s => s.estado === 'Activo' && s.categoria === 'Hardware').concat(Data.suppliers.filter(s => s.categoria === 'Telecom')).slice(0, 5).map(s => (
                <div key={s.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 8px 6px 6px', background: 'var(--bg-3)', border: '1px solid var(--border-2)', borderRadius: 999 }}>
                  <Avatar name={s.name} size={22} />
                  <span style={{ fontSize: 12, color: 'var(--text-1)' }}>{s.name}</span>
                  <button className="btn btn-ghost btn-icon btn-sm" style={{ width: 18, height: 18 }}><Icon name="x" size={10} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 80, alignSelf: 'flex-start' }}>
          <div className="card">
            <div className="card-header"><h3 className="card-title">Criterios de evaluación</h3></div>
            <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { l: 'Precio', w: 50 },
                { l: 'Tiempo de entrega', w: 20 },
                { l: 'Garantía', w: 15 },
                { l: 'Términos de pago', w: 10 },
                { l: 'Score histórico', w: 5 },
              ].map((c, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                    <span style={{ color: 'var(--text-2)' }}>{c.l}</span>
                    <span className="num" style={{ color: 'var(--text-1)', fontWeight: 500 }}>{c.w}%</span>
                  </div>
                  <Progress value={c.w} />
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 18, background: 'var(--accent-soft)', border: '1px solid rgba(56,189,248,0.2)' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <Icon name="sparkles" size={18} stroke="var(--accent)" />
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-1)' }}>Sugerencia automática</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>Basado en RFQs similares, recomendamos invitar a <span style={{ color: 'var(--accent)' }}>Cables y Conectores GDL</span> también.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RFQDetail({ rfq, onBack, role }) {
  const [tab, setTab] = React.useState('compare');

  return (
    <div>
      <PageHeader
        title={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <span className="mono" style={{ color: 'var(--accent)' }}>{rfq.id}</span>
          <StatusBadge tone={rfq.tone}>{rfq.estado}</StatusBadge>
        </span>}
        subtitle={rfq.titulo}
        actions={
          <React.Fragment>
            <button className="btn btn-outline" onClick={onBack}><Icon name="arrowLeft" size={14} /> Volver</button>
            <button className="btn btn-outline"><Icon name="message" size={14} /> Mensajes</button>
            {role === 'buyer' && <button className="btn btn-primary"><Icon name="check" size={14} strokeWidth={2.4} /> Adjudicar</button>}
          </React.Fragment>
        }
        meta={
          <React.Fragment>
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}>Cierra el <span style={{ color: 'var(--text-1)' }}>{rfq.cierre}</span></span>
            <span style={{ color: 'var(--text-5)' }}>·</span>
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}><span style={{ color: 'var(--text-1)' }}>{rfq.respuestas}</span>/{rfq.invitados} respuestas recibidas</span>
            <span style={{ color: 'var(--text-5)' }}>·</span>
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}>Owner: <span style={{ color: 'var(--text-1)' }}>{rfq.owner}</span></span>
          </React.Fragment>
        }
      />

      <div style={{ padding: '0 28px' }}>
        <Tabs
          items={[
            { id: 'compare', label: 'Comparativo', count: 4 },
            { id: 'specs', label: 'Especificaciones' },
            { id: 'suppliers', label: 'Proveedores', count: rfq.invitados },
            { id: 'messages', label: 'Mensajes', count: 3 },
          ]}
          value={tab}
          onChange={setTab}
        />
      </div>

      <div style={{ padding: 28 }}>
        {tab === 'compare' && <RFQComparison />}
        {tab === 'specs' && <RFQSpecs />}
        {tab === 'suppliers' && <RFQSuppliers />}
        {tab === 'messages' && <RFQMessages />}
      </div>
    </div>
  );
}

function RFQComparison() {
  const quotes = Data.rfqQuotes;
  const min = Math.min(...quotes.map(q => q.precio));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ fontSize: 13, color: 'var(--text-3)' }}>Vista: </div>
        <div style={{ display: 'flex', background: 'var(--bg-2)', border: '1px solid var(--border-2)', borderRadius: 6, padding: 2 }}>
          {['Cards', 'Tabla', 'Matriz'].map((v, i) => (
            <button key={v} className="btn btn-sm" style={{
              background: i === 0 ? 'var(--bg-3)' : 'transparent',
              border: 'none',
              color: i === 0 ? 'var(--text-1)' : 'var(--text-3)',
              height: 26, padding: '0 12px'
            }}>{v}</button>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 12, color: 'var(--text-4)' }}>4 cotizaciones recibidas de 5 invitados</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {quotes.map((q, i) => {
          const best = q.precio === min;
          return (
            <div key={i} className="card" style={{
              padding: 18,
              borderColor: q.recomendado ? 'var(--accent)' : 'var(--border-1)',
              position: 'relative',
              background: q.recomendado ? 'linear-gradient(180deg, rgba(56,189,248,0.06), transparent)' : 'var(--bg-2)'
            }}>
              {q.recomendado && (
                <div style={{ position: 'absolute', top: -1, right: 14, padding: '3px 10px', background: 'var(--accent)', color: 'var(--bg-0)', fontSize: 10, fontWeight: 600, borderRadius: '0 0 6px 6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recomendado</div>
              )}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14 }}>
                <Avatar name={q.supplier} size={32} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: 'var(--text-1)', fontWeight: 500, lineHeight: 1.3 }}>{q.supplier}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 2 }}>Score histórico {q.score}</div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-1)', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <CompareRow label="Precio" value={Data.fmtMXN(q.precio)} highlight={best} highlightColor="success" />
                <CompareRow label="Entrega" value={q.entrega} />
                <CompareRow label="Garantía" value={q.garantia} />
                <CompareRow label="Pago" value={q.pago} />
                <CompareRow label="Diferencia vs. mejor" value={best ? '—' : '+' + Data.fmtMXNshort(q.precio - min)} highlight={!best} highlightColor="text-3" />
              </div>

              <div style={{ marginTop: 16, display: 'flex', gap: 6 }}>
                <button className="btn btn-outline btn-sm" style={{ flex: 1 }}>Ver detalle</button>
                {q.recomendado ? (
                  <button className="btn btn-primary btn-sm" style={{ flex: 1 }}><Icon name="check" size={12} strokeWidth={2.4} /> Adjudicar</button>
                ) : (
                  <button className="btn btn-ghost btn-icon btn-sm"><Icon name="more" size={14} /></button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Insights */}
      <div className="card" style={{ padding: 20, display: 'flex', gap: 24, alignItems: 'center' }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--purple-soft)', color: 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="sparkles" size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: 'var(--text-1)', fontWeight: 500 }}>Hardware y Componentes del Pacífico ofrece el mejor balance precio-entrega</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>
            <span style={{ color: 'var(--accent)' }}>$14,340 MXN por debajo</span> de la segunda mejor oferta, con entrega en 12 días. Score histórico 92/100 en 54 órdenes.
          </div>
        </div>
        <button className="btn btn-secondary">Ver análisis completo</button>
      </div>
    </div>
  );
}

function CompareRow({ label, value, highlight, highlightColor = 'success' }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <span style={{ fontSize: 11, color: 'var(--text-4)' }}>{label}</span>
      <span className="num" style={{
        fontSize: 13,
        color: highlight ? `var(--${highlightColor})` : 'var(--text-1)',
        fontWeight: highlight && highlightColor === 'success' ? 600 : 500
      }}>{value}</span>
    </div>
  );
}

function RFQSpecs() {
  return (
    <div className="card">
      <div className="card-header"><h3 className="card-title">Partidas y especificaciones</h3></div>
      <table className="table">
        <thead><tr><th>#</th><th>Descripción</th><th>Cant.</th><th>UM</th><th>Especificación</th></tr></thead>
        <tbody>
          {[
            { d: 'Switch 48 puertos PoE+ Cat6', q: 8, u: 'pza', spec: 'Layer 3, 740W PoE budget, gestionable' },
            { d: 'Módulo SFP+ 10G LR', q: 16, u: 'pza', spec: 'Multimodo, alcance 10km, compatible' },
            { d: 'Patch cord fibra LC-LC 5m', q: 32, u: 'pza', spec: 'OS2 amarillo, certificado' },
            { d: 'Instalación y configuración', q: 1, u: 'serv', spec: 'On-site CDMX, fines de semana' },
          ].map((it, i) => (
            <tr key={i}>
              <td className="mono" style={{ color: 'var(--text-4)' }}>{i + 1}</td>
              <td style={{ color: 'var(--text-1)' }}>{it.d}</td>
              <td className="num">{it.q}</td>
              <td>{it.u}</td>
              <td style={{ color: 'var(--text-3)' }}>{it.spec}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RFQSuppliers() {
  const invited = ['Hardware y Componentes del Pacífico', 'Tecnología Avanzada de México', 'Sistemas Empresariales del Norte', 'Redes y Telecomunicaciones BC', 'Cables y Conectores de Guadalajara'];
  return (
    <div className="card">
      <table className="table">
        <thead><tr><th>Proveedor</th><th>Invitado</th><th>Visto</th><th>Cotización</th><th>Score</th></tr></thead>
        <tbody>
          {invited.map((s, i) => {
            const responded = i < 4;
            return (
              <tr key={i}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={s} size={24} />
                    <span style={{ color: 'var(--text-1)' }}>{s}</span>
                  </div>
                </td>
                <td>20 may · 09:00</td>
                <td>{i < 5 ? '20 may · 14:32' : '—'}</td>
                <td>{responded ? <StatusBadge tone="success">Recibida</StatusBadge> : <StatusBadge tone="neutral">Pendiente</StatusBadge>}</td>
                <td>{responded ? <span className="num" style={{ color: 'var(--text-1)' }}>{Data.rfqQuotes[i] && Data.rfqQuotes[i].score}</span> : '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function RFQMessages() {
  const msgs = [
    { who: 'Hardware y Componentes del Pacífico', when: '22 may · 11:24', text: '¿Es posible considerar entrega parcial? Podríamos despachar 4 unidades de switch la primera semana.', side: 'them' },
    { who: 'Carlos Mendoza', when: '22 may · 11:48', text: 'Sí, aceptamos entrega parcial siempre que se complete dentro del plazo total de 15 días.', side: 'you' },
    { who: 'Tecnología Avanzada de México', when: '22 may · 15:02', text: 'Adjuntamos datasheet técnico del modelo propuesto. Garantía extendible a 60 meses con costo adicional.', side: 'them', attach: 'datasheet-sw48.pdf' },
  ];
  return (
    <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {msgs.map((m, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, flexDirection: m.side === 'you' ? 'row-reverse' : 'row' }}>
          <Avatar name={m.who} size={32} />
          <div style={{ maxWidth: '60%' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 4, justifyContent: m.side === 'you' ? 'flex-end' : 'flex-start' }}>
              <span style={{ fontSize: 12, color: 'var(--text-1)', fontWeight: 500 }}>{m.who}</span>
              <span style={{ fontSize: 11, color: 'var(--text-4)' }}>{m.when}</span>
            </div>
            <div style={{ padding: '10px 14px', borderRadius: 10, background: m.side === 'you' ? 'var(--accent)' : 'var(--bg-3)', color: m.side === 'you' ? 'var(--accent-text)' : 'var(--text-1)', fontSize: 13 }}>
              {m.text}
            </div>
            {m.attach && (
              <div style={{ marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 10px', background: 'var(--bg-3)', border: '1px solid var(--border-2)', borderRadius: 6, fontSize: 12 }}>
                <Icon name="paperclip" size={12} stroke="var(--text-3)" /><span style={{ color: 'var(--text-2)' }}>{m.attach}</span>
              </div>
            )}
          </div>
        </div>
      ))}
      <div style={{ marginTop: 8, paddingTop: 16, borderTop: '1px solid var(--border-1)', display: 'flex', gap: 10 }}>
        <input className="input" style={{ flex: 1 }} placeholder="Escribe un mensaje a todos los proveedores invitados…" />
        <button className="btn btn-outline btn-icon"><Icon name="paperclip" size={14} /></button>
        <button className="btn btn-primary"><Icon name="send" size={14} /> Enviar</button>
      </div>
    </div>
  );
}

Object.assign(window, { RFQView });
