import React, { Component } from 'react';
import {Collapse as SchoolBody} from 'reactstrap';
import {Fade as SchoolWrapper } from 'reactstrap';
import styles from './School.module.scss';
import SchoolHeader from './SchoolHeader.js'
import TodoList from './TodoList.js'

// const api = `http://localhost:3000/api/v1`
// const userSchoolsRoute = `${api}/user_schools`

class School extends Component {

  constructor(props) {
    super(props);

    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = { 
      fadeIn: true,
      collapse: true,
      status: 'Opened'
    };
  }

  onEntering(e) { 
    console.log("entering")
    this.setState({ status: 'Opening...' }, this.props.selectSchool(parseInt(e.firstElementChild.dataset.id)))
  }
  onEntered() { 
    this.setState({ status: 'Opened' })
  }
  onExiting() { 
    console.log("closing")
    this.setState({ status: 'Closing...' }, this.props.selectSchool(null))
  }
  onExited() { 
    this.setState({ status: 'Closed' })
  }

  toggle() {
    this.setState({ 
      collapse: !this.state.collapse 
    })
    console.log("such toggle")
  }

  render() {
    let {school, todos, deleteSchool, deleteTodo, user_school} = this.props
    let {fadeIn, collapse} = this.state

    return (
      <SchoolWrapper data-id={school.id} in={fadeIn} className={styles.schoolWrapper}>
        
        <SchoolHeader 
          user_school={user_school}
          school={school}
          collapse={collapse} 
          toggle={this.toggle} 
          deleteSchool={deleteSchool}
        />

        <SchoolBody isOpen={collapse} 
          onEntering={this.onEntering} 
          onEntered={this.onEntered}
          onExiting={this.onExiting} 
          onExited={this.onExited}>

          <p data-id={school.id} className={styles.small}>
            {school.city}, {school.state} | {school.program} Program
          </p>

          <TodoList key={school.id} school={school} todos={todos} deleteTodo={deleteTodo} />

        </SchoolBody>

      </SchoolWrapper>
    )
  }
}

export default School;

