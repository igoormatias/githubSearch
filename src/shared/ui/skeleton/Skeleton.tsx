type SkeletonProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const Skeleton = ({ className = "", style }: SkeletonProps) => {
  return (
    <div
      className={`skeleton rounded ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};
