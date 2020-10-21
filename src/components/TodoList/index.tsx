import React from 'react';
import { TodoListProps, TodoListState, Todo, FilterOptions } from './interface';
import TodoStore from './todoStore';
import TodoItem from './todoItem';
import cx from 'classnames'

const Filters = {
    completed: (todo: Todo) => todo.completed,
    active: (todo: Todo) => !todo.completed,
    all: (todo: Todo) => true
}

export default class TodoList extends React.Component<TodoListProps, TodoListState> {
    private store: TodoStore = new TodoStore()
    private toggleTodo: (todo: Todo) => void = this.store.toggleTodo.bind(this.store)
    private destroyTodo: (todo: Todo) => void = this.store.removeTodo.bind(this.store)
    private updateTitle: (todo: Todo, title: string) => void = this.store.updateTitle.bind(this.store)
    private clearCompleted: () => void =  this.store.clearCompleted.bind(this.store)

    constructor(props: TodoListProps) {
        super(props)

        this.state = {
            todos: [],
            newTodo: '',
            filter: 'all'
        }

        this.store.onChange(({todos}) => this.setState({todos}))
    }
    
    get remainingCount (): number {
        return this.state.todos.reduce((count, todo) => !todo.completed ? count + 1 : count, 0)
    }
    
    get completedCount (): number {
        return this.state.todos.reduce((count, todo) => todo.completed ? count + 1 : count, 0)
    }    

    updateNewTodo = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({ newTodo: (e.target as HTMLInputElement).value })
    }
    
    addTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        this.store.addTodo(this.state.newTodo)
        this.setState({ newTodo: '' })
      }
    }
    
    toggle = (e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLLabelElement>) => {
      console.log("Wesh!")
      this.store.toggleAll(this.remainingCount > 0)
    }
    
    setFilter = (filter: FilterOptions) => {
      return (e: React.MouseEvent<HTMLElement>) => {
        this.setState({ filter })
      }
    }

    render() {
        let { todos, newTodo, filter } = this.state
        let todosFiltered = todos.filter(Filters[filter])
        let remainingCount = this.remainingCount
        let completedCount = this.completedCount
    
    return (<section className="todoapp">
        <header className="header">
            <h1>todos</h1>
            <input
              className="new-todo"
              value={newTodo}
              placeholder="What needs to be done?"
              onKeyPress={this.addTodo}
              onInput={this.updateNewTodo}/>
        </header>
        <section className="main">
            {todos.length > 0 && (<><input className="toggle-all" type="checkbox" checked={remainingCount === 0} /> <label onClick={this.toggle} htmlFor="toggle-all">Mark all as complete</label></>)}
        <ul className="todo-list">
          {todosFiltered.map(todo => {
            return <TodoItem
              todo={todo}
              key={todo._id}
              onToggle={this.toggleTodo}
              onDestroy={this.destroyTodo}
              onUpdate={this.updateTitle}
            />
          })}
        </ul>
      </section>
      {todos.length > 0 && (<footer className="footer">
        {remainingCount > 0 && <span
          className="todo-count"><strong>{remainingCount}</strong> item{remainingCount > 1 && 's'} left</span>}
        <ul className="filters">
          <li>
            <a href="#/" className={cx({ selected: filter === 'all' })} onClick={this.setFilter('all')}>All</a>
          </li>
          <li>
            <a href="#/active" className={cx({ selected: filter === 'active' })}
               onClick={this.setFilter('active')}>Active</a>
          </li>
          <li>
            <a href="#/completed" className={cx({ selected: filter === 'completed' })}
               onClick={this.setFilter('completed')}>Completed</a>
          </li>
        </ul>
        {completedCount > 0 &&
        <button className="clear-completed" onClick={this.clearCompleted}>Clear completed</button>}
      </footer>)}
    </section>)
    }
}