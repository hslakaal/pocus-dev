import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  MeasureCard,
  NextButton,
  NumField,
  ViewImage,
  ViewShell,
} from "@/components/echo/ViewShell";
import { useEchoStore } from "@/lib/use-echo-store";
import plaxImg from "@/assets/view-plax.jpg";

export const Route = createFileRoute("/plax")({
  head: () => ({
    meta: [
      { title: "PLAX View — EchoFlow" },
      {
        name: "description",
        content: "Enter M-mode parasternal long axis measurements: LVEDD, LVESD, IVSd and PWd.",
      },
      { property: "og:title", content: "PLAX View — EchoFlow" },
      {
        property: "og:description",
        content: "M-mode parasternal long axis entry for LVEDD, LVESD, IVSd and PWd.",
      },
    ],
  }),
  component: Plax,
});

function Plax() {
  const { data, set } = useEchoStore();
  const navigate = useNavigate();

  return (
    <ViewShell step={2}>
      <MeasureCard
        title="PLAX · Parasternal Long Axis"
        badge={
          <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-primary">
            M-mode
          </span>
        }
      >
        <ViewImage src={plaxImg} alt="Parasternal long axis echocardiogram reference image" />
        <div className="grid grid-cols-2 gap-4">
          <NumField
            label="LVEDD"
            hint="diastolic"
            unit="cm"
            value={data.lvedd}
            onChange={(v) => set("lvedd", v)}
          />
          <NumField
            label="LVESD"
            hint="systolic"
            unit="cm"
            value={data.lvesd}
            onChange={(v) => set("lvesd", v)}
          />
          <NumField label="IVSd" unit="cm" value={data.ivsd} onChange={(v) => set("ivsd", v)} />
          <NumField label="PWd" unit="cm" value={data.pwd} onChange={(v) => set("pwd", v)} />
        </div>
        <NextButton label="NEXT VIEW" onClick={() => navigate({ to: "/psax" })} />
      </MeasureCard>
    </ViewShell>
  );
}
