import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import FactoryForm from "./FactoryForm";

import type {
    Factory,
    UpdateFactoryDto,
} from "@/types/factory.types";

interface Props {
    open: boolean;
    factory: Factory | null;
    loading?: boolean;
    onOpenChange: (open: boolean) => void;
    onUpdate: (
        id: number,
        data: UpdateFactoryDto
    ) => Promise<void>;
}

export default function EditFactoryDialog({
    open,
    factory,
    loading,
    onOpenChange,
    onUpdate,
}: Props) {
    if (factory == null) return null;
    
    const handleUpdate = async (
        values: UpdateFactoryDto
    ) => {
        await onUpdate(factory.id, values);

        onOpenChange(false);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Factory
                    </DialogTitle>
                </DialogHeader>

                <FactoryForm
                    defaultValues={factory}
                    loading={loading}
                    submitText="Update Factory"
                    onSubmit={handleUpdate}
                />
            </DialogContent>
        </Dialog>
    );
}