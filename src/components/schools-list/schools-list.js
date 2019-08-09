// component-name-container.js is your business logic and state management as handled before being sent to the stateless view Template.
import React, {Component} from 'react';
import {Fade} from 'reactstrap';
// import styles from './schools-list.module.scss';
import School from '../school';

class SchoolsList extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      fadeIn: true,
      selectedIndex: null,
      schools: [],
      todos: []
    }
    //this.toggle = this.toggle.bind(this);
}

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/users/1')
    .then(r => r.json())
    .then(data => {
      this.setState({ 
        schools: data.schools,
        todos: data.todos
      })
    })
  }

  fadeSiblings = (e) => {
    this.setState({
      selectedIndex: e.target.dataset.id
    },() => {
      // figure out how to fade out items where data-key != selectedIndex
      console.log(this.state.selectedIndex)
    })
  }

  render() {

    const {fadeIn, schools, todos} = this.state
    return (
      schools.map(school => {
        return (
          <Fade in={fadeIn} key={school.id} data-key={school.id} style={{ width: '100%' }}>
            <School todos={todos} school={school} fadeSiblings={this.fadeSiblings}/>
          </Fade>
        )
      })
    )
  }
}

export default SchoolsList


