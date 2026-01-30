"use client";

import Link from "next/link";
import { StatusBar } from "@/components/StatusBar";

export default function AgendamentoConcluidoPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      {/* Luz amarela no topo (igual demais telas) */}
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
      <header className="relative z-0 safe-area-top px-4 py-3 text-center">
        <h1 className="text-lg font-bold text-white">Sucesso</h1>
      </header>

      <main className="relative z-0 flex flex-1 flex-col items-center px-6 pb-8 pt-4">
        {/* Ícone check com efeitos dinâmicos */}
        <div className="relative flex items-center justify-center py-8">
          {/* Brilhos: um de cada lado da bolinha (esquerda, direita, cima, baixo) */}
          <span className="success-sparkle absolute left-1/2 top-1/2 -translate-x-[5.5rem] -translate-y-1/2 text-[var(--brand-yellow)] opacity-90" aria-hidden>
            <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-md">
              <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
            </svg>
          </span>
          <span className="success-sparkle absolute left-1/2 top-1/2 translate-x-[5.5rem] -translate-y-1/2 text-[var(--brand-yellow)] opacity-90" aria-hidden>
            <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-md">
              <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
            </svg>
          </span>
          <span className="success-sparkle absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[5.5rem] text-[var(--brand-yellow)] opacity-90" aria-hidden>
            <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-md">
              <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
            </svg>
          </span>
          <span className="success-sparkle absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[4rem] text-[var(--brand-yellow)] opacity-90" aria-hidden>
            <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-md">
              <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
            </svg>
          </span>

          {/* Blob amarelo com check */}
          <div className="success-check-icon success-check-glow relative flex h-28 w-28 items-center justify-center rounded-full bg-[var(--brand-yellow)] shadow-lg shadow-[var(--brand-yellow)]/40">
            <svg
              width={56}
              height={56}
              viewBox="0 0 56 56"
              fill="none"
              className="text-[var(--brand-dark)]"
              aria-hidden
            >
              <path
                className="check-path"
                d="M14 28l10 10 18-22"
                stroke="currentColor"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-center text-2xl font-bold text-white">Agendamento Concluído</h2>
        <p className="mt-3 max-w-sm text-center text-sm leading-relaxed text-white/70">
          Você pode conferir seus agendamentos em &quot;Agendamentos&quot; na tela inicial.
        </p>

        <div
          className="mt-auto flex w-full max-w-sm flex-col gap-3 pt-10"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <button
            type="button"
            className="w-full rounded-xl border-2 border-[var(--brand-yellow)] bg-transparent py-3.5 text-center text-sm font-semibold text-white transition hover:bg-white/5"
          >
            Baixar comprovante de agendamento
          </button>
          <Link
            href="/home"
            className="w-full rounded-xl bg-[var(--brand-yellow)] py-3.5 text-center text-base font-bold text-[var(--brand-dark)] transition hover:opacity-90"
          >
            Voltar para tela inicial
          </Link>
        </div>
      </main>
    </div>
  );
}
