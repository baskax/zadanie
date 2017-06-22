import React from 'react';
import {Pagination, FormControl} from 'react-bootstrap';

export default class Paginator extends React.Component {

    constructor(props) {
      super(props);
      this.handlePageChange = this.handlePageChange.bind(this);
      this.handleRecsChange = this.handleRecsChange.bind(this);
    }    

    handlePageChange(e) {
      this.props.onPageChange(e);
    }

    handleRecsChange(e) {
      this.props.onRecsChange(e.target.value);
    }

    render() {
        return (
            <div className="pagination-box">
                <Pagination prev next items={this.props.pages} activePage={this.props.activepage} onSelect={this.handlePageChange} />
                <div className="pull-right">
                  <FormControl componentClass="select" onChange={this.handleRecsChange} >
                    <option selected value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                  </FormControl>
                </div>
            </div>
        );
    }

}
