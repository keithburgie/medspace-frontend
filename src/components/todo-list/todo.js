import React from 'react';
import styles from './todo-list.module.scss';
import {Button} from 'reactstrap';

function Todo(props) {
  const {todo} = props

  return (
    <div className={styles.toDoTableRow}>
      <span>{todo.task}</span> 
      <span>{todo.done === false ? <Button color="secondary" size="sm">Mark Complete</Button> : "Done!"}</span> 
      <span>{todo.note || "note"}</span> 
      <span>{todo.due}</span>
    </div>
  )
}

export default Todo