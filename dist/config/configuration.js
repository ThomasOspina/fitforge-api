"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    app: {
        port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    },
    database: {
        url: process.env.DATABASE_URL,
    },
});
//# sourceMappingURL=configuration.js.map