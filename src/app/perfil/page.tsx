"use client";

import Link from "next/link";
import { StatusBar } from "@/components/StatusBar";

const GENERAL_ITEMS = [
  { label: "Editar Perfil", href: "#", icon: "person" },
  { label: "Alterar senha", href: "#", icon: "lock" },
  { label: "Notificações", href: "/notificacoes", icon: "bell" },
  { label: "Segurança", href: "#", icon: "shield" },
  { label: "Idioma", href: "#", icon: "globe" },
];

const PREFERENCIAS_ITEMS = [
  { label: "Políticas de Privacidade", href: "#", icon: "shield-outline" },
  { label: "Ajuda e Suporte", href: "#", icon: "help" },
  { label: "Sair", href: "/welcome", icon: "logout", isLogout: true },
];

function RowIcon({ name }: { name: string }) {
  const className = "h-6 w-6 shrink-0 text-white";
  const strokeClass = "stroke-current";
  if (name === "person")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );
  if (name === "lock")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    );
  if (name === "bell")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    );
  if (name === "shield")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  if (name === "globe")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    );
  if (name === "shield-outline")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  if (name === "help")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </svg>
    );
  if (name === "logout")
    return (
      <svg className="h-6 w-6 shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    );
  return null;
}

export default function PerfilPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "500px",
          height: "320px",
          background: "radial-gradient(ellipse at center top, rgba(251, 176, 59, 0.18) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <StatusBar />
      <main className="relative z-0 flex-1 overflow-y-auto px-4 pb-28 pt-6">
        {/* Dados do usuário */}
        <section className="mb-8 flex items-center gap-4">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-white/20">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-white">Lucas Manoel Gomes</h1>
            <p className="mt-0.5 text-sm text-white/60">Lucas01@gmail.com</p>
          </div>
        </section>

        {/* General */}
        <section className="mb-6">
          <h2 className="mb-3 text-base font-bold text-white">General</h2>
          <ul className="space-y-2">
            {GENERAL_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-white transition hover:bg-white/15"
                >
                  <RowIcon name={item.icon} />
                  <span className="flex-1 font-medium">{item.label}</span>
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="shrink-0 text-white/60">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Preferências */}
        <section>
          <h2 className="mb-3 text-base font-bold text-white">Preferências</h2>
          <ul className="space-y-2">
            {PREFERENCIAS_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-white transition hover:bg-white/15"
                >
                  <RowIcon name={item.icon} />
                  <span className="flex-1 font-medium">{item.label}</span>
                  {!item.isLogout && (
                    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="shrink-0 text-white/60">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Navegação inferior – Perfil ativo */}
      <nav
        className="fixed left-4 right-4 bottom-4 z-50 rounded-2xl px-4 py-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:max-w-md"
        style={{
          paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
          backgroundColor: "rgba(28, 26, 25, 0.95)",
          boxShadow: "0 -1px 0 0 rgba(255, 255, 255, 0.08), 0 8px 32px rgba(0, 0, 0, 0.5)",
        }}
        aria-label="Navegação principal"
      >
        <div className="mx-auto flex max-w-md items-center justify-around">
          <Link href="/home" className="flex flex-col items-center gap-1 text-white/60 hover:text-white/80">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <span className="text-xs font-medium">Início</span>
          </Link>
          <Link href="/agendamentos" className="flex flex-col items-center gap-1 text-white/60 hover:text-white/80">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="text-xs font-medium">Agenda</span>
          </Link>
          <Link href="/fila-espera" className="flex flex-col items-center gap-1 text-white/60 hover:text-white/80">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 2h14" />
              <path d="M5 22h14" />
              <path d="M5 2v4l7 6 7-6V2" />
              <path d="M5 22v-4l7-6 7 6v4" />
            </svg>
            <span className="text-xs font-medium">Fila de espera</span>
          </Link>
          <Link href="/perfil" className="flex flex-col items-center gap-1 text-[var(--brand-yellow)]" aria-current="page">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-xs font-medium">Perfil</span>
          </Link>
        </div>
      </nav>
      <div className="safe-area-bottom h-6 w-full" aria-hidden />
    </div>
  );
}
