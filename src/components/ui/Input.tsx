"use client";

/**
 * Reusable input component for KnitWise.
 * Clean labels, generous spacing, friendly placeholders.
 */

import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = "", ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-charcoal-600"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-3 rounded-lg border bg-cream-50
            text-charcoal-800 placeholder-charcoal-400
            focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-300
            transition-colors
            ${error ? "border-rose-300" : "border-beige-200"}
            ${className}
          `}
          {...props}
        />
        {hint && !error && (
          <p className="text-sm text-charcoal-400">{hint}</p>
        )}
        {error && (
          <p className="text-sm text-rose-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
