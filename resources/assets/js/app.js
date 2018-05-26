import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from './layouts/NavBar';
import Router from './components/Router';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter basename="/app">
                <div>
                    <ToastContainer />
                    <NavBar />
                    <Router />
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));