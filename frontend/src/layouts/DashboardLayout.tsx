import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="border-b bg-white px-6 py-4 shadow-sm">
        <h1 className="text-xl font-bold">
          Manufacturing Analytics
        </h1>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;