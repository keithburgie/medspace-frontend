import React, { Component, Fragment } from 'react';
import {Container, Row, Col, Fade, Navbar, Nav, NavItem} from 'reactstrap';
import API from '../routes'
import { Link } from 'react-router-dom'
import TodoList from './TodoList.js'
import EssayTabs from './EssayTabs.js'
import styles from './SchoolPage.module.scss';

class SchoolPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_school: {},
      school: {},
      todos: []
    }
    this.handleChange = this.handleChange.bind(this)
  }
  

  componentDidMount() {
    // match and params are passed to all routes from router
    const {match: { params }} = this.props

    API.get(`/user_schools/${params.user_school_id}`)
    .then(({data}) => {
      this.setState({ 
        user_school: data,
        school: data.school,
        todos: data.todos
      })
    })
  }

  handleChange(value) {
    this.setState({ text: value })
  }


  render() {

    let {school, user_school, todos} = this.state

    return (
      <Fragment>
        <Navbar color="light" light expand="md" className={styles.subnav}>
          <Nav navbar>
            <NavItem><Link to={"/dashboard"}> &lt;&lt; Back </Link></NavItem>
            <NavItem><Link to={"#"}>{school.name}</Link></NavItem>
          </Nav>
        </Navbar>
        <Container fluid>
          <Fade>
            <Row>
              <Col sm={4} md={6}>
                <TodoList key={user_school.id} user_school={user_school.id} todos={todos} />
              </Col>
              <Col sm={8} md={6}>
                <EssayTabs user_school={user_school} school={school} />
              </Col>
            </Row>
          </Fade>
        </Container>
      </Fragment>
    )
  }
}

export default SchoolPage;

