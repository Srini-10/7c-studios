import Image from "next/image";
import { home } from "@/content/home";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function WhyChooseSection() {
  return (
    <section className="relative overflow-hidden bg-ink-2 py-20 text-bone md:py-28 lg:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-red/40 to-transparent"
      />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={home.whyChoose.eyebrow}
            title={home.whyChoose.title}
            accent={home.whyChoose.accent}
            description={home.whyChoose.description}
            theme="dark"
          />
        </Reveal>

        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5">
          {home.whyChoose.items.map((item, index) => (
            <Reveal key={item.number} delay={index * 90}>
              <article className="group relative isolate flex min-h-[22rem] overflow-hidden border border-bone/10 md:min-h-[25rem]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={70}
                  className="image-cover -z-20 opacity-30 transition-[transform,opacity] duration-[1400ms] ease-out group-hover:scale-105 group-hover:opacity-45"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-[linear-gradient(155deg,rgba(12,10,9,0.4)_0%,rgba(12,10,9,0.74)_56%,rgba(12,10,9,0.94)_100%)]"
                />

                <div className="flex w-full flex-col justify-between p-7 md:p-9">
                  <div className="flex items-start justify-between gap-6">
                    <span className="font-sans text-[0.65rem] font-semibold tracking-[0.28em] text-bone/35">
                      {item.number}
                    </span>
                    <span
                      aria-hidden
                      className="h-px w-12 bg-bone/18 transition-[width,background-color] duration-500 group-hover:w-20 group-hover:bg-red-bright/70"
                    />
                  </div>

                  <div>
                    <p className="display text-[clamp(3.2rem,6vw,4.6rem)] leading-none text-bone">
                      {item.value}
                      <span className="text-red-bright">.</span>
                    </p>
                    <h3 className="display mt-4 text-[clamp(1.45rem,2.4vw,1.9rem)] leading-tight text-bone">
                      {item.label}
                    </h3>
                    <p className="mt-4 max-w-sm text-[0.88rem] leading-[1.85] text-bone/65">
                      {item.copy}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
