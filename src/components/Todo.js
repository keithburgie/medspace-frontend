import React, {PureComponent} from 'react';
import Moment from 'react-moment';
import styles from './Todo.module.scss';
import {Button} from 'reactstrap';

class Todo extends PureComponent {

  render() {

    const {todo, deleteTodo} = this.props

    return (
      <div data-todo className={styles.todo}>

        {/* <span className={styles.checkTodo}>
        {
          todo.done === false 
          ? <Button color="secondary" size="sm">⃠</Button> 
          : <Button color="success" size="sm">✓</Button>
        }
        </span> */}

        <div className={styles.todoGroup}>
          <h4>{todo.task}</h4> 
          <span className={styles.deleteTodo}>
            <Button data-id={todo.id} onClick={deleteTodo} color="danger" size="sm">✘</Button>
          </span>
        </div>

        <div className={styles.todoGroup}>
          <span>
            {todo.note || "(Note Here)"}
          </span> 
          <span>
            <Moment format="YYYY/MM/DD">{todo.due}</Moment>
          </span>
        </div>

      </div>
    )
  }
}

export default Todo