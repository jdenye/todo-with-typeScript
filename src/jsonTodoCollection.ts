import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

type schemaType = {
    tasks: { 
        id: number; 
        task: string; 
        complete: boolean;
    }[]
};

export class JsonTodoCollection extends TodoCollection {

    private database: lowdb.LowdbSync<schemaType>;

    constructor(public username: string, todoItems: TodoItem[] = []) {
        super(username, []);
        this.database = lowdb(new FileSync("Todos.json"));

        if (this.database.has("tasks").value()) {
            let dbItems = this.database.get("tasks").value();
            dbItems.forEach(item => this.itemMap.set(item.id, new TodoItem(item.id, item.task, item.complete)));
        }
        else {
            this.database.set("tasks", todoItems).write();
            todoItems.forEach(item => this.itemMap.set(item.id, item));
        }
    }

    addTodo(task: string): number {
        let result = super.addTodo(task);
        this.storeTasks();
        return result;
    }

    markCompleted(id: number, completed: boolean): void {
        super.markCompleted(id, completed);
        this.storeTasks();
    }

    removeComplete(): void {
        super.removeComplete();
        this.storeTasks();
    }

    private storeTasks() {
        this.database.set("tasks", [...this.itemMap.values()]).write();
    }
}
