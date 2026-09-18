import React, { useMemo, useState, useEffect } from "react";
import { Heart, Search, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import { categories, products, JewelleryProduct } from "../lib/products";
import { Link, useRouter } from "../lib/router";
import { SafeImage } from "../components/SafeImage";
import { isWishlisted, toggleWishlist, WISHLIST_CHANGE_EVENT } from "../lib/wishlist";

export const ProductsView: React.FC = () => {
  const { path, navigate } = useRouter();

  // Read initial category from query string or default to All
  const initialCategory = useMemo(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      if (cat && categories.includes(cat)) return cat;
    }
    return "All";
  }, []);

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [selectedMetal, setSelectedMetal] = useState<string>("All");
  const [selectedPurity, setSelectedPurity] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "weight">("featured");
  const [wishlistMap, setWishlistMap] = useState<Record<string, boolean>>({});
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const updateWishlist = () => {
      const map: Record<string, boolean> = {};
      products.forEach((p) => {
        map[p.id] = isWishlisted(p.id);
      });
      setWishlistMap(map);
    };

    updateWishlist();
    window.addEventListener(WISHLIST_CHANGE_EVENT, updateWishlist);
    return () => window.removeEventListener(WISHLIST_CHANGE_EVENT, updateWishlist);
  }, []);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    const newUrl = cat === "All" ? "/products" : `/products?category=${cat}`;
    window.history.replaceState({}, "", newUrl);
  };

  const handleWishlistToggle = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(id);
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" ||
        product.category.toLowerCase() === activeCategory.toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()) ||
        product.gemstone.toLowerCase().includes(search.toLowerCase()) ||
        product.material.toLowerCase().includes(search.toLowerCase());

      const matchesMetal =
        selectedMetal === "All" || product.material.toLowerCase() === selectedMetal.toLowerCase();

      const matchesPurity =
        selectedPurity === "All" || product.purity === selectedPurity;

      return matchesCategory && matchesSearch && matchesMetal && matchesPurity;
    });

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "weight") {
      result.sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight));
    } else {
      // featured
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [activeCategory, search, selectedMetal, selectedPurity, sortBy]);

  return (
    <main className="min-h-screen bg-[#f8f5ef] px-6 pt-32 pb-20 lg:px-12 text-[#161513]">
      <div className="mx-auto max-w-[1500px]">
        {/* HEADER */}
        <div className="border-b border-black/10 pb-10">
          <p className="text-[10px] tracking-[0.3em] text-black/45 uppercase">
            AURELIA COLLECTION 2026
          </p>

          <h1 className="mt-4 font-serif text-5xl lg:text-7xl">
            {activeCategory === "All" ? "Fine Jewellery" : activeCategory}
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-black/55">
            Discover pieces crafted to celebrate life's most defining milestones. Hand-selected diamonds and BIS hallmarked gold sculpted with architectural purity.
          </p>
        </div>

        {/* FILTERS & SEARCH BAR */}
        <div className="flex flex-col gap-5 border-b border-black/10 py-7 lg:flex-row lg:items-center lg:justify-between">
          {/* Categories Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`whitespace-nowrap px-5 py-3 text-[10px] tracking-[0.18em] transition uppercase ${
                  activeCategory === category
                    ? "bg-[#171513] text-white"
                    : "border border-black/10 hover:bg-black hover:text-white bg-white/40"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search & Secondary Filter Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 border-b border-black/20 px-2 py-2 flex-1 sm:flex-initial">
              <Search size={17} strokeWidth={1.5} className="text-black/50" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search jewellery..."
                className="w-36 sm:w-48 bg-transparent text-xs sm:text-sm outline-none placeholder:text-black/35 font-normal"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-black/40 hover:text-black">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 border text-[10px] tracking-[0.18em] uppercase transition ${
                showFilters || selectedMetal !== "All" || selectedPurity !== "All"
                  ? "bg-[#161513] text-white border-[#161513]"
                  : "border-black/15 hover:border-black"
              }`}
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 border border-black/15 px-3 py-2 bg-white/30 text-xs">
              <ArrowUpDown size={13} className="text-black/40" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-[10px] tracking-[0.15em] uppercase outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="weight">Gross Weight</option>
              </select>
            </div>
          </div>
        </div>

        {/* Expandable Filter drawer */}
        {showFilters && (
          <div className="bg-[#f0ece2] border-b border-black/10 p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 transition duration-300">
            <div>
              <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-2 font-medium">
                Purity
              </label>
              <div className="flex gap-2">
                {["All", "18K", "22K"].map((purity) => (
                  <button
                    key={purity}
                    onClick={() => setSelectedPurity(purity)}
                    className={`px-3 py-1.5 text-xs border transition ${
                      selectedPurity === purity
                        ? "bg-[#161513] text-white border-[#161513]"
                        : "border-black/20 hover:border-black"
                    }`}
                  >
                    {purity}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-2 font-medium">
                Metal Color
              </label>
              <div className="flex flex-wrap gap-2">
                {["All", "Yellow Gold", "White Gold", "Rose Gold"].map((metal) => (
                  <button
                    key={metal}
                    onClick={() => setSelectedMetal(metal)}
                    className={`px-3 py-1.5 text-xs border transition ${
                      selectedMetal === metal
                        ? "bg-[#161513] text-white border-[#161513]"
                        : "border-black/20 hover:border-black"
                    }`}
                  >
                    {metal}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-end justify-end">
              <button
                onClick={() => {
                  setSelectedMetal("All");
                  setSelectedPurity("All");
                  setActiveCategory("All");
                  setSearch("");
                }}
                className="text-[9px] tracking-[0.2em] uppercase underline text-black/60 hover:text-black"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

        {/* PRODUCT COUNT & ACTIVE FILTERS BAR */}
        <div className="py-6 flex items-center justify-between text-xs tracking-[0.15em] text-black/50">
          <span>{filteredProducts.length} {filteredProducts.length === 1 ? "PIECE" : "PIECES"} AVAILABLE</span>
          {activeCategory !== "All" && (
            <span className="text-[10px] uppercase text-black/40">
              Showing {activeCategory}
            </span>
          )}
        </div>

        {/* EMPTY STATE */}
        {filteredProducts.length === 0 && (
          <div className="py-24 text-center border border-black/10 bg-white/20 p-8">
            <h3 className="font-serif text-3xl text-black/70">No jewellery matches your selection</h3>
            <p className="mt-3 text-xs text-black/50 max-w-md mx-auto">
              We couldn't find any pieces matching your current filters. Clear your filters or explore our full collection.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSelectedMetal("All");
                setSelectedPurity("All");
                setSearch("");
              }}
              className="mt-6 bg-[#161513] text-white px-7 py-3.5 text-[9px] tracking-[0.25em] uppercase hover:bg-[#292724]"
            >
              SHOW ALL PIECES
            </button>
          </div>
        )}

        {/* PRODUCTS GRID */}
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => {
            const isSaved = !!wishlistMap[product.id];
            return (
              <article key={product.id} className="group flex flex-col">
                <div className="relative aspect-square overflow-hidden bg-[#e8e2d7] border border-black/5">
                  <Link href={`/products/${product.id}`} className="block h-full w-full">
                    <SafeImage
                      src={product.images[0]}
                      productId={product.id}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </Link>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => handleWishlistToggle(e, product.id)}
                    className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:bg-white"
                    aria-label="Save to wishlist"
                  >
                    <Heart
                      size={16}
                      strokeWidth={1.4}
                      className={isSaved ? "fill-red-600 text-red-600" : "text-black/70"}
                    />
                  </button>

                  {/* Quick Hallmark Tag */}
                  <div className="absolute left-4 top-4 bg-[#161513]/85 text-white text-[7px] tracking-[0.15em] uppercase px-2 py-1 backdrop-blur-xs">
                    {product.purity} GOLD
                  </div>

                  <Link
                    href={`/products/${product.id}`}
                    className="absolute bottom-4 left-4 right-4 bg-black py-4 text-center text-xs tracking-[0.2em] text-white opacity-0 transition duration-300 group-hover:opacity-100 shadow-lg"
                  >
                    VIEW PIECE
                  </Link>
                </div>

                <div className="pt-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] tracking-[0.18em] text-black/50 uppercase font-medium">
                      {product.category} · {product.gemstone}
                    </p>

                    <div className="mt-2 flex items-baseline justify-between gap-4">
                      <h2 className="font-serif text-xl sm:text-2xl">
                        <Link href={`/products/${product.id}`} className="hover:underline">
                          {product.name}
                        </Link>
                      </h2>

                      <p className="text-sm font-medium whitespace-nowrap">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-black/45 border-t border-black/5 pt-2">
                    <span>{product.purity} {product.material}</span>
                    <span>Net Wt: {product.weight}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
};
