import React, {Component} from 'react';
import '../static/css/App.css';
import Browser from './Browser';


class App extends Component {


    render() {
        return (
            <div className="App">
                <h1>Katalog</h1>
                <Browser/>
            </div>
        );
    }
}

export default App;
