import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Wind } from "lucide-react";
import { MeasureCard, ViewShell } from "@/components/echo/ViewShell";

export const Route = createFileRoute("/lung")({
  head: () => ({
    meta: [
      { title: "Lung POCUS — EchoFlow" },
      {
        name: "description",
        content: "Lung POCUS module: anterior, lateral and posterior pulmonary zone assessment.",
      },
      { property: "og:title", content: "Lung POCUS — EchoFlow" },
      {
        property: "og:description",
        content: "Lung POCUS module: anterior, lateral and posterior pulmonary zone assessment.",
      },
    ],
  }),
  component: Lung,
});

function Lung() {
  const navigate = useNavigate();

  return (
    <ViewShell step={1}>
      <MeasureCard
        title="Lung POCUS"
        badge={
          <span className="shrink-0 rounded-full bg-accent/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-accent">
            Coming soon
          </span>
        }
      >
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <div className="grid size-14 -skew-x-6 place-items-center rounded-2xl bg-accent text-accent-foreground">
            <Wind className="size-7 skew-x-6" />
          </div>
          <p className="font-display text-lg font-bold tracking-tight">Module in development</p>
          <p className="max-w-[26ch] text-[11px] leading-relaxed text-muted-foreground">
            Anterior, lateral & posterior pulmonary zone assessment and scoring will be available
            here soon. Your demographics have been saved.
          </p>
        </div>
        <button
          onClick={() => navigate({ to: "/" })}
          className="mt-3 w-full rounded-xl border-2 border-foreground/10 py-3.5 font-display text-sm font-bold tracking-wide text-foreground active:scale-[0.99]"
        >
          ← Back to modules
        </button>
      </MeasureCard>
    </ViewShell>
  );
}
