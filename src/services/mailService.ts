import { env } from '../config/env';
import type { ContactSubmission, FeedbackSubmission, MailDispatchResult } from '../types/feedback';

/**
 * Feedback and Contact forms have no in-app inbox in this beta (Section 7) —
 * every submission is meant to reach the founder's inbox via the existing
 * mail API. This client posts to `VITE_MAIL_API_URL`.
 *
 * If that endpoint isn't configured (e.g. running the frontend standalone),
 * we queue the submission in localStorage instead of pretending it was
 * emailed, and surface that honestly in the UI — a real deploy must set
 * VITE_MAIL_API_URL to the backend's mail-forwarding route.
 */
async function dispatch(kind: 'feedback' | 'contact', payload: FeedbackSubmission | ContactSubmission): Promise<MailDispatchResult> {
  if (!env.mailApiUrl) {
    queueLocally(kind, payload);
    return {
      delivered: false,
      queuedLocally: true,
      error: 'Mail API is not configured for this environment (VITE_MAIL_API_URL missing).',
    };
  }

  try {
    const response = await fetch(env.mailApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, submittedAt: new Date().toISOString(), payload }),
    });

    if (!response.ok) {
      queueLocally(kind, payload);
      return { delivered: false, queuedLocally: true, error: `Mail API responded with ${response.status}` };
    }

    return { delivered: true, queuedLocally: false };
  } catch {
    queueLocally(kind, payload);
    return { delivered: false, queuedLocally: true, error: 'Network error while sending — saved locally instead.' };
  }
}

function queueLocally(kind: string, payload: unknown) {
  try {
    const key = 'utsavam:unsent_submissions';
    const existing = JSON.parse(localStorage.getItem(key) ?? '[]');
    existing.push({ kind, payload, queuedAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(existing));
  } catch {
    /* best effort only */
  }
}

export function submitFeedback(payload: FeedbackSubmission) {
  return dispatch('feedback', payload);
}

export function submitContact(payload: ContactSubmission) {
  return dispatch('contact', payload);
}
