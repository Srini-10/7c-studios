import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[86svh] items-center overflow-hidden bg-ink text-bone">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(125,23,20,0.28),transparent_68%)]"
      />
      <div className="container-page py-32">
        <p className="eyebrow text-bone/45">Error 404</p>
        <h1 className="display mt-6 text-[clamp(3.4rem,9vw,8rem)] leading-[0.95]">
          Lost in the
          <br />
          <em className="display-italic text-red-bright">archive.</em>
        </h1>
        <p className="mt-7 max-w-md text-[0.95rem] leading-[1.85] text-bone/55">
          The page you were looking for has moved, or perhaps it was never photographed. Let us
          take you back to the work.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/" className="btn btn-solid">
            Back home
            <ArrowUpRight width={15} height={15} />
          </Link>
          <Link href="/stories" className="btn btn-outline">
            View the portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
