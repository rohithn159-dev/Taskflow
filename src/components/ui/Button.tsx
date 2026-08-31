"use client";

import React from "react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary: "bg-[#2d6cdf] text-white shadow-[0_7px_16px_rgba(45,108,223,0.24)] hover:bg-[#1f55b7]",
    secondary: "bg-[#132238] text-white hover:bg-[#223857]",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline:
      "border border-[#d9e2ec] bg-white text-[#40516d] hover:border-[#b9c9dc] hover:bg-[#f5f7fa]",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}