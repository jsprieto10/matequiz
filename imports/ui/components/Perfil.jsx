import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Navbar from "./Navbar";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
class Perfil extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      fotoNueva: ""
    };
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  handleSubmit() {
    let foto = this.state.fotoNueva;
    if (foto.toLowerCase().endsWith(".png") || foto.toLowerCase().endsWith(".jpg") || foto.toLowerCase().endsWith(".gif")){
      Meteor.call("espera.updateImagen", foto);
      this.handleClose();
    }
    else{
      M.toast({html: "El url debe tener la extensión de una imagen"});
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
            <h3>Mira tu perfil</h3>
            <div className="col s4">
              <div className="row">
                <img
                  width="300px"
                  height="300px"
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
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    usuario: Meteor.user()
  };
})(Perfil);
