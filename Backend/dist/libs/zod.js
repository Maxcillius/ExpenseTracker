"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSignup = exports.UserSignin = void 0;
const zod_1 = __importDefault(require("zod"));
const UserSignup = zod_1.default.object({
    name: zod_1.default.string(),
    password: zod_1.default.string().min(6).max(28),
    email: zod_1.default.string().email(),
});
exports.UserSignup = UserSignup;
const UserSignin = zod_1.default.object({
    password: zod_1.default.string().min(6).max(28),
    email: zod_1.default.string().email(),
});
exports.UserSignin = UserSignin;
