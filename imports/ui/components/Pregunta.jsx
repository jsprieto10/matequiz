import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Navbar from "./Navbar";
import { Preguntas } from "../../api/preguntas.js";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { ApiPreguntas } from "../../api/preguntas.js";


//Nicols Acevedo: 
//Se podría cambiar de pregunta a medida que se responden. Adicionalmente, es mejor usar texto para la parte escrita de la pregunta por que no e ve esteticamnete bien. 
//Sugerencia de cambios en el codigo.

class Pregunta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      visibilty: false,
      choose: false,
      escogida: props.escogidasJug[props.posicion]
    };
  }

  componentDidMount(){
    let a = this.props.respuestasJug;
    if (a[this.props.posicion] == -1){
      this.setState({visibilty: true})
    }
    else if (a[this.props.posicion] == 1){
      this.setState({ visibilty: true, choose: true });
    }
  }

  handleChange(event) {
    let name = event.target.id;
    let value = event.target.value;
    let a = this.props.respuestasJug;
    if (value == this.state.data.respuesta) {
      this.setState({ visibilty: true, choose: true });
      a[this.props.posicion] = 1;
    } else {
      a[this.props.posicion] = -1;
      this.setState({ visibilty: true });
    }
    let b = this.props.escogidasJug;
    b[this.props.posicion] = value
    Meteor.call("espera.updateRespuestas", this.props.sesionId, this.props.cualJugador, a, b)
    
    //Nicols Acevedo
    this.props.nextQuestion();  // esta función debe estar implementada en la questions en donde vaya cambiando la pregunta uqe etsa visible actualmente. 
  }

  answer() {
    if (this.state.visibilty) {
      if (this.state.choose) {
        return (
          <label>
            <input type="checkbox" defaultChecked />
            <span>Correcto</span>
          </label>
        );
      } else {
        return (
          <label>
            <input type="checkbox" />
            <span>Incorrecto</span>
          </label>
        );
      }
    }
  }

  render() {
    let id = this.state.data._id;
    return (
      <div className="container">
        <h3>Pregunta: </h3>
        <img src={this.props.data.pregunta} width="80%" alt="" />
        <br />
        <p>
          <label>
            <input
              name={id}
              id={id + "primera"}
              onChange={this.handleChange.bind(this)}
              value="primera"
              type="radio"
              disabled={this.state.visibilty}
              checked={"primera"==this.state.escogida}
            />
            <span>{this.state.data.primera}</span>
          </label>
        </p>
        <p>
          <label>
            <input
              name={id}
              id={id + "segunda"}
              onChange={this.handleChange.bind(this)}
              value="segunda"
              type="radio"
              disabled={this.state.visibilty}
              checked={"segunda"==this.state.escogida}
            />
            <span>{this.state.data.segunda}</span>
          </label>
        </p>
        <p>
          <label>
            <input
              name={id}
              id={id + "tercera"}
              onChange={this.handleChange.bind(this)}
              value="tercera"
              type="radio"
              disabled={this.state.visibilty}
              checked={"tercera"==this.state.escogida}
            />
            <span>{this.state.data.tercera}</span>
          </label>
        </p>
        <p>
          <label>
            <input
              name={id}
              id={id + "cuarta"}
              onChange={this.handleChange.bind(this)}
              value="cuarta"
              type="radio"
              disabled={this.state.visibilty}
              checked={"cuarta"==this.state.escogida}
            />
            <span>{this.state.data.cuarta}</span>
          </label>
        </p>
        <p>
          <label>
            <input
              name={id}
              id={id + "quinta"}
              onChange={this.handleChange.bind(this)}
              value="quinta"
              type="radio"
              disabled={this.state.visibilty}
              checked={"quinta"==this.state.escogida}
            />
            <span>{this.state.data.quinta}</span>
          </label>
        </p>
        {this.answer()}
      </div>
    );
  }
}

export default Pregunta;
