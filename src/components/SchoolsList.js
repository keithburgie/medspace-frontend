import React, {Component, Fragment} from 'react';
// import {Form, FormGroup, Label, FormText} from 'reactstrap';
import {Spinner, Fade, Button, InputGroup} from 'reactstrap';
// import TypeaheadSearch from './TypeaheadSearch.js'
import Select from 'react-select'

import styles from './SchoolsList.module.scss';
import School from './School.js';


// -------------------------------------------------------------

const api = `http://localhost:3000/api/v1`
const schoolsUrl = `${api}/schools`
const todosUrl = `${api}/todos`
const userSchoolsUrl = `${api}/user_schools`

const user_id = 1
// const schoolId = 2
// const schoolsLimit = `?limit=10`
// const schoolsUrl = `${api}/schools${schoolsLimit}`
// const schoolUrl = `${schoolsUrl}/${schoolId}`
// const usersUrl = `${api}/users`
// const userUrl = `${usersUrl}/${user_id}`



// -------------------------------------------------------------

class SchoolsList extends Component {

  // constructor(props) {
  //   super(props);
    state = { 
      loading: true,
      all_schools: [],
      user_schools: [],
      user_todos: [],
      fadeIn: true,
      selectedSchool: null,
      inputValue: '',
    }
  // }

  componentDidMount() {
    // Fetch all schools from API
    fetch(schoolsUrl)
    .then(resp => resp.json())
    .then(all_schools => {
      // Move user's from "all" array to own
      let user_schools = []
      all_schools.filter(school => {
        if (school.users.some(user => user.id === user_id)) {
          user_schools.push(school)
          all_schools.splice(school, 1)
        }
      })

      // Create array of all todos from user's schools
      let user_todos = user_schools.map(todo => todo.todos).flat()

      // Push data into state
      this.setState({
        loading: false,
        all_schools: [...this.state.all_schools, ...all_schools],
        user_schools: [...this.state.user_schools, ...user_schools],
        user_todos: [...this.state.user_todos, ...user_todos]
      })
    })
  }


  handleAddSchool = (user_id) => {
    console.log("Button clicked")
    let new_school_id = this.state.inputValue // the id number
    this.createDefaultTodos(new_school_id)

    fetch(userSchoolsUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_school: {
          school_id: new_school_id,
          user_id: user_id
        }
      })
    })
    .then(resp => resp.json())
    .then(userSchool => {

      let {all_schools, user_schools} = this.state

      // Find school in all_schools array
      let new_school = all_schools.find(school => school.id === userSchool.school_id)

      // Add found school to user_schools array // TODO: REMOVE SCHOOL FROM ALL_SCHOOLS
      this.setState({ 
        user_schools: [...user_schools, new_school] 
      },() => console.log("added userSchool ", userSchool))
    }).catch(error => console.log(error))
  }


  renderSchool = school => {
    let user_todos = this.state.user_todos.filter(todo => {
      return todo.school_id === school.id
    })

    // let find_user_school = school.user_schools.find(us => us.user_id === user_id)
    console.log('school', school)

    let user_school = school.user_schools[0].id
    console.log("user_school = ", user_school)
    console.log("renderSchool() : ", school.name, school.user_schools[0].id)

    return (
      <School 
        key={school.id}
        school={school}
        userSchool={user_school}
        todos={user_todos} 
        deleteSchool={this.deleteSchool}
        // selectSchool={this.selectSchool} 
      />
    )
  }

  deleteSchool = (e) => {
    let id = parseInt(e.target.dataset.id)
    fetch(`${userSchoolsUrl}/${id}`, {method: 'DELETE'})
    .then(resp => resp.json())
    .then(this.setState({
      user_schools: [...this.state.user_schools.filter(school => {
        return school.user_schools[0].id !== id
      })]
    }))
    .catch(error => console.log(error))
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
      user_id: user_id,
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
    .then(resp => resp.json)
    .then(todo => {
      this.setState({
        user_todos: [...this.state.user_todos, todo]
      })
    })
    .catch(error => console.log(error))
  }

  selectSchool = id => {
    this.setState({ selectedSchool: id })
  }

  handleSelectChange = (obj) => {
    this.setState({
      inputValue: obj.value
    })
  }

  render() {
    // let {user_schools, searchedSchool, selectedSchool, all_schools} = this.state
    //let school = user_schools.find(school => school.id === selectedSchool)
    let {user_schools, all_schools} = this.state

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
                  options={all_schools.map(school => {
                    return Object.assign({value: school.id, label: school.name})
                  })} 
                  onChange={this.handleSelectChange.bind(this)} 
                />
                <Button onClick={() => this.handleAddSchool(user_id)}>Add School</Button>
              </InputGroup>
            </Fade>

            {/* {selectedSchool === null ? user_schools.map(i => this.renderSchool(i)) : this.renderSchool(school)} */}
            {this.state.user_schools.map(school => this.renderSchool(school))}
          </Fragment>
        }
      </div>
    )
  }
}

export default SchoolsList


