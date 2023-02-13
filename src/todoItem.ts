 class TodoItem {
    constructor(
        public id: number, 
        public task: String, 
        public complete: boolean = false) {
        // statment here 
    }
    public printDetails(): void {
        console.log(`${this.id}\t${this.task}${this.complete ? "\t(complete)" : ""}`);
    }
} 
export {TodoItem};
