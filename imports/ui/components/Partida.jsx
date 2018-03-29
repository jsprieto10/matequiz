import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Navbar from "./Navbar";
import { Espera } from "../../api/espera.js";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

class Partida extends Component {
  constructor() {
    super();
  }

  prueba() {
    if (this.props.contricante) {
      return <h1>Tu contricante es {this.props.contricante.username}</h1>;
    } else {
      return (
        <div>
          <h1>Espera porfavor, te estamos buscando un contricante</h1>
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="col s12 m4 l8">{this.prueba()}</div>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {

  let antes1 = Espera.findOne({completado: true, jugador1: Meteor.user()._id})
  let antes2 = Espera.findOne({completado: true, jugador2: Meteor.user()._id})
  let b = null;
  if (!antes1 && !antes2){
  let a = Espera.findOne({completado: false});
  if (a && a.jugador1 != Meteor.user()._id) {
    b = Meteor.users.findOne(a.espera);
    Meteor.call("espera.update", a._id, Meteor.user()._id)
  } else if (!a) {
    Meteor.call("espera.insert");
  }
}
else{
    if (antes1) b = antes1.jugador2;
    else b = antes2.jugador1;
}
  return {
    contricante: Meteor.users.findOne(b),
    currentUser: Meteor.user()
  };
})(Partida);
