import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { HeartPulse, TriangleAlert, Wind } from "lucide-react";
import { MeasureCard, NumField, ViewShell } from "@/components/echo/ViewShell";
import { useEchoStore } from "@/lib/use-echo-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "POCUS Clinical Calculator — EchoFlow" },
      {
        name: "description",
        content:
          "Mobile point-of-care ultrasound calculator: enter patient demographics and choose Cardiac or Lung POCUS modules.",
      },
      { property: "og:title", content: "POCUS Clinical Calculator — EchoFlow" },
      {
        property: "og:description",
        content:
          "Cardiac POCUS views with M-mode & hemodynamics, plus Lung POCUS assessment. Educational reference only.",
      },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  const { data, set } = useEchoStore();
  const navigate = useNavigate();

  return (
    <ViewShell step={1}>
      <div className="px-5 pb-4">
        <div className="flex gap-2.5 rounded-xl bg-foreground p-3.5 text-background">
          <TriangleAlert className="size-5 shrink-0 text-accent" />
          <p className="text-[11px] leading-relaxed opacity-85">
            <span className="font-semibold uppercase tracking-wide opacity-100">
              Notice: educational & clinical reference only.
            </span>{" "}
            This application is not a secure medical platform. Any Protected Health Information
            (PHI) entered is done at the user's own risk.
          </p>
        </div>
      </div>

      <MeasureCard
        title="Patient Demographics"
        badge={
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-primary">
            auto-saved
          </span>
        }
      >
        <div className="mb-4 grid grid-cols-2 gap-4">
          <NumField label="MRN" value={data.mrn} onChange={(v) => set("mrn", v)} />
          <NumField label="Age" unit="yr" value={data.age} onChange={(v) => set("age", v)} />
          <div>
            <NumField
              label="Height"
              unit={data.heightUnit}
              value={data.heightCm}
              onChange={(v) => set("heightCm", v)}
            />
            <UnitToggle
              options={["cm", "in"] as const}
              value={data.heightUnit}
              onChange={(v) => set("heightUnit", v)}
            />
          </div>
          <div>
            <NumField
              label="Weight"
              unit={data.weightUnit}
              value={data.weightKg}
              onChange={(v) => set("weightKg", v)}
            />
            <UnitToggle
              options={["kg", "lbs"] as const}
              value={data.weightUnit}
              onChange={(v) => set("weightUnit", v)}
            />
          </div>
        </div>

        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Gender
          </span>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(["male", "female", "other"] as const).map((g) => (
              <button
                key={g}
                onClick={() => set("gender", g)}
                className={`rounded-lg border-2 py-2.5 font-display text-sm font-semibold capitalize ${
                  data.gender === g
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-foreground/10 text-muted-foreground"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </MeasureCard>

      <section className="mx-5 mb-5">
        <h2 className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Select Module
        </h2>
        <div className="grid gap-3">
          <button
            onClick={() => navigate({ to: "/plax" })}
            className="group flex items-start gap-4 rounded-2xl bg-card p-5 text-left shadow-sm outline-2 outline-transparent transition-all active:scale-[0.99] hover:outline-primary/40"
          >
            <div className="grid size-12 shrink-0 -skew-x-6 place-items-center rounded-xl bg-primary text-primary-foreground">
              <HeartPulse className="size-6 skew-x-6" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-base font-bold tracking-tight">
                Cardiac POCUS <span className="text-primary">→</span>
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                PLAX, PSAX, A4C & Subcostal IVC views with M-mode & hemodynamics calculation.
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate({ to: "/lung" })}
            className="group flex items-start gap-4 rounded-2xl bg-card p-5 text-left shadow-sm outline-2 outline-transparent transition-all active:scale-[0.99] hover:outline-accent/50"
          >
            <div className="grid size-12 shrink-0 -skew-x-6 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Wind className="size-6 skew-x-6" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-base font-bold tracking-tight">
                Lung POCUS{" "}
                <span className="ml-1 rounded-full bg-accent/15 px-2 py-0.5 align-middle text-[9px] font-bold uppercase tracking-widest text-accent">
                  Coming soon
                </span>
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                Anterior, lateral & posterior pulmonary zone assessment and scoring.
              </p>
            </div>
          </button>
        </div>
      </section>
    </ViewShell>
  );
}

function UnitToggle<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="mt-1.5 flex gap-1">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
            value === o ? "bg-primary/10 text-primary" : "text-muted-foreground"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
