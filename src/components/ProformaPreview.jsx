// components/ProformaPreview.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';

export default function ProformaPreview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {};
  const { clientData, items, totals } = data || {};

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Botones flotantes */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 print:hidden z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center p-3 bg-white rounded-full shadow-lg text-gray-600 hover:text-gray-900 hover:shadow-xl transition-all"
          title="Volver"
        >
          <ArrowLeft size={24} />
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center justify-center p-3 bg-[#4361EE] rounded-full shadow-lg text-white hover:bg-[#3651D4] hover:shadow-xl transition-all"
          title="Imprimir"
        >
          <Printer size={24} />
        </button>
      </div>

      {/* Documento */}
      <div className="p-8 print:p-0">
        <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none p-8 min-h-[297mm] w-[210mm] relative">
          {/* Encabezado */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-start space-x-4">
              <img src="/logo_union.jpg" alt="Logo" className="h-16 w-auto" />
              <div>
                <h1 className="text-xl font-bold">VIDRIERÍA LA UNIÓN SAC</h1>
                <p className="text-sm">PRINCIPAL » JR. SANTA ROSA NRO. 855 -</p>
                <p className="text-sm">CAJAMARCA CHOTA CHOTA</p>
                <p className="text-sm italic">
                  Elegancia en cada cristal, innovación en cada detalle.
                </p>
                <p className="text-sm">Contáctenos: 976 579 430 / 962 070 138</p>
                <p className="text-sm">vidriosunion@hotmail.com</p>
              </div>
            </div>
            <div className="border-2 border-black p-4 text-center min-w-[200px]">
              <p className="font-bold text-gray-900">RUC 20602008470</p>
              <p className="font-bold text-gray-900 mt-2">PROFORMA</p>
              <p className="text-gray-900">0001-000001</p>
            </div>
          </div>

          {/* Datos del cliente */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <p>
                <span className="font-semibold">DOCUMENTO:</span> {clientData.tipoDoc} {clientData.documento}
              </p>
              <p>
                <span className="font-semibold">CLIENTE:</span> {clientData.nombre?.toUpperCase()}
              </p>
              <p>
                <span className="font-semibold">DIRECCIÓN:</span> {clientData.direccion?.toUpperCase()}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">FECHA EMISIÓN:</span> {clientData.fechaEmision}
              </p>
              <p>
                <span className="font-semibold">FECHA VENCIMIENTO:</span> {clientData.fechaVencimiento || '-'}
              </p>
              <p>
                <span className="font-semibold">MONEDA:</span> {clientData.moneda}
              </p>
            </div>
          </div>

          {/* Tabla con estilos actualizados y filas vacías para altura mínima */}
          <table className="w-full mb-8">
            <thead>
              <tr className="bg-black text-white text-sm">
                <th className="px-2 py-1 text-left w-12">Nº</th>
                <th className="px-2 py-1 text-left w-24">UNIDAD</th>
                <th className="px-2 py-1 text-left">DESCRIPCIÓN</th>
                <th className="px-2 py-1 text-right w-20">CANT.</th>
                <th className="px-2 py-1 text-right w-24">V. UNIT.</th>
                <th className="px-2 py-1 text-right w-24">V. VENTA</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {items.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="px-2 py-1">{index + 1}</td>
                  <td className="px-2 py-1">{item.unidad?.toUpperCase()}</td>
                  <td className="px-2 py-1 text-sm font-light leading-tight">
                    {item.descripcion?.toUpperCase()}
                  </td>
                  <td className="px-2 py-1 text-right">{item.cantidad.toFixed(2)}</td>
                  <td className="px-2 py-1 text-right">{item.vUnitario.toFixed(2)}</td>
                  <td className="px-2 py-1 text-right">{item.vVenta.toFixed(2)}</td>
                </tr>
              ))}
              {/* Filas vacías para mantener altura mínima */}
              {Array.from({ length: Math.max(0, 10 - items.length) }).map((_, index) => (
                <tr key={`empty-${index}`} className="border-b h-8">
                  <td className="px-2 py-1">&nbsp;</td>
                  <td className="px-2 py-1">&nbsp;</td>
                  <td className="px-2 py-1">&nbsp;</td>
                  <td className="px-2 py-1">&nbsp;</td>
                  <td className="px-2 py-1">&nbsp;</td>
                  <td className="px-2 py-1">&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer siempre al final */}
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex justify-end mb-8">
              <div className="w-64">
                <div className="flex justify-between py-1">
                  <span>GRAVADO</span>
                  <span>S/ {totals.gravado.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>I.G.V. 18%</span>
                  <span>S/ {totals.igv.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 font-bold border-t border-gray-200">
                  <span>TOTAL</span>
                  <span>S/ {totals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="text-sm space-y-1">
              <p>CONDICIÓN DE PAGO: {clientData.condicionPago?.toUpperCase()}</p>
              <p>
                CUENTAS BANCARIAS: BBVA: 0011-0648-0200081173 / CCI: 01164800020008117333
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
