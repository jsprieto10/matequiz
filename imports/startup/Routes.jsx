import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';  
import AppContainer from "../ui/App";
import LoginContainer from "../ui/components/Login";
import RegistroContainer from "../ui/components/Register";
//import ListPageContainer from '../../ui/containers/ListPageContainer.jsx';
//import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
//import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';
//import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';

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