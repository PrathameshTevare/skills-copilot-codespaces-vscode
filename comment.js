// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

// Use bodyParser to parse the body of the request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create an array to store the comments
var comments = [];

// Function to read the comments from the file
function readComments() {
    fs.readFile('comments.json', function(error, data) {
        if (error) {
            console.log('Error reading comments');
        } else {
            comments = JSON.parse(data);
        }
    });
}

// Function to write the comments to the file
function writeComments() {
    fs.writeFile('comments.json', JSON.stringify(comments), function(error) {
        if (error) {
            console.log('Error writing comments');
        }
    });
}

// Function to check if the comment is valid
function isValidComment(comment) {
    if (comment.name && comment.text) {
        return true;
    }
    return false;
}

// Read the comments from the file
readComments();

// Create a GET route to get the comments
app.get('/comments', function(req, res) {
    res.json(comments);
});

// Create a POST route to add a comment
app.post('/comments', function(req, res) {
    var comment = req.body;
    if (isValidComment(comment)) {
        comments.push(comment);
        writeComments();
        res.json(comment);
    } else {
        res.status(400).send('Invalid comment');
    }
});

// Start the server
app.listen(3000, function() {
    console.log('Server is running on http://localhost:3000');
});
