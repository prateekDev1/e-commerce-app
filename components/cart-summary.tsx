import { getCart } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function CartSummary() {
  const cart = await getCart();

  if (!cart) {
    return null;
  }

  const subtotal = cart.subtotal;
  const taxes = 0;
  const shipping = 0;
  const total = subtotal + taxes + shipping;

  return (
    <div className="flex flex-col pt-4">
      <div className="text-sm text-muted-foreground">
        <div className="flex items-center justify-between border-b pb-1 mb-3">
          <p>Subtotal</p>
          <p className="text-base text-foreground">{formatPrice(subtotal)}</p>
        </div>

        <div className="flex items-center justify-between border-b pb-1 mb-3">
          <p>Taxes</p>
          <p>Calculated at checkout</p>
        </div>

        <div className="flex items-center justify-between border-b pb-1 mb-3">
          <p>Shipping</p>
          <p>Calculated at checkout</p>
        </div>

        <div className="flex items-center justify-between border-b pb-1 mb-3 font-semibold">
          <p>Total</p>
          <p className="text-base text-foreground">{formatPrice(total)}</p>
        </div>
      </div>
      <Button size="lg" className="w-full mt-4">
        <Link href="/checkout">
          Proceed to Checkout
        </Link>
      </Button>
    </div>
  );
}