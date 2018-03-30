import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Navbar from "./Navbar";
import Preguntas from "./Preguntas";
import { Espera } from "../../api/espera.js";
import { ApiPreguntas } from "../../api/preguntas.js";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

class Partida extends Component {
  constructor() {
    super();
  }

  prueba() {
    if (this.props.contricante) {
      return (
        <div>
          <h1>Tu contricante es {this.props.contricante.username}</h1>
          <Preguntas questions={this.props.partida.preguntas} />
        </div>
      );
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
          <div>{this.prueba()}</div>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  let juego = null;
  let antes1 = Espera.findOne({
    completado: true,
    jugador1: Meteor.user()._id
  });
  let antes2 = Espera.findOne({
    completado: true,
    jugador2: Meteor.user()._id
  });
  let b = null;
  if (!antes1 && !antes2) {
    let a = Espera.findOne({ completado: false });
    if (a && a.jugador1 != Meteor.user()._id) {
      b = Meteor.users.findOne(a.espera);
      Meteor.call("espera.update", a._id, Meteor.user()._id);
    } else if (!a) {
      let i = 5;
      let arr = ApiPreguntas.find().fetch();
      let ans = [];
      while (i--) {
        let index = Math.floor(Math.random() * arr.length);
        ans.push(arr[index]);
        arr.splice(index, 1);
      }
      Meteor.call("espera.insert", ans);
    }
  } else {
    juego = antes1 || antes2;
    if (antes1) b = antes1.jugador2;
    else b = antes2.jugador1;
  }
  return {
    contricante: Meteor.users.findOne(b),
    currentUser: Meteor.user(),
    partida: juego
  };
})(Partida);
