"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export function CheckoutComplete() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"capturing" | "complete" | "error">("capturing");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    let cancelled = false;

    async function capture() {
      try {
        const response = await fetch("/api/paypal/capture-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ orderId: token })
        });

        if (!response.ok) {
          throw new Error("Capture failed");
        }

        if (!cancelled) {
          setStatus("complete");
        }
      } catch {
        if (!cancelled) {
          setStatus("error");
        }
      }
    }

    capture();

    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="checkout-status">
      {status === "capturing" ? (
        <>
          <h1>capturing order...</h1>
          <p>Hold tight while PayPal confirms the checkout.</p>
        </>
      ) : null}
      {status === "complete" ? (
        <>
          <h1>order captured</h1>
          <p>Payment is confirmed. Digital fulfillment can now be connected to this step.</p>
        </>
      ) : null}
      {status === "error" ? (
        <>
          <h1>checkout needs attention</h1>
          <p>The order could not be captured. Check PayPal env vars or the sandbox account.</p>
        </>
      ) : null}
      <Link className="command-button" href="/shop">
        Back to shop
      </Link>
    </div>
  );
}
