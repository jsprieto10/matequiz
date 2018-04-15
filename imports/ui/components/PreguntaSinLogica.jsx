import React, { Component } from "react";

class PreguntaSinLogica extends Component {
  render() {
    return (
      <div>
        <h3>Pregunta: </h3>
        <img src={this.props.data.pregunta} width="80%" alt="" />
        <br />
        <p>
          <label>
            <input name="pregunta" value="primera" type="radio" />
            <span>{this.props.data.primera}</span>
          </label>
        </p>
        <p>
          <label>
            <input name="pregunta" value="segunda" type="radio" />
            <span>{this.props.data.segunda}</span>
          </label>
        </p>
        <p>
          <label>
            <input name="pregunta" value="tercera" type="radio" />
            <span>{this.props.data.tercera}</span>
          </label>
        </p>
        <p>
          <label>
            <input name="pregunta" value="cuarta" type="radio" />
            <span>{this.props.data.cuarta}</span>
          </label>
        </p>
        <p>
          <label>
            <input name="pregunta" value="quinta" type="radio" />
            <span>{this.props.data.quinta}</span>
          </label>
        </p>
      </div>
    );
  }
}

export default PreguntaSinLogica;
