import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RotateCcw,
  ZoomIn,
  Check,
  Award,
  Sparkles
} from "lucide-react";
import { products, getProductFallbackImage, JewelleryProduct } from "../lib/products";
import { addToCart } from "../lib/cart";
import { isWishlisted, toggleWishlist, WISHLIST_CHANGE_EVENT } from "../lib/wishlist";
import { Link, useRouter } from "../lib/router";
import { SafeImage } from "../components/SafeImage";
import { SizeGuideModal } from "../components/SizeGuideModal";

type ProductDetailViewProps = {
  productId: string;
};

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ productId }) => {
  const { navigate } = useRouter();
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f2eb] px-6 text-[#171614] pt-28">
        <div className="text-center max-w-md">
          <p className="text-[9px] tracking-[0.35em] text-black/40 uppercase">AURELIA FINE JEWELLERY</p>
          <h1 className="mt-5 font-serif text-5xl">Piece not found</h1>
          <p className="mt-4 text-xs text-black/50 leading-6">
            The requested jewellery piece may have been retired or moved to our private high-jewellery archives.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex bg-[#171614] px-8 py-4 text-[9px] tracking-[0.25em] text-white uppercase hover:bg-[#292724] transition"
          >
            RETURN TO COLLECTION
          </Link>
        </div>
      </main>
    );
  }

  return <ProductExperience product={product} />;
};

function ProductExperience({ product }: { product: JewelleryProduct }) {
  const { navigate } = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedMetal, setSelectedMetal] = useState(product.material);
  const [selectedSize, setSelectedSize] = useState("7");
  const [wishlist, setWishlist] = useState(false);
  const [added, setAdded] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [openInfo, setOpenInfo] = useState<string | null>("details");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  useEffect(() => {
    setWishlist(isWishlisted(product.id));
    const handleWishlistChange = () => {
      setWishlist(isWishlisted(product.id));
    };
    window.addEventListener(WISHLIST_CHANGE_EVENT, handleWishlistChange);
    return () => window.removeEventListener(WISHLIST_CHANGE_EVENT, handleWishlistChange);
  }, [product.id]);

  // Ensure 3 views for the gallery
  const gallery = [
    product.images[0],
    product.images[1] || getProductFallbackImage(product.id, 1),
    product.images[2] || getProductFallbackImage(product.id, 2),
  ];

  const handleAddToBag = () => {
    addToCart({
      product,
      quantity,
      size: product.category === "Rings" ? selectedSize : undefined,
      metal: selectedMetal,
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2400);
  };

  const handleBuyNow = () => {
    addToCart({
      product,
      quantity,
      size: product.category === "Rings" ? selectedSize : undefined,
      metal: selectedMetal,
    });
    navigate("/checkout");
  };

  const handleWishlistToggle = () => {
    const updated = toggleWishlist(product.id);
    setWishlist(updated);
  };

  const relatedProducts = products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .concat(products.filter((item) => item.id !== product.id))
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#f5f2eb] text-[#171614] pt-28 pb-20">
      {/* BREADCRUMB & BACK */}
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 mb-6">
        <Link
          href="/products"
          className="group inline-flex items-center gap-2 text-[9px] tracking-[0.25em] text-black/50 hover:text-black uppercase transition"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          <span>BACK TO COLLECTION</span>
        </Link>
      </div>

      {/* =====================================================
          PRODUCT DETAILS GRID
      ====================================================== */}
      <section className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(400px,0.85fr)] lg:gap-16 xl:gap-20">
          {/* IMAGE GALLERY */}
          <div>
            <div className="relative overflow-hidden bg-[#e8e1d5] border border-black/5">
              <button
                type="button"
                onClick={() => setZoom(true)}
                className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-sm hover:bg-white transition"
                aria-label="Zoom image"
              >
                <ZoomIn size={17} strokeWidth={1.2} />
              </button>

              <div className="cursor-zoom-in" onClick={() => setZoom(true)}>
                <SafeImage
                  src={gallery[activeImage]}
                  productId={product.id}
                  fallbackIndex={activeImage}
                  alt={product.name}
                  className="aspect-square w-full object-cover transition duration-700 hover:scale-102"
                />
              </div>

              {/* Purity Hallmark Tag */}
              <div className="absolute left-5 bottom-5 bg-[#161513]/85 text-white px-3 py-1.5 text-[8px] tracking-[0.2em] uppercase backdrop-blur-xs flex items-center gap-1.5">
                <Award size={12} className="text-amber-400" />
                <span>{product.purity} BIS HALLMARK</span>
              </div>
            </div>

            {/* THUMBNAILS */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {gallery.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`overflow-hidden bg-[#e8e1d5] border transition ${
                    activeImage === index
                      ? "border-[#171614] ring-1 ring-black"
                      : "border-black/10 opacity-70 hover:opacity-100"
                  }`}
                >
                  <SafeImage
                    src={image}
                    productId={product.id}
                    fallbackIndex={index}
                    alt={`${product.name} view ${index + 1}`}
                    className="aspect-square w-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* IMAGE NOTE */}
            <div className="mt-4 flex items-center justify-between text-xs text-black/50">
              <p className="text-[8px] tracking-[0.22em] uppercase">
                PRODUCT PERSPECTIVE {activeImage + 1} / {gallery.length}
              </p>

              <button
                type="button"
                onClick={() => setZoom(true)}
                className="text-[8px] tracking-[0.22em] underline underline-offset-4 uppercase hover:text-black"
              >
                EXPAND FULLSCREEN VIEW
              </button>
            </div>
          </div>

          {/* PRODUCT SPECIFICATION & ACTIONS */}
          <div className="lg:sticky lg:top-[120px] lg:h-fit">
            <div className="flex items-center justify-between">
              <p className="text-[9px] tracking-[0.35em] text-black/50 uppercase font-medium">
                {product.category} · {product.collectionName || "AURELIA FINE LINE"}
              </p>
              <span className="text-[9px] tracking-[0.2em] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 uppercase">
                IN STOCK · HANDCRAFTED
              </span>
            </div>

            <h1 className="mt-4 max-w-xl font-serif text-[42px] leading-[0.94] sm:text-[54px] lg:text-[62px]">
              {product.name}
            </h1>

            <div className="mt-5 flex items-center justify-between">
              <div>
                <p className="text-2xl sm:text-3xl font-serif">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
                <p className="text-[10px] text-black/45 mt-0.5 tracking-wider">
                  Inclusive of all taxes & complimentary insured delivery
                </p>
              </div>

              <button
                type="button"
                onClick={handleWishlistToggle}
                className="flex items-center gap-2 border border-black/15 px-3 py-2 text-[8px] tracking-[0.2em] uppercase hover:border-black transition"
              >
                <Heart
                  size={16}
                  strokeWidth={1.2}
                  className={wishlist ? "fill-red-600 text-red-600" : "text-black/70"}
                />
                <span>{wishlist ? "SAVED" : "WISHLIST"}</span>
              </button>
            </div>

            <div className="my-6 h-px bg-black/10" />

            {/* DESCRIPTION */}
            <p className="max-w-xl text-xs sm:text-sm leading-7 text-black/65">
              {product.description}
            </p>

            {/* METAL PICKER */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <span className="text-[9px] tracking-[0.25em] uppercase font-medium">
                  SELECT METAL & PURITY
                </span>
                <span className="text-xs text-black/50 font-medium">
                  {selectedMetal} ({product.purity})
                </span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2.5">
                {["Yellow Gold", "White Gold", "Rose Gold"].map((metal) => (
                  <button
                    key={metal}
                    type="button"
                    onClick={() => setSelectedMetal(metal)}
                    className={`border px-3 py-3 text-[8px] tracking-[0.1em] uppercase transition font-medium ${
                      selectedMetal === metal
                        ? "border-[#171614] bg-[#171614] text-white"
                        : "border-black/15 bg-white/40 hover:border-black/50 text-[#171614]"
                    }`}
                  >
                    {metal}
                  </button>
                ))}
              </div>
            </div>

            {/* RING SIZE PICKER (If category is Rings) */}
            {product.category === "Rings" && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] tracking-[0.25em] uppercase font-medium">
                    STANDARD RING SIZE
                  </span>

                  <button
                    type="button"
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-[8px] tracking-[0.15em] underline underline-offset-4 uppercase text-black/60 hover:text-black"
                  >
                    VIEW SIZE GUIDE
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-6 gap-2">
                  {["5", "6", "7", "8", "9", "10"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 border text-xs font-medium transition ${
                        selectedSize === size
                          ? "border-[#171614] bg-[#171614] text-white"
                          : "border-black/15 bg-white/40 hover:border-black/40"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY & ACTIONS */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center border border-black/20 bg-white/40 w-fit">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-12 w-12 items-center justify-center hover:bg-black/5 transition"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} strokeWidth={1.2} />
                </button>

                <span className="flex h-12 w-12 items-center justify-center text-sm font-medium">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-12 w-12 items-center justify-center hover:bg-black/5 transition"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} strokeWidth={1.2} />
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                type="button"
                onClick={handleAddToBag}
                className="flex-1 group flex items-center justify-between bg-[#171614] px-6 py-4 text-white transition hover:bg-[#292724] shadow-md"
              >
                <span className="text-[9px] tracking-[0.3em] uppercase">
                  {added ? "✓ ADDED TO YOUR BAG" : "ADD TO BAG"}
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={1.2}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>

            {/* Quick Buy Shortcut */}
            <div className="mt-3 flex gap-3">
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full border border-black/20 bg-white/60 hover:bg-white text-[#161513] py-3 text-[9px] tracking-[0.25em] uppercase font-medium transition"
              >
                PROCEED DIRECTLY TO CHECKOUT
              </button>
            </div>

            {/* Added Toast Alert */}
            {added && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
                <span>Added to bag! Ready to review your selection?</span>
                <Link href="/cart" className="underline font-semibold uppercase text-[9px] tracking-wider ml-2">
                  VIEW BAG
                </Link>
              </div>
            )}

            {/* TRUST FEATURES */}
            <div className="mt-8 grid grid-cols-3 border-y border-black/10 py-5">
              <div className="px-2 text-center">
                <ShieldCheck size={18} strokeWidth={1.2} className="mx-auto text-amber-700" />
                <p className="mt-2 text-[7px] leading-3.5 tracking-[0.15em] text-black/60 uppercase">
                  100% BIS<br />HALLMARKED
                </p>
              </div>

              <div className="border-x border-black/10 px-2 text-center">
                <Truck size={18} strokeWidth={1.2} className="mx-auto text-amber-700" />
                <p className="mt-2 text-[7px] leading-3.5 tracking-[0.15em] text-black/60 uppercase">
                  INSURED FREE<br />TRANSIT
                </p>
              </div>

              <div className="px-2 text-center">
                <RotateCcw size={18} strokeWidth={1.2} className="mx-auto text-amber-700" />
                <p className="mt-2 text-[7px] leading-3.5 tracking-[0.15em] text-black/60 uppercase">
                  15-DAY EASY<br />RETURNS
                </p>
              </div>
            </div>

            {/* EXPANDABLE ACCORDIONS */}
            <div className="mt-6 border-b border-black/10 divide-y divide-black/10">
              {/* Product Specifications */}
              <div>
                <button
                  type="button"
                  onClick={() => setOpenInfo(openInfo === "details" ? null : "details")}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="text-[9px] tracking-[0.25em] uppercase font-medium">
                    PRODUCT SPECIFICATIONS
                  </span>
                  <ChevronDown
                    size={16}
                    strokeWidth={1.2}
                    className={`transition-transform duration-300 ${openInfo === "details" ? "rotate-180" : ""}`}
                  />
                </button>
                {openInfo === "details" && (
                  <div className="pb-5 pt-1 text-xs leading-6 text-black/65 space-y-1.5">
                    <div className="flex justify-between border-b border-black/5 pb-1">
                      <span className="text-black/45">Gold Purity:</span>
                      <span className="font-medium">{product.purity} Pure Gold</span>
                    </div>
                    <div className="flex justify-between border-b border-black/5 pb-1">
                      <span className="text-black/45">Gemstone / Diamonds:</span>
                      <span className="font-medium">{product.gemstone}</span>
                    </div>
                    {product.diamondCarat && (
                      <div className="flex justify-between border-b border-black/5 pb-1">
                        <span className="text-black/45">Diamond Clarity & Cut:</span>
                        <span className="font-medium">{product.diamondCarat}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-b border-black/5 pb-1">
                      <span className="text-black/45">Gross Weight:</span>
                      <span className="font-medium">{product.weight}</span>
                    </div>
                    {product.dimensions && (
                      <div className="flex justify-between border-b border-black/5 pb-1">
                        <span className="text-black/45">Dimensions:</span>
                        <span className="font-medium">{product.dimensions}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Delivery & Shipping */}
              <div>
                <button
                  type="button"
                  onClick={() => setOpenInfo(openInfo === "shipping" ? null : "shipping")}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="text-[9px] tracking-[0.25em] uppercase font-medium">
                    DELIVERY & INSURED LOGISTICS
                  </span>
                  <ChevronDown
                    size={16}
                    strokeWidth={1.2}
                    className={`transition-transform duration-300 ${openInfo === "shipping" ? "rotate-180" : ""}`}
                  />
                </button>
                {openInfo === "shipping" && (
                  <div className="pb-5 pt-1 text-xs leading-6 text-black/65">
                    Complimentary 100% insured delivery via specialized armored couriers (Sequel & Malca-Amit). Handed over strictly with secret OTP verification. Typical delivery window is 3–5 business days across India and 5–7 days internationally.
                  </div>
                )}
              </div>

              {/* Hallmarking & Certificate */}
              <div>
                <button
                  type="button"
                  onClick={() => setOpenInfo(openInfo === "certification" ? null : "certification")}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="text-[9px] tracking-[0.25em] uppercase font-medium">
                    CERTIFICATION & HALLMARKING
                  </span>
                  <ChevronDown
                    size={16}
                    strokeWidth={1.2}
                    className={`transition-transform duration-300 ${openInfo === "certification" ? "rotate-180" : ""}`}
                  />
                </button>
                {openInfo === "certification" && (
                  <div className="pb-5 pt-1 text-xs leading-6 text-black/65">
                    Each creation is laser-inscribed with the official Bureau of Indian Standards (BIS) Hallmark along with purity stamp (916 for 22K, 750 for 18K). Diamonds include individual physical certificate documentation from IGI or GIA.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ATELIER PHILOSOPHY BANNER
      ====================================================== */}
      <section className="mt-28 border-t border-black/10 bg-[#ede8dc]">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-[9px] tracking-[0.35em] text-black/40 uppercase font-semibold">
                THE AURELIA ATELIER
              </p>
              <h2 className="mt-5 max-w-xl font-serif text-4xl sm:text-5xl leading-[0.96]">
                Designed to become part of your story.
              </h2>
              <p className="mt-6 max-w-lg text-xs sm:text-sm leading-8 text-black/60">
                Every Aurelia piece is imagined around harmony, light, and enduring heirloom value. The result is fine jewellery designed not merely for an occasion, but for the profound milestones that become lasting memories.
              </p>
            </div>

            <div className="overflow-hidden bg-[#e8e1d5] border border-black/10">
              <SafeImage
                src={product.images[0]}
                productId={product.id}
                alt={`${product.name} craftsmanship`}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          RELATED PIECES
      ====================================================== */}
      <section className="border-t border-black/10">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between border-b border-black/10 pb-6">
            <div>
              <p className="text-[9px] tracking-[0.35em] text-black/40 uppercase">
                CURATED FOR YOU
              </p>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                Complementary Pieces
              </h2>
            </div>

            <Link
              href="/products"
              className="text-[8px] tracking-[0.25em] underline underline-offset-4 uppercase hover:text-black transition"
            >
              VIEW FULL COLLECTION
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className="group border border-black/5 p-3 bg-white/30 hover:bg-white/70 transition"
              >
                <div className="overflow-hidden bg-[#e8e1d5]">
                  <SafeImage
                    src={item.images[0]}
                    productId={item.id}
                    alt={item.name}
                    className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="pt-4">
                  <p className="text-[8px] tracking-[0.2em] text-black/40 uppercase">
                    {item.category} · {item.purity}
                  </p>
                  <div className="flex items-baseline justify-between mt-1">
                    <h3 className="font-serif text-lg">{item.name}</h3>
                    <p className="text-xs font-medium">₹{item.price.toLocaleString("en-IN")}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FULLSCREEN ZOOM MODAL */}
      {zoom && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 cursor-zoom-out"
          onClick={() => setZoom(false)}
        >
          <button
            type="button"
            onClick={() => setZoom(false)}
            className="absolute right-6 top-6 z-10 text-3xl font-light text-white hover:text-amber-300 transition"
            aria-label="Close image"
          >
            ×
          </button>
          <SafeImage
            src={gallery[activeImage]}
            productId={product.id}
            fallbackIndex={activeImage}
            alt={product.name}
            className="max-h-[85vh] max-w-[85vw] object-contain shadow-2xl"
          />
        </div>
      )}

      {/* SIZE GUIDE MODAL */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        currentSize={selectedSize}
        onSelectSize={(s) => setSelectedSize(s)}
      />
    </main>
  );
}
