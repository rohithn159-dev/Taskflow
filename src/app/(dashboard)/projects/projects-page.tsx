"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { deleteProject, getProjects, WorkspaceProject } from "@/services/workspaceStorage";
import { getCurrentUser } from "@/services/authMemory";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<WorkspaceProject[]>([]);
  const [search, setSearch] = useState("");
  const role = getCurrentUser()?.role;
  const canManage = !role || role === "admin" || role === "project-manager";

  useEffect(() => {
    const refresh = () => setProjects(getProjects());
    refresh();
    window.addEventListener("taskflow-data-changed", refresh);
    return () => window.removeEventListener("taskflow-data-changed", refresh);
  }, []);

  const visibleProjects = projects.filter((project) =>
    `${project.name} ${project.description} ${project.id}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">
          Projects
        </h1>

        <Link
          href="/projects/new"
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          Add Project
        </Link>
      </div>
      <div className="mt-6 max-w-md"><Input id="project-search" label="Search projects or project ID" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name or ID" /></div>
      {projects.length === 0 ? (
        <Card className="mt-6 text-center">
          <h2 className="font-semibold text-gray-900">No projects yet</h2>
          <p className="mt-1 text-sm text-gray-500">Create your first project to get started.</p>
          <Link href="/projects/new" className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline">Create a project</Link>
        </Card>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {visibleProjects.map((project) => (
            <Card key={project.id}>
              <div className="flex items-start justify-between gap-3">
                <div><h2 className="font-semibold text-gray-900">{project.name}</h2><p className="mt-1 text-sm text-gray-500">{project.description}</p><p className="mt-2 text-xs text-gray-400">Project ID: {project.id}</p></div>
                <Badge variant={project.status === "active" ? "success" : "default"}>{project.status}</Badge>
              </div>
              <div className="mt-5 flex flex-wrap gap-3"><Link href={`/projects/${project.id}`} className="text-sm font-medium text-blue-600 hover:underline">View</Link>{canManage && <><Link href={`/projects/${project.id}/edit`} className="text-sm font-medium text-gray-600 hover:underline">Edit</Link><Button type="button" variant="danger" className="px-3 py-1 text-sm" onClick={() => { if (window.confirm(`Delete project ${project.name}? This also removes its tasks.`)) { deleteProject(project.id); setProjects(getProjects()); } }}>Delete</Button></>}</div>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}