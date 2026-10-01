"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { addToCart } from "@/lib/actions";
import { Product } from "@/app/generated/prisma/client";
// import { useCart } from "@/lib/use-cart";

export function AddToCartButton({ product }: { product: Product }) {
  const [isAdding, setIsAdding] = useState(false);
//   const { revlidateCart } = useCart();

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      await addToCart(product.id, 1);
    //   revlidateCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={product.inventory === 0 || isAdding}
      className="w-full"
    >
      <ShoppingCart className="mr-1 w-4 h-4" />
      {product.inventory > 0 ? "Add to cart" : "Out of stock"}
    </Button>
  );
}