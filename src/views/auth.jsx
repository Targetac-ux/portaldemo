// PortalProv — Auth (login, register, forgot)

function AuthShell({ children, side = 'left' }) {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 480px', background: 'var(--bg-1)' }}>
      {/* Marketing side */}
      <div style={{
        background: 'linear-gradient(135deg, #060a14 0%, #0b1220 60%, #111a2e 100%)',
        padding: 56, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden', borderRight: '1px solid var(--border-1)'
      }}>
        {/* decorative grid */}
        <svg style={{ position: 'absolute', inset: 0, opacity: 0.3 }} width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border-1)" strokeWidth="0.5" />
            </pattern>
            <radialGradient id="glow" cx="20%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#glow)" />
        </svg>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: 'linear-gradient(135deg, var(--accent), var(--purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg-0)', fontWeight: 700, fontSize: 18, fontFamily: 'var(--font-mono)' }}>P</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-1)' }}>PortalProv</div>
            <div style={{ fontSize: 11, color: 'var(--text-4)' }}>Plataforma SRM B2B</div>
          </div>
        </div>

        <div style={{ position: 'relative', maxWidth: 500 }}>
          <h1 style={{ margin: 0, fontSize: 34, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-1)', lineHeight: 1.15 }}>
            Conecta a tus proveedores y acelera el ciclo de compras.
          </h1>
          <p style={{ marginTop: 16, fontSize: 15, color: 'var(--text-3)', lineHeight: 1.55 }}>
            Onboarding tributario, CFDI 4.0, conciliación 3-way, RFQs comparativas y aprobaciones por monto. Todo en un solo workspace.
          </p>

          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { i: 'shield', t: 'Validación SAT en tiempo real' },
              { i: 'zap', t: 'Conciliación factura ↔ OC automática' },
              { i: 'globe', t: 'Multi-tenant · multi-empresa' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: 'var(--text-2)' }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={f.i} size={14} />
                </div>
                {f.t}
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, color: 'var(--text-4)' }}>
          <span>© 2026 PortalProv</span>
          <span>·</span>
          <a href="#" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Términos</a>
          <a href="#" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Privacidad</a>
          <div style={{ flex: 1 }} />
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)' }} />
            Todos los sistemas operativos
          </span>
        </div>
      </div>

      {/* Form side */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
        <div style={{ width: '100%', maxWidth: 380 }}>{children}</div>
      </div>
    </div>
  );
}

function LoginView({ onSwitch, onAuth }) {
  return (
    <AuthShell>
      <div>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Inicia sesión</h2>
        <p style={{ margin: '6px 0 28px', fontSize: 13, color: 'var(--text-3)' }}>Accede a tu workspace de PortalProv.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field label="Correo corporativo" placeholder="tu@empresa.mx" value="mrodriguez@grupocdmx.mx" />
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <label className="label">Contraseña</label>
              <a href="#" onClick={e => { e.preventDefault(); onSwitch('forgot'); }} style={{ fontSize: 11, color: 'var(--accent)', textDecoration: 'none' }}>¿Olvidaste tu contraseña?</a>
            </div>
            <input className="input" type="password" placeholder="••••••••" defaultValue="password123" />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-3)' }}>
            <input type="checkbox" defaultChecked /> Recordarme en este dispositivo
          </label>
          <button className="btn btn-primary btn-lg" onClick={onAuth} style={{ marginTop: 4 }}>Entrar →</button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '14px 0', color: 'var(--text-5)', fontSize: 11 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border-1)' }} />
            <span>o continúa con</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border-1)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <button className="btn btn-outline btn-lg" style={{ fontWeight: 500 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 14, height: 14, background: '#fff', borderRadius: 2, display: 'inline-block' }} />
                Microsoft
              </span>
            </button>
            <button className="btn btn-outline btn-lg" style={{ fontWeight: 500 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 14, height: 14, background: 'linear-gradient(135deg,#4285f4,#34a853)', borderRadius: '50%', display: 'inline-block' }} />
                Google
              </span>
            </button>
          </div>

          <div style={{ marginTop: 18, fontSize: 12, color: 'var(--text-4)', textAlign: 'center' }}>
            ¿Eres proveedor? <a href="#" onClick={e => { e.preventDefault(); onSwitch('register'); }} style={{ color: 'var(--accent)', textDecoration: 'none' }}>Regístrate aquí</a>
          </div>
        </div>
      </div>
    </AuthShell>
  );
}

function RegisterView({ onSwitch, onAuth }) {
  return (
    <AuthShell>
      <div>
        <Pill tone="accent">Para proveedores</Pill>
        <h2 style={{ margin: '14px 0 0', fontSize: 24, fontWeight: 600, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Crea tu cuenta de proveedor</h2>
        <p style={{ margin: '6px 0 24px', fontSize: 13, color: 'var(--text-3)' }}>Tu cliente te invitó a unirte al portal. Toma menos de 3 minutos.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field label="Razón social" placeholder="Hardware y Componentes del Pacífico SA de CV" />
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 12 }}>
            <Field label="RFC" placeholder="XXX######XXX" mono />
            <Field label="Régimen fiscal" select options={['601 — General PM', '603 — No lucrativos', '612 — PF Empresariales']} />
          </div>
          <Field label="Correo del responsable" placeholder="contacto@empresa.mx" />
          <Field label="Contraseña" placeholder="Mínimo 8 caracteres" />

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'var(--text-3)' }}>
            <input type="checkbox" defaultChecked style={{ marginTop: 2 }} />
            Acepto los <a href="#" style={{ color: 'var(--accent)' }}>términos del portal</a> y la <a href="#" style={{ color: 'var(--accent)' }}>política de privacidad</a>.
          </label>

          <button className="btn btn-primary btn-lg" onClick={onAuth} style={{ marginTop: 4 }}>Crear cuenta y continuar</button>

          <div style={{ marginTop: 14, fontSize: 12, color: 'var(--text-4)', textAlign: 'center' }}>
            ¿Ya tienes cuenta? <a href="#" onClick={e => { e.preventDefault(); onSwitch('login'); }} style={{ color: 'var(--accent)', textDecoration: 'none' }}>Inicia sesión</a>
          </div>
        </div>
      </div>
    </AuthShell>
  );
}

function ForgotView({ onSwitch }) {
  const [sent, setSent] = React.useState(false);
  return (
    <AuthShell>
      <div>
        <button className="btn btn-ghost btn-sm" onClick={() => onSwitch('login')} style={{ marginBottom: 14, padding: 0 }}>
          <Icon name="arrowLeft" size={12} /> Volver al login
        </button>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Recupera tu contraseña</h2>
        <p style={{ margin: '6px 0 24px', fontSize: 13, color: 'var(--text-3)' }}>Te enviaremos un enlace de recuperación al correo registrado.</p>

        {!sent ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Field label="Correo" placeholder="tu@empresa.mx" />
            <button className="btn btn-primary btn-lg" onClick={() => setSent(true)}>Enviar enlace</button>
          </div>
        ) : (
          <div style={{ padding: 20, border: '1px solid rgba(52,211,153,0.3)', borderRadius: 10, background: 'var(--success-soft)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <Icon name="checkCircle" size={18} stroke="var(--success)" />
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-1)' }}>Correo enviado</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-3)', margin: 0 }}>Revisa tu bandeja de entrada. El enlace expira en 30 minutos.</p>
          </div>
        )}
      </div>
    </AuthShell>
  );
}

function AuthFlow({ onAuth }) {
  const [screen, setScreen] = React.useState('login');
  if (screen === 'register') return <RegisterView onSwitch={setScreen} onAuth={onAuth} />;
  if (screen === 'forgot') return <ForgotView onSwitch={setScreen} />;
  return <LoginView onSwitch={setScreen} onAuth={onAuth} />;
}

Object.assign(window, { AuthFlow });
