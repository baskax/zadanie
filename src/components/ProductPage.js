import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import Rating from './Rating';
import products from '../data/products';

export default class ProductPage extends React.Component {
  render() {
    const id = this.props.params.id;
    const product = products.filter((product) => product.id === id)[0];
    if (!product) {
      return <NotFoundPage/>;
    }
    return(
      <div className="product-container">
        <p>Marka: <b>{product.brand}</b></p>
        <p>Model: <b>{product.model}</b></p>
        <p>Cena: <b>{product.price}</b></p>
        <p>Data dodania: <b>{product.created}</b></p>
        <p>Ocena: <Rating rating={product.rating} /></p>
         <div className="navigateBack">
          <Link to="/">« Back to the index</Link>
        </div>
      </div> 
    );
  }
}



