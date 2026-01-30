"use client";

import { useState } from "react";
import Link from "next/link";
import { StatusBar } from "@/components/StatusBar";

type LoginTab = "email" | "phone";

export default function LoginPage() {
  const [tab, setTab] = useState<LoginTab>("email");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      {/* Luz amarela no topo (igual checkout/home/unidade) */}
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
      <main className="relative z-0 flex flex-1 flex-col px-6 pt-4 pb-8">
        <Link
          href="/welcome"
          className="mb-6 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--brand-yellow)] text-[var(--brand-dark)] transition hover:opacity-90"
          aria-label="Voltar"
        >
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>

        <h1 className="text-2xl font-bold text-white">Bem-vindo de volta.</h1>
        <p className="mt-2 text-base text-white/60">
          Acesse sua conta e continue sua experiência premium.
        </p>

        <div className="mt-8 flex rounded-xl bg-black/30 p-1">
          <button
            type="button"
            onClick={() => setTab("email")}
            className={`flex-1 rounded-lg py-3 text-center text-sm font-medium transition ${
              tab === "email"
                ? "bg-[var(--brand-yellow)] text-[var(--brand-dark)]"
                : "text-white/60"
            }`}
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => setTab("phone")}
            className={`flex-1 rounded-lg py-3 text-center text-sm font-medium transition ${
              tab === "phone"
                ? "bg-[var(--brand-yellow)] text-[var(--brand-dark)]"
                : "text-white/60"
            }`}
          >
            Telefone
          </button>
        </div>

        <div className="mt-6 space-y-5">
          {tab === "email" ? (
            <>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  className="w-full rounded-xl border border-white/30 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-[var(--brand-yellow)] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    className="w-full rounded-xl border border-white/30 bg-white/5 py-3.5 pl-4 pr-12 text-white placeholder:text-white/40 focus:border-[var(--brand-yellow)] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? (
                      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                <Link
                  href="#"
                  className="mt-2 block text-right text-sm font-medium text-[var(--brand-yellow)]"
                >
                  Esqueceu sua senha?
                </Link>
              </div>
            </>
          ) : (
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-white">
                Telefone
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Digite seu telefone"
                className="w-full rounded-xl border border-white/30 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-[var(--brand-yellow)] focus:outline-none"
              />
            </div>
          )}
        </div>

        <Link
          href="/home"
          className="mt-6 block w-full rounded-xl bg-[var(--brand-yellow)] py-3.5 text-center font-bold text-[var(--brand-dark)] transition hover:opacity-90"
        >
          Entrar
        </Link>

        <div className="relative mt-8 flex items-center justify-center">
          <span className="absolute inset-x-0 border-t border-white/20" />
          <span className="relative bg-[var(--brand-dark)] px-3 text-sm text-white/50">
            Ou continue com
          </span>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white py-3.5 transition hover:bg-white/90"
          >
            <svg width={20} height={20} viewBox="0 0 24 24" aria-hidden>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="font-medium text-gray-800">Google</span>
          </button>
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white py-3.5 transition hover:bg-white/90"
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="#000" aria-hidden>
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8 1.08-.45 2.12-1.04 2.9-1.87.12-.14.23-.28.32-.42-.91-.42-1.78-.98-2.46-1.77-.68-.79-1.22-1.74-1.5-2.78zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            <span className="font-medium text-gray-800">Apple</span>
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-white/70">
          Ainda não tem conta?{" "}
          <Link href="/welcome" className="font-medium text-[var(--brand-yellow)]">
            Criar conta
          </Link>
        </p>
      </main>
      <div className="safe-area-bottom h-6 w-full" aria-hidden />
    </div>
  );
}
