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
      respuestas1: new Array(5 + 1)
        .join("0")
        .split("")
        .map(parseFloat),
      respuestas2: new Array(5 + 1)
        .join("0")
        .split("")
        .map(parseFloat),
      escogidas1: new Array(5 + 1)
        .join("0")
        .split("")
        .map(parseFloat),
      escogidas2: new Array(5 + 1)
        .join("0")
        .split("")
        .map(parseFloat),
      ganador: null,
      perdedor: null
    });
  },
  "espera.remove"(id) {
    Espera.remove(id);
  },
  "espera.update"(id, jug2) {
    console.log("entro aqui", id, jug2);
    Espera.update({ _id: id }, { $set: { jugador2: jug2, completado: true } });
  },
  "espera.updateRespuestas"(id, jugador, respuestas, escogidas) {
    if (jugador) {
      Espera.update(
        { _id: id },
        { $set: { respuestas1: respuestas, escogidas1: escogidas } }
      );
    } else {
      Espera.update(
        { _id: id },
        { $set: { respuestas2: respuestas, escogidas2: escogidas } }
      );
    }
  },
  "espera.updateGanador"(id, win, lose, ter) {
    Espera.update({ _id: id }, { $set: { ganador: win, perdedor: lose, terminado: true } });
  }
});
