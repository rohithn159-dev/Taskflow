"use client";

import { FormEvent, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { getProjects, getTasks, saveTask, updateTaskStatus, WorkspaceProject, WorkspaceTask } from "@/services/workspaceStorage";

export default function MyTasksPage() {
  const [projects, setProjects] = useState<WorkspaceProject[]>(() => getProjects());
  const [tasks, setTasks] = useState<WorkspaceTask[]>(() => getTasks());
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [priority, setPriority] = useState<WorkspaceTask["priority"]>("medium");
  const [error, setError] = useState("");

  const refresh = () => { setProjects(getProjects()); setTasks(getTasks()); };
  useEffect(() => { window.addEventListener("taskflow-data-changed", refresh); return () => window.removeEventListener("taskflow-data-changed", refresh); }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !projectId) { setError("Enter a task title and choose a project."); return; }
    saveTask({ title: title.trim(), projectId: Number(projectId), priority, status: "todo" });
    setTitle(""); setError("");
  };

  return <main className="max-w-4xl space-y-6"><div><h1 className="text-3xl font-bold text-gray-900">My Tasks</h1><p className="mt-2 text-gray-500">Add tasks to any project and track their progress.</p></div>
    <Card><form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end"><Input id="task-title" label="Task title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Design the homepage" /><Select id="task-project" label="Project" value={projectId} onChange={(event) => setProjectId(event.target.value)} options={projects.map((project) => ({ label: project.name, value: String(project.id) }))} /><Button type="submit">Add Task</Button></form>{error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}<div className="mt-4 flex items-center gap-3 text-sm"><label htmlFor="priority" className="font-medium text-gray-700">Priority</label><select id="priority" value={priority} onChange={(event) => setPriority(event.target.value as WorkspaceTask["priority"])} className="rounded-lg border border-gray-300 px-3 py-2"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></div></Card>
    <Card><h2 className="text-lg font-semibold">Your tasks</h2>{tasks.length === 0 ? <p className="mt-4 text-sm text-gray-500">No tasks yet. Create a project first, then add a task here.</p> : <div className="mt-4 space-y-3">{tasks.map((task) => <div key={task.id} className="flex flex-col gap-3 border-b border-gray-100 pb-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-medium text-gray-900">{task.title}</p><p className="text-sm text-gray-500">{projects.find((project) => project.id === task.projectId)?.name || "Unknown project"} · {task.priority}</p></div><select value={task.status} onChange={(event) => updateTaskStatus(task.id, event.target.value as WorkspaceTask["status"])} className="rounded-lg border border-gray-300 px-3 py-2 text-sm"><option value="todo">To do</option><option value="in-progress">In progress</option><option value="completed">Completed</option></select></div>)}</div>}</Card>
  </main>;
}
