import React from 'react';
import { FormControl } from 'react-bootstrap';

export default class Search extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="search-input">
                <FormControl id="search" type="text" label="Search" placeholder="Search..."/>
            </div>
        );
    }

}