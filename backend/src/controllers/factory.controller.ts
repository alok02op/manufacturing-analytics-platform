import { factoryService } from "@/services/factory.service.js";
import { asyncHandler } from "@/utils/asyncHandler.js";
import { ApiResponse } from "@/utils/apiResponse.js";

const create = asyncHandler(async (req, res) => {
    const factory = await factoryService.create(req.body);

    return ApiResponse.created(
        res,
        factory,
        "Factory created successfully"
    );
});

const getAll = asyncHandler(async (_req, res) => {
    const factories = await factoryService.getAll();

    return ApiResponse.success(
        res,
        factories,
        "Factories fetched successfully"
    );
});

const getById = asyncHandler(async (req, res) => {
    const factory = await factoryService.getById(Number(req.params.id));

    return ApiResponse.success(
        res,
        factory,
        "Factory fetched successfully"
    );
});

const update = asyncHandler(async (req, res) => {
    const factory = await factoryService.update(
        Number(req.params.id),
        req.body
    );

    return ApiResponse.success(
        res,
        factory,
        "Factory updated successfully"
    );
});

const remove = asyncHandler(async (req, res) => {
    await factoryService.remove(Number(req.params.id));

    return ApiResponse.success(
        res,
        null,
        "Factory deleted successfully"
    );
});

export const factoryController = {
    create,
    getAll,
    getById,
    update,
    remove,
};