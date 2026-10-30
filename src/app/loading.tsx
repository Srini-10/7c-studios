export default function Loading() {
  return (
    <div className="flex min-h-[80svh] items-center justify-center bg-ink" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-5">
        <span className="display text-3xl tracking-[0.18em] text-bone/70">7C</span>
        <span className="h-px w-28 overflow-hidden bg-bone/15">
          <span className="block h-full w-1/2 animate-pulse bg-red-bright" />
        </span>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
