// "use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { getCart } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
// import { useCart } from "@/lib/use-cart";

function CartButton({ children }: { children: React.ReactNode }) {
  return (
    <Button variant="ghost" size="icon" className="relative">
      <Link href="/cart">{children}</Link>
    </Button>
  );
}

export async function CartIndicator() {
    const cart = await getCart();
    const cartSize = cart?.size ?? 0;
    // const count = await prisma.cart.count();
    
    // const cartSize = 0;

    return (
        <Button variant="ghost" size="icon" className="relative">
            <Link href="/cart" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartSize > 0 && (
                    <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {cartSize}
                    </span>
                )}
            </Link>
        </Button>
    );

//   const { itemCount, isLoading } = useCart();

//   if (isLoading) {
//     return (
//       <CartButton>
//         <ShoppingCart className="h-5 w-5" />
//       </CartButton>
//     );
//   }

//   return (
//     <CartButton>
//       <ShoppingCart className="h-5 w-5" />
//       {itemCount > 0 && (
//         <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
//           {itemCount}
//         </span>
//       )}
//     </CartButton>
//   );
}