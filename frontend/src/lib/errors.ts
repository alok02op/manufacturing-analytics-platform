import axios from "axios";

interface ApiErrorResponse {
    success: boolean;
    message: string;
    errors?: unknown;
}

export function getErrorMessage(
    error: unknown,
    fallback = "Something went wrong"
): string {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
        return (
            error.response?.data?.message ??
            error.message ??
            fallback
        );
    }

    if (error instanceof Error) {
        return error.message;
    }

    return fallback;
}