// components/ProformaPreview.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';
import ProformaPage from './ProformaPage';

// Ajusta este valor según el espacio disponible en la página
const ITEMS_PER_PAGE = 10;

export default function ProformaPreview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {};
  const { clientData, items, totals } = data || {};
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (items) {
      // Añadir índice original a cada item
      const itemsWithIndex = items.map((item, index) => ({
        ...item,
        originalIndex: index
      }));

      // Dividir items en páginas
      const paginatedItems = [];
      for (let i = 0; i < itemsWithIndex.length; i += ITEMS_PER_PAGE) {
        paginatedItems.push(itemsWithIndex.slice(i, i + ITEMS_PER_PAGE));
      }

      // Si no hay items, crear al menos una página
      if (paginatedItems.length === 0) {
        paginatedItems.push([]);
      }

      setPages(paginatedItems);
    }
  }, [items]);

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

      {/* Páginas */}
      <div className="p-8 print:p-0 flex flex-col items-center">
        {pages.map((pageItems, index) => (
          <ProformaPage
            key={index}
            items={pageItems}
            isFirstPage={index === 0}
            isLastPage={index === pages.length - 1}
            pageNumber={index + 1}
            totalPages={pages.length}
            clientData={clientData}
            totals={totals}
          />
        ))}
      </div>
    </div>
  );
}