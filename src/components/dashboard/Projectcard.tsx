import Link from "next/link";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

interface ProjectCardProps {
  id: number;
  name: string;
  description: string;
  status: "active" | "completed" | "pending";
  tasks: number;
}

export default function ProjectCard({
  id,
  name,
  description,
  status,
  tasks,
}: ProjectCardProps) {
  const statusVariant = {
    active: "success",
    completed: "default",
    pending: "warning",
  } as const;

  return (
    <Card className="cursor-default hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-[#132238]">
            {name}
          </h3>

          <p className="mt-1 text-sm text-[#6d7d91]">
            {description}
          </p>
        </div>

        <Badge variant={statusVariant[status]}>
          {status}
        </Badge>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-[#6d7d91]">
          {tasks} tasks
        </span>

        <Link
          href={`/projects/${id}`}
          className="text-sm font-semibold text-[#2d6cdf] transition hover:text-[#1f55b7] hover:underline"
        >
          View project →
        </Link>
      </div>
    </Card>
  );
}