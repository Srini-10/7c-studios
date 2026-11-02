"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

export type StoryMemoryItem = {
  id: string;
  image: string;
  images?: string[];
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

  // Resolve multiple images array with graceful fallback
  const images =
    memory.images && memory.images.length > 0
      ? memory.images
      : [
          memory.image,
          "/images/wedding/top-left.jpg",
          "/images/wedding/top-right.jpg",
        ];

  const imgPrimary = images[0] ?? memory.image;
  const imgSecondary = images[1] ?? images[0] ?? memory.image;
  const imgTertiary = images[2] ?? images[0] ?? memory.image;

  // Window calculation for each memory stage (strictly monotonic for all cards)
  const unit = 1 / total;
  let enterStart = 0;
  let enterEnd = 0.001;
  let exitStart = unit * 0.72;
  let exitEnd = unit * 1.05;

  if (isFirst) {
    enterStart = 0;
    enterEnd = 0.001;
    exitStart = unit * 0.72;
    exitEnd = unit * 1.05;
  } else if (isLast) {
    enterStart = (index - 0.28) * unit;
    enterEnd = (index + 0.05) * unit;
    exitStart = 0.92;
    exitEnd = 1.0;
  } else {
    enterStart = (index - 0.28) * unit;
    enterEnd = (index + 0.05) * unit;
    exitStart = (index + 0.72) * unit;
    exitEnd = (index + 1.05) * unit;
  }

  const range = [enterStart, enterEnd, exitStart, exitEnd];

  // Base 3D transform values for the container
  const zValues = prefersReduced
    ? [0, 0, 0, 0]
    : isFirst
      ? [0, 0, 100, 420]
      : isLast
        ? [-450, 0, 0, 70]
        : [-450, 0, 100, 420];

  const scaleValues = prefersReduced
    ? [1, 1, 1, 1]
    : isFirst
      ? [1, 1, 1.04, 1.16]
      : isLast
        ? [0.84, 1, 1, 1.04]
        : [0.84, 1, 1.04, 1.16];

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
        ? [35, 0, 0, -14]
        : [35, 0, -15, -45];

  const z = useTransform(scrollYProgress, range, zValues);
  const scale = useTransform(scrollYProgress, range, scaleValues);
  const opacity = useTransform(scrollYProgress, range, opacityValues);
  const filter = useTransform(scrollYProgress, range, blurValues);
  const y = useTransform(scrollYProgress, range, yValues);

  // Parallax drift in 3D for secondary and tertiary images (Infinite Gallery depth drift)
  const secondaryY = useTransform(
    scrollYProgress,
    range,
    prefersReduced
      ? [0, 0, 0, 0]
      : isFirst
        ? [0, 0, -18, -42]
        : isLast
          ? [22, 0, 0, -12]
          : [22, 0, -18, -42],
  );
  const secondaryRotate = useTransform(
    scrollYProgress,
    range,
    prefersReduced
      ? [0, 0, 0, 0]
      : isFirst
        ? [-4, -4, -4, -1]
        : isLast
          ? [-7, -4, -4, -2.5]
          : [-7, -4, -4, -1],
  );
  const tertiaryY = useTransform(
    scrollYProgress,
    range,
    prefersReduced
      ? [0, 0, 0, 0]
      : isFirst
        ? [0, 0, 20, 50]
        : isLast
          ? [-18, 0, 0, 15]
          : [-18, 0, 20, 50],
  );
  const tertiaryRotate = useTransform(
    scrollYProgress,
    range,
    prefersReduced
      ? [0, 0, 0, 0]
      : isFirst
        ? [3, 3, 2, 0]
        : isLast
          ? [6, 3, 3, 1.8]
          : [6, 3, 2, 0],
  );

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
      className="pointer-events-none absolute inset-0 flex items-center justify-center p-3 sm:p-6 md:p-8 lg:p-10"
    >
      <div className="pointer-events-auto relative mx-auto grid max-h-[82svh] w-full max-w-[1280px] items-center gap-6 overflow-y-auto rounded-3xl border border-[#e5e1da] bg-[#ffffff]/98 p-5 shadow-[0_25px_65px_-18px_rgba(20,13,8,0.18)] backdrop-blur-md sm:p-8 md:max-h-none md:grid-cols-12 md:gap-10 md:overflow-visible lg:gap-12 lg:p-10">
        
        {/* 3D Multi-Image Spatial Field (Primary + Companion Frames) */}
        <div
          className="relative w-full md:col-span-7"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1200px",
          }}
        >
          {/* Main Primary Photo Plane */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#201813] shadow-[0_15px_35px_-8px_rgba(0,0,0,0.3)] sm:aspect-[4/3] md:w-[72%] md:aspect-[16/11]">
            <Image
              src={imgPrimary}
              alt={memory.quote}
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Moment Tag Badge */}
            <div className="absolute bottom-3 left-3 rounded-full bg-black/65 px-3.5 py-1 backdrop-blur-md sm:bottom-4 sm:left-4 sm:px-4 sm:py-1.5">
              <span className="font-sans text-[8.5px] font-medium tracking-[0.2em] text-[#f4efe8] uppercase sm:text-[10px]">
                {memory.moment ?? `MOMENT 0${index + 1}`}
              </span>
            </div>
          </div>

          {/* Secondary Floating Perspective Photo (Right Depth Plane) */}
          <motion.div
            style={{
              y: secondaryY,
              rotateZ: secondaryRotate,
              transformStyle: "preserve-3d",
            }}
            className="absolute right-0 -top-3 hidden w-[40%] aspect-[3/4] overflow-hidden rounded-2xl border-2 border-white bg-[#1a120c] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.45)] sm:block md:-top-4 lg:-top-5"
          >
            <Image
              src={imgSecondary}
              alt={`${memory.moment ?? "Moment"} secondary view`}
              fill
              sizes="(max-width: 1024px) 200px, 280px"
              className="object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-2.5 right-2.5 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-md">
              <span className="font-sans text-[7.5px] font-medium tracking-[0.15em] text-[#e8dfd5] uppercase lg:text-[8.5px]">
                PERSPECTIVE
              </span>
            </div>
          </motion.div>

          {/* Tertiary Floating Accent Photo (Bottom Accent Plane) */}
          <motion.div
            style={{
              y: tertiaryY,
              rotateZ: tertiaryRotate,
              transformStyle: "preserve-3d",
            }}
            className="absolute -bottom-4 right-8 hidden w-[34%] aspect-[4/3] overflow-hidden rounded-xl border-2 border-white bg-[#1a120c] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] lg:block lg:-bottom-6 lg:right-12"
          >
            <Image
              src={imgTertiary}
              alt={`${memory.moment ?? "Moment"} ambient view`}
              fill
              sizes="220px"
              className="object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-black/15" />
          </motion.div>

          {/* Mobile Secondary Inset Thumbnail */}
          <div className="absolute -bottom-3 right-3 block aspect-[4/3] w-28 overflow-hidden rounded-xl border-2 border-white shadow-lg sm:hidden">
            <Image
              src={imgSecondary}
              alt=""
              fill
              sizes="112px"
              className="object-cover"
            />
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

          <h3 className="mt-2.5 font-cormorant text-[clamp(1.45rem,2.8vw,2.75rem)] font-normal leading-[1.15] text-[#292722] sm:mt-4">
            &ldquo;{memory.quote}&rdquo;
          </h3>

          <p className="mt-2.5 font-sans text-[13px] font-normal leading-[1.75] text-[#6b665f] sm:mt-4 sm:text-[15px] sm:leading-[1.8]">
            {memory.story}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#ede7df] pt-3 sm:mt-5 sm:pt-4">
            {memory.location && (
              <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#99948b] sm:text-[10px]">
                {memory.location}
              </span>
            )}
            <span className="hidden text-[#d4cdc4] sm:inline">&bull;</span>
            <span className="font-sans text-[9px] uppercase tracking-[0.15em] text-brand-red sm:text-[10px]">
              {images.length} Captured Frames
            </span>
          </div>
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
      style={{ height: `${Math.max(240, total * 78)}vh` }}
    >
      {/* Pinned 3D Stage */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-4 pt-16 pb-6 md:px-10 md:pt-20 md:pb-8">
        {/* Header */}
        <div className="relative z-20 mx-auto flex w-full max-w-[1280px] items-center justify-between border-b border-[#ded7cc] pb-4">
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
        <div className="relative z-20 mx-auto w-full max-w-[1280px] pt-4">
          <div className="flex items-center justify-between pb-2 font-sans text-[9px] uppercase tracking-[0.2em] text-[#8e8982]">
            <span>Memory Journey</span>
            <span>{total} Curated Chapters</span>
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
