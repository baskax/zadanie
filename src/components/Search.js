import React from 'react';
import { FormControl } from 'react-bootstrap';

export default class Search extends React.Component {

    constructor(props) {
      super(props);
      this.handleSearch = this.handleSearch.bind(this);
    } 

    handleSearch(e) {
      this.props.onSearchInput(e.target.value);
    } 
    
    render() {
        return(
            <div className="search-input">
                <FormControl id="search" type="text" label="Search" placeholder="Search..." value={this.props.searchText} onChange={this.handleSearch} />
            </div>
        );
    }

}
