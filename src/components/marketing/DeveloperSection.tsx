import {
  ArrowUpRight,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { Reveal } from "../ui/Reveal";

export function DeveloperSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg)] py-24 sm:py-32">
      {/* Ambient accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[var(--accent-bg)] opacity-40 blur-3xl"
      />

      <Reveal>
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          {/* Section heading */}
          <div className="max-w-3xl">
            <div className="mb-1 flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--accent)]" />

              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                Meet the Developer
              </p>
            </div>
          </div>

          {/* Main profile */}
          <div className="relative mt-5 overflow-hidden border border-[var(--border)] bg-white shadow-[var(--shadow)] sm:mt-1">
            {/* Top accent line */}
            <div className="h-1 bg-[var(--accent)]" />

            <div className="grid lg:grid-cols-[280px_1fr]">
              {/* Identity */}
              <div className="relative border-b border-[var(--border)] bg-[var(--code-bg)]/50 p-7 sm:p-10 lg:border-b-0 lg:border-r">
                {/* Decorative number */}
                <span className="absolute right-6 top-5 font-mono text-[10px] tracking-[0.2em] text-[var(--text)] opacity-40">
                  01
                </span>

                <div className="flex items-center gap-5 lg:block">
                  {/* Monogram */}
                  <div
                    className="relative flex h-20 w-20 shrink-0 items-center justify-center border border-[var(--accent-border)] bg-[var(--accent-bg)] text-xl font-semibold tracking-[-0.04em] text-[var(--accent)]"
                    aria-hidden="true"
                  >
                    MP
                    <span className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-[var(--accent)]" />
                  </div>

                  <div className="lg:mt-7">
                    <h3 className="text-xl font-semibold tracking-[-0.025em] text-[var(--text-h)]">
                      Mr. Uday Patil
                    </h3>

                    <p className="mt-1.5 text-sm text-[var(--text)]">
                      Software Developer
                    </p>
                    <p className="mt-1.5 text-sm text-[var(--text)]">
                      Bachelor's | Master's in Computer Applications
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-xs text-[var(--text)]">
                      <MapPin
                        className="h-3.5 w-3.5 text-[var(--accent)]"
                        aria-hidden="true"
                      />
                      India
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional details */}
              <div>
                <div className="divide-y divide-[var(--border)]">
                  {/* Position */}
                  {/* <div className="grid gap-3 p-7 sm:grid-cols-[150px_1fr] sm:gap-10 sm:p-10">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text)]">
                      Position
                    </p>

                    <div>
                      <p className="text-base font-medium tracking-[-0.01em] text-[var(--text-h)]">
                        Senior Software Developer
                      </p>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text)]">
                        Combining technical depth with a practical approach to
                        architecture, delivery, and product quality.
                      </p>
                    </div>
                  </div> */}

                  {/* Education */}
                  {/* <div className="grid gap-3 p-7 sm:grid-cols-[150px_1fr] sm:gap-10 sm:p-10">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text)]">
                      Education
                    </p>

                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-[var(--border)] bg-[var(--code-bg)]">
                        <GraduationCap
                          className="h-4 w-4 text-[var(--accent)]"
                          aria-hidden="true"
                        />
                      </div>

                      <p className="max-w-xl text-sm font-medium leading-6 text-[var(--text-h)]">
                        Bachelor’s / Master’s Degree — Computer Science &
                        Information Technology
                      </p>
                    </div>
                  </div> */}
                </div>

                {/* Philosophy */}
                <div className="border-t border-[var(--border)] bg-[var(--code-bg)]/40 p-7 sm:p-10">
                  <div className="flex gap-4">
                    <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                        Development philosophy
                      </p>

                      <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-h)] sm:text-base">
                        Simple, reliable, meaningful software built with
                        clarity, maintainability, and real-world usability in
                        mind.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Philosophy */}
                <div className="border-t border-[var(--border)] bg-[var(--code-bg)]/40 p-7 sm:p-10">
                  <div className="flex gap-4">
                    <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                        Focus
                      </p>

                      <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-h)] sm:text-base">
                        Product engineering, systems, and digital experiences.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact footer */}
          <div className="mt-8 flex flex-col gap-6 border-t border-[var(--border)] pt-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text-h)]">
                Let&apos;s build something meaningful.
              </p>

              <p className="mt-1 text-sm leading-6 text-[var(--text)]">
                Open to professional and project-related conversations.
              </p>
            </div>

            <nav
              aria-label="Developer links"
              className="flex items-center gap-2"
            >
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="group inline-flex h-10 w-10 items-center justify-center border border-[var(--border)] bg-[var(--social-bg)] text-[var(--text)] transition-all duration-200 hover:border-[var(--accent-border)] hover:bg-[var(--accent-bg)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40"
              >
                <Linkedin
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="group inline-flex h-10 w-10 items-center justify-center border border-[var(--border)] bg-[var(--social-bg)] text-[var(--text)] transition-all duration-200 hover:border-[var(--accent-border)] hover:bg-[var(--accent-bg)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40"
              >
                <Github
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>

              {/* Email */}
              <a
                href="mailto:utsavamofficials@gmail.com"
                aria-label="Email developer"
                className="group inline-flex h-10 w-10 items-center justify-center border border-[var(--border)] bg-[var(--social-bg)] text-[var(--text)] transition-all duration-200 hover:border-[var(--accent-border)] hover:bg-[var(--accent-bg)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40"
              >
                <Mail
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>

              {/* Primary CTA */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="group ml-2 inline-flex h-10 items-center gap-2 bg-[var(--accent)] px-5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(196,115,31,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40"
              >
                Connect
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </nav>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
