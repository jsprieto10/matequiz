import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Navbar from "./Navbar";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import Viejas from "./Viejas";
import Footer from "./Footer";
class Inicio extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="col s8">
            <div className="container">
              <h3>Explicacion</h3>
              <p>
                Debes iniciar una partida, una vez iniciada tienes que esperar
                que otra persona se conecte y así poder comenzar a jugar. el
                juego consiste en 5 preguntas de opción multiple despues de cada
                pregunta podras ver si tu contricante ha acertado su pregunta o
                no.
              </p>
              <br />
            </div>
          </div>

          <div className="col s4">
            <h3>Crea una partida</h3>
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
              onClick={() => FlowRouter.go("/Partida")}
            >
              Iniciar
            </button>

            <h3>Preguntas</h3>
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
              onClick={() => FlowRouter.go("/AgregarPregunta")}
            >
              Agrega preguntas!
            </button>
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
              onClick={() => FlowRouter.go("/CalificarPregunta")}
            >
              Califica preguntas!
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col s8">
            <div className="container">
              <h3>Mira tus partidas jugadas</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <div className="container">
              <Viejas />
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Inicio;
