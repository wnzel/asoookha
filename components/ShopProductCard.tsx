"use client";

import { useState } from "react";
import { formatPrice, type ShopProduct } from "@/lib/site";

type ShopProductCardProps = {
  product: ShopProduct;
};

export function ShopProductCard({ product }: ShopProductCardProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function startCheckout() {
    if (product.checkout !== "paypal") {
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId: product.id })
      });

      if (!response.ok) {
        throw new Error("Checkout failed");
      }

      const data = (await response.json()) as { approveUrl?: string };

      if (!data.approveUrl) {
        throw new Error("Missing approval URL");
      }

      window.location.href = data.approveUrl;
    } catch {
      setStatus("error");
    }
  }

  const body = (
    <>
      <img alt={`${product.title} artwork`} src={product.image} />
      <div className="shop-card-body">
        <h2>{product.title}</h2>
        {product.price ? <strong>{formatPrice(product.price.value)}</strong> : null}
        {status === "error" ? (
          <span className="inline-error">
            PayPal is not configured yet. Add env vars, then retry in sandbox.
          </span>
        ) : null}
      </div>
    </>
  );

  if (product.checkout === "external" && product.href) {
    return (
      <a className="shop-card" href={product.href} rel="noreferrer" target="_blank">
        {body}
      </a>
    );
  }

  return (
    <button
      className="shop-card"
      disabled={status === "loading"}
      onClick={startCheckout}
      type="button"
    >
      {body}
    </button>
  );
}
