"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth/auth"));
const user_1 = __importDefault(require("./routes/user/user"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router = (0, express_1.default)();
const port = process.env.PORT || 4000;
const secret = process.env.JWT_SECRET;
const corsOptions = {
    credentials: true,
    origin: true,
};
router.use(express_1.default.json());
router.use((0, cors_1.default)(corsOptions));
router.options('*', (0, cors_1.default)(corsOptions));
router.use((0, express_session_1.default)({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30
    },
}));
router.use((0, cookie_parser_1.default)());
router.use('/api/v1/auth', auth_1.default);
router.use('/api/v1/user', user_1.default);
router.listen(port);
console.log('Backend running on port:', port);
exports.default = router;
