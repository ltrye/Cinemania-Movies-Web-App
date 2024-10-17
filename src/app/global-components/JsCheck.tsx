"use client";

import { useEffect, useState, useRef } from "react";

export default function JsCheck() {
  const [isMount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);
  return (
    <div className="js-check">{isMount ? "Interactive" : "Loading js..."}</div>
  );
}
