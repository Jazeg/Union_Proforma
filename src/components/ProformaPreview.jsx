import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Printer } from "lucide-react";
import ProformaPage from "./ProformaPage";
import { useReactToPrint } from "react-to-print";

const MAX_ITEM_HEIGHT = 400;
const LINE_HEIGHT = 12;

export default function ProformaPreview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {};
  const { clientData, items, totals } = data || {};
  const [pages, setPages] = useState([]);
  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Proforma',
    onBeforeGetContent: () => {
      document.body.classList.add('printing');
      return Promise.resolve();
    },
    onAfterPrint: () => {
      document.body.classList.remove('printing');
    },
    removeAfterPrint: true
  });

  // Paginación de items
  useEffect(() => {
    if (!items) return;
    
    const itemsWithIndex = items.map((item, index) => ({
      ...item,
      originalIndex: index,
      estimatedHeight: Math.ceil((item.descripcion?.length || 0) / 50) * LINE_HEIGHT,
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

    setPages(paginatedItems.length ? paginatedItems : [[]]);
  }, [items]);

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 print:hidden z-50">
        <button
          onClick={() => navigate(-1)}
          className="p-3 bg-white rounded-full shadow-lg text-gray-600 hover:text-gray-900 hover:shadow-xl"
          title="Volver"
        >
          <ArrowLeft size={24} />
        </button>
        <button
          onClick={handlePrint}
          className="p-3 bg-[#4361EE] rounded-full shadow-lg text-white hover:bg-[#3651D4] hover:shadow-xl"
          title="Imprimir"
        >
          <Printer size={24} />
        </button>
      </div>
  
      <div 
        ref={printRef} 
        className="print-container max-w-[210mm] mx-auto p-8 print:p-0 print:max-w-none"
      >
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
            className="proforma-page print:mb-0"
          />
        ))}
      </div>
    </div>
  );
}