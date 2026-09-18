import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Truck,
  CreditCard,
  QrCode,
  Building2,
  BadgePercent,
  Sparkles,
} from "lucide-react";
import { CartItem, getCart, clearCart } from "../lib/cart";
import { saveOrder, Order } from "../lib/orders";
import { Link, useRouter } from "../lib/router";
import { SafeImage } from "../components/SafeImage";

export const CheckoutView: React.FC = () => {
  const { navigate } = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("Aarav Sharma");
  const [email, setEmail] = useState("aarav.sharma@example.com");
  const [phone, setPhone] = useState("+91 98200 12345");
  const [address, setAddress] = useState("Flat 14B, Sea Face Residences, Worli");
  const [landmark, setLandmark] = useState("Near Worli Sea Face Promenade");
  const [city, setCity] = useState("Mumbai");
  const [state, setState] = useState("Maharashtra");
  const [pincode, setPincode] = useState("400018");

  // Delivery method
  const [deliveryMethod, setDeliveryMethod] = useState<"sequel" | "atelier">("sequel");

  // Payment method
  const [paymentType, setPaymentType] = useState<"upi" | "card" | "netbanking" | "concierge">("upi");
  const [upiId, setUpiId] = useState("aarav@okhdfcbank");
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8912");
  const [cardExpiry, setCardExpiry] = useState("11/28");
  const [cardCvv, setCardCvv] = useState("•••");
  const [bank, setBank] = useState("HDFC Bank");
  const [giftPackaging, setGiftPackaging] = useState(true);
  const [specialInstructions, setSpecialInstructions] = useState("");

  useEffect(() => {
    const items = getCart();
    if (items.length === 0) {
      // If user comes directly with empty cart
      navigate("/cart");
    } else {
      setCart(items);
    }
  }, [navigate]);

  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const shipping = subtotal >= 100000 || deliveryMethod === "sequel" ? 0 : 999;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderId = `AUR-${randomSuffix}`;

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      items: cart,
      subtotal,
      shipping,
      discount: 0,
      tax: Math.round(subtotal * 0.03), // 3% GST included
      total,
      customer: {
        fullName,
        email,
        phone,
        address,
        landmark,
        city,
        state,
        pincode,
      },
      deliveryMethod: {
        title:
          deliveryMethod === "sequel"
            ? "Sequel Armored Logistics (Insured)"
            : "Aurelia White-Glove Concierge Hand-Delivery",
        courier: deliveryMethod === "sequel" ? "Sequel Secure Trans / Malca-Amit" : "VIP Atelier Courier",
        estimatedDelivery: "3–4 Business Days",
      },
      paymentMethod: {
        type: paymentType,
        label:
          paymentType === "upi"
            ? `UPI (${upiId})`
            : paymentType === "card"
            ? "Premium Credit Card (Visa/Amex)"
            : paymentType === "netbanking"
            ? `Net Banking (${bank})`
            : "Insured Concierge on Delivery",
        reference: `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
      },
      giftPackaging,
      specialInstructions,
      status: "Confirmed",
    };

    setTimeout(() => {
      saveOrder(newOrder);
      clearCart();
      setLoading(false);
      navigate(`/order-success/${orderId}`);
    }, 1500);
  };

  if (cart.length === 0) return null;

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#161513] pt-28 pb-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* TOP BAR */}
        <div className="flex items-center justify-between border-b border-black/10 pb-6">
          <Link
            href="/cart"
            className="flex items-center gap-2 text-[9px] tracking-[0.25em] text-black/60 hover:text-black uppercase"
          >
            <ArrowLeft size={14} />
            <span>RETURN TO BAG</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-black/60">
            <Lock size={13} className="text-amber-800" />
            <span className="text-[9px] tracking-[0.2em] uppercase">256-Bit SSL Insured Checkout</span>
          </div>
        </div>

        <div className="mt-8 mb-12">
          <p className="text-[9px] tracking-[0.35em] text-black/40 uppercase">
            AURELIA PRIVATE CLIENT ATELIER
          </p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            Insured Checkout
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid gap-12 lg:grid-cols-[1fr_440px]">
          {/* LEFT: CHECKOUT STEPS */}
          <div className="space-y-10">
            {/* STEP 1: CLIENT DETAILS */}
            <div className="bg-white/40 border border-black/10 p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#161513] text-white text-xs font-serif">
                    1
                  </span>
                  <h2 className="font-serif text-2xl">Client & Delivery Contact</h2>
                </div>
                <span className="text-[8px] tracking-[0.2em] text-black/40 uppercase">
                  FOR INVOICE & OTP
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-1.5 font-medium">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white/70 border border-black/15 p-3 text-xs outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-1.5 font-medium">
                    Mobile Number (For Delivery OTP) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/70 border border-black/15 p-3 text-xs outline-none focus:border-black"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-1.5 font-medium">
                    Email Address (For Certificate & Receipt) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/70 border border-black/15 p-3 text-xs outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* STEP 2: INSURED SHIPPING DESTINATION */}
            <div className="bg-white/40 border border-black/10 p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#161513] text-white text-xs font-serif">
                    2
                  </span>
                  <h2 className="font-serif text-2xl">Insured Delivery Address</h2>
                </div>
                <span className="text-[8px] tracking-[0.2em] text-black/40 uppercase">
                  TAMPER-PROOF PACKAGING
                </span>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-1.5 font-medium">
                    Address (House / Flat / Villa / Suite / Street) *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-white/70 border border-black/15 p-3 text-xs outline-none focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-1.5 font-medium">
                      Landmark
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full bg-white/70 border border-black/15 p-3 text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-1.5 font-medium">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white/70 border border-black/15 p-3 text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-1.5 font-medium">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full bg-white/70 border border-black/15 p-3 text-xs outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-1.5 font-medium">
                    State *
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-white/70 border border-black/15 p-3 text-xs outline-none"
                  >
                    <option>Maharashtra</option>
                    <option>Delhi NCR</option>
                    <option>Karnataka</option>
                    <option>Tamil Nadu</option>
                    <option>Telangana</option>
                    <option>Gujarat</option>
                    <option>West Bengal</option>
                    <option>Rajasthan</option>
                    <option>Other State / UT</option>
                  </select>
                </div>
              </div>

              {/* Delivery Logistics Selection */}
              <div className="mt-8 pt-6 border-t border-black/10">
                <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-3 font-medium">
                  Select Insured Transit Service
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setDeliveryMethod("sequel")}
                    className={`border p-4 cursor-pointer transition ${
                      deliveryMethod === "sequel"
                        ? "border-[#161513] bg-[#161513]/5"
                        : "border-black/15 hover:border-black/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Truck size={16} className="text-amber-800" />
                        <span className="text-xs font-serif font-medium">Armored Insured Transit</span>
                      </div>
                      <span className="text-[9px] tracking-wider text-emerald-800 font-semibold uppercase">
                        COMPLIMENTARY
                      </span>
                    </div>
                    <p className="mt-2 text-[10px] text-black/55 leading-4">
                      Secured by Sequel Logistics or Malca-Amit with OTP handover. Estimated 3–4 business days.
                    </p>
                  </div>

                  <div
                    onClick={() => setDeliveryMethod("atelier")}
                    className={`border p-4 cursor-pointer transition ${
                      deliveryMethod === "atelier"
                        ? "border-[#161513] bg-[#161513]/5"
                        : "border-black/15 hover:border-black/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles size={16} className="text-amber-800" />
                        <span className="text-xs font-serif font-medium">VIP White-Glove Delivery</span>
                      </div>
                      <span className="text-[9px] tracking-wider text-black/60 font-semibold uppercase">
                        ATELIER CONCIERGE
                      </span>
                    </div>
                    <p className="mt-2 text-[10px] text-black/55 leading-4">
                      Hand-delivered by an Aurelia senior jewellery specialist directly to your residence or private salon.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3: PAYMENT METHOD */}
            <div className="bg-white/40 border border-black/10 p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#161513] text-white text-xs font-serif">
                    3
                  </span>
                  <h2 className="font-serif text-2xl">Payment & Authorization</h2>
                </div>
                <span className="text-[8px] tracking-[0.2em] text-black/40 uppercase">
                  RBI CERTIFIED GATEWAY
                </span>
              </div>

              {/* Payment Type Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentType("upi")}
                  className={`flex flex-col items-center justify-center py-3 px-2 border text-xs transition ${
                    paymentType === "upi"
                      ? "border-[#161513] bg-[#161513] text-white"
                      : "border-black/15 bg-white/60 hover:border-black"
                  }`}
                >
                  <QrCode size={16} className="mb-1" />
                  <span className="text-[9px] tracking-[0.1em] uppercase">UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType("card")}
                  className={`flex flex-col items-center justify-center py-3 px-2 border text-xs transition ${
                    paymentType === "card"
                      ? "border-[#161513] bg-[#161513] text-white"
                      : "border-black/15 bg-white/60 hover:border-black"
                  }`}
                >
                  <CreditCard size={16} className="mb-1" />
                  <span className="text-[9px] tracking-[0.1em] uppercase">Cards & EMI</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType("netbanking")}
                  className={`flex flex-col items-center justify-center py-3 px-2 border text-xs transition ${
                    paymentType === "netbanking"
                      ? "border-[#161513] bg-[#161513] text-white"
                      : "border-black/15 bg-white/60 hover:border-black"
                  }`}
                >
                  <Building2 size={16} className="mb-1" />
                  <span className="text-[9px] tracking-[0.1em] uppercase">Net Banking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType("concierge")}
                  className={`flex flex-col items-center justify-center py-3 px-2 border text-xs transition ${
                    paymentType === "concierge"
                      ? "border-[#161513] bg-[#161513] text-white"
                      : "border-black/15 bg-white/60 hover:border-black"
                  }`}
                >
                  <ShieldCheck size={16} className="mb-1" />
                  <span className="text-[9px] tracking-[0.1em] uppercase">Concierge Delivery</span>
                </button>
              </div>

              {/* Payment Details Form */}
              {paymentType === "upi" && (
                <div className="bg-white/60 border border-black/10 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-serif text-[#161513]">Instant Zero-Fee UPI Payment</p>
                      <p className="text-[10px] text-black/50">Google Pay, PhonePe, Paytm, or BHIM</p>
                    </div>
                    <div className="flex gap-1.5 text-[8px] tracking-wider text-black/50 uppercase border px-2 py-1 bg-white">
                      BHIM · UPI
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-1.5 font-medium">
                      Enter UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@bank"
                      className="w-full bg-white border border-black/15 p-3 text-xs outline-none"
                    />
                  </div>
                  <p className="text-[10px] text-black/45">
                    Upon clicking 'Place Order', an instant authorization notification will be dispatched to your UPI app.
                  </p>
                </div>
              )}

              {paymentType === "card" && (
                <div className="bg-white/60 border border-black/10 p-5 space-y-4">
                  <p className="text-xs font-serif">Credit & Debit Cards (Zero Interest EMI Available)</p>
                  <div>
                    <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-1.5 font-medium">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 0000 0000 0000"
                      className="w-full bg-white border border-black/15 p-3 text-xs outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-1.5 font-medium">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full bg-white border border-black/15 p-3 text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-1.5 font-medium">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full bg-white border border-black/15 p-3 text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentType === "netbanking" && (
                <div className="bg-white/60 border border-black/10 p-5 space-y-3">
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-1 font-medium">
                    Choose Corporate or Retail Bank
                  </label>
                  <select
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="w-full bg-white border border-black/15 p-3 text-xs outline-none"
                  >
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>State Bank of India</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                    <option>Standard Chartered</option>
                  </select>
                </div>
              )}

              {paymentType === "concierge" && (
                <div className="bg-white/60 border border-black/10 p-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-amber-800" />
                    <p className="text-xs font-serif text-[#161513]">Private Salon / Concierge Payment</p>
                  </div>
                  <p className="text-xs leading-5 text-black/60">
                    Inspect your hallmarked jewellery upon arrival with our armored courier and complete authorization via mobile POS or bank transfer on delivery.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY ASIDE */}
          <aside className="h-fit border border-black/15 bg-white/40 p-6 sm:p-8 sticky top-28 shadow-sm">
            <p className="text-[9px] tracking-[0.3em] text-black/40 uppercase">
              SELECTION SUMMARY
            </p>
            <h2 className="mt-3 font-serif text-3xl">Review Pieces</h2>

            {/* List of Cart Items */}
            <div className="mt-6 divide-y divide-black/10 max-h-[300px] overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.metal}`}
                  className="py-3.5 flex items-center gap-3.5"
                >
                  <div className="h-16 w-16 flex-shrink-0 bg-[#e8e2d7] overflow-hidden border border-black/5">
                    <SafeImage
                      src={item.product.images[0]}
                      productId={item.product.id}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[8px] tracking-[0.2em] text-black/40 uppercase">
                      {item.product.category} · {item.metal || item.product.material}
                    </p>
                    <h4 className="font-serif text-sm truncate text-[#161513]">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-black/60 mt-0.5">
                      Qty: {item.quantity} {item.size ? `· Size ${item.size}` : ""}
                    </p>
                  </div>
                  <span className="text-xs font-medium whitespace-nowrap">
                    ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-6 pt-5 border-t border-black/10 space-y-3.5 text-xs">
              <div className="flex justify-between text-black/60">
                <span>Subtotal ({cart.length} pieces)</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between text-black/60">
                <span>Armored Insured Courier</span>
                <span className="text-emerald-800 font-medium">COMPLIMENTARY</span>
              </div>

              <div className="flex justify-between text-[11px] text-black/45">
                <span>Gold GST (3%) & Hallmark Fees</span>
                <span>Included</span>
              </div>
            </div>

            <div className="flex items-end justify-between py-6 border-t border-black/10 mt-5">
              <div>
                <span className="text-[9px] tracking-[0.25em] uppercase font-semibold">
                  FINAL TOTAL
                </span>
                <p className="text-[10px] text-black/40 mt-0.5">Fully insured in transit</p>
              </div>
              <span className="font-serif text-3xl font-normal">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-between bg-[#161513] px-6 py-5 text-white transition hover:bg-[#292724] disabled:opacity-75 shadow-lg"
            >
              <span className="text-[9px] tracking-[0.28em] uppercase">
                {loading ? "AUTHORIZING ORDER..." : "AUTHORIZE & PLACE ORDER"}
              </span>
              <ShieldCheck size={18} strokeWidth={1.2} />
            </button>

            <div className="mt-6 space-y-2 border-t border-black/10 pt-4 text-[9px] text-black/45 leading-5">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-amber-800" />
                <span>Government BIS 916 hallmarked authentic gold</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-amber-800" />
                <span>15-day complimentary exchange & money-back privilege</span>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
};
