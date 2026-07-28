import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import Home from "@/pages/Home/Home";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;