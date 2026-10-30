"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="grain relative flex min-h-[86svh] items-center overflow-hidden bg-ink text-bone">
      <div className="container-page py-32">
        <p className="eyebrow text-bone/45">Something went wrong</p>
        <h1 className="display mt-6 text-[clamp(3rem,8vw,7rem)] leading-[0.96]">
          The frame
          <br />
          <em className="display-italic text-red-bright">didn’t load.</em>
        </h1>
        <p className="mt-7 max-w-md text-[0.95rem] leading-[1.85] text-bone/55">
          A moment of interference. Try again, or return home and we will pick up where we left
          off.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <button type="button" onClick={reset} className="btn btn-solid">
            Try again
          </button>
          <Link href="/" className="btn btn-outline">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
