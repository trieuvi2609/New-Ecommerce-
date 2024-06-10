"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
//CORS config
// app.use("*", cors(corsOptions))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origins", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
app.use(body_parser_1.default.json());
app.use(auth_1.default);
mongoose_1.default
    .connect("mongodb+srv://trieuvi-nodejs:Abc%400337489880@cluster0.2rkw1qz.mongodb.net/ecommerce")
    .then((result) => {
    app.listen(8080);
})
    .catch((err) => console.log(err));
