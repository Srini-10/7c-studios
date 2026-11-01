import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | 7C Studio",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center bg-[#f7f3ec] px-6 pb-16 pt-[140px] text-center text-[#29241e]">
      <p className="font-serif text-[11px] uppercase tracking-[0.3em] text-[#bd1b18] md:text-[13px]">
        404 · Page not found
      </p>
      <h1 className="mt-5 max-w-[720px] font-cormorant text-[clamp(2.75rem,6vw,5.5rem)] font-normal leading-[1.08]">
        This moment isn’t in the archive.
      </h1>
      <p className="mt-6 max-w-[460px] font-sans text-[15px] leading-[1.8] text-[#626262] sm:text-[16px]">
        The page may have moved, or the link may be out of date. Return home to keep exploring the stories.
      </p>
      <Link
        href="/"
        className="mt-9 inline-flex min-h-11 items-center justify-center bg-[#bd1b18] px-7 font-sans text-[11px] uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#9c1512] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#bd1b18]"
      >
        Back to home
      </Link>
    </section>
  );
}
