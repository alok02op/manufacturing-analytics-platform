import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import type { Factory } from "@/types/factory.types";

interface FactoryTableProps {
    factories: Factory[];
    loading?: boolean;
    canManage?: boolean;

    onEdit: (factory: Factory) => void;

    onDelete: (factory: Factory) => void;
}

export default function FactoryTable({
    factories,
    loading,
    canManage,
    onEdit,
    onDelete,
}: FactoryTableProps) {
    if (loading) {
        return (
            <div className="flex h-60 items-center justify-center">
                Loading factories...
            </div>
        );
    }
    if (factories.length === 0) {
        return (
            <div className="rounded-lg border py-10 text-center text-muted-foreground">
                No factories found.
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>

                    <TableHead>Location</TableHead>

                    <TableHead>Created</TableHead>

                    {canManage && (
                        <TableHead className="text-right">
                            Actions
                        </TableHead>
                    )}
                </TableRow>
            </TableHeader>

            <TableBody>
                {factories.map((factory) => (
                    <TableRow key={factory.id}>
                        <TableCell className="font-medium">
                            {factory.name}
                        </TableCell>

                        <TableCell>
                            {factory.location}
                        </TableCell>

                        <TableCell>
                            {new Date(
                                factory.createdAt
                            ).toLocaleDateString()}
                        </TableCell>
                        {canManage && (
                            <TableCell className="space-x-2 text-right">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        onEdit(factory)
                                    }
                                >
                                    Edit
                                </Button>

                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() =>
                                        onDelete(factory)
                                    }
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}