"use client";

import React from "react";

export function StatusBar() {
  const [time, setTime] = React.useState("9:41");
  React.useEffect(() => {
    const t = new Date();
    setTime(t.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
    const id = setInterval(() => {
      const t = new Date();
      setTime(t.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
    }, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="safe-area-top flex h-12 items-center justify-between px-6 text-white">
      <span className="text-[15px] font-medium">{time}</span>
      <div className="flex items-center gap-1.5">
        <svg width={18} height={12} viewBox="0 0 18 12" fill="none" aria-hidden>
          <path d="M1 6h2M4 4h2M7 2h2M10 4h2M13 6h2M16 5h1" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
        </svg>
        <svg width={16} height={12} viewBox="0 0 16 12" fill="none" aria-hidden>
          <path d="M1 6c0-2.5 2-4.5 4.5-4.5S10 3.5 10 6 8 10.5 5.5 10.5 1 8.5 1 6z" stroke="currentColor" strokeWidth={1.2} />
          <path d="M11 4l2-2 3 2-1 3" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg width={25} height={12} viewBox="0 0 25 12" fill="none" aria-hidden>
          <rect x={0.5} y={1.5} width={22} height={9} rx={2.5} stroke="currentColor" strokeWidth={1.2} />
          <path d="M23 4v4c1.5 0 2-1.5 2-2s-.5-2-2-2z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
