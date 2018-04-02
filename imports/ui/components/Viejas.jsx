import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Navbar from "./Navbar";
import Preguntas from "./Preguntas";
import { Espera } from "../../api/espera.js";
import { ApiPreguntas } from "../../api/preguntas.js";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

class Viejas extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
    this.openModal = this.openModal.bind(this);
  }

  respuestasJugador(partida) {
    if (partida.jugador1 == Meteor.user()._id) return partida.respuestas1;
    else return partida.respuestas2;
  }

  escogidasJugador(partida) {
    if (partida.jugador1 == Meteor.user()._id) return partida.escogidas1;
    else return partida.escogidas2;
  }

  openModal(id) {
    this.setState({
      open: {
        [id]: true
      }
    });
  }

  onCloseModal = () => {
    this.setState({ open: false });
  };

  suma(arreglo) {
    filtrado = arreglo.filter(m => m >= 0);
    if (filtrado.length == 0){
        filtrado=[0];
    }
    return filtrado.reduce((a, b) => a + b);
  }

  resultado(partida) {
    let a = this.suma(partida.respuestas1);
    let b = this.suma(partida.respuestas2);
    return a + " vs " + b;
  }

  ganadoOPerdido(partida) {
    if (partida.ganador == Meteor.user()._id) return "Haz ganado";
    return "haz perdido";
  }

  contra(partida) {
    if (partida.ganador == Meteor.user._id) {
      return Meteor.users.findOne(partida.perdedor).username;
    }
    return Meteor.users.findOne(partida.ganador).username;
  }

  render() {
    if (!this.props.partidas) {
      return (
        <div>
          <h4>No se han encontrado partidas, juega ahora</h4>
        </div>
      );
    } else {
      return (
        <div className="row">
          {this.props.partidas.map(p => {
            return (
              <div key={p._id} className="col s4">
                <h4 className="center-align">{this.ganadoOPerdido(p)}</h4>
                <p>
                  Contra {this.contra(p)} el resultado ha sido{" "}
                  {this.resultado(p)}
                </p>
                <a onClick={this.openModal.bind(this, p._id)}>
                  Haz click aqui para ver la partida
                </a>
                <Modal
                  open={this.state.open[p._id]}
                  onClose={this.onCloseModal.bind(this)}
                >
                  <Header
                    icon="winner"
                    content="Es hora de conocer el resultado"
                  />
                  <Modal.Content>
                    <Preguntas
                      questions={p.preguntas}
                      sesion={p._id}
                      respuesta={this.respuestasJugador(p)}
                      jugador={p.jugador1 == Meteor.user()._id}
                      escogida={this.escogidasJugador(p)}
                    />
                  </Modal.Content>
                  <Modal.Actions>
                    <Button
                      color="green"
                      onClick={this.onCloseModal.bind(this)}
                    >
                      <Icon name="checkmark" /> Terminar
                    </Button>
                  </Modal.Actions>
                </Modal>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default withTracker(() => {
  let encontradas = Espera.find({
    $or: [
      { jugador1: Meteor.user()._id, terminado: true },
      { jugador2: Meteor.user()._id, terminado: true }
    ]
  }).fetch().reverse();
  return {
    partidas: encontradas
  };
})(Viejas);
