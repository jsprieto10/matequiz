import React, { Component } from "react";

class ListaLeaders extends Component {
  render() {
    let rest = this.props.lista.slice();
    if (rest.length >= 3) {
      rest.splice(0, 3);
    } else rest = [];
    let i = 3;
    return (
      <div className="row">
        <div className="col s8">
          <div className="container">
            <ul className="collection">
              {rest.map(r => {
                return(<li key={r._id} className="collection-item avatar">
                  <img src={r.profile.img_profile} alt="" className="circle" />
                  <span className="title">{r.username}</span>
                  <p>
                    Victorias: {r.profile.wins}
                    <br />
                    Derrotas: {r.profile.losts}
                  </p>
                  <a href="#!" className="secondary-content">
                    {++i}
                  </a>
              </li>);
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ListaLeaders;
