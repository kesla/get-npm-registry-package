#!/usr/bin/env node

var packageName = process.argv[2];

require('../dist')(packageName)
  .catch(err => console.error(err))
  .then(json => console.log(JSON.stringify(json, null, 2)));
