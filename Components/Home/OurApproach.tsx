"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import homeData from "../../data/homepage.json";
import styles from "./OurApproach.module.css";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0 },
};

export default function OurApproach() {
  const { approach } = homeData;

  return (
    <section className="w-full bg-brand-white py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[0.92fr_1fr] md:gap-14 lg:gap-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
            variants={reveal}
            className={`${styles.imageFrame} relative aspect-[4/5] w-full overflow-hidden bg-[#f2ece3]`}
          >
            <Image
              src={approach.image.src}
              alt={approach.image.alt}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 46vw, 540px"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE_OUT }}
            variants={reveal}
          >
            <p className="mb-5 font-cormorant text-[16px] font-normal uppercase leading-[1.4] tracking-[0.32em] text-[#d11414]">
              {approach.eyebrow}
            </p>

            <h2 className="font-cormorant text-[clamp(2.15rem,4vw,3.25rem)] font-medium uppercase leading-[1.18] tracking-normal text-black">
              {approach.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <p className="mt-4 font-cormorant text-[clamp(1.8rem,3vw,2.6rem)] font-semibold italic leading-[1.2] text-[#d11414]">
              {approach.highlight}
            </p>

            <div className="mt-7 space-y-5">
              {approach.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="prose-copy max-w-[560px] font-sans text-[15px] font-normal leading-[1.8] tracking-normal text-[#626262] sm:text-[16px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
