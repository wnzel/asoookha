"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { featuredReleases } from "@/lib/site";
import { WindowFrame } from "@/components/WindowFrame";

// Mobile shows two covers at a time; desktop ignores the paging and lays out all of them.
const PER_PAGE = 2;

export function FeaturedStrip() {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(featuredReleases.length / PER_PAGE));

  function move(direction: -1 | 1) {
    setPage((current) => (current + direction + pageCount) % pageCount);
  }

  const trackStyle = {
    "--count": featuredReleases.length,
    "--pages": pageCount,
    "--page": page
  } as CSSProperties;

  return (
    <WindowFrame title="featured audio" actionHref="/music">
      <div className="featured-carousel">
        <button aria-label="Previous releases" onClick={() => move(-1)} type="button">
          <ArrowLeft aria-hidden="true" size={18} />
        </button>
        <div className="featured-viewport">
          <div className="featured-strip" style={trackStyle}>
            {featuredReleases.map((release) => (
              <a
                href={release.spotifyUrl}
                key={release.spotifyAlbumId}
                rel="noreferrer"
                target="_blank"
              >
                <img alt={`${release.title} cover`} src={release.coverArt} />
                <span>{release.title}</span>
              </a>
            ))}
          </div>
        </div>
        <button aria-label="Next releases" onClick={() => move(1)} type="button">
          <ArrowRight aria-hidden="true" size={18} />
        </button>
      </div>
    </WindowFrame>
  );
}
