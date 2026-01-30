"use client";

import Link from "next/link";
import { StatusBar } from "@/components/StatusBar";

const NOTIFICATIONS = [
  {
    id: "1",
    group: "New",
    title: "Notificação de Agendamento",
    body: "Sua reserva está marcada para hoje às 10h, compareça em nossa unidade com 5 minutos de antecedência",
    time: "Hoje às 08h00",
    icon: "megaphone",
  },
  {
    id: "2",
    group: "Ontem",
    title: "Booking Completed!",
    body: "Obrigado pela reserva. Que a contagem regressiva comece.",
    time: "Ontem às 08h00",
    icon: "calendar-check",
  },
  {
    id: "3",
    group: "1 Semana atrás",
    title: "Promoção especial",
    body: "Especial para novos usuários! Você receberá 50% de desconto em todos os lugares.",
    time: null,
    icon: "tag",
  },
];

function IconMegaphone() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-[var(--brand-dark)]">
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.2-3" />
    </svg>
  );
}

function IconCalendarCheck() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-[var(--brand-dark)]">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  );
}

function IconTag() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-[var(--brand-dark)]">
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  );
}

function NotificationIcon({ name }: { name: string }) {
  if (name === "megaphone") return <IconMegaphone />;
  if (name === "calendar-check") return <IconCalendarCheck />;
  return <IconTag />;
}

export default function NotificacoesPage() {
  const groups = Array.from(new Set(NOTIFICATIONS.map((n) => n.group)));

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
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-white">Notificações</h1>
        <div className="w-10 shrink-0" aria-hidden />
      </header>

      <main className="relative z-0 flex-1 overflow-y-auto px-4 pb-8 pt-2">
        {groups.map((group) => (
          <section key={group} className="mb-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--brand-yellow)]">{group}</h2>
            <ul className="space-y-4">
              {NOTIFICATIONS.filter((n) => n.group === group).map((notif) => (
                <li key={notif.id} className="flex gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--brand-yellow)]">
                    <NotificationIcon name={notif.icon} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-[var(--brand-yellow)]">{notif.title}</h3>
                      <button type="button" className="shrink-0 rounded p-1 text-white/50 hover:bg-white/10 hover:text-white/70" aria-label="Opções">
                        <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="12" r="1.5" />
                          <circle cx="6" cy="12" r="1.5" />
                          <circle cx="18" cy="12" r="1.5" />
                        </svg>
                      </button>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-white">{notif.body}</p>
                    {notif.time && <p className="mt-1.5 text-xs text-white/50">{notif.time}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
      <div className="safe-area-bottom h-6 w-full" aria-hidden />
    </div>
  );
}
