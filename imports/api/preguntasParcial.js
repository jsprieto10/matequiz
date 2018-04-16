import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const ApiPreguntasParciales = new Mongo.Collection("preguntasParciales");

Meteor.methods({
    "preguntasParciales.insert"(pregunta, primera, segunda, tercera, cuarta,quinta, respuesta){
        
        ApiPreguntasParciales.insert({
            pregunta,
            primera,
            segunda,
            tercera,
            cuarta,
            quinta,
            respuesta,
            likes:0,
            dislikes: 0,
            creador: this.userId,
            contestaron:[this.userId],
            createdAt: new Date()
        })
    },
    "preguntasParciales.updateLike"(id, isLike){
        if (isLike){
        ApiPreguntasParciales.update({ _id: id }, { $inc: { likes: 1}});
    }
    else{
        ApiPreguntasParciales.update({ _id: id }, { $inc: { dislikes: 1}});
    }
    ApiPreguntasParciales.update({ _id: id }, { $push: { contestaron: this.userId } } );

},
    "preguntasParciales.remove"(id){
        ApiPreguntasParciales.remove({_id: id})
    }
});