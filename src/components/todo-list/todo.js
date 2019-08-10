import React from 'react';
import Moment from 'react-moment';
import styles from './todo-list.module.scss';
import {Button} from 'reactstrap';

function Todo(props) {
  const {todo} = props

  return (
    <div className={styles.toDoTableRow}>
      <span>{todo.task}</span> 
      <span>{todo.done === false ? <Button color="secondary" size="sm">Mark Complete</Button> : "Done!"}</span> 
      <span>{todo.note || "note"}</span> 
      <span><Moment format="YYYY/MM/DD">{todo.due}</Moment></span>
    </div>
  )
}

export default Todo