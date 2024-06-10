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
exports.login = exports.signup = void 0;
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user")); // Adjust the import path as necessary
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    const { email, userName, password } = req.body;
    try {
        const hashedPw = yield bcrypt_1.default.hash(password, 12);
        const user = new user_1.default({ email, password: hashedPw, userName });
        const result = yield user.save();
        res.status(201).json({ message: "User created!", userId: result._id, statusCode: 201 });
    }
    catch (err) {
        const customError = err;
        if (!customError.statusCode) {
            customError.statusCode = 500;
        }
        next(err);
    }
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            const error = new Error("A user with this email could not be found!");
            error.statusCode = 401;
            throw error;
        }
        const isEqual = yield bcrypt_1.default.compare(password, user.password);
        if (!isEqual) {
            const error = new Error("Wrong password!");
            error.statusCode = 401;
            throw error;
        }
        const token = jsonwebtoken_1.default.sign({
            email: user.email,
            userId: user._id.toString(),
        }, "somesupersecretsecret", { expiresIn: "1h" });
        const response = {
            token,
            userId: user._id.toString(),
            statusCode: 200,
            userName: user.userName
        };
        res.status(200).json(response);
    }
    catch (err) {
        const customError = err;
        if (!customError.statusCode) {
            customError.statusCode = 500;
        }
        next(err);
    }
});
exports.login = login;
