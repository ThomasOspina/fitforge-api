"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    app: {
        port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    },
    database: {
        url: process.env.DATABASE_URL,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    },
});
//# sourceMappingURL=configuration.js.map