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
        this.apiBase = 'http://fbla.pl:8110/api/products';
        this.state = {
          products: [],
          count: '',
          searchText: '',
          filters: [],
          page: 1,
          recs: 5,
          errorMsg: ''
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleFilters = this.handleFilters.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
        this.handleRecsPerPage = this.handleRecsPerPage.bind(this);
    }

    handleSearch(searchInput) {
        var self = this;
        self.setState({searchText: searchInput});
        axios.get(this.apiBase, {
            params: {q: searchInput}
        }).then((res) => {
            self.setState({products: res.data.data, count: res.data.count})
        }).catch((err) => {
            self.setState({errorMsg: err.response.data});
            self.refs.modal.handleClick();
        });
    }

    handleFilters(filtersInput) {
        this.setState({filters: filtersInput});
    }

    handlePagination(paginationInput) {
      this.setState({page: paginationInput});
      this.getData();
    }
    
    handleRecsPerPage(records) {
      this.setState({recs: records});
      this.getData();
    }    


    getData() {
        var self = this;
        axios.get(this.apiBase, {
          params: {
            page: self.state.page,
            recs: self.state.recs
          }
        }).then((res) => {
            self.setState({products: res.data.data, count:res.data.count})
        }).catch((err) => {
            self.setState({errorMsg: err.response.data});
            self.refs.modal.handleClick();
        });
    }    
    
    componentDidMount() {
        var self = this;
        axios.get(this.apiBase, {
            params: {page: self.state.page, recs: self.state.recs
        }}).then((response) => {
            self.setState({products: response.data.data, count: response.data.count})
        }).catch((err) => {
            self.setState({errorMsg: err.response.data});
            self.refs.modal.handleClick();
        });
    }

    sort(field, dir) {
        var self = this;
        var order = field + "=" + dir;
        axios.get(this.apiBase, {
            params: {page: self.state.page, recs: self.state.recs, order: order}
        }).then((res) => {
            self.setState({products: res.data.data, count: res.data.count})
        }).catch((err) => {
            self.setState({errorMsg: err.response.data});
            self.refs.modal.handleClick();
        });
    }

    render() {
        return (
            <div className="data-table">
                <Search searchText={this.state.searchText} onSearchInput={this.handleSearch} />
                <Filter filtersValue={this.state.filters} onFiltersSubmit={this.handleFilters} />
                <Modal title="Error" content={this.state.errorMsg} ref="modal"/>
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
                        <th>Ocena
                            <a onClick={() => this.sort("rating", "asc")}>▲</a>
                            <a onClick={() => this.sort("rating", "desc")}>▼</a>
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
                            <td>{product.rating}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                    <Paginator pages={ Math.ceil(parseInt(this.state.count,10)/parseInt(this.state.recs,10)) } activepage={this.state.page} onPageChange={this.handlePagination} onRecsChange={this.handleRecsPerPage} />
                </div>
            </div>
        );
    }


}
