import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export default function ListProformas() {
  const [proformas, setProformas] = useState([]);

  useEffect(() => {
    const fetchProformas = async () => {
      const q = query(collection(db, "proformas"), orderBy("fecha", "desc"));
      const querySnapshot = await getDocs(q);
      setProformas(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    };
    fetchProformas();
  }, []);

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Proformas</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left">Fecha</th>
              <th className="p-3 text-left">Cliente</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proformas.map((proforma) => (
              <tr key={proforma.id} className="border-t">
                <td className="p-3">
                  {new Date(proforma.fecha.toDate()).toLocaleDateString()}
                </td>
                <td className="p-3">{proforma.nombre}</td>
                <td className="p-3">S/ {proforma.total.toFixed(2)}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    proforma.estado === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {proforma.estado}
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-[#4361EE] hover:underline">Ver PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}