"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutAccount } from "@/services/authMemory";
import { Menu, Bell, ChevronDown } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({
  onMenuClick,
}: NavbarProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    logoutAccount();
    setShowMenu(false);
    router.push("/login");
  };

  return (
    //<header className="relative flex h-[76px] items-center justify-between border-b border-[#d9e2ec] bg-[#fffdfa] px-4 shadow-[0_3px_18px_rgba(19,34,56,0.07)] md:px-8">
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm md:px-6">
      <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#2d6cdf]/35 to-transparent" />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl p-2 text-[#6d7d91] transition hover:bg-[#eef3f8] hover:text-[#132238] md:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-[21px] font-bold tracking-[-0.03em] text-[#1f55b7] transition-colors duration-200 hover:text-[#2d6cdf]">
          TaskFlow
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-xl p-2 text-[#6d7d91] transition hover:bg-[#eef3f8] hover:text-[#132238]"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="group flex items-center gap-2 rounded-2xl border border-transparent p-1.5 pl-2 transition duration-200 hover:border-[#d9e2ec] hover:bg-[#f5f7fa]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1f55b7] font-semibold text-white shadow-[0_5px_12px_rgba(31,85,183,0.26)] ring-2 ring-white transition duration-200 group-hover:bg-[#2d6cdf] group-hover:shadow-[0_7px_16px_rgba(45,108,223,0.3)]">
              R
            </div>

            <span className="hidden text-sm font-semibold text-[#132238] transition-colors group-hover:text-[#1f55b7] md:block">
              Rohit
            </span>

            <ChevronDown size={16} className="hidden text-[#6d7d91] md:block" />
          </button>

          {showMenu && (
            <div className="profile-menu absolute right-0 top-14 z-50 w-48 overflow-hidden rounded-2xl border border-[#d9e2ec] bg-white py-2 shadow-[0_18px_40px_rgba(19,34,56,0.16)]">
              <Link href="/profile" onClick={() => setShowMenu(false)} className="block w-full px-4 py-2.5 text-left text-sm font-medium text-[#40516d] transition hover:bg-[#eef3f8] hover:pl-5 hover:text-[#1f55b7]">
                Profile
              </Link>

              <Link href="/settings" onClick={() => setShowMenu(false)} className="block w-full px-4 py-2.5 text-left text-sm font-medium text-[#40516d] transition hover:bg-[#eef3f8] hover:pl-5 hover:text-[#1f55b7]">
                Settings
              </Link>

              <button type="button" onClick={logout} className="block w-full px-4 py-2.5 text-left text-sm font-medium text-[#c64b58] transition hover:bg-[#fff1f1] hover:pl-5">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}