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
// --------
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import {
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import {
    Pencil,
    Trash2,
} from "lucide-react";
import { formatDate } from "@/lib/date";

import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";

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
            <LoadingState message="Loading factories..." />
        );
    }

    if (factories.length === 0) {
        return (
            <EmptyState
                title="No factories found"
                description="Create your first factory to get started."
            />
        );
    }

    return (
        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-muted/40 transition-colors">
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
                                    {formatDate(factory.createdAt)}
                                </TableCell>
                                {canManage && (
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-1">
                                            <Tooltip>
                                                <TooltipTrigger
                                                    render={
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => onEdit(factory)}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    }
                                                />

                                                <TooltipContent>
                                                    Edit Factory
                                                </TooltipContent>
                                            </Tooltip>        
                                            <Tooltip>
                                                <TooltipTrigger
                                                    render={
                                                        <Button
                                                            variant="destructive"
                                                            size="icon"
                                                            onClick={() =>
                                                                onDelete(factory)
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    }
                                                />
                                                <TooltipContent>
                                                    Edit Factory
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}