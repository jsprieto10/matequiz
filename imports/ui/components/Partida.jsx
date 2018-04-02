import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Navbar from "./Navbar";
import Preguntas from "./Preguntas";
import { Espera } from "../../api/espera.js";
import { ApiPreguntas } from "../../api/preguntas.js";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

class Partida extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false
    };
  }

  termino() {
    let a = this.quienGano();
    Meteor.call(
      "espera.updateGanador",
      this.props.partida._id,
      a.ganador,
      a.perdedor
    );
    FlowRouter.go('/Inicio')
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  esJugador1() {
    if (this.props.partida.jugador1 == Meteor.user()._id) return true;
    else return false;
  }

  respuestasJugador() {
    if (this.esJugador1()) return this.props.partida.respuestas1;
    else return this.props.partida.respuestas2;
  }

  escogidasJugador() {
    if (this.esJugador1()) return this.props.partida.escogidas1;
    else return this.props.partida.escogidas2;
  }

  suma(arreglo) {
    let suma = arreglo.reduce((a, b) => a + b);
    return suma;
  }

  componentWillReceiveProps(props) {
    if (props.fin) this.setState({ modalOpen: true });
  }

  quienGano() {
    let a = this.props.partida.respuestas1;
    let b = this.props.partida.respuestas2;
    let win = null;
    let lose = null;
    if (this.suma(a) >= this.suma(b)) {
      win = this.props.partida.jugador1;
      lose = this.props.partida.jugador2;
    } else {
      win = this.props.partida.jugador2;
      lose = this.props.partida.jugador1;
    }
    return {
      ganador: win,
      perdedor: lose,
    };
  }

  ganador() {
    let a = this.props.partida.respuestas1;
    let b = this.props.partida.respuestas2;
    let c = null;
    if (this.suma(a) > this.suma(b)) {
      if (this.esJugador1()) {
        c =
          "Felicitaciones haz ganado: " +
          Meteor.user().username +
          " sigue jugando para poder aprender mas";
      } else {
        c =
          "Haz perdido: " +
          Meteor.user().username +
          " sigue jugando para poder mejorar";
      }
    } else if (this.suma(a) < this.suma(b)) {
      if (!this.esJugador1()) {
        c =
          "Felicitaciones haz ganado: " +
          Meteor.user().username +
          " sigue jugando para poder aprender mas";
      } else {
        c =
          "Haz perdido: " +
          Meteor.user().username +
          " sigue jugando para poder mejorar";
      }
    } else {
      c = "han Empatado continuen jugando para poder aprender más";
    }
    return c;
  }

  modal() {
    return (
      <Modal open={this.state.modalOpen} basic size="small">
        <Header icon="winner" content="Es hora de conocer el resultado" />
        <Modal.Content>
          <h3>{this.ganador()}</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose.bind(this)} inverted>
            <Icon name="checkmark" /> Terminar
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  prueba() {
    if (this.props.contricante) {
      return (
        <div>
          <h1>Tu contricante es {this.props.contricante.username}</h1>
          {this.props.fin ? (
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
              onClick={this.termino.bind(this)}
            >
              Termina la partida
            </button>
          ) : (
            ""
          )}
          <Preguntas
            questions={this.props.partida.preguntas}
            sesion={this.props.partida._id}
            respuesta={this.respuestasJugador()}
            jugador={this.esJugador1()}
            escogida={this.escogidasJugador()}
          />
          {this.modal()}
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
  let termino = false;
  let antes1 = Espera.findOne({
    completado: true,
    jugador1: Meteor.user()._id,
    terminado: false
  });
  let antes2 = Espera.findOne({
    completado: true,
    jugador2: Meteor.user()._id,
    terminado: false
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
      let j = 0;
      while (i--) {
        let index = Math.floor(Math.random() * arr.length);
        let pre = { data: arr[index], index: j++ };
        ans.push(pre);
        arr.splice(index, 1);
      }
      Meteor.call("espera.insert", ans);
    }
  } else {
    juego = antes1 || antes2;
    if (antes1) b = antes1.jugador2;
    else b = antes2.jugador1;
    let arreglo = juego.respuestas1.concat(juego.respuestas2);
    let filter = arreglo.filter(elem => elem == 0);
    if (filter.length == 0) termino = true;
  }
  return {
    contricante: Meteor.users.findOne(b),
    currentUser: Meteor.user(),
    partida: juego,
    fin: termino
  };
})(Partida);
