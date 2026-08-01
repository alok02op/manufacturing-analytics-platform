import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    registerSchema,
    type RegisterFormData,
} from "@/lib/validations/auth";

import { UserRole } from "@/types/auth.types";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function RegisterForm() {
    const { registerUser } = useAuth();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: UserRole.ENGINEER,
        },
    });

    async function onSubmit(data: RegisterFormData) {
        await registerUser({
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center text-2xl">
                    Register
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="space-y-2">
                        <Label>Name</Label>

                        <Input
                            placeholder="Enter name"
                            {...register("name")}
                        />

                        <p className="text-sm text-red-500">
                            {errors.name?.message}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label>Email</Label>

                        <Input
                            type="email"
                            placeholder="Enter email"
                            {...register("email")}
                        />

                        <p className="text-sm text-red-500">
                            {errors.email?.message}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label>Password</Label>

                        <Input
                            type="password"
                            placeholder="Password"
                            {...register("password")}
                        />

                        <p className="text-sm text-red-500">
                            {errors.password?.message}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label>Confirm Password</Label>

                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            {...register("confirmPassword")}
                        />

                        <p className="text-sm text-red-500">
                            {errors.confirmPassword?.message}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label>Role</Label>

                        <Select
                            defaultValue={UserRole.ENGINEER}
                            onValueChange={(value) =>
                                setValue(
                                    "role",
                                    value as RegisterFormData["role"]
                                )
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value={UserRole.ADMIN}>
                                    Admin
                                </SelectItem>

                                <SelectItem value={UserRole.MANAGER}>
                                    Manager
                                </SelectItem>

                                <SelectItem value={UserRole.ENGINEER}>
                                    Engineer
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <p className="text-sm text-red-500">
                            {errors.role?.message}
                        </p>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Registering..." : "Register"}
                    </Button>

                    <p className="text-center text-sm">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-primary hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}