import React, { Component} from 'react';
import {Container, Row, Col, Fade} from 'reactstrap';
import API from '../routes'
import { Link } from 'react-router-dom'
import TodoList from './TodoList.js'
import EssayTabs from './EssayTabs.js'

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

    const {school, user_school, todos} = this.state

    return (
      <Container fluid>
        <Fade>
          <Row>
            <Col>
              <h1><Link to={"/dashboard"}> &lt;&lt; Back </Link> | {this.state.school.name}</h1>
            </Col>
          </Row>

          <Row>
            <Col sm={4}>
              <TodoList key={user_school.id} user_school={user_school} todos={todos} />
            </Col>
            <Col sm={8}>
              <h2>Essays</h2>
              <EssayTabs user_school={user_school} school={school} />
            </Col>
          </Row>
        </Fade>
      </Container>
    )
  }
}

export default SchoolPage;

