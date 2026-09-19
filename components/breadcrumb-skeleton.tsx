import { Skeleton } from "./ui/skeleton";

export function BreadcrumbsSkeleton() {
  return (
    <div className="mb-6 flex items-center gap-2 h-8">
      <Skeleton className="h-4 w-4 rounded-full" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
}