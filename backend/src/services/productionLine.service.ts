import { factoryRepository } from "@/repositories/factory.repository.js";
import { productionLineRepository } from "@/repositories/productionLine.repository.js";
import type {
    CreateProductionLineDto,
    UpdateProductionLineDto,
} from "@/types/productionLine.types.js";
import { ApiError } from "@/utils/apiError.js";

const create = async (data: CreateProductionLineDto) => {
    data.code = data.code.trim().toUpperCase();
    const factory = await factoryRepository.findById(data.factoryId);

    if (!factory) {
        throw new ApiError(404, "Factory not found");
    }

    const existing =
        await productionLineRepository.findByFactoryAndCode(
            data.factoryId,
            data.code
        );

    if (existing) {
        throw new ApiError(
            409,
            "Production line code already exists in this factory"
        );
    }

    return productionLineRepository.create(data);
};

const getAll = async (
    factoryId?: number
) => {
    return productionLineRepository.findAll(factoryId);
};

const getById = async (id: number) => {
    const productionLine =
        await productionLineRepository.findById(id);

    if (!productionLine) {
        throw new ApiError(
            404,
            "Production line not found"
        );
    }

    return productionLine;
};

const update = async (
    id: number,
    data: UpdateProductionLineDto
) => {
    const productionLine =
        await productionLineRepository.findById(id);

    if (data.code) {
        data.code = data.code.trim().toUpperCase();
    }

    if (!productionLine) {
        throw new ApiError(
            404,
            "Production line not found"
        );
    }

    const newFactoryId =
        data.factoryId ?? productionLine.factoryId;

    const newCode =
        data.code ?? productionLine.code;

    // Validate factory if changed
    if (
        newFactoryId !== productionLine.factoryId
    ) {
        const factory =
            await factoryRepository.findById(
                newFactoryId
            );

        if (!factory) {
            throw new ApiError(
                404,
                "Factory not found"
            );
        }
    }

    // Validate composite uniqueness
    if (
        newFactoryId !== productionLine.factoryId ||
        newCode !== productionLine.code
    ) {
        const duplicate =
            await productionLineRepository.findByFactoryAndCode(
                newFactoryId,
                newCode
            );

        if (
            duplicate &&
            duplicate.id !== productionLine.id
        ) {
            throw new ApiError(
                409,
                "Production line code already exists in this factory"
            );
        }
    }

    return productionLineRepository.update(
        id,
        data
    );
};

const remove = async (id: number) => {
    const productionLine =
        await productionLineRepository.findById(id);

    if (!productionLine) {
        throw new ApiError(
            404,
            "Production line not found"
        );
    }

    const machineCount =
        await productionLineRepository.countMachines(
            id
        );

    if (machineCount > 0) {
        throw new ApiError(
            400,
            "Cannot delete production line with machines"
        );
    }

    await productionLineRepository.remove(id);
};

export const productionLineService = {
    create,
    getAll,
    getById,
    update,
    remove,
};