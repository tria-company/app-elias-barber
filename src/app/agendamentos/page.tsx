"use client";

import { useState } from "react";
import Link from "next/link";
import { StatusBar } from "@/components/StatusBar";

const DAYS = [
  { abbr: "Dom", num: "01" },
  { abbr: "Seg", num: "02" },
  { abbr: "Ter", num: "03" },
  { abbr: "Qua", num: "04" },
  { abbr: "Qui", num: "05" },
  { abbr: "Sex", num: "06" },
  { abbr: "Sab", num: "07" },
];

type BookedSlot = {
  type: "booked";
  start: string;
  time: string;
  client: string;
  service: string;
  status: string;
};

const SLOTS_INITIAL = [
  { type: "free", start: "08:00", time: "08:00 → 08:10", label: "Horário livre" },
  {
    type: "booked",
    start: "08:10",
    time: "08:10 → 09:00",
    client: "Wagner Almeida",
    service: "Corte",
    status: "Não confirmado",
  },
  { type: "free", start: "08:20", time: "08:20 → 08:30", label: "Horário livre" },
  { type: "break", start: "08:30", time: "08:30 → 08:40", label: "Pausa para o lanche" },
  { type: "free", start: "08:40", time: "08:40 → 08:50", label: "Horário livre" },
  { type: "free", start: "08:50", time: "08:50 → 09:00", label: "Horário livre" },
];

type ServiceItem = { id: string; name: string; duration: string; price: number };

const SERVICOS: ServiceItem[] = [
  { id: "corte", name: "Corte", duration: "40 MIN", price: 55 },
  { id: "corte-barba", name: "Corte e barba", duration: "60 MIN", price: 100 },
  { id: "barba", name: "Barba", duration: "40 MIN", price: 45 },
  { id: "corte-selagem", name: "Corte e selagem", duration: "100 MIN", price: 145 },
  { id: "selagem", name: "Selagem", duration: "80 MIN", price: 90 },
  { id: "corte-relaxamento", name: "Corte e relaxamento", duration: "60 MIN", price: 110 },
];

function formatPrice(value: number) {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

type Slot = (typeof SLOTS_INITIAL)[number];

export default function AgendamentosPage() {
  const [selectedDay, setSelectedDay] = useState("03");
  const [slots, setSlots] = useState<Slot[]>(SLOTS_INITIAL);
  const [modalSlot, setModalSlot] = useState<BookedSlot | null>(null);
  const [servicosConfirmados, setServicosConfirmados] = useState(false);
  const [confirmarServicosOpen, setConfirmarServicosOpen] = useState(false);
  const [tabConfirmar, setTabConfirmar] = useState<"servicos" | "produtos">("servicos");
  const [selectedServiceIds, setSelectedServiceIds] = useState<Set<string>>(new Set(["corte"]));

  const closeSlotModal = () => {
    setModalSlot(null);
    setServicosConfirmados(false);
  };

  const handleFecharComanda = () => {
    if (modalSlot) {
      setSlots((prev) =>
        prev.map((s) =>
          s.type === "booked" && s.client === modalSlot.client && s.start === modalSlot.start
            ? { ...s, status: "FINALIZADO" }
            : s
        )
      );
    }
    closeSlotModal();
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
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-white">Calendário</h1>
        <div className="w-10 shrink-0" aria-hidden />
      </header>

      <main className="relative z-0 flex-1 overflow-y-auto px-4 pb-28 pt-2">
        {/* Mês e dias */}
        <section className="mb-6">
          <h2 className="mb-3 text-base font-bold text-white">Fevereiro</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {DAYS.map((d) => (
              <button
                key={d.num}
                type="button"
                onClick={() => setSelectedDay(d.num)}
                className={`flex shrink-0 flex-col items-center rounded-xl border px-4 py-3 transition ${
                  selectedDay === d.num
                    ? "border-transparent bg-[var(--brand-yellow)] text-[var(--brand-dark)]"
                    : "border-white/30 bg-transparent text-white"
                }`}
              >
                <span className="text-xs font-medium">{d.abbr}</span>
                <span className="text-base font-semibold">{d.num}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Lista de horários */}
        <section className="space-y-2">
          {slots.map((slot, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-14 shrink-0 pt-1 text-sm text-white/90">
                {"start" in slot ? slot.start : slot.time.split(" → ")[0]}
              </div>
              <div className="min-w-0 flex-1">
                {slot.type === "break" ? (
                  <div className="py-2 text-sm text-red-400">
                    <p className="font-medium">{slot.time}</p>
                    <p className="text-white/80">{slot.label}</p>
                  </div>
                ) : (
                  <div
                    role={slot.type === "booked" ? "button" : undefined}
                    tabIndex={slot.type === "booked" ? 0 : undefined}
                    onClick={slot.type === "booked" ? () => { setServicosConfirmados(false); setModalSlot(slot); } : undefined}
                    onKeyDown={
                      slot.type === "booked"
                        ? (e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setServicosConfirmados(false);
                              setModalSlot(slot);
                            }
                          }
                        : undefined
                    }
                    className={`rounded-xl border border-white/10 px-4 py-3 ${
                      slot.type === "booked" ? "cursor-pointer bg-white/5 hover:bg-white/10 active:bg-white/15" : "bg-white/5"
                    }`}
                  >
                    {slot.type === "booked" ? (
                      <>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20">
                              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-white/60">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-white">{slot.client}</p>
                              <p className="text-sm text-white/60">{slot.service}</p>
                            </div>
                          </div>
                          <span
                            className={
                              slot.status === "FINALIZADO"
                                ? "rounded-[9px] bg-[var(--brand-yellow)]/20 px-2 py-0.5 text-xs font-semibold text-[var(--brand-yellow)]"
                                : "text-xs font-medium text-[var(--brand-yellow)]"
                            }
                          >
                            {slot.status}
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm text-white/90">{slot.time}</p>
                      </>
                    ) : (
                      <>
                        <p className="font-medium text-white">{slot.time}</p>
                        <p className="text-sm text-white/60">{slot.label}</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
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
          <Link href="/home" className="flex flex-col items-center gap-1 text-white/60 hover:text-white/80">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <span className="text-xs font-medium">Início</span>
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

      {/* Modal do serviço (bottom sheet) */}
      {modalSlot && (
        <>
          <button
            type="button"
            onClick={closeSlotModal}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            aria-label="Fechar modal"
          />
          <div
            className="fixed left-0 right-0 bottom-0 z-[70] rounded-t-3xl bg-black"
            style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="relative flex items-center justify-center pt-3">
              <div className="h-1 w-10 shrink-0 rounded-full bg-white/40" aria-hidden />
              <button
                type="button"
                onClick={closeSlotModal}
                className="absolute right-4 top-1 flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10"
                aria-label="Fechar"
              >
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 pb-6 pt-2">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[var(--brand-yellow)] bg-[var(--brand-yellow)]/20">
                  <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="var(--brand-yellow)" strokeWidth={2} className="text-[var(--brand-yellow)]">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h2 id="modal-title" className="text-lg font-bold text-white">
                  {modalSlot.client}
                </h2>
                <p className="mt-1 text-sm text-white/90">
                  {servicosConfirmados ? (
                    <>
                      {modalSlot.time.split(" → ")[0]}
                      <span className="text-[var(--brand-yellow)]"> → </span>
                      {modalSlot.time.split(" → ")[1]}
                    </>
                  ) : (
                    modalSlot.time.replace(" → ", " → ")
                  )}
                </p>
              </div>
              <div className="mt-6 space-y-3">
                {servicosConfirmados ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setConfirmarServicosOpen(true)}
                      className="w-full rounded-xl border-2 border-[var(--brand-yellow)] bg-transparent py-3.5 text-base font-semibold text-white transition hover:bg-white/5 active:bg-white/10"
                    >
                      Editar serviços
                    </button>
                    <button
                      type="button"
                      onClick={handleFecharComanda}
                      className="w-full rounded-xl bg-[var(--brand-yellow)] py-3.5 text-base font-semibold text-white transition hover:opacity-90 active:opacity-95"
                    >
                      Fechar comanda
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setConfirmarServicosOpen(true)}
                      className="w-full rounded-xl bg-[var(--brand-yellow)] py-3.5 text-base font-semibold text-[var(--brand-dark)] transition hover:opacity-90 active:opacity-95"
                    >
                      Confirmar serviços
                    </button>
                    <button
                      type="button"
                      onClick={closeSlotModal}
                      className="w-full rounded-xl border-2 border-[var(--brand-yellow)] bg-transparent py-3.5 text-base font-semibold text-white transition hover:bg-white/5 active:bg-white/10"
                    >
                      Fechar comanda
                    </button>
                  </>
                )}
              </div>
              <button
                type="button"
                className={`mt-6 flex w-full items-center justify-center gap-2 hover:underline ${
                  servicosConfirmados ? "text-white" : "text-[var(--brand-yellow)]"
                }`}
              >
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={servicosConfirmados ? "text-white" : "text-[var(--brand-yellow)]"}>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
                <span className="text-sm font-medium">Anexar foto do atendimento</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Modal Confirmar serviços (lista de serviços/produtos) */}
      {confirmarServicosOpen && (
        <>
          <button
            type="button"
            onClick={() => setConfirmarServicosOpen(false)}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            aria-label="Fechar modal"
          />
          <div
            className="fixed left-0 right-0 bottom-0 z-[90] flex max-h-[85vh] flex-col rounded-t-3xl bg-black"
            style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirmar-modal-title"
          >
            <div className="relative flex shrink-0 items-center justify-center pt-3">
              <div className="h-1 w-10 shrink-0 rounded-full bg-white/40" aria-hidden />
              <button
                type="button"
                onClick={() => setConfirmarServicosOpen(false)}
                className="absolute right-4 top-1 flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10"
                aria-label="Fechar"
              >
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Abas Serviços / Produtos */}
            <div className="mt-4 flex justify-center gap-2 px-4">
              <button
                type="button"
                onClick={() => setTabConfirmar("servicos")}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  tabConfirmar === "servicos"
                    ? "bg-[var(--brand-yellow)] text-[var(--brand-dark)]"
                    : "bg-white/10 text-[var(--brand-yellow)]"
                }`}
              >
                Serviços
              </button>
              <button
                type="button"
                onClick={() => setTabConfirmar("produtos")}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  tabConfirmar === "produtos"
                    ? "bg-[var(--brand-yellow)] text-[var(--brand-dark)]"
                    : "bg-white/10 text-[var(--brand-yellow)]"
                }`}
              >
                Produtos
              </button>
            </div>

            {/* Lista rolável */}
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              <h2 id="confirmar-modal-title" className="sr-only">
                Selecionar serviços
              </h2>
              {tabConfirmar === "servicos" &&
                SERVICOS.map((s) => {
                  const selected = selectedServiceIds.has(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setSelectedServiceIds((prev) => {
                          const next = new Set(prev);
                          if (next.has(s.id)) next.delete(s.id);
                          else next.add(s.id);
                          return next;
                        });
                      }}
                      className="flex w-full items-center gap-3 border-b border-white/15 py-4 text-left first:pt-0"
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
                          selected ? "border-emerald-500 bg-emerald-500" : "border-white/60 bg-transparent"
                        }`}
                        aria-hidden
                      >
                        {selected && (
                          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        )}
                      </span>
                      <span className="min-w-0 flex-1 font-medium text-white">{s.name}</span>
                      <span className="shrink-0 rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-black">
                        {s.duration}
                      </span>
                      <span className={`shrink-0 text-sm font-semibold ${selected ? "text-emerald-400" : "text-white"}`}>
                        {formatPrice(s.price)}
                      </span>
                    </button>
                  );
                })}
              {tabConfirmar === "produtos" && (
                <p className="py-6 text-center text-sm text-white/60">Nenhum produto disponível.</p>
              )}
            </div>

            {/* Rodapé: Total + Confirmar */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-t border-white/15 px-4 py-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-white">Total:</span>
                <span className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm font-medium text-white">
                  {formatPrice(
                    Array.from(selectedServiceIds).reduce((sum, id) => {
                      const s = SERVICOS.find((x) => x.id === id);
                      return sum + (s ? s.price : 0);
                    }, 0)
                  )}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setConfirmarServicosOpen(false);
                  setServicosConfirmados(true);
                }}
                className="rounded-xl bg-[var(--brand-yellow)] px-6 py-3 text-base font-semibold text-[var(--brand-dark)] transition hover:opacity-90 active:opacity-95"
              >
                Confirmar
              </button>
            </div>
          </div>
        </>
      )}

      <div className="safe-area-bottom h-6 w-full" aria-hidden />
    </div>
  );
}
