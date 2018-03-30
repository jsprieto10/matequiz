import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Espera = new Mongo.Collection("espera");

Meteor.methods({
  "espera.insert"(qs) {
    Espera.insert({
      jugador1: this.userId,
      jugador2: null,
      completado: false,
      terminado: false,
      preguntas: qs,
      respuestas1: new Array(5+1).join('0').split('').map(parseFloat),
      respuestas2: new Array(5+1).join('0').split('').map(parseFloat)
    });
  },
  "espera.remove"(id) {
    Espera.remove(id);
  },
  "espera.update"(id, jug2){
      console.log("entro aqui", id, jug2)
      Espera.update({_id: id}, {$set: {jugador2: jug2, completado: true}})
  }
});
