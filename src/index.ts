import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
//import * as inquirer from 'inquirer';
//import inquirer from 'inquirer';
const inquirer = require('inquirer');

let todos: TodoItem[] = [
    new TodoItem(1, "buy flowers"),
    new TodoItem(2, "Get shoes"),
    new TodoItem(3, "Collect tickets"),
    new TodoItem(4, "Call Joe", true)
];

let collection: TodoCollection = new TodoCollection("Adam", todos);
let showCompleted = true;

function displayTodoList(): void {
    console.clear();
    console.log(`${collection.username}'s Todo List`
        + `\t (${collection.getItemCount().incomplete} items to do)`);
    collection.getTodoItems(showCompleted).forEach(item => item.printDetails());
}

enum Commands {
    Add = "Add New Task",
    complete = "complete task",
    Toggle = "show / Hide complted",
    purge = "Remove completed task",
    Quit = "Quit"
}

function promptAdd(): void {
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
            promptUser
        })
}
function promptComplete(): void {
    console.clear();
    inquirer.prompt({
        type: "checkbox",
        name: "complete",
        message: "mark As completed",
        choices: collection.getTodoItems(showCompleted)
            .map(item => ({ name: item.task, value: item.id, checked: item.complete }))
    })
        .then(answers => {
            let completedTasks = answers["complete"] as number[];
            collection.getTodoItems(true).forEach(item => collection
                .markCompleted(item.id, completedTasks.find(id => id === item.id) != undefined));
            promptUser();
        })
}



function promptUser(): void {
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
            case Commands.Toggle: showCompleted = !showCompleted;
                promptUser();
                break;
            case Commands.Add: promptAdd();
                break;
            case Commands.complete: if (collection.getItemCount().incomplete > 0) {
                promptComplete();
            } else {
                promptUser();
            }
                break;
            case Commands.purge: collection.removeComplete();
                promptUser();
                break;
        }

    })
}
promptUser()
// let newId: number =collection.addTodo("Go for run");



