import { useState } from "react";

import { Button } from "@/components/ui/button";

import CreateFactoryDialog from "@/components/factory/CreateFactoryDialog";
import DeleteFactoryDialog from "@/components/factory/DeleteFactoryDialog";
import EditFactoryDialog from "@/components/factory/EditFactoryDialog";
import FactoryTable from "@/components/factory/FactoryTable";

import { useFactories } from "@/hooks/useFactories";
import { useAppSelector } from "@/hooks/redux";
import type { Factory } from "@/types/factory.types";

export default function FactoriesPage() {
    const {
        factories,

        isFetching,
        isCreating,
        isUpdating,
        isDeleting,

        createFactory,
        updateFactory,
        deleteFactory,
    } = useFactories();

    const { user } = useAppSelector((state) => state.auth);
    const canManageFactories = user?.role === "ADMIN";

    const [createOpen, setCreateOpen] = useState(false);

    const [editOpen, setEditOpen] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedFactory, setSelectedFactory] =
        useState<Factory | null>(null);

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Factories
                    </h1>

                    <p className="text-muted-foreground">
                        Manage your manufacturing factories.
                    </p>
                </div>
                {canManageFactories && (
                    <Button
                        onClick={() => setCreateOpen(true)}
                    >
                        New Factory
                    </Button>
                )}
            </div>

            <FactoryTable
                factories={factories}
                loading={isFetching}
                canManage={canManageFactories}
                onEdit={(factory) => {
                    setSelectedFactory(factory);
                    setEditOpen(true);
                }}
                onDelete={(factory) => {
                    setSelectedFactory(factory);
                    setDeleteOpen(true);
                }}
            />

            <CreateFactoryDialog
                open={createOpen}
                onOpenChange={setCreateOpen}
                loading={isCreating}
                onCreate={createFactory}
            />

            <EditFactoryDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                loading={isUpdating}
                factory={selectedFactory}
                onUpdate={updateFactory}
            />

            <DeleteFactoryDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                loading={isDeleting}
                factory={selectedFactory}
                onDelete={deleteFactory}
            />
        </div>
    );
}