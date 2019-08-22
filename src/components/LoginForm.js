import React, {Fragment, Component} from "react";
import { withRouter } from "react-router";
import {Fade, Container, Row,  Col, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import API from '../routes'
import styles from './LoginForm.module.scss'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      modal: false,
      newName: "",
      newEmail: "",
      newPassword: ""
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  

  handleEmailChange =(e) => {this.setState({ email: e.target.value })}
  handlePasswordChange =(e) => {this.setState({ password: e.target.value })}

  // handleNewNameChange =(e) => { this.setState({ newName: e.target.value })}
  // handleNewEmailChange =(e) => { this.setState({ newEmail: e.target.value })}
  // handleNewPasswordChange =(e) => {this.setState({ newPassword: e.target.value })}

  // handleCreateAccount = (e) => {
  //   e.preventDefault()

  //   let newUser = {
  //     name: this.state.newName,
  //     username: this.state.username,
  //     email: this.state.newEmail,
  //     password: this.state.newPassword
  //   }

  //   API.post('users', newUser)
  //   .then(data => {
  //     this.toggle()
  //   })
  // }

  handleLoginSubmit = (e) => {
    e.preventDefault()

    let user = {
      email: this.state.email,
      password: this.state.password
    }

    API.post(`login`, user)
    .then(data => {
      if (data.data.authenticated){
        //update state
        this.props.updateCurrentUser(data.data.user)
        //store the token in localStorage
        localStorage.setItem("jwt", data.data.token)
      } else {
        alert("incorrect email or password")
      }
    })
  };

  render() {
    return (
      <Container><Row><Col sm={6} style={{margin: 'auto', textAlign: 'center'}}>
        <Fade className={styles.formWrapper}>
          <h1>Login to Medspace</h1>
          <Form onSubmit={this.handleLoginSubmit}
              size="mini"
              key="mini"
              loading={this.props.authenticatingUser}
              error={this.props.failedLogin}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" id="exampleEmail" placeholder="email" onChange={this.handleEmailChange} value={this.state.email} />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input type="password" name="password" id="examplePassword" placeholder="password" onChange={this.handlePasswordChange} value={this.state.password} />
            </FormGroup>
            <Input type="submit" value="login" />
          </Form>
        </Fade>
        <button disabled onClick={this.toggle}>Create an Account</button>
      </Col></Row>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Create a Medspace Account</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleCreateAccount}>
            <FormGroup>
                <Label for="exampleFname">First Name</Label>
                <Input required type="text" name="name" id="exampleFname" placeholder="Your first name..." onChange={this.handleNewNameChange} value={this.state.newName} />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail2">Email</Label>
                <Input required type="email" name="email" id="exampleEmail2" placeholder="Your email address..." onChange={this.handleNewEmailChange} value={this.state.newEmail}  />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword2">Password</Label>
                <Input required type="password" name="password" id="examplePassword2" placeholder="Create a password..." onChange={this.handleNewPasswordChange} value={this.state.newPassword} />
              </FormGroup>
              <Input type="submit" value="Create Account" />
            </Form>
          </ModalBody>
        </Modal>
      
      </Container>

    );
  }
}

export default withRouter(LoginForm);