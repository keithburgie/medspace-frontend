import React, {Component} from 'react';
import API from '../routes'
import {Fade} from 'reactstrap';
import { FaEdit, FaSave, FaRegCircle as FaNoCheck, FaRegCheckCircle as FaChecked, FaTrashAlt } from 'react-icons/fa';
import Moment from 'react-moment';
import styles from './Todo.module.scss';
import {Button} from 'reactstrap';

class Todo extends Component {

  state = {
    done: false,
    editMode: false
  }

  componentDidMount() {
    this.setState({
      done: this.props.todo.done
    })
  }

  toggleEditMode = () => {
    this.setState({
      editMode: !this.state.editMode
    })
  }

  toggleDone = (todo) => {
    API.patch(`todos/${todo}`, {done: !this.state.done})
    .then(todo => {
      this.setState({
        done: todo.data.done
      })
    })
  }

  render() {
    const {todo, deleteTodo} = this.props

    return (
      <Fade data-todo className={styles.todo}>

        <div className={styles.todoGroup}>

          <h4>
            <span data-done={this.state.done} className={styles.checkbox} onClick={() => this.toggleDone(todo.id)} >
              {this.state.done ? <FaChecked /> : <FaNoCheck />}
            </span>

            {todo.task}
          </h4> 

          <span className={styles.deleteTodo}>
            <Button data-id={todo.id} onClick={deleteTodo} color="danger" size="sm"><FaEdit /></Button>
            <Button data-id={todo.id} onClick={deleteTodo} color="danger" size="sm"><FaTrashAlt /></Button>
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

      </Fade>
    )
  }
}

export default Todo