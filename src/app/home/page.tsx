"use client";

import { useState } from "react";
import Link from "next/link";
import { StatusBar } from "@/components/StatusBar";

const PERFORMANCE_ITEMS = [
  { label: "Serviços Realizados", value: "0" },
  { label: "Produtos Vendidos", value: "0" },
  { label: "Cliente Atendidos", value: "0" },
];

const GALLERY_IMAGES = [
  { src: "/onboarding1.1.jpg", alt: "Galeria" },
  { src: "/onboarding2.2.png", alt: "Galeria" },
  { src: "/cliente.png", alt: "Galeria", more: "+05" },
];

export default function HomePage() {
  const [amountVisible, setAmountVisible] = useState(true);

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-black">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "500px",
          height: "320px",
          background: "radial-gradient(ellipse at center top, rgba(251, 176, 59, 0.18) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden pb-24">
        <StatusBar />

        <header className="mt-4 px-4 pt-2 pb-4 shrink-0">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white/20 justify-self-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Foto do usuário"
                className="h-full w-full object-cover grayscale"
              />
            </div>
            <div className="text-center min-w-0">
              <p className="text-sm text-white/60">Sua Unidade</p>
              <div className="flex items-center justify-center gap-1.5">
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-[var(--brand-yellow)] shrink-0" aria-hidden>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="font-medium text-white">Alphaville</span>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-white/70 shrink-0" aria-hidden>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
            <div className="flex justify-end">
              <Link
                href="/notificacoes"
                className="relative inline-flex rounded-full p-2 text-[var(--brand-yellow)] hover:bg-white/10"
                aria-label="Notificações"
              >
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--brand-yellow)] px-1.5 text-xs font-bold text-[var(--brand-dark)]">
                  3
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* Você ganhou hoje */}
        <section className="px-4 pt-2">
          <div className="flex items-start justify-between gap-3 p-4">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-white/80">Você ganhou hoje</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-2xl font-bold text-[var(--brand-yellow)]">
                  {amountVisible ? "R$ 15.539,12" : "••••••••"}
                </span>
                <button
                  type="button"
                  onClick={() => setAmountVisible((v) => !v)}
                  className="rounded p-1 text-white/60 hover:text-white/90"
                  aria-label={amountVisible ? "Ocultar valor" : "Mostrar valor"}
                >
                  {amountVisible ? (
                    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
              </div>
              <Link href="/financas" className="mt-2 inline-block text-sm font-medium text-[var(--brand-yellow)] underline hover:opacity-90">
                Ver mais detalhes
              </Link>
            </div>
            <button type="button" className="shrink-0 rounded-lg p-2 text-[var(--brand-yellow)] hover:bg-white/10" aria-label="Filtros">
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
                <circle cx="8" cy="6" r="1.5" fill="currentColor" />
                <circle cx="16" cy="12" r="1.5" fill="currentColor" />
                <circle cx="12" cy="18" r="1.5" fill="currentColor" />
              </svg>
            </button>
          </div>
        </section>

        {/* Próximo atendimento – idêntico à imagem: fundo #4A3A2C, cores exatas */}
        <section className="mt-6 px-4">
          <h2 className="mb-3 text-base font-bold" style={{ color: "#EEB75F" }}>
            Próximo atendimento
          </h2>
          <div
            className="flex items-center gap-3 rounded-3xl p-4"
            style={{
              backgroundColor: "#3D2222",
              boxShadow: "0 -2px 0 0 rgba(255, 255, 255, 0.5), 0 8px 24px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold"
              style={{ backgroundColor: "#E5E5E5", color: "#333333" }}
            >
              1°
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-white">Wagner Almeida</p>
              <span
                className="mt-1 inline-block px-2.5 py-0.5 text-xs font-medium"
                style={{
                  borderRadius: "9px",
                  background: "rgba(255, 63, 63, 0.28)",
                  color: "#F08080",
                }}
              >
                ATRASADO
              </span>
            </div>
            <p className="shrink-0 text-sm text-white">Corte</p>
            <button
              type="button"
              className="shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              style={{ backgroundColor: "#6DBA4F" }}
            >
              Atender
            </button>
          </div>
        </section>

        {/* Desempenho – Liquid Glass */}
        <section className="mt-6 px-4">
          <div className="space-y-3">
            {PERFORMANCE_ITEMS.map((item) => (
              <div key={item.label} className="glass-panel-liquid flex items-center justify-between px-4 py-3.5">
                <span className="text-sm text-white/90">{item.label}</span>
                <span className="text-lg font-semibold text-white">{item.value}</span>
              </div>
            ))}
          </div>
          <Link
            href="/financas"
            className="mt-3 flex items-center gap-2 text-sm font-medium text-[var(--brand-yellow)] hover:opacity-90"
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            Ver desempenho completo
          </Link>
        </section>

        {/* Sua Galeria */}
        <section className="mt-6 px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Sua Galeria</h2>
            <Link href="#" className="text-sm font-medium text-[var(--brand-yellow)] hover:opacity-90">
              Mostrar tudo
            </Link>
          </div>
          <div className="mt-3 flex gap-2">
            {GALLERY_IMAGES.map((img, i) => (
              <div key={i} className="relative aspect-square flex-1 overflow-hidden rounded-xl bg-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
                {img.more ? (
                  <span className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
                    {img.more}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      </main>

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
          <Link href="/home" className="flex flex-col items-center gap-1 text-[var(--brand-yellow)]" aria-current="page">
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
          <Link href="/perfil" className="flex flex-col items-center gap-1 text-white/60 hover:text-white/80">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-xs font-medium">Perfil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
