import React, { Component } from "react";
import ReactDOM from "react-dom";
import Navbar from "./Navbar";
import { Accounts } from "meteor/accounts-base";
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
    //Nicolás Acevedo: Handle Submit no esta funcionando con el primer click hay que hacer dos clicks pero el usuario si queda registrado en el primer click. Revisar como cambian de URL. Además hay que hacer que se re-renderice y se vea que el usuario esta loggeado. 
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
                FlowRouter.go('/'); // Nicolás Acevedo: Esta ruta no esta funcionando bien. 
                render(); // Nicolás Acevedo: Cambio propuesto par renderizar otra vez 
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
