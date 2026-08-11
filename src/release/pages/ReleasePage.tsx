import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Gift,
  HeartHandshake,
  Mail,
  Shield,
  Sparkles,
  Star,
  Zap,
  type LucideIcon,
} from "lucide-react";
import releaseDocRaw from "../data/releaseDoc.json";
import { NotificationModal } from "../../components/marketing/NotificationModal";
import Logo from "../../assets/logoCircleNoBg.png";

type ReleaseStatus = "NOTRELEASED" | "RELEASED";
type ReleaseFeatureIcon =
  | "sparkle"
  | "shield"
  | "zap"
  | "gift"
  | "heart"
  | "star";

interface ReleaseFeature {
  id: string;
  icon: ReleaseFeatureIcon;
  title: string;
  description: string;
}

interface ReleaseMessaging {
  eyebrow: string;
  headline: string;
  subheadline: string;
  announcement?: string;
}

interface ReleaseDocument {
  title: string;
  version: string;
  targetTimestamp: string;
  status: ReleaseStatus;
  portalUrl: string;
  support: { label: string; email: string };
  banner: { enabled: boolean; message: string };
  messaging: { preRelease: ReleaseMessaging; postRelease: ReleaseMessaging };
  features: ReleaseFeature[];
}

const releaseDoc = (releaseDocRaw as { release: ReleaseDocument }).release;

const FEATURE_ICONS: Record<ReleaseFeatureIcon, LucideIcon> = {
  sparkle: Sparkles,
  shield: Shield,
  zap: Zap,
  gift: Gift,
  heart: HeartHandshake,
  star: Star,
};

interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

function diffToUnits(diffMs: number): CountdownValue {
  const clamped = Math.max(diffMs, 0);
  const totalSeconds = Math.floor(clamped / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isComplete: clamped <= 0,
  };
}

function useCountdown(targetIso: string): CountdownValue {
  const [value, setValue] = useState<CountdownValue>(() =>
    diffToUnits(new Date(targetIso).getTime() - Date.now()),
  );

  useEffect(() => {
    const targetMs = new Date(targetIso).getTime();

    const tick = () => {
      const next = diffToUnits(targetMs - Date.now());
      setValue(next);
      return next.isComplete;
    };

    if (tick()) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (tick()) {
        window.clearInterval(intervalId);
      }
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [targetIso]);

  return value;
}

function CountdownUnit({
  value,
  label,
  reduceMotion,
}: {
  value: number;
  label: string;
  reduceMotion: boolean;
}) {
  const display = String(Math.max(value, 0)).padStart(2, "0");
  return (
    <div
      className="relative flex flex-col items-center gap-2 rounded-2xl border border-[var(--border)] bg-white/70 px-4 py-5 shadow-[var(--shadow)] backdrop-blur-xl sm:px-6 sm:py-7"
      role="group"
      aria-label={`${display} ${label}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/60 to-transparent"
        aria-hidden="true"
      />
      <div className="relative h-10 overflow-hidden sm:h-14" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? undefined : { opacity: 0, y: -14, scale: 0.92 }
            }
            transition={{ duration: reduceMotion ? 0 : 0.32, ease: "easeOut" }}
            className="block bg-gradient-to-b from-[var(--accent)] to-[#8a4c12] bg-clip-text text-4xl font-bold tabular-nums text-transparent sm:text-5xl"
            style={{ fontFamily: "var(--receipt-display)" }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="relative text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--text)]">
        {label}
      </span>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white/70 p-6 shadow-[var(--shadow)] backdrop-blur-xl transition-colors duration-300 hover:border-[var(--accent-border)] hover:bg-white">
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[var(--accent-bg)] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--accent-border)] bg-[var(--accent-bg)] text-[var(--accent)]">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="relative mt-4 text-base font-semibold text-[var(--text-h)]">
        {title}
      </h3>
      <p className="relative mt-1.5 text-sm leading-relaxed text-[var(--text)]">
        {description}
      </p>
    </div>
  );
}

interface Particle {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: (i * 137.508) % 100,
    size: 2 + ((i * 7) % 5),
    delay: (i % 12) * 0.55,
    duration: 8 + (i % 6),
    opacity: 0.18 + (i % 4) * 0.08,
  }));
}

const CONFETTI_COLORS = ["#C4731F", "#F5B342", "#8a4c12", "#f0b429"];

function ParticleField({
  count,
  variant,
  reduceMotion,
}: {
  count: number;
  variant: "ember" | "confetti";
  reduceMotion: boolean;
}) {
  const particles = useMemo(() => generateParticles(count), [count]);
  if (reduceMotion) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className={
            variant === "ember"
              ? "absolute rounded-full blur-[1px] animate-ember-rise"
              : "absolute rounded-[2px] animate-confetti-fall"
          }
          style={{
            left: `${p.left}%`,
            bottom: variant === "ember" ? "-10px" : undefined,
            top: variant === "confetti" ? "-10px" : undefined,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            backgroundColor:
              variant === "confetti"
                ? CONFETTI_COLORS[p.id % CONFETTI_COLORS.length]
                : "var(--accent)",
          }}
        />
      ))}
    </div>
  );
}

export function ReleasePage() {
  const prefersReducedMotion = !!useReducedMotion();
  const countdown = useCountdown(releaseDoc.targetTimestamp);
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);

  const isReleased = releaseDoc.status === "RELEASED" || countdown.isComplete;
  const messaging = isReleased
    ? releaseDoc.messaging.postRelease
    : releaseDoc.messaging.preRelease;

  const targetDateLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-IN", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "Asia/Kolkata",
      }).format(new Date(releaseDoc.targetTimestamp)),
    [],
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text-h)]">
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,var(--accent-bg),transparent),radial-gradient(ellipse_60%_50%_at_85%_110%,rgba(196,115,31,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(196,115,31,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(196,115,31,0.05)_1px,transparent_1px)] bg-[length:56px_56px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_30%,black,transparent)]" />
        <ParticleField
          variant="ember"
          count={18}
          reduceMotion={prefersReducedMotion}
        />
        {isReleased && (
          <ParticleField
            variant="confetti"
            count={26}
            reduceMotion={prefersReducedMotion}
          />
        )}
      </div>

      {releaseDoc.banner.enabled && (
        <div className="relative border-b border-[var(--accent-border)] bg-[var(--accent-bg)] px-4 py-2 text-center text-xs font-medium text-[var(--accent-text)] backdrop-blur-sm">
          {releaseDoc.banner.message}
        </div>
      )}

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full">
            <img
              src={Logo}
              className="flex h-9 w-9 items-center justify-center rounded-full"
            />
          </span>
          <span
            className="text-base font-semibold tracking-tight text-[var(--text-h)]"
            style={{ fontFamily: "var(--receipt-display)" }}
          >
            {releaseDoc.title}
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5 backdrop-blur-md">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
            animate={
              prefersReducedMotion ? undefined : { opacity: [1, 0.35, 1] }
            }
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <span className="font-mono text-xs tracking-wide text-[var(--accent)]">
            {releaseDoc.version}
          </span>
        </div>
      </header>

      <main className="relative mx-auto flex max-w-4xl flex-col items-center px-5 pb-24 pt-10 text-center sm:px-8 sm:pt-16">
        <motion.span
          initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-bg)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-text)]"
          style={{ fontFamily: "var(--receipt-caps)" }}
        >
          {isReleased ? (
            <Star className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {messaging.eyebrow}
        </motion.span>

        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="mt-6 max-w-2xl bg-clip-text text-4xl font-bold leading-[1.08] tracking-tight text-transparent sm:text-6xl animate-gradient-x"
          style={{
            fontFamily: "var(--receipt-display)",
            backgroundImage:
              "linear-gradient(90deg, #8a4c12, var(--accent), #f5b342, var(--accent), #8a4c12)",
            backgroundSize: "200% auto",
          }}
        >
          {messaging.headline}
        </motion.h1>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-[var(--text)] sm:text-lg"
        >
          {messaging.subheadline}
        </motion.p>
        {isReleased ? (
          <motion.div
            initial={
              prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.18, duration: 0.5 }}
            className="relative mt-12 flex flex-col items-center gap-5"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 -z-10 rounded-full bg-[var(--accent)]/35 blur-3xl animate-glow-pulse"
                aria-hidden="true"
              />

              <a
                href={releaseDoc.portalUrl}
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-[var(--accent-border)] bg-gradient-to-r from-[var(--accent)] via-[#f0b429] to-[var(--accent)] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[var(--accent-text)] shadow-[0_10px_40px_rgba(196,115,31,0.35)] transition-transform duration-200 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] active:scale-[0.98]"
              >
                <img
                  src={Logo}
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />

                <span className="relative">Enter Utsavam Portal</span>

                <ArrowRight
                  className="relative h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>

            <p className="text-xs text-[var(--text)]">
              Redirects to {releaseDoc.portalUrl.replace("https://", "")}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5 }}
            className="mt-12 flex w-full flex-col items-center gap-6"
          >
            <div className="grid w-full max-w-lg grid-cols-4 gap-3 sm:gap-4">
              <CountdownUnit
                value={countdown.days}
                label="Days"
                reduceMotion={prefersReducedMotion}
              />
              <CountdownUnit
                value={countdown.hours}
                label="Hours"
                reduceMotion={prefersReducedMotion}
              />
              <CountdownUnit
                value={countdown.minutes}
                label="Minutes"
                reduceMotion={prefersReducedMotion}
              />
              <CountdownUnit
                value={countdown.seconds}
                label="Seconds"
                reduceMotion={prefersReducedMotion}
              />
            </div>

            <p className="text-xs text-[var(--text)]">
              Launching {targetDateLabel} IST
            </p>

            <button
              type="button"
              aria-disabled="false"
              onClick={() => setNotifyModalOpen(true)}
              title="Notifications open closer to launch"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--border)] bg-white/60 px-6 py-3 text-sm font-medium text-[var(--text)]"
            >
              <Bell className="h-4 w-4" aria-hidden="true" />
              Notify Me — Coming Soon
            </button>

            {messaging.announcement && (
              <p className="max-w-sm text-xs text-[var(--accent)]">
                {messaging.announcement}
              </p>
            )}
          </motion.div>
        )}

        <section
          className="mt-24 w-full"
          aria-label={isReleased ? "Feature highlights" : "Feature preview"}
        >
          <h2
            className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]"
            style={{ fontFamily: "var(--receipt-caps)" }}
          >
            {isReleased ? "Feature highlights" : "What to expect"}
          </h2>
          <div className="mt-6 grid gap-4 text-left sm:grid-cols-2">
            {releaseDoc.features.map((feature) => (
              <FeatureCard
                key={feature.id}
                icon={FEATURE_ICONS[feature.icon]}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="relative border-t border-[var(--border)] bg-white/60 px-5 py-6 backdrop-blur-sm sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-[var(--text)] sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full rounded-full ${isReleased ? "bg-emerald-400" : "bg-[var(--accent)]"} ${prefersReducedMotion ? "" : "animate-ping"} opacity-60`}
                aria-hidden="true"
              />
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${isReleased ? "bg-emerald-400" : "bg-[var(--accent)]"}`}
                aria-hidden="true"
              />
            </span>
            <span>
              {isReleased ? "All systems live" : "Preparing for launch"}
            </span>
          </div>
          <span className="font-mono">
            {releaseDoc.title} {releaseDoc.version}
          </span>

          <a
            href={`mailto:${releaseDoc.support.email}`}
            className="flex items-center gap-1.5 hover:text-[var(--accent)]"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            {releaseDoc.support.label}
          </a>
        </div>
      </footer>
      <NotificationModal
        open={notifyModalOpen}
        onClose={() => setNotifyModalOpen(false)}
      />
    </div>
  );
}
