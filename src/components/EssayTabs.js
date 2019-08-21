import React, {Component} from 'react';
import { TabContent, TabPane, Nav,  Row, Col, NavItem, NavLink } from 'reactstrap';
import EssayEditor from './EssayEditor.js'
import classnames from 'classnames';

export default class EssayTabs extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 1
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {

    const {prompts} = this.props.school
    const {user_school} = this.props 

    return (
      <div>
        <Nav tabs>
          {prompts ? prompts.map((prompt, index) => (  
            <NavItem key={index}>
              <NavLink
                className={classnames({ active: this.state.activeTab === index + 1 })}
                onClick={() => { this.toggle(index + 1); }}
                >Essay #{index + 1}
              </NavLink>
            </NavItem>
          )) : console.log("no prompts yet") }
        </Nav>

        <TabContent activeTab={this.state.activeTab}>

        {prompts ? prompts.map((prompt, index) => (  
          <TabPane key={index} tabId={index + 1}>
            <Row>
              <Col sm="12">
                <h4>{prompt.text} ({prompt.limit} word limit)</h4>
                <EssayEditor
                  prompt_id={prompt.id}
                  limit={prompt.limit}
                  user_school={this.props.user_school}
                  essay={user_school.user.essays.find(essay => essay.prompt_id === prompt.id) || null}
                  />
              </Col>
            </Row>
          </TabPane>
        )) : console.log("no prompt text yet")
        }          
        </TabContent>
      </div>
    );
  }
}