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
const db_1 = __importDefault(require("../../libs/db"));
const zod_1 = require("../../libs/zod");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const router = express_1.default.Router();
// User signin route
router.post(('/user/signin'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const validate = zod_1.UserSignin.safeParse({
        email,
        password
    });
    if (!validate.success) {
        res.status(401).json({
            message: 'Credential format invalid'
        });
        return;
    }
    const userExist = yield db_1.default.user.findFirst({
        where: {
            email: email
        }
    });
    if (!userExist) {
        res.status(401).json({
            message: "User with this email does no exists"
        });
        return;
    }
    try {
        const response = yield db_1.default.user.findFirst({
            where: {
                email: email,
                password: password
            }
        });
        req.session.isLoggedIn = true;
        req.session.name = response === null || response === void 0 ? void 0 : response.name;
        req.session.userId = response === null || response === void 0 ? void 0 : response.id;
        req.session.email = response === null || response === void 0 ? void 0 : response.email;
        if (response) {
            res.status(200).json({
                message: 'Successfully logged in',
                user: {
                    uid: response.id,
                    name: response.name,
                    email: response.email
                }
            });
            return;
        }
        else {
            res.status(401).json({
                message: 'Wrong password'
            });
            return;
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Error while signing in'
        });
        return;
    }
}));
// User signup route
router.post(('/user/signup'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const validate = zod_1.UserSignup.safeParse({
        email,
        password,
        name
    });
    if (!validate.success) {
        res.status(401).json({
            message: 'Credential format invalid'
        });
        return;
    }
    const doesExist = yield db_1.default.user.findFirst({
        where: {
            email: email
        }
    });
    if (doesExist) {
        res.status(409).json({
            message: "User with this email already exists"
        });
        return;
    }
    try {
        const response = yield db_1.default.user.create({
            data: {
                name: name,
                email: email,
                password: password,
                created_at: new Date(),
                updated_at: new Date(),
            }
        });
        req.session.isLoggedIn = true;
        req.session.name = response === null || response === void 0 ? void 0 : response.name;
        req.session.userId = response === null || response === void 0 ? void 0 : response.id;
        req.session.email = response === null || response === void 0 ? void 0 : response.email;
        res.status(200).json({
            message: 'Successfully signed up',
            user: {
                uid: response.id,
                name: response.name,
                email: response.email
            }
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            message: 'Error while signing in',
            error: error
        });
        return;
    }
}));
router.get(('/user/signout'), (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.status(500).json({
                message: 'Error while logging out'
            });
            return;
        }
        else {
            res.clearCookie('connect.sid');
            res.status(200).json({
                message: "Logout successfully"
            });
            return;
        }
    });
});
router.get(('/user/authenticated'), authMiddleware_1.middleware, (req, res) => {
    res.json({
        isAuthenticated: true,
        user: {
            uid: req.session.userId,
            name: req.session.name,
            email: req.session.email
        }
    });
    return;
});
router.get(('/user/signout'), (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.status(500).json({
                message: 'Error while logging out'
            });
            return;
        }
        else {
            res.redirect('/');
            return;
        }
    });
});
exports.default = router;
