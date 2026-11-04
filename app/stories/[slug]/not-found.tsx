import Link from "next/link";

export default function StoryNotFound() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center gap-6 bg-[#1A0D0E] px-6 py-32 text-center text-brand-gold">
      <h1 className="font-cormorant text-5xl">Story not found</h1>
      <p className="prose-copy max-w-md font-sans text-sm leading-7 text-[#D7C3B6]">This story is not available yet. Explore the moments we have shared.</p>
      <Link href="/stories" className="border-b border-brand-gold/50 pb-2 font-sans text-xs uppercase tracking-[0.2em] hover:text-[#F9E8B8] transition-colors">View all stories →</Link>
    </section>
  );
}
