"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const entity_1 = require("@/app/auth/entity");
const mongoose_1 = require("mongoose");
const model_factory_1 = require("./model.factory");
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    companyName: { type: String, required: false },
    businessType: { type: String, required: false },
    dateOfIncorporate: { type: Date, required: false },
    role: { type: String, enum: Object.values(entity_1.Role), required: true },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: Number, required: true },
    verificationExpires: { type: Date, required: true },
}, {
    timestamps: true,
});
exports.User = (0, model_factory_1.getModel)("users", userSchema);
//# sourceMappingURL=user.model.js.map