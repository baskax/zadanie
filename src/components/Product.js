import React from 'react';
import Reviews from './Reviews';

export default class Product extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="product-page">
            <Reviews/>
            </div>
        );
    }
}
