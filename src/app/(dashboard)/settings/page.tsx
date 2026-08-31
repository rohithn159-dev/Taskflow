"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";

let notificationsEnabled = true;

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(notificationsEnabled);
  const toggleNotifications = () => { const next = !notifications; notificationsEnabled = next; setNotifications(next); };
  return <main className="max-w-2xl"><h1 className="text-3xl font-bold text-gray-900">Settings</h1><p className="mt-2 text-gray-500">Manage your workspace preferences.</p><Card className="mt-6"><label className="flex items-center justify-between gap-4"><span><span className="block font-medium text-gray-900">Task notifications</span><span className="text-sm text-gray-500">Receive updates about your tasks.</span></span><input type="checkbox" checked={notifications} onChange={toggleNotifications} className="h-5 w-5" /></label></Card></main>;
}