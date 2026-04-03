import { Skeleton } from "./Skeleton";

export function PageLoader() {
  return (
    <div className="container py-8 space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-in fade-in duration-500">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="aspect-[2/3] w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
