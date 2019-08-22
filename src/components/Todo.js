import React, {Component} from 'react';
import API from '../routes'
import {Fade} from 'reactstrap';
import {FaRegCircle as FaNoCheck, FaRegCheckCircle as FaChecked, FaTimes } from 'react-icons/fa';
import Moment from 'react-moment';
import styles from './Todo.module.scss';
import {Button} from 'reactstrap';

class Todo extends Component {

  state = {
    id: '',
    task: '',
    done: false
  }

  componentDidMount() {
    const {todo} = this.props
    this.setState({
      id: todo.id,
      task: todo.task,
      done: todo.done
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

  onChange = (event) => {
    this.setState({task: event.target.value})
    event.target.nextSibling.style.display = 'inline-block'
  }

  handleSubmit = (event) => {
    event.preventDefault()
    API.patch(`todos/${this.state.id}`, {task: this.state.task})
    event.target.lastChild.style.display = 'none'
  }

  render() {
    const {todo, deleteTodo} = this.props

    const calendarStrings = {
      lastDay : '[Yesterday]',
      sameDay : '[Today]',
      nextDay : '[Tomorrow]',
      lastWeek : '[last] dddd',
      nextWeek : 'dddd'
  };

    return (
      <Fade data-todo className={styles.todo}>

        <div className={styles.todoGroup}>

          {/* <span className={styles.taskGroup}> */}

            <span data-done={this.state.done} className={styles.checkbox}  >
              { this.state.done 
                ? <FaChecked onClick={() => this.toggleDone(todo.id)} /> 
                : <FaNoCheck onClick={() => this.toggleDone(todo.id)} />
              }
            </span>

            <form className={styles.todoForm} onSubmit={this.handleSubmit.bind(this)}>
              <textarea 
                className={styles.todoInput}
                onChange={this.onChange}
                value={this.state.task} 
              />
              <input className={styles.hide} type="submit" value="save"/>
            </form>

          {/* </span>  */}

          <Button data-id={todo.id} onClick={deleteTodo} color="link" size="lg" className={styles.delete}><FaTimes /></Button>
        </div>

        <small className={styles.dueDate}>Due <Moment calendar={calendarStrings}>{todo.due}</Moment></small>

      </Fade>
    )
  }
}

export default Todo