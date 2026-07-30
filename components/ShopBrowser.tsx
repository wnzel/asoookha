"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ShopProductCard } from "@/components/ShopProductCard";
import { shopCategories, type ShopCategory, type ShopProduct } from "@/lib/site";

type ShopBrowserProps = {
  products: ShopProduct[];
};

export function ShopBrowser({ products }: ShopBrowserProps) {
  const [category, setCategory] = useState<ShopCategory | "all">("all");

  const filteredProducts = useMemo(
    () =>
      category === "all"
        ? products
        : products.filter((product) => product.category === category),
    [category, products]
  );

  return (
    <div className="shop-browser">
      <div className="shop-toolbar">
        <div className="shop-filter">
          <select
            aria-label="Filter shop items"
            onChange={(event) => setCategory(event.target.value as ShopCategory | "all")}
            value={category}
          >
            {shopCategories.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden="true" size={16} />
        </div>
      </div>

      <div className="shop-grid">
        {filteredProducts.map((product) => (
          <ShopProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
