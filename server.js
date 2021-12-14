'use strict';
var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(path.join(__dirname, '/')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});

// Allows you to set port in the project properties.
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    console.log('listening');
});