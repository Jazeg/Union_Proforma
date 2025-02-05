//components/Settings.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Settings() {
  const [settings, setSettings] = useState({
    nombreEmpresa: '',
    direccion: '',
    ruc: '',
    telefono: '',
    email: '',
    mensaje: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const docRef = doc(db, "settings", "empresa");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSettings(docSnap.data());
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "settings", "empresa"), settings);
      alert('Configuración guardada exitosamente');
    } catch (error) {
      console.error("Error al guardar configuración:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Configuración</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la Empresa
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={settings.nombreEmpresa}
              onChange={(e) => setSettings({...settings, nombreEmpresa: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dirección
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={settings.direccion}
              onChange={(e) => setSettings({...settings, direccion: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              RUC
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={settings.ruc}
              onChange={(e) => setSettings({...settings, ruc: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={settings.telefono}
              onChange={(e) => setSettings({...settings, telefono: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={settings.email}
              onChange={(e) => setSettings({...settings, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mensaje de la Empresa
            </label>
            <textarea
              className="w-full p-2 border rounded"
              rows="3"
              value={settings.mensaje}
              onChange={(e) => setSettings({...settings, mensaje: e.target.value})}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-[#4361EE] text-white px-6 py-2 rounded"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}