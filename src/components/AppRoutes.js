import React from 'react';
import { Router, Switch, BrowserRouter, IndexRoute, Route } from 'react-router-dom';
import Layout from './Layout';
import IndexPage from './IndexPage';
import ProductPage from './ProductPage';
import NotFoundPage from './NotFoundPage';

export default class AppRoutes extends React.Component {
  render() {
    return (
      <BrowserRouter  onUpdate={() => window.scrollTo(0, 0)}>
        <Switch>
        <Route exact path="/" component={Layout}/>
        <IndexRoute component={IndexPage}/>
        <Route exact path="/product/:id" component={ProductPage}/>
        <Route exact path="*" component={NotFoundPage}/>
        </Switch>
      </BrowserRouter>
    );
  }
}
