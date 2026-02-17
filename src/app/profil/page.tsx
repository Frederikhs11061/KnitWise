"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getCurrentUser,
  getPurchaseHistory,
  getSavedPatterns,
  type Purchase,
} from "@/lib/user";
import { getPatternBySlug } from "@/lib/patterns";
import { formatPrice } from "@/lib/pricing";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(getCurrentUser());
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [savedPatterns, setSavedPatterns] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"purchases" | "saved" | "profile">("purchases");

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/login");
      return;
    }

    setUser(currentUser);
    setPurchases(getPurchaseHistory());
    setSavedPatterns(getSavedPatterns());

    // Listen for updates
    const handleUpdates = () => {
      setPurchases(getPurchaseHistory());
      setSavedPatterns(getSavedPatterns());
    };

    window.addEventListener("purchases-updated", handleUpdates);
    window.addEventListener("saved-patterns-updated", handleUpdates);

    return () => {
      window.removeEventListener("purchases-updated", handleUpdates);
      window.removeEventListener("saved-patterns-updated", handleUpdates);
    };
  }, [router]);

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-charcoal-900 mb-2">Min profil</h1>
        <p className="text-charcoal-600">Hej, {user.name}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-beige-200">
        <button
          onClick={() => setActiveTab("purchases")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "purchases"
              ? "border-rose-400 text-rose-600"
              : "border-transparent text-charcoal-600 hover:text-charcoal-900"
          }`}
        >
          Købshistorik
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "saved"
              ? "border-rose-400 text-rose-600"
              : "border-transparent text-charcoal-600 hover:text-charcoal-900"
          }`}
        >
          Gemte opskrifter
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "profile"
              ? "border-rose-400 text-rose-600"
              : "border-transparent text-charcoal-600 hover:text-charcoal-900"
          }`}
        >
          Profilindstillinger
        </button>
      </div>

      {/* Content */}
      {activeTab === "purchases" && (
        <PurchasesTab purchases={purchases} />
      )}
      {activeTab === "saved" && (
        <SavedTab savedPatterns={savedPatterns} />
      )}
      {activeTab === "profile" && (
        <ProfileTab user={user} />
      )}
    </div>
  );
}

function PurchasesTab({ purchases }: { purchases: Purchase[] }) {
  if (purchases.length === 0) {
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
      {purchases.map((purchase) => (
        <div
          key={purchase.id}
          className="p-6 rounded-xl border border-beige-200 bg-white"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-charcoal-900">
                Ordre {purchase.orderNumber}
              </h3>
              <p className="text-sm text-charcoal-500 mt-1">
                {new Date(purchase.date).toLocaleDateString("da-DK", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-charcoal-900">
                {formatPrice(purchase.total)}
              </p>
              <span
                className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                  purchase.status === "completed"
                    ? "bg-sage-100 text-sage-700"
                    : purchase.status === "pending"
                    ? "bg-rose-100 text-rose-700"
                    : "bg-charcoal-100 text-charcoal-700"
                }`}
              >
                {purchase.status === "completed"
                  ? "Afsluttet"
                  : purchase.status === "pending"
                  ? "Afventer"
                  : "Fejlet"}
              </span>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            {purchase.items.map((item, i) => (
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

          {purchase.pdfDownloadUrl && (
            <Link
              href={purchase.pdfDownloadUrl}
              className="text-sm text-rose-400 hover:text-rose-500 font-medium"
            >
              Download PDF →
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
        <p className="text-charcoal-600 mb-4">
          Du har ikke gemt nogen opskrifter endnu
        </p>
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
            <h3 className="font-semibold text-charcoal-900 mb-1">
              {pattern.name}
            </h3>
            <p className="text-sm text-charcoal-500">{formatPrice(pattern.price)}</p>
          </Link>
        );
      })}
    </div>
  );
}

function ProfileTab({ user }: { user: { name: string; email: string } }) {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="p-6 rounded-xl border border-beige-200 bg-white">
        <h3 className="font-semibold text-charcoal-900 mb-4">Profiloplysninger</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1">
              Navn
            </label>
            <input
              type="text"
              defaultValue={user.name}
              className="w-full px-4 py-2 rounded-lg border border-beige-200 bg-white"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1">
              Email
            </label>
            <input
              type="email"
              defaultValue={user.email}
              className="w-full px-4 py-2 rounded-lg border border-beige-200 bg-white"
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-beige-200 bg-white">
        <h3 className="font-semibold text-charcoal-900 mb-4">Kontoindstillinger</h3>
        <p className="text-sm text-charcoal-600 mb-4">
          For at ændre dine oplysninger eller slette din konto, kontakt venligst support.
        </p>
        <button className="px-4 py-2 rounded-lg border border-rose-300 text-rose-600 hover:bg-rose-50 transition-colors text-sm font-medium">
          Kontakt support
        </button>
      </div>
    </div>
  );
}
