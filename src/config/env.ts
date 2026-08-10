/**
 * Central place for environment-driven configuration.
 * Vite exposes only variables prefixed with VITE_ via import.meta.env.
 * None of these are required for the beta to run locally — sensible
 * fallbacks keep the demo/marketing flows fully functional offline.
 */
export const env = {
  /** Backend endpoint that forwards Feedback/Contact submissions to the
   *  founder's inbox. See src/services/mailService.ts for the contract. */
  mailApiUrl: import.meta.env.VITE_MAIL_API_URL ?? '',
  /** Payment gateway mode. 'mock' is the only mode this beta ships with;
   *  a real integration (e.g. Razorpay) would read a live key here. */
  paymentMode: (import.meta.env.VITE_PAYMENT_MODE as 'mock' | 'live') ?? 'mock',
  siteUrl: import.meta.env.VITE_SITE_URL ?? window.location.origin,
} as const;
