// PortalProv — Main app router

const BREADCRUMBS = {
  buyer: {
    dashboard: ['Workspace', 'Inicio'],
    suppliers: ['Workspace', 'Proveedores'],
    po: ['Workspace', 'Órdenes de compra'],
    invoices: ['Workspace', 'Facturas'],
    rfq: ['Workspace', 'Cotizaciones'],
    settings: ['Workspace', 'Configuración'],
  },
  supplier: {
    dashboard: ['Workspace', 'Inicio'],
    po: ['Workspace', 'Mis órdenes'],
    invoices: ['Workspace', 'Mis facturas'],
    rfq: ['Workspace', 'Cotizaciones'],
    profile: ['Workspace', 'Mi perfil'],
    settings: ['Workspace', 'Configuración'],
  }
};

function App() {
  const [authed, setAuthed] = React.useState(true);
  const [role, setRole] = React.useState('buyer');
  const [nav, setNav] = React.useState('dashboard');
  const [collapsed, setCollapsed] = React.useState(false);

  // Reset nav when changing role if current nav doesn't exist for that role
  React.useEffect(() => {
    const validNavs = role === 'buyer'
      ? BUYER_NAV.map(n => n.id)
      : SUPPLIER_NAV.map(n => n.id);
    if (!validNavs.includes(nav)) setNav('dashboard');
  }, [role]);

  if (!authed) {
    return <AuthFlow onAuth={() => setAuthed(true)} />;
  }

  const renderContent = () => {
    if (nav === 'dashboard') return role === 'buyer' ? <BuyerDashboard /> : <SupplierDashboard />;
    if (nav === 'suppliers') return <SuppliersView />;
    if (nav === 'po') return <PurchaseOrdersView role={role} />;
    if (nav === 'invoices') return <InvoicesView role={role} />;
    if (nav === 'rfq') return <RFQView role={role} />;
    if (nav === 'profile') return <SupplierProfileView />;
    if (nav === 'settings') return <SettingsView />;
    return null;
  };

  const isDashboard = nav === 'dashboard';
  const hasPageHeader = nav !== 'dashboard'; // dashboard has no page header

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--bg-1)' }}>
      <Sidebar role={role} current={nav} onNav={(id) => setNav(id)} collapsed={collapsed} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          breadcrumbs={BREADCRUMBS[role][nav] || []}
          role={role}
          onRoleChange={setRole}
          onCollapse={() => setCollapsed(!collapsed)}
        />
        <main style={{ flex: 1, overflow: 'auto', background: 'var(--bg-1)' }}>
          {isDashboard && (
            <div style={{ padding: '24px 28px 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
                  {role === 'buyer' ? 'Buen día, Comprador 👋' : 'Bienvenido, Vendedor'}
                </h1>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-3)' }}>
                  {role === 'buyer'
                    ? 'Aquí está el resumen de tu workspace de compras · Lunes 26 de mayo, 2026.'
                    : 'Tu hub de relación comercial con Grupo Inmobiliario CDMX.'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-outline btn-sm"><Icon name="calendar" size={12} /> Mayo 2026</button>
                <button className="btn btn-outline btn-sm"><Icon name="download" size={12} /> Reporte</button>
              </div>
            </div>
          )}
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
