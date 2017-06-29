import React from 'react';
import Reviews from './Reviews';
import {Link} from 'react-router-dom';
import axios from 'axios';
import config from "../utils/config";

export default class Product extends React.Component {

    constructor(props) {
        super(props);
        this.apiBase = config.api;
        this.productID = parseInt(props.match.params.id, 10);
        this.state = {
            product: {}
        };
    }

    componentDidMount() {
        var self = this;
        axios.get(this.apiBase + '/product/' + this.productID).then((res) => {
            self.setState({product: res.data})
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {        
        return (
            <div className="product-page">
                <Link to="/">Back</Link><br/>
                <Reviews reviews={this.state.product.review}/>
                Marka:<h1>{this.state.product.brand}</h1><br/>
                Model:<h2>{this.state.product.model}</h2><br/>
                Cena:<h2>{this.state.product.price}</h2><br/>
                Dodano:<h4>{this.state.product.created}</h4><br/>
                Kategoria:<h4>{this.state.product.category}</h4><br/>
                <div className="img-container">{this.state.product.image!==undefined ? (<img src="/static/img/{this.state.product.image}" width="300" height="300" />):(<p>no image</p>)}</div>
            </div>
        );
    }
}
