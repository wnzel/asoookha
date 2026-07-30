import { shopProducts } from "@/lib/site";

const PAYPAL_BASE_URL =
  process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

export function getPayPalProduct(productId: string) {
  return shopProducts.find(
    (product) => product.id === productId && product.checkout === "paypal" && product.price
  );
}

async function getAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing PayPal credentials");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials",
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Unable to authenticate with PayPal");
  }

  const data = (await response.json()) as { access_token: string };
  return data.access_token;
}

export async function createPayPalOrder(productId: string, origin: string) {
  const product = getPayPalProduct(productId);

  if (!product?.price) {
    throw new Error("Unknown PayPal product");
  }

  const accessToken = await getAccessToken();
  const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: product.id,
          description: product.title,
          amount: {
            currency_code: product.price.currency,
            value: product.price.value
          }
        }
      ],
      application_context: {
        brand_name: "Faketo Inc",
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
        return_url: `${origin}/shop/complete`,
        cancel_url: `${origin}/shop?cancelled=1`
      }
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Unable to create PayPal order");
  }

  return response.json() as Promise<{
    id: string;
    links?: Array<{ href: string; rel: string; method: string }>;
  }>;
}

export async function capturePayPalOrder(orderId: string) {
  const accessToken = await getAccessToken();
  const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Unable to capture PayPal order");
  }

  return response.json();
}
