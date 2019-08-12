import React, { Component } from 'react';
import {Collapse as SchoolBody} from 'reactstrap';
import {Fade as SchoolWrapper } from 'reactstrap';
import styles from './School.module.scss';
import SchoolHeader from './School-Header.js'
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
      collapse: false,
      status: 'Closed'
    };
  }

  onEntering() { 
    this.setState({ status: 'Opening...' })
  }
  onEntered() { 
    this.setState({ status: 'Opened' })
  }
  onExiting() { 
    this.setState({ status: 'Closing...' })
  }
  onExited() { 
    this.setState({ status: 'Closed' })
  }


  toggle(e) { 
    this.setState({ 
      collapse: !this.state.collapse 
    }, 
    this.state.collapse === false 
      ? this.props.selectSchool(parseInt(e.target.dataset.id)) 
      : this.props.selectSchool(null)
    )
  }

  render() {
    let {school, todos} = this.props
    let {fadeIn, collapse} = this.state

    return (
      <SchoolWrapper data-key={school.id} in={fadeIn} className={styles.schoolWrapper}>
        
        <SchoolHeader school={school} collapse={collapse} toggle={this.toggle}/>

        <SchoolBody isOpen={collapse} 
          onEntering={this.onEntering} 
          onEntered={this.onEntered}
          onExiting={this.onExiting} 
          onExited={this.onExited}>

          <p className={styles.small}>
            {school.city}, {school.state} | {school.program} Program
          </p>

          <TodoList key={school.id} todos={todos} school={school} />

        </SchoolBody>

      </SchoolWrapper>
    )
  }
}

export default School;

