"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { loginAccount } from "@/services/authMemory";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const account = loginAccount(normalizedEmail, password);
    if (!account) {
      setLoading(false);
      setError("No matching account found. Please check your details or register first.");
      return;
    }

    setLoading(false);
    router.push("/dashboard");
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

      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(event) =>
          setPassword(event.target.value)
        }
      />

      {error && (
        <p role="alert" className="rounded-xl border border-red-100 bg-red-50/80 p-3 text-sm text-[#c64b58]">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4"
          />

          <span>Remember me</span>
        </label>

        <Link
          href="/forgot-password"
          className="font-semibold text-[#2d6cdf] transition hover:text-[#1f55b7] hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        loading={loading}
        className="w-full"
      >
        Login
      </Button>

      <p className="text-center text-sm text-[#63758b]">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-[#2d6cdf] transition hover:text-[#1f55b7] hover:underline"
        >
          Register
        </Link>
      </p>
    </form>
  );
}