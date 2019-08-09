import React, { Component } from 'react';
import { Collapse, Button} from 'reactstrap';
import styles from './school.module.scss';
import School from './school';

class SchoolContainer extends Component {
  constructor(props) {
    super(props);

    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = { 
      collapse: true,
      status: 'Opened'
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
  toggle() { 
    this.setState(state => ({ collapse: !state.collapse }))
  }

  fadeToggle(e) {
    this.toggle()
    this.props.fadeSiblings(e)
  }

  render() {

    const {school} = this.props

    return (
      <div>
        <Button 
          color="primary" 
          onClick={(e) => this.fadeToggle(e)} 
          data-id={school.id}
          style={{ marginBottom: '1rem' }}>
            Toggle
        </Button>

        <h5>Current state: {this.state.status}</h5>

        <Collapse
          isOpen={this.state.collapse}
          onEntering={this.onEntering}
          onEntered={this.onEntered}
          onExiting={this.onExiting}
          onExited={this.onExited}>

          <School school={school} styles={styles} />

        </Collapse>
      </div>
    );
  }
}

export default SchoolContainer;

