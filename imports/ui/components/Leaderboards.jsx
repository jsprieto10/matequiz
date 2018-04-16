import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Navbar from "./Navbar";
import ListaLeaders from "./ListaLeaders";
import Podium from "./Podium";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import Footer from "./Footer";
class Leaderboards extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="col s10">
            <div className="container">
              <h3>Estos jugadores son los mejores de todo el juego</h3>
              <br />
            </div>
          </div>
        </div>
        <br />
        <br />
        {this.props.LeadersWins[0] ? (
          <div>
            <div className="row">
              <div className="col s12">
                <div className="container">
                  <div className="podium">
                    <div className="pad col s4">
                      <div className="second_content">
                        {this.props.LeadersWins[1]
                          ? <Podium user={this.props.LeadersWins[1]}/>
                          : ""}
                      </div>
                      <div className="second">a</div>
                    </div>
                    <div className="pad col s4">
                      {this.props.LeadersWins[0] ? (
                        <Podium user={this.props.LeadersWins[0]}/>
                      ) : (
                        ""
                      )}
                      <div className="first">a</div>
                    </div>
                    <div className="pad col s4">
                      <div className="third_content">
                        {this.props.LeadersWins[2]
                          ? <Podium user={this.props.LeadersWins[2]}/>
                          : "No hay nadie"}
                      </div>
                      <div className="third">a</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ListaLeaders lista={this.props.LeadersWins} />
          </div>
        ) : (
          ""
        )}
        <Footer/>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    LeadersWins: Meteor.users
      .find({}, { sort: { "profile.wins": -1 } })
      .fetch(),
    LeaderPoints: Meteor.users
      .find({}, { sort: { "profile.points": -1 } })
      .fetch()
  };
})(Leaderboards);
