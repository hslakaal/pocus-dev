import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  MeasureCard,
  NextButton,
  NumField,
  ViewImage,
  ViewShell,
} from "@/components/echo/ViewShell";
import { useEchoStore } from "@/lib/use-echo-store";
import ivcImg from "@/assets/view-ivc.jpg";

export const Route = createFileRoute("/ivc")({
  head: () => ({
    meta: [
      { title: "Subcostal IVC View — EchoFlow" },
      {
        name: "description",
        content: "Measure maximum and minimum IVC diameter to derive collapsibility and RAP.",
      },
      { property: "og:title", content: "Subcostal IVC View — EchoFlow" },
      {
        property: "og:description",
        content: "Subcostal IVC diameters for collapsibility index and right atrial pressure.",
      },
    ],
  }),
  component: Ivc,
});

function Ivc() {
  const { data, set } = useEchoStore();
  const navigate = useNavigate();

  return (
    <ViewShell step={5}>
      <MeasureCard
        title="Subcostal · IVC"
        badge={
          <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-primary">
            M-mode
          </span>
        }
      >
        <ViewImage src={ivcImg} alt="Subcostal inferior vena cava ultrasound reference image" />
        <div className="grid grid-cols-2 gap-4">
          <NumField
            label="IVC max"
            hint="expiration"
            unit="cm"
            value={data.ivcMax}
            onChange={(v) => set("ivcMax", v)}
          />
          <NumField
            label="IVC min"
            hint="inspiration"
            unit="cm"
            value={data.ivcMin}
            onChange={(v) => set("ivcMin", v)}
          />
        </div>
        <NextButton label="GENERATE REPORT" onClick={() => navigate({ to: "/report" })} />
      </MeasureCard>
    </ViewShell>
  );
}
