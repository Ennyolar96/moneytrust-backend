"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModel = getModel;
const mongoose_1 = __importDefault(require("mongoose"));
function getModel(name, schema) {
    return mongoose_1.default.models[name] || mongoose_1.default.model(name, schema);
}
//# sourceMappingURL=model.factory.js.map