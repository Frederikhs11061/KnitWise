"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/profil";
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const supabase = createClient();

      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) {
          setError(signInError.message);
          setIsLoading(false);
          return;
        }
      } else {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });
        if (signUpError) {
          setError(signUpError.message);
          setIsLoading(false);
          return;
        }
        if (signUpData?.user && !signUpData.session) {
          setError("Tjek din email – vi har sendt et bekræftelseslink. Klik på det og log ind derefter.");
          setIsLoading(false);
          return;
        }
      }

      window.location.href = redirectTo.startsWith("/") ? redirectTo : "/profil";
    } catch (err) {
      console.error("Auth error:", err);
      setError("Der opstod en fejl. Prøv igen.");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-charcoal-900 mb-2">
          {isLogin ? "Log ind" : "Opret konto"}
        </h1>
        <p className="text-charcoal-600">
          {isLogin
            ? "Log ind for at se dine køb, ønskeliste og adresser"
            : "Opret en konto for at få adgang til alle funktioner"}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-charcoal-700 mb-1">
              Navn
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isLogin}
              className="w-full px-4 py-3 rounded-lg border border-beige-200 bg-white focus:outline-none focus:ring-2 focus:ring-sage-300"
              placeholder="Dit navn"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-charcoal-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-beige-200 bg-white focus:outline-none focus:ring-2 focus:ring-sage-300"
            placeholder="din@email.dk"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-charcoal-700 mb-1">
            Adgangskode
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-3 rounded-lg border border-beige-200 bg-white focus:outline-none focus:ring-2 focus:ring-sage-300"
            placeholder="••••••••"
          />
          {!isLogin && (
            <p className="text-xs text-charcoal-500 mt-1">Mindst 6 tegn</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 rounded-xl bg-rose-400 text-white font-semibold hover:bg-rose-500 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Venter..." : isLogin ? "Log ind" : "Opret konto"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError(null);
          }}
          className="text-sm text-charcoal-600 hover:text-charcoal-900"
        >
          {isLogin ? "Har du ikke en konto? Opret en her" : "Har du allerede en konto? Log ind her"}
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-beige-200">
        <p className="text-xs text-center text-charcoal-500">
          Ved at oprette en konto accepterer du vores{" "}
          <Link href="/handelsbetingelser" className="underline">handelsbetingelser</Link> og{" "}
          <Link href="/privatlivspolitik" className="underline">privatlivspolitik</Link>.
        </p>
      </div>
    </div>
  );
}
