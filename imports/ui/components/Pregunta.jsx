import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Navbar from "./Navbar";
import { Preguntas } from "../../api/preguntas.js";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

class Pregunta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      visibilty: false,
      choose: false
    };
  }

  handleChange(event) {
    let name = event.target.id;
    let value = event.target.value;
    if (value == this.state.data.respuesta) {
      this.setState({ visibilty: true, choose: true });
    } else {
      this.setState({ visibilty: true });
    }
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
        <img src={this.props.data.pregunta} alt="" />
        <br />
        <p>
          <label>
            <input
              name={id}
              id={id + "primera"}
              onChange={this.handleChange.bind(this)}
              value="primera"
              type="radio"
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
