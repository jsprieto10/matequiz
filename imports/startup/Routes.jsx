import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';  
import AppContainer from "../ui/App";
import LoginContainer from "../ui/components/Login";
import RegistroContainer from "../ui/components/Register";
import InicioContainer from "../ui/components/Inicio";
import PartidaContainer from "../ui/components/Partida";
import AgregarPreguntaContainer from "../ui/components/AgregarPregunta";
import PreguntasContainer from "../ui/components/Preguntas";
FlowRouter.route('/', {
  name: 'main',
  action() {
    mount(AppContainer);
  },
});

FlowRouter.route('/Login', {
  name: 'Login',
  action() {
    mount(LoginContainer);
  },
});

FlowRouter.route('/Registro', {
  name: 'Registro',
  action() {
    mount(RegistroContainer);
  },
});

FlowRouter.route('/Inicio', {
  name: 'Inicio',
  action() {
    mount(InicioContainer);
  },
});

FlowRouter.route('/Partida', {
  name: 'Partida',
  action() {
    mount(PartidaContainer);
  },
});

FlowRouter.route('/AgregarPregunta', {
  name: 'AgregarPregunta',
  action() {
    mount(AgregarPreguntaContainer);
  },
});

FlowRouter.route('/Preguntas', {
  name: 'Preguntas',
  action() {
    mount(PreguntasContainer);
  },
});