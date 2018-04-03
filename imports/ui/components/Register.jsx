import React, { Component } from "react";
import ReactDOM from "react-dom";
import Navbar from "./Navbar";
import { Accounts } from "meteor/accounts-base";
// Agregar notificación de éxito cuando se crea una cuenta. Actualmente no pasa nada al oprimir el botón de registrar
// El único mensaje para guiar al usuario aparece luego de volver a oprimir registrar avisando que ya existe la cuenta
class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      username: ""
    };
  }

  handleChange(event) {
    event.preventDefault();
    let name = event.target.id;
    let value = event.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const confirmPassword = ReactDOM.findDOMNode(this.refs.confirmPassWord)
      .value;
    if (
      this.state.password === confirmPassword &&
      this.state.password !== "" &&
      confirmPassword !== ""
    ) {
      var accountInfo = this.state;
      Accounts.createUser(accountInfo, function(er) {
        if (er) {
          M.toast({ html: er.reason });
        } else {
          Meteor.loginWithPassword(
            this.state.email,
            this.state.password,
            er => {
              if (er) {
                M.toast({ html: er.reason });
              } else {
                console.log("se ha loggeado");
                let current = Meteor.user();
                Session.set("current", current);
                FlowRouter.go('/');
              }
            }
          );
        }
      });
    } else {
      M.toast({ html: "La clave no coincide!" });
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <h4 className="text-center">Register Account</h4>
            <form
              onSubmit={this.handleSubmit.bind(this)}
              className="col offset-s4 s4"
            >
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="username"
                    type="text"
                    className="validate"
                    onChange={this.handleChange.bind(this)}
                    required
                  />
                  <label htmlFor="username">Nombre</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="email"
                    type="email"
                    className="validate"
                    onChange={this.handleChange.bind(this)}
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="password"
                    type="password"
                    className="validate"
                    onChange={this.handleChange.bind(this)}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="confirmPassword"
                    type="password"
                    className="validate"
                    ref="confirmPassWord"
                    required
                  />
                  <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
              </div>
              <div className="row">
                <button className="waves-effect waves-light btn btn-block">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
