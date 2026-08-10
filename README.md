# Utsavam — Beta Frontend

A React + TypeScript implementation of the Utsavam beta scope: Organizer
(mandal) setup, Donation Collector workflow, digital receipts with QR
retrieval, a zero-signup Demo Mode, Feedback/Contact forms, and a pricing
page — and nothing else, per the beta spec's hard scope boundary.

## Stack

React 19 · TypeScript · Tailwind CSS v4 · React Router v7 · react-hook-form +
Zod · Framer Motion · lucide-react · `qrcode` · `html-to-image`

## Getting started

```bash
npm install
npm run dev
```

No environment variables are required to run the app — see `.env.example`
for the two optional integration points (mail API, site origin for QR
links).

## Project structure

```
src/
├── components/   # ui/ (primitives), layout/, marketing/, receipt/
├── features/     # organizer/, collector/, demo/, feedback/, contact/
├── pages/        # one file per route
├── routes/       # AppRouter.tsx — the single source of truth for scope
├── services/     # storage, payment (mock), mail, receipt/QR, mandal data
├── hooks/        # session hooks (organizer / collector)
├── contexts/     # ToastContext
├── utils/        # zod validators, formatters, id generation, download
├── types/        # domain types
├── constants/    # ROUTES, app constants
├── config/       # env.ts
└── data/         # pricing.json (edit this, not the components)
```

## Backend requirements for a real launch

This beta is a **frontend-only** build. It stands in for a backend using
`localStorage` (production data) and `sessionStorage` (Demo Mode, isolated
and cleared on exit). Before this goes further than a marketing demo, it
needs:

1. **A real backend + database.** Receipts currently resolve only on the
   browser/device that created them. A donor scanning the QR on their own
   phone needs the receipt served from a server, not read from the
   collector's local storage.
2. **A live payment gateway integration.** `src/services/paymentService.ts`
   is the single seam to swap the mock for Razorpay/Cashfree/etc. — order
   creation and webhook verification belong server-side.
3. **The mail-forwarding endpoint** referenced by `VITE_MAIL_API_URL` for
   Feedback/Contact submissions (Section 7 of the spec).
4. **Real authentication** for Organizer/Collector accounts (this build uses
   a lightweight client-side "session" with no password hashing or server
   verification — fine for a demo, not for production).

## Scope guardrail

`src/constants/app.ts` lists the in-scope surface from Section 3.1 of the
spec, and `src/routes/AppRouter.tsx` is the only place routes are declared —
if a feature isn't wired there, it doesn't exist in the build.
