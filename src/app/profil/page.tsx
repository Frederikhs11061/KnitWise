"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPatternBySlug } from "@/lib/patterns";
import { formatPrice } from "@/lib/pricing";

type User = { id: string; email: string; name: string };
type Order = {
  id: string;
  order_number: string;
  total: number;
  status: string;
  items: { patternSlug: string; patternName: string; quantity: number; price: number }[];
  created_at: string;
  stripe_session_id?: string;
};
type Address = {
  id: string;
  label: string;
  street: string;
  postal_code: string;
  city: string;
  country: string;
};

function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"purchases" | "saved" | "addresses" | "profile">(
    tabParam === "saved" || tabParam === "ønskeliste" ? "saved" : "purchases"
  );

  useEffect(() => {
    if (tabParam === "saved" || tabParam === "ønskeliste") setActiveTab("saved");
    if (tabParam === "addresses") setActiveTab("addresses");
    if (tabParam === "profile") setActiveTab("profile");
    if (tabParam === "purchases") setActiveTab("purchases");
  }, [tabParam]);

  useEffect(() => {
    Promise.all([
      fetch("/api/user").then((r) => r.json()),
      fetch("/api/orders").then((r) => r.json()),
      fetch("/api/wishlist").then((r) => r.json()),
      fetch("/api/addresses").then((r) => r.json()).catch(() => ({ addresses: [] })),
    ]).then(([userRes, ordersRes, wishlistRes, addressesRes]) => {
      if (!userRes?.user) {
        router.push("/login");
        return;
      }
      setUser(userRes.user);
      setOrders(ordersRes.orders || []);
      setWishlist(wishlistRes.wishlist || []);
      setAddresses(addressesRes.addresses || []);
      setLoading(false);
    });
  }, [router]);

  const refreshAddresses = () => {
    fetch("/api/addresses")
      .then((r) => r.json())
      .then((data) => setAddresses(data.addresses || []));
  };

  if (loading || !user) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-charcoal-600">Indlæser...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-900 mb-2">Min profil</h1>
          <p className="text-charcoal-600">Hej, {user.name}</p>
        </div>
        <form action="/api/auth/signout" method="post">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg border border-charcoal-200 text-charcoal-700 hover:bg-charcoal-50 text-sm font-medium"
          >
            Log ud
          </button>
        </form>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 border-b border-beige-200">
        {(["purchases", "saved", "addresses", "profile"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-rose-400 text-rose-600"
                : "border-transparent text-charcoal-600 hover:text-charcoal-900"
            }`}
          >
            {tab === "purchases" && "Købshistorik"}
            {tab === "saved" && "Ønskeliste"}
            {tab === "addresses" && "Adresser"}
            {tab === "profile" && "Profil"}
          </button>
        ))}
      </div>

      {activeTab === "purchases" && <PurchasesTab orders={orders} />}
      {activeTab === "saved" && <SavedTab savedPatterns={wishlist} />}
      {activeTab === "addresses" && (
        <AddressesTab addresses={addresses} onUpdate={refreshAddresses} />
      )}
      {activeTab === "profile" && <ProfileTab user={user} />}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-12"><p className="text-charcoal-600">Indlæser...</p></div>}>
      <ProfileContent />
    </Suspense>
  );
}

function PurchasesTab({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-charcoal-600 mb-4">Du har ingen køb endnu</p>
        <Link
          href="/opskrifter"
          className="inline-block px-6 py-3 rounded-xl bg-rose-400 text-white font-semibold hover:bg-rose-500 transition-colors"
        >
          Se opskrifter
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="p-6 rounded-xl border border-beige-200 bg-white"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-charcoal-900">
                Ordre {order.order_number}
              </h3>
              <p className="text-sm text-charcoal-500 mt-1">
                {new Date(order.created_at).toLocaleDateString("da-DK", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-charcoal-900">
                {formatPrice(order.total)}
              </p>
              <span className="text-xs px-2 py-1 rounded-full mt-1 inline-block bg-sage-100 text-sage-700">
                Afsluttet
              </span>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            {(order.items || []).map((item: { patternName: string; quantity: number; price: number }, i: number) => (
              <div
                key={i}
                className="flex items-center justify-between text-sm text-charcoal-600"
              >
                <span>
                  {item.patternName} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          {order.stripe_session_id && (
            <Link
              href={`/checkout/success?session_id=${order.stripe_session_id}`}
              className="text-sm text-rose-400 hover:text-rose-500 font-medium"
            >
              Download PDF'er →
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

function SavedTab({ savedPatterns }: { savedPatterns: string[] }) {
  if (savedPatterns.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-charcoal-600 mb-4">Din ønskeliste er tom</p>
        <Link
          href="/opskrifter"
          className="inline-block px-6 py-3 rounded-xl bg-rose-400 text-white font-semibold hover:bg-rose-500 transition-colors"
        >
          Se opskrifter
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {savedPatterns.map((slug) => {
        const pattern = getPatternBySlug(slug);
        if (!pattern) return null;
        return (
          <Link
            key={slug}
            href={`/opskrifter/${slug}`}
            className="block p-4 rounded-xl border border-beige-200 bg-white hover:border-rose-300 transition-colors"
          >
            <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gradient-to-br from-rose-100 to-sage-100 mb-3">
              <Image
                src={pattern.image}
                alt={pattern.name}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
              {!pattern.image && (
                <div className="absolute inset-0 flex items-center justify-center text-charcoal-400">
                  <span className="text-4xl">🧶</span>
                </div>
              )}
            </div>
            <h3 className="font-semibold text-charcoal-900 mb-1">{pattern.name}</h3>
            <p className="text-sm text-charcoal-500">{formatPrice(pattern.price)}</p>
          </Link>
        );
      })}
    </div>
  );
}

function AddressesTab({ addresses, onUpdate }: { addresses: Address[]; onUpdate: () => void }) {
  const [showForm, setShowForm] = useState(false);
  const [label, setLabel] = useState("Hjemme");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("DK");
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, street, postal_code: postalCode, city, country }),
      });
      if (res.ok) {
        setShowForm(false);
        setStreet("");
        setPostalCode("");
        setCity("");
        onUpdate();
      }
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Slet denne adresse?")) return;
    await fetch(`/api/addresses?id=${id}`, { method: "DELETE" });
    onUpdate();
  };

  return (
    <div className="space-y-6">
      {addresses.map((addr) => (
        <div
          key={addr.id}
          className="p-4 rounded-xl border border-beige-200 bg-white flex justify-between items-start"
        >
          <div>
            <p className="font-medium text-charcoal-900">{addr.label}</p>
            <p className="text-sm text-charcoal-600">
              {addr.street}, {addr.postal_code} {addr.city}, {addr.country}
            </p>
          </div>
          <button
            type="button"
            onClick={() => remove(addr.id)}
            className="text-sm text-rose-600 hover:text-rose-700"
          >
            Slet
          </button>
        </div>
      ))}
      {!showForm ? (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="px-4 py-2 rounded-lg border border-sage-300 text-sage-700 hover:bg-sage-50 font-medium"
        >
          + Tilføj adresse
        </button>
      ) : (
        <form onSubmit={submit} className="p-6 rounded-xl border border-beige-200 bg-white space-y-4 max-w-md">
          <h3 className="font-semibold text-charcoal-900">Ny adresse</h3>
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1">Betegnelse</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-beige-200"
              placeholder="Hjemme / Arbejde"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1">Adresse</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-beige-200"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1">Postnr.</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-beige-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1">By</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-beige-200"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-rose-400 text-white font-medium disabled:opacity-50"
            >
              {saving ? "Gemmer..." : "Gem"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg border border-beige-200"
            >
              Annuller
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function ProfileTab({ user }: { user: User }) {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="p-6 rounded-xl border border-beige-200 bg-white">
        <h3 className="font-semibold text-charcoal-900 mb-4">Profiloplysninger</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1">Navn</label>
            <input
              type="text"
              value={user.name}
              readOnly
              className="w-full px-4 py-2 rounded-lg border border-beige-200 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1">Email</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full px-4 py-2 rounded-lg border border-beige-200 bg-white"
            />
          </div>
        </div>
      </div>
      <div className="p-6 rounded-xl border border-beige-200 bg-white">
        <h3 className="font-semibold text-charcoal-900 mb-4">Kontoindstillinger</h3>
        <p className="text-sm text-charcoal-600 mb-4">
          For at ændre email eller adgangskode, brug "Log ud" og opret en ny konto, eller kontakt support.
        </p>
        <a
          href="mailto:kontakt@stitchofcare.dk"
          className="inline-block px-4 py-2 rounded-lg border border-rose-300 text-rose-600 hover:bg-rose-50 text-sm font-medium"
        >
          Kontakt support
        </a>
      </div>
    </div>
  );
}
