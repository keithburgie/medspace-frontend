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
    this.createDefaultTodos(id)

    this.setState({
      // Remove added school from array of all schools
      allSchools: allSchools.filter(school => school.id !== id),

      // Add new school to user's school array
      schools: [...schools, newSchool],
    })
  }

  createDefaultTodos = (schoolId) => {
    const tasks = [
      "Request Recs", "Send Recs", "Send Essay", "Follow Up", 
      "Send Secondary", "Interview", "Send Thank Yous"
    ]

    tasks.map(task => {
      return this.addTodo(task, schoolId)
    })
  }

  addTodo = (task, schoolId) => {
    let todo = {
      user_id: userId,
      school_id: schoolId,
      task: task,
      done: false,
      note: "",
      due: new Date().toISOString()
    }

    fetch(todosUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(todo)
    })
    .then(resp => resp.json())
    .then(todo => {
      this.setState({
        todos: [...this.state.todos.concat(todo)]
      })
    })
    .catch(error => console.log(error))
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


