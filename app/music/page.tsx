import type { Metadata } from "next";
import { ReleaseBrowser } from "@/components/ReleaseBrowser";
import { WindowFrame } from "@/components/WindowFrame";
import { releases } from "@/lib/site";

export const metadata: Metadata = {
  title: "Music"
};

export default function MusicPage() {
  return (
    <div className="page-shell">
      <WindowFrame title="music archive">
        <ReleaseBrowser releases={releases} />
      </WindowFrame>
    </div>
  );
}
