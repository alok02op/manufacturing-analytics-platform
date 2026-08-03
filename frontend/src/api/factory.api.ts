import { api } from "./axios";
import type { ApiResponse } from "@/types/api.types";
import type {
    CreateFactoryDto,
    Factory,
    UpdateFactoryDto,
} from "@/types/factory.types";

export const getFactories = () =>
    api.get<ApiResponse<Factory[]>>("/factories");

export const getFactory = (id: number) =>
    api.get<ApiResponse<Factory>>(`/factories/${id}`);

export const createFactory = (
    data: CreateFactoryDto
) =>
    api.post<ApiResponse<Factory>>(
        "/factories",
        data
    );

export const updateFactory = (
    id: number,
    data: UpdateFactoryDto
) =>
    api.patch<ApiResponse<Factory>>(
        `/factories/${id}`,
        data
    );

export const deleteFactory = (
    id: number
) =>
    api.delete<ApiResponse<null>>(
        `/factories/${id}`
    );