import { useState } from "react";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/PageHeader";

import CreateFactoryDialog from "@/components/factory/CreateFactoryDialog";
import DeleteFactoryDialog from "@/components/factory/DeleteFactoryDialog";
import EditFactoryDialog from "@/components/factory/EditFactoryDialog";
import FactoryTable from "@/components/factory/FactoryTable";

import { useFactories } from "@/hooks/useFactories";
import { useAppSelector } from "@/hooks/redux";
import type { Factory } from "@/types/factory.types";

import { Factory as FactoryIcon } from "lucide-react";

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
        <div className="space-y-6 p-8">
            <PageHeader
                title={
                    <div className="flex items-center gap-2">
                        <FactoryIcon className="h-7 w-7 text-primary" />

                        <span>Factories</span>
                    </div>
                }
                description="Manage your manufacturing factories."
                actions={
                    canManageFactories ? (
                        <Button
                            onClick={() => setCreateOpen(true)}
                        >
                            New Factory
                        </Button>
                    ) : undefined
                }
            />

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