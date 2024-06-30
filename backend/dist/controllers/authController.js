"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const authService = __importStar(require("../services/authService"));
const tokenBlacklist_1 = require("../utils/tokenBlacklist");
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await authService.registerUser(name, email, password);
        res.status(201).json({ message: 'User registered successfully', userId: user.id });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unexpected error occurred' });
        }
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.loginUser(email, password);
        res.json({ token });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ error: error.message });
        }
        else {
            res.status(401).json({ error: 'An unexpected error occurred' });
        }
    }
};
exports.login = login;
const logout = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        (0, tokenBlacklist_1.addToBlacklist)(token);
    }
    res.status(200).json({ message: 'Logged out successfully' });
};
exports.logout = logout;
//# sourceMappingURL=authController.js.map