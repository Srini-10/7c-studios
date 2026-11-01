
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import homeData from "../../data/homepage.json";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0 },
};

const imagesReveal = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function WhyChoose() {
  const { whyChoose } = homeData;

  const images = [
    {
      src: whyChoose.images.topLeft,
      className: "col-start-1 row-start-1",
      alt: "Wedding details",
    },
    {
      src: whyChoose.images.topRight,
      className: "col-start-2 row-start-1",
      alt: "Bridal closeup",
    },
    {
      src: whyChoose.images.middleLeft,
      className: "col-start-1 row-start-2",
      alt: "Wedding couple",
    },
    {
      src: whyChoose.images.bottomLeft,
      className: "col-start-1 row-start-3",
      alt: "Wedding ceremony",
    },
    {
      src: whyChoose.images.rightTall,
      className: "col-start-2 row-start-2 row-span-2",
      alt: "Bridal portrait",
    },
  ];

  return (
    <section className="w-full bg-white py-8 md:py-10 lg:py-12">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">

          {/* Left: Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.15 }}
            className="w-full sm:max-lg:mx-auto sm:max-lg:max-w-[640px] sm:max-lg:text-center"
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="mb-3 font-cormorant text-[16px] font-normal uppercase tracking-[0.35em] text-[#d11414] sm:max-lg:text-center!"
            >
              {whyChoose.eyebrow}
            </motion.p>

            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="font-cormorant text-[44px] font-normal uppercase leading-tight tracking-[0.18em] text-[#d11414] sm:text-[48px] lg:text-[52px]"
            >
              {whyChoose.title}
            </motion.h2>

            <motion.h3
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="mt-6 font-cormorant text-[26px] font-normal leading-snug text-[#171717] sm:text-[28px]"
            >
              {whyChoose.subtitle}
            </motion.h3>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="prose-copy mt-3 max-w-[410px] font-sans text-[15px] font-normal leading-[1.8] tracking-normal text-[#626262] sm:text-[16px] sm:max-lg:mx-auto"
            >
              {whyChoose.description}
            </motion.p>

            <motion.dl
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="mt-10 grid max-w-[520px] grid-cols-2 gap-x-8 p-0 sm:max-lg:mx-auto"
            >
              {whyChoose.stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`border-t border-[#ded9d2] py-5 ${index < 2 ? "border-t-0" : ""}`}
                >
                  <dt className="font-cormorant text-[44px] font-normal leading-none tracking-normal text-brand-red sm:text-[52px]">
                    {stat.value}
                  </dt>
                  <dd className="mt-2 font-sans text-[11px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-[#514b43] sm:text-[12px]">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* Right: Wedding image collage */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.12 }}
            className="grid aspect-[312/317] w-full grid-cols-2 grid-rows-[1.5fr_1fr_1.25fr] gap-[7px] sm:max-lg:mx-auto sm:max-lg:max-w-[450px] lg:aspect-auto lg:h-full"
          >
            {images.map((image, index) => (
              <motion.div
                key={image.src}
                variants={imagesReveal}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className={`group relative overflow-hidden ${image.className}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 45vw, 280px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
