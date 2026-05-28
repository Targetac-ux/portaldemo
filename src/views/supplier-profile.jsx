// PortalProv — Supplier's own profile (when role=supplier nav=profile)

function SupplierProfileView() {
  const [tab, setTab] = React.useState('overview');
  const me = {
    name: 'Hardware y Componentes del Pacífico',
    razon: 'Hardware y Componentes del Pacífico SA de CV',
    rfc: 'HCP190228P82', categoria: 'Hardware',
    sede: 'Guadalajara, JAL', contacto: 'Vendedor',
    email: 'laguilar@hcpacifico.mx', telefono: '+52 33 3812 9904',
    completion: 92
  };

  return (
    <div>
      <PageHeader
        title="Mi perfil de proveedor"
        subtitle="Mantén actualizada tu información para mejorar tu score y recibir más invitaciones."
        actions={<button className="btn btn-primary"><Icon name="edit" size={14} /> Editar perfil</button>}
        meta={
          <React.Fragment>
            <StatusBadge tone="success">Verificado</StatusBadge>
            <span style={{ color: 'var(--text-5)' }}>·</span>
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}>Perfil completo al <span style={{ color: 'var(--text-1)' }}>{me.completion}%</span></span>
            <span style={{ color: 'var(--text-5)' }}>·</span>
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}>Score <span style={{ color: 'var(--success)' }}>95/100</span></span>
          </React.Fragment>
        }
      />

      <div style={{ padding: '0 28px' }}>
        <Tabs
          items={[
            { id: 'overview', label: 'Resumen' },
            { id: 'docs', label: 'Documentos', count: 6 },
            { id: 'contacts', label: 'Contactos' },
            { id: 'banking', label: 'Datos bancarios' },
          ]}
          value={tab}
          onChange={setTab}
        />
      </div>

      <div style={{ padding: 28 }}>
        {tab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="card">
                <div className="card-header"><h3 className="card-title">Información de la empresa</h3></div>
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <InfoRow label="Nombre comercial" value={me.name} />
                  <InfoRow label="Razón social" value={me.razon} />
                  <InfoRow label="RFC" value={<span className="mono">{me.rfc}</span>} />
                  <InfoRow label="Régimen fiscal" value="601 — General Personas Morales" />
                  <InfoRow label="Categoría" value={me.categoria} />
                  <InfoRow label="Sede" value={me.sede} />
                  <InfoRow label="Sitio web" value={<a href="#" style={{ color: 'var(--accent)' }}>hcpacifico.mx</a>} />
                </div>
              </div>

              <div className="card">
                <div className="card-header"><h3 className="card-title">Categorías y capacidades</h3></div>
                <div className="card-body">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {['Switches y routers', 'Cableado estructurado', 'Racks y gabinetes', 'Servidores rack', 'Almacenamiento NAS/SAN', 'UPS y respaldo', 'Fibra óptica'].map(c => (
                      <Pill key={c} tone="accent">{c}</Pill>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="card">
                <div className="card-header"><h3 className="card-title">Completitud del perfil</h3></div>
                <div style={{ padding: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: 32, fontWeight: 600, color: 'var(--text-1)' }} className="num">{me.completion}%</span>
                    <Pill tone="success">+8% este mes</Pill>
                  </div>
                  <Progress value={me.completion} color="var(--success)" />
                  <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      { l: 'Información fiscal', ok: true },
                      { l: 'Documentos requeridos', ok: true },
                      { l: 'Contactos', ok: true },
                      { l: 'Datos bancarios', ok: true },
                      { l: 'Certificaciones', ok: false },
                    ].map(s => (
                      <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                        <Icon name={s.ok ? 'checkCircle' : 'xCircle'} size={14} stroke={s.ok ? 'var(--success)' : 'var(--text-5)'} />
                        <span style={{ color: s.ok ? 'var(--text-2)' : 'var(--text-4)' }}>{s.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card" style={{ background: 'linear-gradient(135deg, var(--bg-2), rgba(167, 139, 250, 0.04))' }}>
                <div className="card-header"><h3 className="card-title">Score como proveedor</h3></div>
                <div style={{ padding: 20, textAlign: 'center' }}>
                  <div style={{ fontSize: 48, fontWeight: 600, color: 'var(--success)' }} className="num">95</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Top 5% en categoría Hardware</div>
                  <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <ScoreRow label="Cumplimiento entregas" value={98} />
                    <ScoreRow label="Calidad documental" value={100} />
                    <ScoreRow label="Tiempo de respuesta RFQ" value={88} />
                    <ScoreRow label="Disputas" value={92} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'docs' && <SupplierDocs supplier={me} />}
        {tab === 'contacts' && <SupplierContacts supplier={me} />}
        {tab === 'banking' && (
          <div className="card" style={{ maxWidth: 720 }}>
            <div className="card-header"><h3 className="card-title">Cuenta bancaria</h3></div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <InfoRow label="Banco" value="BBVA México" />
              <InfoRow label="Titular" value={me.razon} />
              <InfoRow label="CLABE" value={<span className="mono">012 320 00125438 4416</span>} />
              <InfoRow label="Número de cuenta" value={<span className="mono">0125438441</span>} />
              <InfoRow label="Moneda" value="MXN" />
              <div style={{ background: 'var(--info-soft)', padding: 12, borderRadius: 8, display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 4 }}>
                <Icon name="info" size={14} stroke="var(--info)" />
                <div style={{ fontSize: 12, color: 'var(--text-2)' }}>
                  Los datos bancarios se validan al primer pago. Cualquier cambio requiere aprobación del cliente.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ScoreRow({ label, value }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
        <span style={{ color: 'var(--text-3)' }}>{label}</span>
        <span className="num" style={{ color: 'var(--text-1)' }}>{value}</span>
      </div>
      <Progress value={value} color={value >= 90 ? 'var(--success)' : value >= 75 ? 'var(--warning)' : 'var(--danger)'} />
    </div>
  );
}

Object.assign(window, { SupplierProfileView });
