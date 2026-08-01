import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    loginSchema,
    type LoginFormData,
} from "@/lib/validations/auth";

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

export default function LoginForm() {
    const { loginUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(data: LoginFormData) {
        await loginUser(data);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center text-2xl">
                    Login
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="space-y-2">
                        <Label>Email</Label>

                        <Input
                            {...register("email")}
                            placeholder="Email"
                        />

                        <p className="text-sm text-red-500">
                            {errors.email?.message}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label>Password</Label>

                        <Input
                            type="password"
                            {...register("password")}
                            placeholder="Password"
                        />

                        <p className="text-sm text-red-500">
                            {errors.password?.message}
                        </p>
                    </div>

                    <Button
                        className="w-full"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </Button>

                    <p className="text-center text-sm">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-primary"
                        >
                            Register
                        </Link>
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}