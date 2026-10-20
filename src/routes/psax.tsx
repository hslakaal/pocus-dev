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

const psax_images = ["/images/psax/midpap.png", "/images/psax/cursorplacement.png", "/images/psax/mmode output.png", "/images/psax/basal.png"];


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
        <ViewImage label="PSAX view" images={psax_images} />
        <div className="grid grid-cols-2 gap-4">
          <NumField
            label="LVEDD"
            unit="cm"
            value={data.psaxDiastole}
            onChange={(v) => set("psaxDiastole", v)}
          />
          <NumField
            label="LVESD"
            unit="cm"
            value={data.psaxSystole}
            onChange={(v) => set("psaxSystole", v)}
          />
        </div>
        <NextButton label="NEXT VIEW" onClick={() => navigate({ to: "/a4c" })} />
        <CollapsibleInfo title="PSAX Acquisition & Reference Notes">
          <div className="space-y-3 text-xs text-muted-foreground">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Parasternal Long Axis (PLAX)
            </h3>

            <div>
              <p className="font-medium text-foreground">Probe position:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>From the PLAX position, rotate the probe 90 degrees clockwise</li>
                <li>Probe points to left shoulder</li>
                <li>Tilt the probe to get basal, mitral, mid-papillary & apical views</li>
              </ul>
            </div>

            <p className="leading-relaxed">
              Allows visualization of LV,RV, RVOT, Aortic valve,{" "}
              <a
                href="https://www.pocus101.com/the-d-sign-right-heart-strain-from-pressure-vs-volume-overload/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
              >
                "D-Sign"
              </a>
            </p>

            <div className="space-y-1.5 border-t border-border/40 pt-2">
              <p className="font-medium text-foreground">
                For novice echocardiographers, great qualitative view for:
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Global wall thickening</li>
                <li>Septal flattening (D-sign)</li>
                <li>Alternative site to obtain LVESD and LVEDD using M-Mode</li>
              </ul>
            </div>
          </div>


        </CollapsibleInfo>
      </MeasureCard>
    </ViewShell>
  );
}
