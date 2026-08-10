export const APP_NAME = 'Utsavam';
export const APP_TAGLINE = 'Every donation deserves a beautiful receipt.';

/** Beta-scope guardrail: keep this list in sync with Section 3.1 of the spec.
 *  Anything not represented by a route in src/routes/AppRouter.tsx is,
 *  by design, unreachable in this build. */
export const BETA_SCOPE = [
  'marketing',
  'pricing',
  'contact',
  'feedback',
  'demo',
  'organizer-register',
  'organizer-event-setup',
  'organizer-dashboard',
  'collector-login',
  'collector-collect',
  'receipt',
] as const;
