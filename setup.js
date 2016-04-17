var config = require('./config'),
    rp = require('request-promise');

function handleError(err) {
  if (err.error &&
      err.error.errorResponse &&
      err.error.errorResponse.message) {
    console.log('Error: ' + err.error.errorResponse.message);
  } else {
    console.log(JSON.stringify(err, null, 2));
  }
}

function createDatabase() {
  var options = {
    method: 'POST',
    uri: 'http://' + config.host + ':8002/manage/v2/databases',
    body: config.databaseSetup,
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  };
  rp(options)
    .then(function (parsedBody) {
      console.log('Database created: ' + config.databaseSetup["database-name"]);
      getHost();
    })
    .catch(function (err) {
      handleError(err);
    });
}

var hostName = '';

function getHost() {
  var options = {
    method: 'GET',
    uri: 'http://' + config.host + ':8002/manage/v2/hosts',
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  };
  rp(options)
    .then(function (parsedBody) {
      hostName = parsedBody['host-default-list']['list-items']['list-item'][0].nameref;
      console.log('Host name: ' + hostName);
      createForest(hostName);
    })
    .catch(function (err) {
      handleError(err);
    });
}

function createForest(hostName) {
  config.forestSetup["host"] = hostName;
  var options = {
    method: 'POST',
    uri: 'http://' + config.host + ':8002/manage/v2/forests',
    body: config.forestSetup,
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  };
  rp(options)
    .then(function (parsedBody) {
      console.log('Forest created and attached: ' + config.forestSetup["forest-name"]);
      createREST();
    })
    .catch(function (err) {
      handleError(err);
    });
}

function createREST() {
  var options = {
    method: 'POST',
    uri: 'http://' + config.host + ':8002/v1/rest-apis',
    body: config.restSetup,
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  };
  rp(options)
    .then(function (parsedBody) {
      console.log('REST instance created at port: ' + config.restSetup["rest-api"]["port"]);
      createValidAxis();
    })
    .catch(function (err) {
      handleError(err);
    });
}

function createAxis(axisConfig, callback) {
  var options = {
    method: 'POST',
    uri: 'http://' + config.host + ':8002/manage/v2/databases/' + config.database.name + '/temporal/axes',
    body: axisConfig,
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  };
  rp(options)
    .then(function (parsedBody) {
      console.log('Temporal axis created: ' + axisConfig["axis-name"]);
      if (callback) {
        callback.call(this);
      }
    })
    .catch(function (err) {
      handleError(err);
    });
}

function createValidAxis() {
  createAxis(config.axisValidSetup, createSystemAxis);
}

function createSystemAxis() {
  createAxis(config.axisSystemSetup, createCollection);
}

function createCollection() {
  var options = {
    method: 'POST',
    uri: 'http://' + config.host + ':8002/manage/v2/databases/' + config.database.name + '/temporal/collections',
    body: config.collectionSetup,
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  };
  rp(options)
    .then(function (parsedBody) {
      console.log('Temporal collection created: ' + config.collectionSetup["collection-name"]);
      lsqtSetup();
    })
    .catch(function (err) {
      handleError(err);
    });
}

function lsqtSetup() {
  var options = {
    method: 'PUT',
    uri: 'http://' + config.host + ':8002/manage/v2/databases/' + config.database.name + '/temporal/collections/lsqt/properties?collection=temporalCollection',
    body: config.lsqtSetup,
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  };
  rp(options)
    .then(function (parsedBody) {
      console.log('LSQT enabled: ' + config.lsqtSetup["lsqt-enabled"]);
    })
    .catch(function (err) {
      handleError(err);
    });
}

function start() {
  createDatabase();
}

start();
