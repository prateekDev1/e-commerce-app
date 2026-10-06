"use client";

import { CartItemWithProduct, setProductQuantity } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";
// import { useCart } from "@/lib/use-cart";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
}
  

export default function CartEntry({ cartItem }: CartEntryProps) {
  const [isLoading, setIsLoading] = useState(false);
  // const { revlidateCart } = useCart();

  const handleSetProductQuantity = async (quantity: number) => {
    setIsLoading(true);
    try {
      await setProductQuantity(cartItem.product.id, quantity);
      // revlidateCart();
    } catch (error) {
      console.error("Error changing the quantity of the cart item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li className="border-b border-muted flex py-4 justify-between">
      <div className="flex space-x-4">
        <div className="absolute z-10 -ml-1 -mt-2">
          <Button
            variant="ghost"
            size="icon"
            disabled={isLoading}
            className="w-7 h-7 rounded-full bg-muted text-muted-foreground"
            onClick={() => handleSetProductQuantity(0)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="rounded-md overflow-hidden border border-muted w-16 h-16">
          <Image
            className="h-full w-full object-cover"
            width={128}
            height={128}
            src={cartItem.product.image}
            alt={cartItem.product.name}
          />
        </div>
        <div className="flex flex-col">
          <div className="font-medium">{cartItem.product.name}</div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end gap-2">
        <p className="font-medium">{formatPrice(cartItem.product.price)}</p>
        <div className="flex items-center border border-muted rounded-full">
          <Button
            variant="ghost"
            className="rounded-l-full"
            onClick={() => handleSetProductQuantity(cartItem.quantity - 1)}
            disabled={isLoading}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <p className="w-6 text-center">{cartItem.quantity}</p>
          <Button
            variant="ghost"
            className="rounded-r-full"
            onClick={() => handleSetProductQuantity(cartItem.quantity + 1)}
            disabled={isLoading}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </li>
  );
}
