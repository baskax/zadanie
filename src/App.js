import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {products: []};
  }

  componentDidMount() {
    fetch('http://fbla.pl:8110/api/products')
      .then(res => res.json())
      .then(products => this.setState({ products }));
  }
  
  sort(field,dir) {
    fetch('http://fbla.pl:8110/api/products?recs=20&order='+field+'='+dir)
      .then(res => res.json())
      .then(products => this.setState({ products }));
  }
  
  render() {
    return (
      <div className="App">
        <h1>Products</h1>
        <table className="product-table"><thead><tr>
        <th>Brand<button onClick={() => this.sort("brand","asc")}>▲</button><button onClick={() => this.sort("brand","desc")}>▼</button></th>
        <th>Model<button onClick={() => this.sort("model","asc")}>▲</button><button onClick={() => this.sort("model","desc")}>▼</button></th>
        <th>Price<button onClick={() => this.sort("price","asc")}>▲</button><button onClick={() => this.sort("price","desc")}>▼</button></th>
        <th>Category<button onClick={() => this.sort("category","asc")}>▲</button><button onClick={() => this.sort("category","desc")}>▼</button></th>
        </tr></thead><tbody>
        {this.state.products.map(product =>
          <tr key={product.id}><td>{product.brand}</td><td>{product.model}</td><td>{product.price}</td><td>{product.category}</td></tr>
        )}
        </tbody></table>
      </div>
    );
  }
}

export default App;
