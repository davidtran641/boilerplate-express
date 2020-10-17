var bodyParser = require('body-parser');

var express = require('express');
var app = express();

// --> 7)  Mount the Logger middleware here


// --> 11)  Mount the body-parser middleware  here


console.log("Hello World");

app.use(function(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/views/index.html")
});

app.get("/json", function(req, res){
    var message = "Hello json";
    if (process.env.MESSAGE_STYLE == "uppercase") {
        message = message.toUpperCase();
    }
    res.json({"message": message});
});

app.get('/now', function(req, res, next){
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.send({"time": req.time});
});

app.get('/:word/echo', function(req, res) {
    res.json({"echo": req.params.word});
});

app.get('/name',  function(req, res) {
    res.json({'name': req.query.first + ' ' + req.query.last});
});


/** 12) Get data form POST  */



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
