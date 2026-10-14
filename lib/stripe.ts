import { Prisma } from "@/app/generated/prisma/client";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // apiVersion: '2022-02-24.acacia',
  typescript: true,
  appInfo: {
    name: "Ignews",
    version: "0.1.0",
  },
});

export type OrderWithItemsAndProduct = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
  };
}>;

export async function createCheckoutSession(order: OrderWithItemsAndProduct) {
  if (!order.items || order.items.length === 0) {
    throw new Error("Order has no items");
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
    order.items.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.name,
            description: item.product.description ?? "",
            images: [item.product.image ?? ""],
          },
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
      };
    });

  const successUrl = `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_PUBLIC_URL}/checkout/cancel?session_id={CHECKOUT_SESSION_ID}`;

  try {
    // initialize a checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        orderId: order.id.toString(),
        ...(order.userId && {userId: order.userId})
      },
    });
    return { sessionId: session.id, sessionUrl: session.url };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw new Error("Failed to create checkout session");
  }
}
