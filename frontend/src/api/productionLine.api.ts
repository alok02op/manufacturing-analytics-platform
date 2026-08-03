import { api } from "./axios";

import type { ApiResponse } from "@/types/api.types";

import type {
    CreateProductionLineDto,
    ProductionLine,
    UpdateProductionLineDto,
} from "@/types/productionLine";

export const getProductionLines = (
    factoryId?: number
) =>
    api.get<ApiResponse<ProductionLine[]>>(
        "/production-lines",
        {
            params: factoryId
                ? { factoryId }
                : undefined,
        }
    );

export const getProductionLine = (
    id: number
) =>
    api.get<ApiResponse<ProductionLine>>(
        `/production-lines/${id}`
    );

export const createProductionLine = (
    data: CreateProductionLineDto
) =>
    api.post<ApiResponse<ProductionLine>>(
        "/production-lines",
        data
    );

export const updateProductionLine = (
    id: number,
    data: UpdateProductionLineDto
) =>
    api.patch<ApiResponse<ProductionLine>>(
        `/production-lines/${id}`,
        data
    );

export const deleteProductionLine = (
    id: number
) =>
    api.delete<ApiResponse<null>>(
        `/production-lines/${id}`
    );