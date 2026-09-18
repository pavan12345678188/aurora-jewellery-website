import React from "react";
import { X, Check } from "lucide-react";

type SizeGuideModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: string) => void;
  currentSize?: string;
};

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectSize,
  currentSize = "7",
}) => {
  if (!isOpen) return null;

  const sizeChart = [
    { us: "5", indian: "9 - 10", diameterMm: "15.7 mm", circMm: "49.3 mm" },
    { us: "6", indian: "11 - 12", diameterMm: "16.5 mm", circMm: "51.8 mm" },
    { us: "7", indian: "13 - 14", diameterMm: "17.3 mm", circMm: "54.4 mm" },
    { us: "8", indian: "15 - 16", diameterMm: "18.1 mm", circMm: "56.9 mm" },
    { us: "9", indian: "17 - 18", diameterMm: "19.0 mm", circMm: "59.5 mm" },
    { us: "10", indian: "19 - 20", diameterMm: "19.8 mm", circMm: "62.1 mm" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl bg-[#f8f5ef] border border-black/15 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-black/15 pb-4">
          <div>
            <p className="text-[9px] tracking-[0.3em] text-black/40 uppercase">Aurelia Atelier</p>
            <h3 className="font-serif text-3xl mt-1 text-[#161513]">Ring Sizing Guide</h3>
          </div>
          <button onClick={onClose} className="p-1 text-black/40 hover:text-black">
            <X size={20} strokeWidth={1.2} />
          </button>
        </div>

        <p className="mt-4 text-xs leading-6 text-black/60">
          All Aurelia rings are crafted with an ergonomic comfort-fit band. If you are between two sizes, we recommend selecting the larger size.
        </p>

        {/* Table */}
        <div className="mt-6 overflow-x-auto border border-black/10 bg-[#f4f1ea]">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-black/10 bg-black/5 text-[9px] tracking-[0.2em] text-black/60 uppercase">
                <th className="p-3 font-medium">Standard (US)</th>
                <th className="p-3 font-medium">Indian Size</th>
                <th className="p-3 font-medium">Diameter</th>
                <th className="p-3 font-medium">Circumference</th>
                <th className="p-3 font-medium text-right">Select</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {sizeChart.map((row) => (
                <tr
                  key={row.us}
                  className={`hover:bg-black/5 transition cursor-pointer ${
                    currentSize === row.us ? "bg-black/[0.04]" : ""
                  }`}
                  onClick={() => {
                    if (onSelectSize) onSelectSize(row.us);
                  }}
                >
                  <td className="p-3 font-medium">{row.us}</td>
                  <td className="p-3 text-black/60">{row.indian}</td>
                  <td className="p-3 text-black/60">{row.diameterMm}</td>
                  <td className="p-3 text-black/60">{row.circMm}</td>
                  <td className="p-3 text-right">
                    {currentSize === row.us ? (
                      <span className="inline-flex items-center text-[9px] tracking-[0.1em] font-medium text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded">
                        <Check size={10} className="mr-1" /> ACTIVE
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectSize) onSelectSize(row.us);
                          onClose();
                        }}
                        className="text-[9px] tracking-[0.15em] underline text-black/50 hover:text-black"
                      >
                        CHOOSE
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measuring Tip */}
        <div className="mt-6 border border-black/10 p-4 bg-white/40">
          <h4 className="text-[10px] tracking-[0.2em] uppercase font-semibold text-black/70">
            How to measure at home
          </h4>
          <p className="mt-2 text-xs leading-5 text-black/50">
            Wrap a narrow strip of paper or thread around the base of your finger. Mark the point where the ends meet, measure the length against a ruler in millimeters, and match to the circumference column above.
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-[#161513] text-white py-3.5 text-[9px] tracking-[0.25em] hover:bg-[#292724] transition uppercase"
        >
          CONFIRM & CLOSE
        </button>
      </div>
    </div>
  );
};
