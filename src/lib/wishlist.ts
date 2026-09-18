const WISHLIST_KEY = "aurelia-wishlist";
export const WISHLIST_CHANGE_EVENT = "aurelia_wishlist_updated";

function notifyWishlistChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(WISHLIST_CHANGE_EVENT));
  }
}

export function getWishlist(): string[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const saved = localStorage.getItem(WISHLIST_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function isWishlisted(productId: string): boolean {
  return getWishlist().includes(productId);
}

export function toggleWishlist(productId: string): boolean {
  const current = getWishlist();
  let updated: string[];
  const exists = current.includes(productId);
  if (exists) {
    updated = current.filter((id) => id !== productId);
  } else {
    updated = [...current, productId];
  }
  if (typeof window !== "undefined") {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
    notifyWishlistChange();
  }
  return !exists;
}
