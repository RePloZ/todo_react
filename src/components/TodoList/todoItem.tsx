import React, { FunctionComponent } from 'react';
import { TodoItemProps } from './interface';

const TodoItem : FunctionComponent<TodoItemProps> = ({todo, onToggle, onDestroy, onUpdate}) => (<li className={todo.completed ? "completed" : "" }>
    <div className="view">
        <input className="toggle" type="checkbox" checked={todo.completed} onChange={() => onToggle(todo)}/>
        <label>{todo.title}</label>
        <button onClick={() => onDestroy(todo)} className="destroy"/>
    </div>
</li>)

export default TodoItem;