import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ProductCard } from "./ProductCard";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import ProductsSkeleton from "./ProductsSkeleton";
import { sleep } from "@/lib/actions";
import { Breadcrumbs } from "@/components/breadcrumb";
import { ProductListServerWrapper } from "@/components/ProductListServerWrapper";
import { stripe } from "@/lib/stripe";

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

const pageSize = 3;

async function Products({ page }: { page: number }) {
  const skip = (page - 1) * pageSize;
  const products = await prisma.product.findMany({
    skip,
    take: pageSize,
    include: {
      category: true,
    },
  })

  await sleep(1000); // Simulate a delay for demonstration purposes
  
  return (
    <>
      <p>Showing {products.length} products</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default async function HomePage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;

  const total = await prisma.product.count();
  const totalPages = Math.ceil(total / pageSize);
  console.log(await stripe.events.list({limit: 1}));

  return (
    <main className="container mx-auto py-4">
      <Breadcrumbs items={[{ label: "Products", href: "/" }]} />

      <Suspense key={page} fallback={<ProductsSkeleton />}>
        <ProductListServerWrapper params={{page,pageSize}}/>
      </Suspense>

      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`?page=${page - 1}`} />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href={`?page=${index + 1}`}
                isActive={page === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext href={`?page=${page + 1}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
