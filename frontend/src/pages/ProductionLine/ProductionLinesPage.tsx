import { useMemo, useState } from "react";
import { Workflow, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/PageHeader";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useAppSelector } from "@/hooks/redux";
import { useFactories } from "@/hooks/useFactories";
import { useProductionLines } from "@/hooks/useProductionLines";

import CreateProductionLineDialog from "@/components/production-line/CreateProductionLineDialog";
import DeleteProductionLineDialog from "@/components/production-line/DeleteProductionLineDialog";
import EditProductionLineDialog from "@/components/production-line/EditProductionLineDialog";
import ProductionLineTable from "@/components/production-line/ProductionLineTable";

import type { ProductionLine } from "@/types/productionLine";

export default function ProductionLinesPage() {
    const {
        factories,
    } = useFactories();

    const {
        productionLines,

        isFetching,
        isCreating,
        isUpdating,
        isDeleting,

        fetchProductionLines,

        createProductionLine,
        updateProductionLine,
        deleteProductionLine,
    } = useProductionLines();

    const [selectedFactoryId, setSelectedFactoryId] = useState<number>();

    const { user } = useAppSelector(
        (state) => state.auth
    );

    const canManage =
        user?.role === "ADMIN";

    const [createOpen, setCreateOpen] =
        useState(false);

    const [editOpen, setEditOpen] =
        useState(false);

    const [deleteOpen, setDeleteOpen] =
        useState(false);

    const [selectedLine, setSelectedLine] =
        useState<ProductionLine | null>(null);

    const factoryOptions = useMemo(
        () =>
            factories.map((factory) => ({
                id: factory.id,
                name: factory.name,
            })),
        [factories]
    );

    const selectedFactory = factoryOptions.find(
        (factory) => factory.id === selectedFactoryId
    );

    return (
        <div className="space-y-8 p-8">

            <PageHeader
                title={
                    <div className="flex items-center gap-2">
                        <Workflow className="h-7 w-7 text-primary" />

                        <span>
                            Production Lines
                        </span>
                    </div>
                }
                description="Manage production lines across all factories."
                actions={
                    <div className="flex items-center gap-3">

                        <Select
                             value={
                                selectedFactoryId
                                    ? String(selectedFactoryId)
                                    : "all"
                            }
                            onValueChange={(value) => {
                                const id =
                                    value === "all"
                                        ? undefined
                                        : Number(value);

                                setSelectedFactoryId(id);
                                return fetchProductionLines(id);
                            }}
                        >
                            <SelectTrigger className="w-52">
                                <SelectValue>
                                    {selectedFactory?.name ?? "All Factories"}
                                </SelectValue>
                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="all">
                                    All Factories
                                </SelectItem>

                                {factoryOptions.map(
                                    (factory) => (
                                        <SelectItem
                                            key={factory.id}
                                            value={String(factory.id)}
                                        >
                                            {factory.name}
                                        </SelectItem>
                                    )
                                )}

                            </SelectContent>

                        </Select>

                        {canManage && (
                            <Button
                                onClick={() =>
                                    setCreateOpen(true)
                                }
                                disabled={factories.length === 0}
                            >
                                <Plus className="mr-2 h-4 w-4" />

                                New Production Line
                            </Button>
                        )}

                    </div>
                }
            />

            <ProductionLineTable
                productionLines={productionLines}
                loading={isFetching}
                canManage={canManage}
                onEdit={(line) => {
                    setSelectedLine(line);
                    setEditOpen(true);
                }}
                onDelete={(line) => {
                    setSelectedLine(line);
                    setDeleteOpen(true);
                }}
            />

            <CreateProductionLineDialog
                open={createOpen}
                loading={isCreating}
                factories={factoryOptions}
                onOpenChange={setCreateOpen}
                onCreate={createProductionLine}
            />

            <EditProductionLineDialog
                open={editOpen}
                loading={isUpdating}
                factories={factoryOptions}
                productionLine={selectedLine}
                onOpenChange={setEditOpen}
                onUpdate={updateProductionLine}
            />

            <DeleteProductionLineDialog
                open={deleteOpen}
                loading={isDeleting}
                productionLine={selectedLine}
                onOpenChange={setDeleteOpen}
                onDelete={deleteProductionLine}
            />

        </div>
    );
}