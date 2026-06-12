"use client";

import Link from "next/link";
import { useState } from "react";

const PRIMARY = [
  ["Projects", "/projects"],
  ["Studio", "/studio"],
  ["Research", "/research"],
  ["Journal", "/journal"],
  ["Careers", "/careers"],
  ["Contact", "/contact"],
] as const;

/**
 * Global footer: the site's index and colophon. Graphite ground, four
 * columns, the only place the newsletter appears.
 */
export default function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done">("idle");

  return (
    <footer className="bg-graphite text-warmwhite">
      <div className="site grid grid-cols-1 gap-12 py-20 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6 lg:py-28">
        <div className="lg:col-span-4">
          <p className="font-sans text-[15px] font-medium leading-relaxed tracking-wordmark">
            HERMANSSON
            <br />
            HILLER LUNDBERG
          </p>
          <address className="t-label mt-6 not-italic leading-relaxed text-warmwhite/60">
            Ragvaldsgatan 19B · 118 46 Stockholm
            <br />
            info@hhl.se · +46 8 000 00 00
            <br />
            <span className="t-caption">(sample contact details)</span>
          </address>
        </div>

        <nav aria-label="Footer, primary" className="lg:col-span-3">
          <ul className="space-y-2">
            {PRIMARY.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="u-link t-label">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="t-label lg:col-span-2">
          <ul className="space-y-2 text-warmwhite/60">
            {["Archive", "Map", "Timeline", "Search", "Collections"].map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <ul className="mt-6 space-y-2">
            {["Press", "Instagram", "LinkedIn"].map((s) => (
              <li key={s}>
                <a href="#" className="u-link">
                  {s} <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="font-serif text-base leading-relaxed text-warmwhite/80">
            Occasional letters from the studio — new work, research, and texts.
          </p>
          {state === "done" ? (
            <p className="mt-4 font-serif text-base" role="status">
              Thank you. One letter, occasionally.
            </p>
          ) : (
            <form
              className="mt-4 flex border-b border-warmwhite/60 focus-within:border-warmwhite"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.includes("@")) setState("done");
              }}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="h-12 w-full bg-transparent font-sans text-sm tracking-label placeholder:text-warmwhite/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="px-2 transition-transform duration-200 hover:translate-x-1"
              >
                →
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="site flex flex-col gap-2 border-t border-warmwhite/20 py-6 text-warmwhite/60 sm:flex-row sm:items-center sm:justify-between">
        <p className="t-caption">
          © 2026 Hermansson Hiller Lundberg Arkitekter · Photography credited per project ·{" "}
          <a href="#" className="u-link">Privacy</a>
        </p>
        <a href="#top" className="u-link t-caption">
          Site index ↑
        </a>
      </div>
    </footer>
  );
}
