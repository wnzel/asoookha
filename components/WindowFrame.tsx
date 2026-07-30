import type { ReactNode } from "react";
import Link from "next/link";

type WindowFrameProps = {
  title: string;
  children: ReactNode;
  className?: string;
  actionHref?: string;
  actionLabel?: string;
};

export function WindowFrame({
  title,
  children,
  className = "",
  actionHref,
  actionLabel = "view all"
}: WindowFrameProps) {
  const isExternalAction = actionHref?.startsWith("http");

  return (
    <section className={`window-frame ${className}`}>
      <div className="window-toolbar">
        <span className="window-dot" aria-hidden="true" />
        <div>
          <h2>{title}</h2>
        </div>
        {actionHref ? (
          isExternalAction ? (
            <a className="window-action" href={actionHref} rel="noreferrer" target="_blank">
              {actionLabel}
            </a>
          ) : (
            <Link className="window-action" href={actionHref}>
              {actionLabel}
            </Link>
          )
        ) : null}
      </div>
      <div className="window-body">{children}</div>
    </section>
  );
}
