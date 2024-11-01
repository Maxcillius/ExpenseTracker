"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
function SignJWT(user) {
    const token = jsonwebtoken_1.default.sign(user, secret, { expiresIn: '780h' });
    return token;
}
function VerifyJWT(token) {
    const isValid = jsonwebtoken_1.default.verify(token, secret);
    if (isValid)
        return true;
    else
        return false;
}
