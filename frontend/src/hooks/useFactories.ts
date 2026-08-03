import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";

import {
    createFactory,
    deleteFactory,
    getFactories,
    updateFactory,
} from "@/api/factory.api";

import type {
    CreateFactoryDto,
    Factory,
    UpdateFactoryDto,
} from "@/types/factory.types";

export function useFactories() {
    const [factories, setFactories] = useState<Factory[]>([]);

    const [isFetching, setIsFetching] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchFactories = useCallback(async () => {
        try {
            setIsFetching(true);

            const response = await getFactories();

            setFactories(response.data.data);
        } catch (error: any) {
            toast.error(
                getErrorMessage(
                    error,
                    "Failed to fetch factories"
                )
            );
        } finally {
            setIsFetching(false);
        }
    }, []);

    useEffect(() => {
        fetchFactories();
    }, [fetchFactories]);

    const handleCreateFactory = async (
        data: CreateFactoryDto
    ) => {
        try {
            setIsCreating(true);

            await createFactory(data);

            toast.success("Factory created successfully");

            await fetchFactories();
        } catch (error: any) {
            toast.error(
                getErrorMessage(
                    error,
                    "Failed to create factory"
                )
            );

            throw error;
        } finally {
            setIsCreating(false);
        }
    };

    const handleUpdateFactory = async (
        id: number,
        data: UpdateFactoryDto
    ) => {
        try {
            setIsUpdating(true);

            await updateFactory(id, data);

            toast.success("Factory updated successfully");

            await fetchFactories();
        } catch (error: any) {
            toast.error(
                getErrorMessage(
                    error,
                    "Failed to update factory"
                )
            );

            throw error;
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteFactory = async (
        id: number
    ) => {
        try {
            setIsDeleting(true);

            await deleteFactory(id);

            toast.success("Factory deleted successfully");

            await fetchFactories();
        } catch (error: any) {
            toast.error(
                getErrorMessage(
                    error,
                    "Failed to delete factory"
                )
            );
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        factories,

        isFetching,
        isCreating,
        isUpdating,
        isDeleting,

        fetchFactories,

        createFactory: handleCreateFactory,
        updateFactory: handleUpdateFactory,
        deleteFactory: handleDeleteFactory,
    };
}