"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connection = async () => {
    try {
        const { connection: connect } = await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log(`mongoose ${connect.host}`);
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};
exports.default = connection;
//# sourceMappingURL=index.js.map