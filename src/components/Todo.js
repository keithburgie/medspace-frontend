import React, {PureComponent} from 'react';
import Moment from 'react-moment';
import styles from './Todo.module.scss';
import {Button} from 'reactstrap';

class Todo extends PureComponent {

  render() {

    const {todo, deleteTodo} = this.props
    return (
      <div className={styles.toDoTableRow}>
        <span>{todo.task}</span> 
        <span>{todo.done === false ? <Button color="secondary" size="sm">Mark Complete</Button> : "Done!"}</span> 
        <span>{todo.note || "note"}</span> 
        <span><Moment format="YYYY/MM/DD">{todo.due}</Moment></span>
        <span className={styles.deleteTodo}><Button data-id={todo.id} onClick={deleteTodo} color="danger" size="sm">x</Button></span>
      </div>
    )
  }
}

export default Todo