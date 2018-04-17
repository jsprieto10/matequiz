import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

// Camilo A Carrillo N: Deberian configurar el RateLimit para cada metodo y así poder manejar posibles ataques al servidor.

Meteor.methods({
    "puntosUsers.preguntaCorrecta"(){
        Meteor.users.update({_id: this.userId}, {$inc: {"profile.points": 10}});
    },
    "puntosUsers.califico"(){
        Meteor.users.update({_id: this.userId}, {$inc: {"profile.points": 2}});
    },
    "puntosUsers.calificado"(di, puntos){
        Meteor.users.update({_id: di}, {$inc: {"profile.points": puntos}});
    },    
});
