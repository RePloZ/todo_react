export interface Todo {
    _id: number,
    title: string,
    completed: boolean
}

export interface TodoItemProps {
    todo: Todo,
    key: number
    onToggle: (todo: Todo) => void
    onDestroy: (todo: Todo) => void
    onUpdate: (todo: Todo, title: string) => void
}

export interface TodoListProps {}

export type FilterOptions = 'all' | 'completed' | 'active'

export interface TodoListState {
    todos: Todo[],
    newTodo: string,
    filter: FilterOptions
}