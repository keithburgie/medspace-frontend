import React, { Component, Fragment } from 'react';
import {Fade} from 'reactstrap';
import API from '../routes'
import { Link } from 'react-router-dom'
// import styles from './SchoolPage.module.scss';
// import TodoList from './TodoList.js'

class SchoolPage extends Component {

  state = {
    user_school: {},
    school: {}
  }

  componentDidMount() {
    // match and params are passed to all routes from router
    const {match: { params }} = this.props

    API.get(`/user_schools/${params.user_school_id}`)
    .then(({data}) => {
      this.setState({ 
        user_school: data,
        school: data.school
      })
    })
  }

  render() {
    return (
      <Fade>
        <h1><Link to={"/dashboard"}> &lt;&lt; Back </Link> | {this.state.school.name}</h1>
      </Fade>
    )
  }
}

export default SchoolPage;

