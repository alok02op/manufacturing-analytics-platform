import { factoryRepository } from "@/repositories/factory.repository.js";
import { ApiError } from "@/utils/apiError.js";
import type {
    CreateFactoryDto,
    UpdateFactoryDto,
} from "@/types/factory.types.js";

const create = async (data: CreateFactoryDto) => {
    const existing = await factoryRepository.findByName(data.name);
    if (existing) {
        throw new ApiError(409, "Factory already exists");
    }
    return factoryRepository.create(data);
};

const getAll = async () => {
    return factoryRepository.findAll();
};

const getById = async (id: number) => {
    const factory = await factoryRepository.findById(id);

    if (!factory) {
        throw new ApiError(404, "Factory not found");
    }
    return factory;
};

const update = async (
    id: number,
    data: UpdateFactoryDto
) => {
    const factory = await factoryRepository.findById(id);

    if (!factory) {
        throw new ApiError(404, "Factory not found");
    }

    if (
        data.name &&
        data.name !== factory.name
    ) {
        const duplicate = await factoryRepository.findByName(data.name);
        if (duplicate) {
            throw new ApiError(409, "Factory already exists");
        }
    }

    return factoryRepository.update(id, data);
};

const remove = async (id: number) => {
    const factory = await factoryRepository.findById(id);

    if (!factory) {
        throw new ApiError(404, "Factory not found");
    }

    const count = await factoryRepository.countProductionLines(id);

    if (count > 0) {
        throw new ApiError(400, "Cannot delete factory with production lines");
    }
    
    await factoryRepository.remove(id);
};

export const factoryService = {
    create,
    getAll,
    getById,
    update,
    remove,
};