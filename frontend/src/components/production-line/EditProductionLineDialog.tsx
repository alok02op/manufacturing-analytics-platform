import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import ProductionLineForm from "./ProductionLineForm";

import type {
    FactoryOption,
    ProductionLine,
    UpdateProductionLineDto,
} from "@/types/productionLine";

interface Props {
    open: boolean;

    loading?: boolean;

    productionLine: ProductionLine | null;

    factories: FactoryOption[];

    onOpenChange: (open: boolean) => void;

    onUpdate: (
        id: number,
        data: UpdateProductionLineDto
    ) => Promise<void>;
}

export default function EditProductionLineDialog({
    open,
    loading,
    productionLine,
    factories,
    onOpenChange,
    onUpdate,
}: Props) {
    if (!productionLine) return null;

    const handleUpdate = async (
        values: UpdateProductionLineDto
    ) => {
        await onUpdate(
            productionLine.id,
            values
        );

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
                        Edit Production Line
                    </DialogTitle>

                    <DialogDescription>
                        Update production line
                        information.
                    </DialogDescription>
                </DialogHeader>

                <ProductionLineForm
                    factories={factories}
                    defaultValues={productionLine as UpdateProductionLineDto}
                    loading={loading}
                    submitText="Update Production Line"
                    onSubmit={handleUpdate}
                />
            </DialogContent>
        </Dialog>
    );
}