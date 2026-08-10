import { HeartHandshake, QrCode, Sparkles } from "lucide-react";
import logo from "../../assets/logoCircleNoBg.png";

/**
 * Self-contained illustrative mock of the shareable receipt.
 *
 * Styled to match the Utsavam design system:
 * semantic theme variables, subtle borders, restrained shadows,
 * warm accent interactions, and lightweight motion.
 */
export function ReceiptMockup() {
  return (
    <div className="group relative mx-auto w-full max-w-sm">
      {/* Floating sparkle */}
      <div
        className="
          absolute -right-3 -top-3 z-10
          flex h-10 w-10 items-center justify-center
          rounded-full
          border border-[var(--border)]
          bg-[var(--text-h)]
          text-[var(--accent)]
          shadow-sm
          transition-all duration-500
          group-hover:-translate-y-1
          group-hover:rotate-6
        "
      >
        <Sparkles
          className="
            h-4 w-4
            animate-pulse
            transition-transform duration-500
            group-hover:scale-110
          "
          aria-hidden="true"
        />
      </div>

      {/* Receipt */}
      <div
        className="
          overflow-hidden
          rounded-2xl
          border border-[var(--border)]
          bg-white
          shadow-sm

          transition-all duration-500 ease-out
          group-hover:-translate-y-1
          group-hover:shadow-md
        "
      >
        {/* Receipt header */}
        <div
          className="
            border-b border-[var(--border)]
            px-6 py-5
            text-center
          "
        >
          <div
            className="
              mx-auto mb-3
              flex h-auto w-auto items-center justify-center
              rounded-xl
              text-white
              transition-transform duration-500
              group-hover:scale-105
            "
          >
            <img
              src={logo}
              alt="logo"
              aria-hidden="true"
              className="
              mx-auto mb-3
              flex h-18 w-18 items-center justify-center
              rounded-xl
              text-white
              transition-transform duration-500
              group-hover:scale-105
            "
            />
          </div>

          <p
            className="
              text-xs font-medium uppercase
              tracking-[0.16em]
              text-[var(--text)]
            "
          >
            Donation receipt
          </p>

          <h3
            className="
              mt-1
              text-lg font-semibold
              text-[var(--text-h)]
            "
          >
            Ganesh Utsav 2026
          </h3>

          <p className="mt-1 text-sm text-[var(--text)]">
            Shree Ganesh Mitra Mandal
          </p>
        </div>

        {/* Amount */}
        <div className="px-6 py-6 text-center">
          <p className="text-xs font-medium text-[var(--text)]">
            Donation received
          </p>

          <p
            className="
              mt-1
              text-4xl font-bold tracking-tight
              text-[var(--text-h)]
              transition-colors duration-300
              group-hover:text-[var(--accent)]
            "
          >
            ₹501
          </p>

          <p className="mt-2 text-sm text-[var(--text)]">
            Thank you for supporting the mandal.
          </p>
        </div>

        {/* Receipt information */}
        <div className="mx-6 border-t border-[var(--border)] py-4">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-[var(--text)]">Receipt ID</span>

            <span className="text-sm font-medium text-[var(--text-h)]">
              UTS-260184
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-[var(--text)]">Date</span>

            <span className="text-sm font-medium text-[var(--text-h)]">
              12 Sep 2026
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-[var(--text)]">Payment</span>

            <span className="text-sm font-medium text-[var(--text-h)]">
              UPI
            </span>
          </div>
        </div>

        {/* QR / sharing area */}
        <div
          className="
            border-t border-[var(--border)]
            px-6 py-5
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                flex h-20 w-20 shrink-0 items-center justify-center
                rounded-xl
                border border-[var(--border)]
                bg-white
                transition-all duration-500
                group-hover:border-[var(--accent)]
              "
            >
              <QrCode
                className="
                  h-14 w-14
                  text-[var(--text-h)]
                  transition-all duration-500
                  group-hover:text-[var(--accent)]
                  group-hover:scale-105
                "
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--text-h)]">
                Easy to share
              </p>

              <p className="mt-1 text-xs leading-5 text-[var(--text)]">
                Scan to view and verify this digital receipt.
              </p>
            </div>
          </div>
        </div>

        {/* Receipt footer */}
        <div
          className="
            border-t border-[var(--border)]
            px-6 py-4
            text-center
          "
        >
          <p className="text-xs text-[var(--text)]">
            Thank you for being part of the celebration.
          </p>
        </div>
      </div>

      {/* Supporting copy */}
      <p
        className="
          mt-4 text-center text-xs
          text-[var(--text)]
          transition-colors duration-300
          group-hover:text-[var(--text-h)]
        "
      >
        A shareable receipt your donors can keep.
      </p>
    </div>
  );
}
