const express = require('express');
var app = express();
const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
var cors = require('cors');
app.use(cors());

const PORT = 8081;

const getContent = require('./getContent');
app.get('/getContent',getContent);

const langAnalyze = require('./langAnalyze');

app.post('/langAnalyze',langAnalyze);

app.listen(PORT,function(){
    console.log('Listening:'+PORT);
});
