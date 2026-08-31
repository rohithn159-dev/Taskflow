"use client";

import { FormEvent, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import { getProjects, updateProject, WorkspaceProject } from "@/services/workspaceStorage";

export default function EditProjectPage() {
  const router = useRouter();
  const { projectId } = useParams<{ projectId: string }>();
  const project = getProjects().find((item) => item.id === Number(projectId));
  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");
  const [status, setStatus] = useState<WorkspaceProject["status"]>(project?.status || "active");
  const [error, setError] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!project) { setError("Project not found."); return; }
    if (!name.trim() || !description.trim()) { setError("Project name and description are required."); return; }
    updateProject(project.id, { name: name.trim(), description: description.trim(), status });
    router.push(`/projects/${project.id}`);
  };

  if (!project) return <main><p role="alert" className="text-red-600">Project not found.</p></main>;
  return <main className="max-w-2xl"><h1 className="text-3xl font-bold text-gray-900">Edit Project</h1><p className="mt-2 text-sm text-gray-500">Project ID: {project.id}</p><form onSubmit={submit} className="mt-6 space-y-5 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200"><Input id="edit-project-name" label="Project name" value={name} onChange={(event) => setName(event.target.value)} /><Textarea id="edit-project-description" label="Description" value={description} onChange={(event) => setDescription(event.target.value)} /><Select id="project-status" label="Status" value={status} onChange={(event) => setStatus(event.target.value as WorkspaceProject["status"])} options={[{ label: "Active", value: "active" }, { label: "Completed", value: "completed" }, { label: "Pending", value: "pending" }]} />{error && <p role="alert" className="text-sm text-red-600">{error}</p>}<div className="flex gap-3"><Button type="submit">Save Changes</Button><Button type="button" variant="secondary" onClick={() => router.back()}>Cancel</Button></div></form></main>;
}
