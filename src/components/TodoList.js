import React, { Component } from 'react';
import API from '../routes'
import { Col, Row, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { FaPlus as FaAdd } from 'react-icons/fa';
import styles from './Todo.module.scss';
import Todo from './Todo.js';

class TodoList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      newTodo: '',
      newTodoDate: ''
    }
  }

  componentDidMount() {
    this.setState({
      todos: this.props.todos
    })
  }

  handleInput = (e) => {
    this.setState({newTodo: e.target.value})
  }
  handleDate = (e) => {
    this.setState({newTodoDate: e.target.value})
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.addTodo(this.props.user_school)
    this.setState({
      newTodo: '', 
      newTodoDate: ''
    }, e.target.querySelector('input').focus())
  }

  addTodo = (user_school_id) => {
    let todo = {
      user_school_id: user_school_id,
      task: this.state.newTodo,
      done: false,
      note: "",
      // Date is one day behind...
      due: this.state.newTodoDate
    }

    API.post(`todos`, todo)
    .then(todo => { 
      console.log("addTodo:", todo)
      this.setState({
        todos: [...this.state.todos, todo.data]
      })
    })
  }

  deleteTodo = (event) => {
    const target = event.target.closest('button')
    const id = target.dataset.id
    const todo = target.closest('[data-todo]')

    API.delete(`todos/${id}`)
    .then(res => {
      todo.style.opacity = '0';
      setTimeout(() => todo.remove(), 500)
    })
  }

  render() {

    return (
      <div className={styles.todoList}>

        {this.state.todos.map(todo => {
          return (
            <Todo key={todo.id} todo={todo} deleteTodo={this.deleteTodo} />
          )
        })}

        <Form className={styles.newTodoForm} onSubmit={this.handleSubmit}>
          <FormGroup className={styles.formGroup}>
            <Label for="exampleText">New Todo</Label>
            <Input 
              type="text"
              name="text"
              id="exampleText"
              value={this.state.newTodo}
              onChange={this.handleInput}
              placeholder="Add new todo..."
            />
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <Label for="exampleDate">Due Date</Label>
            <Input
              type="date"
              name="date"
              id="exampleDate"
              value={this.state.newTodoDate}
              onChange={this.handleDate}
              placeholder="date placeholder"
            />
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <Button type="submit"> <FaAdd/> New Todo </Button>
          </FormGroup>
        </Form> 
      </div>
    )
  }
}

export default TodoList;