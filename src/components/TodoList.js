import React, { Component } from 'react';
import API from '../routes'
import { FaPlus as FaAdd } from 'react-icons/fa';
import styles from './Todo.module.scss';
import Todo from './Todo.js';

class TodoList extends Component {

  addTodo = (task, user_school_id) => {
    let todo = {
      user_school_id: user_school_id,
      task: task,
      done: false,
      note: "",
      due: new Date().toISOString()
    }

    API.post(`todos`, todo)
    .then(todo => { console.log("addTodo:", todo.task) })
  }

  deleteTodo = (event) => {
    const target = event.target
    const id = target.dataset.id
    const todo = target.closest('[data-todo]')

    API.delete(`todos/${id}`)
    .then(res => {
      todo.style.opacity = '0';
      setTimeout(() => todo.remove(), 500)
    })
  }

  render() {

    const {todos, user_school: user_school_id} = this.props

    return (
      <div className={styles.toDoTable}>

        {todos.map(todo => {
          return (
            <Todo key={todo.id} 
              todo={todo} 
              deleteTodo={this.deleteTodo}
            />
          )
        })}

        <button onClick={() => this.addTodo("Test Todo", user_school_id)}>Add Todo <FaAdd /></button>

      </div>
    )
  }
}

export default TodoList;