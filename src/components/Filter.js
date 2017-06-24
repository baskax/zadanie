import React from 'react';
import ReactDOM from 'react-dom';
import {FormControl, ControlLabel, FormGroup, Button, ButtonGroup} from 'react-bootstrap';

export default class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var formData = {
            category: ReactDOM.findDOMNode(this.refs.category).value,
            brand: ReactDOM.findDOMNode(this.refs.brand).value,
            model: ReactDOM.findDOMNode(this.refs.model).value,
            price_min: ReactDOM.findDOMNode(this.refs.minPrice).value,
            price_max: ReactDOM.findDOMNode(this.refs.maxPrice).value
        };
        this.props.onFiltersSubmit(formData);
    };

    reset = () => {
        ReactDOM.findDOMNode(this.refs.category).value = "";
        ReactDOM.findDOMNode(this.refs.brand).value = "";
        ReactDOM.findDOMNode(this.refs.model).value = "";
        ReactDOM.findDOMNode(this.refs.minPrice).value = "";
        ReactDOM.findDOMNode(this.refs.maxPrice).value = "";
        this.props.onFiltersSubmit();
    }


    render() {
        return (
            <div className="filter-well">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <ControlLabel>Category</ControlLabel>
                        <FormControl componentClass="select" ref="category">
                            <option value="">All</option>
                            <option value="laptop">Laptops</option>
                            <option value="camera">Cameras</option>
                            <option value="tv">TVs</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Brand</ControlLabel>
                        <FormControl id="brandFilter" type="text" label="Brand" placeholder="Enter brand" ref="brand"/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Model</ControlLabel>
                        <FormControl id="modelFilter" type="text" label="Model" placeholder="Enter model" ref="model"/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Price from</ControlLabel>
                        <FormControl id="minPriceFilter" type="text" label="Price from" placeholder="0.00"
                                     ref="minPrice"/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Price to</ControlLabel>
                        <FormControl id="maxPriceFilter" type="text" label="Price to" placeholder="0.00"
                                     ref="maxPrice"/>
                    </FormGroup>
                    <ButtonGroup>
                        <Button bsStyle="primary" type="submit">Filter</Button>
                        <Button bsStyle="primary" onClick={this.reset}>Clear</Button>
                    </ButtonGroup>
                </form>
            </div>
        );
    }

}
