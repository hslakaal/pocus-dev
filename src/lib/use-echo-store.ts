import { useCallback, useEffect, useState } from "react";
import { emptyEchoData, STORAGE_KEY, type EchoData } from "./echo";

function read(): EchoData {
  if (typeof window === "undefined") return emptyEchoData;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyEchoData;
    return { ...emptyEchoData, ...(JSON.parse(raw) as Partial<EchoData>) };
  } catch {
    return emptyEchoData;
  }
}

/** Locally cached measurement session (localStorage). */
export function useEchoStore() {
  const [data, setData] = useState<EchoData>(emptyEchoData);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setData(read());
    setHydrated(true);
  }, []);

  const set = useCallback(
    <K extends keyof EchoData>(key: K, value: EchoData[K]) => {
      setData((prev) => {
        const next = { ...prev, [key]: value };
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* storage unavailable */
        }
        return next;
      });
    },
    [],
  );

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
    setData(emptyEchoData);
  }, []);

  return { data, set, reset, hydrated };
}
