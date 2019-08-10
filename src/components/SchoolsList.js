// component-name-container.js is your business logic and state management as handled before being sent to the stateless view Template.
import React, {Component} from 'react';
import School from './School.js';

class SchoolsList extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      schools: [],
      todos: [],
      selectedSchool: null
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/users/1')
    .then(r => r.json()).then(data => {
      this.setState({ 
        schools: data.schools,
        todos: data.todos
      })
    })
  }

  selectSchool = (id) => this.setState({ selectedSchool: id })

  render() {
    const {schools, todos, selectedSchool} = this.state

    let school = schools.find(school => school.id === selectedSchool)

    return (
      selectedSchool === null ? 
        
      schools.map(school => {
          return (
            <School key={school.id} 
              todos={todos} 
              school={school} 
              selectSchool={this.selectSchool}
            />
          )
        })
      :
        <School key={school.id} 
          todos={todos} 
          school={school} 
          selectSchool={this.selectSchool}
        />
    )
  }
}

export default SchoolsList


