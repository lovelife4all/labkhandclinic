"use client";
import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register(`${base}/sw.js`).catch(() => { /* non-fatal */ });
    }
  }, []);
  return null;
}
