export default class Parser {

  /**
  * @param client - instance of initialized (connected) nodejs elasticsearch client
  */
  constructor(client) {
    this.client = client;
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
            bool: {}
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
  *   only /products;
  *   /products + params ie. /products?q=Nikon&order=price[desc]
  *   /products/category ie. /products/camera
  *   /products/category + params ie. /products/camera?q=Canon&order=[rating=desc,price=asc]
  *
  * @param req - request object
  * @param res - response object
  */
  parse(req,res) {
    var path = req.path;
    var splitted = path.split("/");
    if (splitted[1] === "products") { // /products
      if (splitted.length === 2 && Object.keys(req.query).length === 0) {    //nothing behind /products
        this.getAll(res);
      } else if (splitted.length === 2 && Object.keys(req.query).length > 0) {  // /products + query params in GET
        this.processQueriedRequest(req,res);
      } else if(splitted.length === 3 && Object.keys(req.query).length === 0) { // /products/category - no other queries in GET
        var category = splitted[2];
        this.getAllFromCategory(res,category);
      } else if(splitted.length === 3 && Object.keys(req.query).length > 0) {   ///products/category + query params in GET
        var category = splitted[2];
        this.processQueriedRequest(req,res,category);
      } else {
      res.status(401).json(req.query);
      }
    } else {
      res.status(401).json("Bad request!");
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
  var query = this.getBaseQuery(true);
  var legalParams = ["q","order","page","recs"];
  var queryParams = Object.keys(req.query);
  console.log(queryParams);


  //category
  if (category !== null) {
    query.body.query.bool.must = {match:{category:category}};    
  }

  //free search
  if (req.query.q !== undefined && req.query.q !== "") {
    query.body.query.bool.filter = {match:{_all:req.query.q}};
  }

  this.executeSearchQuery(res,query);
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
