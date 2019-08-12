// component-name-container.js is your business logic and state management as handled before being sent to the stateless view Template.
import React, {Component} from 'react';
import {Button} from 'reactstrap';
import styles from './SchoolsList.module.scss'
import School from './School.js';

const userId = 1
const userUrl = `http://localhost:3000/api/v1/users/${userId}`

const schoolId = 2
const schoolsUrl = `http://localhost:3000/api/v1/schools`

class SchoolsList extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      allSchools: [],
      schools: [],
      todos: [],
      selectedSchool: null
    }
  }

  componentDidMount() {
    fetch(userUrl).then(r => r.json()).then(data => {
      this.setState({ 
        schools: data.schools,
        todos: data.todos
      })
    })

    // Probably temporarily double fetch
    // SLOOOWWWW. Don't click new school too soon!
    fetch(schoolsUrl).then(r => r.json()).then(schools => {
      this.setState({ 
        allSchools: schools.slice(0,10)
      })
    })
  }

  addNewSchool = (id) => {
    const {allSchools, schools, todos} = this.state
    const newSchool = allSchools[id]
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

    const defaultTodos = tasks.map(task => this.addTodo(task, schoolId))

    fetch(userUrl, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(defaultTodos)
    })
    .then(r => r.json())
    .then(this.setState({
        // TODO: Make sure this is adding the correct way
        todos: [...this.state.todos.concat(defaultTodos)]
      })
    )
    //.then(data => console.log(data))
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
    return todo
  }

  renderSchool = s => <School key={s.id} school={s} todos={this.state.todos} selectSchool={this.selectSchool} />
  selectSchool = id => this.setState({ selectedSchool: id })

  render() {
    const {schools, todos, selectedSchool} = this.state
    let school = schools.find(school => school.id === selectedSchool)

    return (
      // Show call schools if no selected school : show only selection if made
      <div className={styles.container}>
        {/* {selectedSchool === null ? schools.map(i => this.renderSchool(i)) : this.renderSchool(school)} */}
        {schools.map(school => this.renderSchool(school))}

        <Button color="secondary" onClick={() => this.addNewSchool(schoolId)}>Add School</Button>
      </div>
    )
  }
}

export default SchoolsList


