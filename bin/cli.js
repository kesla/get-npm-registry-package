#!/usr/bin/env node

require('../dist')(process.argv[2])
  .catch(err => console.error(err))
  .then(json => console.log(JSON.stringify(json, null, 2)));
