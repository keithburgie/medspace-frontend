import React, {Component, Fragment} from 'react';
import API from '../routes'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import {Spinner, Fade, Button, ButtonGroup, Container, Row,  Col, Navbar, Nav, NavItem} from 'reactstrap';
import {FaPollH, FaPoll, FaFilter } from 'react-icons/fa';
import Select from "react-select-virtualized";
import styles from './SchoolsList.module.scss';
import SchoolCard from './SchoolCard.js';
import advice from '../assets/data/advice.json'

class SchoolsList extends Component {

    state = { 
      loading: true,
      user_schools: [],
      all_schools: [],
      fadeIn: true,
      inputValue: '',
      colView: true
    }
  

  componentDidMount = () => {
    // TODO: Importing axios twice via API. How to do .all and .spread with API?
    axios.all([
      API.get('schools'), API.get('user_schools')
    ])
    .then(axios.spread((all_schools_obj, user_schools_obj) => {
      const user_schools = user_schools_obj.data.filter(user_school => {
        // Return user_schools where user_id matches logged in user id
        return user_school.user_id === this.props.user.id
      })
      this.setState({
        user_schools: [...this.state.user_schools, ...user_schools],
        all_schools: [...this.state.all_schools, ...all_schools_obj.data],
        loading: false
      })
    }))
  }

  addSchool = (user_id) => {
    const user_school = {
      school_id: this.state.inputValue,
      user_id: user_id
    }
    API.post(`user_schools`, user_school)
    .then(user_school => { 
      this.setState({
        user_schools: [...this.state.user_schools, user_school.data]
      })
    })
  }

  deleteSchool = (event) => {
    const target = event.target
    const id = parseInt(target.closest('button').dataset.id)
    const school = target.closest('.fade')
    
    API.delete(`user_schools/${id}`)
    .then(res => {
      school.style.opacity = '0'
      setTimeout(() => {
        this.setState({
          user_schools: [...this.state.user_schools.filter(user_school => user_school.id !== id)]
        })
      }, 500)
    })
  }

  // scrollToEnd = () => {
  //   this.messagesEnd.scrollIntoView({behavior: "smooth"})
  // }

  renderSchool = user_school => {
    const {all_schools, colView} = this.state
    const school = all_schools.find(school => school.id === user_school.school_id)
    const todos = user_school.todos
    // this.scrollToEnd()

    console.log(`renderSchool() => ${school.name.split(" ")[0]}, #${school.id}`)

    return (
      <SchoolCard 
        key={school.id} 
        user_school={user_school} 
        school={school} 
        todos={todos} 
        deleteSchool={this.deleteSchool} 
        collapse={colView} 
      />
    )
  }

  colView = (view) => {
    this.setState({ colView: view })
  }

  // TODO: This errors when you try to clear the select menu
  schoolSelect = obj => obj.value 
  ? this.setState({ inputValue: obj.value}) 
  : this.setState({ inputValue: ''})

  render() {
    let {user_schools, all_schools, loading, colView} = this.state
    let randAdvice = advice[Math.floor(Math.random()*advice.length)]
  
    // let user_id = parseInt(localStorage.getItem('user_id'))

    return (
      <Container fluid>
        <Row>
          <Col>
            <Navbar className={styles.schoolsBar}>
              <Nav>
                <NavItem>
                  <ButtonGroup>
                    <Button color={colView ? "outline-info" : "info"} onClick={() => this.colView(false)}><FaPollH /></Button>
                    <Button color={colView ? "info" : "outline-info"} onClick={() => this.colView(true)}><FaPoll /></Button>
                  </ButtonGroup>
                </NavItem>
                <NavItem>
                  <Button color="outline-info"><FaFilter /> Filter</Button>
                </NavItem>
                <NavItem>
                  <Select 
                    className={styles.searchInput} 
                    options={all_schools.map(school => ({ value: school.id, label: school.name.slice(0,60) }))} 
                    onChange={this.schoolSelect.bind(this)} 
                    placeholder={"Search all schools..."}
                  />
                  <Button 
                    color="outline-info" 
                    onClick={() => this.addSchool(this.props.user.id)}>
                      Add School
                  </Button>
                </NavItem>
              </Nav>
            </Navbar>
          </Col>
        </Row>

        <Row data-layout={colView ? 'column' : 'row'}>
            { 
              loading 
              ? <Fade className={styles.loader}>
                  <Spinner color="warning" style={{ width: '10rem', height: '10rem' }} type="grow" />
                </Fade>
              : 
              user_schools.length ? user_schools.map(school => this.renderSchool(school)) 
              : 
                <Fade style={{width: '100%'}}>
                  <div className={styles.goodAdvice}>
                    {/* <h1>Add Some Schools!</h1> */}
                    <h2>{randAdvice.message} Also, add some schools to this page.</h2>
                    <h3>{randAdvice.details}</h3>
                  </div>
                </Fade>
            }
        </Row>
      </Container>
    )
  }
}

export default SchoolsList


