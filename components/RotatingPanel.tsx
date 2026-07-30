"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { introPanels } from "@/lib/site";
import { WindowFrame } from "@/components/WindowFrame";

export function RotatingPanel() {
  const [index, setIndex] = useState(0);
  const panel = introPanels[index];

  function move(direction: -1 | 1) {
    setIndex((current) => (current + direction + introPanels.length) % introPanels.length);
  }

  return (
    <WindowFrame title={panel.title} className="intro-window" actionHref="/biography">
      <div className="rotating-panel">
        <button aria-label="Previous intro panel" onClick={() => move(-1)} type="button">
          <ArrowLeft aria-hidden="true" size={18} />
        </button>
        <article>
          <p>{panel.body}</p>
          <span>{panel.meta}</span>
        </article>
        <button aria-label="Next intro panel" onClick={() => move(1)} type="button">
          <ArrowRight aria-hidden="true" size={18} />
        </button>
      </div>
      <div className="panel-index">
        {introPanels.map((item, itemIndex) => (
          <span
            aria-label={item.title}
            className={itemIndex === index ? "active" : ""}
            key={item.title}
          />
        ))}
      </div>
    </WindowFrame>
  );
}
