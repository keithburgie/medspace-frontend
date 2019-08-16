import React, {Component, Fragment} from 'react';
// import {Form, FormGroup, Label, FormText} from 'reactstrap';
import {Spinner, Fade, Button, InputGroup} from 'reactstrap';
// import TypeaheadSearch from './TypeaheadSearch.js'
import Select from "react-select-virtualized";

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
const usersUrl = `${api}/users`
const userUrl = `${usersUrl}/${user_id}`



// -------------------------------------------------------------

class SchoolsList extends Component {

  // constructor(props) {
  //   super(props);
    state = { 
      loading: true,
      user_schools: [],
      all_schools: [],
      //user_todos: [],
      fadeIn: true,
      selectedSchool: null,
      inputValue: '',
    }
  // }

  componentDidMount() {
    Promise.all([
      fetch(schoolsUrl), 
      fetch(userSchoolsUrl)
    ])
    .then(([all_schools_data, user_schools_data]) => {
      return Promise.all([all_schools_data.json(), user_schools_data.json()])
    })
    .then(([all_schools_data, user_schools_data]) => {
      const user_schools = user_schools_data.filter(user_school => {
        return user_school.user_id === user_id
      })
      this.setState({
        user_schools: [...this.state.user_schools, ...user_schools],
        all_schools: [...this.state.all_schools, ...all_schools_data]
      })
    })
  }

  deleteSchool = (e) => {
    const id = parseInt(e.target.dataset.id)
    fetch(`${userSchoolsUrl}/${id}`, {method: 'DELETE'})
    .then(r => r.json())
    .then(this.setState({
      user_schools: [...this.state.user_schools.filter(user_school => {
        return user_school.id !== id
      })]
    })).catch(error => console.log(error))
  }

  

  postSchool = (user_id) => {
    const user_school = {
      school_id: this.state.inputValue,
      user_id: user_id
    }
    return new Promise(function(resolve, reject) {
      resolve (
        // Post the new UserSchool
        fetch(userSchoolsUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user_school)
        })
        .then(r => r.json())
        .then(new_user_school => {
          return new_user_school.id
        })
        .catch(error => console.log(error))
      )
    })
  }

  createDefaultTodos = (user_school_id) => {
    const tasks = [
      "Request Recs", "Send Recs", "Send Essay", "Follow Up", 
      "Send Secondary", "Interview", "Send Thank Yous"
    ]
    const todos = tasks.map(async (task) => this.addTodo(task, user_school_id))

    return new Promise(function(resolve, reject) {
      resolve ( Promise.all(todos) )
    })
    
  }

  setSchool = (user_school_id) => {
    let school = user_school_id[0]
    let the = this
    return new Promise(function(resolve, reject) {
      resolve(
        // TODO: FIGURE OUT HOW TO FETCH *AFTER* ALL TODOS HAVE POSTED
        fetch(`${userSchoolsUrl}/${school}`)
        .then(r => r.json()
        .then(user_school => {
          the.setState({user_schools: [
            ...the.state.user_schools, user_school
          ]})
        }))
        .catch(error => console.log(error))
      )
    })
  }

  // addSchool(user_id) {
  //   return this.postSchool(user_id)
  //   .then(this.createDefaultTodos)
  //   .then(this.setSchool)
  // }

  addSchool = (user_id) => {
    const user_school = {
      school_id: this.state.inputValue,
      user_id: user_id
    }
    // Post the new UserSchool
    fetch(userSchoolsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user_school)
    })
    .then(r => r.json())
    .then(new_user_school => {
      this.setState({user_schools: [
        ...this.state.user_schools, new_user_school
      ]})
    })
    .catch(error => console.log(error))
  }


  addTodo = (task, user_school_id) => {
    let todo = {
      user_school_id: user_school_id,
      task: task,
      done: false,
      note: "",
      due: new Date().toISOString()
    }

    return fetch(todosUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(todo)
    })
    .then(r => r.json())
    .then(todo => {
      return user_school_id
    })
    .catch(error => console.log(error))
  }

  deleteTodo = (event) => {
    const delButton = event.target
    const todo_id = delButton.dataset.id
    fetch(`${todosUrl}/${todo_id}`, {method: 'DELETE'})
    .then(r => r.json())
    .then(data => {
      // TODO: DO THIS VIA STATE INSTEAD
      delButton.closest('div').remove()
    })
  }

  renderSchool = user_school => {
    const {all_schools} = this.state
    const school = all_schools.find(school => school.id === user_school.school_id)
    const todos = user_school.todos

    console.log("renderSchool() => ", school.name, " #", school.id)

    return (
      <School 
        key={school.id}
        user_school={user_school}
        school={school}
        todos={todos} 
        deleteSchool={this.deleteSchool}
        deleteTodo={this.deleteTodo}
        selectSchool={this.selectSchool} 
      />
    )
  }

  selectSchool = id => {
    console.log("School selected: ", id)
    // if (id !== null) {
    //   let selection = document.querySelector(`[data-id='${id}']`)
    //   selection.classList.add('selected')
    //   let schools = document.getElementById('school-list').querySelectorAll('.fade.show:not(.selected)')
    //   this.setState({ selectedSchool: id }, () => {
    //     for(let i = 0; i < schools.length; i++) {schools[i].setAttribute(
    //       "style", "opacity: 0; height: 0; padding: 0; margin: 0; transition: all .2s linear;"
    //     )}
    //   })
    // }
    // else {
    //   let selection = document.querySelector('.selected')
    //   selection.classList.remove('selected')
    //   let schools = document.getElementById('school-list').querySelectorAll('.fade.show:not(.selected)')
    //   this.setState({ selectedSchool: null }, () => {
    //     for(let i = 0; i < schools.length; i++) {schools[i].setAttribute(
    //       "style", "opacity: 100; height: auto; padding: 1em; margin: 0 1em 1em; transition: all .2s linear;"
    //     ) }
    //   })
    // }
    
  }

  handleSelectChange = (obj) => {
    this.setState({
      inputValue: obj.value
    })
  }

  render() {
    // let {user_schools, searchedSchool, selectedSchool, all_schools} = this.state
    let {user_schools, all_schools, selectedSchool} = this.state
    let school = user_schools.find(school => school.id === selectedSchool)

    // return (
    //     // Show call schools if no selected school : show only selection if made
    //     // <div id="school-list" className={styles.container}>
    //     <Fragment>
    //       {
    //         this.state.loading === true 
    //         ? 
    //         <Fade in={this.state.fadeIn}>
    //           <Spinner color="info" />
    //         </Fade>
    //         : 
    //         <Fragment>
    //           {/* <Fade in={this.state.fadeIn}> */}
    //             <InputGroup className={styles.selectInput}>
    //               <Select 
    //                 className={styles.searchInput} 
    //                 options={all_schools.map(school => {
    //                   return Object.assign({value: school.id, label: school.name})
    //                 })} 
    //                 onChange={this.handleSelectChange.bind(this)} 
    //               />
    //               <Button color="success" onClick={() => this.addSchool(user_id)}>Add School</Button>
    //             </InputGroup>
    //           {/* </Fade> */}

    //           {/* {selectedSchool === null ? user_schools.map(i => this.renderSchool(i)) : this.renderSchool(school)} */}
    //           {this.state.user_schools.map(school => this.renderSchool(school))}
    //         </Fragment>
    //       }
    //     </Fragment>
    // )
    return (
      <Fragment>

        <Select 
          className={styles.searchInput} 
          options={all_schools.map(school => ({ value: school.id, label: school.name }))} 
          onChange={this.handleSelectChange.bind(this)} 
        />
        <Button color="success" onClick={() => this.addSchool(user_id)}>Add School</Button>

        {user_schools.map(school => this.renderSchool(school))}

      </Fragment>
      )
  }
}

export default SchoolsList


