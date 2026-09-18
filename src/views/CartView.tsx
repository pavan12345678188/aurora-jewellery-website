import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Gift,
  ShieldCheck,
  Tag,
  Check,
} from "lucide-react";
import {
  CartItem,
  getCart,
  removeFromCart,
  updateCartQuantity,
  CART_CHANGE_EVENT,
} from "../lib/cart";
import { Link, useRouter } from "../lib/router";
import { SafeImage } from "../components/SafeImage";

export const CartView: React.FC = () => {
  const { navigate } = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");
  const [giftBox, setGiftBox] = useState(false);
  const [giftNote, setGiftNote] = useState("");

  const refreshCart = () => {
    setCart(getCart());
  };

  useEffect(() => {
    setCart(getCart());
    setLoaded(true);

    const onCartChange = () => {
      setCart(getCart());
    };
    window.addEventListener(CART_CHANGE_EVENT, onCartChange);
    return () => window.removeEventListener(CART_CHANGE_EVENT, onCartChange);
  }, []);

  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Free shipping on orders over ₹1,00,000, else ₹999
  const shipping = subtotal === 0 || subtotal >= 100000 ? 0 : 999;

  // 10% discount if code AURELIA10 applied
  const discount = appliedPromo === "AURELIA10" ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount + shipping;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    if (promoCode.trim().toUpperCase() === "AURELIA10") {
      setAppliedPromo("AURELIA10");
      setPromoCode("");
    } else {
      setPromoError("Invalid privilege code. Try 'AURELIA10' for 10% inaugural privilege.");
    }
  };

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f1ea] pt-28">
        <p className="text-[9px] tracking-[0.4em] font-light">AURELIA FINE JEWELLERY</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#161513] pt-28 pb-20">
      {/* HEADER */}
      <div className="border-b border-black/10">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-6 lg:px-12">
          <Link
            href="/products"
            className="flex items-center gap-2.5 text-[9px] tracking-[0.25em] text-black/60 hover:text-black uppercase transition"
          >
            <ArrowLeft size={14} strokeWidth={1.2} />
            <span>CONTINUE SHOPPING</span>
          </Link>

          <div className="text-[10px] tracking-[0.25em] text-black/40 uppercase">
            {cart.length} {cart.length === 1 ? "PIECE" : "PIECES"} IN BAG
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <section className="mx-auto max-w-[1500px] px-6 py-12 lg:px-12 lg:py-16">
        <div className="grid gap-14 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px]">
          {/* LEFT: ITEMS LIST */}
          <div>
            <div className="border-b border-black/15 pb-7">
              <p className="text-[9px] tracking-[0.35em] text-black/40 uppercase">
                YOUR SELECTION
              </p>
              <h1 className="mt-3 font-serif text-5xl lg:text-6xl">
                Shopping Bag
              </h1>
              {subtotal > 0 && subtotal < 100000 && (
                <div className="mt-4 p-3 bg-white/60 border border-black/10 text-xs text-black/70 flex items-center justify-between">
                  <span>
                    Add ₹{(100000 - subtotal).toLocaleString("en-IN")} more to qualify for <strong>Complimentary Insured Courier Delivery</strong>.
                  </span>
                </div>
              )}
            </div>

            {/* EMPTY STATE */}
            {cart.length === 0 ? (
              <div className="py-24 text-center border border-dashed border-black/15 mt-8 bg-white/20 p-8">
                <ShoppingBag
                  size={38}
                  strokeWidth={1}
                  className="mx-auto text-black/30"
                />
                <h2 className="mt-6 font-serif text-3xl">Your bag is empty</h2>
                <p className="mt-3 text-xs text-black/50 max-w-sm mx-auto">
                  Discover heirloom pieces crafted in 18K and 22K gold for your next memory.
                </p>
                <Link
                  href="/products"
                  className="mt-8 inline-flex bg-[#161513] px-8 py-4 text-[9px] tracking-[0.25em] text-white uppercase hover:bg-[#292724] transition shadow-md"
                >
                  EXPLORE COLLECTION
                </Link>
              </div>
            ) : (
              <div>
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.metal}`}
                    className="grid grid-cols-[110px_1fr] sm:grid-cols-[150px_1fr] gap-6 border-b border-black/10 py-8"
                  >
                    {/* PRODUCT THUMBNAIL */}
                    <Link
                      href={`/products/${item.product.id}`}
                      className="aspect-square overflow-hidden bg-[#e8e2d7] border border-black/5"
                    >
                      <SafeImage
                        src={item.product.images[0]}
                        productId={item.product.id}
                        alt={item.product.name}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                    </Link>

                    {/* DETAILS */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-[8px] tracking-[0.25em] text-black/45 uppercase">
                              {item.product.category} · {item.product.purity}
                            </p>
                            <h2 className="mt-1 font-serif text-xl sm:text-2xl">
                              <Link
                                href={`/products/${item.product.id}`}
                                className="hover:underline"
                              >
                                {item.product.name}
                              </Link>
                            </h2>
                          </div>
                          <span className="text-sm sm:text-base font-medium whitespace-nowrap">
                            ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>

                        <div className="mt-2 text-xs text-black/60 space-y-0.5">
                          <p>Selected Metal: {item.metal || item.product.material}</p>
                          {item.size && <p>Ring Size: Standard {item.size}</p>}
                          <p className="text-[11px] text-black/40">Hallmark: {item.product.purity} Government Certified</p>
                        </div>
                      </div>

                      <div className="mt-6 flex items-end justify-between">
                        {/* QUANTITY CHANGER */}
                        <div className="flex items-center border border-black/20 bg-white/50">
                          <button
                            type="button"
                            onClick={() => {
                              updateCartQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.size,
                                item.metal
                              );
                              refreshCart();
                            }}
                            className="flex h-8 w-8 items-center justify-center hover:bg-black/10 transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} strokeWidth={1.2} />
                          </button>

                          <span className="flex h-8 w-8 items-center justify-center text-xs font-medium">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              updateCartQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.size,
                                item.metal
                              );
                              refreshCart();
                            }}
                            className="flex h-8 w-8 items-center justify-center hover:bg-black/10 transition"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} strokeWidth={1.2} />
                          </button>
                        </div>

                        {/* REMOVE BUTTON */}
                        <button
                          type="button"
                          onClick={() => {
                            removeFromCart(item.product.id, item.size, item.metal);
                            refreshCart();
                          }}
                          className="flex items-center gap-1.5 text-[8px] tracking-[0.2em] text-black/45 hover:text-red-700 uppercase transition"
                        >
                          <Trash2 size={13} strokeWidth={1.2} />
                          <span>REMOVE</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* GIFT PACKAGING ACCORDION */}
                <div className="mt-8 border border-black/10 bg-white/30 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Gift size={18} strokeWidth={1.2} className="text-amber-800" />
                      <div>
                        <p className="text-xs font-serif text-[#161513]">Complimentary Keepsake Gift Box & Note</p>
                        <p className="text-[10px] text-black/50">Delivered in our signature velvet packaging with wax seal.</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      id="giftBox"
                      checked={giftBox}
                      onChange={(e) => setGiftBox(e.target.checked)}
                      className="h-4 w-4 accent-[#161513] cursor-pointer"
                    />
                  </div>

                  {giftBox && (
                    <div className="mt-4 pt-4 border-t border-black/10">
                      <label className="block text-[9px] tracking-[0.2em] uppercase text-black/60 mb-1.5">
                        Calligraphy Gift Note (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={giftNote}
                        onChange={(e) => setGiftNote(e.target.value)}
                        placeholder="Write a message to be hand-inscribed by our atelier..."
                        className="w-full border border-black/15 bg-white/60 p-3 text-xs outline-none placeholder:text-black/35 font-light"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: ORDER SUMMARY ASIDE */}
          <aside className="h-fit border border-black/15 bg-white/40 p-6 sm:p-8 shadow-sm">
            <p className="text-[9px] tracking-[0.3em] text-black/40 uppercase">
              ORDER SUMMARY
            </p>
            <h2 className="mt-3 font-serif text-3xl">Your Order</h2>

            {/* Voucher Code Input */}
            <form onSubmit={handleApplyPromo} className="mt-6 border-b border-black/10 pb-5">
              <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-2">
                Privilege Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="e.g. AURELIA10"
                  className="w-full bg-white/70 border border-black/15 px-3 py-2.5 text-xs uppercase outline-none placeholder:text-black/30"
                />
                <button
                  type="submit"
                  className="bg-[#161513] text-white text-[9px] tracking-[0.2em] uppercase px-4 py-2.5 hover:bg-[#292724] transition whitespace-nowrap"
                >
                  APPLY
                </button>
              </div>
              {appliedPromo && (
                <p className="mt-2 text-xs text-emerald-800 flex items-center gap-1 font-medium">
                  <Check size={12} /> Privilege code '{appliedPromo}' applied (10% off)
                </p>
              )}
              {promoError && (
                <p className="mt-2 text-xs text-red-700">{promoError}</p>
              )}
            </form>

            <div className="mt-6 space-y-4 border-b border-black/10 pb-6 text-xs">
              <div className="flex justify-between">
                <span className="text-black/60">Subtotal ({cart.length} items)</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>Inaugural Privilege (10%)</span>
                  <span>-₹{discount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-black/60">Insured Armored Courier</span>
                <span className={shipping === 0 ? "text-emerald-800 font-medium" : ""}>
                  {shipping === 0 ? "FREE (Orders ₹1L+)" : `₹${shipping.toLocaleString("en-IN")}`}
                </span>
              </div>

              <div className="flex justify-between text-[11px] text-black/45">
                <span>Applicable GST (3% Jewellery)</span>
                <span>Included</span>
              </div>
            </div>

            <div className="flex items-end justify-between py-6">
              <div>
                <span className="text-[9px] tracking-[0.25em] uppercase font-semibold">
                  ESTIMATED TOTAL
                </span>
                <p className="text-[10px] text-black/40 mt-0.5">Includes all taxes & insurance</p>
              </div>
              <span className="font-serif text-3xl">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>

            {cart.length > 0 ? (
              <button
                onClick={() => navigate("/checkout")}
                className="group flex w-full items-center justify-between bg-[#161513] px-6 py-5 text-white transition hover:bg-[#292724] shadow-md"
              >
                <span className="text-[9px] tracking-[0.28em] uppercase">
                  PROCEED TO CHECKOUT
                </span>
                <ArrowRight
                  size={17}
                  strokeWidth={1.2}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            ) : (
              <button
                onClick={() => navigate("/products")}
                className="w-full bg-[#161513] px-6 py-5 text-white text-[9px] tracking-[0.28em] uppercase hover:bg-[#292724] transition"
              >
                EXPLORE COLLECTION
              </button>
            )}

            <div className="mt-6 space-y-2 text-[9px] leading-5 text-black/50 border-t border-black/10 pt-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-amber-800" />
                <span>100% Insured transit with private OTP delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={14} className="text-amber-800" />
                <span>BIS 916 hallmarked pure gold & certified diamonds</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};
