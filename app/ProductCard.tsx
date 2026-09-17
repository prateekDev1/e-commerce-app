import { Product } from "@/app/generated/prisma/client";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="w-full">
      <Card className="pt-0 overflow-hidden">
      <div className="relative aspect-video">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="eager"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{formatPrice(product.price)}</CardDescription>
      </CardHeader>
      <CardFooter>{formatPrice(product.price)}</CardFooter>
    </Card>
    </Link>

  );
}
