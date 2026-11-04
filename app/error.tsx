"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center bg-[#FAEBD7] px-6 pb-16 pt-[140px] text-center text-[#1A0D0E]">
      <p className="font-serif text-[11px] uppercase tracking-[0.3em] text-brand-gold md:text-[13px]">
        Something went wrong
      </p>
      <h1 className="mt-5 max-w-[720px] font-cormorant text-[clamp(2.5rem,5.5vw,5rem)] font-normal leading-[1.08]">
        We couldn’t load this page.
      </h1>
      <p className="mt-6 max-w-[460px] font-sans text-[15px] leading-[1.8] text-[#554840] sm:text-[16px]">
        Please try again. If the problem continues, return to the homepage.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-red px-7 font-sans text-[11px] uppercase tracking-[0.16em] text-[#FCF7F1] transition-colors hover:bg-brand-red-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#D7C3B6] px-7 font-sans text-[11px] uppercase tracking-[0.16em] text-[#1A0D0E] transition-colors hover:border-brand-gold hover:text-brand-gold"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
