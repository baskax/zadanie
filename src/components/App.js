import React, {Component} from 'react';
import '../static/css/App.css';
import Browser from './Browser';
import NotFoundPage from './NotFoundPage';
import Product from './Product';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends Component {


    render() {
        return (
            <Router>
                <div className="App">
                    <h1>Katalog</h1>
                    <Switch>
                        <Route path="/" exact component={Browser}/>
                        <Route path="/product/:id" exact component={Product} />
                        <Route component={NotFoundPage}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
