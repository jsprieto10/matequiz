import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Partidas = new Mongo.Collection("partidas");

Meteor.methods({
    "partidas.insert"(){

        Partidas.insert();
    }
})