import { NextResponse } from "next/server";
import { z } from "zod";
import { capturePayPalOrder } from "@/lib/paypal";

const captureOrderSchema = z.object({
  orderId: z.string().min(1)
});

export async function POST(request: Request) {
  try {
    const payload = captureOrderSchema.parse(await request.json());
    const order = await capturePayPalOrder(payload.orderId);

    return NextResponse.json({ order });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to capture order";
    const status = message.includes("Missing PayPal credentials") ? 503 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
