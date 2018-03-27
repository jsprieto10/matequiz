import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
export default class Navbar extends Component {
  constructor(){
    super();
    this.state = {change: false};
  }
  logout(){
    Session.set("current", null);
    let a = !this.state.change;
    this.setState({change: a});
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            MateQuiz
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {Session.get("current") ? (
              <li>
              <a>{Session.get("current").username}</a>
              </li>
            ) : (
              ""
            )}
            {Session.get("current") ? (
              <li>
                <a href="/Inicio">Inicio</a>
              </li>
            ) : (
              ""
            )}
            {Session.get("current") ? (
              <li>
                <a onClick={this.logout.bind(this)}>Cerrar Sesion</a>
              </li>
            ) : (
              ""
            )}
            { !Session.get("current") ? (
            <li>
              <a href="/Login">Login</a>
            </li>
            ): ( ""
          )
            }
            { !Session.get("current") ? (
            <li>
              <a href="/Registro">Registro</a>
            </li>
            ): ( ""
          )
            }
          </ul>
        </div>
      </nav>
    );
  }
}
