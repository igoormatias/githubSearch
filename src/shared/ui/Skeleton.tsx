type SkeletonProps = {
  className?: string;
};

export const Skeleton = ({ className = "" }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse rounded-xl bg-surface-hover ${className}`}
      aria-hidden="true"
    />
  );
};
