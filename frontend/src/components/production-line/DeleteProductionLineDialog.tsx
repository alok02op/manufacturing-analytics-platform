import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import type { ProductionLine } from "@/types/productionLine";

interface Props {
    open: boolean;

    loading?: boolean;

    productionLine: ProductionLine | null;

    onOpenChange: (open: boolean) => void;

    onDelete: (id: number) => Promise<void>;
}

export default function DeleteProductionLineDialog({
    open,
    loading,
    productionLine,
    onOpenChange,
    onDelete,
}: Props) {
    if (!productionLine) return null;

    const handleDelete = async () => {
        await onDelete(productionLine.id);

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
                        Delete Production Line
                    </DialogTitle>

                    <DialogDescription>
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <p className="text-sm text-muted-foreground">
                    You are about to permanently delete{" "}
                    <span className="font-medium text-foreground">
                        {productionLine.name}
                    </span>
                    . This action cannot be undone.
                </p>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() =>
                            onOpenChange(false)
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        disabled={loading}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}