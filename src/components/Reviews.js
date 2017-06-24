import React from 'react';
import Review from './Review';

export default class Reviews extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        var rating;
        var sum;
        console.log(this.props);
        if (this.props.reviews !== undefined) {
            this.props.reviews.forEach((rate) => {
                sum += parseInt(rate.rating, 10);
            });
            rating = this.props.reviews.length > 0 ? (sum / this.props.reviews.length).toFixed(2) : "brak ocen";
        } else {
            rating = "brak ocen";
        }
        return (
            <div className="reviews-box">
                Opinie o produkcie
                {rating}
            </div>
        )
    }
}
