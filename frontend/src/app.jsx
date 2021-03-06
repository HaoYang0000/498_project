import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from './components/Home/Home.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Like from './components/Dashboard/Like.jsx';

import Main from './components/Dashboard/Main.jsx';
import Explore from './components/Dashboard/Explore.jsx';
import Setting from './components/Dashboard/Setting.jsx';

import styles from './styles/main.scss';

ReactDom.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/dashboard" component={Main}/>
            <Route exact path="/main" component={Main}/>
            <Route exact path="/explore" component={Explore}/>
            <Route exact path="/setting" component={Setting}/>
            <Route exact path="/like" component={Like}/>
        </Switch>
    </Router>,
    document.getElementById('react-app')
);
