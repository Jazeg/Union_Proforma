import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Printer } from "lucide-react";
import ProformaPage from "./ProformaPage";

const MAX_ITEM_HEIGHT = 550;
const LINE_HEIGHT = 20;

export default function ProformaPreview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {};
  const { clientData, items, totals } = data || {};
  const [pages, setPages] = useState([]);

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

  const handlePrint = () => {
    window.print();
  };

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white print:min-h-0">
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 print:hidden z-50">
        <button 
          onClick={() => navigate(-1)} 
          className="p-3 bg-white rounded-full shadow-lg text-gray-600 hover:text-gray-900 hover:shadow-xl"
        >
          <ArrowLeft size={24} />
        </button>
        <button 
          onClick={handlePrint} 
          className="p-3 bg-black rounded-full shadow-lg text-white hover:bg-gray-900 hover:shadow-xl"
        >
          <Printer size={24} />
        </button>
      </div>

      <div id="print-content" className="print-container w-[210mm] mx-auto">
        {pages.map((pageItems, index) => (
          <ProformaPage
            key={index}
            className="proforma-page"
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