"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StatusBar } from "@/components/StatusBar";

export default function SplashPage() {
  const router = useRouter();
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => router.push("/onboarding"), 2500);
    return () => clearTimeout(t);
  }, [router]);

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
      <main className="relative z-0 flex flex-1 flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center text-center">
          <div className="splash-logo-enter relative flex justify-center">
            {!logoError ? (
              <Image
                src="/logo.png"
                alt="Seu Elias - Barba, cabelo e bigode desde 1959"
                width={280}
                height={120}
                className="h-auto w-full max-w-[280px] object-contain"
                priority
                unoptimized
                onError={() => setLogoError(true)}
              />
            ) : (
              <span
                className="font-(family-name:--font-great-vibes) text-5xl text-white sm:text-6xl"
                style={{ fontFamily: "var(--font-great-vibes), cursive" }}
              >
                Seu Elias
              </span>
            )}
          </div>
          <div className="splash-tagline-enter mt-3 flex flex-col items-center gap-0.5">
            <span className="text-xs font-medium uppercase tracking-widest text-white/90">
              DESDE 1959 –
            </span>
            <span className="text-xs font-medium uppercase tracking-widest text-brand-yellow">
              BARBA, CABELO E BIGODE
            </span>
          </div>
        </div>
      </main>
      <div className="safe-area-bottom h-6 w-full" aria-hidden />
    </div>
  );
}
