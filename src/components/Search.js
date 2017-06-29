import React from 'react';
import axios from 'axios';
import config from '../utils/config';
import { FormControl } from 'react-bootstrap';

export default class Search extends React.Component {

    constructor(props) {
      super(props);
      this.apiBase = config.api + "/products";
      this.state={
            value: '',
            suggestions: []
        };
      this.handleSearch = this.handleSearch.bind(this);
    }
 
    getInitialState() {
        return {
            value: ''
        };
    }

    handleSearch(e) {
      this.props.onSearchInput(e.target.value);
    } 

    getSuggestions(value) {
        var self = this;
         axios.get(this.apiBase,{params: {q:value}}).then((res) => {
            self.setState({suggestions: res.data})
        }).catch((err) => {
            if (err.response !== undefined && err.response.status === 404) void(0);
        });
    }
 
    onChange = (e) => {
        this.setState({value: e.target.value},this.getSuggestions(e.target.value));
    }
 
    render() {
        const inputProps = {
          placeholder: 'Type something',
          onChange: this.onChange
        };
        console.log(this.state.suggestions.length);        
        const suggestionsItems = this.state.suggestions.length == 0 ? "" : this.state.suggestions.map((suggestion) => 
            <span onClick={this.onClick} id={suggestion.id}>{suggestion.brand} - {suggestion.model}</span>
        );


        return(
            <div className="search-input">
            <FormControl
            type="text"
            value={this.state.value}
            placeholder={inputProps.placeholder}
            onChange={inputProps.onChange}
            />
            <div className="suggestions-list">{suggestionsItems}</div>
            </div>
        );
    }

}
