"use client";

/**
 * Reusable select/dropdown component for KnitWise.
 */

import { forwardRef, type SelectHTMLAttributes } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  hint?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, hint, id, className = "", ...props }, ref) => {
    const selectId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-charcoal-600"
        >
          {label}
        </label>
        <select
          ref={ref}
          id={selectId}
          className={`
            w-full px-4 py-3 rounded-lg border bg-cream-50
            text-charcoal-800
            focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-300
            transition-colors cursor-pointer
            ${error ? "border-rose-300" : "border-beige-200"}
            ${className}
          `}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
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

Select.displayName = "Select";

export default Select;
