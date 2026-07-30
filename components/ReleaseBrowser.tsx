"use client";

import { useMemo, useState } from "react";
import { Disc3, ExternalLink, ListMusic } from "lucide-react";
import type { ArtistIdentity, Release } from "@/lib/site";

type ReleaseBrowserProps = {
  releases: Release[];
};

const filters: Array<ArtistIdentity | "all"> = ["all", "asoookha", "faketo"];

export function ReleaseBrowser({ releases }: ReleaseBrowserProps) {
  const [filter, setFilter] = useState<ArtistIdentity | "all">("all");

  const filteredReleases = useMemo(
    () =>
      filter === "all"
        ? releases
        : releases.filter((release) => release.identity === filter),
    [filter, releases]
  );

  return (
    <div className="release-browser">
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

      <div className="release-grid">
        {filteredReleases.map((release) => (
          <article className="release-card" key={`${release.identity}-${release.spotifyAlbumId}`}>
            <a href={release.spotifyUrl} rel="noreferrer" target="_blank">
              <img alt={`${release.title} cover`} src={release.coverArt} />
            </a>
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
              <div className="release-actions">
                <a href={release.spotifyUrl} rel="noreferrer" target="_blank">
                  <Disc3 aria-hidden="true" size={16} />
                  Spotify
                </a>
                {release.alternateSpotifyAlbumIds ? (
                  <span title={release.alternateSpotifyAlbumIds[0]?.note}>
                    <ListMusic aria-hidden="true" size={16} />
                    alt id
                  </span>
                ) : null}
                <ExternalLink aria-hidden="true" size={15} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
