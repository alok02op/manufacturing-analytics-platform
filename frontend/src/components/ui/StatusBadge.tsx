import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
    status: string;
}

const statusVariants: Record<
    string,
    "default" | "secondary" | "destructive" | "outline"
> = {
    ACTIVE: "default",
    RUNNING: "default",

    MAINTENANCE: "secondary",
    PROCESSING: "secondary",

    INACTIVE: "outline",
    STOPPED: "outline",

    FAILED: "destructive",
};

export function StatusBadge({
    status,
}: StatusBadgeProps) {
    return (
        <Badge
            variant={
                statusVariants[status] ?? "outline"
            }
        >
            {status.replaceAll("_", " ")}
        </Badge>
    );
}