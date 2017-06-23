import React from 'react';
import axios from 'axios';
import {Table, Alert, Button} from 'react-bootstrap';
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
            errorMsg: '',
            noConnection: false    
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
            self.errorHandler(err)
        });
    }

    handleFilters(filtersInput) {
        this.setState({filters: filtersInput});
        this.getData();
    }

    handlePagination(paginationInput) {
        this.setState({page: paginationInput});
        this.getData();
    }
    
    handleRecsPerPage(records) {
        this.setState({recs: records});
        this.getData();
    }    
    
    errorHandler = (err) => {
        var error = err.response ? err.response.data : true;
        if (error === true) {
            this.setState({noConnection: true});
        } else {
            this.setState({errorMsg: error});
            this.refs.modal.handleClick();
        }
    }

    getData() {
        var self = this;
//        var filters = this.state.filters;
//        var filterQuery = "brand="+filters.brand+",model="+filters.model+",category="+filters.category+",price_min="+filters.price_min+",price_max="+filters.price_max;
        axios.get(this.apiBase, {
          params: {
            page: self.state.page,
            recs: self.state.recs,
           // filters: filterQuery
          }
        }).then((res) => {
            self.setState({products: res.data.data, count:res.data.count})
        }).catch((err) => {
            self.errorHandler(err)
        });
    }    
    
    componentDidMount() {
        var self = this;
        axios.get(this.apiBase, {
            params: {page: self.state.page, recs: self.state.recs
        }}).then((response) => {
            self.setState({products: response.data.data, count: response.data.count})
        }).catch((err) => {
            self.errorHandler(err)
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
            self.errorHandler(err)
        });
    }

    render() {
        const connected = this.state.noConnection;
        if (connected === false) return (
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
        else { 
            const divStyle = {
                width: '800px',
                height: '300px',
                margin: 'auto',
                position: 'absolute',
                top: '0',
                bottom: '0',
                left: '0',
                right: '0'
            };
            return(
            <div style={divStyle}>
                <Alert bsStyle="danger">
                <h4>Oh snap! There is an error!</h4>
                <p>Probably there is no connection with backend server, try to refresh the page by clicking the button below.</p>
                <p>
                <Button bsSize="medium" bsStyle="primary" onClick={this.handleRefresh}>Refresh</Button>
                </p>
               </Alert>
            </div>
        );
        }
    }

    handleRefresh = () => {
        window.location.reload(true);
    }
    
}
