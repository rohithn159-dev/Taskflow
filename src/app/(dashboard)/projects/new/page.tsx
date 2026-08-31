"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { saveProject } from "@/services/workspaceStorage";

export default function NewProjectPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      setError("Please enter a project name.");
      return;
    }

    saveProject({
      name: name.trim(),
      description: description.trim() || "No description added",
      status: "active",
    });
    router.push("/projects");
  };

  return (
    <main className="max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
      <p className="mt-2 text-gray-500">Start a project and add tasks to it.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-5 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <Input id="project-name" label="Project name" value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Website redesign" />
        <Textarea id="project-description" label="Description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What is this project about?" />
        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}
        <div className="flex gap-3">
          <Button type="submit">Create Project</Button>
          <Button type="button" variant="secondary" onClick={() => router.push("/projects")}>Cancel</Button>
        </div>
      </form>
    </main>
  );
}
