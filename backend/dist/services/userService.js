"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.getUserProfile = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const getUserProfile = (userId) => {
    return prismaClient_1.default.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true },
    });
};
exports.getUserProfile = getUserProfile;
const updateUserProfile = (userId, name, email) => {
    return prismaClient_1.default.user.update({
        where: { id: userId },
        data: { name, email },
        select: { id: true, name: true, email: true },
    });
};
exports.updateUserProfile = updateUserProfile;
//# sourceMappingURL=userService.js.map