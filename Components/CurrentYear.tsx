"use client";

import { useEffect, useState } from "react";

export default function CurrentYear({ fallback = 2026 }: { fallback?: number }) {
  const [year, setYear] = useState(fallback);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <>{year}</>;
}

