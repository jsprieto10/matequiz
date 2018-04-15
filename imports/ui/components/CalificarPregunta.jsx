import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Navbar from "./Navbar";
import PreguntaSinLogica from "./PreguntaSinLogica";
import { Meteor } from "meteor/meteor";
import { ApiPreguntasParciales } from "../../api/preguntasParcial.js";
import { ApiPreguntas } from "../../api/preguntas.js";
import { Accounts } from "meteor/accounts-base";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

class CalificarPregunta extends Component {


    handleLike(isLike){
        console.log("esto es el log", isLike)
        if (this.props.pregunta.likes == 10 && isLike){
            let objeto = _.clone(this.props.pregunta);
            delete objeto._id;
            Meteor.call("preguntas.insert", objeto)
            Meteor.call("preguntasParciales.remove", this.props.pregunta._id);

        }
        else if (this.props.pregunta.dislkes == 10 && !isLike){
            Meteor.call("preguntasParciales.remove", this.props.pregunta._id);
        }
        else{
            Meteor.call("preguntasParciales.updateLike", this.props.pregunta._id, isLike);
        }
    }

  render() {
    if (Meteor.user())
      return (
        <div>
          <Navbar />
          <div className="container">
            {this.props.pregunta ? (
              <div>
                <PreguntaSinLogica data={this.props.pregunta} />
                <Button inverted onClick={this.handleLike.bind(this, true)} color="green">
                  Like
                </Button>
                <Button inverted  onClick={this.handleLike.bind(this, false)} color="red">
                  Dislike
                </Button>
                <br/>
                <br/>
                <br/>
              </div>
            ) : (
              <h4>No se ha encontrado ninguna pregunta para calificar</h4>
            )}
          </div>
        </div>
      );
    else {
      return (
        <div>
          <Navbar />
          <h3>Debes loggearte primero</h3>
        </div>
      );
    }
  }
}

export default withTracker(() => {
  let p = null;
  if (Meteor.user())
    p = ApiPreguntasParciales.findOne({
      contestaron: { $ne: Meteor.user()._id }
    });
  return {
    pregunta: p,
    usuario: Meteor.user()
  };
})(CalificarPregunta);
