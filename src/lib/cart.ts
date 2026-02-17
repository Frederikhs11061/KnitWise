/**
 * Cart management utilities
 * Handles cart state and operations
 */

import { getPatternBySlug, type Pattern } from "./patterns";

export interface CartItem {
  patternSlug: string;
  quantity: number;
}

export interface CartItemWithDetails extends CartItem {
  pattern: Pattern;
}

/**
 * Get cart from localStorage
 */
export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  
  try {
    const cartJson = localStorage.getItem("stitch-of-care-cart");
    if (!cartJson) return [];
    return JSON.parse(cartJson) as CartItem[];
  } catch {
    return [];
  }
}

/**
 * Save cart to localStorage
 */
export function saveCart(cart: CartItem[]): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem("stitch-of-care-cart", JSON.stringify(cart));
    // Dispatch custom event for cart updates
    window.dispatchEvent(new CustomEvent("cart-updated"));
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
}

/**
 * Add item to cart
 */
export function addToCart(patternSlug: string, quantity: number = 1): void {
  const cart = getCart();
  const existingItem = cart.find((item) => item.patternSlug === patternSlug);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ patternSlug, quantity });
  }

  saveCart(cart);
}

/**
 * Remove item from cart
 */
export function removeFromCart(patternSlug: string): void {
  const cart = getCart().filter((item) => item.patternSlug !== patternSlug);
  saveCart(cart);
}

/**
 * Update item quantity in cart
 */
export function updateCartItem(
  patternSlug: string,
  quantity: number
): void {
  if (quantity <= 0) {
    removeFromCart(patternSlug);
    return;
  }

  const cart = getCart();
  const item = cart.find((item) => item.patternSlug === patternSlug);
  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
}

/**
 * Clear entire cart
 */
export function clearCart(): void {
  saveCart([]);
}

/**
 * Get cart items with pattern details
 */
export function getCartItemsWithDetails(): CartItemWithDetails[] {
  const cart = getCart();
  return cart
    .map((item) => {
      const pattern = getPatternBySlug(item.patternSlug);
      if (!pattern) return null;
      return { ...item, pattern };
    })
    .filter((item): item is CartItemWithDetails => item !== null);
}

/**
 * Get total cart value
 */
export function getCartTotal(): number {
  const items = getCartItemsWithDetails();
  return items.reduce((total, item) => total + item.pattern.price * item.quantity, 0);
}

/**
 * Get total number of items in cart
 */
export function getCartItemCount(): number {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}
