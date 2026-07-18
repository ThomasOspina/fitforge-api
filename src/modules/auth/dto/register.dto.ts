import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { GoalType, SexType } from '@prisma/client';

export class RegisterDto {
  @IsEmail()
  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  email: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number.',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  lastName: string;

  @IsDateString()
  birthDate: string;

  @IsEnum(SexType)
  sex: SexType;

  @IsNumber()
  @Min(50)
  @Max(250)
  heightCm: number;

  @IsNumber()
  @IsPositive()
  weightKg: number;

  @IsEnum(GoalType)
  goal: GoalType;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  targetWeightKg?: number;
}
