import React from 'react';

export default class ProductRow extends React.Component {

    render() {
        var sum = 0;
        var rating;
        if (this.props.review !== undefined) {
            this.props.review.forEach((rate) => {
                sum += parseInt(rate.rating, 10);
            });
            rating = this.props.review.length > 0 ? (sum / this.props.review.length).toFixed(2) : "brak ocen";
        } else {
            rating = "brak ocen";
        }
        return (
            <tr key={this.props.id}>
                <td>{this.props.brand}</td>
                <td>{this.props.model}</td>
                <td>{this.props.price}</td>
                <td>{this.props.category}</td>
                <td>{rating}</td>
            </tr>
        );
    }
}