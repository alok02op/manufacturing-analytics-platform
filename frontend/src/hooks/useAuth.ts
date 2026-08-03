import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";

import {
    login,
    logout,
    register,
    getCurrentUser,
} from "@/api/auth.api";

import {
    clearUser,
    setUser,
} from "@/features/auth/authSlice";

import { useAppDispatch } from "@/hooks/redux";

import type {
    LoginRequest,
    RegisterRequest,
} from "@/types/auth.types";

export function useAuth() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loginUser = async (data: LoginRequest) => {
        try {
            await login(data);

            const response = await getCurrentUser();

            dispatch(setUser(response.data.data));

            toast.success("Welcome back!");

            navigate("/", {
                replace: true,
            });
        } catch (error) {
            console.error(error);

            toast.error(
                getErrorMessage(
                    error,
                    "Invalid email or password"
                )
            );

            throw error;
        }
    };

    const registerUser = async (data: RegisterRequest) => {
        try {
            await register(data);

            toast.success(
                "Registration successful. Please login."
            );

            navigate("/login", {
                replace: true,
            });
        } catch (error) {
            console.error(error);

            toast.error(
                getErrorMessage(
                    error,
                    "Registration failed"
                )
            );

            throw error;
        }
    };

    const logoutUser = async () => {
        try {
            await logout();

            dispatch(clearUser());

            toast.success("Logged out successfully");

            navigate("/login", {
                replace: true,
            });
        } catch (error) {
            console.error(error);
            
            toast.error(
                getErrorMessage(
                    error,
                    "Logout failed"
                )
            );

            throw error;
        }
    };

    return {
        loginUser,
        registerUser,
        logoutUser,
    };
}