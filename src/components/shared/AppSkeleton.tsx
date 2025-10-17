import { Skeleton } from "@/components/ui/skeleton";
export function SkeletonUploadCourseForm() {
  return (
    <div className="grid gap-5 w-[90%] m-auto my-10">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-7 w-[200px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
      <div>
        <Skeleton className="h-[210px] w-full rounded-3xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="w-full space-y-5">
          <Skeleton className="h-4 w-[20%]" />
          <Skeleton className="h-7 w-full" />
        </div>

        <div className="w-full space-y-5">
          <Skeleton className="h-4 w-[20%]" />
          <Skeleton className="h-7 w-full" />
        </div>

        <div className="w-full space-y-5">
          <Skeleton className="h-4 w-[20%]" />
          <Skeleton className="h-20 w-full" />
        </div>

        <div className="w-full space-y-5">
          <Skeleton className="h-4 w-[20%]" />
          <Skeleton className="h-10 w-[30%]" />
        </div>
        <div>
          <Skeleton className="w-full h-10" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export function SkeletonCourseCard() {
  return <Skeleton className="h-[130px] w-[250px]" />;
}
export function SkeletonDepCard() {
  return <Skeleton className="h-[130px]" />;
}

export function SkeletonHeader() {
  return <Skeleton className="h-[100px] w-full" />;
}
