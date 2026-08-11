import { useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Heart, Star, X } from "lucide-react";
import { sendNotificationMail } from "../../services/mailService";

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
}

const EXCITEMENT_LEVELS = [
  {
    value: 1,
    label: "Poorly excited",
  },
  {
    value: 2,
    label: "Excited",
  },
  {
    value: 3,
    label: "Very excited",
  },
  {
    value: 4,
    label: "Much more excited",
  },
  {
    value: 5,
    label: "Heartfully waiting",
  },
];

export function NotificationModal({ open, onClose }: NotificationModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [excitement, setExcitement] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      setError("Please enter your name and email.");
      return;
    }

    try {
      setSubmitting(true);

      await sendNotificationMail({
        name: trimmedName,
        email: trimmedEmail,
        message: message.trim(),
        excitement,
      });

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save your notification request.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setExcitement(5);
    setSubmitted(false);
    setError("");
  };

  const handleClose = () => {
    if (submitting) return;

    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2a1608]/45 backdrop-blur-md"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal wrapper */}
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="notify-modal-title"
              className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-[var(--accent-border)] bg-[var(--bg)] shadow-[0_30px_100px_rgba(80,35,5,0.35)]"
              onClick={(event) => event.stopPropagation()}
            >
              {/* Decorative glow */}
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--accent)]/20 blur-3xl"
                aria-hidden="true"
              />

              <div
                className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#f0b429]/15 blur-3xl"
                aria-hidden="true"
              />

              {/* Header */}
              <div className="relative border-b border-[var(--border)] px-6 py-5 sm:px-8">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={submitting}
                  aria-label="Close notification form"
                  className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-white/60 text-[var(--text)] transition-colors hover:bg-white hover:text-[var(--accent)] disabled:opacity-50"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>

                <div className="flex items-center gap-3 pr-10">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--accent-border)] bg-[var(--accent-bg)] text-[var(--accent)]">
                    <Heart
                      className="h-5 w-5"
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  </span>

                  <div>
                    <p
                      className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent)]"
                      style={{ fontFamily: "var(--receipt-caps)" }}
                    >
                      Stay connected
                    </p>

                    <h2
                      id="notify-modal-title"
                      className="mt-1 text-2xl font-bold text-[var(--text-h)]"
                      style={{ fontFamily: "var(--receipt-display)" }}
                    >
                      Notify Me
                    </h2>
                  </div>
                </div>

                <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--text)]">
                  Leave your details and we'll let you know when Utsavam is
                  ready to welcome you.
                </p>
              </div>

              {submitted ? (
                /* Success state */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative px-6 py-10 text-center sm:px-8"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-300/50 bg-emerald-50 text-emerald-600">
                    <Check className="h-7 w-7" aria-hidden="true" />
                  </div>

                  <h3
                    className="mt-5 text-2xl font-bold text-[var(--text-h)]"
                    style={{ fontFamily: "var(--receipt-display)" }}
                  >
                    You're on the list!
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[var(--text)]">
                    Thank you for waiting with us. We'll send an email when
                    Utsavam is ready.
                  </p>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-7 inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_8px_30px_rgba(196,115,31,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                /* Form */
                <form
                  onSubmit={handleSubmit}
                  className="relative space-y-5 px-6 py-6 sm:px-8"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="notify-name"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text)]"
                    >
                      Name
                    </label>

                    <input
                      id="notify-name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Your name"
                      autoComplete="name"
                      required
                      className="w-full rounded-xl border border-[var(--border)] bg-white/70 px-4 py-3 text-sm text-[var(--text-h)] outline-none backdrop-blur-sm transition-all placeholder:text-[var(--text)]/50 focus:border-[var(--accent-border)] focus:ring-2 focus:ring-[var(--accent)]/15"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="notify-email"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text)]"
                    >
                      Email
                    </label>

                    <input
                      id="notify-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="w-full rounded-xl border border-[var(--border)] bg-white/70 px-4 py-3 text-sm text-[var(--text-h)] outline-none backdrop-blur-sm transition-all placeholder:text-[var(--text)]/50 focus:border-[var(--accent-border)] focus:ring-2 focus:ring-[var(--accent)]/15"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="notify-message"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text)]"
                    >
                      Message
                    </label>

                    <textarea
                      id="notify-message"
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="Tell us what you're looking forward to..."
                      rows={3}
                      className="w-full resize-none rounded-xl border border-[var(--border)] bg-white/70 px-4 py-3 text-sm text-[var(--text-h)] outline-none backdrop-blur-sm transition-all placeholder:text-[var(--text)]/50 focus:border-[var(--accent-border)] focus:ring-2 focus:ring-[var(--accent)]/15"
                    />
                  </div>

                  {/* Excitement */}
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text)]">
                        How excited are you?
                      </label>

                      <span className="text-xs font-medium text-[var(--accent)]">
                        {EXCITEMENT_LEVELS[excitement - 1].label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-white/60 px-4 py-3">
                      {EXCITEMENT_LEVELS.map((level) => {
                        const selected = excitement === level.value;

                        return (
                          <button
                            key={level.value}
                            type="button"
                            title={level.label}
                            aria-label={`${level.value} stars — ${level.label}`}
                            aria-pressed={selected}
                            onClick={() => setExcitement(level.value)}
                            className={`group flex flex-col items-center gap-1 transition-transform duration-200 hover:scale-110 ${
                              selected ? "scale-110" : ""
                            }`}
                          >
                            <Star
                              className={`h-6 w-6 transition-colors ${
                                selected
                                  ? "fill-[var(--accent)] text-[var(--accent)]"
                                  : "text-[var(--border)] group-hover:text-[var(--accent)]"
                              }`}
                              aria-hidden="true"
                            />

                            <span className="text-[10px] font-medium text-[var(--text)]">
                              {level.value}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600"
                    >
                      {error}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-[var(--accent-border)] bg-gradient-to-r from-[var(--accent)] via-[#f0b429] to-[var(--accent)] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_35px_rgba(196,115,31,0.3)] transition-transform duration-200 hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                      aria-hidden="true"
                    />

                    <span className="relative">
                      {submitting ? "Saving..." : "Keep Me Posted"}
                    </span>
                  </button>

                  <p className="text-center text-[10px] leading-relaxed text-[var(--text)]/60">
                    Your details will only be used for Utsavam release
                    notifications.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
