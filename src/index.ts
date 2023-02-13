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

enum Commands{
    Add = "Ad New Task",
    Toggle = "show / Hide complted",
    Quit = "Quit"
}

function promptAdd() :void{
    console.clear();
    inquirer.prompt({
        type: "input",
        name: "add",
        message: "Enter task: "
    })
    .then(answers => {if(answers["add"] !== ""){
        collection.addTodo(answers["add"]);
    }
    promptUser
})
} 
function promptUser(): void {
    console.clear();
    displayTodoList();
    inquirer.prompt({
    type: "list",
    name: "command",
    message: "Choose option",
    choices: Object.values(Commands)
    }).then(answers => {
        switch (answers["comand"]) {
            case Commands.Toggle: showCompleted = !showCompleted;
                promptUser()
                break;
            case Commands.Add: promptAdd();
            break;
        }
  
    })
    }
promptUser()
// let newId: number =collection.addTodo("Go for run");



