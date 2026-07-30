import type { Metadata } from "next";
import { WindowFrame } from "@/components/WindowFrame";
import { featuredReleases, spotifyArtists } from "@/lib/site";

export const metadata: Metadata = {
  title: "Biography"
};

export default function BiographyPage() {
  const asoookhaPortrait =
    spotifyArtists.find((artist) => artist.identity === "asoookha")?.profileImage ??
    featuredReleases.find((release) => release.title === "Unity")?.coverArt;

  return (
    <div className="page-shell bio-shell">
      <WindowFrame title="biography">
        <article className="bio-page">
          <section className="bio-panel">
            <h3>asoookha</h3>
            <p>
              asoookha is a producer and beatmaker from Australia, built around sample-based
              sounds, vaporwave texture, jazzy loops, hiphop, sets, customs, leases, and digital
              kits.
            </p>
            <p>
              This is the main artist identity for the archive: the releases, Bandcamp route,
              SoundCloud material, Patreon products, and physical media path all orbit here.
            </p>
          </section>

          <figure className="bio-portrait">
            <img alt="asoookha profile image" src={asoookhaPortrait} />
          </figure>

          <section className="bio-panel bio-panel-faketo">
            <h3>faketo</h3>
            <p>
              faketo is the connected second identity, another room inside the same Faketo Inc
              world rather than a separate story.
            </p>
            <p>
              The faketo side holds its own releases and the Faketo Files thread, while pointing
              back to asoookha through the shared catalog, radio notes, and label context.
            </p>
          </section>
        </article>
      </WindowFrame>
    </div>
  );
}
