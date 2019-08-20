import React, {Fragment, Component} from "react";
import { withRouter } from "react-router";
import API from '../routes'

class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };

  // handleChange = (e, { name, value }) => {
  //   this.setState({ [name]: e.target.value });
  // };

  handleEmailChange =(e) => {
    this.setState({ email: e.target.value });
  }
  handlePasswordChange =(e) => {
    this.setState({ password: e.target.value });
  }

  handleLoginSubmit = (e) => {
    e.preventDefault()

    let user = {
      email: this.state.email,
      password: this.state.password
    }

    API.post(`login`, user)
    .then(data => {
      console.log(data.data)
      if(data.data.authenticated){
        //update state
        this.props.updateCurrentUser(data.data.user)
        //store the token in localStorage
        localStorage.setItem("jwt", data.data.token)
      }else{
        alert("incorrect email or password")
      }
    })
  };

  render() {
    return (
      <Fragment>
        <form
          onSubmit={this.handleLoginSubmit}
          size="mini"
          key="mini"
          loading={this.props.authenticatingUser}
          error={this.props.failedLogin}
        >
          {/* <Message
            error
            header={this.props.failedLogin ? this.props.error : null}
          /> */}
            <input
              type="text"
              label="email"
              placeholder="email"
              name="email"
              onChange={this.handleEmailChange}
              value={this.state.email}
            />
            <input
              type="password"
              label="password"
              placeholder="password"
              name="password"
              onChange={this.handlePasswordChange}
              value={this.state.password}
            />
          <input type="submit" value="Login" />
        </form>
      </Fragment>
    );
  }
}

export default withRouter(LoginForm);