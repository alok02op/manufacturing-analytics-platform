import { api } from "./axios";

import type { ApiResponse } from "@/types/api.types";
import type {
    LoginRequest,
    RegisterRequest,
    User,
} from "@/types/auth.types";

export const register = (
    data: RegisterRequest
) =>
    api.post<ApiResponse<User>>(
        "/auth/register",
        data
    );

export const login = (
    data: LoginRequest
) =>
    api.post<ApiResponse<User>>(
        "/auth/login",
        data
    );

export const logout = () =>
    api.post<ApiResponse<null>>(
        "/auth/logout"
    );

export const getCurrentUser = () =>
    api.get<ApiResponse<User>>(
        "/auth/me"
    );