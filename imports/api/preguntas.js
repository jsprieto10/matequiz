import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Preguntas = new Mongo.Collection("preguntas");

Meteor.methods({
    "preguntas.insert"(pregunta, primera, segunda, tercera, cuarta,quinta, respuesta){
        
        Preguntas.insert({
            pregunta,
            primera,
            segunda,
            tercera,
            cuarta,
            quinta,
            respuesta,
            createdAt: new Date()
        })
    }
});