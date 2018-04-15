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
      username: "",
      profile: {
        wins: 0,
        losts: 0,
        img_profile: "",
        points: 0,
        sexo: "",
        nacimiento: null
      }
    };
  }
  handleChange(event) {
    event.preventDefault();
    let name = event.target.id;
    let value = event.target.value;
    if (name == 'sexo'){
      estado = this.state.profile;
      estado.sexo=value
      if ( value=='masculino') estado.img_profile = "https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100"
      else estado.img_profile = "http://www.epsomps.vic.edu.au/wp-content/uploads/2016/09/512x512-1-300x300.png"
      this.setState({ profile: estado });
    }
    else if (name=='nacimiento'){
      estado = this.state.profile;
      estado.nacimiento=value
      this.setState({ profile: estado });
    }
    else
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
                FlowRouter.go("/");
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
                <div className="col s12">
                  <label>
                    Selecciona tu sexo: 
                    <select
                      id="sexo"
                      className="browser-default"
                      value={this.state.profile.sexo}
                      onChange={this.handleChange.bind(this)}
                    >
                      <option value="" disabled={true}>
                        __ 
                      </option>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <label>
                    Agrega tu año de nacimiento: 
                    </label>
                    <input
                    id="nacimiento"
                    type="date"
                    className="validate"
                    required
                    onChange={this.handleChange.bind(this)}
                  />
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
