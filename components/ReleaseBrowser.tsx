"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ArtistIdentity, Release } from "@/lib/site";

type ReleaseBrowserProps = {
  releases: Release[];
};

type FormatFilter = "all" | "single" | "album";

const filters: Array<ArtistIdentity | "all"> = ["all", "asoookha", "faketo"];

const formatOptions: Array<{ value: FormatFilter; label: string }> = [
  { value: "all", label: "view all" },
  { value: "single", label: "singles" },
  { value: "album", label: "albums / eps" }
];

const formatOf = (release: Release): FormatFilter =>
  release.type.toUpperCase() === "SINGLE" ? "single" : "album";

export function ReleaseBrowser({ releases }: ReleaseBrowserProps) {
  const [filter, setFilter] = useState<ArtistIdentity | "all">("all");
  const [format, setFormat] = useState<FormatFilter>("all");

  const filteredReleases = useMemo(
    () =>
      releases.filter(
        (release) =>
          (filter === "all" || release.identity === filter) &&
          (format === "all" || formatOf(release) === format)
      ),
    [filter, format, releases]
  );

  return (
    <div className="release-browser">
      <div className="browser-toolbar">
        <div className="segmented-control" role="tablist" aria-label="Filter music identity">
          {filters.map((item) => (
            <button
              aria-selected={filter === item}
              className={filter === item ? "active" : ""}
              key={item}
              onClick={() => setFilter(item)}
              role="tab"
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="browser-filters">
          <span className="browser-count">
            {filteredReleases.length} / {releases.length}
          </span>
          <div className="shop-filter">
            <select
              aria-label="Filter releases by format"
              onChange={(event) => setFormat(event.target.value as FormatFilter)}
              value={format}
            >
              {formatOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" size={16} />
          </div>
        </div>
      </div>

      <div className="release-grid">
        {filteredReleases.map((release) => (
          <a
            className="release-card"
            href={release.spotifyUrl}
            key={`${release.identity}-${release.spotifyAlbumId}`}
            rel="noreferrer"
            target="_blank"
          >
            <img alt={`${release.title} cover`} src={release.coverArt} />
            <div className="release-card-body">
              <div className="release-meta">
                <span>{release.identity}</span>
                <span>{release.type.toLowerCase()}</span>
              </div>
              <h2>{release.title}</h2>
              <p>
                {new Date(`${release.date}T00:00:00`).getFullYear()} / {release.trackCount}{" "}
                tracks
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
