import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutComplete } from "@/components/CheckoutComplete";
import { WindowFrame } from "@/components/WindowFrame";

export const metadata: Metadata = {
  title: "Checkout"
};

export default function CheckoutCompletePage() {
  return (
    <div className="page-shell compact-shell">
      <WindowFrame title="paypal checkout">
        <Suspense fallback={<p>Loading checkout status...</p>}>
          <CheckoutComplete />
        </Suspense>
      </WindowFrame>
    </div>
  );
}
