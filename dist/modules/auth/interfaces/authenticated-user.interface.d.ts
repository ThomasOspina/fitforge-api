import { RoleType } from '@prisma/client';
export interface AuthenticatedUser {
    id: string;
    email: string;
    role: RoleType;
    firstName: string;
    lastName: string;
}
