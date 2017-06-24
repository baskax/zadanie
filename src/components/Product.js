import React from 'react';
import Reviews from './Reviews';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Product extends React.Component {

    constructor(props) {
        super(props);
        this.apiBase = "http://localhost:8110/api/";
        this.productID = parseInt(props.match.params.id, 10);
        this.state = {
            product: {}
        };
    }

    componentDidMount() {
        var self = this;
        axios.get(this.apiBase + 'product/' + this.productID).then((res) => {
            self.setState({product: res.data})
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="product-page">
                <Link to="/">Back</Link>
                <Reviews reviews={this.state.product.review}/>
            </div>
        );
    }
}
