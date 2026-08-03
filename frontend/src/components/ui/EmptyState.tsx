import { PackageOpen } from "lucide-react";

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

export function EmptyState({
    title,
    description,
    icon,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
            <div className="mb-4 text-muted-foreground">
                {icon ?? (
                    <PackageOpen className="h-10 w-10" />
                )}
            </div>

            <h3 className="text-lg font-semibold">
                {title}
            </h3>

            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    );
}