"use client";

import { useSyncExternalStore } from "react";
import Card from "@/components/ui/Card";
import { getCurrentUser } from "@/services/authMemory";

const emptyProfile: { name?: string; email?: string } = {};
let profileSnapshot = emptyProfile;

const getProfile = () => {
  const saved = getCurrentUser();
  if (saved === null) return emptyProfile;
  return saved;
};

const subscribeToProfile = () => () => {};

export default function ProfilePage() {
  const profile = useSyncExternalStore(subscribeToProfile, getProfile, () => emptyProfile);

  return <main className="max-w-2xl"><h1 className="text-3xl font-bold text-gray-900">Profile</h1><p className="mt-2 text-gray-500">Your TaskFlow account details.</p><Card className="mt-6 space-y-4"><div><p className="text-sm text-gray-500">Name</p><p className="font-medium text-gray-900">{profile.name || "Not available"}</p></div><div><p className="text-sm text-gray-500">Email</p><p className="font-medium text-gray-900">{profile.email || "Not available"}</p></div></Card></main>;
}