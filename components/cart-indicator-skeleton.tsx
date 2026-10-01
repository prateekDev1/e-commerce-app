import Link from "next/link";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { sleep } from "@/lib/actions";

export async function CartIndicatorSkeleton() {
  await sleep(1000); // Simulate a delay for loading state
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative animate-pulse"
      disabled
    >
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />
      </Link>
    </Button>
  );
}