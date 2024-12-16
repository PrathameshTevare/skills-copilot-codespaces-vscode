// Create web server
var express = require('express'); 
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set up the database
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('comment.db');

// Create table
db.serialize(function() {
    db.run('CREATE TABLE IF NOT EXISTS comment (name TEXT, comment TEXT)');
});

