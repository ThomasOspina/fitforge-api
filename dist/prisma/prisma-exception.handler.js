"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePrismaError = handlePrismaError;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
function handlePrismaError(error) {
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002':
                throw new common_1.ConflictException('Email already exists.');
            default:
                throw error;
        }
    }
    throw error;
}
//# sourceMappingURL=prisma-exception.handler.js.map