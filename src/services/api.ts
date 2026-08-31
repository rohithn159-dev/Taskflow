import { logoutAccount } from "@/services/authMemory";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("API is not configured. Using local workspace storage.");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (response.status === 401) {
    logoutAccount();
    // The API service has no router instance, so use a full-page auth redirect.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = "/login";
  }

  if (!response.ok) throw new Error("Unable to complete the request.");
  return response.json() as Promise<T>;
}

export const projectApi = {
  getAll: () => apiRequest("/projects"),
  create: (project: unknown) => apiRequest("/projects", { method: "POST", body: JSON.stringify(project) }),
  update: (id: number, project: unknown) => apiRequest(`/projects/${id}`, { method: "PATCH", body: JSON.stringify(project) }),
  remove: (id: number) => apiRequest(`/projects/${id}`, { method: "DELETE" }),
};
