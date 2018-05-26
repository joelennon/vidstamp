import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Home, Jobs, CreateJob, ShowJob } from '../pages';

class Router extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/jobs" component={Jobs} />
                <Route exact path="/jobs/create" component={CreateJob} />
                <Route path="/jobs/:id" component={ShowJob} />
                <Redirect from="/" to="/" />
            </Switch>
        );
    }
}

export default Router;