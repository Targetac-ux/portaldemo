// PortalProv — Mock data for Mexican B2B context
const Data = (() => {
  const suppliers = [
    { id: 'SUP-2041', name: 'Tecnología Avanzada de México', razon: 'Tecnología Avanzada de México SA de CV', rfc: 'TAM150823A47', categoria: 'Hardware', estado: 'Activo', estadoTone: 'success', contacto: 'Comprador', email: 'mrodriguez@tecavanzada.mx', telefono: '+52 55 8412 3309', sede: 'Ciudad de México', spend: 2840000, ordenes: 48, score: 92, onboarding: 100 },
    { id: 'SUP-2052', name: 'Sistemas Empresariales del Norte', razon: 'Sistemas Empresariales del Norte SA de CV', rfc: 'SEN180412KZ2', categoria: 'Software', estado: 'Activo', estadoTone: 'success', contacto: 'Carlos Mendoza López', email: 'cmendoza@senorte.com.mx', telefono: '+52 81 2204 7781', sede: 'Monterrey, NL', spend: 1920000, ordenes: 31, score: 88, onboarding: 100 },
    { id: 'SUP-2068', name: 'Servicios Cloud Monterrey', razon: 'Servicios Cloud Monterrey SAPI de CV', rfc: 'SCM210304M19', categoria: 'Cloud / SaaS', estado: 'En revisión', estadoTone: 'warning', contacto: 'Ana Sofía Hernández', email: 'ahernandez@cloudmty.io', telefono: '+52 81 4490 1156', sede: 'San Pedro Garza García', spend: 0, ordenes: 0, score: 0, onboarding: 65 },
    { id: 'SUP-2074', name: 'Distribuidora Industrial Bajío', razon: 'Distribuidora Industrial Bajío SA de CV', rfc: 'DIB120816QW7', categoria: 'Suministros', estado: 'Activo', estadoTone: 'success', contacto: 'Roberto Domínguez Salinas', email: 'rdominguez@dibajio.mx', telefono: '+52 442 218 6633', sede: 'Querétaro, QRO', spend: 1240000, ordenes: 26, score: 81, onboarding: 100 },
    { id: 'SUP-2089', name: 'Hardware y Componentes del Pacífico', razon: 'Hardware y Componentes del Pacífico SA de CV', rfc: 'HCP190228P82', categoria: 'Hardware', estado: 'Activo', estadoTone: 'success', contacto: 'Vendedor', email: 'laguilar@hcpacifico.mx', telefono: '+52 33 3812 9904', sede: 'Guadalajara, JAL', spend: 3120000, ordenes: 54, score: 95, onboarding: 100 },
    { id: 'SUP-2091', name: 'Innovación Digital CDMX', razon: 'Innovación Digital CDMX SA de CV', rfc: 'IDC220515RT3', categoria: 'Consultoría', estado: 'Activo', estadoTone: 'success', contacto: 'Patricia Vázquez Torres', email: 'pvazquez@inndigital.mx', telefono: '+52 55 5219 8842', sede: 'Ciudad de México', spend: 685000, ordenes: 12, score: 76, onboarding: 100 },
    { id: 'SUP-2103', name: 'Cables y Conectores de Guadalajara', razon: 'Cables y Conectores de Guadalajara SA de CV', rfc: 'CCG140905LK1', categoria: 'Suministros', estado: 'Suspendido', estadoTone: 'danger', contacto: 'Javier Ortega Ramírez', email: 'jortega@cablesgdl.com', telefono: '+52 33 1670 4421', sede: 'Zapopan, JAL', spend: 198000, ordenes: 4, score: 42, onboarding: 100 },
    { id: 'SUP-2117', name: 'Logística Express Querétaro', razon: 'Logística Express Querétaro SC', rfc: 'LEQ170911HG6', categoria: 'Logística', estado: 'Activo', estadoTone: 'success', contacto: 'Sandra Beltrán Cortés', email: 'sbeltran@logexq.mx', telefono: '+52 442 156 7720', sede: 'El Marqués, QRO', spend: 540000, ordenes: 19, score: 84, onboarding: 100 },
    { id: 'SUP-2125', name: 'Redes y Telecomunicaciones BC', razon: 'Redes y Telecomunicaciones BC SA de CV', rfc: 'RTB201207YJ4', categoria: 'Telecom', estado: 'En revisión', estadoTone: 'warning', contacto: 'Andrés Castañeda Ruiz', email: 'acastaneda@redestbc.mx', telefono: '+52 664 380 1109', sede: 'Tijuana, BC', spend: 0, ordenes: 0, score: 0, onboarding: 40 },
  ];

  const purchaseOrders = [
    { id: 'OC-2026-00481', supplier: 'Hardware y Componentes del Pacífico', monto: 248640.00, fecha: '23 may 2026', entrega: '04 jun 2026', estado: 'Aprobada', tone: 'success', items: 6, owner: 'Comprador' },
    { id: 'OC-2026-00478', supplier: 'Tecnología Avanzada de México', monto: 124350.50, fecha: '22 may 2026', entrega: '02 jun 2026', estado: 'En tránsito', tone: 'info', items: 3, owner: 'Carlos Mendoza' },
    { id: 'OC-2026-00475', supplier: 'Sistemas Empresariales del Norte', monto: 89400.00, fecha: '20 may 2026', entrega: '30 may 2026', estado: 'Recibida', tone: 'accent', items: 2, owner: 'Patricia Vázquez' },
    { id: 'OC-2026-00472', supplier: 'Distribuidora Industrial Bajío', monto: 56720.80, fecha: '19 may 2026', entrega: '28 may 2026', estado: 'Pendiente', tone: 'warning', items: 8, owner: 'Roberto Domínguez' },
    { id: 'OC-2026-00468', supplier: 'Logística Express Querétaro', monto: 32900.00, fecha: '18 may 2026', entrega: '24 may 2026', estado: 'Recibida', tone: 'accent', items: 1, owner: 'Sandra Beltrán' },
    { id: 'OC-2026-00464', supplier: 'Innovación Digital CDMX', monto: 168000.00, fecha: '15 may 2026', entrega: '01 jul 2026', estado: 'Aprobada', tone: 'success', items: 4, owner: 'Ana S. Hernández' },
    { id: 'OC-2026-00459', supplier: 'Hardware y Componentes del Pacífico', monto: 78420.00, fecha: '12 may 2026', entrega: '22 may 2026', estado: 'Cerrada', tone: 'neutral', items: 5, owner: 'Comprador' },
    { id: 'OC-2026-00453', supplier: 'Tecnología Avanzada de México', monto: 412300.00, fecha: '08 may 2026', entrega: '20 may 2026', estado: 'Cerrada', tone: 'neutral', items: 11, owner: 'Carlos Mendoza' },
  ];

  const invoices = [
    { id: 'FAC-A-1184', uuid: '7F8A2C9D-44B1-4E10-9D52-2B91E8C3A047', supplier: 'Hardware y Componentes del Pacífico', rfc: 'HCP190228P82', oc: 'OC-2026-00481', subtotal: 214344.83, iva: 34295.17, total: 248640.00, fecha: '24 may 2026', vencimiento: '23 jun 2026', estado: 'En aprobación', tone: 'warning' },
    { id: 'FAC-A-1183', uuid: '3D29B81E-A4C1-4FD7-91B0-5E18C2A4F099', supplier: 'Tecnología Avanzada de México', rfc: 'TAM150823A47', oc: 'OC-2026-00478', subtotal: 107198.71, iva: 17151.79, total: 124350.50, fecha: '23 may 2026', vencimiento: '22 jun 2026', estado: 'Aprobada', tone: 'success' },
    { id: 'FAC-A-1181', uuid: 'B14C7E22-9D02-4810-A2C4-7F09E1B5D374', supplier: 'Sistemas Empresariales del Norte', rfc: 'SEN180412KZ2', oc: 'OC-2026-00475', subtotal: 77068.97, iva: 12331.03, total: 89400.00, fecha: '21 may 2026', vencimiento: '20 jun 2026', estado: 'Pagada', tone: 'accent' },
    { id: 'FAC-A-1178', uuid: '5A02C7D8-B41E-49F1-882A-3C09E1B4F207', supplier: 'Distribuidora Industrial Bajío', rfc: 'DIB120816QW7', oc: 'OC-2026-00472', subtotal: 48897.24, iva: 7823.56, total: 56720.80, fecha: '20 may 2026', vencimiento: '19 jun 2026', estado: 'Rechazada', tone: 'danger' },
    { id: 'FAC-A-1175', uuid: '9E81F302-7AC4-4B19-A0D1-3F092B1C8E40', supplier: 'Innovación Digital CDMX', rfc: 'IDC220515RT3', oc: 'OC-2026-00464', subtotal: 144827.59, iva: 23172.41, total: 168000.00, fecha: '18 may 2026', vencimiento: '17 jun 2026', estado: 'En aprobación', tone: 'warning' },
    { id: 'FAC-A-1170', uuid: 'C2E9A07B-1F40-4C82-9D11-7E81B5C3A209', supplier: 'Logística Express Querétaro', rfc: 'LEQ170911HG6', oc: 'OC-2026-00468', subtotal: 28362.07, iva: 4537.93, total: 32900.00, fecha: '17 may 2026', vencimiento: '16 jun 2026', estado: 'Pagada', tone: 'accent' },
  ];

  const rfqs = [
    { id: 'RFQ-026-118', titulo: 'Switches gestionados 48 puertos PoE', invitados: 5, respuestas: 4, cierre: '03 jun 2026', estado: 'Abierta', tone: 'info', owner: 'Carlos Mendoza' },
    { id: 'RFQ-026-117', titulo: 'Renovación licencias Microsoft 365 E3', invitados: 3, respuestas: 3, cierre: '01 jun 2026', estado: 'En evaluación', tone: 'accent', owner: 'Ana S. Hernández' },
    { id: 'RFQ-026-114', titulo: 'Suministro de servidores rack 2U', invitados: 6, respuestas: 5, cierre: '28 may 2026', estado: 'En evaluación', tone: 'accent', owner: 'Comprador' },
    { id: 'RFQ-026-111', titulo: 'Servicio de cableado estructurado planta MTY', invitados: 4, respuestas: 4, cierre: '25 may 2026', estado: 'Adjudicada', tone: 'success', owner: 'Patricia Vázquez' },
    { id: 'RFQ-026-108', titulo: 'Mantenimiento UPS data center CDMX', invitados: 5, respuestas: 2, cierre: '22 may 2026', estado: 'Cerrada', tone: 'neutral', owner: 'Roberto Domínguez' },
  ];

  const rfqQuotes = [
    { supplier: 'Hardware y Componentes del Pacífico', precio: 234560.00, entrega: '12 días', garantia: '36 meses', pago: '30 días', score: 92, recomendado: true },
    { supplier: 'Tecnología Avanzada de México', precio: 248900.00, entrega: '15 días', garantia: '24 meses', pago: '30 días', score: 86, recomendado: false },
    { supplier: 'Sistemas Empresariales del Norte', precio: 251200.00, entrega: '10 días', garantia: '36 meses', pago: '45 días', score: 84, recomendado: false },
    { supplier: 'Redes y Telecomunicaciones BC', precio: 268400.00, entrega: '18 días', garantia: '24 meses', pago: '60 días', score: 71, recomendado: false },
  ];

  const activity = [
    { tipo: 'invoice', who: 'Comprador', what: 'aprobó la factura', target: 'FAC-A-1183', when: 'hace 12 min', tone: 'success' },
    { tipo: 'po', who: 'Carlos Mendoza', what: 'creó la orden', target: 'OC-2026-00481', when: 'hace 38 min', tone: 'info' },
    { tipo: 'supplier', who: 'Servicios Cloud Monterrey', what: 'subió documentación tributaria', target: '', when: 'hace 1 h', tone: 'accent' },
    { tipo: 'rfq', who: 'Ana S. Hernández', what: 'recibió 3 cotizaciones para', target: 'RFQ-026-117', when: 'hace 2 h', tone: 'purple' },
    { tipo: 'invoice', who: 'Distribuidora Industrial Bajío', what: 'subió la factura', target: 'FAC-A-1178', when: 'hace 4 h', tone: 'warning' },
    { tipo: 'po', who: 'Patricia Vázquez', what: 'cerró la orden', target: 'OC-2026-00459', when: 'ayer', tone: 'neutral' },
  ];

  const supplierInvoices = [
    { id: 'FAC-A-1184', cliente: 'Grupo Inmobiliario CDMX', total: 248640.00, fecha: '24 may 2026', estado: 'En aprobación', tone: 'warning', pago: '23 jun 2026' },
    { id: 'FAC-A-1180', cliente: 'Grupo Inmobiliario CDMX', total: 184320.00, fecha: '22 may 2026', estado: 'Aprobada', tone: 'success', pago: '21 jun 2026' },
    { id: 'FAC-A-1177', cliente: 'Grupo Inmobiliario CDMX', total: 56720.80, fecha: '19 may 2026', estado: 'Pagada', tone: 'accent', pago: 'Pagada 24 may' },
    { id: 'FAC-A-1172', cliente: 'Grupo Inmobiliario CDMX', total: 92400.00, fecha: '15 may 2026', estado: 'Pagada', tone: 'accent', pago: 'Pagada 18 may' },
  ];

  // Sparkline / chart data (synthetic but plausible)
  const spendByMonth = [
    { m: 'Dic', v: 4.2 }, { m: 'Ene', v: 5.1 }, { m: 'Feb', v: 4.8 },
    { m: 'Mar', v: 6.2 }, { m: 'Abr', v: 7.4 }, { m: 'May', v: 8.6 },
  ];
  const spendByCategory = [
    { name: 'Hardware', value: 38, color: '#38bdf8' },
    { name: 'Software', value: 24, color: '#a78bfa' },
    { name: 'Servicios', value: 18, color: '#34d399' },
    { name: 'Logística', value: 11, color: '#fbbf24' },
    { name: 'Otros', value: 9, color: '#64748b' },
  ];

  const fmtMXN = (n) => '$' + n.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' MXN';
  const fmtMXNshort = (n) => '$' + n.toLocaleString('es-MX', { maximumFractionDigits: 0 });

  return { suppliers, purchaseOrders, invoices, rfqs, rfqQuotes, activity, supplierInvoices, spendByMonth, spendByCategory, fmtMXN, fmtMXNshort };
})();

window.Data = Data;
