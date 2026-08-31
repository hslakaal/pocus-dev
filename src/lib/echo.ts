export type Gender = "male" | "female" | "other";

export interface EchoData {
  // demographics
  heightCm: string;
  heightUnit: "cm" | "in";
  weightKg: string;
  weightUnit: "kg" | "lbs";
  age: string;
  gender: Gender | "";
  mrn: string;
  // PLAX (cm)
  lvedd: string;
  ivsd: string;
  pwd: string;
  lvesd: string;
  // PSAX (cm)
  psaxDiastole: string;
  psaxSystole: string;
  // A4C
  tapse: string; // mm
  lvotDiameter: string; // cm
  lvotVti: string; // cm
  hr: string; // bpm
  // Subcostal IVC (cm)
  ivcMax: string;
  ivcMin: string;
}

export const emptyEchoData: EchoData = {
  heightCm: "",
  heightUnit: "cm",
  weightKg: "",
  weightUnit: "kg",
  age: "",
  gender: "",
  mrn: "",
  lvedd: "",
  ivsd: "",
  pwd: "",
  lvesd: "",
  psaxDiastole: "",
  psaxSystole: "",
  tapse: "",
  lvotDiameter: "",
  lvotVti: "",
  hr: "",
  ivcMax: "",
  ivcMin: "",
};

export const STORAGE_KEY = "echoflow.session.v1";

const num = (v: string): number | null => {
  if (v === null || v === undefined) return null;
  const t = String(v).trim();
  if (!t) return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
};

export interface Results {
  heightCm: number | null;
  weightKg: number | null;
  bsa: number | null;
  ef: number | null;
  fs: number | null;
  psaxFs: number | null;
  lvotArea: number | null;
  sv: number | null;
  co: number | null;
  ci: number | null;
  ivcCi: number | null;
  rap: number | null;
  rapLabel: string | null;
  tapse: number | null;
}

export function computeResults(d: EchoData): Results {
  const rawH = num(d.heightCm);
  const rawW = num(d.weightKg);
  const heightCm = rawH === null ? null : d.heightUnit === "in" ? rawH * 2.54 : rawH;
  const weightKg = rawW === null ? null : d.weightUnit === "lbs" ? rawW * 0.453592 : rawW;

  const bsa =
    heightCm !== null && weightKg !== null && heightCm > 0 && weightKg > 0
      ? Math.sqrt((heightCm * weightKg) / 3600)
      : null;

  const lvedd = num(d.lvedd);
  const lvesd = num(d.lvesd);

  // Teichholz: V = 7 * D^3 / (2.4 + D)  (D in cm)
  const teich = (dm: number) => (7 * dm ** 3) / (2.4 + dm);
  let ef: number | null = null;
  if (lvedd && lvesd && lvedd > 0 && lvesd > 0) {
    const edv = teich(lvedd);
    const esv = teich(lvesd);
    ef = edv > 0 ? ((edv - esv) / edv) * 100 : null;
  }

  const fs = lvedd && lvesd && lvedd > 0 ? ((lvedd - lvesd) / lvedd) * 100 : null;

  const pd = num(d.psaxDiastole);
  const ps = num(d.psaxSystole);
  const psaxFs = pd && ps && pd > 0 ? ((pd - ps) / pd) * 100 : null;

  const lvotD = num(d.lvotDiameter);
  const vti = num(d.lvotVti);
  const hr = num(d.hr);
  const lvotArea = lvotD && lvotD > 0 ? Math.PI * (lvotD / 2) ** 2 : null;
  const sv = lvotArea !== null && vti !== null ? lvotArea * vti : null;
  const co = sv !== null && hr !== null ? (sv * hr) / 1000 : null;
  const ci = co !== null && bsa !== null && bsa > 0 ? co / bsa : null;

  const ivcMax = num(d.ivcMax);
  const ivcMin = num(d.ivcMin);
  const ivcCi =
    ivcMax !== null && ivcMin !== null && ivcMax > 0 ? ((ivcMax - ivcMin) / ivcMax) * 100 : null;

  let rap: number | null = null;
  let rapLabel: string | null = null;
  if (ivcCi !== null && ivcMax !== null) {
    const smallOrNormal = ivcMax <= 2.1;
    if (smallOrNormal && ivcCi > 50) {
      rap = 3;
      rapLabel = "normal";
    } else if (!smallOrNormal && ivcCi < 50) {
      rap = 15;
      rapLabel = "elevated";
    } else {
      rap = 8;
      rapLabel = "intermediate";
    }
  }

  return {
    heightCm,
    weightKg,
    bsa,
    ef,
    fs,
    psaxFs,
    lvotArea,
    sv,
    co,
    ci,
    ivcCi,
    rap,
    rapLabel,
    tapse: num(d.tapse),
  };
}

export const fmt = (v: number | null, digits = 1, unit = "") =>
  v === null || !Number.isFinite(v) ? "—" : `${v.toFixed(digits)}${unit ? ` ${unit}` : ""}`;

export function buildReportText(d: EchoData, r: Results): string {
  const lines: string[] = [];
  lines.push("EchoFlow — POCUS / Echo Summary");
  lines.push("(Educational reference only — not a medical record)");
  lines.push("");
  lines.push("PATIENT");
  lines.push(`MRN: ${d.mrn || "—"}`);
  lines.push(`Age: ${d.age || "—"}   Gender: ${d.gender || "—"}`);
  lines.push(`Height: ${fmt(r.heightCm, 0, "cm")}   Weight: ${fmt(r.weightKg, 1, "kg")}`);
  lines.push("");
  lines.push("MEASUREMENTS");
  lines.push(`PLAX LVEDD: ${d.lvedd || "—"} cm   LVESD: ${d.lvesd || "—"} cm`);
  lines.push(`PLAX IVSd: ${d.ivsd || "—"} cm   PWd: ${d.pwd || "—"} cm`);
  lines.push(`PSAX diastole: ${d.psaxDiastole || "—"} cm   systole: ${d.psaxSystole || "—"} cm`);
  lines.push(`TAPSE: ${d.tapse || "—"} mm`);
  lines.push(`LVOT diameter: ${d.lvotDiameter || "—"} cm   LVOT VTI: ${d.lvotVti || "—"} cm`);
  lines.push(`Heart rate: ${d.hr || "—"} bpm`);
  lines.push(`IVC max: ${d.ivcMax || "—"} cm   IVC min: ${d.ivcMin || "—"} cm`);
  lines.push("");
  lines.push("CALCULATED");
  lines.push(`BSA (Mosteller): ${fmt(r.bsa, 2, "m2")}`);
  lines.push(`Ejection fraction (Teichholz): ${fmt(r.ef, 0, "%")}`);
  lines.push(`Fractional shortening: ${fmt(r.fs, 0, "%")}`);
  lines.push(`PSAX fractional shortening: ${fmt(r.psaxFs, 0, "%")}`);
  lines.push(`LVOT area: ${fmt(r.lvotArea, 2, "cm2")}`);
  lines.push(`Stroke volume: ${fmt(r.sv, 0, "mL")}`);
  lines.push(`Cardiac output: ${fmt(r.co, 1, "L/min")}`);
  lines.push(`Cardiac index: ${fmt(r.ci, 1, "L/min/m2")}`);
  lines.push(`IVC collapsibility: ${fmt(r.ivcCi, 0, "%")}`);
  lines.push(
    `Estimated RAP: ${r.rap === null ? "—" : `${r.rap} mmHg (${r.rapLabel})`}`,
  );
  lines.push(`TAPSE: ${fmt(r.tapse, 0, "mm")} (normal >= 17 mm)`);
  return lines.join("\n");
}
