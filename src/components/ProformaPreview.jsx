// components/ProformaPreview.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';
import ProformaPage from './ProformaPage';

const MAX_ITEM_HEIGHT = 400;
const LINE_HEIGHT = 12;

export default function ProformaPreview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {};
  const { clientData, items, totals } = data || {};
  const [pages, setPages] = useState([]);

  const handlePrint = () => {
    const printCSS = `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
        .page-break {
          page-break-after: always;
        }
        .page-break:last-child {
          page-break-after: auto;
        }
      }
    `;

    const style = document.createElement('style');
    style.textContent = printCSS;
    document.head.appendChild(style);

    window.print();

    document.head.removeChild(style);
  };

  useEffect(() => {
    if (items) {
      // Se agrega un índice y se estima la altura de cada item según la longitud de la descripción.
      const itemsWithIndex = items.map((item, index) => ({
        ...item,
        originalIndex: index,
        estimatedHeight: Math.ceil((item.descripcion?.length || 0) / 50) * LINE_HEIGHT
      }));

      const paginatedItems = [];
      let currentPage = [];
      let currentHeight = 0;

      itemsWithIndex.forEach((item) => {
        if (currentHeight + item.estimatedHeight > MAX_ITEM_HEIGHT) {
          paginatedItems.push(currentPage);
          currentPage = [item];
          currentHeight = item.estimatedHeight;
        } else {
          currentPage.push(item);
          currentHeight += item.estimatedHeight;
        }
      });

      if (currentPage.length > 0) {
        paginatedItems.push(currentPage);
      }

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
          onClick={handlePrint}
          className="flex items-center justify-center p-3 bg-[#4361EE] rounded-full shadow-lg text-white hover:bg-[#3651D4] hover:shadow-xl transition-all"
          title="Imprimir"
        >
          <Printer size={24} />
        </button>
      </div>

      {/* Contenedor principal para impresión */}
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
            // Se agrega clase para forzar el salto de página, excepto en la última página.
            className={index < pages.length - 1 ? 'page-break' : ''}
          />
        ))}
      </div>
    </div>
  );
}
