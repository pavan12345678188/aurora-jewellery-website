import React, { useState } from "react";
import { ShieldCheck, Award, Sparkles, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Link } from "../lib/router";
import { AppointmentModal } from "../components/AppointmentModal";

export const StoryView: React.FC = () => {
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#161513] pt-28 pb-24">
      {/* STORY HERO */}
      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 py-12">
        <p className="text-[10px] tracking-[0.35em] text-black/40 uppercase">
          THE AURELIA ATELIER · EST. 2026
        </p>

        <h1 className="mt-4 font-serif text-5xl sm:text-7xl lg:text-[6.5vw] leading-[0.95] max-w-5xl">
          Crafted by hand.
          <br />
          <i>Destined for generations.</i>
        </h1>

        <p className="mt-8 max-w-2xl text-sm sm:text-base leading-8 text-black/60">
          Aurelia was born from an unyielding devotion to slow, architectural fine jewellery. In an age of mass-stamped production, we practice the venerable discipline of hand-sculpted gold, rare natural diamonds, and historic Indian karigari.
        </p>
      </section>

      {/* VISUAL ATELIER FEATURE */}
      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 my-12">
        <div className="relative aspect-[21/9] min-h-[360px] overflow-hidden bg-[#e8e2d7] border border-black/10">
          <img
            src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=2400&q=95"
            alt="Artisan gold jewellery crafting"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute bottom-8 left-8 right-8 text-white max-w-xl">
            <span className="text-[8px] tracking-[0.3em] uppercase text-white/80">HAND-SET SOLITAIRES & POLKI</span>
            <h3 className="font-serif text-3xl sm:text-4xl mt-1">Every millimeter sculpted with intention.</h3>
          </div>
        </div>
      </section>

      {/* PILLARS OF CRAFTSMANSHIP */}
      <section id="craftsmanship" className="mx-auto max-w-[1500px] px-6 lg:px-12 py-16">
        <div className="border-b border-black/10 pb-8 mb-12">
          <p className="text-[9px] tracking-[0.3em] text-black/40 uppercase">01 — ARTISAN EXCELLENCE</p>
          <h2 className="mt-2 font-serif text-4xl">The Atelier Standard</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="border-t border-black/15 pt-6">
            <span className="text-xs font-serif text-black/40">01</span>
            <h3 className="font-serif text-2xl mt-2">Noble Metals & Purity</h3>
            <p className="mt-3 text-xs leading-6 text-black/60">
              We exclusively forge in 18K and 22K solid gold, individually stamped with government BIS 916 and 750 hallmarks. We never use thin plating or hollow shells.
            </p>
          </div>

          <div className="border-t border-black/15 pt-6">
            <span className="text-xs font-serif text-black/40">02</span>
            <h3 className="font-serif text-2xl mt-2">Ethical Natural Diamonds</h3>
            <p className="mt-3 text-xs leading-6 text-black/60">
              Every diamond is conflict-free, adhering strictly to the Kimberley Process. Each brilliant cut is hand-matched for precise fire, scintillation, and symmetry.
            </p>
          </div>

          <div className="border-t border-black/15 pt-6">
            <span className="text-xs font-serif text-black/40">03</span>
            <h3 className="font-serif text-2xl mt-2">Ergonomic Architecture</h3>
            <p className="mt-3 text-xs leading-6 text-black/60">
              Fine jewellery must live comfortably against the skin. From comfort-fit ring shanks to silk-smooth necklace links, touch is as important as sight.
            </p>
          </div>
        </div>
      </section>

      {/* HALLMARKING EXPLAINED */}
      <section id="hallmark" className="bg-[#eee9df] py-20 px-6 lg:px-12 my-12 border-y border-black/10">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[9px] tracking-[0.3em] text-black/40 uppercase">02 — CERTIFICATION</p>
              <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Government BIS 916 Guarantee</h2>
              <p className="mt-6 text-xs sm:text-sm leading-7 text-black/65">
                The Bureau of Indian Standards (BIS) hallmark is the definitive certification of gold purity in India. Every single piece of Aurelia jewellery bears four laser markings:
              </p>

              <div className="mt-8 space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-amber-800 mt-0.5" />
                  <div>
                    <strong>BIS Triangular Logo:</strong> Official mark of national purity conformity.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-amber-800 mt-0.5" />
                  <div>
                    <strong>Purity in Carat and Fineness:</strong> '22K916' (91.6% pure gold) or '18K750' (75% pure gold).
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-amber-800 mt-0.5" />
                  <div>
                    <strong>6-Digit Alphanumeric HUID:</strong> Unique Hallmark Unique Identification code for lifetime traceability.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/60 border border-black/10 p-8 sm:p-10 space-y-6">
              <h3 className="font-serif text-2xl">Diamond Grading Standards</h3>
              <p className="text-xs leading-6 text-black/60">
                Solitaires in our Aurora and Celeste collections are accompanied by independent laboratory certificates from the International Gemological Institute (IGI) or Gemological Institute of America (GIA), certifying Cut, Clarity (VVS-VS), Color (E-F), and Carat Weight.
              </p>

              <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                <span className="text-[9px] tracking-[0.2em] uppercase text-black/40 font-medium">AUTHENTICITY ASSURED</span>
                <span className="text-xs font-serif text-amber-900">100% Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JEWELLERY CARE & HANDLING */}
      <section id="care" className="mx-auto max-w-[1500px] px-6 lg:px-12 py-16">
        <div className="border-b border-black/10 pb-8 mb-12">
          <p className="text-[9px] tracking-[0.3em] text-black/40 uppercase">03 — PRESERVATION</p>
          <h2 className="mt-2 font-serif text-4xl">Jewellery Care Guide</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs leading-6 text-black/60">
          <div className="border border-black/10 p-6 bg-white/30">
            <h4 className="font-serif text-lg text-[#161513] mb-2">Storage</h4>
            <p>Store each piece individually in its Aurelia velvet pouch to prevent gemstones from scratching adjoining gold surfaces.</p>
          </div>
          <div className="border border-black/10 p-6 bg-white/30">
            <h4 className="font-serif text-lg text-[#161513] mb-2">Chemicals</h4>
            <p>Avoid contact with perfumes, hairsprays, chlorines, and detergents. Put your fine jewellery on last when dressing.</p>
          </div>
          <div className="border border-black/10 p-6 bg-white/30">
            <h4 className="font-serif text-lg text-[#161513] mb-2">Gentle Cleaning</h4>
            <p>Clean with warm water, mild soap, and a soft-bristled brush. Pat dry with a lint-free microfiber cloth.</p>
          </div>
          <div className="border border-black/10 p-6 bg-white/30">
            <h4 className="font-serif text-lg text-[#161513] mb-2">Annual Spa</h4>
            <p>We offer complimentary annual cleaning, prong inspection, and rhodium polishing at all Aurelia private salons.</p>
          </div>
        </div>
      </section>

      {/* BOOK APPOINTMENT CALLOUT */}
      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 mt-12">
        <div className="bg-[#161513] text-white p-10 sm:p-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-white/50">BESPOKE COMMISSIONS & PRIVATE SALONS</p>
            <h3 className="font-serif text-3xl sm:text-4xl mt-2">Experience Aurelia in person.</h3>
            <p className="mt-3 text-xs text-white/60 max-w-lg leading-6">
              Book a private appointment at our Mumbai, Delhi, or Bengaluru salons, or consult our Senior Jewellery Specialist virtually from anywhere in the world.
            </p>
          </div>

          <button
            onClick={() => setAppointmentOpen(true)}
            className="bg-white text-[#161513] px-8 py-4 text-[9px] tracking-[0.25em] uppercase hover:bg-amber-100 transition whitespace-nowrap"
          >
            SCHEDULE CONSULTATION
          </button>
        </div>
      </section>

      <AppointmentModal isOpen={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
    </main>
  );
};
