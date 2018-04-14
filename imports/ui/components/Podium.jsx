import React, { Component } from "react";

class Podium extends Component {
  render() {
    return (
      <div className="row">
          <div className="col s5">
        <img
          height="42px"
          width="42px"
          src={this.props.user.profile.img_profile}
          alt=""
          className="circle"
        />
        </div>
        <div className="col s7">Victorias: {this.props.user.profile.wins}
        <br/>Derrotas: {this.props.user.profile.losts}
        </div>
        <div className="col s12">{this.props.user.username}</div>
      </div>
    );
  }
}

export default Podium;
