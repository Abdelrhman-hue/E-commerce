"use client";

import { useEffect, useState } from "react";

export default function Timer() {
  const [time, setTime] = useState(15 * 60);

  useEffect(() => {
    if (time <= 0) return;

    const timeout = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return <>{`Expires in ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}</>;
}
