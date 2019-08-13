import React, {Component, Fragment} from 'react';
import {Form, FormGroup, Label, FormText, InputGroup, InputGroupAddon, Button, Spinner, Fade} from 'reactstrap';
import TypeaheadSearch from './TypeaheadSearch.js'

import styles from './SchoolsList.module.scss';
import School from './School.js';


// -------------------------------------------------------------

const api = `http://localhost:3000/api/v1`

const userId = 1
const schoolId = 2
const schoolsLimit = `?limit=10`

const usersRoute = `${api}/users`
const userRoute = `${usersRoute}/${userId}`
// const schoolsRoute = `${api}/schools${schoolsLimit}`
const schoolsRoute = `${api}/schools`
// const schoolRoute = `${schoolsRoute}/${schoolId}`
const todosRoute = `${api}/todos`
const userSchoolsRoute = `${api}/user_schools`

// -------------------------------------------------------------

class SchoolsList extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      fadeIn: true,
      allSchools: [],
      userSchools: [],
      userTodos: [],
      selectedSchool: null
    }
  }

  componentDidMount() {
    fetch(schoolsRoute)
    .then(resp => resp.json())
    .then(schools => {
      this.setState({ 
        loading: false,
        allSchools: schools // TODO: Filter out schools from userSchools 
      })
    })

    fetch(userRoute)
    .then(resp => resp.json())
    .then(data => {
      this.setState({ 
        userSchools: data.schools,
        userTodos: data.todos
      })
    })
  }

  addSchool = (e, userId) => {
    e.preventDefault()

    const form = e.target
    // This is definitely not how Typeahead is supposed to work and I'm ashamed of myself.
    const selection = form.querySelector('.rbt-input-main').value

    const {allSchools, userSchools} = this.state
    const newSchool = allSchools.find(school => school.name === selection)
    const schoolId = newSchool.id

    // Don't let a user add a school twice
    if (userSchools.find(school => (school.id === newSchool.id))) {
      alert("School already added!")
      form.querySelector('.rbt-input-main').value = ""
      // Now figure out how to clear this form
      return
    }

    this.createDefaultTodos(schoolId)

    this.setState({
      allSchools: allSchools.filter(school => school.id !== schoolId),
      userSchools: [...userSchools, allSchools[schoolId-1]],
    })

    fetch(userSchoolsRoute, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_school: {
          school_id: schoolId,
          user_id: userId
        }
      })
    })
    .then(resp => resp.json)
    .then(data => console.log(data))
    .catch(error => console.log(error))

    form.reset()
  }

  createDefaultTodos = (schoolId) => {
    const tasks = [
      "Request Recs", "Send Recs", "Send Essay", "Follow Up", "Send Secondary", "Interview", "Send Thank Yous"
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

    fetch(todosRoute, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(todo)
    })
    .then(resp => resp.json())
    .then(todo => {
      this.setState({
        userTodos: [...this.state.userTodos, todo]
      })
    })
    .catch(error => console.log(error))
  }

  renderSchool = school => {
    let userTodos = this.state.userTodos.filter(todo => {
      return todo.school_id === school.id
    })

    console.log(school)
    
    return (
      <School 
        key={school.id} 
        school={school} 
        todos={userTodos} 
        selectSchool={this.selectSchool} 
      />
    )
  }

  selectSchool = id => this.setState({ selectedSchool: id })

  render() {
    const {userSchools, searchedSchool, selectedSchool} = this.state
    //let school = userSchools.find(school => school.id === selectedSchool)

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
            <Fade in={this.state.fadeIn} className={styles.searchInput}>
              <Form onSubmit={(e) => this.addSchool(e, userId)}>
                <InputGroup>
                  <TypeaheadSearch options={this.state.allSchools}/>
                  <InputGroupAddon addonType="append">
                  <Button type="submit" color="secondary">Add School</Button>
                  </InputGroupAddon>
                </InputGroup>
              </Form>
            </Fade>

            {/* {selectedSchool === null ? userSchools.map(i => this.renderSchool(i)) : this.renderSchool(school)} */}
            {userSchools.map(userSchool => this.renderSchool(userSchool))}
          </Fragment>
        }
      </div>
    )
  }
}

export default SchoolsList


