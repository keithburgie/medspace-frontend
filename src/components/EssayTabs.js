import React, {Component} from 'react';
import { TabContent, TabPane, Nav,  Row, Col, NavItem, NavLink } from 'reactstrap';
import EssayEditor from './EssayEditor.js'
import styles from './EssayEditor.module.scss';
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
      <div className={styles.tabs}>
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
          <TabPane key={index} tabId={index + 1} className={styles.essayTabPane}>
            <div className={styles.essayContainer}>
              <blockquote>
                <h4>{prompt.text} <span className={styles.noWrap}>({prompt.limit} word limit)</span></h4>
              </blockquote>
              
              <EssayEditor
                prompt_id={prompt.id}
                limit={prompt.limit}
                user_school={this.props.user_school}
                essay={user_school.user.essays.find(essay => essay.prompt_id === prompt.id) || null}
                />
            </div>
          </TabPane>
        )) : console.log("no prompt text yet")
        }          
        </TabContent>
      </div>
    );
  }
}