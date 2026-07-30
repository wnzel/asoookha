"use client";

import { useState } from "react";
import { ExternalLink, Loader2, ShoppingBag } from "lucide-react";
import type { ShopProduct } from "@/lib/site";

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

  return (
    <article className="shop-card">
      <img alt={`${product.title} artwork`} src={product.image} />
      <div className="shop-card-body">
        <div className="release-meta">
          <span>{product.badge}</span>
          <span>{product.subtitle}</span>
        </div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        {product.price ? <strong>${product.price.value}</strong> : null}
        {product.checkout === "external" && product.href ? (
          <a className="command-button" href={product.href} rel="noreferrer" target="_blank">
            <ExternalLink aria-hidden="true" size={17} />
            Open
          </a>
        ) : (
          <button
            className="command-button"
            disabled={status === "loading"}
            onClick={startCheckout}
            type="button"
          >
            {status === "loading" ? (
              <Loader2 aria-hidden="true" className="spin" size={17} />
            ) : (
              <ShoppingBag aria-hidden="true" size={17} />
            )}
            PayPal
          </button>
        )}
        {status === "error" ? (
          <span className="inline-error">
            PayPal is not configured yet. Add env vars, then retry in sandbox.
          </span>
        ) : null}
      </div>
    </article>
  );
}
