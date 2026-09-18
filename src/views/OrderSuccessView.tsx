import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  Printer,
  ShoppingBag,
  Truck,
  ShieldCheck,
  ArrowRight,
  PackageCheck,
  Share2,
} from "lucide-react";
import { getOrderById, Order, getOrders } from "../lib/orders";
import { Link, useRouter } from "../lib/router";
import { SafeImage } from "../components/SafeImage";

type OrderSuccessViewProps = {
  orderId?: string;
};

export const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({ orderId }) => {
  const { navigate } = useRouter();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      const found = getOrderById(orderId);
      if (found) {
        setOrder(found);
      } else {
        const latest = getOrders()[0];
        if (latest) setOrder(latest);
      }
    } else {
      const latest = getOrders()[0];
      if (latest) setOrder(latest);
    }
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <main className="min-h-screen bg-[#f8f5ef] text-[#161513] pt-32 pb-24 px-6 text-center">
        <h1 className="font-serif text-3xl">Order Confirmation</h1>
        <p className="mt-3 text-xs text-black/50">Looking up order records...</p>
        <Link
          href="/products"
          className="mt-6 inline-flex bg-[#161513] text-white px-7 py-3 text-[9px] tracking-[0.2em] uppercase"
        >
          VIEW COLLECTIONS
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#161513] pt-28 pb-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        {/* SUCCESS HERO BANNER */}
        <div className="border border-black/15 bg-white/50 p-8 sm:p-12 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#161513] text-white mb-6">
            <CheckCircle2 size={32} strokeWidth={1.2} />
          </div>

          <p className="text-[9px] tracking-[0.35em] text-black/40 uppercase">
            ATELIER ORDER CONFIRMED
          </p>

          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            Thank you, {order.customer.fullName}.
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-black/60 max-w-lg mx-auto leading-6">
            Your jewellery order has been authorized and dispatched to our Master Craftsmen for final inspection, BIS hallmarking verification, and insured armored packing.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 border border-black/20 bg-white/70 px-5 py-2.5 text-xs">
            <span className="text-black/50 uppercase text-[9px] tracking-[0.2em]">Order Reference:</span>
            <span className="font-serif text-base font-semibold tracking-wider">{order.id}</span>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/track?id=${order.id}`}
              className="flex items-center gap-2 border border-black/20 bg-white px-5 py-3 text-[9px] tracking-[0.2em] uppercase hover:border-black transition font-medium"
            >
              <Truck size={14} className="text-amber-800" />
              <span>LIVE TRACK CONSIGNMENT</span>
            </Link>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 border border-black/20 bg-white px-5 py-3 text-[9px] tracking-[0.2em] uppercase hover:border-black transition"
            >
              <Printer size={14} />
              <span>PRINT TAX INVOICE</span>
            </button>

            <Link
              href="/products"
              className="flex items-center gap-2 bg-[#161513] text-white px-6 py-3 text-[9px] tracking-[0.2em] uppercase hover:bg-[#292724] transition shadow-md"
            >
              <span>CONTINUE EXPLORING</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* ORDER SPECS & TIMELINE */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          {/* LEFT: ITEMS & LOGISTICS TIMELINE */}
          <div className="space-y-8">
            {/* Delivery Status Timeline */}
            <div className="border border-black/10 bg-white/40 p-6 sm:p-8">
              <h2 className="font-serif text-2xl mb-6">Insured Transit Protocol</h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-black/10">
                <div className="flex gap-3">
                  <PackageCheck size={20} className="text-amber-800 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-serif font-medium">1. Atelier Verification</p>
                    <p className="text-[10px] text-black/50 mt-1">Carat weight and laser hallmark verification completed.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Truck size={20} className="text-amber-800 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-serif font-medium">2. Armored Transit</p>
                    <p className="text-[10px] text-black/50 mt-1">
                      {order.deliveryMethod.courier} with GPS tracking.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <ShieldCheck size={20} className="text-amber-800 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-serif font-medium">3. Private OTP Handover</p>
                    <p className="text-[10px] text-black/50 mt-1">Strict identity validation at destination.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3">
                <div>
                  <span className="text-black/50 uppercase text-[9px] tracking-[0.15em]">Estimated Handover:</span>
                  <p className="font-serif text-base mt-0.5">{order.deliveryMethod.estimatedDelivery}</p>
                </div>
                <div>
                  <span className="text-black/50 uppercase text-[9px] tracking-[0.15em]">Notification Channel:</span>
                  <p className="mt-0.5 font-medium">{order.customer.phone} / {order.customer.email}</p>
                </div>
              </div>
            </div>

            {/* Itemized Order Details */}
            <div className="border border-black/10 bg-white/40 p-6 sm:p-8">
              <h2 className="font-serif text-2xl mb-6">Enclosed Heirloom Pieces</h2>

              <div className="divide-y divide-black/10">
                {order.items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.metal}`}
                    className="py-4 flex items-center gap-4"
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
                      <h4 className="font-serif text-base truncate text-[#161513]">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-black/50 mt-0.5">
                        Quantity: {item.quantity} {item.size ? `· Ring Size: ${item.size}` : ""} · Hallmark: {item.product.purity}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                      <span className="text-[8px] text-emerald-800 uppercase tracking-wider">
                        CERTIFICATE ENCLOSED
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: DESTINATION & FINANCIAL RECEIPT */}
          <aside className="border border-black/10 bg-white/40 p-6 sm:p-8 h-fit space-y-6">
            <div>
              <p className="text-[9px] tracking-[0.3em] text-black/40 uppercase font-medium">
                DELIVERY DESTINATION
              </p>
              <h3 className="font-serif text-xl mt-2">{order.customer.fullName}</h3>
              <p className="text-xs text-black/60 mt-1 leading-5">
                {order.customer.address}
                <br />
                {order.customer.landmark ? `${order.customer.landmark}, ` : ""}
                {order.customer.city}, {order.customer.state} - {order.customer.pincode}
                <br />
                Phone: {order.customer.phone}
              </p>
            </div>

            <div className="border-t border-black/10 pt-5">
              <p className="text-[9px] tracking-[0.3em] text-black/40 uppercase font-medium">
                PAYMENT INFORMATION
              </p>
              <p className="text-xs font-serif text-base mt-2">{order.paymentMethod.label}</p>
              <p className="text-[10px] text-black/50 mt-0.5">Transaction ID: {order.paymentMethod.reference}</p>
              <span className="mt-2 inline-flex items-center text-[9px] tracking-[0.1em] text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                PAID & INSURED
              </span>
            </div>

            <div className="border-t border-black/10 pt-5 space-y-3 text-xs">
              <div className="flex justify-between text-black/60">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-black/60">
                <span>Insured Armored Courier</span>
                <span className="text-emerald-800 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-black/60">
                <span>Applicable Taxes (GST 3%)</span>
                <span>Included</span>
              </div>

              <div className="flex items-baseline justify-between border-t border-black/10 pt-4 text-base font-serif">
                <span>Total Paid</span>
                <span className="text-2xl font-normal">₹{order.total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="border-t border-black/10 pt-5 text-[9px] text-black/50 leading-5 space-y-1">
              <p>• Formal physical tax invoice and warranty card included in tamper-proof seal.</p>
              <p>• For queries or delivery rescheduling, reach our atelier concierge at concierge@aureliajewellery.com.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};
