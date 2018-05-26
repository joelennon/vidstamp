import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Home, Jobs } from '../pages';

class Router extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/jobs" component={Jobs} />
                <Redirect from="/" to="/" />
            </Switch>
        );
    }
}

export default Router;