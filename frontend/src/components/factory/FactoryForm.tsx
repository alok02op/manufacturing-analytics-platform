import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    createFactorySchema,
    type CreateFactoryFormData,
} from "@/lib/validations/factory";

import type {
    CreateFactoryDto,
    UpdateFactoryDto,
} from "@/types/factory.types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FactoryFormProps {
    defaultValues?: UpdateFactoryDto;
    loading?: boolean;
    submitText?: string;
    onSubmit: (values: CreateFactoryDto) => Promise<void>;
}

export default function FactoryForm({
    defaultValues,
    loading = false,
    submitText = "Save",
    onSubmit,
}: FactoryFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateFactoryFormData>({
        resolver: zodResolver(createFactorySchema),
        defaultValues: {
            name: defaultValues?.name ?? "",
            location: defaultValues?.location ?? "",
        },
    });

    useEffect(() => {
        reset({
            name: defaultValues?.name ?? "",
            location: defaultValues?.location ?? "",
        });
    }, [defaultValues, reset]);

    const submitHandler = async (values: CreateFactoryFormData) => {
        await onSubmit(values);

        if (!defaultValues) {
            reset();
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="space-y-5"
        >
            <div className="space-y-2">
                <Label htmlFor="name">
                    Factory Name
                </Label>

                <Input
                    id="name"
                    placeholder="Enter factory name"
                    {...register("name")}
                />

                {errors.name && (
                    <p className="text-sm text-destructive">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="location">
                    Location
                </Label>

                <Input
                    id="location"
                    placeholder="Enter location"
                    {...register("location")}
                />

                {errors.location && (
                    <p className="text-sm text-destructive">
                        {errors.location.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full"
            >
                {loading ? "Saving..." : submitText}
            </Button>
        </form>
    );
}