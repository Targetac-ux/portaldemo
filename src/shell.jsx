// PortalProv — App shell (sidebar + topbar + role switcher)

const BUYER_NAV = [
  { id: 'dashboard', label: 'Inicio', icon: 'dashboard' },
  { id: 'suppliers', label: 'Proveedores', icon: 'suppliers', badge: 2 },
  { id: 'po', label: 'Órdenes de compra', icon: 'cart' },
  { id: 'invoices', label: 'Facturas', icon: 'invoice', badge: 5 },
  { id: 'rfq', label: 'Cotizaciones', icon: 'rfq' },
  { id: 'settings', label: 'Configuración', icon: 'settings' },
];

const SUPPLIER_NAV = [
  { id: 'dashboard', label: 'Inicio', icon: 'dashboard' },
  { id: 'po', label: 'Mis órdenes', icon: 'cart' },
  { id: 'invoices', label: 'Mis facturas', icon: 'invoice' },
  { id: 'rfq', label: 'Cotizaciones', icon: 'rfq', badge: 3 },
  { id: 'profile', label: 'Mi perfil', icon: 'building' },
  { id: 'settings', label: 'Configuración', icon: 'settings' },
];

function Sidebar({ role, current, onNav, collapsed }) {
  const items = role === 'buyer' ? BUYER_NAV : SUPPLIER_NAV;
  return (
    <aside style={{
      width: collapsed ? 64 : 232,
      flexShrink: 0,
      background: 'var(--bg-0)',
      borderRight: '1px solid var(--border-1)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 200ms'
    }}>
      {/* Logo */}
      <div style={{ padding: collapsed ? '18px 12px' : '18px 18px', borderBottom: '1px solid var(--border-1)', height: 60, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 7,
          background: 'linear-gradient(135deg, var(--accent), var(--purple))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--bg-0)', fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-mono)',
          flexShrink: 0
        }}>P</div>
        {!collapsed && (
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', letterSpacing: '-0.01em' }}>PortalProv</span>
            <span style={{ fontSize: 10, color: 'var(--text-4)' }}>Grupo Inmobiliario CDMX</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: collapsed ? '12px 8px' : '12px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {!collapsed && <div style={{ fontSize: 10, color: 'var(--text-5)', fontWeight: 500, padding: '8px 10px 4px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Workspace</div>}
        {items.map(item => {
          const active = current === item.id;
          return (
            <button key={item.id} onClick={() => onNav(item.id)} style={{
              display: 'flex', alignItems: 'center', gap: 11,
              padding: collapsed ? '10px 0' : '8px 10px',
              background: active ? 'var(--bg-3)' : 'transparent',
              color: active ? 'var(--text-1)' : 'var(--text-3)',
              border: 'none', borderRadius: 6, cursor: 'pointer',
              fontSize: 13, fontWeight: active ? 500 : 400, textAlign: 'left',
              transition: 'background 100ms, color 100ms',
              justifyContent: collapsed ? 'center' : 'flex-start',
              position: 'relative'
            }} onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--bg-2)'; e.currentTarget.style.color = 'var(--text-1)'; }}
               onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-3)'; }}
            >
              <Icon name={item.icon} size={16} stroke={active ? 'var(--accent)' : 'currentColor'} />
              {!collapsed && <span style={{ flex: 1 }}>{item.label}</span>}
              {!collapsed && item.badge && (
                <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 999, background: 'var(--accent-soft)', color: 'var(--accent)', fontWeight: 500 }}>{item.badge}</span>
              )}
              {collapsed && item.badge && (
                <span style={{ position: 'absolute', top: 6, right: 10, width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / role */}
      <div style={{ padding: collapsed ? 8 : 12, borderTop: '1px solid var(--border-1)' }}>
        <div style={{
          padding: collapsed ? '6px 0' : '10px 12px',
          background: 'var(--bg-2)', borderRadius: 8, border: '1px solid var(--border-1)',
          display: 'flex', flexDirection: collapsed ? 'column' : 'row', alignItems: 'center', gap: collapsed ? 6 : 10
        }}>
          <Avatar name={role === 'buyer' ? 'María Rodríguez' : 'Hardware Pacífico'} size={28} />
          {!collapsed && (
            <div style={{ flex: 1, minWidth: 0, lineHeight: 1.2 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {role === 'buyer' ? 'María Rodríguez' : 'Luis F. Aguilar'}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-4)' }}>
                {role === 'buyer' ? 'Compras · Comprador' : 'Hardware y Componentes'}
              </div>
            </div>
          )}
          {!collapsed && <Icon name="chevronsLeft" size={14} stroke="var(--text-4)" />}
        </div>
      </div>
    </aside>
  );
}

function Topbar({ breadcrumbs = [], role, onRoleChange, onCollapse, search = true }) {
  return (
    <header style={{
      height: 60,
      borderBottom: '1px solid var(--border-1)',
      background: 'var(--bg-1)',
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '0 24px',
      flexShrink: 0,
    }}>
      {onCollapse && (
        <button className="btn btn-ghost btn-icon btn-sm" onClick={onCollapse} title="Colapsar sidebar">
          <Icon name="list" size={16} />
        </button>
      )}

      {/* Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
        {breadcrumbs.map((b, i) => (
          <React.Fragment key={i}>
            {i > 0 && <Icon name="chevronRight" size={12} stroke="var(--text-5)" />}
            <span style={{ color: i === breadcrumbs.length - 1 ? 'var(--text-1)' : 'var(--text-4)', fontWeight: i === breadcrumbs.length - 1 ? 500 : 400 }}>{b}</span>
          </React.Fragment>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {/* Search */}
      {search && (
        <div style={{ position: 'relative', width: 280 }}>
          <Icon name="search" size={14} stroke="var(--text-4)" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
          <input className="input" style={{ height: 32, paddingLeft: 30, paddingRight: 48, fontSize: 12 }} placeholder="Buscar proveedor, OC, factura…" />
          <span className="kbd" style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}>⌘K</span>
        </div>
      )}

      {/* Role switcher */}
      <div style={{
        display: 'flex', background: 'var(--bg-2)', border: '1px solid var(--border-2)', borderRadius: 7, padding: 2, gap: 2
      }}>
        {[{ id: 'buyer', label: 'Buyer' }, { id: 'supplier', label: 'Supplier' }].map(r => (
          <button key={r.id} onClick={() => onRoleChange(r.id)} style={{
            border: 'none', background: role === r.id ? 'var(--bg-3)' : 'transparent',
            color: role === r.id ? 'var(--text-1)' : 'var(--text-3)',
            padding: '4px 12px', borderRadius: 5, fontSize: 12, fontWeight: 500, cursor: 'pointer',
            boxShadow: role === r.id ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: role === r.id ? 'var(--accent)' : 'var(--text-5)' }} />
              {r.label}
            </span>
          </button>
        ))}
      </div>

      <button className="btn btn-ghost btn-icon" title="Ayuda">
        <Icon name="helpCircle" size={16} />
      </button>
      <button className="btn btn-ghost btn-icon" title="Notificaciones" style={{ position: 'relative' }}>
        <Icon name="bell" size={16} />
        <span style={{ position: 'absolute', top: 8, right: 8, width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', border: '2px solid var(--bg-1)' }} />
      </button>
      <div style={{ width: 1, height: 24, background: 'var(--border-1)', margin: '0 4px' }} />
      <Avatar name={role === 'buyer' ? 'María Rodríguez' : 'Luis Aguilar'} size={30} />
    </header>
  );
}

// Page header (inside the main content area)
function PageHeader({ title, subtitle, actions, meta }) {
  return (
    <div style={{ padding: '24px 28px 20px', display: 'flex', alignItems: 'flex-start', gap: 20, borderBottom: '1px solid var(--border-1)' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>{title}</h1>
        {subtitle && <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--text-3)', maxWidth: 720 }}>{subtitle}</p>}
        {meta && <div style={{ marginTop: 10, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>{meta}</div>}
      </div>
      {actions && <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>{actions}</div>}
    </div>
  );
}

Object.assign(window, { Sidebar, Topbar, PageHeader, BUYER_NAV, SUPPLIER_NAV });
