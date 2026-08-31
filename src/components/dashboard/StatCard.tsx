import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  bgColor: string;
  iconBgColor: string;
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  bgColor,
  iconBgColor,
}: StatCardProps) {
  return (
    <div
      className={`rounded-[22px] border-[2px] border-[#dfeaf7] p-5 shadow-[0_10px_24px_rgba(31,59,91,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(31,59,91,0.08)] ${bgColor}`}
    >
      <div className="mb-5 flex items-start justify-between">
        <div className={`rounded-xl p-3 ${iconBgColor} flex-shrink-0 shadow-[0_8px_18px_rgba(23,50,87,0.12)]`}>
          <Icon size={22} className="text-white" />
        </div>
      </div>

      <div>
        <p className="text-[15px] font-semibold text-[#2e3d52]">{title}</p>
        <p className="mt-3 text-[42px] font-bold leading-none tracking-[-0.05em] text-[#1b2636]">{value}</p>
        <p className="mt-3 text-[13px] text-[#687b92]">{description}</p>
      </div>
    </div>
  );
}