import React, { useEffect, useState } from "react";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { products, JewelleryProduct } from "../lib/products";
import { getWishlist, toggleWishlist, WISHLIST_CHANGE_EVENT } from "../lib/wishlist";
import { addToCart } from "../lib/cart";
import { Link, useRouter } from "../lib/router";
import { SafeImage } from "../components/SafeImage";

export const WishlistView: React.FC = () => {
  const { navigate } = useRouter();
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [addedId, setAddedId] = useState<string | null>(null);

  const refreshWishlist = () => {
    setSavedIds(getWishlist());
  };

  useEffect(() => {
    refreshWishlist();
    window.addEventListener(WISHLIST_CHANGE_EVENT, refreshWishlist);
    return () => window.removeEventListener(WISHLIST_CHANGE_EVENT, refreshWishlist);
  }, []);

  const savedProducts = products.filter((p) => savedIds.includes(p.id));

  const handleMoveToBag = (product: JewelleryProduct) => {
    addToCart({
      product,
      quantity: 1,
      metal: product.material,
      size: product.category === "Rings" ? "7" : undefined,
    });
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#161513] pt-32 pb-24 px-6 lg:px-12">
      <div className="mx-auto max-w-[1500px]">
        {/* HEADER */}
        <div className="border-b border-black/10 pb-8">
          <p className="text-[10px] tracking-[0.3em] text-black/40 uppercase font-medium">
            PERSONAL ATELIER CURATION
          </p>
          <h1 className="mt-3 font-serif text-5xl lg:text-6xl">
            Saved Pieces
          </h1>
          <p className="mt-4 text-xs text-black/50">
            {savedProducts.length} {savedProducts.length === 1 ? "piece" : "pieces"} saved in your private wishlist
          </p>
        </div>

        {/* EMPTY STATE */}
        {savedProducts.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-black/15 bg-white/20 mt-10 p-8">
            <Heart size={36} strokeWidth={1} className="mx-auto text-black/30" />
            <h2 className="mt-6 font-serif text-3xl">No pieces saved yet</h2>
            <p className="mt-3 text-xs text-black/50 max-w-sm mx-auto">
              Click the heart icon on any fine jewellery piece to keep it in your personal wishlist.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex bg-[#161513] text-white px-8 py-4 text-[9px] tracking-[0.25em] uppercase hover:bg-[#292724] transition shadow-md"
            >
              EXPLORE COLLECTION
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {savedProducts.map((product) => (
              <div
                key={product.id}
                className="border border-black/10 bg-white/40 p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square overflow-hidden bg-[#e8e2d7] border border-black/5">
                    <Link href={`/products/${product.id}`} className="block h-full w-full">
                      <SafeImage
                        src={product.images[0]}
                        productId={product.id}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-700 hover:scale-105"
                      />
                    </Link>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 flex items-center justify-center text-red-600 shadow-sm hover:bg-white transition"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={15} strokeWidth={1.2} />
                    </button>

                    <div className="absolute left-3 top-3 bg-[#161513]/85 text-white text-[7px] tracking-[0.15em] uppercase px-2 py-1">
                      {product.purity} GOLD
                    </div>
                  </div>

                  <div className="pt-4">
                    <p className="text-[8px] tracking-[0.2em] text-black/40 uppercase">
                      {product.category} · {product.gemstone}
                    </p>
                    <h3 className="font-serif text-xl mt-1">
                      <Link href={`/products/${product.id}`} className="hover:underline">
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-sm font-medium mt-1">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-black/10 flex items-center gap-3">
                  <button
                    onClick={() => handleMoveToBag(product)}
                    className="flex-1 bg-[#161513] text-white py-3 text-[9px] tracking-[0.2em] uppercase hover:bg-[#292724] transition shadow-xs"
                  >
                    {addedId === product.id ? "✓ ADDED TO BAG" : "ADD TO BAG"}
                  </button>

                  <Link
                    href={`/products/${product.id}`}
                    className="border border-black/20 px-3 py-3 text-[9px] tracking-[0.15em] uppercase hover:border-black transition"
                  >
                    VIEW
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
