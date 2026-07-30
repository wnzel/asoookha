import type { Metadata } from "next";
import { ShopBrowser } from "@/components/ShopBrowser";
import { WindowFrame } from "@/components/WindowFrame";
import { shopProducts } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop"
};

export default function ShopPage() {
  return (
    <div className="page-shell">
      <WindowFrame title="shop">
        <ShopBrowser products={shopProducts} />
      </WindowFrame>
    </div>
  );
}
