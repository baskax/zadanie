import React from 'react';

export default class Review extends React.Component {

    render() {
        return (
            <div className="review-single" style={{border: '1px solid black'}}>
                <p>Autor - <b>{this.props.author}</b></p>
                <p>Ocena - <b>{this.props.rating}</b></p>
                <p>Opinia - {this.props.comment}</p>
            </div>
        )
    }
}
