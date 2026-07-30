import Link from "next/link";
import { FeaturedStrip } from "@/components/FeaturedStrip";
import { RotatingPanel } from "@/components/RotatingPanel";
import { WindowFrame } from "@/components/WindowFrame";
import { friends, merchHighlights, tools } from "@/lib/site";

export default function HomePage() {
  return (
    <div className="page-grid home-layout">
      <aside className="merch-stack">
        <WindowFrame title="merch" actionHref="/shop">
          <ol className="merch-list">
            {merchHighlights.map((item) => {
              const copy = (
                <>
                  <img alt={`${item.title} artwork`} className="merch-thumb" src={item.image} />
                  <span className="merch-copy">
                    <strong>{item.title}</strong>
                  </span>
                </>
              );

              return (
                <li key={item.title}>
                  {item.href.startsWith("/") ? (
                    <Link href={item.href}>{copy}</Link>
                  ) : (
                    <a href={item.href} rel="noreferrer" target="_blank">
                      {copy}
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
        <FeaturedStrip />
      </div>

      <aside className="right-stack">
        <WindowFrame title="tools">
          <div className="card-rows">
            {tools.map((tool) => (
              <div className="card-row" key={tool.name}>
                <img alt="" aria-hidden="true" className="card-row-thumb" src={tool.logo} />
                <strong>{tool.name}</strong>
              </div>
            ))}
          </div>
        </WindowFrame>

        <WindowFrame title="friends">
          <div className="card-rows">
            {friends.map((friend) => {
              const inner = (
                <>
                  {friend.image ? (
                    <img alt="" aria-hidden="true" className="card-row-thumb" src={friend.image} />
                  ) : (
                    <span aria-hidden="true" className="card-row-thumb is-empty" />
                  )}
                  <strong>{friend.name}</strong>
                </>
              );

              return friend.href ? (
                <a
                  className="card-row"
                  href={friend.href}
                  key={friend.name}
                  rel="noreferrer"
                  target="_blank"
                >
                  {inner}
                </a>
              ) : (
                <div className="card-row" key={friend.name}>
                  {inner}
                </div>
              );
            })}
          </div>
        </WindowFrame>
      </aside>
    </div>
  );
}
