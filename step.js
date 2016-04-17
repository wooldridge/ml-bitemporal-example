var config = require('./config'),
    temporal = require('./temporal');

// Insert options
var jan05 = {
  uri: 'person.json',
  data: {
    sysStart: null,
    sysEnd: null,
    valStart: '2016-01-01T00:00:00Z',
    valEnd: '9999-12-31T23:59:59Z',
    data: 'Alameda'
  },
  systemTime: '2016-01-05T00:00:00Z'
};

var jan12 = {
  uri: 'person.json',
  data: {
    sysStart: null,
    sysEnd: null,
    valStart: '2016-01-10T00:00:00Z',
    valEnd: '9999-12-31T23:59:59Z',
    data: 'Berkeley'
  },
  systemTime: '2016-01-12T00:00:00Z'
};

var jan15 = {
  uri: 'person.json',
  data: {
    sysStart: null,
    sysEnd: null,
    valStart: '2016-01-08T00:00:00Z',
    valEnd: '9999-12-31T23:59:59Z',
    data: 'Berkeley'
  },
  systemTime: '2016-01-15T00:00:00Z'
};

// Delete options
var jan18 = {
  uri: 'person.json',
  systemTime: '2016-01-18T00:00:00Z'
}

var args = process.argv;

switch(args[2]) {
  case '1':
    temporal.insert(jan05);
    break;
  case '2':
    temporal.insert(jan12);
    break;
  case '3':
    temporal.insert(jan15);
    break;
  case '4':
    temporal.remove(jan18);
    break;
  default:
    temporal.read('person.json');
}
