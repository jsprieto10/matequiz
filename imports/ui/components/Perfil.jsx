import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Navbar from "./Navbar";
import PreguntasAceptadas from "./PreguntasAceptadas";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { ApiPreguntas } from "../../api/preguntas.js";
import { ApiPreguntasParciales } from "../../api/preguntasParcial.js";
class Perfil extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      modalOpen: false,
      fotoNueva: ""
    };
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  handleSubmit() {
    let foto = this.state.fotoNueva;
    if (
      foto.toLowerCase().endsWith(".png") ||
      foto.toLowerCase().endsWith(".jpg") ||
      foto.toLowerCase().endsWith(".gif")
    ) {
      Meteor.call("espera.updateImagen", foto);
      this.handleClose();
    } else {
      M.toast({ html: "El url debe tener la extensión de una imagen" });
    }
  }

  handleChange(event) {
    let name = event.target.id;
    let value = event.target.value;
    this.setState({ [name]: value });
  }

  Modal() {
    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size="small"
        basic
      >
        <Header icon="browser" content="Actualiza tu foto de perfil" />
        <Modal.Content>
          <input
            id="fotoNueva"
            type="text"
            onChange={this.handleChange.bind(this)}
            required
            placeholder="inserta un url"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={this.handleSubmit.bind(this)}>
            <Icon name="checkmark" /> Cambiar foto
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  render() {
    if (!Meteor.user()) {
      return "";
    }
    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="container">
            <div className="col s4">
              <h3>Tú perfil</h3>
              <div className="row">
                <img
                  width="250px"
                  height="200px"
                  src={Meteor.user().profile.img_profile}
                  className="circle"
                  onClick={this.handleOpen.bind(this)}
                />
                {this.Modal()}
                <h5>{Meteor.user().username}</h5>
              </div>
              <div className="col s8" />
            </div>
            <div className="col s8">
              <div className="container">
                <h3>Tú información</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Partidas</th>
                      <th>Ganadas</th>
                      <th>Perdidas</th>
                      <th>Puntos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {Meteor.user().profile.wins +
                          Meteor.user().profile.losts}
                      </td>
                      <td>{Meteor.user().profile.wins}</td>
                      <td>{Meteor.user().profile.losts}</td>
                      <td>{Meteor.user().profile.points}</td>
                    </tr>
                  </tbody>
                </table>
                <h6>Fecha de nacimiento: {Meteor.user().profile.nacimiento}</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s8">
            <div className="container">
              <h3>Preguntas aceptadas</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <div className="container">
              <PreguntasAceptadas listaAceptadas={this.props.preguntasAceptadas} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s8">
            <div className="container">
              <h3>Preguntas por aceptar</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <div className="container">
              <PreguntasAceptadas listaAceptadas={this.props.Preguntasparciales} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  let aceptadas = null;
  let parciales=null;
  if (Meteor.user()) {
    aceptadas = ApiPreguntas.find({ creador: Meteor.user()._id }).fetch()
    parciales = ApiPreguntasParciales.find({ creador: Meteor.user()._id }).fetch()
  }

  return {
    preguntasAceptadas: aceptadas,
    Preguntasparciales: parciales,
    usuario: Meteor.user()
  };
})(Perfil);
