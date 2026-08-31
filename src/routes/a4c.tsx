import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  MeasureCard,
  NextButton,
  NumField,
  ViewImage,
  ViewShell,
} from "@/components/echo/ViewShell";
import { useEchoStore } from "@/lib/use-echo-store";

export const Route = createFileRoute("/a4c")({
  head: () => ({
    meta: [
      { title: "A4C View — EchoFlow" },
      {
        name: "description",
        content: "Enter TAPSE, LVOT diameter, LVOT VTI and heart rate from the apical 4-chamber view.",
      },
      { property: "og:title", content: "A4C View — EchoFlow" },
      {
        property: "og:description",
        content: "Apical 4-chamber entry for TAPSE, LVOT diameter, LVOT VTI and heart rate.",
      },
    ],
  }),
  component: A4c,
});

function A4c() {
  const { data, set } = useEchoStore();
  const navigate = useNavigate();

  return (
    <ViewShell step={4}>
      <MeasureCard
        title="A4C · Apical 4-Chamber"
        badge={
          <span className="shrink-0 rounded-full bg-accent/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-accent">
            PW Doppler
          </span>
        }
      >
        <ViewImage label="A4C view" />
        <div className="grid grid-cols-2 gap-4">
          <NumField
            label="TAPSE"
            hint="M-mode"
            unit="mm"
            value={data.tapse}
            onChange={(v) => set("tapse", v)}
          />
          <NumField
            label="LVOT VTI"
            hint="PW"
            unit="cm"
            value={data.lvotVti}
            onChange={(v) => set("lvotVti", v)}
          />
          <NumField label="Heart rate" unit="bpm" value={data.hr} onChange={(v) => set("hr", v)} />
        </div>
        <NextButton label="NEXT VIEW" onClick={() => navigate({ to: "/ivc" })} />
      </MeasureCard>
    </ViewShell>
  );
}
