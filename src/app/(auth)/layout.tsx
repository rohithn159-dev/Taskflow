import { ReactNode } from "react";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="auth-shell flex min-h-screen items-center justify-center px-4 py-10">
      <section className="auth-panel w-full max-w-md rounded-[22px] p-8 sm:p-10">
        <div className="mb-9 text-center">
          <p className="auth-brand text-[28px] font-bold">TaskFlow</p>
          <p className="mt-2 text-sm text-[#63758b]">
            Manage your projects and tasks in one place.
          </p>
        </div>
        {children}
      </section>
    </main>
  );
}
