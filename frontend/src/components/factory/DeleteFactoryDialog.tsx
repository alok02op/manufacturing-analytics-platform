import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import type { Factory } from "@/types/factory.types";

interface Props {
    open: boolean;

    loading?: boolean;

    factory: Factory | null;

    onOpenChange: (open: boolean) => void;

    onDelete: (id: number) => Promise<void>;
}

export default function DeleteFactoryDialog({
    open,
    loading,
    factory,
    onOpenChange,
    onDelete,
}: Props) {
    if (!factory) return null;

    const handleDelete = async () => {
        await onDelete(factory.id);

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
                        Delete Factory
                    </DialogTitle>
                </DialogHeader>

                <p className="text-sm text-muted-foreground">
                    Are you sure you want to delete{" "}
                    <strong>{factory.name}</strong>?
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