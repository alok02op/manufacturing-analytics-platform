import { api } from "./axios";
import type { RegisterRequest, LoginRequest } from "@/types/auth.types.js";

export const register = (data: RegisterRequest) => api.post("/auth/register", data);

export const login = (data: LoginRequest) => api.post("/auth/login", data);

export const logout = () => api.post("/auth/logout");

export const getCurrentUser = () => api.get("/auth/me");
