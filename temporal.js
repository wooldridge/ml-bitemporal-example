var config = require('./config'),
    marklogic = require('marklogic'),
    fs = require('fs');

var db = marklogic.createDatabaseClient({
  host: config.host,
  port: config.database.port,
  user: config.auth.user,
  password: config.auth.pass,
  authType: 'digest'
});

var qb = marklogic.queryBuilder;

function insert(options) {
  var obj = {
    documents: {
      uri: options.uri,
      content: options.data
    },
    temporalCollection: config.collectionSetup['collection-name']
  };
  if (options.systemTime) {
    obj.systemTime = options.systemTime;
  }
  db.documents.write(obj)
  .result(
    function(response) {
      console.log('Temporal insert success: ');
      console.dir(response);
      read({uri: options.uri});
    },
    function(error) {
      console.log('Temporal insert failure: ');
      console.dir(error);
    }
  );
}

function remove(options) {
  var obj = {
    uris: options.uri,
    temporalCollection: config.collectionSetup['collection-name']
  };
  if (options.systemTime) {
    obj.systemTime = options.systemTime;
  }
  db.documents.remove(obj)
  .result(
    function(response) {
      console.log('Temporal delete success: ');
      console.dir(response);
      read({uri: options.uri});
    },
    function(error) {
      console.log('Temporal delete failure: ');
      console.dir(error);
    }
  );
}

function read(options) {
  db.documents.query(qb.where(qb.collection(options.uri)))
  .result(
    function(response) {
      console.log('Documents: ');
      response.forEach(function (val) {
        console.log(val.uri);
        console.dir(val.content);
      });
    },
    function(error) {
      console.log('Read failure: ');
      console.dir(error);
    }
  );
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    insert: insert,
    remove: remove,
    read: read
  }
}
