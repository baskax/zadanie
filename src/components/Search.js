import React from 'react';
import { FormControl } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

export default class Search extends React.Component {

    constructor(props) {
      super(props);
      this.apiBase = 'http://localhost:8110/api/product';
      this.state={
            value: '',
            suggestions: []
        };
      this.handleSearch = this.handleSearch.bind(this);
    } 

    handleSearch(e) {
      this.props.onSearchInput(e.target.value);
    } 
    
    onChange = (event, { newValue, method }) => {
        this.setState({
          value: newValue
        });
      };


    getSuggestionValue(suggestion) {
      return suggestion.brand + " " + suggestion.model;
    }

    renderSuggestion(suggestion) {
      return (
        <span>{suggestion.brand} - {suggestion.model}</span>
      );
    }

    getSuggestions = (value) => {
        var self = this;
         axios.get(this.apiBase,{params: {q:value}}).then((res) => {
            self.setState({suggestions: res.data})
        }).catch((err) => {
            if (err.response !== undefined && err.response.status === 404) void(0);
            else console.log(err);
        });
    }
  
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
    };
    
    render() {
        const { value, suggestions } = this.state;

        const inputProps = {
          placeholder: 'Type something',
          value,
          onChange: this.onChange
        };


        return(
            <div className="search-input">
                <Autosuggest 
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
//                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps} />
            </div>
        );
    }

}
