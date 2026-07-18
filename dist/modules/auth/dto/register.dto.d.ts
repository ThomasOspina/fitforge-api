import { GoalType, SexType } from '@prisma/client';
export declare class RegisterDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    sex: SexType;
    heightCm: number;
    weightKg: number;
    goal: GoalType;
    targetWeightKg?: number;
}
