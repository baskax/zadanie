import Express from 'express';
import es from 'elasticsearch';
import Elastic from './utils/parser.js';

var app = new Express();
var client = new es.Client({host:'localhost:9200'});
var parser = new Elastic(client);

const port = 8110;

var cors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://fbla.pl:'+port);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(cors);

/*
var filters,page,recs,query,sort;

var search = (req,res,next) => {
    filters = req.query.filters;
    sort = req.query.sort;
    recs = req.query.recs;
    query = req.query.q;
    page = req.query.page;
    next(); 
}

app.use(search);
*/

app.get('/', (req,res) => {
    res.send('Working!');
    });

app.get('/*',(req,res) => {
    parser.parse(req,res);
    });

//run the server
app.listen(port, () => {
    console.log("Server listening on port " + port + "!");
    });

