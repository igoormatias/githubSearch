import { FiAlertCircle } from "react-icons/fi";
import { Button } from "./Button";

type ErrorStateProps = {
  title?: string;
  message: string;
  onRetry?: () => void;
};

export const ErrorState = ({
  title = "Something went wrong",
  message,
  onRetry,
}: ErrorStateProps) => {
  return (
    <div
      className="flex flex-col items-center gap-4 rounded-xl border border-border bg-surface p-8 text-center"
      role="alert"
    >
      <FiAlertCircle className="h-10 w-10 text-danger" aria-hidden="true" />
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-foreground-muted">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} aria-label="Retry">
          Try again
        </Button>
      )}
    </div>
  );
};
