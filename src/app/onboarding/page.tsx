"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StatusBar } from "@/components/StatusBar";

const SLIDES = [
  {
    title: "Seu novo padrão de barbearia começa aqui.",
    description:
      "Experiência premium, profissionais de elite e atenção a cada detalhe.",
    background: "/onboarding1.jpg",
  },
  {
    title: "Onde estilo e precisão se encontram.",
    description:
      "Agende com barbeiros especializados, sem espera e sem complicações.",
    background: "/onboarding2.png",
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const isLast = step === SLIDES.length - 1;

  const handleNext = () => {
    if (isLast) router.push("/welcome");
    else setStep((s) => s + 1);
  };

  const handleSkip = () => router.push("/welcome");

  return (
    <div className="fixed inset-0">
      <StatusBar />
      {/* Imagem de fundo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SLIDES[step].background}
        alt="Barbearia"
        className="absolute inset-0 h-full w-full scale-105 object-cover object-center transition-opacity duration-300"
        key={step}
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Modal glass */}
      <div
        className="glass-panel-bottom"
        style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "32px", paddingBottom: "28px" }}
      >
        <div className="glass-highlight" />
        <div className="relative z-10">
          <div className="mb-6 flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all ${
                  i === step ? "w-6 bg-(--brand-yellow)" : "w-2 bg-white"
                }`}
              />
            ))}
          </div>
          <h1 className="glass-title mb-3">
            {SLIDES[step].title}
          </h1>
          <p className="glass-text mb-8">
            {SLIDES[step].description}
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSkip}
              className="glass-btn-secondary flex-1"
            >
              Pular
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="glass-btn-primary flex-1"
            >
              {isLast ? "Começar" : "Próximo"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
