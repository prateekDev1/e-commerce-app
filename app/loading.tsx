import { BreadcrumbsSkeleton } from "@/components/breadcrumb-skeleton";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import ProductsSkeleton from "./ProductsSkeleton";

export default function Loading() {
  return (
    <main className="container mx-auto py-4">
      <BreadcrumbsSkeleton />
      <ProductsSkeleton />
    </main>
  );
}
