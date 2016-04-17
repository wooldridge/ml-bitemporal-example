var config = {};

config.host = "localhost";

config.database = {
  "name": "ml-bitemporal-example",
  "port": 8554
};

config.auth = {
  user: 'ML_USER',
  pass: 'ML_PASSWORD',
  sendImmediately: false
};

config.databaseSetup = {
  "database-name": config.database.name,
  "range-element-index": [
    {
      "collation": "",
      "invalid-values": "reject",
      "localname": "valStart",
      "namespace-uri": "",
      "range-value-positions": false,
      "scalar-type": "dateTime"
    },
    {
      "collation": "",
      "invalid-values": "reject",
      "localname": "valEnd",
      "namespace-uri": "",
      "range-value-positions": false,
      "scalar-type": "dateTime"
    },
    {
      "collation": "",
      "invalid-values": "reject",
      "localname": "sysStart",
      "namespace-uri": "",
      "range-value-positions": false,
      "scalar-type": "dateTime"
    },
    {
      "collation": "",
      "invalid-values": "reject",
      "localname": "sysEnd",
      "namespace-uri": "",
      "range-value-positions": false,
      "scalar-type": "dateTime"
    }
  ]
};

config.forestSetup = {
  "forest-name": config.database.name + '-1',
  "database": config.database.name
}

config.restSetup = {
  "rest-api": {
    "name": config.database.name + "-rest",
    "database": config.database.name,
    "modules-database": config.database.name + "-modules",
    "port": config.database.port,
    "error-format": "json"
  }
}

config.axisValidSetup = {
  "axis-name": "axisValid",
  "axis-start": {
    "element-reference": {
      "namespace-uri": "",
      "localname": "valStart"
    }
  },
  "axis-end": {
    "element-reference": {
      "namespace-uri": "",
      "localname": "valEnd"
    }
  }
};

config.axisSystemSetup = {
  "axis-name": "axisSystem",
  "axis-start": {
    "element-reference": {
      "namespace-uri": "",
      "localname": "sysStart"
    }
  },
  "axis-end": {
    "element-reference": {
      "namespace-uri": "",
      "localname": "sysEnd"
    }
  }
};

config.collectionSetup = {
  "collection-name": "temporalCollection",
  "system-axis": "axisSystem",
  "valid-axis": "axisValid"
};

config.lsqtSetup = {
  "lsqt-enabled": true
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = config;
}
