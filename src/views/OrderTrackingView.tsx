import React, { useState, useEffect } from "react";
import {
  Search,
  Truck,
  ShieldCheck,
  PackageCheck,
  CheckCircle2,
  Clock,
  MapPin,
  FileText,
  Phone,
  KeyRound,
  ArrowRight,
  AlertCircle,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { getOrders, Order } from "../lib/orders";
import { Link } from "../lib/router";
import { SafeImage } from "../components/SafeImage";
import { AuroraLogo } from "../components/AuroraLogo";

// Pre-seeded sample trackable orders for instant preview & testing
const DEMO_ORDERS: Record<string, Order> = {
  "AUR-84291": {
    id: "AUR-84291",
    date: "Sep 16, 2026",
    items: [
      {
        product: {
          id: "aurora-diamond-ring",
          name: "Aurora Diamond Ring",
          category: "Rings",
          price: 84999,
          purity: "18K",
          material: "Yellow Gold",
          gemstone: "Natural Diamond",
          weight: "4.2 g",
          images: ["/jewellery-diamond-ring.jpg"],
          description: "A timeless diamond ring designed around a brilliant centre stone.",
          featured: true,
          diamondCarat: "0.75 ct VVS-VS / E-F",
          hallmark: "BIS 750 Hallmark & IGI Certified",
        },
        quantity: 1,
        metal: "Yellow Gold",
        size: "7",
      },
    ],
    subtotal: 84999,
    shipping: 0,
    discount: 0,
    tax: 2550,
    total: 84999,
    customer: {
      fullName: "Ananya Deshmukh",
      email: "ananya.d@example.com",
      phone: "+91 98201 54321",
      address: "Penthouse 18A, Imperial Towers, Tardeo",
      landmark: "Near Babulnath Temple",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400034",
    },
    deliveryMethod: {
      title: "Sequel Armored Logistics (Insured)",
      courier: "Sequel Logistics Secure Trans",
      estimatedDelivery: "Tomorrow by 1:30 PM",
    },
    paymentMethod: {
      type: "card",
      label: "Visa Infinite (Prepaid & Insured)",
      reference: "TXN-88492019",
    },
    giftPackaging: true,
    status: "Insured Transit",
  },
  "AUR-92314": {
    id: "AUR-92314",
    date: "Sep 15, 2026",
    items: [
      {
        product: {
          id: "celeste-necklace",
          name: "Celeste Necklace",
          category: "Necklaces",
          price: 124999,
          purity: "18K",
          material: "Yellow Gold",
          gemstone: "Natural Diamond",
          weight: "8.6 g",
          images: ["/jewellery-necklace.jpg"],
          description: "An elegant necklace combining delicate proportions with fine design.",
          featured: true,
          hallmark: "BIS 750 Hallmarked Gold",
        },
        quantity: 1,
        metal: "Yellow Gold",
      },
      {
        product: {
          id: "elan-earrings",
          name: "Élan Earrings",
          category: "Earrings",
          price: 64999,
          purity: "18K",
          material: "Yellow Gold",
          gemstone: "Natural Diamond",
          weight: "3.8 g",
          images: ["/jewellery-earrings.jpg"],
          description: "Sculptural earrings designed to bring subtle brilliance.",
          featured: true,
          hallmark: "BIS 750 Hallmarked Gold",
        },
        quantity: 1,
        metal: "Yellow Gold",
      },
    ],
    subtotal: 189998,
    shipping: 0,
    discount: 0,
    tax: 5700,
    total: 189998,
    customer: {
      fullName: "Vikramaditya Singhania",
      email: "v.singhania@example.com",
      phone: "+91 99100 88776",
      address: "Bungalow 4, Amrita Shergill Marg",
      landmark: "Lodi Estate",
      city: "New Delhi",
      state: "Delhi NCR",
      pincode: "110003",
    },
    deliveryMethod: {
      title: "Malca-Amit High Value Transit",
      courier: "Malca-Amit Armored Courier",
      estimatedDelivery: "Out for OTP Delivery Today",
    },
    paymentMethod: {
      type: "upi",
      label: "Instant Bank UPI Verified",
      reference: "TXN-49201948",
    },
    giftPackaging: true,
    status: "Insured Transit",
  },
};

type OrderTrackingViewProps = {
  initialOrderId?: string;
};

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({ initialOrderId = "" }) => {
  const [searchId, setSearchId] = useState(initialOrderId);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Load local stored orders
    const stored = getOrders();
    setRecentOrders(stored);

    // If query string has id or initialOrderId provided
    const queryParams = new URLSearchParams(window.location.search);
    const queryId = queryParams.get("id") || initialOrderId;

    if (queryId) {
      setSearchId(queryId);
      lookupOrder(queryId, stored);
    } else if (stored.length > 0) {
      setSearchId(stored[0].id);
      setActiveOrder(stored[0]);
      setSearched(true);
    } else {
      // Default to demo sample
      setSearchId("AUR-84291");
      setActiveOrder(DEMO_ORDERS["AUR-84291"]);
      setSearched(true);
    }
  }, [initialOrderId]);

  const lookupOrder = (id: string, currentOrders = recentOrders) => {
    setSearched(true);
    const cleanId = id.trim().toUpperCase();

    // 1. Check in user's placed orders
    const local = currentOrders.find(
      (o) => o.id.toUpperCase() === cleanId || o.id.toUpperCase() === `AUR-${cleanId}`
    );

    if (local) {
      setActiveOrder(local);
      return;
    }

    // 2. Check in Demo Orders
    if (DEMO_ORDERS[cleanId]) {
      setActiveOrder(DEMO_ORDERS[cleanId]);
      return;
    }

    // 3. Fallback: if user types random id like AUR-12345, dynamically synthesize status
    if (cleanId.startsWith("AUR-") || /^\d{5}$/.test(cleanId)) {
      const syntheticId = cleanId.startsWith("AUR-") ? cleanId : `AUR-${cleanId}`;
      const syntheticOrder: Order = {
        id: syntheticId,
        date: "Recent Consignment",
        items: [
          {
            product: {
              id: "aurora-diamond-ring",
              name: "Aurora Diamond Ring",
              category: "Rings",
              price: 84999,
              purity: "18K",
              material: "Yellow Gold",
              gemstone: "Natural Diamond",
              weight: "4.2 g",
              images: ["/jewellery-diamond-ring.jpg"],
              description: "A timeless diamond ring designed around a brilliant centre stone.",
              featured: true,
              diamondCarat: "0.75 ct VVS-VS",
              hallmark: "BIS 750 Hallmark Verified",
            },
            quantity: 1,
            metal: "Yellow Gold",
            size: "7",
          },
        ],
        subtotal: 84999,
        shipping: 0,
        discount: 0,
        tax: 2550,
        total: 84999,
        customer: {
          fullName: "Valued Atelier Client",
          email: "client@aureliajewellery.com",
          phone: "+91 98••• •••45",
          address: "Registered Client Residence",
          city: "Metro City",
          state: "India",
          pincode: "400001",
        },
        deliveryMethod: {
          title: "Sequel Armored Logistics (Insured)",
          courier: "Sequel Secure Trans",
          estimatedDelivery: "In Transit · Delivery in 2 Business Days",
        },
        paymentMethod: {
          type: "card",
          label: "Secured Electronic Payment",
          reference: "TXN-94182910",
        },
        giftPackaging: true,
        status: "Insured Transit",
      };
      setActiveOrder(syntheticOrder);
      return;
    }

    setActiveOrder(null);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId) {
      lookupOrder(searchId);
      window.history.replaceState({}, "", `/track?id=${encodeURIComponent(searchId)}`);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#161513] pt-28 pb-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[10px] tracking-[0.35em] text-black/40 uppercase font-medium">
            INSURED LOGISTICS & ATELIER PROTOCOL
          </p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl">
            Track Your Order
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-black/60 leading-6">
            Monitor your fine jewellery consignment from final hallmarking in our atelier to private OTP handover by our armored couriers.
          </p>
        </div>

        {/* LOOKUP INPUT BAR */}
        <div className="max-w-2xl mx-auto bg-white/60 border border-black/15 p-3 sm:p-4 shadow-sm mb-8">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-white border border-black/10">
              <Search size={18} className="text-black/40 flex-shrink-0" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Order Reference (e.g. AUR-84291)"
                className="w-full bg-transparent text-xs sm:text-sm uppercase tracking-wider outline-none placeholder:normal-case placeholder:tracking-normal placeholder:text-black/35 font-medium"
              />
            </div>
            <button
              type="submit"
              className="bg-[#161513] text-white px-8 py-3.5 text-[9px] tracking-[0.25em] uppercase hover:bg-[#292724] transition font-medium whitespace-nowrap shadow-xs"
            >
              TRACK CONSIGNMENT
            </button>
          </form>

          {/* Quick Demo and Recent Order Chips */}
          <div className="mt-4 pt-3 border-t border-black/10 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[9px] tracking-[0.15em] text-black/40 uppercase font-medium mr-1">
              Sample Orders:
            </span>
            {recentOrders.slice(0, 2).map((ro) => (
              <button
                key={ro.id}
                type="button"
                onClick={() => {
                  setSearchId(ro.id);
                  lookupOrder(ro.id);
                }}
                className="px-2.5 py-1 text-[9px] tracking-wider uppercase border border-amber-900/30 bg-amber-50/50 hover:bg-amber-100 transition text-amber-950 font-medium"
              >
                Your Order: {ro.id}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setSearchId("AUR-84291");
                lookupOrder("AUR-84291");
              }}
              className="px-2.5 py-1 text-[9px] tracking-wider uppercase border border-black/15 bg-white/70 hover:border-black transition"
            >
              AUR-84291 (In Transit)
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchId("AUR-92314");
                lookupOrder("AUR-92314");
              }}
              className="px-2.5 py-1 text-[9px] tracking-wider uppercase border border-black/15 bg-white/70 hover:border-black transition"
            >
              AUR-92314 (Out for OTP Delivery)
            </button>
          </div>
        </div>

        {/* TRACKING RESULTS */}
        {searched && !activeOrder && (
          <div className="max-w-xl mx-auto py-16 text-center border border-dashed border-black/20 bg-white/30 p-8">
            <AlertCircle size={36} strokeWidth={1.2} className="mx-auto text-black/40 mb-3" />
            <h3 className="font-serif text-2xl">Consignment Reference Not Found</h3>
            <p className="mt-2 text-xs text-black/55 leading-5 max-w-sm mx-auto">
              We could not locate an active consignment matching "{searchId}". Please verify the order reference sent in your confirmation email or contact our atelier concierge.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSearchId("AUR-84291");
                  lookupOrder("AUR-84291");
                }}
                className="text-[9px] tracking-[0.2em] underline uppercase text-black/70 hover:text-black"
              >
                Try sample order AUR-84291
              </button>
            </div>
          </div>
        )}

        {activeOrder && (
          <div className="space-y-10">
            {/* TOP SUMMARY BANNER */}
            <div className="border border-black/15 bg-white/60 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-black/10">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] tracking-[0.25em] text-black/40 uppercase font-semibold">
                      CONSIGNMENT REFERENCE
                    </span>
                    <span className="bg-[#161513] text-white text-[9px] tracking-[0.15em] px-2.5 py-0.5 uppercase font-medium">
                      {activeOrder.id}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl mt-1.5 text-[#161513]">
                    {activeOrder.deliveryMethod.title}
                  </h2>
                  <p className="text-xs text-black/55 mt-1">
                    Booked on {activeOrder.date} · Authorized recipient: <strong>{activeOrder.customer.fullName}</strong>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="bg-emerald-50 border border-emerald-300 px-4 py-3 text-left">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                      </span>
                      <span className="text-[9px] tracking-[0.2em] font-semibold uppercase text-emerald-900">
                        {activeOrder.deliveryMethod.estimatedDelivery.includes("Today")
                          ? "OUT FOR OTP DELIVERY"
                          : "IN ARMORED TRANSIT"}
                      </span>
                    </div>
                    <p className="text-xs font-serif text-emerald-950 mt-1 font-medium">
                      Est. Arrival: {activeOrder.deliveryMethod.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>

              {/* SECURITY OTP CALLOUT */}
              <div className="mt-6 p-4 sm:p-5 bg-amber-50/70 border border-amber-300/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <KeyRound size={22} className="text-amber-900 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-serif font-semibold text-amber-950">
                      Private Handover Delivery OTP: <span className="tracking-widest bg-white border border-amber-300 px-2 py-0.5 font-mono text-sm ml-1 text-black">7 8 4 2</span>
                    </h4>
                    <p className="text-[11px] text-amber-900/80 mt-0.5 leading-4">
                      Share this private security code only in person after inspecting the unbroken tamper-evident wax seal on your parcel.
                    </p>
                  </div>
                </div>
                <span className="text-[8px] tracking-[0.15em] text-amber-900/80 uppercase font-semibold border border-amber-300 px-2.5 py-1 bg-white/70 whitespace-nowrap self-start sm:self-auto">
                  100% TRANSIT INSURED
                </span>
              </div>
            </div>

            {/* PROGRESS TIMELINE (5 STAGES) */}
            <div className="border border-black/15 bg-white/40 p-6 sm:p-10">
              <p className="text-[9px] tracking-[0.3em] text-black/40 uppercase font-semibold mb-8">
                LIFETIME ATELIER AUDIT TRAIL
              </p>

              <div className="relative">
                {/* Horizontal Progress bar for desktop */}
                <div className="hidden lg:block absolute top-6 left-12 right-12 h-0.5 bg-black/15 -z-0" />
                <div className="hidden lg:block absolute top-6 left-12 w-3/4 h-0.5 bg-[#161513] -z-0 transition-all duration-700" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                  {/* Step 1 */}
                  <div className="relative flex flex-col items-start lg:items-center text-left lg:text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#161513] text-white z-10 shadow-sm">
                      <CheckCircle2 size={20} strokeWidth={1.4} />
                    </div>
                    <span className="text-[9px] tracking-[0.2em] text-emerald-800 uppercase font-semibold mt-3">
                      COMPLETED
                    </span>
                    <h4 className="font-serif text-base mt-0.5">Order Authorized</h4>
                    <p className="text-[11px] text-black/50 mt-1 leading-4">
                      Payment secured, certificate allocation & insurance policy issued.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex flex-col items-start lg:items-center text-left lg:text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#161513] text-white z-10 shadow-sm">
                      <ShieldCheck size={20} strokeWidth={1.4} />
                    </div>
                    <span className="text-[9px] tracking-[0.2em] text-emerald-800 uppercase font-semibold mt-3">
                      COMPLETED
                    </span>
                    <h4 className="font-serif text-base mt-0.5">BIS Hallmarking</h4>
                    <p className="text-[11px] text-black/50 mt-1 leading-4">
                      Bureau of Indian Standards gold purity laser stamping & gemologist inspection.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex flex-col items-start lg:items-center text-left lg:text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#161513] text-white z-10 shadow-sm">
                      <PackageCheck size={20} strokeWidth={1.4} />
                    </div>
                    <span className="text-[9px] tracking-[0.2em] text-emerald-800 uppercase font-semibold mt-3">
                      COMPLETED
                    </span>
                    <h4 className="font-serif text-base mt-0.5">Tamper-Proof Seal</h4>
                    <p className="text-[11px] text-black/50 mt-1 leading-4">
                      Enclosed in velvet keepsake box with barcode seal & insurance policy.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="relative flex flex-col items-start lg:items-center text-left lg:text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#161513] bg-[#f8f5ef] text-[#161513] z-10 shadow-sm">
                      <Truck size={20} strokeWidth={1.4} className="animate-pulse text-amber-800" />
                    </div>
                    <span className="text-[9px] tracking-[0.2em] text-amber-900 uppercase font-bold mt-3">
                      ACTIVE TRANSIT
                    </span>
                    <h4 className="font-serif text-base mt-0.5">Insured Transit</h4>
                    <p className="text-[11px] text-black/50 mt-1 leading-4">
                      {activeOrder.deliveryMethod.courier} (Air Waybill #SQL-982184-IN).
                    </p>
                  </div>

                  {/* Step 5 */}
                  <div className="relative flex flex-col items-start lg:items-center text-left lg:text-center opacity-50">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/20 bg-white text-black/40 z-10">
                      <KeyRound size={20} strokeWidth={1.4} />
                    </div>
                    <span className="text-[9px] tracking-[0.2em] text-black/40 uppercase font-semibold mt-3">
                      PENDING
                    </span>
                    <h4 className="font-serif text-base mt-0.5">OTP Handover</h4>
                    <p className="text-[11px] text-black/50 mt-1 leading-4">
                      Armed courier delivery strictly to authorized recipient.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* DETAILS GRID: ITEMS & DESTINATION */}
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              {/* LEFT: ENCLOSED PIECES */}
              <div className="border border-black/15 bg-white/40 p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-6">
                  <h3 className="font-serif text-2xl">Consigned Pieces ({activeOrder.items.length})</h3>
                  <span className="text-[9px] tracking-[0.2em] text-black/40 uppercase">
                    IGI & BIS CERTIFIED
                  </span>
                </div>

                <div className="divide-y divide-black/10">
                  {activeOrder.items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}-${item.metal}`}
                      className="py-4 flex items-center gap-4"
                    >
                      <div className="h-20 w-20 flex-shrink-0 bg-[#e8e2d7] overflow-hidden border border-black/5">
                        <SafeImage
                          src={item.product.images[0]}
                          productId={item.product.id}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-[8px] tracking-[0.2em] text-black/40 uppercase">
                          {item.product.category} · {item.product.purity} GOLD
                        </p>
                        <h4 className="font-serif text-lg text-[#161513] truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-black/60 mt-0.5">
                          Selected Metal: {item.metal || item.product.material}{" "}
                          {item.size ? `· Ring Size ${item.size}` : ""}
                        </p>
                        <div className="mt-1 flex items-center gap-3 text-[10px] text-emerald-800">
                          <span>✓ {item.product.hallmark || "BIS 916 Hallmarked"}</span>
                          <span>✓ Gross: {item.product.weight}</span>
                        </div>
                      </div>

                      <div className="text-right whitespace-nowrap">
                        <span className="text-sm font-medium">
                          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                        <p className="text-[9px] text-black/40 mt-0.5">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-black/10 flex items-center justify-between text-xs text-black/60">
                  <span>Total Insured Consignment Value:</span>
                  <span className="font-serif text-xl text-[#161513] font-medium">
                    ₹{activeOrder.total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* RIGHT: DESTINATION & ASSISTANCE */}
              <div className="space-y-6">
                {/* Destination Card */}
                <div className="border border-black/15 bg-white/40 p-6 sm:p-7">
                  <div className="flex items-center gap-2.5 text-[9px] tracking-[0.25em] text-black/40 uppercase font-semibold mb-3">
                    <MapPin size={14} className="text-amber-800" />
                    <span>DELIVERY DESTINATION</span>
                  </div>
                  <h4 className="font-serif text-xl">{activeOrder.customer.fullName}</h4>
                  <p className="text-xs text-black/65 mt-2 leading-5">
                    {activeOrder.customer.address}
                    {activeOrder.customer.landmark ? `, ${activeOrder.customer.landmark}` : ""}
                    <br />
                    {activeOrder.customer.city}, {activeOrder.customer.state} - {activeOrder.customer.pincode}
                  </p>
                  <p className="text-xs text-black/50 mt-3">
                    Recipient Mobile: <strong>{activeOrder.customer.phone}</strong>
                  </p>
                </div>

                {/* Concierge Assistance */}
                <div className="border border-black/15 bg-[#161513] text-white p-6 sm:p-7">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-serif">
                    <Sparkles size={16} />
                    <span>Private Client Support</span>
                  </div>
                  <h4 className="font-serif text-xl mt-2">Need to adjust delivery?</h4>
                  <p className="text-xs text-white/60 mt-1.5 leading-5">
                    To reschedule your armored delivery date or update authorized recipient details, contact our dedicated salon concierge.
                  </p>

                  <div className="mt-5 pt-4 border-t border-white/15 flex flex-col gap-2.5 text-xs">
                    <a
                      href="tel:+919820012345"
                      className="flex items-center gap-2 text-white/80 hover:text-white transition"
                    >
                      <Phone size={13} />
                      <span>Dedicated VIP Line: +91 (022) 6789-0000</span>
                    </a>
                    <a
                      href="mailto:concierge@aurorajewellery.com"
                      className="flex items-center gap-2 text-white/80 hover:text-white transition"
                    >
                      <FileText size={13} />
                      <span>concierge@aurorajewellery.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
