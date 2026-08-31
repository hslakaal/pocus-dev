import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  MeasureCard,
  NextButton,
  NumField,
  ViewImage,
  ViewShell,
} from "@/components/echo/ViewShell";
import { useEchoStore } from "@/lib/use-echo-store";

export const Route = createFileRoute("/psax")({
  head: () => ({
    meta: [
      { title: "PSAX View — EchoFlow" },
      {
        name: "description",
        content: "Enter parasternal short axis LV diastolic and systolic diameters by M-mode.",
      },
      { property: "og:title", content: "PSAX View — EchoFlow" },
      {
        property: "og:description",
        content: "Parasternal short axis LV diameter entry for fractional shortening.",
      },
    ],
  }),
  component: Psax,
});

function Psax() {
  const { data, set } = useEchoStore();
  const navigate = useNavigate();

  return (
    <ViewShell step={3}>
      <MeasureCard
        title="PSAX · Parasternal Short Axis"
        badge={
          <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-primary">
            M-mode
          </span>
        }
      >
        <ViewImage label="PSAX view" />
        <div className="grid grid-cols-2 gap-4">
          <NumField
            label="PSAX diastole"
            unit="cm"
            value={data.psaxDiastole}
            onChange={(v) => set("psaxDiastole", v)}
          />
          <NumField
            label="PSAX systole"
            unit="cm"
            value={data.psaxSystole}
            onChange={(v) => set("psaxSystole", v)}
          />
        </div>
        <NextButton label="NEXT VIEW" onClick={() => navigate({ to: "/a4c" })} />
      </MeasureCard>
    </ViewShell>
  );
}
