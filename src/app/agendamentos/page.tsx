"use client";

import Link from "next/link";
import { StatusBar } from "@/components/StatusBar";

const PROXIMOS = [
  {
    id: "1",
    servico: "Corte",
    barbeiro: "Sem preferência",
    data: "Dia 03/02 - 10:00",
    avatar: null,
  },
];

const HISTORICO = [
  {
    id: "h1",
    servico: "Corte e barba",
    barbeiro: "William Jack",
    data: "Dia 15/01 - 13:30",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    avaliado: false,
  },
  {
    id: "h2",
    servico: "Corte e barba",
    barbeiro: "William Jack",
    data: "Dia 15/01 - 13:30",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    avaliado: true,
    nota: "4.5",
  },
  {
    id: "h3",
    servico: "Corte e barba",
    barbeiro: "William Jack",
    data: "Dia 15/01 - 13:30",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    avaliado: true,
    nota: "4.5",
  },
];

export default function AgendamentosPage() {
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
      <header className="relative z-0 safe-area-top flex items-center justify-between px-4 py-3">
        <Link
          href="/home"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--brand-yellow)] text-[var(--brand-dark)] transition hover:opacity-90"
          aria-label="Voltar"
        >
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Link>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-white">Agendamentos</h1>
        <div className="w-10 shrink-0" aria-hidden />
      </header>

      <main className="relative z-0 flex-1 overflow-y-auto px-4 pb-28 pt-2">
        {/* Próximos */}
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--brand-yellow)]">Próximos</h2>
          <ul className="space-y-3">
            {PROXIMOS.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-2xl bg-white/5 p-4"
              >
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white/20 flex items-center justify-center">
                  {item.avatar ? (
                    <img src={item.avatar} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-white/50">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-white">{item.servico}</p>
                  <p className="text-sm text-white/60">{item.barbeiro}</p>
                  <p className="text-sm text-white/50">{item.data}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <button type="button" className="text-sm font-medium text-red-400 hover:text-red-300">
                    Cancelar
                  </button>
                  <button type="button" className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600">
                    Confirmar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Histórico */}
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--brand-yellow)]">Histórico</h2>
          <ul className="space-y-3">
            {HISTORICO.map((item, index) => (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-2xl bg-white/5 p-4"
              >
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white/20">
                  <img src={item.avatar} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-white">{item.servico}</p>
                  <p className="font-semibold text-white">{item.barbeiro}</p>
                  <p className="text-sm text-white/50">{item.data}</p>
                  <span className="mt-2 inline-block rounded-full bg-[var(--brand-yellow)] px-3 py-1 text-xs font-semibold text-[var(--brand-dark)]">
                    Concluído
                  </span>
                  {item.avaliado ? (
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-white">
                      <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" className="text-[var(--brand-yellow)]">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      {item.nota}
                    </p>
                  ) : (
                    <div className="mt-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <button key={i} type="button" className="text-white/40 hover:text-[var(--brand-yellow)]" aria-label={`Avaliar ${i} estrela`}>
                            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          </button>
                        ))}
                      </div>
                      <p className="mt-1 text-xs text-white/50">Avalie seu atendimento</p>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Navegação inferior (igual Home) – Agenda ativo */}
      <nav
        className="glass-nav-floating fixed left-4 right-4 bottom-4 z-50 px-4 py-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:max-w-md"
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
          <Link href="/explorar" className="flex flex-col items-center gap-1 text-white/60 hover:text-white/80">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span className="text-xs font-medium">Explorar</span>
          </Link>
          <Link href="/agendamentos" className="flex flex-col items-center gap-1 text-[var(--brand-yellow)]" aria-current="page">
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
