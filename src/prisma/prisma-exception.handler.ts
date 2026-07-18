import { ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export function handlePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        throw new ConflictException('Email already exists.');

      default:
        throw error;
    }
  }

  throw error;
}
