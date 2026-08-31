interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
      <h3 className="text-lg font-semibold text-gray-800">
        {title}
      </h3>

      {description && (
        <p className="mt-2 text-sm text-gray-500">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
}