import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { RotatingPanel } from "@/components/RotatingPanel";
import { WindowFrame } from "@/components/WindowFrame";
import { featuredReleases, friends, merchHighlights, tools } from "@/lib/site";

export default function HomePage() {
  return (
    <div className="page-grid home-layout">
      <aside className="merch-stack">
        <WindowFrame title="merch" actionHref="/shop">
          <ol className="merch-list">
            {merchHighlights.map((item) => {
              const copy = (
                <span className="merch-copy">
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </span>
              );

              return (
                <li key={item.title}>
                  {item.href.startsWith("/") ? (
                    <Link href={item.href}>{copy}</Link>
                  ) : (
                    <a href={item.href} rel="noreferrer" target="_blank">
                      {copy}
                      <ExternalLink aria-hidden="true" size={15} />
                    </a>
                  )}
                </li>
              );
            })}
          </ol>
        </WindowFrame>
      </aside>

      <div className="center-stack home-main-stack">
        <RotatingPanel />
        <WindowFrame title="featured audio" actionHref="/music">
          <div className="featured-strip">
            {featuredReleases.map((release) => (
              <a href={release.spotifyUrl} key={release.spotifyAlbumId} rel="noreferrer" target="_blank">
                <img alt={`${release.title} cover`} src={release.coverArt} />
                <span>{release.title}</span>
              </a>
            ))}
          </div>
        </WindowFrame>
      </div>

      <aside className="right-stack">
        <WindowFrame title="tools">
          <div className="tools-list">
            {tools.map((tool) => (
              <a href={tool.href} key={tool.name} rel="noreferrer" target="_blank">
                <img alt={`${tool.name} logo`} src={tool.logo} />
                <span className="tool-copy">
                  <strong>{tool.name}</strong>
                  <small>{tool.role}</small>
                </span>
              </a>
            ))}
          </div>
        </WindowFrame>

        <WindowFrame title="friends">
          <div className="friends-list">
            {friends.map((friend) => (
              <a href={friend.href} key={friend.name} rel="noreferrer" target="_blank">
                <img alt={`${friend.name} portrait`} src={friend.image} />
                <span className="friend-copy">
                  <strong>{friend.name}</strong>
                  <small>{friend.blurb}</small>
                </span>
                <ExternalLink aria-hidden="true" size={15} />
              </a>
            ))}
          </div>
        </WindowFrame>
      </aside>
    </div>
  );
}
