import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Navbar from "./Navbar";
import Pregunta from "./Pregunta";
import { ApiPreguntas } from "../../api/preguntas.js";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

class Preguntas extends Component {
  cargar() {
    if (this.props.questions[0]) {
      let j = 0;
      return this.props.questions.map(p => {
        if (p) return <Pregunta key={p._id} data={p} />;
      });
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">{this.cargar()}</div>
      </div>
    );
  }
}
export default withTracker(() => {
  let i = 5;
  let arr = ApiPreguntas.find().fetch();
  let ans = [];
  while (i--) {
    let index = Math.floor(Math.random() * arr.length);
    ans.push(arr[index]);
    arr.splice(index, 1);
  }
  return {
    questions: ans
  };
})(Preguntas);
