import { Todo } from "./interface";

declare type ChangeCallback = (store: TodoStore) => void

export default class TodoStore {
    public todos: Todo[] = []
    private callbacks: ChangeCallback[] = []

    addTodo (title: string): void {
        this.todos = [{title, completed: false, _id: Math.floor(Math.random() * 1000000)}, ...this.todos]
        this.inform()
    }
    removeTodo (todo: Todo): void {
        this.todos = this.todos.filter(t => t !== todo);
        this.inform()
    }
    toggleTodo (todo:Todo, completed = true): void {
        this.todos = this.todos.map(t => t === todo ? {...t, completed} : t);
        this.inform()    
    }
    
    toggleAll (completed = true): void {
        this.todos = this.todos.map(t => completed !== t.completed ? {...t, completed} : t);
        this.inform()
    }
    
    updateTitle (todo: Todo, title: string): void {
        this.todos = this.todos.map(t => t === todo ? {...todo, title} : todo);
        this.inform()
    }
    
    clearCompleted (): void {
        this.todos = this.todos.filter(t => !t.completed);
        this.inform()
    }
    /**
    * Informe les écouteurs d'un changement au sein du Store
    * */
    inform () {
        this.callbacks.forEach(cb => cb(this))
    }
    
    
    /**
    * Permet d'ajouter un écouteur
    * */
    onChange (cb: ChangeCallback) { this.callbacks.push(cb) }
}