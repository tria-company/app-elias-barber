"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { StatusBar } from "@/components/StatusBar";

function formatDateForDisplay(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

type FiltroDias = "7" | "15" | "30" | "60";

const FILTROS: { id: FiltroDias; label: string }[] = [
  { id: "7", label: "7 DIAS" },
  { id: "15", label: "15 DIAS" },
  { id: "30", label: "30 DIAS" },
  { id: "60", label: "60 DIAS" },
];

const CARDS = [
  { label: "Serviços Realizados", count: "80", valor: "R$ 200,00" },
  { label: "Produtos Vendidos", count: "80", valor: "R$ 50,00" },
  { label: "Cliente Atendidos", count: "80", valor: "R$ 150,00" },
];

const RECEBIMENTOS_MOCK = [
  { id: "1", data: "13/06/2020", valor: "R$ 70,00" },
  { id: "2", data: "13/06/2020", valor: "R$ 70,00" },
  { id: "3", data: "13/06/2020", valor: "R$ 70,00" },
  { id: "4", data: "13/06/2020", valor: "R$ 70,00" },
];

/** Dados do resultado do relatório detalhado (Figma 16-1151) */
const RELATORIO_RESUMO_MOCK = { ganhou: "R$ 1.700,00", recebeu: "R$ 1.600,00" };
const RELATORIO_TRANSACOES_MOCK = [
  { id: "r1", cliente: "Wagner Almeida", valor: "R$ 70,00", dataHora: "13/06/2020 às 08:00h", servicos: "Corte", produtos: "Pomoda em pó Baboon", pagamento: "Cartão de Crédito Mastercard **** 1123" },
  { id: "r2", cliente: "Maria Silva", valor: "R$ 40,00", dataHora: "13/06/2020 às 09:30h", servicos: "Barba", produtos: "", pagamento: "Cartão de Crédito Visa **** 4567" },
  { id: "r3", cliente: "João Santos", valor: "R$ 70,00", dataHora: "14/06/2020 às 10:00h", servicos: "Corte e Barba", produtos: "Gel", pagamento: "Dinheiro" },
];

export default function FinancasPage() {
  const [filtro, setFiltro] = useState<FiltroDias>("7");
  const [historicoAberto, setHistoricoAberto] = useState(false);
  const [expandidoId, setExpandidoId] = useState<string | null>(null);
  const [relatorioModalAberto, setRelatorioModalAberto] = useState(false);
  const [periodoModalAberto, setPeriodoModalAberto] = useState(false);
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [relatorioConsultado, setRelatorioConsultado] = useState(false);
  const [expandidoRelatorioId, setExpandidoRelatorioId] = useState<string | null>(null);
  const dataInicialRef = useRef<HTMLInputElement>(null);
  const dataFinalRef = useRef<HTMLInputElement>(null);

  const handleConsultarPeriodo = () => {
    setPeriodoModalAberto(false);
    setRelatorioConsultado(true);
  };

  const fecharRelatorioModal = () => {
    setRelatorioModalAberto(false);
    setRelatorioConsultado(false);
    setExpandidoRelatorioId(null);
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
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-white">Finanças</h1>
        <div className="w-10 shrink-0" aria-hidden />
      </header>

      <main className="relative z-0 flex-1 overflow-y-auto px-4 pb-28 pt-2">
        {/* Filtro + período (Figma: Filtro à esquerda, data à direita) */}
        <section className="mb-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-white">Filtro</span>
            <span className="text-sm text-white/60">23/08 há 30/09</span>
          </div>
          <div className="mt-3 flex gap-2">
            {FILTROS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFiltro(f.id)}
                className={`flex-1 rounded-xl border py-2.5 text-xs font-semibold transition ${
                  filtro === f.id
                    ? "border-transparent bg-[var(--brand-yellow)] text-[var(--brand-dark)]"
                    : "border-white/30 bg-transparent text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </section>

        {/* Você ganhou + valor + indicador ^12% verde */}
        <section className="mb-6">
          <p className="mb-1 text-sm text-white">Você ganhou</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">R$ 15.539,12</span>
            <span className="text-sm font-medium text-emerald-400">^12%</span>
          </div>
        </section>

        {/* Cards: label + count à esquerda, valor em pill à direita */}
        <section className="space-y-3">
          {CARDS.map((card) => (
            <div
              key={card.label}
              className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5"
            >
              <p className="min-w-0 flex-1 text-sm text-white">
                {card.label}: <span className="font-semibold">{card.count}</span>
              </p>
              <span className="shrink-0 rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-white">
                {card.valor}
              </span>
            </div>
          ))}
        </section>

        {/* Relatório detalhado (link laranja + ícone) */}
        <div className="mt-6">
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--brand-yellow)] hover:opacity-90"
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
              <path d="M10 9H8" />
            </svg>
            Relatório detalhado
          </Link>
        </div>

        {/* Histórico De Recebimentos (expansão na mesma tela) */}
        <button
          type="button"
          onClick={() => setHistoricoAberto((v) => !v)}
          className="mt-4 flex w-full items-center justify-between rounded-xl border border-white/20 bg-white/5 px-4 py-3.5 text-left text-sm font-medium text-white transition hover:bg-white/10"
        >
          Histórico De Recebimentos
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className={`shrink-0 text-white/70 transition ${historicoAberto ? "rotate-180" : ""}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {/* Lista de recebimentos (expande para baixo quando histórico aberto) */}
        {historicoAberto && (
          <ul className="mt-3 space-y-3">
            {RECEBIMENTOS_MOCK.map((item) => {
              const itemAberto = expandidoId === item.id;
              return (
                <li key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <button
                    type="button"
                    onClick={() => setExpandidoId((id) => (id === item.id ? null : item.id))}
                    className="flex w-full items-center justify-between px-4 py-3.5 text-left"
                  >
                    <span className="text-sm font-medium text-white">{item.data}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{item.valor}</span>
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        className={`shrink-0 text-white/70 transition ${itemAberto ? "rotate-180" : ""}`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </button>
                  {itemAberto && (
                    <div className="border-t border-white/10 px-4 py-3">
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          className="flex items-center gap-2 text-sm font-medium text-[var(--brand-yellow)] hover:opacity-90"
                        >
                          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <path d="M14 2v6h6" />
                            <path d="M16 13H8" />
                            <path d="M16 17H8" />
                            <path d="M10 9H8" />
                          </svg>
                          Abrir pdf
                        </button>
                        <button
                          type="button"
                          className="flex items-center gap-2 text-sm font-medium text-white hover:opacity-90"
                        >
                          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                            <polyline points="16 6 12 2 8 6" />
                            <line x1="12" y1="2" x2="12" y2="15" />
                          </svg>
                          Compartilhar
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {/* Botão primário: Relatório Detalhado (abre modal) */}
        <button
          type="button"
          onClick={() => setRelatorioModalAberto(true)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand-yellow)] py-3.5 text-base font-semibold text-[var(--brand-dark)] transition hover:opacity-90"
        >
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
            <path d="M10 9H8" />
          </svg>
          Relatório Detalhado
        </button>
      </main>

      {/* Modal Relatório detalhado (Figma 16-1061 / resultado 16-1151) */}
      {relatorioModalAberto && (
        <>
          <button
            type="button"
            onClick={fecharRelatorioModal}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            aria-label="Fechar modal"
          />
          <div
            className="glass-panel-bottom fixed left-0 right-0 bottom-0 z-[70] flex max-h-[90vh] flex-col sm:left-1/2 sm:right-auto sm:-translate-x-1/2"
            style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="relatorio-modal-title"
          >
            <div className="relative flex shrink-0 items-center justify-center pt-4">
              <div className="h-1 w-10 shrink-0 rounded-full bg-white/40" aria-hidden />
              <button
                type="button"
                onClick={fecharRelatorioModal}
                className="absolute right-4 top-2 flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 transition"
                aria-label="Fechar"
              >
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex min-h-0 flex-1 flex-col px-6 pb-6 pt-1">
              <h2 id="relatorio-modal-title" className="text-center text-xl font-bold text-white">
                Relatório detalhado
              </h2>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setPeriodoModalAberto(true)}
                  className="flex w-full items-center gap-3 rounded-xl border-2 border-[var(--brand-yellow)] bg-black/40 px-4 py-3.5 text-left transition hover:bg-white/5"
                >
                  <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="var(--brand-yellow)" strokeWidth={2} className="shrink-0 text-[var(--brand-yellow)]">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span className="text-[var(--brand-yellow)]">
                    {dataInicial && dataFinal
                      ? `${formatDateForDisplay(dataInicial)} há ${formatDateForDisplay(dataFinal)}`
                      : "Selecione o período"}
                  </span>
                </button>
              </div>

              {relatorioConsultado && dataInicial && dataFinal ? (
                <>
                  {/* Resumo: Você Ganhou / Você Recebeu (Figma 16-1151) */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5">
                      <p className="text-sm text-white">Você Ganhou:</p>
                      <span className="shrink-0 rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-white">
                        {RELATORIO_RESUMO_MOCK.ganhou}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5">
                      <p className="text-sm text-white">Você Recebeu:</p>
                      <span className="shrink-0 rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-white">
                        {RELATORIO_RESUMO_MOCK.recebeu}
                      </span>
                    </div>
                  </div>
                  {/* Lista de transações expansível */}
                  <div className="mt-4 flex-1 overflow-y-auto">
                    <ul className="space-y-3">
                      {RELATORIO_TRANSACOES_MOCK.map((item) => {
                        const aberto = expandidoRelatorioId === item.id;
                        return (
                          <li key={item.id} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                            <div className="px-4 py-3">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium text-white">{item.cliente}</p>
                                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/60">
                                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="shrink-0">
                                      <circle cx="12" cy="12" r="10" />
                                      <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                    {item.dataHora}
                                  </p>
                                </div>
                                <span className="shrink-0 text-sm font-semibold text-white">{item.valor}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setExpandidoRelatorioId((id) => (id === item.id ? null : item.id))}
                                className="mt-3 flex items-center gap-2 text-sm font-medium text-[var(--brand-yellow)] hover:opacity-90"
                              >
                                {aberto ? "Ver menos" : "Ver mais"}
                                {aberto ? (
                                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="shrink-0">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                  </svg>
                                ) : (
                                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="shrink-0">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                  </svg>
                                )}
                              </button>
                            </div>
                            {aberto && (
                              <div className="border-t border-white/10 px-4 py-3 space-y-1.5">
                                <p className="text-sm text-white">Serviços: {item.servicos}</p>
                                {item.produtos ? <p className="text-sm text-white">Produtos: {item.produtos}</p> : null}
                                <p className="flex items-center gap-2 text-sm text-white">
                                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="shrink-0">
                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                                    <line x1="1" y1="10" x2="23" y2="10" />
                                  </svg>
                                  {item.pagamento}
                                </p>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="mt-8 flex flex-col items-center text-center">
                  <svg width={64} height={64} viewBox="0 0 24 24" fill="none" stroke="var(--brand-yellow)" strokeWidth={1.5} className="shrink-0 text-[var(--brand-yellow)] opacity-90">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                  </svg>
                  <p className="mt-4 max-w-[260px] text-sm leading-relaxed text-white/60">
                    Selecione um período para visualizar um relatório detalhado
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Modal Período – Data inicial / Data final (Figma 16-1406) */}
      {periodoModalAberto && (
        <>
          <button
            type="button"
            onClick={() => setPeriodoModalAberto(false)}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
            aria-label="Fechar modal"
          />
          <div
            className="glass-panel-bottom fixed left-0 right-0 bottom-0 z-[90] sm:left-1/2 sm:right-auto sm:-translate-x-1/2"
            style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="periodo-modal-title"
          >
            <div className="relative flex items-center justify-center pt-4">
              <div className="h-1 w-10 shrink-0 rounded-full bg-white/40" aria-hidden />
              <button
                type="button"
                onClick={() => setPeriodoModalAberto(false)}
                className="absolute right-4 top-2 flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 transition"
                aria-label="Fechar"
              >
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 pb-6 pt-1">
              <h2 id="periodo-modal-title" className="text-center text-xl font-bold text-white">
                Período
              </h2>
              <div className="mt-6 flex gap-4">
                <div className="flex-1">
                  <p className="mb-2 text-sm text-white/70">Data inicial</p>
                  <input
                    ref={dataInicialRef}
                    type="date"
                    value={dataInicial}
                    onChange={(e) => setDataInicial(e.target.value)}
                    className="sr-only"
                    aria-hidden
                  />
                  <button
                    type="button"
                    onClick={() => dataInicialRef.current?.showPicker?.() ?? dataInicialRef.current?.click()}
                    className="w-full rounded-xl border-2 border-[var(--brand-yellow)] bg-black/40 py-3 text-center text-sm font-medium text-[var(--brand-yellow)] transition hover:bg-white/5"
                  >
                    {dataInicial ? formatDateForDisplay(dataInicial) : "Escolher"}
                  </button>
                </div>
                <div className="flex shrink-0 self-center w-px h-10 bg-white/20" aria-hidden />
                <div className="flex-1">
                  <p className="mb-2 text-sm text-white/70">Data final</p>
                  <input
                    ref={dataFinalRef}
                    type="date"
                    value={dataFinal}
                    onChange={(e) => setDataFinal(e.target.value)}
                    className="sr-only"
                    aria-hidden
                  />
                  <button
                    type="button"
                    onClick={() => dataFinalRef.current?.showPicker?.() ?? dataFinalRef.current?.click()}
                    className="w-full rounded-xl border-2 border-[var(--brand-yellow)] bg-black/40 py-3 text-center text-sm font-medium text-[var(--brand-yellow)] transition hover:bg-white/5"
                  >
                    {dataFinal ? formatDateForDisplay(dataFinal) : "Escolher"}
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={handleConsultarPeriodo}
                className="mt-6 w-full rounded-xl bg-[var(--brand-yellow)] py-3.5 text-base font-semibold text-[var(--brand-dark)] transition hover:opacity-90"
              >
                Consultar
              </button>
            </div>
          </div>
        </>
      )}

      {/* Menu inferior (igual às outras telas) */}
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
      <div className="safe-area-bottom h-6 w-full" aria-hidden />
    </div>
  );
}
