export default async function ProjectBoardPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Project Board</h1>
      <p className="mt-4">Project ID: {projectId}</p>
    </main>
  );
}