import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
export default class Navbar extends Component {
  constructor() {
    super();
    this.state = { change: false };
  }
  // Cuando se pone en modo responsive no aparecen botones en la navbar para poder iniciar sesión o crear cuenta
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
                <a onClick={() => FlowRouter.go('/Inicio')}>Inicio</a>
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
                <a onClick={ () =>FlowRouter.go('/Login')}>Login</a>
              </li>
            ) : (
              ""
            )}
            { !Meteor.user() ? (
              <li>
                <a onClick={() => FlowRouter.go('/Registro')}>Registro</a>
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
