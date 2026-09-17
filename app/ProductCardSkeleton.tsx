import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <Card className="pt-0 overflow-hidden min-h-[400px\]">
      <div className="relative aspect-video">
        <Skeleton className="w-full h-full" />
      </div>

      <CardHeader>
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-2/3 mt-1" />
      </CardHeader>

      <CardFooter className="flex justify-between items-center">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-20" />
      </CardFooter>
    </Card>
  );
}