// component-name-container.js is your business logic and state management as handled before being sent to the stateless view Template.
import React from 'react';
import styles from './schools-list.module.scss';
import School from '../school';

class SchoolsList extends React.Component {

  state = {
    schools: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/users/1')
    .then(r => r.json())
    .then(data => {
      const userSchools = data.schools
      this.setState({ schools: userSchools })
    })
  }

  render() {
    return (
      this.state.schools.map(school => {
        return <School school={school} />
      })
    )
  }
}

export default SchoolsList


