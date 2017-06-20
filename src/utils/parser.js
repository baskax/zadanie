export default class Parser {

  /**
  * @param client - instance of initialized (connected) nodejs elasticsearch client
  */
  constructor(client) {
    this.client = client;
    this.debug = false;
  }


  /**
  * @brief function returns base query used in all elasticsearch queries, contains index, type and body to simplify further work
  */
  getBaseQuery(bool = null) {    
    var query = {
      index: 'catalog',
      type: 'product',
      body: {
        query: {}
      }
    };
    if(bool!==null) {
      var query = {
        index: 'catalog',
        type: 'product',
        body: {
          query: {
            bool: {
              must: []
              }
            }
          }
      };
    }
    return query;
  }

  /**
  * @brief function parsing request object and depends on its content running corresponding actions, 
  *
  *   4 cases:
  *   only /api/products;
  *   /products + params ie. /api/products?filters=price_max=20000,price_min=2000&order=brand=asc,price=desc&q=janusz&page=1&recs=20
  *   /products/category ie. /api/products/camera
  *   /products/category + params ie. /api/products/camera?q=Canon&order=[rating=desc,price=asc]
  *
  * @param req - request object
  * @param res - response object
  */
  parse(req,res) {
    var path = req.path;
    var splitted = path.split("/");
    if (splitted[2] === "products") { // /products
      if (splitted.length === 3 && Object.keys(req.query).length === 0) {    //nothing behind /products
        this.getAll(res);
      } else if (splitted.length === 3 && Object.keys(req.query).length > 0) {  // /products + query params in GET
        this.processQueriedRequest(req,res);
      } else if(splitted.length === 4 && Object.keys(req.query).length === 0) { // /products/category - no other queries in GET
        var category = splitted[3];
        this.getAllFromCategory(res,category);
      } else if(splitted.length === 4 && Object.keys(req.query).length > 0) {   ///products/category + query params in GET
        var category = splitted[3];
        this.processQueriedRequest(req,res,category);
      } else {
      res.status(400).json("Bad request!");
      }
    } else {
      res.status(400).json("Bad request!");
    }
  }  

  /**
  * @brief function building a "match_all" query to elasticsearch with no parameters to get all documents inside index and type
  *
  * @param res - response object
  */
  getAll(res) {
    var query = this.getBaseQuery();
    query.body.query.match_all = {};
    this.executeSearchQuery(res,query);
  }

  /**
  * @brief function building a bool must match query to elasticsearch with category parameter to get all documents with exact given category
  *
  * @param res - response object
  * @param category - category from request uri (products/category)
  */
  getAllFromCategory(res,category) {
    var query = this.getBaseQuery();
    query.body.query.bool = {must:{match:{"category":category}}};
    this.executeSearchQuery(res,query);
  }

  /**
  * @brief function process queried request (query params in GET)
  *
  * @param req - request object
  * @param res - response object
  * @param category - category to search for, default null
  */
  processQueriedRequest(req,res,category = null) {
  var self = this;
  var query = this.getBaseQuery(true);
  var legalParams = ["q","order","page","recs","filters"];
  var queryParams = Object.keys(req.query);
  if(this.notContains(legalParams,queryParams)) {
    res.status(400).json("Bad request, use of inappropiate query param!");
    return false;
  }

  //category
  if (category !== null) {
    query.body.query.bool.must.push({term:{category:category}});
  }

  //free search
  if (req.query.q !== undefined && req.query.q !== "") {
    query.body.query.bool.must.push({term:{_all:req.query.q}});
  }

  var legalSortFields = ['brand','category','created','model','price'];
  var legalSortDirections = ['asc','desc'];
  //order - ?order=field=dir,field2=dir,field3=dir
  if (req.query.order !== undefined && req.query.order !== "") {
    query.body.sort = [];
    var sort = req.query.order;
    var sortFields = sort.split(","); //splitting fields if any
    var fieldFail = false; //need to handle promise
    var orderFail = false; //same as above
    for (var i=0;i<sortFields.length;i++) {
      var toSort = sortFields[i].split("=");//extracting field and order
      var sortField = toSort[0];
      if (self.notContains(legalSortFields,[sortField])) {
        fieldFail = true;
        break;
      } 
      var sortDir = toSort[1];
      if (self.notContains(legalSortDirections,[sortDir])) {
        orderFail = true;
        break;
      }
      query.body.sort.push({ [sortField] :{ order : sortDir } });
    }
     
    if (orderFail === true) { 
      res.status(400).json("Bad request, illegal sort direction!"); 
      return false; 
    }
    if (fieldFail === true) { 
      res.status(400).json("Bad request, illegal sort field!"); 
      return false; 
    }
  } else {
    query.body.sort = {created:{order:"desc"}}; //default order
  }

  //pagination defaults
  var page = 1;
  var recs = 5;
  //pagination
  if (req.query.recs !== undefined && req.query.recs !== "") {
  recs = parseInt(req.query.recs);
  }
  if (req.query.page !== undefined && req.query.page !== "") {
  page = parseInt(req.query.page);  
  }
  var start = recs * page - recs;
  query.body.from = start;
  query.body.size = recs;

  //filters
  var legalFilters = ['brand','model','category','price_min','price_max']; 
  var filterFail = false;
  if (req.query.filters !== undefined && req.query.filters !== "") {
    query.body.query.bool.filter = [];
    var filtersQuery = req.query.filters;
    var filters = filtersQuery.split(","); //splitting fields if any
    var fieldFail = false; //need to handle promise
    for (var i=0;i<filters.length;i++) {
      var filter = filters[i].split("=");//extracting field and order
      var filterField = filter[0];
      if (self.notContains(legalFilters,[filterField])) {
        filterFail = true;
        break;
      }
      var filterValue = filter[1];
      if (filterField == 'price_min') {
        query.body.query.bool.filter.push({ range :{ price : { gte : filterValue }}});
        continue;
      }
      if (filterField == 'price_max') {
        query.body.query.bool.filter.push({ range :{ price : { lte : filterValue }}});
        continue;
      }
      query.body.query.bool.filter.push({ term :{ [filterField] : filterValue } });
    }
    if (filterFail === true) {
      res.status(400).json("Bad request, illegal filter name");
      return false;
    }
  }

  if (this.debug === true) {
    console.log(JSON.stringify(query,null,2));
  }
  this.executeSearchQuery(res,query);
  }

  /**
  * @brief check if array not contains any key from another array
  *
  * @param haystack - array to check in
  * @param arr - array we look for
  */
  notContains(haystack, arr) {
    return arr.some(function (v) {
        return haystack.indexOf(v) < 0;
    });
  }
  
  /**
  * @brief function executing given query as search query within elasticsearch and passing resilts to dataFilter function, returns http status 500 in case of error
  *
  * @param res - response object
  * @param query - query to run within elasticsearch
  */
  executeSearchQuery(res,query) {
    var self = this;
    this.client.search(query).then(function(resp) {
      var hits = resp.hits.hits;
      self.dataFilter(res,hits);
    }, function(err) {
      res.status(500).json(err);
    });
  }

  /**
  * @brief response filtering, to prevent providing all data got from elasticsearch (like index, type or score), returns http status 404 when nothing found
  *
  * @param res - response object
  * @param data - data got from elasticsearch 
  */
  dataFilter(res,data) {
      if(data.length > 0) {
        var response = [];
          for (var i = 0, len = data.length; i < len; i++) {
            var parsed = data[i]._source;
            parsed.id = data[i]._id;
            response.push(parsed);
          }
        res.status(200).json(response);
      } else {
        res.status(404).json("nothing found");
      }
  }
}
