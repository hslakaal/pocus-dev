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

const a4c_images = [
  "/images/a4c/a4c.png",
  "/images/a4c/tapsecursor.png",
  "/images/a4c/tapsemeasurement.png",
  "/images/a4c/a5c diagram.png",
  "/images/a4c/a5c vti.png",
  "/images/a4c/vtitracing.png",
];

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
        <ViewImage label="A4C view" images={a4c_images} />
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
        <CollapsibleInfo title="Apical 4 Chamber (A4C)">
          <div className="space-y-3 text-xs text-muted-foreground">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Apical Four Chamber View
            </h3>

            <div>
              <p className="font-medium text-foreground">Probe position:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Place the probe at the apex (4-6th ICS, lateral chest wall)</li>
                <li>Probe marker at 3 o'clock</li>
                <li>Tilt the probe up to get the 5 chamber view</li>
              </ul>
            </div>

            <p className="leading-relaxed">
              Allows visualization of the four chambers &{" "}
              <a
                href="https://www.pocus101.com/measuring-cardiac-output-with-echocardiography-made-easy/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
              >
                cardiac output measurements
              </a>
            </p>
          </div>
          <div className="space-y-1.5 border-t border-border/40 pt-2">
            <p className="font-medium text-foreground">Measurements:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                TAPSE (Tricuspid Annular Plane Systolic Excursion)
                <ul className="mt-1 list-[circle] space-y-0.5 pl-4 text-muted-foreground">
                  <li>Place M-mode cursor through the lateral tricuspid annulus</li>
                </ul>
              </li>
              <li>
                LVOT VTI (Velocity Time Integral)
                <ul className="mt-1 list-[circle] space-y-0.5 pl-4 text-muted-foreground">
                  <li>
                    In A5C, place PW Doppler sample volume in the LVOT (just proximal to aortic
                    valve) and trace the envelope as shown above
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="space-y-1.5 border-t border-border/40 pt-2">
            <p className="font-medium text-foreground">Normal ranges:</p>
            <ul className="list-disc space-y-1 pl-5 font-mono text-[11px]">
              <li>TAPSE ≥ 17 mm (&gt; 1.7 cm)</li>
              <li>LVOT VTI 18–22 cm</li>
              <li> Fluid responsive if ≥ 10% to 15% increase in LVOT VTI</li>
            </ul>
          </div>

          <div className="space-y-1.5 border-t border-border/40 pt-2">
            <p className="font-medium text-foreground">Most bang-for-buck view, able to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                Obtain cardiac output (via VTI)
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                  CO = HR × SV <br />= HR × (0.25 × π × LVOT diameter² × LVOT VTI)
                </p>
              </li>
              <li>Qualtitative assessment of biventricular function</li>
              <li>Look for regurgitation and stenosis</li>
            </ul>
          </div>
        </CollapsibleInfo>
      </MeasureCard>
    </ViewShell>
  );
}
