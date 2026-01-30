"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { StatusBar } from "@/components/StatusBar";
import { BOOKING_STORAGE_KEY } from "@/lib/booking";

const BARBEIROS = [
  { id: "luiz", name: "Luiz Gustavo", rating: "4.9", reviews: "3.2k", avatar: "https://randomuser.me/api/portraits/men/44.jpg" },
  { id: "italo", name: "Italo Christian", rating: "4.9", reviews: "2.8k", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: "natanael", name: "Natanael Tomás", rating: "4.9", reviews: "2.1k", avatar: "https://randomuser.me/api/portraits/men/67.jpg" },
];

const SERVICOS = [
  { id: "corte", name: "Corte", duration: "40 MIN", price: 55 },
  { id: "corte-barba", name: "Corte e barba", duration: "60 MIN", price: 100 },
  { id: "barba", name: "Barba", duration: "40 MIN", price: 45 },
  { id: "corte-selagem", name: "Corte e selagem", duration: "100 MIN", price: 145 },
  { id: "selagem", name: "Selagem", duration: "80 MIN", price: 90 },
  { id: "corte-relaxamento", name: "Corte e relaxamento", duration: "80 MIN", price: 110 },
];

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const HORARIOS = ["09:00", "10:00", "11:40", "13:20", "14:40", "15:20", "16:00", "17:00"];

const UNITS: Record<
  string,
  {
    name: string;
    address: string;
    rating: string;
    reviewsCount: number;
    image: string;
    about: string;
    gallery: string[];
  }
> = {
  "1": {
    name: "Seu Elias Alphaville",
    address: "Alameda Araguaia, 750 - LOJA 10",
    rating: "4.9",
    reviewsCount: 171,
    image: "/cliente.png",
    about:
      "Welcome to Seu Elias, a serene urban Barbershop in the vibrant heart of the city. Experience the perfect fusion of traditional barbering craft and modern style.",
    gallery: ["/onboarding1.jpg", "/onboarding2.png", "/onboarding1.jpg"],
  },
  "2": {
    name: "Seu Elias Moema",
    address: "Av. Ibirapuera, 2907",
    rating: "4.8",
    reviewsCount: 98,
    image: "/onboarding2.png",
    about:
      "Nossa unidade Moema traz o mesmo cuidado e qualidade Seu Elias no coração de São Paulo. Ambiente aconchegante e profissionais de confiança.",
    gallery: ["/onboarding2.png", "/onboarding1.jpg", "/onboarding2.png"],
  },
};

export default function UnidadePage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === "string" ? params.id : "1";
  const unit = UNITS[id] ?? UNITS["1"];
  const [selectedBarbeiro, setSelectedBarbeiro] = useState<string | null>(null);
  const [servicosModalOpen, setServicosModalOpen] = useState(false);
  const [selectedServicos, setSelectedServicos] = useState<Set<string>>(new Set(["corte"]));

  const toggleServico = (id: string) => {
    setSelectedServicos((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalServicos = SERVICOS.filter((s) => selectedServicos.has(s.id)).reduce((sum, s) => sum + s.price, 0);
  const formatPrice = (value: number) => `R$ ${value.toFixed(2).replace(".", ",")}`;

  const [dataHoraModalOpen, setDataHoraModalOpen] = useState(false);
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<{ day: number; month: number; year: number }>({
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
  });
  const [selectedTime, setSelectedTime] = useState(HORARIOS[1]);

  const prevWeek = () => {
    const d = new Date(selectedDate.year, selectedDate.month, selectedDate.day - 7);
    setSelectedDate({ day: d.getDate(), month: d.getMonth(), year: d.getFullYear() });
  };

  const nextWeek = () => {
    const d = new Date(selectedDate.year, selectedDate.month, selectedDate.day + 7);
    setSelectedDate({ day: d.getDate(), month: d.getMonth(), year: d.getFullYear() });
  };

  const getWeekDays = () => {
    const base = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
    const dayOfWeek = base.getDay();
    const sunday = new Date(base);
    sunday.setDate(sunday.getDate() - dayOfWeek);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(sunday);
      d.setDate(d.getDate() + i);
      return d;
    });
  };

  const weekDays = getWeekDays();
  const daysWithDots = [16, 17];

  const goToCheckout = () => {
    const services = SERVICOS.filter((s) => selectedServicos.has(s.id)).map((s) => ({ id: s.id, name: s.name, price: s.price }));
    const total = services.reduce((sum, s) => sum + s.price, 0);
    const barberName = selectedBarbeiro === null ? "Sem preferência" : BARBEIROS.find((b) => b.id === selectedBarbeiro)?.name ?? null;
    const booking = {
      unitId: id,
      unitName: unit.name,
      unitAddress: unit.address,
      unitImage: unit.image,
      services,
      date: selectedDate,
      time: selectedTime,
      barberName,
      total,
      discount: 0,
    };
    sessionStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(booking));
    router.push("/checkout");
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-black">
      {/* Luz amarela no topo (igual checkout) */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-0 -translate-x-1/2"
        style={{
          width: "500px",
          height: "320px",
          background: "radial-gradient(ellipse at center top, rgba(251, 176, 59, 0.18) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 z-0 flex flex-col">
        {/* Status bar e botões fixos no topo (não rolam) */}
        <div className="absolute left-0 right-0 top-0 z-20">
          <StatusBar />
        </div>
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute left-4 top-14 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/50"
          aria-label="Voltar"
        >
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          className="absolute right-4 top-14 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/50"
          aria-label="Compartilhar"
        >
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="m8.59 13.51 6.82 3.98M15.41 6.51l-6.82 3.98" />
          </svg>
        </button>

        {/* Conteúdo rolável: hero + resto (imagem sobe ao rolar) */}
        <main
          className="flex-1 overflow-y-auto pb-32"
          style={{ background: "#000" }}
        >
          {/* Hero: imagem rola junto com o conteúdo */}
          <div className="relative h-[42vh] min-h-[280px] w-full shrink-0 overflow-hidden rounded-b-3xl">
            <img
              src={unit.image}
              alt=""
              className="h-full w-full object-cover"
            />
            <h1 className="absolute left-0 right-0 top-24 z-10 text-center text-2xl font-bold text-white drop-shadow-lg">
              {unit.name}
            </h1>
          </div>

          <div className="px-5 pt-2">
          {/* Loja + endereço e avaliação lado a lado */}
          <div className="mt-2 flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-white">{unit.name}</h2>
              <div className="mt-0.5 flex items-center gap-1.5 text-white/80">
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="shrink-0 text-[var(--brand-yellow)]">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-xs">{unit.address}</span>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-lg font-bold text-white">{unit.rating}</p>
              <div className="mt-0.5 flex justify-end gap-0.5 text-[var(--brand-yellow)]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="mt-0.5 text-[11px] text-white/60">Baseado em {unit.reviewsCount} avaliações</p>
            </div>
          </div>

          {/* Sobre nós */}
          <section className="mt-8">
            <h3 className="text-lg font-semibold text-white">Sobre nós</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{unit.about}</p>
            <button type="button" className="mt-2 text-sm font-medium text-[var(--brand-yellow)] hover:underline">
              Read More...
            </button>
          </section>

          {/* Galeria */}
          <section className="mt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Galeria</h3>
              <button type="button" className="text-sm font-medium text-[var(--brand-yellow)] hover:underline">
                Mostrar tudo
              </button>
            </div>
            <div className="mt-3 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {unit.gallery.map((src, i) => (
                <div key={i} className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl">
                  <img src={src} alt="" className="h-full w-full object-cover" />
                  {i === unit.gallery.length - 1 ? (
                    <div className="absolute inset-0 flex items-end justify-end bg-black/40 p-1.5">
                      <span className="rounded bg-black/60 px-2 py-0.5 text-xs font-medium text-white">+05</span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          {/* Botão Serviços */}
          <section className="mt-8">
            <button
              type="button"
              onClick={() => setServicosModalOpen(true)}
              className="rounded-xl border-2 border-[var(--brand-yellow)] bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              Serviços
            </button>
          </section>

          {/* Barbeiros */}
          <section className="mt-8">
            <h3 className="text-lg font-semibold text-white">Barbeiros</h3>
            <ul className="mt-3 space-y-3">
              <li className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/20">
                  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-white/60">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white">Sem preferência</p>
                  <p className="text-xs text-white/60">Qualquer barbeiro</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedBarbeiro(null)}
                  className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    selectedBarbeiro === null
                      ? "bg-[var(--brand-yellow)] text-[var(--brand-dark)]"
                      : "border border-[var(--brand-yellow)] text-[var(--brand-yellow)] hover:bg-white/5"
                  }`}
                >
                  {selectedBarbeiro === null ? "Selecionado" : "Selecionar +"}
                </button>
              </li>
              {BARBEIROS.map((b) => (
                <li key={b.id} className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white/20">
                    <img src={b.avatar} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white">{b.name}</p>
                    <p className="flex items-center gap-1 text-xs text-white/70">
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" className="text-[var(--brand-yellow)]">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      {b.rating} ({b.reviews})
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedBarbeiro(b.id)}
                    className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      selectedBarbeiro === b.id
                        ? "bg-[var(--brand-yellow)] text-[var(--brand-dark)]"
                        : "border border-[var(--brand-yellow)] text-[var(--brand-yellow)] hover:bg-white/5"
                    }`}
                  >
                    {selectedBarbeiro === b.id ? "Selecionado" : "Selecionar +"}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Localização */}
          <section className="mt-8">
            <h3 className="text-lg font-semibold text-white">Localização</h3>
            <div className="mt-2 flex items-center gap-1.5 text-white/80">
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="shrink-0 text-[var(--brand-yellow)]">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-sm">{unit.address}</span>
            </div>
            <div className="relative mt-3 overflow-hidden rounded-xl">
              <img src="/local.png" alt="Mapa da localização" className="h-48 w-full object-cover object-center" />
              <p className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
                2.1 KM da sua localização atual
              </p>
            </div>
          </section>
          </div>
        </main>

        {/* Footer fixo: Alterar data e hora + Agendar agora */}
        <footer
          className="absolute bottom-0 left-0 right-0 z-10 flex gap-3 px-5 pb-8 pt-4"
          style={{
            background: "#000",
            paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
          }}
        >
          <button
            type="button"
            onClick={() => setDataHoraModalOpen(true)}
            className="flex-1 rounded-xl border-2 border-[var(--brand-yellow)] bg-[var(--brand-dark)] py-3.5 text-center text-sm font-semibold text-white transition hover:bg-white/5"
          >
            Alterar data e hora
          </button>
          <button
            type="button"
            onClick={goToCheckout}
            className="flex-1 rounded-xl bg-[var(--brand-yellow)] py-3.5 text-sm font-semibold text-[var(--brand-dark)] shadow-lg shadow-[var(--brand-yellow)]/25 transition hover:opacity-90"
          >
            Agendar agora
          </button>
        </footer>

        {/* Modal Serviços */}
        {servicosModalOpen && (
          <>
            <button
              type="button"
              onClick={() => setServicosModalOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              aria-label="Fechar"
            />
            <div
              className="glass-panel-bottom fixed bottom-0 left-0 right-0 z-50 flex max-h-[85vh] flex-col"
              style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-servicos-title"
            >
              <div className="mx-auto mb-2 h-1 w-10 shrink-0 rounded-full bg-white/30" aria-hidden />
              <div className="flex items-center justify-between px-5 pb-3">
                <h2 id="modal-servicos-title" className="text-lg font-bold text-white">
                  Serviços
                </h2>
                <button
                  type="button"
                  onClick={() => setServicosModalOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white"
                  aria-label="Fechar"
                >
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto px-5 scrollbar-hide">
                <ul className="divide-y divide-white/15">
                  {SERVICOS.map((s) => {
                    const selected = selectedServicos.has(s.id);
                    return (
                      <li key={s.id}>
                        <button
                          type="button"
                          onClick={() => toggleServico(s.id)}
                          className="flex w-full items-center gap-3 py-4 text-left"
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
                              selected ? "border-[var(--brand-yellow)] bg-[var(--brand-yellow)]" : "border-white/50 bg-transparent"
                            }`}
                          >
                            {selected && (
                              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="var(--brand-dark)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                            )}
                          </span>
                          <span className="min-w-0 flex-1 font-medium text-white">{s.name}</span>
                          <span className="shrink-0 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white/90">
                            {s.duration}
                          </span>
                          <span className={`shrink-0 text-sm font-semibold ${selected ? "text-[var(--brand-yellow)]" : "text-white"}`}>
                            {formatPrice(s.price)}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/15 bg-[var(--brand-yellow)] px-5 py-4">
                <span className="text-base font-bold text-[var(--brand-dark)]">{formatPrice(totalServicos)}</span>
                <button
                  type="button"
                  onClick={() => setServicosModalOpen(false)}
                  className="rounded-xl bg-[var(--brand-dark)] px-6 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                >
                  Continuar
                </button>
              </div>
            </div>
          </>
        )}

        {/* Modal Alterar Data e Hora */}
        {dataHoraModalOpen && (
          <>
            <button
              type="button"
              onClick={() => setDataHoraModalOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              aria-label="Fechar"
            />
            <div
              className="glass-panel-bottom fixed bottom-0 left-0 right-0 z-50 flex max-h-[85vh] flex-col"
              style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-data-hora-title"
            >
              <div className="mx-auto mb-2 h-1 w-10 shrink-0 rounded-full bg-white/30" aria-hidden />
              <div className="flex items-center justify-between px-5 pb-3">
                <h2 id="modal-data-hora-title" className="text-lg font-bold text-white">
                  Selecionar Dia e horário
                </h2>
                <button
                  type="button"
                  onClick={() => setDataHoraModalOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white"
                  aria-label="Fechar"
                >
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto px-5 scrollbar-hide">
                {/* Calendário: mês/ano à esquerda, setas à direita */}
                <div className="flex items-center justify-between py-3">
                  <span className="text-base font-semibold text-white">
                    {MESES[selectedDate.month]} {selectedDate.year}
                  </span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={prevWeek}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white"
                      aria-label="Semana anterior"
                    >
                      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={nextWeek}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white"
                      aria-label="Próxima semana"
                    >
                      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Dias da semana (Dom, Seg, Ter...) acima dos números */}
                <div className="grid grid-cols-7 gap-0 pb-2">
                  {WEEKDAYS.map((abbr) => (
                    <span key={abbr} className="text-center text-xs font-medium text-white/80">
                      {abbr}
                    </span>
                  ))}
                </div>
                {/* Uma semana de dias: número abaixo do dia da semana, selecionado = círculo amarelo, alguns com bolinha */}
                <div className="grid grid-cols-7 gap-1 pb-4">
                  {weekDays.map((d) => {
                    const dayNum = d.getDate();
                    const month = d.getMonth();
                    const year = d.getFullYear();
                    const isSelected =
                      selectedDate.day === dayNum && selectedDate.month === month && selectedDate.year === year;
                    const hasDot = daysWithDots.includes(dayNum);
                    return (
                      <button
                        key={d.getTime()}
                        type="button"
                        onClick={() => setSelectedDate({ day: dayNum, month, year })}
                        className={`flex flex-col items-center justify-center rounded-full py-2.5 transition ${
                          isSelected
                            ? "bg-[var(--brand-yellow)] text-[var(--brand-dark)]"
                            : "text-white hover:bg-white/10"
                        }`}
                      >
                        <span className={`text-sm font-semibold ${isSelected ? "text-white" : ""}`}>
                          {dayNum}
                        </span>
                        {hasDot && !isSelected && (
                          <span className="mt-1 h-1 w-1 rounded-full bg-[var(--brand-yellow)]" aria-hidden />
                        )}
                      </button>
                    );
                  })}
                </div>
                {/* Horário */}
                <p className="mb-2 text-sm font-semibold text-white">Horário</p>
                <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                  {HORARIOS.map((h) => {
                    const isSelected = selectedTime === h;
                    return (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setSelectedTime(h)}
                        className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                          isSelected
                            ? "bg-[var(--brand-yellow)] text-[var(--brand-dark)]"
                            : "border-2 border-[var(--brand-yellow)] bg-transparent text-white hover:bg-white/5"
                        }`}
                      >
                        {h}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="mt-auto border-t border-white/15 px-5 py-4">
                <button
                  type="button"
                  onClick={() => setDataHoraModalOpen(false)}
                  className="w-full rounded-xl bg-[var(--brand-yellow)] py-3.5 text-center text-sm font-bold text-[var(--brand-dark)] transition hover:opacity-90"
                >
                  Salvar Data e hora
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
