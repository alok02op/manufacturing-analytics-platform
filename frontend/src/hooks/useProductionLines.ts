import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import {
    createProductionLine,
    deleteProductionLine,
    getProductionLines,
    updateProductionLine,
} from "@/api/productionLine.api";

import { getErrorMessage } from "@/lib/errors";

import type {
    CreateProductionLineDto,
    ProductionLine,
    UpdateProductionLineDto,
} from "@/types/productionLine";

export function useProductionLines() {
    const [productionLines, setProductionLines] = useState<
        ProductionLine[]
    >([]);

    const [selectedFactoryId, setSelectedFactoryId] =
        useState<number>();

    const [isFetching, setIsFetching] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchProductionLines = useCallback(
        async (factoryId?: number) => {
            try {
                setIsFetching(true);

                setSelectedFactoryId(factoryId);

                const response =
                    await getProductionLines(factoryId);

                setProductionLines(response.data.data);
            } catch (error) {
                toast.error(
                    getErrorMessage(
                        error,
                        "Failed to fetch production lines"
                    )
                );
            } finally {
                setIsFetching(false);
            }
        },
        []
    );

    useEffect(() => {
        fetchProductionLines();
    }, [fetchProductionLines]);

    const handleCreateProductionLine = async (
        data: CreateProductionLineDto
    ) => {
        try {
            setIsCreating(true);

            await createProductionLine(data);

            toast.success(
                "Production line created successfully"
            );

            await fetchProductionLines(
                selectedFactoryId
            );
        } catch (error) {
            toast.error(
                getErrorMessage(
                    error,
                    "Failed to create production line"
                )
            );

            throw error;
        } finally {
            setIsCreating(false);
        }
    };

    const handleUpdateProductionLine = async (
        id: number,
        data: UpdateProductionLineDto
    ) => {
        try {
            setIsUpdating(true);

            await updateProductionLine(id, data);

            toast.success(
                "Production line updated successfully"
            );

            await fetchProductionLines(
                selectedFactoryId
            );
        } catch (error) {
            toast.error(
                getErrorMessage(
                    error,
                    "Failed to update production line"
                )
            );

            throw error;
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteProductionLine = async (
        id: number
    ) => {
        try {
            setIsDeleting(true);

            await deleteProductionLine(id);

            toast.success(
                "Production line deleted successfully"
            );

            await fetchProductionLines(
                selectedFactoryId
            );
        } catch (error) {
            toast.error(
                getErrorMessage(
                    error,
                    "Failed to delete production line"
                )
            );
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        productionLines,
        selectedFactoryId,

        isFetching,
        isCreating,
        isUpdating,
        isDeleting,

        fetchProductionLines,

        createProductionLine:
            handleCreateProductionLine,

        updateProductionLine:
            handleUpdateProductionLine,

        deleteProductionLine:
            handleDeleteProductionLine,
    };
}