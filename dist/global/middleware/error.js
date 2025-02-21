"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorGuard = void 0;
const ErrorGuard = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
};
exports.ErrorGuard = ErrorGuard;
//# sourceMappingURL=error.js.map