"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

export type StoryMemoryItem = {
  id: string;
  image: string;
  quote: string;
  story: string;
  moment?: string;
  location?: string;
};

type Props = {
  coupleName: string;
  memories: StoryMemoryItem[];
};

function DollyCard({
  memory,
  index,
  total,
  scrollYProgress,
}: {
  memory: StoryMemoryItem;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const prefersReduced = useReducedMotion();
  const isFirst = index === 0;
  const isLast = index === total - 1;

  // Window calculation for each card
  const segment = 1 / Math.max(1, total - 0.2);
  const enterStart = Math.max(0, (index - 0.7) * segment);
  const enterEnd = index * segment;
  const exitStart = (index + 0.5) * segment;
  const exitEnd = Math.min(1, (index + 1.2) * segment);

  // Range definitions
  const range = isFirst
    ? [0, 0, exitStart, exitEnd]
    : isLast
      ? [enterStart, enterEnd, 1, 1]
      : [enterStart, enterEnd, exitStart, exitEnd];

  const zValues = prefersReduced
    ? [0, 0, 0, 0]
    : isFirst
      ? [0, 0, 100, 480]
      : isLast
        ? [-500, 0, 0, 0]
        : [-500, 0, 100, 480];

  const scaleValues = prefersReduced
    ? [1, 1, 1, 1]
    : isFirst
      ? [1, 1, 1.04, 1.18]
      : isLast
        ? [0.82, 1, 1, 1]
        : [0.82, 1, 1.04, 1.18];

  const opacityValues = isFirst
    ? [1, 1, 0.95, 0]
    : isLast
      ? [0, 1, 1, 1]
      : [0, 1, 0.95, 0];

  const blurValues = prefersReduced
    ? ["blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)"]
    : isFirst
      ? ["blur(0px)", "blur(0px)", "blur(0px)", "blur(10px)"]
      : isLast
        ? ["blur(8px)", "blur(0px)", "blur(0px)", "blur(0px)"]
        : ["blur(8px)", "blur(0px)", "blur(0px)", "blur(10px)"];

  const yValues = prefersReduced
    ? [0, 0, 0, 0]
    : isFirst
      ? [0, 0, -15, -45]
      : isLast
        ? [35, 0, 0, 0]
        : [35, 0, -15, -45];

  const z = useTransform(scrollYProgress, range, zValues);
  const scale = useTransform(scrollYProgress, range, scaleValues);
  const opacity = useTransform(scrollYProgress, range, opacityValues);
  const filter = useTransform(scrollYProgress, range, blurValues);
  const y = useTransform(scrollYProgress, range, yValues);

  return (
    <motion.div
      style={{
        opacity,
        scale,
        z,
        y,
        filter,
        transformStyle: "preserve-3d",
      }}
      className="pointer-events-none absolute inset-0 flex items-center justify-center p-3 sm:p-6 md:p-10"
    >
      <div className="pointer-events-auto relative mx-auto grid max-h-[80svh] w-full max-w-[1180px] items-center gap-4 overflow-y-auto rounded-2xl border border-[#e5e1da] bg-[#ffffff] p-4 shadow-[0_20px_50px_-15px_rgba(20,13,8,0.14)] sm:gap-6 sm:p-6 md:max-h-none md:grid-cols-12 md:gap-10 md:overflow-visible md:p-8 lg:p-10">
        {/* Memory Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#201813] sm:aspect-[4/3] md:col-span-7 md:aspect-[16/11]">
          <Image
            src={memory.image}
            alt={memory.quote}
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-cover transition-transform duration-700 ease-out hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

          {/* Moment Tag Badge */}
          <div className="absolute bottom-3 left-3 rounded-full bg-black/65 px-3 py-1 backdrop-blur-md sm:bottom-4 sm:left-4 sm:px-4 sm:py-1.5">
            <span className="font-sans text-[8.5px] font-medium tracking-[0.2em] text-[#f4efe8] uppercase sm:text-[10px]">
              {memory.moment ?? `MOMENT 0${index + 1}`}
            </span>
          </div>
        </div>

        {/* Memory Quote & Story Words */}
        <div className="flex flex-col justify-center md:col-span-5">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="h-[2px] w-5 bg-brand-red sm:w-6" />
            <span className="font-sans text-[9px] font-semibold tracking-[0.25em] text-brand-red uppercase sm:text-[10px]">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} MEMORIES
            </span>
          </div>

          <h3 className="mt-2 font-cormorant text-[clamp(1.4rem,2.8vw,2.75rem)] font-normal leading-[1.15] text-[#292722] sm:mt-4">
            &ldquo;{memory.quote}&rdquo;
          </h3>

          <p className="mt-2 font-sans text-[13px] font-normal leading-[1.7] text-[#6b665f] sm:mt-4 sm:text-[15px] sm:leading-[1.8]">
            {memory.story}
          </p>

          {memory.location && (
            <p className="mt-3 font-sans text-[9px] uppercase tracking-[0.2em] text-[#99948b] sm:mt-5 sm:text-[10px]">
              Location &bull; {memory.location}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function DollyMemoryGallery({ coupleName, memories }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const total = memories.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      aria-label={`${coupleName} memories scroll gallery`}
      className="relative bg-[#f7f5f0]"
      style={{ height: `${Math.max(260, total * 90)}vh` }}
    >
      {/* Pinned 3D Stage */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-4 py-6 md:px-10 md:py-8">
        {/* Header */}
        <div className="relative z-20 mx-auto flex w-full max-w-[1240px] items-center justify-between border-b border-[#ded7cc] pb-4">
          <div>
            <p className="font-sans text-[10px] font-semibold tracking-[0.28em] text-brand-red uppercase">
              CHRONICLES &bull; {coupleName}
            </p>
            <h2 className="font-cormorant text-[clamp(1.5rem,2.2vw,2.2rem)] font-normal text-[#292722]">
              Moments Stacked in Depth
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden font-sans text-[10px] tracking-[0.2em] text-[#8e8982] uppercase sm:inline-block">
              Scroll to fly through memories
            </span>
            <span className="inline-block animate-bounce text-brand-red text-sm font-semibold">↓</span>
          </div>
        </div>

        {/* 3D Depth Viewport */}
        <div
          className="relative flex-1 w-full"
          style={{
            perspective: "1400px",
            perspectiveOrigin: "50% 50%",
            transformStyle: "preserve-3d",
          }}
        >
          {memories.map((memory, i) => (
            <DollyCard
              key={memory.id}
              memory={memory}
              index={i}
              total={total}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Bottom Progress Bar */}
        <div className="relative z-20 mx-auto w-full max-w-[1240px] pt-4">
          <div className="flex items-center justify-between pb-2 font-sans text-[9px] uppercase tracking-[0.2em] text-[#8e8982]">
            <span>Memory Journey</span>
            <span>{total} Curated Moments</span>
          </div>
          <div className="h-[2px] w-full overflow-hidden rounded-full bg-[#ded7cc]">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              className="h-full w-full bg-brand-red"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
