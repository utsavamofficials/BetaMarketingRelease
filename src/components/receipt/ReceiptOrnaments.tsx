/**
 * Deterministic, dependency-free decorative SVGs for the festive receipt
 * design (gold-on-purple ceremonial ticket look). No external image
 * assets required — everything here is inline vector art so the receipt
 * renders identically every time (and rasterizes cleanly via html-to-image).
 */

/** Simplified, stylized Ganesh silhouette — crown, head, ears, trunk curl. */
export function GaneshIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* crown */}
      <path d="M32 4 L37 13 L27 13 Z" fill="currentColor" />
      <circle cx="32" cy="3" r="2" fill="currentColor" />
      {/* ears */}
      <ellipse
        cx="16"
        cy="27"
        rx="9"
        ry="12"
        fill="currentColor"
        opacity="0.92"
      />
      <ellipse
        cx="48"
        cy="27"
        rx="9"
        ry="12"
        fill="currentColor"
        opacity="0.92"
      />
      <ellipse
        cx="16"
        cy="27"
        rx="4.2"
        ry="6.5"
        fill="#1a0b2e"
        opacity="0.55"
      />
      <ellipse
        cx="48"
        cy="27"
        rx="4.2"
        ry="6.5"
        fill="#1a0b2e"
        opacity="0.55"
      />
      {/* head */}
      <path
        d="M32 12c9.4 0 15 6.7 15 15.5 0 6-2.6 10.7-6.6 13.7.6 2 .3 4-1 5.4-1.8 2-4.9 2.3-7.4.9-2.5 1.4-5.6 1.1-7.4-.9-1.3-1.4-1.6-3.4-1-5.4-4-3-6.6-7.7-6.6-13.7C17 18.7 22.6 12 32 12Z"
        fill="currentColor"
      />
      {/* trunk */}
      <path
        d="M32 30c1.6 3 2.4 5.6 1.6 8.2-.7 2.2-2.6 3.6-2.2 5.8.3 1.8 2 2.8 3.9 2.4"
        stroke="#1a0b2e"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* tusk */}
      <path
        d="M27 34c-1.6 1-2.4 2.4-2 4"
        stroke="#1a0b2e"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* tilak / third eye */}
      <circle cx="32" cy="22" r="1.4" fill="#1a0b2e" opacity="0.55" />
    </svg>
  );
}

/** Simplified Sri Yantra-style mandala, used as a low-opacity watermark. */
export function MandalaWatermark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="4" fill="currentColor" />
      {/* upward triangles */}
      <path
        d="M100 30 L155 130 L45 130 Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M100 50 L145 125 L55 125 Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M100 70 L135 120 L65 120 Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      {/* downward triangles */}
      <path
        d="M100 170 L45 70 L155 70 Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M100 150 L55 75 L145 75 Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M100 130 L65 80 L135 80 Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      {/* corner ticks (bindu square gate motif) */}
      {[0, 90, 180, 270].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 100 100)`}>
          <path
            d="M100 4 L100 16 M94 10 L106 10"
            stroke="currentColor"
            strokeWidth="1"
          />
        </g>
      ))}
    </svg>
  );
}

/** Small ornamental corner bracket with a swirl + dot, used on the card's four corners. */
export function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 40 L4 14 Q4 4 14 4 L40 4"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M4 26 Q14 26 14 16" stroke="currentColor" strokeWidth="1.2" />
      <path d="M18 4 Q18 14 28 14" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="14" cy="14" r="2" fill="currentColor" />
      <circle cx="4" cy="4" r="1.6" fill="currentColor" />
    </svg>
  );
}

/** Circular brand emblem — a simple temple/gopuram mark, used on the QR badge and footer. */
export function BrandEmblem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M20 8 L23 13 H17 Z M14 15 h12 v3 h-12 Z M15 18 h10 v9 h-10 Z M17 27 v-6 h2 v6 Z M21 27 v-6 h2 v6 Z"
        fill="currentColor"
      />
      <path
        d="M12 27 h16"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
