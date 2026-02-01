# App Seu Elias

App de agendamento para barbearia **Seu Elias** – barba, cabelo e bigode desde 1959.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **TypeScript**

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login (com a mesma conta GitHub).
2. Clique em **Add New** → **Project**.
3. **Import** o repositório: `tria-company/app-elias-barber`.
4. A Vercel detecta Next.js automaticamente. Clique em **Deploy**.
5. Aguarde o build. O app ficará disponível em um link como `app-elias-barber-xxx.vercel.app`.

Cada push na branch `main` gera um novo deploy automaticamente.

## Estrutura do app

- **/** – Splash
- **/onboarding** – Onboarding
- **/welcome** – Boas-vindas
- **/login** – Login
- **/home** – Início (unidades, calendário, horários)
- **/unidade/[id]** – Detalhes da unidade, serviços, barbeiros, agendar
- **/checkout** – Pagamento (Pix, cartão, pagar no local)
- **/agendamento-concluido** – Sucesso após agendamento
- **/agendamentos** – Próximos e histórico
- **/explorar** – Localização (mapa)
- **/notificacoes** – Notificações
- **/perfil** – Perfil e configurações

## Repositório

[github.com/tria-company/app-elias-barber](https://github.com/tria-company/app-elias-barber)
