import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import {
    Pencil,
    Trash2,
} from "lucide-react";

import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingState } from "@/components/ui/LoadingState";
import { StatusBadge } from "@/components/ui/StatusBadge";

import { formatDate } from "@/lib/date";

import type { ProductionLine } from "@/types/productionLine";

interface Props {
    productionLines: ProductionLine[];

    loading?: boolean;

    canManage?: boolean;

    onEdit: (
        productionLine: ProductionLine
    ) => void;

    onDelete: (
        productionLine: ProductionLine
    ) => void;
}

export default function ProductionLineTable({
    productionLines,
    loading,
    canManage,
    onEdit,
    onDelete,
}: Props) {
    if (loading) {
        return (
            <LoadingState message="Loading production lines..." />
        );
    }

    if (productionLines.length === 0) {
        return (
            <EmptyState
                title="No production lines found"
                description="Create your first production line to get started."
            />
        );
    }

    return (
        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead>Factory</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            {canManage && (
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            )}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {productionLines.map((line) => (
                            <TableRow
                                key={line.id}
                                className="hover:bg-muted/40 transition-colors"
                            >
                                <TableCell>
                                    <div>
                                        <p className="font-medium">
                                            {line.name}
                                        </p>

                                        {line.description && (
                                            <Tooltip>
                                                <TooltipTrigger
                                                    render={
                                                        <p
                                                            className="max-w-xs overflow-hidden text-xs text-muted-foreground"
                                                            style={{
                                                                display: "-webkit-box",
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient: "vertical",
                                                            }}
                                                        >
                                                            {line.description}
                                                        </p>
                                                    }
                                                />

                                                <TooltipContent className="max-w-sm">
                                                    {line.description}
                                                </TooltipContent>
                                            </Tooltip>
                                        )}
                                    </div>
                                </TableCell>

                                <TableCell>
                                    {line.code}
                                </TableCell>

                                <TableCell>
                                    {line.factory.name}
                                </TableCell>

                                <TableCell>
                                    <StatusBadge
                                        status={line.status}
                                    />
                                </TableCell>

                                <TableCell>
                                    {formatDate(
                                        line.createdAt
                                    )}
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
                                                            onClick={() =>
                                                                onEdit(
                                                                    line
                                                                )
                                                            }
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    }
                                                />

                                                <TooltipContent>
                                                    Edit Production Line
                                                </TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger
                                                    render={
                                                        <Button
                                                            variant="destructive"
                                                            size="icon"
                                                            onClick={() =>
                                                                onDelete(
                                                                    line
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    }
                                                />

                                                <TooltipContent>
                                                    Delete Production Line
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