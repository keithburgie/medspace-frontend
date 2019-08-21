import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Collapse as SchoolBody, Fade as Card, Button, Col} from 'reactstrap';
import {FaTrashAlt } from 'react-icons/fa';
import styles from './SchoolsList.module.scss';
import TodoList from './TodoList.js'

class SchoolCard extends Component {

  state = { 
    fadeIn: true,
    // collapse: false,
    // status: 'Opened'
  }

  componentDidMount() {
    this.setState({
      collapse: !this.props.collapse
    })
  }

  // toggle(e) { 
  //   console.log(e)
  //   this.setState({ 
  //     collapse: !this.state.collapse 
  //   }) 
  // }

  render() {
    let {school, todos, deleteSchool, user_school, collapse} = this.props
    let {fadeIn } = this.state

    return (
      // <Col sm={6} md={4} xxl={3}>
      <Col className={styles.col}>
        <Card data-id={school.id} in={fadeIn} className={styles.schoolCard}>
        
          <header className={styles.cardCollapse}>

            <h3 className={styles.cardTitle}>
              <Link to={`/dashboard/${user_school.id}`}>
                {school.name.split(',')[0]}
              </Link>
            </h3>

            <span className={styles.columnHide}><strong>Next Task:</strong> {todos.find(todo => !todo.done).task}</span>
            <span className={styles.columnHide}>{todos.filter(todo => todo.done).length} of {todos.length} Tasks Complete</span>

            <div className={styles.buttonWrapper}>

              <Button color="danger" 
                data-id={user_school.id}  
                onClick={deleteSchool}> 
                <FaTrashAlt />
              </Button>

              {/* <Button color="secondary-outline" 
                data-status={collapse ? "expand" : "collapse"} 
                data-id={user_school.id} 
                onClick={(e) => this.toggle(e)}>
                <FaAngleDown />
              </Button> */}

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

