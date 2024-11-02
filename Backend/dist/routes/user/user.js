"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expenses_1 = __importDefault(require("./expenses/expenses"));
const category_1 = __importDefault(require("./category/category"));
const app = (0, express_1.default)();
app.use('/expense', expenses_1.default);
app.use('/category', category_1.default);
exports.default = app;
