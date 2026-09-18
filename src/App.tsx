import React from "react";
import { RouterProvider, useRouter } from "./lib/router";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { HomeView } from "./views/HomeView";
import { ProductsView } from "./views/ProductsView";
import { ProductDetailView } from "./views/ProductDetailView";
import { CartView } from "./views/CartView";
import { CheckoutView } from "./views/CheckoutView";
import { OrderSuccessView } from "./views/OrderSuccessView";
import { StoryView } from "./views/StoryView";
import { WishlistView } from "./views/WishlistView";
import { OrderTrackingView } from "./views/OrderTrackingView";

function AppContent() {
  const { path, params } = useRouter();

  let CurrentView = <HomeView />;

  if (path === "/" || path === "") {
    CurrentView = <HomeView />;
  } else if (path.startsWith("/products/")) {
    CurrentView = <ProductDetailView productId={params.id || ""} />;
  } else if (path.startsWith("/products")) {
    CurrentView = <ProductsView />;
  } else if (path.startsWith("/cart")) {
    CurrentView = <CartView />;
  } else if (path.startsWith("/checkout")) {
    CurrentView = <CheckoutView />;
  } else if (path.startsWith("/order-success")) {
    CurrentView = <OrderSuccessView orderId={params.id} />;
  } else if (path.startsWith("/track") || path.startsWith("/track-order")) {
    CurrentView = <OrderTrackingView initialOrderId={params.id} />;
  } else if (path.startsWith("/story")) {
    CurrentView = <StoryView />;
  } else if (path.startsWith("/wishlist")) {
    CurrentView = <WishlistView />;
  } else {
    // 404 fallback
    CurrentView = (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f8f5ef] text-[#161513] pt-32 px-6">
        <div className="text-center max-w-md">
          <p className="text-[9px] tracking-[0.35em] text-black/40 uppercase">AURELIA FINE JEWELLERY</p>
          <h1 className="mt-4 font-serif text-5xl">Page Not Found</h1>
          <p className="mt-3 text-xs text-black/50 leading-6">
            The page you are looking for does not exist or has been relocated within our atelier archives.
          </p>
          <a
            href="/"
            className="mt-6 inline-flex bg-[#161513] text-white px-7 py-3.5 text-[9px] tracking-[0.25em] uppercase hover:bg-[#292724] transition"
          >
            RETURN HOME
          </a>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f5ef] text-[#161513] selection:bg-amber-100 selection:text-amber-900">
      <Navigation />
      <div className="flex-1">{CurrentView}</div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
