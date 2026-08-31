"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FolderOpen, CheckSquare2, CheckCircle2, Zap, FolderPlus, ClipboardList } from "lucide-react";

import ActivityItem from "@/components/dashboard/ActivityItem";
import ProjectCard from "@/components/dashboard/Projectcard";
import TaskCard from "@/components/dashboard/TaskCard";
import StatCard from "@/components/dashboard/StatCard";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getProjects, getTasks, WorkspaceProject, WorkspaceTask } from "@/services/workspaceStorage";

export default function DashboardContent() {
  const [projects, setProjects] = useState<WorkspaceProject[]>(() => getProjects());
  const [tasks, setTasks] = useState<WorkspaceTask[]>(() => getTasks());

  useEffect(() => {
    const refresh = () => {
      setProjects(getProjects());
      setTasks(getTasks());
    };
    window.addEventListener("taskflow-data-changed", refresh);
    return () => window.removeEventListener("taskflow-data-changed", refresh);
  }, []);

  const projectById = new Map(projects.map((project) => [project.id, project.name]));
  const completedTasks = tasks.filter((task) => task.status === "completed").length;

  return (
    <div className="mx-auto max-w-[1440px] space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#2d6cdf]">Workspace overview</p>
          <h1 className="text-3xl font-bold tracking-[-0.04em] text-[#132238] md:text-[2.6rem]">Dashboard</h1>
          <p className="mt-2 text-[#6d7d91]">Your projects and tasks at a glance.</p>
        </div>
        <Link href="/projects/new"><Button className="rounded-xl bg-[#2d6cdf] px-5 py-3 text-base font-semibold shadow-[0_8px_18px_rgba(45,108,223,0.2)] hover:bg-[#245fc8]">+ Create Project</Button></Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Projects" 
          value={projects.length} 
          description="All your projects"
          icon={FolderOpen}
          bgColor="bg-gradient-to-br from-[#edf5ff] via-[#f8fbff] to-[#edf4ff]"
          iconBgColor="bg-gradient-to-br from-[#4d7ff5] to-[#2d6cdf]"
        />
        <StatCard 
          title="Active Projects" 
          value={projects.filter((project) => project.status === "active").length} 
          description="Currently active"
          icon={Zap}
          bgColor="bg-gradient-to-br from-[#ecfdf5] via-[#f7fff9] to-[#ebf9f0]"
          iconBgColor="bg-gradient-to-br from-[#5fc98f] to-[#2e9b67]"
        />
        <StatCard 
          title="My Tasks" 
          value={tasks.length} 
          description="Tasks assigned to you"
          icon={CheckSquare2}
          bgColor="bg-gradient-to-br from-[#f5f0ff] via-[#fbf9ff] to-[#f3effd]"
          iconBgColor="bg-gradient-to-br from-[#8f6af4] to-[#6f4fe4]"
        />
        <StatCard 
          title="Completed Tasks" 
          value={completedTasks} 
          description="Successfully completed"
          icon={CheckCircle2}
          bgColor="bg-gradient-to-br from-[#fff7ea] via-[#fffdf9] to-[#fff5e7]"
          iconBgColor="bg-gradient-to-br from-[#f6b24d] to-[#e39a2d]"
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-[2px] border-[#dfeaf8] bg-gradient-to-br from-[#f3f8ff] via-[#fbfdff] to-[#edf6ff] shadow-[0_12px_28px_rgba(45,108,223,0.06)]">
          <div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-bold tracking-tight text-[#132238]">Recent Projects</h2><Link href="/projects" className="text-sm font-semibold text-[#2d6cdf] transition hover:text-[#1f55b7]">View all</Link></div>
          {projects.length === 0 ? <EmptyMessage tone="project" text="No projects yet. Create one to get started." href="/projects/new" label="Create project" /> : <div className="space-y-4">{projects.slice(-3).reverse().map((project) => <ProjectCard key={project.id} id={project.id} name={project.name} description={project.description} status={project.status} tasks={tasks.filter((task) => task.projectId === project.id).length} />)}</div>}
        </Card>
        <Card className="border-[2px] border-[#e7defd] bg-gradient-to-br from-[#f7f3ff] via-[#fdfdff] to-[#f5f2ff] shadow-[0_12px_28px_rgba(123,95,255,0.06)]">
          <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold tracking-tight text-[#132238]">My Tasks</h2><Link href="/my-tasks" className="text-sm font-semibold text-[#2d6cdf] transition hover:text-[#1f55b7]">View all</Link></div>
          {tasks.length === 0 ? <EmptyMessage tone="task" text="No tasks yet. Add a task from My Tasks." href="/my-tasks" label="Add task" /> : <div>{tasks.slice(-3).reverse().map((task) => <TaskCard key={task.id} title={task.title} project={projectById.get(task.projectId) || "Unknown project"} priority={task.priority} status={task.status} />)}</div>}
        </Card>
      </div>
      <Card className="border-[2px] border-[#dfeaf8] bg-gradient-to-br from-[#f8fbff] via-white to-[#eef4ff] shadow-[0_12px_28px_rgba(31,59,91,0.04)]"><div className="mb-2"><h2 className="text-lg font-bold tracking-tight text-[#14213d]">Recent Activity</h2><p className="text-sm text-[#718096]">Updates from your workspace</p></div><ActivityItem user="You" action="currently have" target={`${projects.length} projects and ${tasks.length} tasks`} time="now" /></Card>
    </div>
  );
}

function EmptyMessage({ text, href, label, tone = "project" }: { text: string; href: string; label: string; tone?: "project" | "task" }) {
  const toneClasses =
    tone === "project"
      ? "border-[#cfe0f9] bg-gradient-to-br from-[#f3f8ff] via-[#fbfdff] to-[#edf5ff]"
      : "border-[#e0d1ff] bg-gradient-to-br from-[#f7f3ff] via-[#fdfdff] to-[#f3efff]";

  const Icon = tone === "project" ? FolderPlus : ClipboardList;

  return (
    <div className={`rounded-[20px] border-[2px] border-dashed p-7 text-center ${toneClasses}`}>
      <div className="mb-4 flex justify-center">
        <div className={`flex h-20 w-20 items-center justify-center rounded-2xl ${tone === "project" ? "bg-gradient-to-br from-[#dcecff] to-[#b7d3ff] text-[#2d6cdf]" : "bg-gradient-to-br from-[#e8ddff] to-[#d9c9ff] text-[#6f4fe4]"}`}>
          <Icon size={36} strokeWidth={1.8} />
        </div>
      </div>
      <p className="text-[15px] text-[#687b92]">{text}</p>
      <Link href={href} className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#2d6cdf] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(45,108,223,0.2)] transition hover:bg-[#245fc8]">{label}</Link>
    </div>
  );
}
