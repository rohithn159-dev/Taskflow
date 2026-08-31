export interface WorkspaceProject {
  id: number;
  name: string;
  description: string;
  status: "active" | "completed" | "pending";
  createdAt: string;
}

export interface WorkspaceTask {
  id: number;
  title: string;
  projectId: number;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
  createdAt: string;
}

let projects: WorkspaceProject[] = [];
let tasks: WorkspaceTask[] = [];

function write<T>(key: string, items: T[]) {
  if (key === "projects") projects = items as WorkspaceProject[];
  if (key === "tasks") tasks = items as WorkspaceTask[];
  if (typeof window !== "undefined") window.dispatchEvent(new Event("taskflow-data-changed"));
}

export function getProjects() {
  return projects;
}

export function saveProject(project: Omit<WorkspaceProject, "id" | "createdAt">) {
  const projects = getProjects();
  const newProject: WorkspaceProject = {
    ...project,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  };
  write("projects", [...projects, newProject]);
  return newProject;
}

export function updateProject(id: number, changes: Partial<Omit<WorkspaceProject, "id" | "createdAt">>) {
  const updated = getProjects().map((project) =>
    project.id === id ? { ...project, ...changes } : project
  );
  write("projects", updated);
  return updated.find((project) => project.id === id);
}

export function deleteProject(id: number) {
  write("projects", getProjects().filter((project) => project.id !== id));
  write("tasks", getTasks().filter((task) => task.projectId !== id));
}

export function getTasks() {
  return tasks;
}

export function saveTask(task: Omit<WorkspaceTask, "id" | "createdAt">) {
  const tasks = getTasks();
  const newTask: WorkspaceTask = {
    ...task,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  };
  write("tasks", [...tasks, newTask]);
  return newTask;
}

export function updateTaskStatus(id: number, status: WorkspaceTask["status"]) {
  write(
    "tasks",
    getTasks().map((task) =>
      task.id === id ? { ...task, status } : task
    )
  );
}
