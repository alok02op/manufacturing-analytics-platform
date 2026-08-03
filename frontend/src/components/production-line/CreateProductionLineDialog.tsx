import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import ProductionLineForm from "./ProductionLineForm";

import type {
    CreateProductionLineDto,
    FactoryOption,
} from "@/types/productionLine";

interface Props {
    open: boolean;
    loading?: boolean;

    factories: FactoryOption[];

    onOpenChange: (open: boolean) => void;

    onCreate: (
        data: CreateProductionLineDto
    ) => Promise<void>;
}

export default function CreateProductionLineDialog({
    open,
    loading,
    factories,
    onCreate,
    onOpenChange,
}: Props) {
    const handleCreate = async (
        values: CreateProductionLineDto
    ) => {
        await onCreate(values);

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
                        Create Production Line
                    </DialogTitle>

                    <DialogDescription>
                        Add a new production line to a
                        factory.
                    </DialogDescription>
                </DialogHeader>

                <ProductionLineForm
                    factories={factories}
                    loading={loading}
                    submitText="Create Production Line"
                    onSubmit={handleCreate}
                />
            </DialogContent>
        </Dialog>
    );
}