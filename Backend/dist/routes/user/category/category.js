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
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, color, user_id, is_default } = req.body;
        const doesExist = yield db_1.default.category.findFirst({
            where: {
                name: name,
                user_id: req.session.userId
            }
        });
        const colorExist = yield db_1.default.category.findFirst({
            where: {
                color: color,
                user_id: req.session.userId
            }
        });
        if (colorExist) {
            res.status(409).json({
                message: "Category with this color already exists"
            });
        }
        if (doesExist) {
            res.status(409).json({
                message: "Category with this name already exists"
            });
            return;
        }
        const response = yield db_1.default.category.create({
            data: {
                name: name,
                user_id: user_id,
                color: color,
                is_default: is_default,
                created_at: new Date(),
                updated_at: new Date(),
            }
        });
        res.status(200).json({
            message: 'Category added successfully'
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            message: 'Error while creating the category'
        });
        return;
    }
}));
// router.post('/update', async (req, res) => {
//     try {
//         const { name, color } = req.body
//         const response = await db.category.update({
//             where: {
//                 id: 'id'
//             },
//             data: {
//                 name: name,
//                 color: color,
//                 updated_at: Date.now().toString(),
//             }
//         })
//         res.json({
//             message: 'Category updated successfully'
//         })
//         return
//     } catch(error) {
//         res.status(500).json({
//             message: 'Error while updating the category'
//         })
//         return
//     }
// })
router.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.headers['id'];
    try {
        yield db_1.default.category.delete({
            where: {
                id: id
            }
        });
        res.status(200).json({
            message: 'Category deleted successfully'
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            message: 'Error while deleting the category'
        });
        return;
    }
}));
router.get('/getall', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.session.userId;
    try {
        const response = yield db_1.default.category.findMany({
            where: {
                user_id: user_id
            }
        });
        res.status(200).json(response);
        return;
    }
    catch (error) {
        res.status(500).json({
            message: 'Error while fetching the categories'
        });
        return;
    }
}));
exports.default = router;
