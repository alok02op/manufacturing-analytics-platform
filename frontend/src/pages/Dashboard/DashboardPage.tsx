import { useAppSelector } from "@/hooks/redux";
export default function DashboardPage() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">
          Dashboard
        </h2>

        <p className="text-muted-foreground">
          Welcome to the Manufacturing Analytics Platform.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-48 rounded-xl border bg-green-300 p-4"
          >
            <p>Id: {user?.id}</p>
            <p>Name: {user?.name}</p>
            <p>Role: {user?.role}</p>
            <p>CreatedAt: {user?.createdAt}</p>
            <p>UpdatedAt: {user?.updatedAt}</p>
          </div>
        ))}
      </div>

      <div className="h-96 rounded-xl border bg-card" />
    </div>
  );
}