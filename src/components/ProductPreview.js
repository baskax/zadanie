import React from 'react';
import { Link } from 'react-router-dom';

export default class ProductPreview extends React.Component {
  render() {
    return (
      <Link to={`/product/${this.props.id}`}>
        <div className="product-preview">
          <h2 className="product-preview-brand">{this.props.brand}</h2>
          <h3 className="product-preview-model">{this.props.model}</h3>
          <h1 className="prodcut-preview-price">{this.props.price}</h1>
        </div>
      </Link>
    );
  }
}
