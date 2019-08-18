import React, { Component } from 'react';
import {Collapse as SchoolBody, Fade as SchoolCard, Button} from 'reactstrap';
import {FaAngleDown, FaTimes as FaDelete } from 'react-icons/fa';
import styles from './School.module.scss';
import TodoList from './TodoList.js'

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
    this.setState({ status: 'Opening...' })
  }

  onExiting() { 
    console.log("closing")
    this.setState({ status: 'Closing...' })
  }

  onEntered() { this.setState({ status: 'Opened' }) }

  onExited() { this.setState({ status: 'Closed' }) }

  toggle() { this.setState({ collapse: !this.state.collapse }) }

  render() {
    let {school, todos, deleteSchool, user_school} = this.props
    let {fadeIn, collapse} = this.state

    return (
      <SchoolCard data-id={school.id} in={fadeIn} className={styles.schoolCard}>
        
        <header className={styles.collapseHeader}>
          <h3>{school.name.split(',')[0]}</h3>
          <div className={styles.buttonWrapper}>
            <button data-id={user_school.id}  onClick={deleteSchool}> <FaDelete /> </button>
            <button data-status={collapse ? "expand" : "collapse"} data-id={user_school.id} onClick={(e) => this.toggle(e)}> <FaAngleDown/> </button>
          </div>
        </header>

        <SchoolBody isOpen={collapse} 
          onEntering={this.onEntering} 
          onEntered={this.onEntered}
          onExiting={this.onExiting} 
          onExited={this.onExited}>

          <p data-id={school.id} className={styles.small}>
            {school.city}, {school.state} | {school.program} Program
          </p>

          <TodoList key={school.id} user_school={user_school.id} todos={todos} />

        </SchoolBody>

      </SchoolCard>
    )
  }
}

export default School;

