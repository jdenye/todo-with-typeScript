"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const jsonTodoCollection_1 = require("./jsonTodoCollection");
const inquirer = require('inquirer');
let todos = [
    new todoItem_1.TodoItem(1, "buy flowers"),
    new todoItem_1.TodoItem(2, "Get shoes"),
    new todoItem_1.TodoItem(3, "Collect tickets"),
    new todoItem_1.TodoItem(4, "Call Joe", true)
];
let collection = new jsonTodoCollection_1.JsonTodoCollection("Adam", todos);
let showCompleted = true;
function displayTodoList() {
    console.clear();
    console.log(`${collection.username}'s Todo List`
        + `\t (${collection.getItemCount().incomplete} items to do)`);
    collection.getTodoItems(showCompleted).forEach(item => item.printDetails());
}
var Commands;
(function (Commands) {
    Commands["Add"] = "Add New Task";
    Commands["complete"] = "complete task";
    Commands["Toggle"] = "show / Hide complted";
    Commands["purge"] = "Remove completed task";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
function promptAdd() {
    console.clear();
    inquirer.prompt({
        type: "input",
        name: "add",
        message: "Enter task: ",
    })
        .then(answers => {
        if (answers["add"] !== "") {
            collection.addTodo(answers["add"]);
        }
        promptUser;
    });
}
function promptComplete() {
    console.clear();
    inquirer.prompt({
        type: "checkbox",
        name: "complete",
        message: "mark As completed",
        choices: collection.getTodoItems(showCompleted)
            .map(item => ({ name: item.task, value: item.id, checked: item.complete }))
    })
        .then(answers => {
        let completedTasks = answers["complete"];
        collection.getTodoItems(true).forEach(item => collection
            .markCompleted(item.id, completedTasks.find(id => id === item.id) != undefined));
        promptUser();
    });
}
function promptUser() {
    console.clear();
    displayTodoList();
    inquirer.prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        // badproperty : true,
        choices: Object.values(Commands)
    }).then(answers => {
        switch (answers["comand"]) {
            case Commands.Toggle:
                showCompleted = !showCompleted;
                promptUser();
                break;
            case Commands.Add:
                promptAdd();
                break;
            case Commands.complete:
                if (collection.getItemCount().incomplete > 0) {
                    promptComplete();
                }
                else {
                    promptUser();
                }
                break;
            case Commands.purge:
                collection.removeComplete();
                promptUser();
                break;
        }
    });
}
promptUser();
// let newId: number =collection.addTodo("Go for run");
