/**
 * Ifmo
 * Copyright (C) 2011 Erin Carter ( hi@dnvsfn.com )
 * MIT Licensed
 */

/** Exports */
exports = module.exports = Ifmo;

// Ifmo Object
function Ifmo () {};

// Version
Ifmo.VERSION = '0.0.1';

// Expose Find
Ifmo.find = require('./find');

// Expose Watch
Ifmo.watch = require('./watch');
