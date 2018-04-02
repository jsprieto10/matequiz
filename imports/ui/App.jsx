import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Navbar from "./components/Navbar";
import { Meteor } from "meteor/meteor";
import Login from "./components/Login";
import { Accounts } from 'meteor/accounts-base'
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
        <button onClick={() => FlowRouter.go('/Inicio')}></button>
          <h1>Bienvenido a MateQuiz</h1>
            <h4>Un proyecto diseñado para que puedes practicar matematicas de una manera divertida</h4>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
  };
})(App);
