import React, {PureComponent} from 'react';
import Moment from 'react-moment';
import styles from './Todo.module.scss';
import {Button} from 'reactstrap';

class Todo extends PureComponent {

  render() {

    const {todo} = this.props
    return (
      <div className={styles.toDoTableRow}>
        <span>{todo.task}</span> 
        <span>{todo.done === false ? <Button color="secondary" size="sm">Mark Complete</Button> : "Done!"}</span> 
        <span>{todo.note || "note"}</span> 
        <span><Moment format="YYYY/MM/DD">{todo.due}</Moment></span>
      </div>
    )
  }
}

export default Todo