import React, { Component } from "react";

import { GlobalContext } from '../../context/GlobalProvider'

import './enter_page.scss'
class EntryPage extends Component {
  static contextType = GlobalContext

  constructor(props) {
    super(props)
    this.state = {
      currentView: "logIn",
      login: {
        email: "",
        password: ""
      }
    }
  }
  changeView = (view) => {
    this.setState({
      currentView: view
    })
  }

  handleChange = e => {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      login: {
        ...this.state.login,
        [name]: value
      }
    });
  }

  handleSubmitLogin = (e) => {
    e.preventDefault();

    console.log(this.state.login)

    this.context.actions.login(this.state.login).then(()=>{
      this.props.history.push('/');
    })
  }

  handleSubmitRegister = (e) => {
    e.preventDefault();
    console.log(e)
  }

  currentView = () => {
    switch (this.state.currentView) {
      case "signUp":
        return (
          <form onSubmit={this.handleSubmitLogin}>
            <h2>Sign Up!</h2>
            <fieldset>
              <legend>Create Account</legend>
              <ul>
                <li>
                  <label htmlFor="firstname">Firstname:</label>
                  <input type="text" id="firstname" required />
                </li>
                <li>
                  <label htmlFor="lastname">Lastname:</label>
                  <input type="text" id="lastname" required />
                </li>
                <li>
                  <label htmlFor="age">Age:</label>
                  <input type="text" id="age" required />
                </li>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" required />
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input type="password" id="password" required />
                </li>
                <li>
                  <label htmlFor="gender">Male:</label>
                  <input type="checkbox" name="gender" id="gender1" required />
                </li>
                <li>
                  <label htmlFor="gender">Female:</label>
                  <input type="checkbox" name="gender" id="gender2" required />
                </li>
              </ul>
            </fieldset>
            <button>Submit</button>
            <button type="button" onClick={() => this.changeView("logIn")}>Have an Account?</button>
          </form>
        )
      case "logIn":
        return (
          <form onSubmit={this.handleSubmitLogin}>
            <h2>Welcome Back!</h2>
            <fieldset>
              <legend>Log In</legend>
              <ul>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" required onChange={this.handleChange} />
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input type="password" id="password" name="password" required onChange={this.handleChange} />
                </li>
                <li>
                  <i />
                  <a onClick={() => this.changeView("PWReset")} href="#e">Forgot Password?</a>
                </li>
              </ul>
            </fieldset>
            <button>Login</button>
            <button type="button" onClick={() => this.changeView("signUp")}>Create an Account</button>
          </form>
        )
      case "PWReset":
        return (
          <form>
            <h2>Reset Password</h2>
            <fieldset>
              <legend>Password Reset</legend>
              <ul>
                <li>
                  <em>A reset link will be sent to your inbox!</em>
                </li>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" required />
                </li>
              </ul>
            </fieldset>
            <button>Send Reset Link</button>
            <button type="button" onClick={() => this.changeView("logIn")}>Go Back</button>
          </form>
        )
      default:
        break
    }
  }
  render() {
    return (
      <section id="entry-page">
        {this.currentView()}
      </section>
    )
  }
}
export default EntryPage;