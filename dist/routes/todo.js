"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let todos = [];
const router = express_1.default.Router();
router.get("/", (req, res, next) => {
    res.status(200).json({
        todos: todos,
    });
});
router.post("/todo", (req, res, next) => {
    const body = req.body;
    const newTodo = { id: new Date().toISOString(), text: body.text };
    todos.push(newTodo);
    res.status(201).json({ message: "Added todo", todo: newTodo, todos: todos });
});
router.put("/todo/:todoId", (req, res, next) => {
    const reqParams = req.params;
    const todoId = reqParams.todoId;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id === todoId);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        return res.status(200).json({ message: "Updated todo", todos: todos });
    }
    res.status(404).json({
        message: "Could not find todo for this id",
    });
});
router.delete("/todo/:todoId", (req, res, next) => {
    const reqParams = req.params;
    todos = todos.filter((todoItem) => todoItem.id !== reqParams.todoId);
    res.status(200).json({ message: "Deleted todo", todos: todos });
});
exports.default = router;
