import React, { Component } from 'react';
import styles from './Todo.module.scss';
import Todo from './Todo.js';

class TodoList extends Component {

  render() {

    return (
      <div className={styles.toDoTable}>
        <div className={styles.toDoTableRow}>
          <span>Task:</span> 
          <span>Status:</span> 
          <span>Notes:</span> 
          <span>Due Date</span>
        </div>
        {this.props.todos.map(todo => {
          return <Todo key={todo.id} todo={todo} />
        })}
      </div>
    )
  }
}

export default TodoList;
