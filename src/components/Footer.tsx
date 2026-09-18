import React, { useState } from "react";
import { Link } from "../lib/router";
import { ShieldCheck, Award, ArrowUpRight, Check, Truck } from "lucide-react";
import { AppointmentModal } from "./AppointmentModal";
import { AuroraLogo } from "./AuroraLogo";

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <>
      <footer className="bg-[#161513] px-6 py-20 text-white lg:px-12 border-t border-white/10">
        <div className="mx-auto max-w-[1500px]">
          {/* Hallmarking Trust Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16 mb-16 border-b border-white/10 text-white/80">
            <div className="flex items-center gap-4">
              <ShieldCheck size={28} strokeWidth={1.2} className="text-[#c5a059]" />
              <div>
                <p className="text-xs font-serif tracking-wider text-white">100% BIS Hallmarked Gold</p>
                <p className="text-[10px] text-white/50 mt-0.5">Every piece carries government hallmarked purity assurance.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Award size={28} strokeWidth={1.2} className="text-[#c5a059]" />
              <div>
                <p className="text-xs font-serif tracking-wider text-white">Certified Natural Diamonds</p>
                <p className="text-[10px] text-white/50 mt-0.5">Individually graded with authentic IGI and SGL certificates.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-7 w-7 rounded-full border border-[#c5a059]/80 flex items-center justify-center text-[#c5a059] text-xs font-serif">
                ₹
              </div>
              <div>
                <p className="text-xs font-serif tracking-wider text-white">Transparent Value Guarantee</p>
                <p className="text-[10px] text-white/50 mt-0.5">Complimentary insured transit with zero hidden charges.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            {/* Brand column with logo */}
            <div>
              <div className="flex flex-col items-start">
                <AuroraLogo variant="header" isLightText={true} />
                <div className="w-10 h-[1px] bg-[#c5a059] my-3" />
                <p className="text-[8px] tracking-[0.35em] uppercase text-[#c5a059] font-medium">
                  MORE THAN A MOMENT
                </p>
              </div>

              <p className="mt-5 max-w-sm text-xs leading-7 text-white/50">
                Fine jewellery for the moments that become part of your story. Handcrafted in 18K and 22K solid gold with ethical diamonds and natural gemstones.
              </p>

              {/* Newsletter Subscription */}
              <div className="mt-8 max-w-sm">
                <p className="text-[8px] tracking-[0.3em] uppercase text-white/40 mb-3">
                  Privilege Club & Private Previews
                </p>
                {subscribed ? (
                  <div className="flex items-center gap-2 text-xs text-amber-300 py-2">
                    <Check size={14} /> You are subscribed to private atelier releases.
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex border-b border-white/30 pb-2">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-transparent text-xs text-white placeholder:text-white/30 outline-none"
                    />
                    <button
                      type="submit"
                      className="text-[9px] tracking-[0.25em] text-white/70 hover:text-white uppercase transition pl-4 whitespace-nowrap"
                    >
                      JOIN
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div>
              <p className="text-[8px] tracking-[0.3em] text-white/40 uppercase">
                EXPLORE
              </p>

              <div className="mt-6 space-y-3.5 text-xs text-white/60">
                <div>
                  <Link href="/products" className="hover:text-white transition">Collections</Link>
                </div>
                <div>
                  <Link href="/products?category=Rings" className="hover:text-white transition">Diamond Rings</Link>
                </div>
                <div>
                  <Link href="/products?category=Necklaces" className="hover:text-white transition">Necklaces & Pendants</Link>
                </div>
                <div>
                  <Link href="/products?category=Bridal" className="hover:text-white transition">Imperial Bridal Suite</Link>
                </div>
                <div>
                  <Link href="/products?category=Bangles" className="hover:text-white transition">Heritage Bangles</Link>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[8px] tracking-[0.3em] text-white/40 uppercase">
                ATELIER
              </p>

              <div className="mt-6 space-y-3.5 text-xs text-white/60">
                <div>
                  <Link href="/story" className="hover:text-white transition">Our Story</Link>
                </div>
                <div>
                  <Link href="/story#craftsmanship" className="hover:text-white transition">Artisan Craftsmanship</Link>
                </div>
                <div>
                  <Link href="/story#hallmark" className="hover:text-white transition">Hallmarking Standard</Link>
                </div>
                <div>
                  <button
                    onClick={() => setAppointmentOpen(true)}
                    className="hover:text-white text-left transition"
                  >
                    Private Salons & Atelier
                  </button>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[8px] tracking-[0.3em] text-white/40 uppercase">
                CLIENT SERVICES
              </p>

              <div className="mt-6 space-y-3.5 text-xs text-white/60">
                <div>
                  <Link
                    href="/track"
                    className="hover:text-white transition flex items-center gap-1.5 text-[#c5a059] font-medium"
                  >
                    <Truck size={13} strokeWidth={1.4} />
                    <span>Track Your Order</span>
                  </Link>
                </div>
                <div>
                  <Link href="/story#shipping" className="hover:text-white transition">Insured Shipping Policy</Link>
                </div>
                <div>
                  <Link href="/story#returns" className="hover:text-white transition">15-Day Complimentary Returns</Link>
                </div>
                <div>
                  <Link href="/story#care" className="hover:text-white transition">Jewellery Care Guide</Link>
                </div>
                <div>
                  <button
                    onClick={() => setAppointmentOpen(true)}
                    className="hover:text-white text-left transition flex items-center gap-1.5 text-amber-300/90"
                  >
                    <span>Book an Appointment</span>
                    <ArrowUpRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 flex flex-col justify-between gap-5 border-t border-white/10 pt-6 text-[8px] tracking-[0.2em] text-white/35 sm:flex-row">
            <span>© 2026 AURORA FINE JEWELLERY. ALL RIGHTS RESERVED.</span>
            <span className="flex items-center gap-6">
              <span>GOVERNMENT BIS 916 HALLMARKED</span>
              <span className="text-[#c5a059]/80 font-medium">MORE THAN A MOMENT</span>
            </span>
          </div>
        </div>
      </footer>

      <AppointmentModal isOpen={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
    </>
  );
};
