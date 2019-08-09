import React, { Component } from 'react';
import { Collapse, Button} from 'reactstrap';
import styles from './school.module.scss';
// import School from './school-view';

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
      <div className={styles.schoolWrapper}>

        <div className={styles.collapseHeader}>

          <div className={styles.buttonWrapper}>
            <Button color="secondary" onClick={(e) => this.fadeToggle(e)} data-id={school.id} >
                {this.state.collapse ? "-" : "+" }
            </Button>

            <small className={styles.containerStatus}>{this.state.status}</small>
          </div>

          <div>
            {/* If name is really long, cut off at the comma */}
            <p><strong>{school.name.split(',')[0]}</strong></p>
          </div>

        </div>

        <Collapse isOpen={this.state.collapse} 
          onEntering={this.onEntering} onEntered={this.onEntered}
          onExiting={this.onExiting} onExited={this.onExited}>

          <p className={styles.small}>{school.city}, {school.state} | {school.program} Program</p>
        </Collapse>

      </div>
    );
  }
}

export default SchoolContainer;

