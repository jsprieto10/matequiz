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

  isLoggeded() {
    if (this.props.currentUser) {
      return "";
      return <Login />;
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h1>Bienvenido a MateQuiz</h1>
            <h4>Un proyecto diseñado para que puedes practicar matematicas de una manera divertida</h4>m
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(App);
