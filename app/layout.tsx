import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Masthead } from "@/components/Masthead";
import { SocialMarquee } from "@/components/SocialMarquee";
import { siteMeta } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteMeta.title,
    template: `%s / ${siteMeta.title}`
  },
  description: siteMeta.description,
  icons: {
    icon: "/favicon.svg"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Masthead />
        <SocialMarquee />
        <main>{children}</main>
      </body>
    </html>
  );
}
