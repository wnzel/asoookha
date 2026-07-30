import { NextResponse } from "next/server";
import { z } from "zod";
import { createPayPalOrder } from "@/lib/paypal";

const createOrderSchema = z.object({
  productId: z.string().min(1)
});

export async function POST(request: Request) {
  try {
    const payload = createOrderSchema.parse(await request.json());
    const origin = new URL(request.url).origin;
    const order = await createPayPalOrder(payload.productId, origin);
    const approveUrl = order.links?.find((link) => link.rel === "approve")?.href;

    if (!approveUrl) {
      return NextResponse.json({ error: "PayPal did not return an approval URL" }, { status: 502 });
    }

    return NextResponse.json({ orderId: order.id, approveUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create order";
    const status = message.includes("Missing PayPal credentials") ? 503 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
