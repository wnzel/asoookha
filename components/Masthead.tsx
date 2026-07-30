"use client";

import { usePathname } from "next/navigation";
import { siteMeta, featuredReleases } from "@/lib/site";
import { TopNav } from "@/components/TopNav";

export function Masthead() {
  const pathname = usePathname();
  const showIdentityRail = pathname === "/";

  return (
    <header className={showIdentityRail ? "masthead" : "masthead masthead--no-rail"}>
      <video
        aria-label="Temporary skate footage for Faketo Inc masthead"
        autoPlay
        className="masthead-video"
        loop
        muted
        playsInline
        poster={featuredReleases[0]?.coverArt}
        src={siteMeta.mastheadVideo}
      />
      <div className="masthead-fallback" aria-hidden="true">
        {featuredReleases.map((release) => (
          <img alt="" key={release.spotifyAlbumId} src={release.coverArt} />
        ))}
      </div>
      <div className="masthead-overlay" />
      <div className="masthead-scanline" />
      <div className="masthead-inner">
        <h1>Faketo Inc</h1>
        <TopNav />
      </div>
      {showIdentityRail ? (
        <div className="masthead-identity-rail" aria-label="Artist identity split">
          <span>asoookha</span>
          <span>faketo</span>
        </div>
      ) : null}
    </header>
  );
}
