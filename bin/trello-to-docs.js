#!/usr/bin/env node

require = require('esm')(module /*, options*/);
require('../lib/index').main(process.argv);