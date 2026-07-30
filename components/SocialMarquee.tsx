"use client";

import { usePathname } from "next/navigation";

type SocialLogo = {
  label: string;
  href: string;
  icon: string;
};

const asoookhaLogos: SocialLogo[] = [
  {
    label: "asoookha on Spotify",
    href: "https://open.spotify.com/artist/5d1n0kBkkvnk1r5CnaWOWe",
    icon: "https://cdn.simpleicons.org/spotify/1DB954"
  },
  {
    label: "asoookha on SoundCloud",
    href: "https://soundcloud.com/asoookha",
    icon: "https://cdn.simpleicons.org/soundcloud/FF5500"
  }
];

const generalLogos: SocialLogo[] = [
  {
    label: "asoookha on Bandcamp",
    href: "https://asoookha.bandcamp.com/",
    icon: "https://cdn.simpleicons.org/bandcamp/629AA9"
  },
  {
    label: "asoookha on YouTube",
    href: "https://www.youtube.com/channel/UCCdtu5PnGQsssiwJVdrG7Zw",
    icon: "https://cdn.simpleicons.org/youtube/FF0000"
  },
  {
    label: "asoookha on X",
    href: "https://twitter.com/asoookha",
    icon: "https://cdn.simpleicons.org/x/E4E7D2"
  },
  {
    label: "asoookha on Patreon",
    href: "https://www.patreon.com/c/asoookha",
    icon: "https://cdn.simpleicons.org/patreon/FF424D"
  },
  {
    label: "asoookha on elasticStage",
    href: "https://elasticstage.com/asoookha",
    icon: "https://www.google.com/s2/favicons?domain=elasticstage.com&sz=64"
  }
];

const faketoLogos: SocialLogo[] = [
  {
    label: "faketo on Spotify",
    href: "https://open.spotify.com/artist/0aOATjHZnwuKxdHRcgRptR",
    icon: "https://cdn.simpleicons.org/spotify/1DB954"
  },
  {
    label: "faketo on SoundCloud",
    href: "https://soundcloud.com/faketo",
    icon: "https://cdn.simpleicons.org/soundcloud/FF5500"
  }
];

export function SocialMarquee() {
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  return (
    <section className="social-logo-shell" aria-label="Social links">
      <div className="social-logo-window">
        <div className="social-logo-track">
          <LogoGroup className="is-left" links={asoookhaLogos} />
          <LogoGroup className="is-center" links={generalLogos} />
          <LogoGroup className="is-right" links={faketoLogos} />
        </div>
      </div>
    </section>
  );
}

function LogoGroup({ className, links }: { className: string; links: SocialLogo[] }) {
  return (
    <div className={`social-logo-group ${className}`}>
      {links.map((link) => (
        <a aria-label={link.label} href={link.href} key={link.href} rel="noreferrer" target="_blank">
          <img alt="" src={link.icon} />
        </a>
      ))}
    </div>
  );
}
