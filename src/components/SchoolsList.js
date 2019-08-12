// component-name-container.js is your business logic and state management as handled before being sent to the stateless view Template.
import React, {Component, Fragment} from 'react';
import {Button, Spinner, Fade} from 'reactstrap';
import styles from './SchoolsList.module.scss'
import School from './School.js';

const userId = 1
const userUrl = `http://localhost:3000/api/v1/users/${userId}`

const schoolId = 2

const schoolsLimit = 10
const schoolsUrl = `http://localhost:3000/api/v1/schools?limit=${schoolsLimit}`

const todosUrl = `http://localhost:3000/api/v1/todos/`

class SchoolsList extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      fadeIn: true,
      allSchools: [],
      schools: [],
      todos: [],
      selectedSchool: null
    }
  }

  componentDidMount() {
    fetch(schoolsUrl).then(r => r.json()).then(schools => {
      this.setState({ 
        loading: false,
        allSchools: schools
      })
    })

    fetch(userUrl).then(r => r.json()).then(data => {
      this.setState({ 
        schools: data.schools,
        todos: data.todos
      })
    })
  }

  addSchool = (id) => {
    const {allSchools, schools} = this.state
    const newSchool = allSchools[id-1]
    const defaultTodos = this.createDefaultTodos(id)

    this.setState({

      // TODO: Make sure these are the best practice way to update state

      // Remove added school from array of all schools
      allSchools: allSchools.filter(school => school.id !== id),

      // Add new todos to old todos
      todos: [...this.state.todos.concat(defaultTodos)],

      // Add new school to user's school array
      schools: [...schools, newSchool],
    })
  }

  createDefaultTodos = (schoolId) => {
    const tasks = [
      "Request Recs YAY!", "Send Recs YAY!", "Send Essay YAY!", "Follow Up YAY!", 
      "Send Secondary YAY!", "Interview YAY!", "Send Thank Yous"
    ]

    const defaultTodos = tasks.map(task => {
      return this.addTodo(task, schoolId)
    })

    return defaultTodos
  }

  addTodo = (task, schoolId) => {
    const todo = {
      user_id: userId,
      school_id: schoolId,
      task: task,
      done: false,
      note: "",
      due: Date.now()
    }

    const configObj = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(todo)
    }

    fetch(todosUrl, configObj)
    .then(r => r.json())
    // .then(data => console.log(todo))
    .catch(error => console.log(error))

    return todo
  }

  renderSchool = school => {
    
    let todos = this.state.todos.filter(todo => {
      return todo.school_id === school.id
    })
    
    return (
      <School 
        key={school.id} 
        school={school} 
        todos={todos} 
        selectSchool={this.selectSchool} 
      />
    )
  }

  selectSchool = id => this.setState({ selectedSchool: id })

  render() {
    const {schools, selectedSchool} = this.state
    let school = schools.find(school => school.id === selectedSchool)

    return (
      // Show call schools if no selected school : show only selection if made
      <div className={styles.container}>
        {
          this.state.loading === true 
          ? 
            <Fade in={this.state.fadeIn}>
              <Spinner color="info" />
            </Fade>
          : 
          <Fragment>
            {/* {selectedSchool === null ? schools.map(i => this.renderSchool(i)) : this.renderSchool(school)} */}
            {schools.map(school => this.renderSchool(school))}
            <Fade in={this.state.fadeIn}>
              <Button color="secondary" onClick={() => this.addSchool(schoolId)}>Add School</Button>
            </Fade>
          </Fragment>
        }
        
        

        
      </div>
    )
  }
}

export default SchoolsList


