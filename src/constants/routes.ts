export const ROUTES = {
  home: '/',
  pricing: '/pricing',
  contact: '/contact',
  demo: '/demo',
  organizerRegister: '/organizer/register',
  organizerEventSetup: '/organizer/event-setup',
  organizerDashboard: '/organizer/dashboard',
  collectorLogin: '/collector/login',
  collectorCollect: '/collector/collect',
  receipt: '/receipt/:receiptId',
  receiptFor: (receiptId: string) => `/receipt/${receiptId}`,
  notFound: '/404',
} as const;
