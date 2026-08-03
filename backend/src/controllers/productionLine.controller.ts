import { productionLineService } from "@/services/productionLine.service.js";
import { asyncHandler } from "@/utils/asyncHandler.js";
import { ApiResponse } from "@/utils/apiResponse.js";

const create = asyncHandler(async (req, res) => {
    const productionLine =
        await productionLineService.create(req.body);

    return ApiResponse.created(
        res,
        productionLine,
        "Production line created successfully"
    );
});

const getAll = asyncHandler(async (_req, res) => {
    const factoryId = _req.query.factoryId
        ? Number(_req.query.factoryId)
        : undefined;

    const productionLines =
        await productionLineService.getAll(factoryId);

    return ApiResponse.success(
        res,
        productionLines,
        "Production lines fetched successfully"
    );
});

const getById = asyncHandler(async (req, res) => {
    const productionLine =
        await productionLineService.getById(
            Number(req.params.id)
        );

    return ApiResponse.success(
        res,
        productionLine,
        "Production line fetched successfully"
    );
});

const update = asyncHandler(async (req, res) => {
    const productionLine =
        await productionLineService.update(
            Number(req.params.id),
            req.body
        );

    return ApiResponse.success(
        res,
        productionLine,
        "Production line updated successfully"
    );
});

const remove = asyncHandler(async (req, res) => {
    await productionLineService.remove(
        Number(req.params.id)
    );

    return ApiResponse.success(
        res,
        null,
        "Production line deleted successfully"
    );
});

export const productionLineController = {
    create,
    getAll,
    getById,
    update,
    remove,
};