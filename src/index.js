"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const todoCollection_1 = require("./todoCollection");
let todos = [
    new todoItem_1.TodoItem(1, "buy flowers"),
    new todoItem_1.TodoItem(2, "Get shoes"),
    new todoItem_1.TodoItem(3, "Collect tickets"),
    new todoItem_1.TodoItem(4, "Call Joe", true)
];
let collection = new todoCollection_1.TodoCollection("Adam", todos);
console.clear();
console.log(`${collection.username}'s Todo List`);
let newId = collection.addTodo("Go for run");
let todoItem = collection.getTodoById(newId);
console.log(JSON.stringify(todoItem));
