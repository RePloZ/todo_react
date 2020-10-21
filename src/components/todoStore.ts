import { Todo } from "./interface";

export default class TodoStore {
    public todos: Todo[] = []
    
    addTodo (title: string): void {
        this.todos = [{title, completed: false, _id: Math.floor(Math.random() * 1000000)}, ...this.todos]
    }
    removeTodo (todo: Todo): void {
        this.todos = this.todos.filter(t => t !== todo);
    }
    toggle (todo:Todo, completed = true): void {
        this.todos = this.todos.map(t => t === todo ? {...t, completed} : t);
    }
    
    toggleAll (completed = true): void {
        this.todos = this.todos.map(t => completed !== t.completed ? {...t, completed} : t);
    }
    
    updateTitle (todo: Todo, title: string): void {
        this.todos = this.todos.map(t => t === todo ? {...todo, title} : todo);
    }
    
    cleanTodo (): void {
        this.todos = this.todos.filter(t => !t.completed);
    }
}