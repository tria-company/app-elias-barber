"use client";

import { useState } from "react";
import Link from "next/link";
import { StatusBar } from "@/components/StatusBar";

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const DATES = [
  { day: "Dom", date: "01" },
  { day: "Seg", date: "02" },
  { day: "Ter", date: "03" },
  { day: "Qua", date: "04" },
  { day: "Qui", date: "05" },
  { day: "Sex", date: "06" },
  { day: "Sáb", date: "07" },
];

const TIMES = ["09.00", "10.00", "11.00", "12.00", "13.00", "14.00"];

const UNITS = [
  {
    id: "1",
    name: "Seu Elias Alphaville",
    address: "Alameda Araguaia, 750 - LOJA 10",
    rating: "4.9",
    reviews: "141 review",
    discount: "10% Desconto",
    image: "/onboarding1.jpg",
  },
  {
    id: "2",
    name: "Seu Elias Moema",
    address: "Av. Ibirapuera, 2907",
    rating: "4.8",
    reviews: "98 review",
    discount: null,
    image: "/onboarding2.png",
  },
];

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState("03");
  const [selectedTime, setSelectedTime] = useState("11.00");

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-black">
      {/* Luz amarela no topo (igual checkout) */}
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
          {/* Foto do usuário no canto esquerdo */}
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white/20 justify-self-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Foto do usuário"
              className="h-full w-full object-cover"
            />
          </div>
          {/* Localização centralizada */}
          <div className="text-center min-w-0">
            <p className="text-sm text-white/60">Sua localização</p>
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
          {/* Botão de notificações no canto direito da tela */}
          <div className="flex justify-end">
            <Link
              href="/notificacoes"
              className="relative inline-flex rounded-full p-2 text-[var(--brand-yellow)] hover:bg-white/10"
              aria-label="Notificações"
            >
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--brand-yellow)] px-1.5 text-xs font-bold text-[var(--brand-dark)]">
                3
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-xl bg-white/10 px-4 py-3">
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="shrink-0 text-white/50" aria-hidden>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="search"
              placeholder="Buscar serviços ou barbeiros..."
              className="min-w-0 flex-1 bg-transparent text-white placeholder:text-white/50 focus:outline-none"
            />
          </div>
          <button type="button" className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl bg-white/10 text-white/80 hover:bg-white/15" aria-label="Filtros">
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
      </header>

      <section className="px-4 space-y-4">
        <div>
          <h2 className="mb-3 text-lg font-bold text-white">Fevereiro</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {DATES.map((d) => (
              <button
                key={d.date}
                type="button"
                onClick={() => setSelectedDate(d.date)}
                className={`flex shrink-0 flex-col items-center px-4 py-3 transition ${
                  selectedDate === d.date
                    ? "rounded-xl bg-[#FDBA4E] text-[#1a1a1a]"
                    : "glass-chip text-white"
                }`}
              >
                <span className="text-xs font-medium">{d.day}</span>
                <span className="text-base font-semibold">{d.date}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-bold text-white">Horários disponíveis</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {TIMES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTime(t)}
                className={`shrink-0 px-4 py-3 text-sm font-medium transition ${
                  selectedTime === t
                    ? "rounded-xl bg-[#FDBA4E] text-[#1a1a1a]"
                    : "glass-chip text-white"
                }`}
              >
                {t}
              </button>
            ))}
            <button
              type="button"
              className="glass-chip flex shrink-0 items-center px-3 py-3 text-white/70"
              aria-label="Mais horários"
            >
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 flex-1 px-4">
        <h2 className="mb-4 text-lg font-bold text-white">Nossas Unidades</h2>
        <div className="flex flex-col gap-4">
          {UNITS.map((unit) => (
            <article
              key={unit.id}
              className="overflow-hidden rounded-2xl bg-white/5"
            >
              <div className="relative aspect-[16/10] w-full rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={unit.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
                {unit.discount ? (
                  <span className="glass-badge left-3 top-3 px-3 py-1.5 text-xs font-semibold text-white">
                    {unit.discount}
                  </span>
                ) : null}
                <div className="glass-card-overlay flex min-h-[28%] items-end justify-between gap-3 p-4 pt-6">
                  <div className="relative z-10 min-w-0 flex-1">
                    <h3 className="font-bold text-white">{unit.name}</h3>
                    <p className="mt-0.5 truncate text-sm text-white/70">{unit.address}</p>
                    <p className="mt-1 flex items-center gap-1 text-sm text-white/70">
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="text-[var(--brand-yellow)]" aria-hidden>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      {unit.rating} ({unit.reviews})
                    </p>
                  </div>
                  <Link
                    href={`/unidade/${unit.id}`}
                    className="relative z-10 shrink-0 rounded-xl bg-[#FDBA4E] px-4 py-2.5 text-sm font-semibold text-[#1a1a1a] transition hover:opacity-90"
                  >
                    Agendar agora
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      </main>

      <nav
        className="glass-nav-floating fixed left-4 right-4 bottom-4 z-50 px-4 py-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:max-w-md"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        aria-label="Navegação principal"
      >
        <div className="mx-auto flex max-w-md items-center justify-around">
          <Link href="/home" className="flex flex-col items-center gap-1 text-[var(--brand-yellow)]" aria-current="page">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <span className="text-xs font-medium">Início</span>
          </Link>
          <Link href="/explorar" className="flex flex-col items-center gap-1 text-white/60 hover:text-white/80">
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
    </div>
  );
}
