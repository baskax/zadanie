import React from 'react';

export default class TableHeader extends React.Component {

    constructor(props) {
        super(props);
        this.handleSort = this.handleSort.bind(this);
    }

    handleSort(field,direction) {
        this.props.onSort(field,direction);
    }

    render() {
        if (this.props.sort)
        return (
            <th>{this.props.name}
                <a onClick={() => this.handleSort(this.props.sortField, "asc")}>▲</a>
                <a onClick={() => this.handleSort(this.props.sortField, "desc")}>▼</a>
            </th>
        );
        else return(
            <th>{this.props.name}</th>
        );
    }
}