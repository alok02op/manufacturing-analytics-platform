import { useEffect } from "react";
import { getCurrentUser } from "@/api/auth.api";
import { useAppDispatch } from "@/hooks/redux";
import {
    clearUser,
    setLoading,
    setUser,
} from "@/features/auth/authSlice";

export default function AuthInitializer() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function initialize() {
            try {
                const response = await getCurrentUser();

                dispatch(setUser(response.data.data));
            } catch {
                dispatch(clearUser());
            } finally {
                dispatch(setLoading(false));
            }
        }

        initialize();
    }, [dispatch]);

    return null;
}