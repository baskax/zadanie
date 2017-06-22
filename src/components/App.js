import React, {Component} from 'react';
import '../static/css/App.css';
import DataTable from './DataTable';


class App extends Component {


    render() {
        return (
            <div className="App">
                <h1>Katalog</h1>
                <DataTable/>
            </div>
        );
    }
}

export default App;
