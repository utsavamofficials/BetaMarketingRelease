import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PageLayout } from "../components/layout/PageLayout";
import { BareLayout } from "../components/layout/BareLayout";
import { Spinner } from "../components/ui/Spinner";
import { ROUTES } from "../constants/routes";
import releaseDocRaw from "../release/data/releaseDoc.json";
import { Navigate, Outlet } from "react-router-dom";

// Route-level code splitting keeps the marketing landing page's initial
// bundle small; heavier flows (forms, QR/receipt rendering) load on demand.
const MarketingPage = lazy(() =>
  import("../pages/MarketingPage").then((m) => ({ default: m.MarketingPage })),
);
const PricingPage = lazy(() =>
  import("../pages/PricingPage").then((m) => ({ default: m.PricingPage })),
);
const ContactPage = lazy(() =>
  import("../pages/ContactPage").then((m) => ({ default: m.ContactPage })),
);
const DemoPage = lazy(() =>
  import("../pages/DemoPage").then((m) => ({ default: m.DemoPage })),
);
const OrganizerRegisterPage = lazy(() =>
  import("../pages/OrganizerRegisterPage").then((m) => ({
    default: m.OrganizerRegisterPage,
  })),
);
const OrganizerEventSetupPage = lazy(() =>
  import("../pages/OrganizerEventSetupPage").then((m) => ({
    default: m.OrganizerEventSetupPage,
  })),
);
const OrganizerDashboardPage = lazy(() =>
  import("../pages/OrganizerDashboardPage").then((m) => ({
    default: m.OrganizerDashboardPage,
  })),
);
const CollectorLoginPage = lazy(() =>
  import("../pages/CollectorLoginPage").then((m) => ({
    default: m.CollectorLoginPage,
  })),
);
const CollectorCollectPage = lazy(() =>
  import("../pages/CollectorCollectPage").then((m) => ({
    default: m.CollectorCollectPage,
  })),
);
const ReceiptPage = lazy(() =>
  import("../pages/ReceiptPage").then((m) => ({ default: m.ReceiptPage })),
);
const NotFoundPage = lazy(() =>
  import("../pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })),
);
const ReleasePage = lazy(() =>
  import("../release/pages/ReleasePage").then((m) => ({
    default: m.ReleasePage,
  })),
);

function withSuspense(node: ReactNode) {
  return <Suspense fallback={<Spinner />}>{node}</Suspense>;
}

const releaseDoc = (
  releaseDocRaw as {
    release: {
      targetTimestamp: string;
    };
  }
).release;

function ReleaseGate() {
  const targetMs = new Date(releaseDoc.targetTimestamp).getTime();
  const isReleased = Date.now() >= targetMs;

  if (!isReleased) {
    return <Navigate to={ROUTES.release} replace />;
  }

  return <Outlet />;
}

const router = createBrowserRouter([
  {
    element: <BareLayout />,
    children: [
      {
        path: ROUTES.release,
        element: withSuspense(<ReleasePage />),
      },
    ],
  },
  {
    element: <ReleaseGate />,
    children: [
      {
        element: <PageLayout />,
        children: [
          { path: ROUTES.home, element: withSuspense(<MarketingPage />) },
          { path: ROUTES.pricing, element: withSuspense(<PricingPage />) },
          { path: ROUTES.contact, element: withSuspense(<ContactPage />) },
          {
            path: ROUTES.organizerRegister,
            element: withSuspense(<OrganizerRegisterPage />),
          },
          {
            path: ROUTES.organizerEventSetup,
            element: withSuspense(<OrganizerEventSetupPage />),
          },
          {
            path: ROUTES.organizerDashboard,
            element: withSuspense(<OrganizerDashboardPage />),
          },
          {
            path: ROUTES.collectorLogin,
            element: withSuspense(<CollectorLoginPage />),
          },
          {
            path: "*",
            element: withSuspense(<NotFoundPage />),
          },
        ],
      },

      {
        element: <BareLayout />,
        children: [
          {
            path: ROUTES.demo,
            element: withSuspense(<DemoPage />),
          },
          {
            path: ROUTES.collectorCollect,
            element: withSuspense(<CollectorCollectPage />),
          },
          {
            path: ROUTES.receipt,
            element: withSuspense(<ReceiptPage />),
          },
        ],
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
