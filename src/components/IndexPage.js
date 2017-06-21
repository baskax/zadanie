import React from 'react';
import ProductPreview from './ProductPreview';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="product-selector">
          {products.map(productData => <ProductPreview key={productData.id} {...productData} />)}
        </div>
      </div>
    );
  }
}
