"use client";

import Image from "next/image";
import Link from "next/link";
import { StatusBar } from "@/components/StatusBar";

export default function WelcomePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      {/* Luz amarela no topo (igual checkout/home/unidade/login) */}
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
      <main className="relative z-0 flex flex-1 flex-col items-center px-6 pt-8 pb-10">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo.png"
            alt="Seu Elias"
            width={200}
            height={80}
            className="h-auto w-full max-w-[200px] object-contain"
            unoptimized
          />
          <div className="mt-2 flex flex-col items-center gap-0.5">
            <span className="text-xs font-medium uppercase tracking-widest text-white/90">
              DESDE 1999 –
            </span>
            <span className="text-xs font-medium uppercase tracking-widest text-[var(--brand-yellow)]">
              BARBA, CABELO E BIGODE
            </span>
          </div>
        </div>
        <h1 className="mt-12 text-2xl font-bold text-white">Vamos começar</h1>
        <p className="mt-2 max-w-xs text-center text-base text-white/80">
          Mais do que um corte. Uma experiência feita para quem exige excelência.
        </p>
        <div className="mt-10 w-full max-w-sm space-y-4">
          <Link
            href="/login"
            className="block w-full rounded-xl bg-[var(--brand-yellow)] py-3.5 text-center font-medium text-[var(--brand-dark)] transition hover:opacity-90"
          >
            Criar conta com e-mail
          </Link>
          <p className="text-center text-sm text-white/60">Ou cadastre-se rapidamente</p>
          <Link
            href="/login"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/60 bg-transparent py-3.5 font-medium text-white transition hover:bg-white/10"
          >
            <svg width={20} height={20} viewBox="0 0 24 24" aria-hidden>
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar com Google
          </Link>
          <Link
            href="/login"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/60 bg-transparent py-3.5 font-medium text-white transition hover:bg-white/10"
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8 1.08-.45 2.12-1.04 2.9-1.87.12-.14.23-.28.32-.42-.91-.42-1.78-.98-2.46-1.77-.68-.79-1.22-1.74-1.5-2.78zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            Continuar com Apple
          </Link>
        </div>
        <p className="mt-auto pt-8 text-center text-sm text-white/70">
          Já tem uma conta?{" "}
          <Link href="/login" className="font-medium text-[var(--brand-yellow)]">
            Entrar
          </Link>
        </p>
      </main>
      <div className="safe-area-bottom h-6 w-full" aria-hidden />
    </div>
  );
}
