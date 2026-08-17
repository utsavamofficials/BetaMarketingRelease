import { Sparkles } from "lucide-react";
import logo from "../../assets/logoCircleNoBg.png";

import {
  GaneshIcon,
  MandalaWatermark,
  CornerFlourish,
  BrandEmblem,
} from "../receipt/ReceiptOrnaments";
// ↑ Adjust this import path if ReceiptOrnaments is located elsewhere.


export function ReceiptMockup() {
  return (
    <div className="group relative mx-auto w-full max-w-sm">
      {/* Floating sparkle */}
      <div
        className="
          absolute -right-3 -top-3 z-20
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
          relative mx-auto w-full
          overflow-hidden
          rounded-[28px]
          shadow-2xl
          transition-all duration-500 ease-out
          group-hover:-translate-y-1
          group-hover:shadow-2xl
        "
        style={{
          fontFamily: "var(--sans)",
        }}
      >
        {/* =========================================================
            HEADER
        ========================================================= */}
        <div
          className="
            relative
            flex flex-col
            items-center
            gap-2.5
            overflow-hidden
            px-8
            pb-9
            pt-8
            text-center
          "
          style={{
            background:
              "linear-gradient(160deg, var(--accent) 0%, var(--receipt-header-end) 85%)",
          }}
        >
          {/* Mandala watermarks */}
          <MandalaWatermark
            className="
              pointer-events-none
              absolute
              -left-10
              -top-10
              h-40
              w-40
              text-[var(--receipt-gold)]
              opacity-25
            "
          />

          <MandalaWatermark
            className="
              pointer-events-none
              absolute
              -right-10
              -top-10
              h-40
              w-40
              text-[var(--receipt-gold)]
              opacity-25
            "
          />

          {/* Corner ornaments */}
          <CornerFlourish
            className="
              pointer-events-none
              absolute
              left-2
              top-2
              h-8
              w-8
              text-[var(--receipt-gold)]
              opacity-80
            "
          />

          <CornerFlourish
            className="
              pointer-events-none
              absolute
              right-2
              top-2
              h-8
              w-8
              -scale-x-100
              text-[var(--receipt-gold)]
              opacity-80
            "
          />

          {/* Logo */}
          <div className="relative flex items-center justify-center">
            {logo ? (
              <img
                src={logo}
                alt="Utsavam"
                className="
                  h-14
                  w-14
                  rounded-full
                  border-2
                  border-[var(--receipt-gold)]/70
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-105
                "
              />
            ) : (
              <GaneshIcon
                className="
                  relative
                  h-14
                  w-14
                  text-[var(--receipt-gold)]
                  drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]
                "
              />
            )}
          </div>

          {/* Receipt type */}
          <p
            className="
              relative
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.32em]
              text-[var(--receipt-gold)]
            "
            style={{
              fontFamily: "var(--receipt-caps)",
            }}
          >
            Donation Receipt
          </p>

          {/* Mandal name */}
          <h2
            className="
              relative
              max-w-[85%]
              text-xl
              font-bold
              leading-snug
              text-[var(--receipt-gold)]
            "
            style={{
              fontFamily: "var(--receipt-display)",
            }}
          >
            Shree Ganesh Mitra Mandal
          </h2>

          {/* Event */}
          <p className="relative text-sm text-white/85">
            Ganesh Utsav 2026
          </p>
        </div>

        {/* =========================================================
            BODY
        ========================================================= */}
        <div
          className="
            relative
            flex
            flex-col
            items-center
            gap-5
            px-7
            pb-8
            pt-9
          "
          style={{
            backgroundColor: "var(--receipt-paper)",
            backgroundImage:
              "radial-gradient(circle at 12% 18%, rgba(42,18,69,0.035) 0, transparent 40%), radial-gradient(circle at 85% 12%, rgba(42,18,69,0.03) 0, transparent 35%), radial-gradient(circle at 30% 85%, rgba(42,18,69,0.03) 0, transparent 45%), radial-gradient(circle at 90% 80%, rgba(42,18,69,0.03) 0, transparent 40%)",
            color: "var(--receipt-ink)",
          }}
        >
          {/* Body corner ornaments */}
          <CornerFlourish
            className="
              pointer-events-none
              absolute
              left-2
              top-2
              h-7
              w-7
              text-[var(--receipt-gold-deep)]
              opacity-70
            "
          />

          <CornerFlourish
            className="
              pointer-events-none
              absolute
              right-2
              top-2
              h-7
              w-7
              -scale-x-100
              text-[var(--receipt-gold-deep)]
              opacity-70
            "
          />

          <CornerFlourish
            className="
              pointer-events-none
              absolute
              bottom-2
              left-2
              h-7
              w-7
              -scale-y-100
              text-[var(--receipt-gold-deep)]
              opacity-70
            "
          />

          <CornerFlourish
            className="
              pointer-events-none
              absolute
              bottom-2
              right-2
              h-7
              w-7
              -scale-x-100
              -scale-y-100
              text-[var(--receipt-gold-deep)]
              opacity-70
            "
          />

          {/* =======================================================
              DONOR
          ======================================================= */}
          <div className="text-center">
            <p
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[var(--receipt-gold-deep)]
              "
            >
              Donated by
            </p>

            <p
              className="
                mt-1.5
                text-[26px]
                font-bold
                leading-tight
              "
              style={{
                fontFamily: "var(--receipt-display)",
              }}
            >
              Your Name
            </p>
          </div>

          {/* =======================================================
              AMOUNT
          ======================================================= */}
          <div
            className="
              flex
              w-full
              items-center
              justify-center
              border-2
              py-4
              transition-transform
              duration-500
              group-hover:scale-[1.02]
            "
            style={{
              backgroundColor: "var(--receipt-maroon)",
              borderColor: "var(--receipt-gold-deep)",
              clipPath:
                "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
            }}
          >
            <p
              className="
                text-4xl
                font-bold
                tracking-wide
                text-[var(--receipt-gold)]
              "
              style={{
                fontFamily: "var(--receipt-display)",
              }}
            >
              ₹501
            </p>
          </div>

          {/* =======================================================
              QR CODE
          ======================================================= */}
          <div className="flex flex-col items-center gap-2.5 pt-2">
            <div
              className="
                relative
                rounded-xl
                border-2
                border-[var(--receipt-gold-deep)]
                bg-white
                p-3
                transition-transform
                duration-500
                group-hover:scale-105
              "
            >
              {/* Mock QR */}
              <div
                className="
                  grid
                  h-32
                  w-32
                  grid-cols-8
                  grid-rows-8
                  gap-[2px]
                  bg-white
                  p-1
                "
                aria-label="Mock QR code"
              >
                {[
                  1, 1, 1, 0, 1, 0, 1, 1,
                  1, 0, 1, 1, 0, 1, 0, 1,
                  1, 1, 0, 1, 1, 1, 1, 0,
                  0, 1, 1, 0, 1, 0, 1, 1,
                  1, 0, 1, 1, 0, 1, 0, 1,
                  0, 1, 1, 0, 1, 1, 1, 0,
                  1, 1, 0, 1, 0, 1, 0, 1,
                  1, 0, 1, 1, 1, 0, 1, 1,
                ].map((cell, index) => (
                  <span
                    key={index}
                    className={
                      cell
                        ? "bg-[var(--receipt-ink)]"
                        : "bg-white"
                    }
                  />
                ))}
              </div>

              {/* QR emblem */}
              <span
                className="
                  absolute
                  -top-4
                  left-1/2
                  flex
                  h-8
                  w-8
                  -translate-x-1/2
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-[var(--receipt-gold-deep)]
                  bg-[var(--receipt-paper)]
                "
              >
                <BrandEmblem
                  className="
                    h-5
                    w-5
                    text-[var(--receipt-gold-deep)]
                  "
                />
              </span>
            </div>

            <p
              className="
                text-[11px]
                text-[var(--receipt-ink)]/70
              "
            >
              Scan to view or re-download this receipt
            </p>
          </div>

          {/* =======================================================
              METADATA
          ======================================================= */}
          <div
            className="
              flex
              w-full
              items-center
              justify-between
              border-t
              border-dashed
              border-[var(--receipt-ink)]/25
              pt-4
              text-[11px]
              text-[var(--receipt-ink)]/80
            "
          >
            <span>12 Sep 2026</span>

            <span
              className="
                font-mono
                uppercase
                tracking-wide
              "
            >
              UTS-260184
            </span>
          </div>

          {/* =======================================================
              FOOTER BRANDING
          ======================================================= */}
          <div
            className="
              flex
              items-center
              gap-1.5
              text-xs
              font-semibold
              text-[var(--receipt-gold-deep)]
            "
            style={{
              fontFamily: "var(--receipt-caps)",
            }}
          >
            <BrandEmblem className="h-5 w-5" />

            <span>
              Generated with Utsavam · utsavamlive.in
            </span>
          </div>

          {/* Demo badge */}
          <span
            className="
              rounded-full
              bg-[#f3e6c0]
              px-3.5
              py-1.5
              text-[11px]
              font-semibold
              text-[#8a6d3b]
            "
          >
            Demo receipt — not a real transaction
          </span>
        </div>
      </div>

      {/* Supporting copy */}
      <p
        className="
          mt-4
          text-center
          text-xs
          text-[var(--text)]
          transition-colors
          duration-300
          group-hover:text-[var(--text-h)]
        "
      >
        A shareable receipt your donors can keep.
      </p>
    </div>
  );
}