import React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  id,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-semibold text-[#30445e]"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={`auth-field w-full rounded-xl border px-3.5 py-3 outline-none transition duration-200 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}