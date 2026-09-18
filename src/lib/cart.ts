import { JewelleryProduct } from "./products";

export type CartItem = {
  product: JewelleryProduct;
  quantity: number;
  size?: string;
  metal?: string;
};

const CART_KEY = "aurelia-cart";
export const CART_CHANGE_EVENT = "aurelia_cart_updated";

function notifyCartChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CART_CHANGE_EVENT));
  }
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = localStorage.getItem(CART_KEY);
    if (!saved) {
      return [];
    }
    return JSON.parse(saved) as CartItem[];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(CART_KEY, JSON.stringify(items));
  notifyCartChange();
}

export function addToCart(item: CartItem) {
  const cart = getCart();

  const existingIndex = cart.findIndex(
    (cartItem) =>
      cartItem.product.id === item.product.id &&
      cartItem.size === item.size &&
      cartItem.metal === item.metal
  );

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCart(cart);
}

export function removeFromCart(
  productId: string,
  size?: string,
  metal?: string
) {
  const cart = getCart().filter(
    (item) =>
      !(
        item.product.id === productId &&
        item.size === size &&
        item.metal === metal
      )
  );

  saveCart(cart);
}

export function updateCartQuantity(
  productId: string,
  quantity: number,
  size?: string,
  metal?: string
) {
  const cart = getCart();

  const item = cart.find(
    (cartItem) =>
      cartItem.product.id === productId &&
      cartItem.size === size &&
      cartItem.metal === metal
  );

  if (!item) {
    return;
  }

  if (quantity <= 0) {
    removeFromCart(productId, size, metal);
    return;
  }

  item.quantity = quantity;
  saveCart(cart);
}

export function clearCart() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(CART_KEY);
  notifyCartChange();
}
