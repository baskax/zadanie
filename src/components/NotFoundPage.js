import React from 'react';
import {Link} from 'react-router-dom';

export default class NotFoundPage extends React.Component {

    render() {
        return (
            <div>
                <h1>Error 404</h1>
                <h3> Requested content could not be found.</h3>
                <Link to="/">Take me back to main page.</Link>
            </div>
        );
    }
}