"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerAccount } from "@/services/authMemory";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    setLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    registerAccount({ name: name.trim(), email: normalizedEmail, password, role: "project-manager", loggedIn: true });
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <Input
        id="name"
        label="Full Name"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
      />

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
        placeholder="Create a password"
        value={password}
        onChange={(event) =>
          setPassword(event.target.value)
        }
      />

      <Input
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(event) =>
          setConfirmPassword(event.target.value)
        }
      />

      {error && (
        <p role="alert" className="rounded-xl border border-red-100 bg-red-50/80 p-3 text-sm text-[#c64b58]">
          {error}
        </p>
      )}

      <Button
        type="submit"
        loading={loading}
        className="w-full"
      >
        Create Account
      </Button>

      <p className="text-center text-sm text-[#63758b]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#2d6cdf] transition hover:text-[#1f55b7] hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
}