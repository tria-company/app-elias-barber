"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StatusBar } from "@/components/StatusBar";
import { BOOKING_STORAGE_KEY, type BookingData } from "@/lib/booking";

function formatDate(d: { day: number; month: number; year: number }) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(d.day)}/${pad(d.month + 1)}`;
}

function formatPrice(value: number) {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

const PAYMENT_OPTIONS = [
  { id: "pix", label: "Pix" },
  { id: "mastercard", label: "Master Card" },
  { id: "paypal", label: "Paypal" },
  { id: "novo", label: "Novo Cartão" },
  { id: "local", label: "Pagar no Local" },
];

const PIX_KEY_MOCK = "123.456.789-00";

export default function CheckoutPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("mastercard");
  const [paymentDropdownOpen, setPaymentDropdownOpen] = useState(false);
  const [pixKeyCopied, setPixKeyCopied] = useState(false);
  const [cardForm, setCardForm] = useState({ number: "", expiry: "", cvv: "", name: "" });

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY_MOCK);
      setPixKeyCopied(true);
      setTimeout(() => setPixKeyCopied(false), 2000);
    } catch {
      setPixKeyCopied(false);
    }
  };

  const isCardPayment = paymentMethod === "mastercard" || paymentMethod === "novo";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem(BOOKING_STORAGE_KEY);
    if (!raw) {
      router.replace("/home");
      return;
    }
    try {
      const data = JSON.parse(raw) as BookingData;
      setBooking(data);
    } catch {
      router.replace("/home");
    }
  }, [router]);

  const handleBack = () => router.back();

  if (!booking) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--brand-yellow)] border-t-transparent" aria-hidden />
      </div>
    );
  }

  const serviceLabels = booking.services.map((s) => s.name).join(", ");

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      {/* Luz amarela só em cima */}
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
      <header className="safe-area-top relative z-10 flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={handleBack}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--brand-yellow)] text-[var(--brand-dark)] hover:opacity-90"
          aria-label="Voltar"
        >
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-white">Checkout</h1>
        <div className="w-10" aria-hidden />
      </header>

      <main className="relative z-0 flex-1 overflow-y-auto px-5 pb-32 pt-4">
        {/* Unidade – sem caixa de modal, direto no fundo */}
        <div className="flex gap-4 p-1">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
            <img src={booking.unitImage} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-white">{booking.unitName}</h2>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-white/70">
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="shrink-0 text-[var(--brand-yellow)]">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{booking.unitAddress}</span>
            </div>
          </div>
        </div>

        {/* Detalhes – sem caixa, fundo preto */}
        <section className="mt-6">
          <h3 className="text-base font-bold text-white">Detalhes</h3>
          <ul className="mt-3 space-y-2 border-b border-white/10 pb-4">
            <li className="flex justify-between text-sm">
              <span className="text-white/70">Serviço</span>
              <span className="text-white">{serviceLabels}</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-white/70">Data</span>
              <span className="text-white">
                {formatDate(booking.date)} às {booking.time.replace(".", ":")}
              </span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-white/70">Desconto</span>
              <span className="text-white">{booking.discount}%</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-white/70">Valor do serviço</span>
              <span className="text-white">{formatPrice(booking.total)}</span>
            </li>
          </ul>
          <div className="my-3 border-t border-white/10" />
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold text-white">Total</span>
            <span className="text-lg font-bold text-white">{formatPrice(booking.total)}</span>
          </div>
        </section>

        {/* Forma de pagamento – fundo preto igual à imagem */}
        <section className="mt-8">
          <h3 className="text-base font-bold text-white">Selecionar forma de pagamento</h3>
          <div className="relative mt-3">
            <button
              type="button"
              onClick={() => setPaymentDropdownOpen((o) => !o)}
              className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-black px-4 py-3.5 text-left shadow-lg"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center text-white">
                <img src="/cards.svg" alt="" className="h-6 w-auto object-contain" />
              </span>
              <span className="flex-1 font-medium text-white">
                {PAYMENT_OPTIONS.find((p) => p.id === paymentMethod)?.label ?? "Cartão de Crédito"}
              </span>
              <svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className={`shrink-0 text-white/80 transition ${paymentDropdownOpen ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {paymentDropdownOpen && (
              <div className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-xl border border-white/10 bg-black py-2 shadow-xl">
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("pix");
                    setPaymentDropdownOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-white/5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400" aria-hidden>
                    <span className="text-xs font-bold">Pix</span>
                  </span>
                  <span className="flex-1 font-medium text-white">Pix</span>
                  {paymentMethod === "pix" ? (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                  ) : (
                    <span className="h-6 w-6 shrink-0 rounded-full border-2 border-white/40" aria-hidden />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("mastercard");
                    setPaymentDropdownOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-white/5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center" aria-hidden>
                    <img src="/mastercard-seeklogo.com%202.svg" alt="" className="h-6 w-auto object-contain" />
                  </span>
                  <span className="flex-1 font-medium text-white">Master Card</span>
                  {paymentMethod === "mastercard" ? (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                  ) : (
                    <span className="h-6 w-6 shrink-0 rounded-full border-2 border-white/40" aria-hidden />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("paypal");
                    setPaymentDropdownOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-white/5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center" aria-hidden>
                    <img src="/paypal-seeklogo.com%201.svg" alt="" className="h-6 w-auto object-contain" />
                  </span>
                  <span className="flex-1 font-medium text-white">Paypal</span>
                  {paymentMethod === "paypal" ? (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                  ) : (
                    <span className="h-6 w-6 shrink-0 rounded-full border-2 border-white/40" aria-hidden />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("novo");
                    setPaymentDropdownOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-white/5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center" aria-hidden>
                    <img src="/cards.svg" alt="" className="h-6 w-auto object-contain opacity-90" />
                  </span>
                  <span className="flex-1 font-medium text-white">Novo Cartão</span>
                  {paymentMethod === "novo" ? (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                  ) : (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-black" aria-hidden>
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("local");
                    setPaymentDropdownOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-white/5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white" aria-hidden>
                    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <span className="flex-1 font-medium text-white">Pagar no Local</span>
                  {paymentMethod === "local" ? (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                  ) : (
                    <span className="h-6 w-6 shrink-0 rounded-full border-2 border-white/40" aria-hidden />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Pix: chave para copiar */}
          {paymentMethod === "pix" && (
            <div className="mt-4 rounded-xl border border-white/10 bg-black p-4">
              <p className="mb-2 text-sm font-medium text-white/80">Chave Pix (CPF)</p>
              <div className="flex items-center gap-3">
                <code className="flex-1 rounded-lg bg-white/10 px-3 py-2.5 font-mono text-sm text-white">
                  {PIX_KEY_MOCK}
                </code>
                <button
                  type="button"
                  onClick={copyPixKey}
                  className="shrink-0 rounded-lg bg-[var(--brand-yellow)] px-4 py-2.5 text-sm font-semibold text-[var(--brand-dark)] transition hover:opacity-90"
                >
                  {pixKeyCopied ? "Copiado!" : "Copiar"}
                </button>
              </div>
            </div>
          )}

          {/* Cartão: formulário rolável com campos */}
          {isCardPayment && (
            <div className="mt-4 max-h-72 overflow-y-auto rounded-xl border border-white/10 bg-black p-4 scrollbar-hide">
              <p className="mb-3 text-sm font-medium text-white/80">Dados do cartão</p>
              <div className="space-y-3">
                <div>
                  <label htmlFor="card-number" className="mb-1 block text-xs text-white/60">
                    Número do cartão
                  </label>
                  <input
                    id="card-number"
                    type="text"
                    inputMode="numeric"
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    value={cardForm.number}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                      setCardForm((prev) => ({ ...prev, number: v.replace(/(\d{4})/g, "$1 ").trim() }));
                    }}
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2.5 text-white placeholder:text-white/40 focus:border-[var(--brand-yellow)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-yellow)]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="card-expiry" className="mb-1 block text-xs text-white/60">
                      Validade (MM/AA)
                    </label>
                    <input
                      id="card-expiry"
                      type="text"
                      inputMode="numeric"
                      placeholder="MM/AA"
                      maxLength={5}
                      value={cardForm.expiry}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                        if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2);
                        setCardForm((prev) => ({ ...prev, expiry: v }));
                      }}
                      className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2.5 text-white placeholder:text-white/40 focus:border-[var(--brand-yellow)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-yellow)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="card-cvv" className="mb-1 block text-xs text-white/60">
                      CVV
                    </label>
                    <input
                      id="card-cvv"
                      type="text"
                      inputMode="numeric"
                      placeholder="123"
                      maxLength={4}
                      value={cardForm.cvv}
                      onChange={(e) =>
                        setCardForm((prev) => ({ ...prev, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))
                      }
                      className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2.5 text-white placeholder:text-white/40 focus:border-[var(--brand-yellow)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-yellow)]"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="card-name" className="mb-1 block text-xs text-white/60">
                    Nome no cartão
                  </label>
                  <input
                    id="card-name"
                    type="text"
                    placeholder="Nome como está no cartão"
                    value={cardForm.name}
                    onChange={(e) => setCardForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2.5 text-white placeholder:text-white/40 focus:border-[var(--brand-yellow)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-yellow)]"
                  />
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer
        className="fixed bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-black px-5 py-4"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <button
          type="button"
          onClick={() => router.push("/agendamento-concluido")}
          className={`w-full rounded-xl py-3.5 text-center text-base font-bold transition hover:opacity-90 ${
            paymentMethod === "local"
              ? "bg-[var(--brand-yellow)] text-[var(--brand-dark)]"
              : "bg-[var(--brand-yellow)] text-[var(--brand-dark)]"
          }`}
        >
          {paymentMethod === "local" ? "Confirmar Agendamento" : "Pagar agora"}
        </button>
      </footer>
    </div>
  );
}
