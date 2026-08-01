import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux";

export default function GuestRoute() {
    const { loading, isAuthenticated } = useAppSelector((state) => state.auth);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}