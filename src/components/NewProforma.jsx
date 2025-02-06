// components/NewProforma.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Printer, Eye, Plus, Save, Trash2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function NewProforma() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Inicialización de items usando localStorage
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("proformaItems");
    return savedItems
      ? JSON.parse(savedItems)
      : [
          {
            id: 1,
            unidad: "UNIDADES",
            descripcion: "",
            cantidad: 1,
            vUnitario: 0,
            vVenta: 0,
          },
        ];
  });

  // Inicialización de datos del cliente usando localStorage
  const [clientData, setClientData] = useState(() => {
    const savedClientData = localStorage.getItem("proformaClientData");
    return savedClientData
      ? JSON.parse(savedClientData)
      : {
          tipoDoc: "RUC",
          documento: "",
          nombre: "",
          direccion: "",
          moneda: "SOLES",
          fechaEmision: new Date().toISOString().split("T")[0],
          fechaVencimiento: "",
          condicionPago: "CONTADO",
        };
  });

  // Guardar en localStorage cada vez que se actualicen los items
  useEffect(() => {
    localStorage.setItem("proformaItems", JSON.stringify(items));
  }, [items]);

  // Guardar en localStorage cada vez que se actualicen los datos del cliente
  useEffect(() => {
    localStorage.setItem("proformaClientData", JSON.stringify(clientData));
  }, [clientData]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: items.length + 1,
        unidad: "UNIDADES",
        descripcion: "",
        cantidad: 1,
        vUnitario: 0,
        vVenta: 0,
      },
    ]);
  };

  const handleRemoveItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const calculateTotals = () => {
    const total = items.reduce(
      (acc, item) => acc + item.cantidad * item.vUnitario,
      0
    );
    const gravado = total / 1.18;
    const igv = total - gravado;
    return { total, gravado, igv };
  };

  const handlePreview = () => {
    navigate("/dashboard/preview", {
      state: {
        data: {
          clientData,
          items,
          totals: calculateTotals(),
        },
      },
    });
  };

  // Limpia el localStorage al guardar
  const handleSave = () => {
    localStorage.removeItem("proformaItems");
    localStorage.removeItem("proformaClientData");
    // Agregar aquí la lógica de guardado (por ejemplo, enviar los datos a un backend)
  };

  // Limpia el localStorage al cancelar
  const handleCancel = () => {
    localStorage.removeItem("proformaItems");
    localStorage.removeItem("proformaClientData");
    // Agregar aquí la lógica de cancelación (por ejemplo, redirigir a otra página)
  };

  return (
    <div className="max-w-[950px] mx-auto space-y-6">
      <Card className="bg-white shadow-md">
        <CardContent className="p-0">
          <div id="proforma-document" className="p-6">
            {/* Encabezado */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-start space-x-4">
                <img src="/logo_union.jpg" alt="Logo" className="h-16 w-auto" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    VIDRIERÍA LA UNIÓN SAC
                  </h1>
                  <p className="text-sm text-gray-600">
                    PRINCIPAL » JR. SANTA ROSA NRO. 855 -
                  </p>
                  <p className="text-sm text-gray-600">CAJAMARCA CHOTA CHOTA</p>
                  <p className="text-sm italic text-gray-600">
                    Elegancia en cada cristal, innovación en cada detalle.
                  </p>
                  <p className="text-sm text-gray-600">
                    Contáctenos: 976 579 430 / 962 070 138
                  </p>
                  <p className="text-sm text-gray-600">
                    vidriosunion@hotmail.com
                  </p>
                </div>
              </div>
              <div className="border-2 border-black p-4 text-center min-w-[200px]">
                <p className="font-bold text-gray-900">RUC 20602008470</p>
                <p className="font-bold text-gray-900 mt-2">PROFORMA</p>
                <p className="text-gray-900">0001-000001</p>
              </div>
            </div>

            {/* Formulario Cliente */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <select
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    value={clientData.tipoDoc}
                    onChange={(e) =>
                      setClientData({ ...clientData, tipoDoc: e.target.value })
                    }
                  >
                    <option value="RUC">RUC</option>
                    <option value="DNI">DNI</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Número de documento"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    value={clientData.documento}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        documento: e.target.value,
                      })
                    }
                  />
                </div>
                <input
                  type="text"
                  placeholder="Nombre/Razón Social"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  value={clientData.nombre}
                  onChange={(e) =>
                    setClientData({ ...clientData, nombre: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Dirección"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  value={clientData.direccion}
                  onChange={(e) =>
                    setClientData({ ...clientData, direccion: e.target.value })
                  }
                />
              </div>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="date"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    value={clientData.fechaEmision}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        fechaEmision: e.target.value,
                      })
                    }
                  />
                  <select
                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    value={clientData.moneda}
                    onChange={(e) =>
                      setClientData({ ...clientData, moneda: e.target.value })
                    }
                  >
                    <option value="SOLES">SOLES</option>
                    <option value="DOLARES">DÓLARES</option>
                  </select>
                </div>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  value={clientData.fechaVencimiento}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      fechaVencimiento: e.target.value,
                    })
                  }
                />
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  value={clientData.condicionPago}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      condicionPago: e.target.value,
                    })
                  }
                >
                  <option value="CONTADO">CONTADO</option>
                  <option value="CREDITO">CRÉDITO</option>
                </select>
              </div>
            </div>

            {/* Tabla Items */}
            <div className="mb-8">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 bg-gray-50 text-left text-sm font-semibold text-gray-900">
                      N°
                    </th>
                    <th className="px-4 py-2 bg-gray-50 text-left text-sm font-semibold text-gray-900">
                      UNIDAD
                    </th>
                    <th className="px-4 py-2 bg-gray-50 text-left text-sm font-semibold text-gray-900">
                      DESCRIPCIÓN
                    </th>
                    <th className="px-4 py-2 bg-gray-50 text-left text-sm font-semibold text-gray-900">
                      CANT.
                    </th>
                    <th className="px-4 py-2 bg-gray-50 text-left text-sm font-semibold text-gray-900">
                      V. UNIT.
                    </th>
                    <th className="px-4 py-2 bg-gray-50 text-left text-sm font-semibold text-gray-900">
                      V. VENTA
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="px-4 py-2 text-sm">{index + 1}</td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                          value={item.unidad}
                          onChange={(e) => {
                            const newItems = [...items];
                            newItems[index].unidad = e.target.value;
                            setItems(newItems);
                          }}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center">
                          <input
                            type="text"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                            value={item.descripcion}
                            onChange={(e) => {
                              const newItems = [...items];
                              newItems[index].descripcion = e.target.value;
                              setItems(newItems);
                            }}
                          />
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="ml-2 text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                          value={item.cantidad}
                          onChange={(e) => {
                            const newItems = [...items];
                            newItems[index].cantidad = Number(e.target.value);
                            newItems[index].vVenta =
                              Number(e.target.value) * item.vUnitario;
                            setItems(newItems);
                          }}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          step="0.01"
                          className="w-28 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                          value={item.vUnitario}
                          onChange={(e) => {
                            const newItems = [...items];
                            newItems[index].vUnitario = Number(e.target.value);
                            newItems[index].vVenta =
                              Number(e.target.value) * item.cantidad;
                            setItems(newItems);
                          }}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          className="w-28 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 bg-gray-50"
                          value={item.vVenta}
                          readOnly
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totales */}
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GRAVADO</span>
                  <span className="text-gray-900 font-medium">
                    S/ {calculateTotals().gravado.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">I.G.V. 18%</span>
                  <span className="text-gray-900 font-medium">
                    S/ {calculateTotals().igv.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>TOTAL</span>
                  <span>S/ {calculateTotals().total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Pie de página */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600 space-y-1">
                <div>CONDICIÓN DE PAGO: {clientData.condicionPago}</div>
                <div>
                  CUENTAS BANCARIAS: BBVA: 0011-0648-0200081173 / CCI:
                  01164800020008117333
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botones movidos abajo de la hoja */}
      <div className="flex justify-end space-x-4 pb-8">
        <button
          onClick={handleAddItem}
          className="flex items-center space-x-2 px-4 py-2 text-blue-600 bg-white rounded-lg border border-blue-200 hover:bg-blue-50"
        >
          <Plus size={18} />
          <span>Agregar Item</span>
        </button>
        <button
          onClick={handlePreview}
          className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50"
        >
          <Eye size={18} />
          <span>Vista Previa</span>
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center space-x-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <Printer size={18} />
          <span>Imprimir</span>
        </button>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          <Save size={18} />
          <span>Guardar</span>
        </button>
        <button
          onClick={handleCancel}
          className="flex items-center space-x-2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          <span>Cancelar</span>
        </button>
      </div>
    </div>
  );
}
