import React from 'react';
import { Link } from 'react-router-dom';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <Link to="/">
            Strona główna
          </Link>
        </header>
        <div className="app-content">{this.props.children}</div>
        <footer>
          <p>
            App made with help of <a href="https://scotch.io/tutorials/react-on-the-server-for-beginners-build-a-universal-react-and-node-app">this site.</a>
          </p>
        </footer>
      </div>
    );
  }
}
