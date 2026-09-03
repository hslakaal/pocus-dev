import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  CollapsibleInfo,
  MeasureCard,
  NextButton,
  NumField,
  ViewImage,
  ViewShell,
} from "@/components/echo/ViewShell";
import { useEchoStore } from "@/lib/use-echo-store";

// Defining array

const plax_images = ["public/images/plax/PLAX.gif", "public/images/plax/plax labelled.png"];

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
      >
        <ViewImage label="PLAX view" images={plax_images} />
        <div className="grid grid-cols-2 gap-4">
          <NumField label="LVEDD" unit="cm" value={data.lvedd} onChange={(v) => set("lvedd", v)} />
          <NumField label="LVESD" unit="cm" value={data.lvesd} onChange={(v) => set("lvesd", v)} />
          <NumField label="IVSd" unit="cm" value={data.ivsd} onChange={(v) => set("ivsd", v)} />
          <NumField label="PWd" unit="cm" value={data.pwd} onChange={(v) => set("pwd", v)} />
          <NumField
            label="LVOT diameter"
            hint="inner edge"
            unit="cm"
            value={data.lvotDiameter}
            onChange={(v) => set("lvotDiameter", v)}
          />
        </div>
        <NextButton label="NEXT VIEW" onClick={() => navigate({ to: "/psax" })} />
        <CollapsibleInfo title="PLAX Acquisition & Reference Notes">
          <p className="leading-relaxed">TO BE EDITED</p>

          <div className="overflow-hidden rounded-lg border border-border bg-black">
            <img
              src="public/images/plax/PLAX.gif"
              alt="Reference measurement diagram"
              className="max-h-48 w-full object-contain"
            />
          </div>

          <ul className="list-disc space-y-1 pl-4 text-[11px]">
            <li>Measure LVEDD at peak of R-wave or onset of QRS.</li>
            <li>Measure LVESD at minimum cavity dimension or nadir of septal motion.</li>
          </ul>
        </CollapsibleInfo>
      </MeasureCard>
    </ViewShell>
  );
}
