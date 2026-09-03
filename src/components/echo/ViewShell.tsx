import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link, useRouter } from "@tanstack/react-router";
import { ChevronDown, ChevronLeft, ScanLine, X } from "lucide-react";
import type { ReactNode } from "react";

const TOTAL = 6;

export function ViewShell({
  step,
  onBack,
  children,
}: {
  step: number;
  onBack?: () => void;
  children: ReactNode;
}) {
  const router = useRouter();

  // If a custom onBack action is provided, use it; otherwise, pop browser history
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.history.back();
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background text-foreground selection:bg-accent/30">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-40 overflow-hidden">
        <div className="absolute -left-10 -top-24 h-40 w-[140%] -skew-y-6 bg-primary" />
        <div className="absolute -left-10 -top-10 h-3 w-[140%] -skew-y-6 bg-accent" />
      </div>

      <header className="relative z-10 flex items-center justify-between gap-3 px-5 pb-4 pt-16">
        <div className="flex min-w-0 items-center gap-2">
          {/* Small Top Header Back Button (Only visible on Steps 2 through 6) */}
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              aria-label="Go to previous view"
              className="grid size-9 shrink-0 place-items-center rounded-md border border-border/40 bg-card text-foreground shadow-sm transition-transform active:scale-95"
            >
              <ChevronLeft className="size-5" />
            </button>
          )}

          <Link to="/" className="flex min-w-0 items-center gap-2">
            <div className="grid size-9 shrink-0 -skew-x-12 place-items-center rounded-md bg-card shadow-sm">
              <span className="skew-x-12 font-display text-lg font-bold text-primary">E</span>
            </div>
            <div className="min-w-0 leading-none">
              <p className="truncate font-display text-[15px] font-bold tracking-tight">
                ECHO<span className="text-primary">FLOW</span>
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                POCUS Calc
              </p>
            </div>
          </Link>
        </div>

        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Step {step} / {TOTAL}
        </span>
      </header>

      <div className="flex items-center gap-1.5 px-5 pb-3">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i < step ? "bg-primary" : "bg-foreground/10"}`}
          />
        ))}
      </div>

      {children}

      <p className="px-8 pb-8 pt-2 text-center text-[10px] text-muted-foreground">
        EchoFlow · point-of-care reference calculations
      </p>
    </div>
  );
}

export function MeasureCard({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mx-5 mb-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
        <h1 className="truncate font-display text-xl font-bold tracking-tight">{title}</h1>
        {badge}
      </div>
      {children}
    </section>
  );
}

export function NumField({
  label,
  hint,
  unit,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  unit?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="min-w-0">
      <label className="flex items-baseline justify-between gap-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        <span className="truncate">{label}</span>
        {hint ? <span className="shrink-0 normal-case tracking-normal">{hint}</span> : null}
      </label>
      <div className="mt-1 flex items-center border-b-2 border-foreground/10 transition-colors focus-within:border-primary">
        <input
          inputMode="decimal"
          value={value}
          placeholder="—"
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-w-0 bg-transparent py-2 text-[15px] font-medium outline-none placeholder:text-muted-foreground/50"
        />
        {unit ? <span className="shrink-0 pl-1 text-xs text-muted-foreground">{unit}</span> : null}
      </div>
    </div>
  );
}

export function ViewImage({
  label,
  images,
  src,
}: {
  label: string;
  images?: string[];
  src?: string;
}) {
  const imageList = images && images.length > 0 ? images : src ? [src] : [];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 1. Boolean state to control whether the fullscreen pop-out is open
  const [isPopoutOpen, setIsPopoutOpen] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // 2. Horizontal scroll gallery overlay
  const fullscreenOverlay = isPopoutOpen ? (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-150"
    >
      {/* Pinned close button */}
      <button
        type="button"
        onClick={() => setIsPopoutOpen(false)}
        className="fixed right-4 top-4 z-50 grid size-11 place-items-center rounded-full bg-white/20 text-white shadow-lg backdrop-blur-md transition-transform active:scale-90"
        aria-label="Close enlarged view"
      >
        <X className="size-6" />
      </button>

      {/* Horizontal scrolling track */}
      <div className="flex h-full w-full overflow-x-auto overscroll-x-contain snap-x snap-mandatory">
        {imageList.map((imgSrc, index) => (
          <div
            key={index}
            className="flex h-full w-full flex-[0_0_100%] snap-center items-center justify-center p-4"
          >
            <div className="flex flex-col items-center">
              <img
                src={imgSrc}
                alt={`${label} view ${index + 1}`}
                className="max-h-[82vh] max-w-[95vw] object-contain select-none"
              />
              {imageList.length > 1 && (
                <span className="mt-3 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wider text-white/70">
                  {index + 1} of {imageList.length}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;

  // Case A: Multiple images inside card
  if (imageList.length > 1) {
    return (
      <div className="mb-4">
        <div ref={emblaRef} className="overflow-hidden rounded-lg border border-border bg-black">
          <div className="flex">
            {imageList.map((imgSrc, index) => (
              <div
                key={index}
                onClick={() => setIsPopoutOpen(true)}
                className="flex aspect-[16/9] flex-[0_0_100%] min-w-0 cursor-zoom-in items-center justify-center active:opacity-90"
              >
                <img
                  src={imgSrc}
                  alt={`${label} slide ${index + 1}`}
                  className="max-h-full max-w-full object-contain pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 flex justify-center gap-1.5">
          {imageList.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === selectedIndex ? "w-4 bg-primary" : "w-1.5 bg-foreground/20"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {fullscreenOverlay}
      </div>
    );
  }

  // Case B: Single image inside card
  if (imageList.length === 1) {
    return (
      <div className="mb-4">
        <div
          onClick={() => setIsPopoutOpen(true)}
          className="flex aspect-[16/9] w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-lg border border-border bg-black active:opacity-90"
        >
          <img
            src={imageList[0]}
            alt={`${label} reference`}
            className="max-h-full max-w-full object-contain pointer-events-none"
          />
        </div>

        {fullscreenOverlay}
      </div>
    );
  }

  // Case C: Fallback placeholder
  return (
    <div
      role="img"
      aria-label={`${label} reference image placeholder`}
      className="mb-4 flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-foreground/15 bg-secondary text-muted-foreground"
    >
      <ScanLine className="size-7 opacity-50" />
      <p className="px-6 text-center text-[10px] font-semibold uppercase tracking-[0.18em] opacity-70">
        {label} · image placeholder
      </p>
    </div>
  );
}

export function NextButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground py-4 font-display text-sm font-bold tracking-wide text-background active:scale-[0.99]"
    >
      {label} <span className="font-normal">→</span>
    </button>
  );
}

export function BackButton({
  label = "Back to previous view",
  onClick,
}: {
  label?: string;
  onClick?: () => void;
}) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={onClick ?? (() => router.history.back())}
      className="mt-2 flex w-full items-center justify-center gap-1.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground active:scale-[0.99]"
    >
      <ChevronLeft className="size-4" />
      <span>{label}</span>
    </button>
  );
}

export function CollapsibleInfo({
  title = "Clinical Reference & Tips",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  // 1. Create a boolean state switch (starts as closed / false)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-border/60 bg-muted/30">
      {/* 2. Clickable header button to toggle open/closed */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between p-3.5 text-left font-display text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
      >
        <span>{title}</span>
        <ChevronDown
          className={`size-4 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {/* 3. Drop-down content box (only rendered when isOpen is true) */}
      {isOpen && (
        <div className="space-y-3 border-t border-border/40 p-3.5 text-xs text-muted-foreground">
          {children}
        </div>
      )}
    </div>
  );
}