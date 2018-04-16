import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Navbar from "./Navbar";
import Preguntas from "./Preguntas";
import { Espera } from "../../api/espera.js";
import { ApiPreguntas } from "../../api/preguntas.js";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import PreguntaSinLogica from "./PreguntaSinLogica";

class PreguntasAceptadas extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
    this.openModal = this.openModal.bind(this);
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

  render() {

    if (!Meteor.user()){
      return(<div>
        <h4>Debes Loggearte</h4>
      </div>);
    }

    if (!this.props.listaAceptadas) {
      return (
        <div>
          <h6>Tiene 0 preguntas</h6>
        </div>
      );
    } else {
      return (
        <div className="row">
          {this.props.listaAceptadas.map(p => {
            return (
              <div key={p._id} className="col s4">
                <p>
                <Icon name="like" className="noneBg"/> {p.likes} vs <Icon name="dislike outline"/> {p.dislikes}
                <br/>
                  <button
                    className="btn waves-effect waves-light btn-small"
                    type="submit"
                    name="action"
                    onClick={this.openModal.bind(this, p._id)}
                  >
                    Ver Pregunta
                  </button>
                </p>

                <Modal
                  open={this.state.open[p._id]}
                  onClose={this.onCloseModal.bind(this)}
                >
                  <Header
                    icon="winner"
                    content="Es hora de conocer el resultado"
                  />
                  <Modal.Content>
                  <PreguntaSinLogica data={p} />
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

export default PreguntasAceptadas;
