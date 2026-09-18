import React, { useState, useEffect } from "react";
import { Search, ShoppingBag, Heart, Menu, X, Calendar, Truck } from "lucide-react";
import { Link, useRouter } from "../lib/router";
import { getCart, CART_CHANGE_EVENT } from "../lib/cart";
import { getWishlist, WISHLIST_CHANGE_EVENT } from "../lib/wishlist";
import { SearchModal } from "./SearchModal";
import { AppointmentModal } from "./AppointmentModal";
import { AuroraLogo } from "./AuroraLogo";

export const Navigation: React.FC = () => {
  const { path } = useRouter();
  const isHomePage = path === "/";
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateCounts = () => {
      const cartItems = getCart();
      const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(count);
      setWishlistCount(getWishlist().length);
    };

    updateCounts();

    window.addEventListener(CART_CHANGE_EVENT, updateCounts);
    window.addEventListener(WISHLIST_CHANGE_EVENT, updateCounts);
    window.addEventListener("storage", updateCounts);

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener(CART_CHANGE_EVENT, updateCounts);
      window.removeEventListener(WISHLIST_CHANGE_EVENT, updateCounts);
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Determine if header should be dark text or white text
  const isTransparent = isHomePage && !scrolled;
  const textColor = isTransparent ? "text-white" : "text-[#161513]";
  const bgStyle = isTransparent
    ? "bg-transparent"
    : "bg-[#f8f5ef]/95 backdrop-blur-md border-b border-black/10 shadow-xs";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgStyle} ${textColor}`}
      >
        <div className="mx-auto grid grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto_1fr] h-20 sm:h-24 max-w-[1600px] items-center px-3 sm:px-6 lg:px-12 gap-2 sm:gap-4 lg:gap-8">
          {/* Left Actions: Search & Appointments */}
          <div className="flex items-center gap-3 sm:gap-6 justify-start min-w-0">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 transition hover:opacity-75 focus:outline-none p-1 sm:p-0"
              aria-label="Search collection"
            >
              <Search size={18} strokeWidth={1.2} />
              <span className="hidden text-[9px] tracking-[0.3em] lg:block">
                SEARCH
              </span>
            </button>

            <button
              onClick={() => setAppointmentOpen(true)}
              className="hidden xl:flex items-center gap-2 text-[9px] tracking-[0.25em] transition hover:opacity-75"
            >
              <Calendar size={14} strokeWidth={1.2} />
              <span>APPOINTMENTS</span>
            </button>
          </div>

          {/* Center: Luxury Aurora Logo (Isolated Grid Column: mathematically prevented from any overlap) */}
          <div className="flex items-center justify-center min-w-0 px-1 sm:px-4">
            <Link
              href="/"
              className="text-center group cursor-pointer block"
              aria-label="AURORA Fine Jewellery Home"
            >
              <AuroraLogo variant="header" isLightText={isTransparent} />
            </Link>
          </div>

          {/* Right Actions: Navigation Links & Bag */}
          <div className="flex items-center gap-2 sm:gap-3.5 md:gap-5 lg:gap-7 justify-end min-w-0">
            <nav className="hidden items-center gap-6 xl:gap-7 lg:flex">
              <Link
                href="/products"
                className="text-[9px] tracking-[0.25em] transition hover:opacity-60 whitespace-nowrap"
              >
                COLLECTIONS
              </Link>

              <Link
                href="/story"
                className="text-[9px] tracking-[0.25em] transition hover:opacity-60 whitespace-nowrap"
              >
                OUR STORY
              </Link>

              <Link
                href="/track"
                className="flex items-center gap-1.5 text-[9px] tracking-[0.25em] transition hover:opacity-60 whitespace-nowrap"
              >
                <Truck size={12} strokeWidth={1.3} className="text-[#c5a059]" />
                <span>TRACK ORDER</span>
              </Link>
            </nav>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="relative p-1 sm:p-1.5 transition hover:opacity-75 flex-shrink-0"
              aria-label="Wishlist"
            >
              <Heart size={18} strokeWidth={1.2} />
              {wishlistCount > 0 && (
                <span
                  className={`absolute -right-1 -top-1 sm:-right-1.5 sm:-top-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-medium ${
                    isTransparent ? "bg-white text-black" : "bg-[#161513] text-white"
                  }`}
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag */}
            <Link
              href="/cart"
              className="relative p-1 sm:p-1.5 transition hover:opacity-75 flex-shrink-0"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={19} strokeWidth={1.2} />
              {cartCount > 0 && (
                <span
                  className={`absolute -right-1 -top-1 sm:-right-1.5 sm:-top-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-medium ${
                    isTransparent ? "bg-white text-black" : "bg-[#161513] text-white"
                  }`}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1 sm:p-1.5 hover:opacity-75 flex-shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#f8f5ef] text-[#161513] border-b border-black/10 px-6 py-6 shadow-xl space-y-4">
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[11px] tracking-[0.25em] uppercase py-2 border-b border-black/5"
            >
              COLLECTIONS & PIECES
            </Link>
            <Link
              href="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase py-2 border-b border-black/5"
            >
              <Truck size={14} className="text-amber-800" />
              <span>TRACK ORDER STATUS</span>
            </Link>
            <Link
              href="/story"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[11px] tracking-[0.25em] uppercase py-2 border-b border-black/5"
            >
              OUR CRAFTSMANSHIP & STORY
            </Link>
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[11px] tracking-[0.25em] uppercase py-2 border-b border-black/5"
            >
              SHOPPING BAG ({cartCount})
            </Link>
            <Link
              href="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[11px] tracking-[0.25em] uppercase py-2 border-b border-black/5"
            >
              SAVED PIECES ({wishlistCount})
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setAppointmentOpen(true);
              }}
              className="block w-full text-left text-[11px] tracking-[0.25em] uppercase py-2 text-amber-900 font-semibold"
            >
              BOOK PRIVATE APPOINTMENT
            </button>
          </div>
        )}
      </header>

      {/* Global Modals */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <AppointmentModal isOpen={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
    </>
  );
};
