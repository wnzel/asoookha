import {
  BadgeDollarSign,
  Disc3,
  ExternalLink,
  Music2,
  PlaySquare,
  Radio,
  ShoppingBag
} from "lucide-react";
import { socialLinks, spotifyArtists } from "@/lib/site";
import { WindowFrame } from "@/components/WindowFrame";

const iconMap = {
  music: Music2,
  shop: Disc3,
  video: PlaySquare,
  social: Radio,
  support: BadgeDollarSign,
  physical: ShoppingBag
};

export function SocialCorner() {
  return (
    <aside className="social-corner">
      <WindowFrame title="socials">
        <div className="artist-stats">
          {spotifyArtists.map((artist) => (
            <div className="stat-chip" key={artist.spotifyArtistId}>
              <img alt={`${artist.identity} profile`} src={artist.profileImage} />
              <div>
                <strong>{artist.identity}</strong>
              </div>
            </div>
          ))}
        </div>
        <div className="social-grid">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.kind as keyof typeof iconMap] ?? ExternalLink;

            return (
              <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
                <Icon aria-hidden="true" size={17} />
                <span>{link.shortLabel}</span>
              </a>
            );
          })}
        </div>
      </WindowFrame>
    </aside>
  );
}
