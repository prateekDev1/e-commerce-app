import { Suspense } from "react";
import {CategorySidebar} from "@/components/category-sidebar";
import { prisma } from "@/lib/prisma";
import { SortingControls } from "@/components/sorting-controls";

async function CategorySidebarServerWrapper() {
    const categories = await prisma.category.findMany({
      select: {
        name: true,
        slug: true,
      },
      orderBy: {
        name: "asc",
      },
    })
    return <CategorySidebar categories={categories} />
}


export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto py-4">
      <div className="flex gap-8">
        <div className="w-31.25 flex-none">
          <Suspense fallback={<div className="w-31.25">Loading...</div>}>
            <CategorySidebarServerWrapper />
          </Suspense>
        </div>
        <div className="flex-1">{children}</div>
        <div className="w-31.25 flex-none"><SortingControls /></div>
      </div>
    </main>
  );
}
