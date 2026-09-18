import React, { useState, useEffect } from "react";
import { Search, X, ArrowUpRight } from "lucide-react";
import { products, categories } from "../lib/products";
import { useRouter } from "../lib/router";
import { SafeImage } from "./SafeImage";

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const { navigate } = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = products.filter((p) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.gemstone.toLowerCase().includes(q) ||
      p.purity.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-start bg-black/60 backdrop-blur-md transition-opacity">
      <div className="w-full bg-[#f8f5ef] border-b border-black/10 shadow-2xl">
        <div className="mx-auto max-w-[1200px] px-6 py-6 lg:px-12">
          <div className="flex items-center justify-between border-b border-black/15 pb-4">
            <div className="flex items-center gap-4 flex-1">
              <Search size={22} strokeWidth={1.2} className="text-black/60" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by jewellery piece, gemstone, gold purity..."
                className="w-full bg-transparent text-lg sm:text-xl font-serif text-[#161513] placeholder:text-black/30 outline-none"
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 text-black/50 hover:text-black transition"
              aria-label="Close search"
            >
              <X size={22} strokeWidth={1.2} />
            </button>
          </div>

          {/* Quick Categories */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 text-[9px] tracking-[0.2em] text-black/50">
            <span className="uppercase text-black/30 font-semibold mr-2">Curated:</span>
            {categories.slice(1).map((cat) => (
              <button
                key={cat}
                onClick={() => setQuery(cat)}
                className="px-3 py-1.5 border border-black/10 hover:border-black/40 hover:text-black transition uppercase whitespace-nowrap"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto px-6 py-6 lg:px-12 mx-auto max-w-[1200px]">
          {query.trim() && results.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-serif text-2xl text-black/60">No jewellery matching "{query}"</p>
              <p className="mt-2 text-xs text-black/40">Try searching for diamond, solitaire, bridal, 18K, or gold.</p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-6">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    navigate(`/products/${product.id}`);
                    onClose();
                  }}
                  className="group flex items-center gap-4 p-3 border border-black/10 hover:border-black/30 bg-[#f4f1ea] cursor-pointer transition"
                >
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden bg-[#e8e2d7]">
                    <SafeImage
                      src={product.images[0]}
                      productId={product.id}
                      alt={product.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[8px] tracking-[0.2em] text-black/40 uppercase">
                      {product.category} · {product.purity}
                    </p>
                    <h4 className="font-serif text-base truncate text-[#161513]">{product.name}</h4>
                    <p className="text-xs mt-1 text-black/70">₹{product.price.toLocaleString("en-IN")}</p>
                  </div>
                  <ArrowUpRight size={16} strokeWidth={1} className="text-black/30 group-hover:text-black transition" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-black/40 tracking-[0.15em] uppercase">
              Type to explore our bespoke fine jewellery atelier
            </div>
          )}
        </div>
      </div>
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};
