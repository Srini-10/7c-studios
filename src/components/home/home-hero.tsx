import Link from "next/link";
import { home } from "@/content/home";
import { ArrowUpRight, Play, Spark } from "@/components/ui/icons";

export function HomeHero() {
  return (
    <section className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-bone">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-56 top-1/4 -z-10 size-[46rem] rounded-full bg-[radial-gradient(circle,rgba(125,23,20,0.42),rgba(42,10,9,0.18)_45%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-48 bottom-0 -z-10 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(189,27,24,0.16),transparent_68%)]"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-[8%] hidden w-px bg-gradient-to-b from-transparent via-bone/12 to-transparent xl:block"
      />

      <div className="container-page relative flex flex-1 flex-col justify-center pb-14 pt-[calc(var(--header-height)+5rem)] md:pb-20 lg:pt-[calc(var(--header-height)+7rem)]">
        <p
          className="eyebrow animate-rise text-bone/55"
          style={{ animationDelay: "80ms" }}
        >
          {home.hero.eyebrow}
        </p>

        <h1 className="display mt-8 text-[clamp(3.45rem,11.8vw,11rem)] leading-[0.86] tracking-[-0.035em]">
          <span className="animate-rise block" style={{ animationDelay: "160ms" }}>
            {home.hero.title}
          </span>
          <em
            className="display-italic animate-rise mt-1 block pl-[4vw] text-red-bright md:pl-[8vw]"
            style={{ animationDelay: "280ms" }}
          >
            {home.hero.accent}
          </em>
        </h1>

        <div
          className="animate-rise mt-14 grid gap-10 border-t border-bone/12 pt-8 md:mt-20 md:grid-cols-12 md:gap-8"
          style={{ animationDelay: "400ms" }}
        >
          <div className="flex flex-col justify-between gap-8 md:col-span-4">
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-[0.65rem] font-semibold uppercase leading-relaxed tracking-[0.2em] text-bone/40">
              <span>Salem · Tamil Nadu</span>
              <span>Est. 2014</span>
              <span>Worldwide</span>
            </div>
            <span className="hidden items-center gap-3 text-[0.6rem] uppercase tracking-[0.28em] text-bone/30 md:flex">
              <span className="h-px w-10 bg-bone/25" />
              Scroll to explore
            </span>
          </div>

          <div className="md:col-span-5 md:col-start-6">
            <p className="max-w-md text-[0.98rem] leading-[1.85] text-bone/62 md:text-[1.05rem]">
              {home.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={home.hero.primaryCta.href} className="btn btn-solid">
                {home.hero.primaryCta.label}
                <ArrowUpRight width={15} height={15} />
              </Link>
              <Link href={home.hero.secondaryCta.href} className="btn btn-outline">
                <Play width={13} height={13} />
                {home.hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="hidden justify-end md:col-span-2 md:flex">
            <p className="vertical-label text-[0.6rem] uppercase tracking-[0.3em] text-bone/30">
              Photography & Films
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-bone/10 bg-ink/35 py-5">
        <div className="marquee" aria-label="Services offered">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 items-center gap-10 pr-10"
              >
                {home.hero.marquee.map((item) => (
                  <li
                    key={`${copy}-${item}`}
                    className="flex items-center gap-10 whitespace-nowrap text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-bone/48"
                  >
                    <span>{item}</span>
                    <Spark className="text-red/70" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
