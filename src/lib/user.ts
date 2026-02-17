/**
 * User management utilities
 * Handles user data, purchase history, saved patterns
 */

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Purchase {
  id: string;
  orderNumber: string;
  date: string;
  items: PurchaseItem[];
  total: number;
  status: "completed" | "pending" | "failed";
  pdfDownloadUrl?: string;
}

export interface PurchaseItem {
  patternSlug: string;
  patternName: string;
  quantity: number;
  price: number;
}

/**
 * Get current user from localStorage (simulated)
 * In production, this would come from auth provider
 */
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  
  try {
    const userJson = localStorage.getItem("stitch-of-care-user");
    if (!userJson) return null;
    return JSON.parse(userJson) as User;
  } catch {
    return null;
  }
}

/**
 * Save user to localStorage
 */
export function saveUser(user: User): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem("stitch-of-care-user", JSON.stringify(user));
    window.dispatchEvent(new CustomEvent("user-updated"));
  } catch (error) {
    console.error("Failed to save user:", error);
  }
}

/**
 * Get purchase history from localStorage
 */
export function getPurchaseHistory(): Purchase[] {
  if (typeof window === "undefined") return [];
  
  try {
    const historyJson = localStorage.getItem("stitch-of-care-purchases");
    if (!historyJson) return [];
    return JSON.parse(historyJson) as Purchase[];
  } catch {
    return [];
  }
}

/**
 * Add purchase to history
 */
export function addPurchase(purchase: Purchase): void {
  if (typeof window === "undefined") return;
  
  try {
    const history = getPurchaseHistory();
    history.unshift(purchase); // Add to beginning
    localStorage.setItem("stitch-of-care-purchases", JSON.stringify(history));
    window.dispatchEvent(new CustomEvent("purchases-updated"));
  } catch (error) {
    console.error("Failed to save purchase:", error);
  }
}

/**
 * Get saved patterns (favorites)
 */
export function getSavedPatterns(): string[] {
  if (typeof window === "undefined") return [];
  
  try {
    const savedJson = localStorage.getItem("stitch-of-care-saved");
    if (!savedJson) return [];
    return JSON.parse(savedJson) as string[];
  } catch {
    return [];
  }
}

/**
 * Toggle saved pattern
 */
export function toggleSavedPattern(patternSlug: string): void {
  if (typeof window === "undefined") return;
  
  try {
    const saved = getSavedPatterns();
    const index = saved.indexOf(patternSlug);
    
    if (index > -1) {
      saved.splice(index, 1);
    } else {
      saved.push(patternSlug);
    }
    
    localStorage.setItem("stitch-of-care-saved", JSON.stringify(saved));
    window.dispatchEvent(new CustomEvent("saved-patterns-updated"));
  } catch (error) {
    console.error("Failed to save pattern:", error);
  }
}

/**
 * Check if pattern is saved
 */
export function isPatternSaved(patternSlug: string): boolean {
  const saved = getSavedPatterns();
  return saved.includes(patternSlug);
}

/**
 * Generate order number
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `SOC-${timestamp}-${random}`;
}
