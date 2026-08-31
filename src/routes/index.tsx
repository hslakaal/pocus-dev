import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MeasureCard, NextButton, NumField, ViewShell } from "@/components/echo/ViewShell";
import { useEchoStore } from "@/lib/use-echo-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EchoFlow — POCUS Echo Calculator" },
      {
        name: "description",
        content:
          "Mobile point-of-care echo calculator: M-mode measurements by view with EF, stroke volume, cardiac index and IVC-based RAP.",
      },
      { property: "og:title", content: "EchoFlow — POCUS Echo Calculator" },
      {
        property: "og:description",
        content:
          "Step through PLAX, PSAX, A4C and subcostal IVC views and get EF, CO, CI and estimated right atrial pressure.",
      },
    ],
  }),
  component: Demographics,
});

function Demographics() {
  const { data, set } = useEchoStore();
  const navigate = useNavigate();

  return (
    <ViewShell step={1}>
      <div className="px-5 pb-4">
        <div className="flex gap-2.5 rounded-xl bg-foreground p-3.5 text-background">
          <div className="grid size-6 shrink-0 place-items-center rounded-full bg-accent font-display font-bold text-accent-foreground">
            !
          </div>
          <p className="text-[11px] leading-relaxed opacity-85">
            <span className="font-semibold uppercase tracking-wide opacity-100">
              Educational reference only.
            </span>{" "}
            This application is not a secure medical platform. Any PHI entered is done at the
            user's own risk.
          </p>
        </div>
      </div>

      <MeasureCard
        title="Demographics"
        badge={
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-primary">
            PLAX next
          </span>
        }
      >
        <div className="mb-4 grid grid-cols-2 gap-4">
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
          <NumField label="Age" unit="yr" value={data.age} onChange={(v) => set("age", v)} />
          <NumField label="MRN" value={data.mrn} onChange={(v) => set("mrn", v)} />
        </div>

        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Gender
          </span>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(["male", "female"] as const).map((g) => (
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

        <NextButton label="NEXT VIEW" onClick={() => navigate({ to: "/plax" })} />
      </MeasureCard>
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
