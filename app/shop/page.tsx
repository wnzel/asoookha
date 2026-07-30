import type { Metadata } from "next";
import { ShopProductCard } from "@/components/ShopProductCard";
import { WindowFrame } from "@/components/WindowFrame";
import { shopProducts } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop"
};

export default function ShopPage() {
  return (
    <div className="page-shell">
      <WindowFrame title="shop">
        <div className="shop-grid">
          {shopProducts.map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>
      </WindowFrame>
    </div>
  );
}
