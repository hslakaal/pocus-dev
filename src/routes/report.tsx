import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { MeasureCard, ViewShell } from "@/components/echo/ViewShell";
import { useEchoStore } from "@/lib/use-echo-store";
import { buildReportText, computeResults, fmt } from "@/lib/echo";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Cardiac Report — EchoFlow" },
      {
        name: "description",
        content:
          "Summary of measured and calculated echo parameters: BSA, EF, FS, stroke volume, cardiac output, cardiac index, IVC collapsibility and RAP.",
      },
      { property: "og:title", content: "Cardiac Report — EchoFlow" },
      {
        property: "og:description",
        content: "Calculated POCUS echo summary with EF, CO, CI and estimated right atrial pressure.",
      },
    ],
  }),
  component: Report,
});

function Row({
  label,
  value,
  highlight,
  flag,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  flag?: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-foreground/5 py-2.5">
      <span className="min-w-0 truncate text-[13px] text-muted-foreground">{label}</span>
      <span
        className={`shrink-0 font-display text-[15px] font-bold ${highlight ? "text-primary" : ""}`}
      >
        {value}
        {flag ? (
          <span className="ml-1.5 rounded bg-accent/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-accent">
            {flag}
          </span>
        ) : null}
      </span>
    </div>
  );
}

function Report() {
  const { data, reset } = useEchoStore();
  const navigate = useNavigate();
  const r = useMemo(() => computeResults(data), [data]);

  const emailReport = () => {
    const subject = `EchoFlow POCUS summary${data.mrn ? ` — ${data.mrn}` : ""}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      buildReportText(data, r),
    )}`;
  };

  const collapse = r.ivcCi === null ? 0 : Math.max(0, Math.min(100, r.ivcCi));

  return (
    <ViewShell step={6}>
      <MeasureCard
        title="Cardiac Report"
        badge={
          <span className="flex shrink-0 items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
            <span className="size-1.5 rounded-full bg-primary" /> Live calc
          </span>
        }
      >
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-secondary p-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              MRN
            </p>
            <p className="truncate font-display text-lg font-bold">{data.mrn || "—"}</p>
          </div>
          <div className="rounded-lg bg-secondary p-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Age / Gender
            </p>
            <p className="truncate font-display text-lg font-bold capitalize">
              {data.age || "—"} / {data.gender || "—"}
            </p>
          </div>
        </div>

        <p className="pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Calculated
        </p>
        <Row label="BSA (Mosteller)" value={fmt(r.bsa, 2, "m²")} />
        <Row label="Ejection Fraction (Teichholz)" value={fmt(r.ef, 0, "%")} highlight />
        <Row label="Fractional Shortening" value={fmt(r.fs, 0, "%")} />
        <Row label="PSAX Fractional Shortening" value={fmt(r.psaxFs, 0, "%")} />
        <Row label="LVOT Area" value={fmt(r.lvotArea, 2, "cm²")} />
        <Row label="Stroke Volume" value={fmt(r.sv, 0, "mL")} />
        <Row label="Cardiac Output" value={fmt(r.co, 1, "L/min")} />
        <Row label="Cardiac Index" value={fmt(r.ci, 1, "L/min/m²")} />
        <Row
          label="TAPSE (normal ≥ 17 mm)"
          value={fmt(r.tapse, 0, "mm")}
          flag={r.tapse === null ? undefined : r.tapse < 17 ? "reduced" : "normal"}
        />

        <div className="mt-4 rounded-xl border border-primary/15 bg-primary/8 p-4">
          <div className="mb-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <p className="min-w-0 truncate text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              IVC Collapsibility
            </p>
            <span className="shrink-0 font-display text-lg font-bold text-primary">
              {fmt(r.ivcCi, 0, "%")}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-foreground/10">
            <div className="h-full rounded-full bg-primary" style={{ width: `${collapse}%` }} />
          </div>
          <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <p className="min-w-0 truncate text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Estimated RAP
            </p>
            <span className="inline-flex shrink-0 items-center gap-1.5 font-display text-[15px] font-bold">
              {r.rap === null ? "—" : `${r.rap} mmHg`}
              {r.rapLabel ? (
                <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-accent">
                  {r.rapLabel}
                </span>
              ) : null}
            </span>
          </div>
          <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
            IVC ≤ 2.1 cm with &gt;50% collapse ≈ 3 mmHg · IVC &gt; 2.1 cm with &lt;50% collapse ≈ 15
            mmHg · otherwise ≈ 8 mmHg.
          </p>
        </div>

        <p className="pb-1 pt-5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Measured
        </p>
        <Row label="PLAX LVEDD" value={data.lvedd ? `${data.lvedd} cm` : "—"} />
        <Row label="PLAX LVESD" value={data.lvesd ? `${data.lvesd} cm` : "—"} />
        <Row label="IVSd" value={data.ivsd ? `${data.ivsd} cm` : "—"} />
        <Row label="PWd" value={data.pwd ? `${data.pwd} cm` : "—"} />
        <Row label="PSAX diastole" value={data.psaxDiastole ? `${data.psaxDiastole} cm` : "—"} />
        <Row label="PSAX systole" value={data.psaxSystole ? `${data.psaxSystole} cm` : "—"} />
        <Row label="LVOT diameter" value={data.lvotDiameter ? `${data.lvotDiameter} cm` : "—"} />
        <Row label="LVOT VTI" value={data.lvotVti ? `${data.lvotVti} cm` : "—"} />
        <Row label="Heart rate" value={data.hr ? `${data.hr} bpm` : "—"} />
        <Row label="IVC max" value={data.ivcMax ? `${data.ivcMax} cm` : "—"} />
        <Row label="IVC min" value={data.ivcMin ? `${data.ivcMin} cm` : "—"} />

        <button
          onClick={emailReport}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-foreground/10 py-3 font-display text-sm font-semibold active:scale-[0.99]"
        >
          <span className="text-primary">✉</span> Email Report
        </button>
        <button
          onClick={() => {
            reset();
            navigate({ to: "/" });
          }}
          className="mt-2 w-full py-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground"
        >
          Clear session
        </button>
      </MeasureCard>
    </ViewShell>
  );
}
