export type ProductionLineStatus =
    | "ACTIVE"
    | "INACTIVE"
    | "MAINTENANCE";

export interface FactoryOption {
    id: number;
    name: string;
}

export interface ProductionLine {
    id: number;
    name: string;
    code: string;
    description?: string | null;
    status: ProductionLineStatus;

    factoryId: number;

    factory: {
        id: number;
        name: string;
    };

    createdAt: string;
    updatedAt: string;
}

export interface CreateProductionLineDto {
    name: string;
    code: string;
    description?: string;
    status?: ProductionLineStatus;
    factoryId: number;
}

export interface UpdateProductionLineDto {
    name?: string;
    code?: string;
    description?: string;
    status?: ProductionLineStatus;
    factoryId?: number;
}