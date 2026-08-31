"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { deleteProject, getProjects } from "@/services/workspaceStorage";
import { getCurrentUser } from "@/services/authMemory";

export default function ProjectPage() {
  const router = useRouter();
  const { projectId } = useParams<{ projectId: string }>();
  const project = getProjects().find((item) => item.id === Number(projectId));
  const role = getCurrentUser()?.role;
  const canManage = !role || role === "admin" || role === "project-manager";

  if (!project) return <main><p role="alert" className="text-red-600">Project not found.</p><Link href="/projects" className="text-blue-600">Back to projects</Link></main>;
  const remove = () => { if (window.confirm(`Delete project ${project.name}? This also removes its tasks.`)) { deleteProject(project.id); router.push("/projects"); } };
  return <main className="max-w-3xl space-y-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm text-gray-500">Project ID: {project.id}</p><h1 className="mt-1 text-3xl font-bold text-gray-900">{project.name}</h1><p className="mt-2 text-gray-500">{project.description}</p></div><Badge variant={project.status === "active" ? "success" : "default"}>{project.status}</Badge></div><Card><h2 className="text-lg font-semibold">Project actions</h2><div className="mt-4 flex flex-wrap gap-3">{canManage && <><Link href={`/projects/${project.id}/edit`}><Button>Edit Project</Button></Link><Button type="button" variant="danger" onClick={remove}>Delete Project</Button></>}<Link href={`/projects/${project.id}/board`}><Button variant="outline">Open Board</Button></Link></div></Card></main>;
}
