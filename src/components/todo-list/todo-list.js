import React, { Component } from 'react';
import styles from './todo-list.module.scss';
import Todo from './todo';

class TodoList extends Component {

  render() {

    const {todos, school} = this.props

    return (
      <div className={styles.toDoTable}>
        <div className={styles.toDoTableRow}>
          <span>Task:</span> 
          <span>Status:</span> 
          <span>Notes:</span> 
          <span>Due Date</span>
        </div>
        {todos.map(todo => {
          return todo.school_id === school.id ? <Todo key={todo.id} todo={todo} /> : null
        })}
      </div>
    )
  }
}

export default TodoList;

