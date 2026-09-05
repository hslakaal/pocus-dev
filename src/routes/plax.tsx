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

const plax_images = ["/images/plax/plax.gif", "/images/plax/plax labelled.png"];

export const Route = createFileRoute("/plax")({
  head: () => ({
    meta: [
      { title: "PLAX View — EchoFlow" },
      {
        name: "description",
        content: "Enter M-mode parasternal long axis measurements: LVIDs, LVIDd, IVSd and LVPWt.",
      },
      { property: "og:title", content: "PLAX View — EchoFlow" },
      {
        property: "og:description",
        content: "M-mode parasternal long axis entry for LVIDs, LVIDd, IVSd and LVPWt.",
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
      <MeasureCard title="PLAX · Parasternal Long Axis">
        <ViewImage label="PLAX view" images={plax_images} />
        <div className="grid grid-cols-2 gap-4">
          <NumField label="LVIDd" unit="cm" value={data.lvedd} onChange={(v) => set("lvedd", v)} />
          <NumField label="LVIDs" unit="cm" value={data.lvesd} onChange={(v) => set("lvesd", v)} />
          <NumField label="IVSd" unit="cm" value={data.ivsd} onChange={(v) => set("ivsd", v)} />
          <NumField label="LVPWt" unit="cm" value={data.pwd} onChange={(v) => set("pwd", v)} />
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
          <p className="leading-relaxed">Probe position</p>
          <div className="space-y-3 text-xs text-muted-foreground">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Parasternal Long Axis (PLAX)
            </h3>

            <div>
              <p className="font-medium text-foreground">Probe position:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>3rd to 4th intercostal space</li>
                <li>Probe points to right shoulder</li>
              </ul>
            </div>

            <p className="leading-relaxed">Allows visualization of LA, LV, MV, AV as well as RA.</p>

            <p className="leading-relaxed">
              Useful for measuring{" "}
              <a
                href="https://www.ncbi.nlm.nih.gov/books/NBK459131/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
              >
                EF using Teichholz formula
              </a>
              , LVOT diameter, aortic root diameter, posterior wall thickness.
            </p>

            <div className="space-y-1.5 border-t border-border/40 pt-2">
              <p className="font-medium text-foreground">Normal ranges, male/female:</p>
              <ul className="list-disc space-y-1 pl-5 font-mono text-[11px]">
                <li>LVIDd 4.2–5.8 cm / 3.8–5.2 cm</li>
                <li>LVIDs 2.5–4.0 cm / 2.2–3.5 cm</li>
                <li>LVPWt 0.6–1.0 cm</li>
                <li>LVOT 1.8–2.4 cm</li>
              </ul>
            </div>

            <p className="pt-1 text-[11px]">
              See:{" "}
              <a
                href="https://onlinejase.com/article/S0894-7317(14)00745-7/fulltext"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
              >
                ASE cardiac chamber recommendations
              </a>
            </p>
          </div>
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
