import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Seu Elias - Barbearia",
    short_name: "Elias Barber",
    description: "Barba, cabelo e bigode desde 1959. Agenda, finanças e atendimentos.",
    start_url: "/",
    display: "standalone",
    background_color: "#1f1b14",
    theme_color: "#fbb03b",
    orientation: "portrait",
    scope: "/",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["lifestyle", "business"],
  };
}
