// PortalProv — Dashboard views (Buyer + Supplier)

function BuyerDashboard() {
  return (
    <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <KpiCard label="Gasto del mes" value={'$8.6M'} sub="vs. $7.4M abr" trend="+16.2%" icon="dollar" />
        <KpiCard label="OC abiertas" value="42" sub="$2.1M en tránsito" trend="+4" icon="cart" />
        <KpiCard label="Facturas por aprobar" value="5" sub="$684,420 MXN" trend="=2 nuevas" icon="invoice" accent="var(--warning-soft)" />
        <KpiCard label="Días promedio de pago" value="28" sub="meta: 30 días" trend="-2 días" icon="clock" />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Gasto por mes</h3>
              <div className="card-sub">Últimos 6 meses · MXN (millones)</div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {['6M', '12M', 'YTD'].map(p => (
                <button key={p} className={'btn btn-sm ' + (p === '6M' ? 'btn-secondary' : 'btn-ghost')}>{p}</button>
              ))}
            </div>
          </div>
          <div style={{ padding: 24 }}>
            <LineChart data={Data.spendByMonth} />
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Distribución por categoría</h3>
              <div className="card-sub">Mayo 2026</div>
            </div>
          </div>
          <div style={{ padding: 24, display: 'flex', gap: 24, alignItems: 'center' }}>
            <Donut data={Data.spendByCategory} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {Data.spendByCategory.map(c => (
                <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: c.color }} />
                  <span style={{ flex: 1, color: 'var(--text-2)' }}>{c.name}</span>
                  <span className="num" style={{ color: 'var(--text-1)', fontWeight: 500 }}>{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity + To approve */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Por aprobar</h3>
              <div className="card-sub">5 facturas · $684,420 MXN</div>
            </div>
            <button className="btn btn-ghost btn-sm">Ver todas <Icon name="arrowRight" size={12} /></button>
          </div>
          <div style={{ padding: '4px 0' }}>
            {Data.invoices.filter(i => i.estado === 'En aprobación').slice(0, 4).map(inv => (
              <div key={inv.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: '1px solid var(--border-1)' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--warning-soft)', color: 'var(--warning)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="invoice" size={14} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span className="mono" style={{ fontSize: 12, color: 'var(--text-1)' }}>{inv.id}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-4)' }}>· {inv.oc}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inv.supplier}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="num" style={{ fontSize: 13, color: 'var(--text-1)', fontWeight: 500 }}>{Data.fmtMXN(inv.total)}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-4)' }}>vence {inv.vencimiento}</div>
                </div>
              </div>
            ))}
            {Data.invoices.filter(i => i.estado === 'En aprobación').length === 0 && <EmptyState title="Nada por aprobar" body="Buen trabajo, todo está al día." />}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Actividad reciente</h3>
              <div className="card-sub">Últimas 24 horas</div>
            </div>
            <button className="btn btn-ghost btn-sm">Historial</button>
          </div>
          <div style={{ padding: '14px 20px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {Data.activity.map((a, i) => {
              const iconMap = { invoice: 'invoice', po: 'cart', supplier: 'building', rfq: 'rfq' };
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, position: 'relative' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 999, background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--' + a.tone + ')', flexShrink: 0 }}>
                    <Icon name={iconMap[a.tipo]} size={12} />
                  </div>
                  <div style={{ flex: 1, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--text-1)', fontWeight: 500 }}>{a.who}</span> {a.what} {a.target && <span className="mono" style={{ color: 'var(--accent)' }}>{a.target}</span>}
                    <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 2 }}>{a.when}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top suppliers */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Top proveedores por gasto</h3>
            <div className="card-sub">Mayo 2026</div>
          </div>
          <button className="btn btn-ghost btn-sm">Ver proveedores <Icon name="arrowRight" size={12} /></button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Proveedor</th>
              <th>RFC</th>
              <th style={{ textAlign: 'right' }}>Spend YTD</th>
              <th style={{ textAlign: 'right' }}>Órdenes</th>
              <th style={{ textAlign: 'right' }}>Score</th>
              <th>Tendencia</th>
            </tr>
          </thead>
          <tbody>
            {Data.suppliers.filter(s => s.spend > 0).sort((a, b) => b.spend - a.spend).slice(0, 5).map(s => (
              <tr key={s.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={s.name} size={26} />
                    <div>
                      <div style={{ color: 'var(--text-1)', fontWeight: 500 }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-4)' }}>{s.categoria}</div>
                    </div>
                  </div>
                </td>
                <td><span className="mono" style={{ fontSize: 12, color: 'var(--text-3)' }}>{s.rfc}</span></td>
                <td style={{ textAlign: 'right' }} className="num">{Data.fmtMXNshort(s.spend)}</td>
                <td style={{ textAlign: 'right' }} className="num">{s.ordenes}</td>
                <td style={{ textAlign: 'right' }}>
                  <span style={{ color: s.score >= 85 ? 'var(--success)' : s.score >= 70 ? 'var(--warning)' : 'var(--danger)', fontWeight: 500 }} className="num">{s.score}</span>
                </td>
                <td>
                  <Sparkline data={[3.4, 4.1, 3.8, 4.6, 5.1, 5.8, 6.2].map(v => v + Math.random())} width={80} height={28} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SupplierDashboard() {
  return (
    <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Greeting strip */}
      <div className="card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 18, background: 'linear-gradient(135deg, var(--bg-2), rgba(56, 189, 248, 0.04))' }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="sparkles" size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-1)' }}>Buen día, Vendedor</div>
          <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 2 }}>Tienes <span style={{ color: 'var(--accent)' }}>3 RFQs nuevas</span> y <span style={{ color: 'var(--warning)' }}>2 facturas en aprobación</span> con Grupo Inmobiliario CDMX.</div>
        </div>
        <button className="btn btn-secondary">Ver bandeja</button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <KpiCard label="Ventas del mes" value="$3.12M" sub="vs. $2.84M abr" trend="+9.8%" icon="trending" />
        <KpiCard label="Facturas pendientes" value="2" sub="$432,960 MXN" trend="=2 sin cambio" icon="invoice" />
        <KpiCard label="Por cobrar" value="$248K" sub="vence en 30 días" trend="=" icon="clock" accent="var(--warning-soft)" />
        <KpiCard label="Score de proveedor" value="95" sub="Excelente · top 5%" trend="+3" icon="star" />
      </div>

      {/* Open RFQs + Recent invoices */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Cotizaciones abiertas</h3>
              <div className="card-sub">3 esperando tu respuesta</div>
            </div>
          </div>
          <div>
            {Data.rfqs.filter(r => r.estado === 'Abierta' || r.estado === 'En evaluación').slice(0, 3).map(r => (
              <div key={r.id} style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span className="mono" style={{ fontSize: 11, color: 'var(--accent)' }}>{r.id}</span>
                    <StatusBadge tone={r.tone}>{r.estado}</StatusBadge>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-1)', fontWeight: 500 }}>{r.titulo}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 4 }}>Cierra el {r.cierre}</div>
                </div>
                <button className="btn btn-primary btn-sm">Cotizar</button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Mis facturas</h3>
              <div className="card-sub">Últimas 30 días</div>
            </div>
          </div>
          <div style={{ padding: '4px 0' }}>
            {Data.supplierInvoices.map(inv => (
              <div key={inv.id} style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div className="mono" style={{ fontSize: 12, color: 'var(--text-1)' }}>{inv.id}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-4)' }}>{inv.pago}</div>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
                  <div className="num" style={{ fontSize: 13, color: 'var(--text-1)', fontWeight: 500 }}>{Data.fmtMXN(inv.total)}</div>
                  <StatusBadge tone={inv.tone}>{inv.estado}</StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Órdenes recientes</h3>
            <div className="card-sub">Grupo Inmobiliario CDMX</div>
          </div>
          <button className="btn btn-ghost btn-sm">Ver todas <Icon name="arrowRight" size={12} /></button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>OC</th>
              <th>Fecha</th>
              <th>Entrega</th>
              <th style={{ textAlign: 'right' }}>Monto</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Data.purchaseOrders.slice(0, 5).map(po => (
              <tr key={po.id}>
                <td><span className="mono" style={{ color: 'var(--accent)' }}>{po.id}</span></td>
                <td>{po.fecha}</td>
                <td>{po.entrega}</td>
                <td style={{ textAlign: 'right' }} className="num">{Data.fmtMXN(po.monto)}</td>
                <td><StatusBadge tone={po.tone}>{po.estado}</StatusBadge></td>
                <td style={{ textAlign: 'right' }}><button className="btn btn-ghost btn-sm">Ver <Icon name="arrowRight" size={12} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Object.assign(window, { BuyerDashboard, SupplierDashboard });
