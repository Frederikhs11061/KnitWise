"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  getCartItemsWithDetails,
  getCartTotal,
  updateCartItem,
  removeFromCart,
  clearCart,
  type CartItemWithDetails,
} from "@/lib/cart";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemWithDetails[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCart = () => {
      const items = getCartItemsWithDetails();
      setCartItems(items);
      setTotal(getCartTotal());
    };

    loadCart();

    // Listen for cart updates
    window.addEventListener("cart-updated", loadCart);
    return () => window.removeEventListener("cart-updated", loadCart);
  }, []);

  const handleQuantityChange = (slug: string, quantity: number) => {
    updateCartItem(slug, quantity);
    const items = getCartItemsWithDetails();
    setCartItems(items);
    setTotal(getCartTotal());
  };

  const handleRemove = (slug: string) => {
    removeFromCart(slug);
    const items = getCartItemsWithDetails();
    setCartItems(items);
    setTotal(getCartTotal());
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    // TODO: Implement Stripe checkout
    // This will redirect to Stripe checkout page
    setTimeout(() => {
      setIsLoading(false);
      alert("Checkout kommer snart! Stripe integration bliver tilføjet.");
    }, 500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-charcoal-900 mb-4">Kurv</h1>
        <div className="text-center py-12">
          <p className="text-charcoal-600 mb-4">Din kurv er tom</p>
          <Link
            href="/opskrifter"
            className="inline-block px-6 py-3 rounded-xl bg-rose-400 text-white font-semibold hover:bg-rose-500 transition-colors"
          >
            Se opskrifter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-charcoal-900">Kurv</h1>
        <button
          onClick={() => {
            if (confirm("Er du sikker på at du vil tømme kurven?")) {
              clearCart();
              setCartItems([]);
              setTotal(0);
            }
          }}
          className="text-sm text-charcoal-500 hover:text-charcoal-700"
        >
          Tøm kurv
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItemCard
              key={item.patternSlug}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 rounded-2xl bg-cream-50 border border-beige-200">
            <h2 className="text-lg font-semibold text-charcoal-900 mb-4">
              Ordreoversigt
            </h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-charcoal-600">
                <span>Subtotal</span>
                <span>{total} kr</span>
              </div>
              <div className="flex justify-between text-sm text-charcoal-600">
                <span>Fragt</span>
                <span>Gratis</span>
              </div>
              <div className="pt-2 border-t border-beige-200">
                <div className="flex justify-between font-semibold text-charcoal-900">
                  <span>Total</span>
                  <span>{total} kr</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isLoading || cartItems.length === 0}
              className="w-full px-6 py-3 rounded-xl bg-rose-400 text-white font-semibold hover:bg-rose-500 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Venter..." : "Gå til betaling"}
            </button>
            <p className="mt-3 text-xs text-charcoal-500 text-center">
              Betaling håndteres sikkert gennem Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartItemCard({
  item,
  onQuantityChange,
  onRemove,
}: {
  item: CartItemWithDetails;
  onQuantityChange: (slug: string, quantity: number) => void;
  onRemove: (slug: string) => void;
}) {
  return (
    <div className="flex gap-4 p-4 rounded-xl border border-beige-200 bg-white">
      {/* Image */}
      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-rose-100 to-sage-100 flex-shrink-0">
        <Image
          src={item.pattern.image}
          alt={item.pattern.name}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
        {!item.pattern.image && (
          <div className="absolute inset-0 flex items-center justify-center text-charcoal-400">
            <span className="text-2xl">🧶</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Link
              href={`/opskrifter/${item.pattern.slug}`}
              className="font-semibold text-charcoal-900 hover:text-forest-800 transition-colors"
            >
              {item.pattern.name}
            </Link>
            <p className="text-sm text-charcoal-500 mt-1">
              {item.pattern.level}
            </p>
          </div>
          <button
            onClick={() => onRemove(item.patternSlug)}
            className="text-charcoal-400 hover:text-charcoal-600 transition-colors"
            aria-label="Fjern fra kurv"
          >
            ×
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onQuantityChange(item.patternSlug, item.quantity - 1)}
              className="w-8 h-8 rounded border border-beige-200 hover:border-charcoal-300 flex items-center justify-center text-charcoal-600"
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => onQuantityChange(item.patternSlug, item.quantity + 1)}
              className="w-8 h-8 rounded border border-beige-200 hover:border-charcoal-300 flex items-center justify-center text-charcoal-600"
            >
              +
            </button>
          </div>
          <p className="font-semibold text-charcoal-900">
            {item.pattern.price * item.quantity} kr
          </p>
        </div>
      </div>
    </div>
  );
}
