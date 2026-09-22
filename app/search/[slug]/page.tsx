import { Breadcrumbs } from "@/components/breadcrumb";
import { Suspense } from "react";
import ProductsSkeleton from "../../ProductsSkeleton";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { CategorySidebar } from "@/components/category-sidebar";
import { ProductListServerWrapper } from "@/components/ProductListServerWrapper";
// import { getCategoryBySlugCached } from "@/lib/actions";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
//   const category = await getCategoryBySlugCached(slug);

//   if (!category) {
//     return {};
//   }

//   return {
//     title: category.name,
//     openGraph: {
//       title: category.name,
//     },
//   };
// }

// export default async function CategoryPage({
//   params,
//   searchParams,
// }: CategoryPageProps) {
//   const { slug } = await params;
//   const { sort } = await searchParams;

//   const category = await getCategoryBySlugCached(slug);

//   if (!category) {
//     notFound();
//   }

//   const breadcrumbs = [
//     { label: "Products", href: "/" },
//     {
//       label: category.name,
//       href: `/search/${category.slug}`,
//     },
//   ];

//   return (
//     <>
//       <Breadcrumbs items={breadcrumbs} />

//       <Suspense key={`${slug}-${sort}`} fallback={<ProductsSkeleton />}>
//         <ProductListServerWrapper params={{ slug, sort }} />
//       </Suspense>
//     </>
//   );
// }

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { sort } = await searchParams;
  const category = await prisma.category.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      slug: true,
    },
  });

  if (!category) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Products", href: "/" },
    {
      label: category.name,
      href: `/search/${category.slug}`,
    },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex gap-3 text-sm mb-4">
        <Link href={`/search/${slug}`}>Latest</Link>
        <Link href={`/search/${slug}?sort=price-asc`}>Price: Low to High</Link>
        <Link href={`/search/${slug}?sort=price-desc`}>Price: High to Low</Link>
      </div>

      <Suspense key={`${slug}-${sort}`} fallback={<ProductsSkeleton />}>
        <ProductListServerWrapper params={{ slug, sort }} />
      </Suspense>
    </>
  );
}
