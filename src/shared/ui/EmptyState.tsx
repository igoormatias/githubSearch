import { FiInbox } from "react-icons/fi";

type EmptyStateProps = {
  title: string;
  message: string;
};

export const EmptyState = ({ title, message }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-surface p-8 text-center">
      <FiInbox className="h-10 w-10 text-foreground-muted" aria-hidden="true" />
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-foreground-muted">{message}</p>
      </div>
    </div>
  );
};
