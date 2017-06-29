import React from 'react';
import Review from './Review';

export default class Reviews extends React.Component {

    render() {
        var rating;
        var count = 0;
        if (this.props.reviews !== undefined) {
            count = this.props.reviews.length;
            var sum = 0;
            this.props.reviews.forEach((rate) => {
                sum += parseInt(rate.rating, 10);
            });
            rating = count > 0 ? (sum / count).toFixed(2) : null;
        }

        if (count > 0)
            return (
                <div className="reviews-box">
                    <p>Opinie o produkcie</p>
                    <p>średnia ocena</p>
                    <h3> {rating} / 5 </h3>
                    {this.props.reviews.map(review =>
                        <Review author={review.author} rating={review.rating} comment={review.comment}/>
                    )}
                </div>
            );
        else return (
            <div className="reviews-box">
                Brak opinii
            </div>
        );
    }
}
