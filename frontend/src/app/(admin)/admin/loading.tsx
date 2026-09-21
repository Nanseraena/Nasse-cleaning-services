import { PageHeaderSkeleton, TableSkeleton } from "@/components/common/loading-skeletons";

export default function AdminLoading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <TableSkeleton rows={6} cols={6} />
    </div>
  );
}
