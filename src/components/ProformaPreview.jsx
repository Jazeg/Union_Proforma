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
    <div className="min-h-screen bg-gray-100">
      {/* Barra superior */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10 print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Volver</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Printer size={20} />
            <span>Imprimir</span>
          </button>
        </div>
      </div>

      {/* Documento */}
      <div className="pt-16 pb-8 px-4 print:p-0">
        <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none p-8">
          {/* Encabezado */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-start space-x-4">
              <img src="/logo_union.jpg" alt="Logo" className="h-16 w-auto" />
              <div>
                <h1 className="text-xl font-bold">VIDRIERÍA LA UNIÓN SAC</h1>
                <p className="text-sm">PRINCIPAL » JR. SANTA ROSA NRO. 855 -</p>
                <p className="text-sm">CAJAMARCA CHOTA CHOTA</p>
                <p className="text-sm italic">Elegancia en cada cristal, innovación en cada detalle.</p>
                <p className="text-sm">Contáctenos: 976 579 430 / 962 070 138</p>
                <p className="text-sm">vidriosunion@hotmail.com</p>
              </div>
            </div>
            <div className="border-2 border-black p-4 text-center min-w-[200px]">
              <p className="font-bold">RUC 20602008470</p>
              <p className="font-bold mt-2">PROFORMA</p>
              <p>0001-000001</p>
            </div>
          </div>

          {/* Datos del cliente */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <p><span className="font-semibold">DOCUMENTO:</span> {clientData.tipoDoc} {clientData.documento}</p>
              <p><span className="font-semibold">CLIENTE:</span> {clientData.nombre}</p>
              <p><span className="font-semibold">DIRECCIÓN:</span> {clientData.direccion}</p>
            </div>
            <div>
              <p><span className="font-semibold">FECHA EMISIÓN:</span> {clientData.fechaEmision}</p>
              <p><span className="font-semibold">FECHA VENCIMIENTO:</span> {clientData.fechaVencimiento || '-'}</p>
              <p><span className="font-semibold">MONEDA:</span> {clientData.moneda}</p>
            </div>
          </div>

          {/* Tabla */}
          <table className="w-full mb-8">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">N°</th>
                <th className="px-4 py-2 text-left">UNIDAD</th>
                <th className="px-4 py-2 text-left">DESCRIPCIÓN</th>
                <th className="px-4 py-2 text-right">CANT.</th>
                <th className="px-4 py-2 text-right">V. UNIT.</th>
                <th className="px-4 py-2 text-right">V. VENTA</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.unidad}</td>
                  <td className="px-4 py-2">{item.descripcion}</td>
                  <td className="px-4 py-2 text-right">{item.cantidad.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">{item.vUnitario.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">{item.vVenta.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totales */}
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
              <div className="flex justify-between py-1 font-bold border-t">
                <span>TOTAL</span>
                <span>S/ {totals.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Pie de página */}
          <div className="text-sm">
            <p>CONDICIÓN DE PAGO: {clientData.condicionPago}</p>
            <p>CUENTAS BANCARIAS: BBVA: 0011-0648-0200081173 / CCI: 01164800020008117333</p>
          </div>
        </div>
      </div>
    </div>
  );
}