import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import FactoryForm from "./FactoryForm";
import type { CreateFactoryDto } from "@/types/factory.types";

interface Props {
    open: boolean;
    loading?: boolean;
    onOpenChange: (open: boolean) => void;
    onCreate: (data: CreateFactoryDto) => Promise<void>;
}

export default function CreateFactoryDialog({
    open,
    loading,
    onCreate,
    onOpenChange,
}: Props) {
    const handleCreate = async (values: CreateFactoryDto) => {
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
                        Create Factory
                    </DialogTitle>
                </DialogHeader>

                <FactoryForm
                    loading={loading}
                    submitText="Create Factory"
                    onSubmit={handleCreate}
                />
            </DialogContent>
        </Dialog>
    );
}