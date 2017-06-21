import React from 'react';
import {Pagination} from 'react-bootstrap';

export default class Paginator extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pagination">
                <Pagination prev next items={this.props.pages} activePage={this.props.activepage}/>
            </div>
        );
    }

}