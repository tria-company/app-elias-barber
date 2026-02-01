"use client";

import { useState } from "react";
import Link from "next/link";
import { StatusBar } from "@/components/StatusBar";

type FilaItem = {
  position: number;
  name: string;
  service: string;
  status: "ATRASADO" | "NORMAL";
};

const FILA_INITIAL: FilaItem[] = [
  { position: 1, name: "Wagner Almeida", service: "Corte", status: "ATRASADO" },
  { position: 3, name: "Wagner Almeida", service: "Corte", status: "NORMAL" },
  { position: 4, name: "Wagner Almeida", service: "Corte", status: "NORMAL" },
  { position: 5, name: "Wagner Almeida", service: "Corte", status: "NORMAL" },
  { position: 6, name: "Wagner Almeida", service: "Corte", status: "NORMAL" },
  { position: 7, name: "Wagner Almeida", service: "Corte", status: "NORMAL" },
];

export default function FilaEsperaPage() {
  const [fila, setFila] = useState<FilaItem[]>(FILA_INITIAL);
  const [cancelarItem, setCancelarItem] = useState<FilaItem | null>(null);
  const [motivoCancelamento, setMotivoCancelamento] = useState("");

  const closeCancelarModal = () => {
    setCancelarItem(null);
    setMotivoCancelamento("");
  };

  const handleSalvarCancelamento = () => {
    if (cancelarItem) {
      setFila((prev) => prev.filter((i) => i.position !== cancelarItem.position));
      closeCancelarModal();
    }
  };

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
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-white">Fila de espera</h1>
        <div className="w-10 shrink-0" aria-hidden />
      </header>

      <main className="relative z-0 flex-1 overflow-y-auto px-4 pb-28 pt-2">
        <ul className="space-y-3">
          {fila.map((item) => (
            <li
              key={item.position}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-lg font-bold text-black">
                {item.position}°
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-white">{item.name}</p>
                <span
                  className={`mt-1 inline-block rounded px-2 py-0.5 text-xs font-medium ${
                    item.status === "ATRASADO"
                      ? "bg-red-500/30 text-red-300"
                      : "bg-white/15 text-white/90"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <p className="text-sm font-medium text-white">{item.service}</p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCancelarItem(item)}
                    className="text-xs font-medium text-red-400 hover:underline"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-400"
                  >
                    Atender
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>

      {/* Modal Cancelar – motivo do cancelamento (igual ao print) */}
      {cancelarItem && (
        <>
          <button
            type="button"
            onClick={closeCancelarModal}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            aria-label="Fechar modal"
          />
          <div
            className="glass-panel-bottom fixed left-0 right-0 bottom-0 z-[70] sm:left-1/2 sm:right-auto sm:-translate-x-1/2"
            style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancelar-modal-title"
          >
            <div className="relative flex items-center justify-center pt-4">
              <div className="h-1 w-10 shrink-0 rounded-full bg-white/40" aria-hidden />
              <button
                type="button"
                onClick={closeCancelarModal}
                className="absolute right-4 top-2 flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 transition"
                aria-label="Fechar"
              >
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 pb-6 pt-2">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[var(--brand-yellow)] bg-[var(--brand-yellow)]/10">
                  <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="var(--brand-yellow)" strokeWidth={2} className="text-[var(--brand-yellow)]">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h2 id="cancelar-modal-title" className="text-lg font-bold text-white">
                  {cancelarItem.name}
                </h2>
                <p className="mt-1 text-sm text-white/90">
                  08:10 <span className="text-[var(--brand-yellow)]">→</span> 09:00
                </p>
              </div>
              <div className="mt-6">
                <label htmlFor="motivo-cancelamento" className="block text-sm font-medium text-white">
                  Motivo do cancelamento
                </label>
                <textarea
                  id="motivo-cancelamento"
                  value={motivoCancelamento}
                  onChange={(e) => setMotivoCancelamento(e.target.value)}
                  placeholder="Digite o motivo..."
                  rows={4}
                  className="mt-2 w-full resize-none rounded-xl border-2 border-[var(--brand-yellow)] bg-black/40 px-4 py-3 text-[15px] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--brand-yellow)]/50"
                />
              </div>
              <button
                type="button"
                onClick={handleSalvarCancelamento}
                className="mt-6 w-full rounded-xl bg-[var(--brand-yellow)] py-3.5 text-base font-semibold text-white transition hover:opacity-90 active:opacity-95"
              >
                Salvar
              </button>
            </div>
          </div>
        </>
      )}

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
          <Link href="/fila-espera" className="flex flex-col items-center gap-1 text-[var(--brand-yellow)]" aria-current="page">
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
      <div className="safe-area-bottom h-6 w-full" aria-hidden />
    </div>
  );
}
