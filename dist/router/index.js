"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRoute = void 0;
const route_1 = __importDefault(require("./route"));
const applicationRoute = (app) => {
    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
    app.use("/api/v1", route_1.default);
};
exports.applicationRoute = applicationRoute;
//# sourceMappingURL=index.js.map