import React, {Component, Fragment} from 'react';
// import {Form, FormGroup, Label, FormText} from 'reactstrap';
import {Spinner, Fade, Button, InputGroup} from 'reactstrap';
// import TypeaheadSearch from './TypeaheadSearch.js'
import Select from 'react-select'

import styles from './SchoolsList.module.scss';
import School from './School.js';


// -------------------------------------------------------------

const api = `http://localhost:3000/api/v1`

const loggedInUser = 1
// const schoolId = 2
// const schoolsLimit = `?limit=10`

// const usersRoute = `${api}/users`
// const userRoute = `${usersRoute}/${loggedInUser}`
// const schoolsRoute = `${api}/schools${schoolsLimit}`
const schoolsRoute = `${api}/schools`
// const schoolRoute = `${schoolsRoute}/${schoolId}`
const todosRoute = `${api}/todos`
const userSchoolsRoute = `${api}/user_schools`

// -------------------------------------------------------------

class SchoolsList extends Component {

  // constructor(props) {
  //   super(props);
    state = { 
      loading: true,
      allSchools: [],
      userSchools: [],
      userTodos: [],
      fadeIn: true,
      selectedSchool: null,
      inputValue: '',
    }
  // }

  componentDidMount() {
    // Fetch all schools from API
    fetch(schoolsRoute)
    .then(resp => resp.json())
    .then(schools => this.transferSchools(schools))
  }

  transferSchools = (schools) => {
    // Move user's from "all" array to own
    let userSchools = []
    schools.filter(school => {
      if (school.users.some(user => user.id === loggedInUser)) {
        userSchools.push(school)
        schools.splice(school, 1)
      }
    })

    // Create array of all todos from user's schools
    let userTodos = userSchools.map(todo => todo.todos).flat()

    // Push data into state
    this.setState({
      loading: false,
      allSchools: [...this.state.allSchools, ...schools],
      userSchools: [...this.state.userSchools, ...userSchools],
      userTodos: [...this.state.userTodos, ...userTodos]
    })
  }

  addSchool = (loggedInUser) => {
    let schoolId = this.state.inputValue
    this.createDefaultTodos(schoolId)

    fetch(userSchoolsRoute, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_school: {
          school_id: schoolId,
          user_id: loggedInUser
        }
      })
    })
    .then(resp => resp.json)
    .then(data => console.log(data))
    .catch(error => console.log(error))

    let newSchool = this.state.allSchools.filter(school => school.id === schoolId)
    this.setState({
      userSchools: [...this.state.userSchools, ...newSchool],
    })
  }

  createDefaultTodos = (schoolId) => {
    const tasks = [
      "Request Recs", "Send Recs", "Send Essay", "Follow Up", 
      "Send Secondary", "Interview", "Send Thank Yous"
    ]
    tasks.map(task => this.addTodo(task, schoolId))
  }

  addTodo = (task, schoolId) => {
    let todo = {
      user_id: loggedInUser,
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

  selectSchool = id => {
    this.setState({ selectedSchool: id })
  }

  renderSchool = school => {
    let userTodos = this.state.userTodos.filter(todo => {
      return todo.school_id === school.id
    })

    console.log("renderSchool() : ", school.id)
    
    return (
      <School 
        key={school.id} 
        school={school} 
        todos={userTodos} 
        // selectSchool={this.selectSchool} 
      />
    )
  }

  
  selectChange = (obj) => {
    this.setState({
      inputValue: obj.value
    })
  }

  render() {
    // let {userSchools, searchedSchool, selectedSchool, allSchools} = this.state
    //let school = userSchools.find(school => school.id === selectedSchool)
    let {userSchools, allSchools} = this.state

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
            <Fade in={this.state.fadeIn}>
              <InputGroup>
                <Select 
                  className={styles.searchInput} 
                  options={allSchools.map(school => {
                    return Object.assign({value: school.id, label: school.name})
                  })} 
                  onChange={this.selectChange.bind(this)} 
                />
                <Button onClick={() => this.addSchool(loggedInUser)}>Add School</Button>
              </InputGroup>
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


