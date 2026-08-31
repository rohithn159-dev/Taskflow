import Badge from "@/components/ui/Badge";

interface TaskCardProps {
  title: string;
  project: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
}

export default function TaskCard({
  title,
  project,
  priority,
  status,
}: TaskCardProps) {
  const priorityVariant = {
    low: "default",
    medium: "warning",
    high: "danger",
  } as const;

  const statusVariant = {
    todo: "default",
    "in-progress": "warning",
    completed: "success",
  } as const;

  return (
    <div className="border-b border-[#edf1f5] py-4 last:border-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-[#132238]">
            {title}
          </h3>

          <p className="mt-1 text-sm text-[#6d7d91]">
            {project}
          </p>
        </div>

        <Badge variant={priorityVariant[priority]}>
          {priority}
        </Badge>
      </div>

      <div className="mt-2">
        <Badge variant={statusVariant[status]}>
          {status}
        </Badge>
      </div>
    </div>
  );
}