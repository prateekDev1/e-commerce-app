import { ProductCardSkeleton } from "./ProductCardSkeleton";
import ProductsSkeleton from "./ProductsSkeleton";

export default function Loading() {
    return (
        // <div className="flex items-center justify-center h-screen">
        //     <div className="w-20 h-20 border-t-2 border-gray-800 rounded-full animate-spin"></div>
        // </div>
        <main className="container mx-auto p-4">
              <h1 className="text-3xl font-bold mb-6">Home Page</h1>
              <p>Showing 5 products</p>
              <ProductsSkeleton />
            </main>
    )
}