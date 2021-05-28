'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
    name: String,
    desc: String,
    category: String,
    year: Number,
    langs: String,
    img: String
});

module.exports = mongoose.model('Project', ProjectSchema);