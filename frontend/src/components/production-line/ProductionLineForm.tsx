import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    createProductionLineSchema,
    type CreateProductionLineFormData,
    productionLineStatus,
} from "@/lib/validations/productionLine";

import type {
    CreateProductionLineDto,
    FactoryOption,
    UpdateProductionLineDto,
} from "@/types/productionLine";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface ProductionLineFormProps {
    factories: FactoryOption[];

    defaultValues?: UpdateProductionLineDto;

    loading?: boolean;

    submitText?: string;

    onSubmit: (
        values: CreateProductionLineDto
    ) => Promise<void>;
}

export default function ProductionLineForm({
    factories,
    defaultValues,
    loading = false,
    submitText = "Save",
    onSubmit,
}: ProductionLineFormProps) {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<CreateProductionLineFormData>({
        resolver: zodResolver(
            createProductionLineSchema
        ),

        defaultValues: {
            name: defaultValues?.name ?? "",
            code: defaultValues?.code ?? "",
            description:
                defaultValues?.description ?? "",
            factoryId:
                defaultValues?.factoryId ?? 0,
            status:
                defaultValues?.status ??
                "ACTIVE",
        },
    });

    useEffect(() => {
        reset({
            name: defaultValues?.name ?? "",
            code: defaultValues?.code ?? "",
            description:
                defaultValues?.description ?? "",
            factoryId:
                defaultValues?.factoryId ?? 0,
            status:
                defaultValues?.status ??
                "ACTIVE",
        });
    }, [defaultValues, reset]);

    const submitHandler = async (
        values: CreateProductionLineFormData
    ) => {
        await onSubmit(values);

        if (!defaultValues) {
            reset({
                name: "",
                code: "",
                description: "",
                factoryId: 0,
                status: "ACTIVE",
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="space-y-5"
        >
            {/* Name */}

            <div className="space-y-2">
                <Label htmlFor="name">
                    Production Line Name
                </Label>

                <Input
                    id="name"
                    placeholder="Enter production line name"
                    {...register("name")}
                />

                {errors.name && (
                    <p className="text-sm text-destructive">
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* Code */}

            <div className="space-y-2">
                <Label htmlFor="code">
                    Code
                </Label>

                <Input
                    id="code"
                    placeholder="LINE-01"
                    className="uppercase"
                    {...register("code", {
                        setValueAs: (value: string) =>
                            value.trim().toUpperCase(),
                    })}
                />

                {errors.code && (
                    <p className="text-sm text-destructive">
                        {errors.code.message}
                    </p>
                )}
            </div>

            {/* Factory */}

            <div className="space-y-2">
                <Label>
                    Factory
                </Label>

                <Controller
                    control={control}
                    name="factoryId"
                    render={({ field }) => (
                        <Select
                            value={
                                field.value
                                    ? String(
                                          field.value
                                      )
                                    : undefined
                            }
                            onValueChange={(value) =>
                                field.onChange(
                                    Number(value)
                                )
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue>
                                    {factories.find(
                                        (factory) => factory.id === field.value
                                    )?.name ?? "Select factory"}
                                </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                                {factories.map(
                                    (factory) => (
                                        <SelectItem
                                            key={
                                                factory.id
                                            }
                                            value={String(
                                                factory.id
                                            )}
                                        >
                                            {
                                                factory.name
                                            }
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    )}
                />

                {errors.factoryId && (
                    <p className="text-sm text-destructive">
                        {
                            errors.factoryId
                                .message
                        }
                    </p>
                )}
            </div>

            {/* Status */}

            <div className="space-y-2">
                <Label>
                    Status
                </Label>

                <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                        <Select
                            value={field.value}
                            onValueChange={
                                field.onChange
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                {productionLineStatus.map(
                                    (status) => (
                                        <SelectItem
                                            key={
                                                status
                                            }
                                            value={
                                                status
                                            }
                                        >
                                            {status}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    )}
                />
            </div>

            {/* Description */}

            <div className="space-y-2">
                <Label htmlFor="description">
                    Description
                </Label>

                <Textarea
                    id="description"
                    placeholder="Optional description..."
                    {...register(
                        "description"
                    )}
                />

                {errors.description && (
                    <p className="text-sm text-destructive">
                        {
                            errors.description
                                .message
                        }
                    </p>
                )}
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full"
            >
                {loading
                    ? "Saving..."
                    : submitText}
            </Button>
        </form>
    );
}