var express = require('express');
var app = express();
var alphabet = require('alphabetjs');
var bodyParser = require('body-parser');
var jade = require('jade');
var fs = require('fs');

var baseStyleTemplate = jade.compileFile('./template/baseStyle.jade');

app.set('view engine', 'jade');
app.set('views', './template');

app.use(bodyParser());

app.use('/js', express.static('./client/build/js'));
app.use('/css', express.static('./client/build/css'));

//渲染
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/resume/:name', function(req, res) {
    res.sendFile(__dirname + '/resumes/' + req.params.name + '.html');
})

app.post('/create', function(req, res) {
    var data = JSON.parse(req.body.data);
    console.log(req.body.data,data);
    var result = baseStyleTemplate(data);
    fs.writeFile(__dirname + '/resumes/aaa.html', result, function(err) {
        if (!err) {
            res.send('success');
        } else {
            console.error(err);
            res.send(err);
        }
    })
});

app.listen(3000);

console.log(alphabet('STARK', 'planar'));

console.log('Server runs at localhost:3000');
