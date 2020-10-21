import { Todo } from "./interface";

export default class TodoStore {
    public todos: Todo[] = []
    
    addTodo (title: string): void {}
    removeTodo (todo: Todo): void {}
    toggle (todo:Todo, completed = true): void {}
    editTodo (todo: Todo, title: string): void {}
    cleanTodo (): void {}
}