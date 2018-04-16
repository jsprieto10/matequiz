import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
class Login extends Component {
    constructor(){
        super();
        this.state = {
            email: "",
            password: ""
        }

    }

    handleChange(event) {
        let name = event.target.id;
        let value = event.target.value;
        this.setState({ [name]: value });
      }

      handleSubmit(event) {
        event.preventDefault();
        Meteor.loginWithPassword(this.state.email, this.state.password, (er) =>{
            if (er){
                M.toast({html: er.reason});
            }
            else{
                console.log("se ha loggeado")
                let current = Meteor.user();
                Session.set("current", current);
                M.toast({ html: "Se ha loggeado correctamente!" });
                FlowRouter.go('/')
            }
        });
      }
  render() {
    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="container">
            <h4 className="text-center">Login</h4>
            <form onSubmit={this.handleSubmit.bind(this)} className="col offset-s4 s4">
              <div className="row">
                <div className="input-field col s12">
                  <input id="email" type="text" className="validate" onChange={this.handleChange.bind(this)}/>
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="password" type="password" className="validate" onChange={this.handleChange.bind(this)}/>
                  <label htmlFor="password">Clave</label>
                </div>
              </div>
              <div className="row">
                <button className="waves-effect waves-light btn btn-block">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
export default Login;
