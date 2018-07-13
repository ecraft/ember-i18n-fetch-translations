'use strict';

// This program produces a list of ember-try targets that will be consumed by
// xargs -d '\n' in CircleCI to enable parallel tests
const getChannelURL = require('../config/ember-try.js');
getChannelURL().then((config) => {
  process.stdout.write((config.scenarios.map((scenario) => {
    return scenario.name;
  }).join('\n')));
});
