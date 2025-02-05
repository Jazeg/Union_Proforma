//components/NewProforma.jsx
import React, { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

export default function NewProforma() {
  const [items, setItems] = useState([{
    id: 1,
    unidad: 'UNIDADES',
    descripcion: '',
    cantidad: 1,
    vUnitario: 0,
    vVenta: 0
  }]);
  const [clientData, setClientData] = useState({
    documento: '',
    nombre: '',
    direccion: '',
    moneda: 'SOLES'
  });

  const handleAddItem = () => {
    setItems([...items, {
      id: items.length + 1,
      unidad: 'UNIDADES',
      descripcion: '',
      cantidad: 1,
      vUnitario: 0,
      vVenta: 0
    }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subtotal = items.reduce((acc, item) => acc + item.vVenta, 0);
    const igv = subtotal * 0.18;
    const total = subtotal + igv;

    try {
      await addDoc(collection(db, "proformas"), {
        ...clientData,
        items,
        subtotal,
        igv,
        total,
        fecha: new Date(),
        estado: 'PENDIENTE'
      });
    } catch (error) {
      console.error("Error al guardar proforma:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Nueva Proforma</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Documento Cliente
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={clientData.documento}
              onChange={(e) => setClientData({...clientData, documento: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre Cliente
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={clientData.nombre}
              onChange={(e) => setClientData({...clientData, nombre: e.target.value})}
            />
          </div>
        </div>

        <table className="w-full mb-6">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2 text-left">Unidad</th>
              <th className="p-2 text-left">Descripción</th>
              <th className="p-2 text-left">Cantidad</th>
              <th className="p-2 text-left">V. Unitario</th>
              <th className="p-2 text-left">V. Venta</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td className="p-2">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={item.unidad}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[index].unidad = e.target.value;
                      setItems(newItems);
                    }}
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={item.descripcion}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[index].descripcion = e.target.value;
                      setItems(newItems);
                    }}
                  />
                </td>
                {/* Continuar con los demás campos */}
              </tr>
            ))}
          </tbody>
        </table>

        <button
          type="button"
          onClick={handleAddItem}
          className="mb-6 bg-[#4361EE] text-white px-4 py-2 rounded"
        >
          Agregar Item
        </button>

        <button
          type="submit"
          className="bg-[#4361EE] text-white px-6 py-2 rounded"
        >
          Guardar Proforma
        </button>
      </form>
    </div>
  );
}