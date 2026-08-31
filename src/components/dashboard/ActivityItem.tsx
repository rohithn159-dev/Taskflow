interface ActivityItemProps {
  user: string;
  action: string;
  target: string;
  time: string;
}

export default function ActivityItem({
  user,
  action,
  target,
  time,
}: ActivityItemProps) {
  return (
    <div className="flex gap-3 border-b border-gray-100 py-4 last:border-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
        {user.charAt(0).toUpperCase()}
      </div>

      <div className="min-w-0">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">
            {user}
          </span>{" "}
          {action}{" "}
          <span className="font-medium">
            {target}
          </span>
        </p>

        <p className="mt-1 text-xs text-gray-400">
          {time}
        </p>
      </div>
    </div>
  );
}