import { authService } from "@/services/auth.service.js";
import { asyncHandler } from "@/utils/asyncHandler.js";
import { ApiResponse } from "@/utils/apiResponse.js";
import { COOKIE_NAME, cookieOptions } from "@/config/cookie.config.js";
import { AuthRequest } from "@/middleware/auth.middleware.js";

const register = asyncHandler(async (req, res) => {
    const { accessToken, user } = await authService.register(req.body);
    
    res.cookie(
        COOKIE_NAME,
        accessToken,
        cookieOptions
    );

    return ApiResponse.created(res, user, "User registered successfully");
});

const login = asyncHandler(async (req, res) => {
    const { accessToken, user } = await authService.login(req.body);

    res.cookie(
        COOKIE_NAME,
        accessToken,
        cookieOptions
    );

    return ApiResponse.success(
        res,
        user,
        "Login successful"
    );
});

const me = asyncHandler(async (req: AuthRequest, res) => {
    const user = await authService.getCurrentUser(req.user!.id);

    return ApiResponse.success(res, user, "Current user fetched successfully");
});

const logout = asyncHandler(async (_req, res) => {
    res.clearCookie(COOKIE_NAME, cookieOptions);

    return ApiResponse.success(res, null, "Logged out successfully");
});

export const authController = {
    register,
    login,
    me,
    logout
};