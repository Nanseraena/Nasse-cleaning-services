import { CardGridSkeleton, PageHeaderSkeleton } from "@/components/common/loading-skeletons";

export default function RootLoading() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-8">
      <PageHeaderSkeleton />
      <CardGridSkeleton count={6} />
    </div>
  );
}
