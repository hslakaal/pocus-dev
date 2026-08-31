import { Link } from "@tanstack/react-router";
import { ScanLine } from "lucide-react";
import type { ReactNode } from "react";

const TOTAL = 6;

export function ViewShell({
  step,
  children,
}: {
  step: number;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto min-h-screen max-w-md bg-background text-foreground selection:bg-accent/30">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-40 overflow-hidden">
        <div className="absolute -left-10 -top-24 h-40 w-[140%] -skew-y-6 bg-primary" />
        <div className="absolute -left-10 -top-10 h-3 w-[140%] -skew-y-6 bg-accent" />
      </div>

      <header className="relative z-10 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 pb-4 pt-16">
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

export function ViewImage({ label }: { label: string }) {
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
      onClick={onClick}
      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground py-4 font-display text-sm font-bold tracking-wide text-background active:scale-[0.99]"
    >
      {label} <span className="font-normal">→</span>
    </button>
  );
}
