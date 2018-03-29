import { Meteor } from "meteor/meteor";

Meteor.startup(() => {
  import "../imports/api/preguntas.js";
  import "../imports/api/espera.js";
  // code to run on server at startup
});
