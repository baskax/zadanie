import React from 'react';
import {Table} from 'react-bootstrap';
import Paginator from "./Paginator";
import TableHeader from "./TableHeader";
import ProductRow from "./ProductRow";

export default class ProductTable extends React.Component {

    render() {
        return (
            <div className="data-list">
                <Table bordered>
                    <thead>
                    <tr>
                        <TableHeader name="Marka" sort sortField="brand" onSort={this.props.sort}/>
                        <TableHeader name="Model" sort sortField="model" onSort={this.props.sort}/>
                        <TableHeader name="Cena" sort sortField="price" onSort={this.props.sort}/>
                        <TableHeader name="Kategoria" sort sortField="category" onSort={this.props.sort}/>
                        <TableHeader name="Ocena"/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.data.data.map(product =>
                        <ProductRow key={product.id} id={product.id} brand={product.brand} model={product.model} price={product.price} category={product.category} review={product.review} />
                    )}
                    </tbody>
                </Table>
                <Paginator
                    pages={ Math.ceil(parseInt(this.props.data.count, 10) / parseInt(this.props.pagination.values.recs, 10)) }
                    activepage={this.props.pagination.values.page} onPageChange={this.props.pagination.handlers.page}
                    onRecsChange={this.props.pagination.handlers.recs}/>
            </div>
        );
    }
}

/*




 */