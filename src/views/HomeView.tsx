import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Heart, Sparkles, Shield, Award } from "lucide-react";
import { Link, useRouter } from "../lib/router";
import { products, getProductFallbackImage } from "../lib/products";
import { SafeImage } from "../components/SafeImage";
import { isWishlisted, toggleWishlist, WISHLIST_CHANGE_EVENT } from "../lib/wishlist";
import { AppointmentModal } from "../components/AppointmentModal";

const collections = [
  {
    number: "01",
    title: "Aurora",
    subtitle: "DIAMOND RINGS",
    category: "Rings",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=90",
  },
  {
    number: "02",
    title: "Celeste",
    subtitle: "FINE NECKLACES",
    category: "Necklaces",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1400&q=90",
  },
  {
    number: "03",
    title: "Élan",
    subtitle: "SIGNATURE EARRINGS",
    category: "Earrings",
    image:
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1400&q=90",
  },
];

export const HomeView: React.FC = () => {
  const { navigate } = useRouter();
  const [wishlistMap, setWishlistMap] = useState<Record<string, boolean>>({});
  const [appointmentOpen, setAppointmentOpen] = useState(false);

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

  const handleWishlistToggle = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(id);
  };

  const featuredPieces = products.filter((p) => p.featured).slice(0, 3);

  return (
    <main className="bg-[#f4f1ea] text-[#161513]">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative flex min-h-screen items-end overflow-hidden bg-black text-white pt-24">
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=2400&q=95"
          alt="Aurelia jewellery"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-10 lg:px-12 lg:pb-14">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <p className="mb-6 text-[9px] tracking-[0.4em] text-white/70 uppercase">
                AURORA FINE JEWELLERY / MORE THAN A MOMENT
              </p>

              <h1 className="max-w-5xl font-serif text-[15vw] leading-[0.78] tracking-[-0.055em] sm:text-[12vw] lg:text-[10vw]">
                Timeless
                <br />
                <i>by design.</i>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col items-start lg:items-end"
            >
              <p className="mb-5 max-w-xs text-[11px] leading-6 text-white/70 lg:text-right">
                Fine jewellery created around the beauty of simplicity, craftsmanship, and time. Handcrafted in 18K and 22K gold.
              </p>

              <Link
                href="/products"
                className="group flex items-center gap-8 border-b border-white/40 pb-3 text-[9px] tracking-[0.3em] hover:border-white transition"
              >
                DISCOVER THE COLLECTION
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.2}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </motion.div>
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-white/20 pt-5">
            <span className="text-[8px] tracking-[0.3em] text-white/40">
              SCROLL TO EXPLORE
            </span>

            <ArrowDown size={15} strokeWidth={1} className="animate-bounce text-white/70" />

            <span className="text-[8px] tracking-[0.3em] text-white/40">
              01 / 04
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO / PHILOSOPHY
      ===================================================== */}
      <section className="px-6 py-28 lg:px-12 lg:py-44">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.35fr_1fr]">
          <div>
            <p className="text-[9px] tracking-[0.35em] text-black/40">
              01 — PHILOSOPHY
            </p>
          </div>

          <div>
            <h2 className="max-w-5xl font-serif text-5xl leading-[0.95] tracking-[-0.025em] sm:text-6xl lg:text-[7vw]">
              Jewellery should
              <br />
              <i>say something.</i>
            </h2>

            <div className="mt-12 grid gap-8 border-t border-black/15 pt-7 sm:grid-cols-2">
              <p className="max-w-md text-xs leading-7 text-black/60">
                We believe the most beautiful pieces aren't defined by trends. They're defined by the memories they become part of — heirlooms destined to travel across generations.
              </p>

              <p className="max-w-md text-xs leading-7 text-black/60">
                From the initial hand-drawn sketch to the final master setting in 18K and 22K hallmarked gold, every Aurora piece is created with deliberate intention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          COLLECTIONS
      ===================================================== */}
      <section id="collections" className="px-6 pb-32 lg:px-12 lg:pb-48">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-14 flex items-end justify-between border-b border-black/15 pb-6">
            <div>
              <p className="text-[9px] tracking-[0.35em] text-black/40">
                02 — COLLECTIONS
              </p>
              <h2 className="mt-4 font-serif text-4xl lg:text-5xl">
                The Edit
              </h2>
            </div>

            <Link
              href="/products"
              className="hidden items-center gap-3 text-[9px] tracking-[0.25em] sm:flex hover:text-black/60 transition"
            >
              VIEW ALL PIECES
              <ArrowUpRight size={15} strokeWidth={1.2} />
            </Link>
          </div>

          <div className="grid gap-7 lg:grid-cols-3">
            {collections.map((collection, index) => (
              <div
                key={collection.title}
                onClick={() => navigate(`/products?category=${collection.category}`)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[0.72] overflow-hidden bg-[#ded9cf]">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="h-full w-full object-cover transition duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/15 transition duration-500 group-hover:bg-black/25" />

                  <div className="absolute left-5 top-5 text-white">
                    <span className="text-[9px] tracking-[0.3em]">
                      {collection.number}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                    <div>
                      <p className="text-[8px] tracking-[0.3em] text-white/70 uppercase">
                        {collection.subtitle}
                      </p>
                      <h3 className="mt-2 font-serif text-4xl lg:text-5xl">
                        {collection.title}
                      </h3>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 opacity-0 backdrop-blur-sm transition duration-500 group-hover:opacity-100">
                      <ArrowUpRight size={17} strokeWidth={1} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED PRODUCTS
      ===================================================== */}
      <section className="bg-[#e9e4da] px-6 py-28 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-10 lg:grid-cols-[0.5fr_1fr]">
            <div className="lg:sticky lg:top-32 lg:h-fit">
              <p className="text-[9px] tracking-[0.35em] text-black/40">
                03 — SIGNATURE PIECES
              </p>

              <h2 className="mt-5 max-w-md font-serif text-5xl leading-none lg:text-6xl">
                Pieces worth
                <br />
                <i>remembering.</i>
              </h2>

              <p className="mt-6 max-w-sm text-xs leading-7 text-black/60">
                Certified natural diamonds, hand-picked rubies, and solid gold crafted for life's defining chapters.
              </p>

              <Link
                href="/products"
                className="mt-10 inline-flex items-center gap-4 border-b border-black/30 pb-3 text-[9px] tracking-[0.25em] hover:border-black transition"
              >
                EXPLORE ALL PIECES
                <ArrowUpRight size={15} strokeWidth={1} />
              </Link>
            </div>

            <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2">
              {featuredPieces.map((product, index) => {
                const isSaved = !!wishlistMap[product.id];
                return (
                  <article
                    key={product.id}
                    className={
                      index === 2
                        ? "sm:col-span-2 sm:max-w-[70%] sm:justify-self-center w-full"
                        : "w-full"
                    }
                  >
                    <div className="group relative aspect-square overflow-hidden bg-[#f4f1ea] border border-black/5">
                      <SafeImage
                        src={product.images[0]}
                        productId={product.id}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-1000 group-hover:scale-105"
                      />

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => handleWishlistToggle(e, product.id)}
                        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:bg-white"
                        aria-label="Save piece"
                      >
                        <Heart
                          size={16}
                          strokeWidth={1.2}
                          className={isSaved ? "fill-red-600 text-red-600" : "text-black/70"}
                        />
                      </button>

                      <Link
                        href={`/products/${product.id}`}
                        className="absolute bottom-4 left-4 right-4 bg-[#161513] py-4 text-center text-[9px] tracking-[0.25em] text-white opacity-0 transition duration-300 group-hover:opacity-100 shadow-md"
                      >
                        VIEW PIECE
                      </Link>
                    </div>

                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[8px] tracking-[0.25em] text-black/50 uppercase">
                          {product.purity} · {product.material}
                        </p>

                        <h3 className="mt-2 font-serif text-2xl">
                          <Link href={`/products/${product.id}`} className="hover:underline">
                            {product.name}
                          </Link>
                        </h3>
                      </div>

                      <span className="pt-2 text-sm font-medium">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STORY & CRAFTSMANSHIP
      ===================================================== */}
      <section id="story" className="px-6 py-28 lg:px-12 lg:py-48">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1600&q=90"
                alt="Jewellery craftsmanship"
                className="aspect-[0.85] w-full object-cover"
              />

              <div className="absolute -bottom-7 -right-4 hidden bg-[#161513] px-7 py-6 text-white sm:block shadow-xl">
                <p className="text-[8px] tracking-[0.25em] text-white/40">
                  EST.
                </p>
                <p className="mt-1 font-serif text-3xl">
                  2026
                </p>
              </div>
            </div>

            <div className="max-w-xl lg:pl-12">
              <p className="text-[9px] tracking-[0.35em] text-black/40">
                04 — THE AURORA STORY
              </p>

              <h2 className="mt-6 font-serif text-6xl leading-[0.9] tracking-[-0.03em]">
                Made by
                <br />
                <i>hand.</i>
                <br />
                Made to last.
              </h2>

              <p className="mt-9 text-xs leading-8 text-black/60">
                Aurora brings together centuries of Indian artisanal lineage and contemporary fine-jewellery architecture. Every piece is handcrafted by master karigars with ethical sourcing, BIS 916 hallmarked pure gold, and conflict-free natural diamonds.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-6">
                <Link
                  href="/story"
                  className="group flex items-center gap-5 border-b border-black/25 pb-3 text-[9px] tracking-[0.25em] hover:border-black transition"
                >
                  DISCOVER OUR STORY
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>

                <button
                  onClick={() => setAppointmentOpen(true)}
                  className="text-[9px] tracking-[0.25em] text-black/60 hover:text-black border-b border-transparent hover:border-black pb-3 transition"
                >
                  BOOK ATELIER VISIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AppointmentModal isOpen={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
    </main>
  );
};
