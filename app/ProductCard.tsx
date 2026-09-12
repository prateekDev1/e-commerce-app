import { Product } from "@/app/generated/prisma/client"; 
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg p-4">
    <div className="relative aspect-video">
        {
          product.image ? (<Image 
            src={product.image} 
            alt={product.name} 
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="eager"
        />) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <span className="text-gray-500">No Image</span>
          </div>
        )
        }
    </div>
    <h2 className="text-lg font-semibold">{product.name}</h2>
    <p className="text-gray-600">{formatPrice(product.price)}</p>
    <p className="text-gray-500">{product.description}</p>
    </div>
  );
}