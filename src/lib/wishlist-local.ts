/**
 * Ønskeliste i localStorage (til gæster uden login).
 * Synkroniseres med Supabase når bruger logger ind.
 */

const KEY = "stitch-wishlist";

export function getLocalWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function setLocalWishlist(slugs: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(slugs));
    window.dispatchEvent(new CustomEvent("wishlist-updated"));
  } catch (_) {}
}

export function toggleLocalWishlist(slug: string): boolean {
  const list = getLocalWishlist();
  const i = list.indexOf(slug);
  if (i >= 0) {
    list.splice(i, 1);
    setLocalWishlist(list);
    return false;
  }
  list.push(slug);
  setLocalWishlist(list);
  return true;
}

export function clearLocalWishlist(): void {
  setLocalWishlist([]);
}
