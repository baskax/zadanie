import axios from 'axios';

export default class Connector {

    constructor() {
        this.api = 'http://localhost:8110/api';
    }

    getAllProducts() {
        axios.get(this.api + '/products')
            .then(function (response) {
               return response.data;
            });
    }

}