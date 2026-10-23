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

const ivc_images = [
  "/images/IVC/ivc.png",
  "/images/IVC/ivcdiameter.png"
  ]


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
        <ViewImage label="Subcostal IVC view" images={ivc_images} />
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

        <CollapsibleInfo title="Inferior Vena Cava (IVC)">
          <div className="space-y-3 text-xs text-muted-foreground">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Subcostal IVC View
            </h3>

            <div>
              <p className="font-medium text-foreground">Probe position:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Probe marker to head, scan through the liver</li>
                <li>
                  Once you see the IVC, tilt to see it draining into the RA to confirm it's the IVC
                  and not the aorta
                </li>
              </ul>
            </div>

            <p className="leading-relaxed">
              IVC measurement allows estimation of RAP (
              <a
                href="https://onlinejase.com/article/S0894-7317(25)00037-9/fulltext"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
              >
                ASE guidelines on Right Heart echocardiography
              </a>
              )
            </p>
          </div>

          <div className="space-y-1.5 border-t border-border/40 pt-2">
            <p className="font-medium text-foreground">Measurements:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Measure the IVC diameter 0.5-3cm away from the RA</li>
              <li>This should be just distal to the hepatic confluence</li>
              <li>Use M-Mode to find max/min with respiratory variation</li>
            </ul>
          </div>

          <div className="space-y-2 border-t border-border/40 pt-2">
            <p className="font-medium text-foreground">Normal ranges &amp; Estimated RAP:</p>{" "}
            <ul className="list-disc space-y-1 pl-5">
              <li>Not reliable in ventilated patients</li>
            </ul>
            <div className="overflow-hidden rounded-lg border border-border/60">
              <table className="w-full text-left font-mono text-[11px]">
                <thead className="border-b border-border/60 bg-muted/50 text-foreground">
                  <tr>
                    <th className="p-2 font-semibold">IVC Max</th>
                    <th className="p-2 font-semibold">Collapse</th>
                    <th className="p-2 font-semibold">Est. RAP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  <tr>
                    <td className="p-2">&le; 2.1 cm</td>
                    <td className="p-2">&gt; 50%</td>
                    <td className="p-2 text-foreground">3 mmHg (0–5)</td>
                  </tr>
                  <tr>
                    <td className="p-2">Indeterminate</td>
                    <td className="p-2">Indeterminate</td>
                    <td className="p-2 text-foreground">8 mmHg (5–10)</td>
                  </tr>
                  <tr>
                    <td className="p-2">&gt; 2.1 cm</td>
                    <td className="p-2">&lt; 50%</td>
                    <td className="p-2 text-foreground">15 mmHg (10–20)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CollapsibleInfo>
      </MeasureCard>
    </ViewShell>
  );
}
