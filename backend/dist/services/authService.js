"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const registerUser = async (name, email, password) => {
    const existingUser = await prismaClient_1.default.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error('Email already in use');
    }
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await prismaClient_1.default.user.create({
            data: { name, email, password: hashedPassword },
        });
        console.log('User created:', user);
        return user;
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await prismaClient_1.default.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const passwordMatch = await bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Invalid credentials');
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Generated token:', token);
    console.log('Token payload:', jsonwebtoken_1.default.decode(token));
    return token;
};
exports.loginUser = loginUser;
//# sourceMappingURL=authService.js.map