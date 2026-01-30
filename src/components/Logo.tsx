"use client";

type LogoVariant = "splash" | "welcome";

interface LogoProps {
  variant?: LogoVariant;
  showTagline?: boolean;
  taglineYear?: string;
}

export function Logo({ variant = "splash", showTagline = true, taglineYear = "1959" }: LogoProps) {
  const isSplash = variant === "splash";
  const sizeClass = isSplash ? "text-5xl sm:text-6xl md:text-7xl" : "text-4xl sm:text-5xl";

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative inline-block">
        <span
          className={`font-(family-name:--font-great-vibes) font-normal text-white ${sizeClass}`}
          style={{ fontFamily: "var(--font-great-vibes), cursive" }}
        >
          Seu Elias
        </span>
        <svg
          className="absolute -right-2 -top-1 left-1/2 h-8 w-[calc(100%+1rem)] -translate-x-1/2 sm:h-10 md:h-12"
          viewBox="0 0 200 40"
          fill="none"
          aria-hidden
        >
          <path
            d="M20 35 Q60 5 100 20 Q140 35 180 15"
            stroke="var(--brand-yellow)"
            strokeWidth={4}
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
      {showTagline && (
        <div className="mt-2 flex flex-col items-center gap-0.5">
          <span className="text-xs font-medium uppercase tracking-widest text-white/90">
            DESDE {taglineYear} –
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-(--brand-yellow)">
            BARBA, CABELO E BIGODE
          </span>
        </div>
      )}
    </div>
  );
}
