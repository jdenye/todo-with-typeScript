import { TodoItem } from "./todoItem";
type ItemCount = {
    total: number,
    incomplete: number
}

class TodoCollection {
    private nextId: number = 1;
    private itemMap = new Map<number, TodoItem>();

    constructor(
        public username: String,
        public todoItems: TodoItem[] = []
    ) {
        todoItems.forEach(item => this.itemMap.set(item.id, item));
    }
    addTodo(task: String): number {
        while (this.getTodoById(this.nextId)) {
            this.nextId++;
        }
        this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));
        return this.nextId;
    }
    getTodoById(id: number): TodoItem {
        return this.itemMap.get(id);
    }
    getTodoItems(includeComplete: boolean): TodoItem[] {
        let sortedItems: TodoItem[] = [...this.itemMap.values()]
            .filter(item => includeComplete || !item.complete)
        return sortedItems;

    }
    markCompleted(id: number, complete: boolean) {
        const todoItem = this.getTodoById(id);
        if (todoItem) {
            todoItem.complete = complete;
        }
    }
    removeComplete() {
        this.itemMap.forEach(item => {
            if (item.complete) {
                this.itemMap.delete(item.id);
            }
        })
    }
    getItemCount(): ItemCount {
        return {
            total: this.itemMap.size,
            incomplete: this.getTodoItems(false).length
        };
    }

}

export{ TodoCollection };
