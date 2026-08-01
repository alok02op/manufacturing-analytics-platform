import { UserRole } from "@/generated/prisma/enums.js";

export const Roles = {
    ADMIN: UserRole.ADMIN,
    MANAGER: UserRole.MANAGER,
    ENGINEER: UserRole.ENGINEER,
} as const;