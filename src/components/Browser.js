import React from 'react';
import axios from 'axios';
import {Alert, Button} from 'react-bootstrap';
import DataTable from './DataTable';
import Modal from "./Modal";
import queryString from "query-string";
import config from "../utils/config";

export default class Browser extends React.Component {

    constructor(props) {
        super(props);
        this.apiBase = config.api + "/products";
        this.state = {
            data: {data: [], count: 0},
            searchText: '',
            filters: {},
            sort: {},
            page: 1,
            recs: 5,
            errorMsg: '',
            noConnection: false
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleFilters = this.handleFilters.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
        this.handleRecsPerPage = this.handleRecsPerPage.bind(this);
    }

    componentWillMount() {
        let params = queryString.parse(window.location.search);
        let newState = {};
        if (params.page !== undefined) newState.page = params.page;
        if (params.recs !== undefined) newState.recs = params.recs;
        if (params.filters !== undefined) {
             let filtersQuery = params.filters;
             let filters = filtersQuery.split(",");
             newState.filters = [];
             for (let i = 0; i < filters.length; i++) {                
                let filter = filters[i].split("=");
                newState.filters[filter[0]] = filter[1];
             }
        }
        if (params.order !== undefined) {
             let orderQuery = params.order;
             let order = orderQuery.split(",");
             let orderField = order[0].split("=");
             newState.sort = {};
             newState.sort.field = orderField[0];
             newState.sort.dir = orderField[1];
        }
        if (Object.keys(newState).length !== 0) this.setState(newState);
    }

    handleSearch(searchInput) {
        this.setState({searchText: searchInput});
    }

    handleSort(field, direction) {
        this.setState({sort: {field: field, dir: direction}}, this.getData);
    }

    handleFilters(filtersInput) {
        this.setState({filters: filtersInput}, this.getData);
    }

    handlePagination(paginationInput) {
        this.setState({page: paginationInput}, this.getData);
    }

    handleRecsPerPage(records) {
        this.setState({recs: records}, this.getData);
    }

    errorHandler = (err) => {
        var error = err.response ? err.response.data : true;
        if (error === true) {
            this.setState({noConnection: true});
        } else {
            if (err.response.status !== 404) this.setState({errorMsg: error},this.refs.modal.handleClick);
            else this.setState({data: {data: [], count: 0}});
        }
    }

    getData() {
        var self = this;
        var params = {};
        if (self.state.page !== undefined) params.page = self.state.page;
        if (self.state.recs !== undefined) params.recs = self.state.recs;
        if (self.state.sort.field !== undefined) params.order = self.state.sort.field + '=' + self.state.sort.dir;
        if (self.state.filters !== undefined && Object.keys(self.state.filters).length > 0) {
            var array = [];
            for (var prop in self.state.filters) {
                if (self.state.filters[prop] !== '') array.push(prop + "=" + self.state.filters[prop]);
            }
            params.filters = array.join(',');
        }
        axios.get(this.apiBase, {
            params: params
        }).then((res) => {
            self.setState({data: res.data})
        }).catch((err) => {
            self.errorHandler(err)
        });
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const notConnected = this.state.noConnection;
        if (notConnected === false) return (
            <div>
                <Modal title="Error" content={this.state.errorMsg} ref="modal"/>
                <DataTable data={this.state.data}
                           pagination={{
                               values: {page: this.state.page, recs: this.state.recs},
                               handlers: {page: this.handlePagination, recs: this.handleRecsPerPage}
                           }}
                           searchText={{value: this.state.searchText, handler: this.handleSearch}}
                           filters={{values: this.state.filters, handler: this.handleFilters}}
                           sort={this.handleSort}
                />
            </div>
        );
        else {
            return (
                <div className="connection-alert">
                    <Alert bsStyle="danger">
                        <h4>Oh snap! There is an error!</h4>
                        <p>Probably there is no connection with backend server, try to refresh the page by clicking the
                            button below.</p>
                        <p>
                            <Button bsStyle="primary" onClick={() => {
                                window.location.reload(true)
                            }}>Refresh</Button>
                        </p>
                    </Alert>
                </div>
            );
        }
    }

}
