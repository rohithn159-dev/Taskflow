"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // Password reset API will be connected later.
    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    setLoading(false);

    setSuccess(
      "If an account exists with this email, you will receive a password reset link."
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(event) =>
          setEmail(event.target.value)
        }
      />

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {success && (
        <p className="rounded-lg bg-green-50 p-3 text-sm text-green-600">
          {success}
        </p>
      )}

      <Button
        type="submit"
        loading={loading}
        className="w-full"
      >
        Send Reset Link
      </Button>

      <p className="text-center text-sm">
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Back to Login
        </Link>
      </p>
    </form>
  );
}