import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Collapse as SchoolBody, Fade as Card, Button, Col} from 'reactstrap';
import {FaAngleDown, FaTrashAlt } from 'react-icons/fa';
import styles from './School.module.scss';
import TodoList from './TodoList.js'

class SchoolCard extends Component {

  state = { 
    fadeIn: true,
    collapse: true,
    status: 'Opened'
  }

  toggle() { 
    this.setState({ 
      collapse: !this.state.collapse 
    }) 
  }

  render() {
    let {school, todos, deleteSchool, user_school} = this.props
    let {fadeIn, collapse} = this.state

    return (
      <Col sm={6} md={4} xxl={3}>
        <Card data-id={school.id} in={fadeIn} className={styles.schoolCard}>
        
          <header className={styles.collapseHeader}>

            <h3>
              <Link to={`/dashboard/${user_school.id}`}>
                {school.name.split(',')[0]}
              </Link>
            </h3>

            <div className={styles.buttonWrapper}>

              <Button color="danger" 
                data-id={user_school.id}  
                onClick={deleteSchool}> 
                <FaTrashAlt />
              </Button>

              <Button color="secondary-outline" 
                data-status={collapse ? "expand" : "collapse"} 
                data-id={user_school.id} 
                onClick={(e) => this.toggle(e)}>
                <FaAngleDown />
              </Button>

            </div>

          </header>

          <SchoolBody isOpen={collapse}>

            <p data-id={school.id} className={styles.small}>
              {school.city}, {school.state} | {school.program} Program
            </p>

            <TodoList key={school.id} user_school={user_school.id} todos={todos} />

          </SchoolBody>

        </Card>
      </Col>
    )
  }
}

export default SchoolCard;

