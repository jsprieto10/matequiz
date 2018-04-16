import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Navbar from "./Navbar";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import Footer from "./Footer";

class Pregunta extends Component {
  constructor() {
    super();
    this.state = {
      pregunta: "",
      primera: "",
      segunda: "",
      tercera: "",
      cuarta: "",
      quinta: "",
      respuesta: "0"
    };
  }

  handleChange(event) {
    event.preventDefault();
    let name = event.target.id;
    let value = event.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let pregunta = this.state.pregunta;
    let primera = this.state.primera;
    let segunda = this.state.segunda;
    let tercera = this.state.tercera;
    let cuarta = this.state.cuarta;
    let quinta = this.state.quinta;
    let respuesta = this.state.respuesta;

    if (respuesta != 0) {
      Meteor.call(
        "preguntasParciales.insert",
        pregunta,
        primera,
        segunda,
        tercera,
        cuarta,
        quinta,
        respuesta
      );
      this.setState({
        pregunta: "",
        primera: "",
        segunda: "",
        tercera: "",
        cuarta: "",
        quinta: "",
        respuesta: "0"
      });
      M.toast({ html: "Pregunta agregada, espera a que la califiquen" });
    } else {
      M.toast({ html: "Debe seleccionar una respuesta" });
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <h4 className="text-center">Crear una nueva pregunta</h4>
            <p>Cuando tu pregunta obtenga 10 likes, se agregara a la lista de preguntas del juego, pero si obtiene 10 dislikes se eliminara</p>
            <form
              onSubmit={this.handleSubmit.bind(this)}
              className="col offset-s4 s4"
            >
              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.state.pregunta}
                    id="pregunta"
                    type="text"
                    className="validate"
                    onChange={this.handleChange.bind(this)}
                    required
                  />
                  <label htmlFor="pregunta">URL de la imagen de la pregunta</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.state.primera}
                    id="primera"
                    type="text"
                    className="validate"
                    onChange={this.handleChange.bind(this)}
                    required
                  />
                  <label htmlFor="primera">Primera opción</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.state.segunda}
                    id="segunda"
                    type="text"
                    className="validate"
                    onChange={this.handleChange.bind(this)}
                    required
                  />
                  <label htmlFor="segunda">Segunda opción</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.state.tercera}
                    id="tercera"
                    type="text"
                    className="validate"
                    onChange={this.handleChange.bind(this)}
                    required
                  />
                  <label htmlFor="tercera">Tercera opción</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.state.cuarta}
                    id="cuarta"
                    type="text"
                    className="validate"
                    onChange={this.handleChange.bind(this)}
                    required
                  />
                  <label htmlFor="cuarta">Cuarta opción</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.state.quinta}
                    id="quinta"
                    type="text"
                    className="validate"
                    onChange={this.handleChange.bind(this)}
                    required
                  />
                  <label htmlFor="quinta">Quinta opción</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <select
                    id="respuesta"
                    className="browser-default"
                    onChange={this.handleChange.bind(this)}
                    value={this.state.respuesta}
                  >
                    <option value="0" disabled>
                      Escoge la opción correcta
                    </option>
                    <option value="primera">Primera</option>
                    <option value="segunda">Segunda</option>
                    <option value="tercera">Tercera</option>
                    <option value="cuarta">Cuarta</option>
                    <option value="quinta">Quinta</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <button className="waves-effect waves-light btn btn-block">
                  Submit
                </button>
                <br />
                <br />
                <br />
              </div>
            </form>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Pregunta;
