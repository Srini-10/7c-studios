import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/icons";

type ClosingCtaProps = {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
  eyebrow?: string;
  imagePosition?: string;
};

export function ClosingCta({
  image,
  imageAlt,
  title,
  description,
  cta,
  eyebrow = "Begin a conversation",
  imagePosition = "center",
}: ClosingCtaProps) {
  return (
    <section className="relative isolate flex min-h-[68svh] items-end overflow-hidden bg-ink text-bone">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="100vw"
        quality={78}
        className="image-cover -z-20"
        style={{ objectPosition: imagePosition }}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(12,10,9,0.35)_0%,rgba(12,10,9,0.45)_45%,rgba(12,10,9,0.9)_100%)]" />
      <div className="container-page w-full pb-16 pt-32 md:pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow text-bone/50">{eyebrow}</p>
          <h2 className="display mt-5 text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.98]">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-[0.98rem] leading-[1.85] text-bone/65">{description}</p>
          <div className="mt-9">
            <Link href={cta.href} className="btn btn-solid">
              {cta.label}
              <ArrowUpRight width={15} height={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
