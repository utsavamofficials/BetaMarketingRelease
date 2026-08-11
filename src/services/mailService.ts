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


export interface NotificationFormData {
  name: string;
  email: string;
  message: string;
  excitement: number;
}

interface MailResponse {
  success?: boolean;
  message?: string;
}

const MAILER_URL =
  "https://udmergemailer.netlify.app/api/mail/send/utsavam";

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

const escapeHtml = (value: string): string => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const sendMail = async (payload: Record<string, unknown>) => {
  const response = await fetch(MAILER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let data: MailResponse = {};

  try {
    data = await response.json();
  } catch {
    // Keep the original response status as the source of truth.
  }

  if (!response.ok || !data.success) {
    throw new Error(
      data.message || "Unable to send the email."
    );
  }

  return data;
};

export const sendNotificationMail = async (
  form: NotificationFormData
): Promise<void> => {
  const rawName = form.name.trim();
  const rawEmail = form.email.trim();
  const rawMessage = form.message.trim();

  if (!rawName || !rawEmail) {
    throw new Error("Please enter your name and email.");
  }

  const excitement = Math.min(
    5,
    Math.max(1, Number(form.excitement) || 5)
  );

  const excitementLabel =
    EXCITEMENT_LEVELS.find(
      (level) => level.value === excitement
    )?.label || "Heartfully waiting";

  // Escape values used inside HTML.
  const name = escapeHtml(rawName);
  const email = escapeHtml(rawEmail);

  const message = escapeHtml(
    rawMessage || "No message provided."
  );

  const messageHtml = message.replace(/\n/g, "<br>");

  // ============================================================
  // Utsavam email theme
  // ============================================================

  const accent = "#c4731f";
  const gold = "#f0b429";
  const darkBrown = "#2a1608";
  const text = "#5f4633";
  const softBg = "#fffaf3";
  const border = "#ead8c2";

  // ============================================================
  // 1. Notification email → Utsavam officials
  // ============================================================

  await sendMail({
    fromName: "Utsavam Officials",
    fromEmail: "utsavamofficials@gmail.com",

    to: "mestududay@gmail.com",

    replyTo: rawEmail,

    subject: `New Utsavam Notification Request from ${rawName}`,

    text: `
New Utsavam Notification Request

Name: ${rawName}
Email: ${rawEmail}
Excitement Level: ${excitement}/5 - ${excitementLabel}

Message:
${rawMessage || "No message provided."}

This notification request was submitted through the Utsavam website.
    `.trim(),

    html: `
      <div style="
        margin:0;
        padding:35px 20px;
        background:#f8f1e8;
        font-family:Arial,Helvetica,sans-serif;
        color:${text};
      ">
        <div style="
          max-width:700px;
          margin:0 auto;
          overflow:hidden;
          background:#ffffff;
          border:1px solid ${border};
          border-radius:20px;
          box-shadow:0 20px 60px rgba(80,35,5,0.12);
        ">

          <!-- Header -->
          <div style="
            padding:30px 32px;
            background:linear-gradient(
              135deg,
              ${accent} 0%,
              ${gold} 100%
            );
            color:#ffffff;
          ">

            <div style="
              display:inline-block;
              padding:8px 13px;
              margin-bottom:14px;
              border:1px solid rgba(255,255,255,0.35);
              border-radius:999px;
              background:rgba(255,255,255,0.12);
              font-size:11px;
              font-weight:bold;
              letter-spacing:2px;
              text-transform:uppercase;
            ">
              Stay Connected
            </div>

            <h1 style="
              margin:0;
              font-size:30px;
              line-height:1.2;
              color:#ffffff;
            ">
              ❤️ New Notification Request
            </h1>

            <p style="
              margin:12px 0 0;
              font-size:14px;
              line-height:1.6;
              color:rgba(255,255,255,0.92);
            ">
              Someone wants to be notified when Utsavam is ready
              to welcome them.
            </p>

          </div>

          <!-- Content -->
          <div style="padding:32px;">

            <!-- Visitor Details -->
            <div style="
              margin-bottom:24px;
              padding:20px;
              background:${softBg};
              border:1px solid ${border};
              border-radius:14px;
            ">

              <h2 style="
                margin:0 0 18px;
                color:${darkBrown};
                font-size:18px;
              ">
                Visitor Details
              </h2>

              <p style="
                margin:9px 0;
                font-size:14px;
              ">
                <strong style="color:${darkBrown};">
                  Name:
                </strong>
                ${name}
              </p>

              <p style="
                margin:9px 0;
                font-size:14px;
              ">
                <strong style="color:${darkBrown};">
                  Email:
                </strong>
                ${email}
              </p>

            </div>

            <!-- Excitement -->
            <div style="
              margin-bottom:24px;
              padding:20px;
              background:#fffdf8;
              border:1px solid ${border};
              border-radius:14px;
            ">

              <h2 style="
                margin:0 0 16px;
                color:${darkBrown};
                font-size:18px;
              ">
                Excitement Level
              </h2>

              <div style="
                font-size:26px;
                letter-spacing:4px;
                color:${accent};
              ">
                ${"★".repeat(excitement)}
                <span style="color:#e6d8c8;">
                  ${"★".repeat(5 - excitement)}
                </span>
              </div>

              <p style="
                margin:10px 0 0;
                color:${accent};
                font-size:14px;
                font-weight:bold;
              ">
                ${excitement}/5 — ${excitementLabel}
              </p>

            </div>

            <!-- Message -->
            <div style="margin-bottom:24px;">

              <h2 style="
                margin:0 0 12px;
                color:${darkBrown};
                font-size:18px;
              ">
                Message
              </h2>

              <div style="
                padding:18px;
                background:${softBg};
                border-left:4px solid ${accent};
                border-radius:0 12px 12px 0;
                font-size:14px;
                line-height:1.7;
                color:${text};
              ">
                ${messageHtml}
              </div>

            </div>

            <!-- Reply -->
            <div style="
              padding:18px;
              background:linear-gradient(
                135deg,
                rgba(196,115,31,0.08),
                rgba(240,180,41,0.12)
              );
              border:1px solid ${border};
              border-radius:14px;
            ">

              <p style="
                margin:0;
                font-size:13px;
                line-height:1.6;
                color:${text};
              ">
                <strong style="color:${darkBrown};">
                  Quick action:
                </strong>
                You can reply directly to this email to contact
                ${name}.
              </p>

            </div>

          </div>

          <!-- Footer -->
          <div style="
            padding:20px 32px;
            border-top:1px solid ${border};
            background:#fffaf5;
            text-align:center;
          ">

            <p style="
              margin:0;
              color:${accent};
              font-size:12px;
              font-weight:bold;
              letter-spacing:1px;
              text-transform:uppercase;
            ">
              Utsavam
            </p>

            <p style="
              margin:8px 0 0;
              color:#9a8068;
              font-size:11px;
            ">
              Notification request submitted from the Utsavam website.
            </p>

          </div>

        </div>
      </div>
    `,
    cc: [],
    bcc: [],
  });

  // ============================================================
  // 2. Confirmation email → Visitor
  // ============================================================

  try {
    await sendMail({
      fromName: "Utsavam Officials",
      fromEmail: "utsavamofficials@gmail.com",

      to: rawEmail,

      subject: "You're on the Utsavam notification list ❤️",

      text: `
Hi ${rawName},

Thank you for waiting with us.

We've successfully received your request to be notified when Utsavam is ready to welcome you.

Your excitement level:
${excitement}/5 - ${excitementLabel}

${rawMessage
          ? `Your message:\n${rawMessage}\n`
          : ""
        }

We'll send an email to this address when Utsavam is ready.

With warmth,
Utsavam Officials
      `.trim(),

      html: `
        <div style="
          margin:0;
          padding:35px 20px;
          background:#f8f1e8;
          font-family:Arial,Helvetica,sans-serif;
          color:${text};
        ">

          <div style="
            max-width:650px;
            margin:0 auto;
            overflow:hidden;
            background:#ffffff;
            border:1px solid ${border};
            border-radius:20px;
            box-shadow:0 20px 60px rgba(80,35,5,0.12);
          ">

            <!-- Header -->
            <div style="
              padding:32px;
              text-align:center;
              background:linear-gradient(
                135deg,
                ${accent} 0%,
                ${gold} 100%
              );
              color:#ffffff;
            ">

              <div style="
                margin:0 auto 16px;
                width:58px;
                height:58px;
                line-height:58px;
                border-radius:50%;
                background:rgba(255,255,255,0.16);
                border:1px solid rgba(255,255,255,0.35);
                font-size:25px;
              ">
                ❤️
              </div>

              <p style="
                margin:0 0 8px;
                font-size:11px;
                font-weight:bold;
                letter-spacing:2px;
                text-transform:uppercase;
                color:rgba(255,255,255,0.9);
              ">
                Stay Connected
              </p>

              <h1 style="
                margin:0;
                font-size:30px;
                line-height:1.2;
                color:#ffffff;
              ">
                You're on the list!
              </h1>

            </div>

            <!-- Content -->
            <div style="padding:32px;">

              <p style="
                margin:0 0 18px;
                font-size:16px;
                line-height:1.7;
                color:${text};
              ">
                Hi
                <strong style="color:${darkBrown};">
                  ${name}
                </strong>,
              </p>

              <p style="
                margin:0 0 18px;
                font-size:14px;
                line-height:1.7;
                color:${text};
              ">
                Thank you for waiting with us. We've successfully
                received your request to be notified when
                <strong style="color:${accent};">
                  Utsavam
                </strong>
                is ready to welcome you.
              </p>

              <!-- Excitement -->
              <div style="
                margin:24px 0;
                padding:20px;
                text-align:center;
                background:${softBg};
                border:1px solid ${border};
                border-radius:14px;
              ">

                <p style="
                  margin:0 0 10px;
                  color:${darkBrown};
                  font-size:13px;
                  font-weight:bold;
                  text-transform:uppercase;
                  letter-spacing:1px;
                ">
                  Your Excitement Level
                </p>

                <div style="
                  font-size:25px;
                  letter-spacing:3px;
                  color:${accent};
                ">
                  ${"★".repeat(excitement)}
                  <span style="color:#e6d8c8;">
                    ${"★".repeat(5 - excitement)}
                  </span>
                </div>

                <p style="
                  margin:9px 0 0;
                  color:${accent};
                  font-size:13px;
                  font-weight:bold;
                ">
                  ${excitement}/5 — ${excitementLabel}
                </p>

              </div>

              ${rawMessage
          ? `
                    <!-- Message -->
                    <div style="margin:24px 0;">

                      <h2 style="
                        margin:0 0 12px;
                        color:${darkBrown};
                        font-size:17px;
                      ">
                        Your Message
                      </h2>

                      <div style="
                        padding:17px;
                        background:${softBg};
                        border-left:4px solid ${accent};
                        border-radius:0 12px 12px 0;
                        font-size:14px;
                        line-height:1.7;
                        color:${text};
                      ">
                        ${messageHtml}
                      </div>

                    </div>
                  `
          : ""
        }

              <p style="
                margin:24px 0 0;
                font-size:14px;
                line-height:1.7;
                color:${text};
              ">
                We'll send an email to this address when Utsavam
                is ready. Until then, thank you for being part of
                the journey.
              </p>

              <p style="
                margin:24px 0 0;
                font-size:14px;
                line-height:1.7;
                color:${text};
              ">
                With warmth,<br>
                <strong style="color:${darkBrown};">
                  Utsavam Officials
                </strong>
              </p>

            </div>

            <!-- Footer -->
            <div style="
              padding:20px 32px;
              border-top:1px solid ${border};
              background:#fffaf5;
              text-align:center;
            ">

              <p style="
                margin:0;
                color:${accent};
                font-size:12px;
                font-weight:bold;
                letter-spacing:1px;
                text-transform:uppercase;
              ">
                Utsavam
              </p>

              <p style="
                margin:8px 0 0;
                color:#9a8068;
                font-size:11px;
                line-height:1.5;
              ">
                Thank you for waiting with us.
              </p>

            </div>

          </div>
        </div>
      `,
      cc: [],
      bcc: [],
    });
  } catch (confirmationError) {
    // The official notification has already succeeded.
    // Do not treat a confirmation-email failure as a failed signup.
    console.error(
      "Failed to send Utsavam confirmation email:",
      confirmationError
    );
  }
};