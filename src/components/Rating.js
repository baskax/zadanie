import React from 'react';

export default class Rating extends React.Component{
  render() {
    return (
      <span className="rating">
        {this.props.rating}
      </span>
    );
  }
}
