import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
export default class Navbar extends Component {
  constructor() {
    super();
    this.state = { change: false };
  }
  logout() {
    Session.set("current", null);
    let a = !this.state.change;
    this.setState({ change: a });
    Meteor.logout();
    FlowRouter.go('/')
  }

  name() {
    if (Session.get("current")) {
      return Session.get("current").username;
    }

    return Meteor.user().username;
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            MateQuiz
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {Meteor.user() ? (
              <li>
                <a>{this.name()}</a>
              </li>
            ) : (
              ""
            )}
            {Meteor.user() ? (
              <li>
                <a href="/Inicio">Inicio</a>
              </li>
            ) : (
              ""
            )}
            {Meteor.user() ? (
              <li>
                <a onClick={this.logout.bind(this)}>Cerrar Sesion</a>
              </li>
            ) : (
              ""
            )}
            {!Meteor.user() ? (
              <li>
                <a href="/Login">Login</a>
              </li>
            ) : (
              ""
            )}
            { !Meteor.user() ? (
              <li>
                <a href="/Registro">Registro</a>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </nav>
    );
  }
}
