"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FolderOpen,
  CheckSquare2,
  Users,
  User,
  Settings,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: FolderOpen,
  },
  {
    name: "My Tasks",
    href: "/my-tasks",
    icon: CheckSquare2,
  },
  {
    name: "Team",
    href: "/team",
    icon: Users,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <aside
        //className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-[#223857] bg-[#132238] transition-transform duration-200 md:static md:z-auto md:translate-x-0 ${
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-[#13233b] transition-transform duration-200 md:sticky md:top-0 md:h-screen md:translate-x-0 md:overflow-y-auto ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-[#223857] px-6 md:hidden">
          <span className="text-xl font-bold tracking-tight text-white">
            TaskFlow
          </span>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-[#a9bad0] hover:bg-[#223857]"
          >
            ✕
          </button>
        </div>

        <nav className="space-y-2 p-4 pt-6">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);
            const IconComponent = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition duration-200 ${
                  isActive
                    ? "bg-[#2d6cdf] text-white shadow-[0_7px_16px_rgba(45,108,223,0.28)]"
                    : "text-[#a9bad0] hover:bg-[#223857] hover:text-white"
                }`}
              >
                <IconComponent size={20} className="flex-shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}