import React from 'react';
import {FormControl, ControlLabel, FormGroup, Button, ButtonGroup} from 'react-bootstrap';

export default class Filter extends React.Component {

    render() {
        return (
            <div className="filter-well">
                <FormGroup>
                    <ControlLabel>Brand</ControlLabel>
                    <FormControl id="brandFilter" type="text" label="Brand" placeholder="Enter brand"/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Model</ControlLabel>
                    <FormControl id="modelFilter" type="text" label="Model" placeholder="Enter model"/>
                </FormGroup>
                <ButtonGroup>
                    <Button bsStyle="primary">Filter</Button>
                    <Button bsStyle="primary">Clear</Button>
                </ButtonGroup>
            </div>
        );
    }

}
