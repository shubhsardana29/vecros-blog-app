"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenBlacklist_1 = require("../utils/tokenBlacklist");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('Full Authorization Header:', authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    if ((0, tokenBlacklist_1.isBlacklisted)(token)) {
        return res.status(401).json({ error: 'Token has been invalidated' });
    }
    try {
        console.log('Received token:', token);
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log('Decoded JWT:', decoded);
        // Log token details
        console.log('Token details:', {
            userId: decoded.userId,
            issuedAt: decoded.iat ? new Date(decoded.iat * 1000).toISOString() : 'Not available',
            expiresAt: decoded.exp ? new Date(decoded.exp * 1000).toISOString() : 'Not available',
            currentTime: new Date().toISOString()
        });
        // Check if token is expired (if exp is present)
        if (decoded.exp && decoded.exp < Date.now() / 1000) {
            return res.status(401).json({ error: 'Token has expired' });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=authMiddleware.js.map