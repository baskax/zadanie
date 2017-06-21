import React from 'react';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import Modal from "./Modal";
import Paginator from "./Paginator";
import Filter from "./Filter";
import Search from "./Search";

export default class DataTable extends React.Component {

    constructor(props) {
        super(props);
        this.apiBase = 'http://localhost:8110/api/products';
        this.state = {products: []};
    }

    componentDidMount() {
        var self = this;
        axios.get(this.apiBase).then((response) => {
            self.setState({products: response.data})
        }).catch((err) => {
            self.refs.modal.handleClick();
        });
    }

    sort(field, dir) {
        var self = this;
        var order = field + "=" + dir;
        axios.get(this.apiBase, {
            params: {recs: 20, order: order}
        }).then((res) => {
            self.setState({products: res.data})
        }).catch((err) => {
            self.refs.modal.handleClick();
        });
    }

    render() {
        return (
            <div className="data-table">
                <Search/>
                <Filter />
                <Modal title="Error" content="Błąd" ref="modal"/>
                <div className="data-list">
                <Table bordered>
                    <thead>
                    <tr>
                        <th>Marka
                            <a onClick={() => this.sort("brand", "asc")}>▲</a>
                            <a onClick={() => this.sort("brand", "desc")}>▼</a>
                        </th>
                        <th>Model
                            <a onClick={() => this.sort("model", "asc")}>▲</a>
                            <a onClick={() => this.sort("model", "desc")}>▼</a>
                        </th>
                        <th>Cena
                            <a onClick={() => this.sort("price", "asc")}>▲</a>
                            <a onClick={() => this.sort("price", "desc")}>▼</a>
                        </th>
                        <th>Kategoria
                            <a onClick={() => this.sort("category", "asc")}>▲</a>
                            <a onClick={() => this.sort("category", "desc")}>▼</a>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.products.map(product =>
                        <tr key={product.id}>
                            <td>{product.brand}</td>
                            <td>{product.model}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                    <Paginator pages={5} activepage={1}/>
                </div>
            </div>
        );
    }


}