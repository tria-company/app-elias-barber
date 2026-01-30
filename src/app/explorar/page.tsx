"use client";

import Link from "next/link";
import { StatusBar } from "@/components/StatusBar";

// Mapa embedado: região Alphaville / Barueri (exemplo para o app)
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.227325050394!2d-46.8493729!3d-23.6344659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5540b2c4e261%3A0x5b267bbe2e1ddee!2sAlphaville%2C%20Barueri%20-%20SP!5e0!3m2!1spt-BR!2sbr!5m2!1spt-BR!2sbr";

export default function ExplorarPage() {
  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-black">
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2"
        style={{
          width: "500px",
          height: "200px",
          background: "radial-gradient(ellipse at center top, rgba(251, 176, 59, 0.12) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <StatusBar />
      <header className="relative z-20 safe-area-top flex items-center justify-between px-4 py-3">
        <Link
          href="/home"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
          aria-label="Voltar"
        >
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Link>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-white">Localização</h1>
        <div className="w-10 shrink-0" aria-hidden />
      </header>

      <main className="relative z-0 flex-1 min-h-0 pb-28">
        <div className="relative h-full w-full">
          <iframe
            src={MAP_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa - Localização das unidades"
            className="absolute inset-0 h-full w-full"
          />
          {/* Marcadores de exemplo (overlay no mapa) */}
          <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f97316] px-3 py-1.5 text-sm font-semibold text-white shadow-lg">
              Unidade - 1
              <span className="h-2 w-2 rounded-full bg-white/90" />
            </span>
          </div>
          <div className="pointer-events-none absolute right-6 bottom-1/4">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f97316] px-3 py-1.5 text-sm font-semibold text-white shadow-lg">
              Unidade
              <span className="h-2 w-2 rounded-full bg-white/90" />
            </span>
          </div>
        </div>
      </main>

      <nav
        className="glass-nav-floating fixed left-4 right-4 bottom-4 z-[100] px-4 py-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:max-w-md"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        aria-label="Navegação principal"
      >
        <div className="mx-auto flex max-w-md items-center justify-around">
          <Link href="/home" className="flex flex-col items-center gap-1 text-white/60 hover:text-white/80">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <span className="text-xs font-medium">Início</span>
          </Link>
          <Link href="/explorar" className="flex flex-col items-center gap-1 text-[var(--brand-yellow)]" aria-current="page">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span className="text-xs font-medium">Explorar</span>
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
          <Link href="/perfil" className="flex flex-col items-center gap-1 text-white/60 hover:text-white/80">
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
