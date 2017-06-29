import React from 'react';
import Filter from "./Filter";
import ProductTable from "./ProductTable";

export default class DataTable extends React.Component {

    render() {
        return (
            <div className="data-table">
                <Filter filtersValue={this.props.filters.values} onFiltersSubmit={this.props.filters.handler}/>
                <ProductTable data={this.props.data} pagination={this.props.pagination} sort={this.props.sort}/>
            </div>
        );
    }
}
