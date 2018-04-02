import React, { Component } from "react";
import Navbar from "./Navbar";
import Pregunta from "./Pregunta";
import { ApiPreguntas } from "../../api/preguntas.js";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Tab } from "semantic-ui-react";

class Preguntas extends Component {
  constructor(props){
    super(props)
  }
  cargar() {
    if (this.props.questions && this.props.questions[0]) {
      let j = 0;
      return this.props.questions.map(p => {
        j++;
        if (p)
          return {
            menuItem: "Pregunta " + j,
            render: () => (
              <Tab.Pane>
                <Pregunta key={p.data._id} data={p.data} posicion={p.index} sesionId={this.props.sesion} respuestasJug={this.props.respuesta}
                cualJugador={this.props.jugador} escogidasJug={this.props.escogida}/>
              </Tab.Pane>
            )
          };
      });
    }
  }

  render() {
    return (
      <div className="container">
        <br />
        <Tab panes={this.cargar()} />
      </div>
    );
  }
}

export default Preguntas;
