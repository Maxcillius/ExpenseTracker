"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../../../libs/db"));
const authMiddleware_1 = require("../../../middleware/authMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.middleware);
// Add the expense to the database
router.post(('/add'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, description, date, payment_method, category_id } = req.body;
    try {
        const response = yield db_1.default.expense.create({
            data: {
                user_id: req.session.userId,
                category_id: category_id,
                amount: amount,
                description: description,
                date: date,
                payment_method: payment_method,
                created_at: new Date(),
                updated_at: new Date(),
            }
        });
        res.send({
            message: 'Expense Added Successfully'
        });
        return;
    }
    catch (error) {
        res.status(500).send({
            message: 'Error while adding expense',
            error: error
        });
        return;
    }
}));
// Update the expense
router.post(('/update'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, description, date, payment_method } = req.body;
    try {
        yield db_1.default.expense.update({
            where: {
                user_id: 'id',
                id: 1
            },
            data: {
                amount: amount,
                description: description,
                date: date,
                payment_method: payment_method,
                updated_at: Date.now().toString()
            }
        });
        res.send({
            message: 'Expense updated successfully'
        });
        return;
    }
    catch (error) {
        res.status(500).send({
            message: 'Error while updating expense'
        });
        return;
    }
}));
// Delete the expense
router.post(('/delete'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const response = yield db_1.default.expense.delete({
            where: {
                id: id
            }
        });
        res.send({
            message: 'Expense deleted successfully'
        });
        return;
    }
    catch (error) {
        res.status(500).send({
            message: 'Error while deleting expense'
        });
        return;
    }
}));
router.get(('/getall'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.session.userId;
    try {
        const response = yield db_1.default.expense.findMany({
            where: {
                user_id: user_id
            }
        });
        res.send(response);
        return;
    }
    catch (error) {
        res.status(500).send({
            message: 'Error while fetching all expenses'
        });
        return;
    }
}));
exports.default = router;
