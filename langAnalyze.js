const Language = require('@google-cloud/language');
const axios = require('axios');
const API_KEY = require('./Google.js').API_KEY;

module.exports = function(req,res){
  // don't use req.body.text
  const text = req.body['text'];
  console.log(text);

  var body = {
    "encodingType": "UTF8",
    "document": {
      "type": "PLAIN_TEXT",
      "content": text
    }
  };
  axios.post('https://language.googleapis.com/v1/documents:analyzeSentiment?key='
    +API_KEY, body)
  .then((results) => {
    const sentiment = results.data;

    var respBody ={
      "magnitude" : sentiment.documentSentiment.magnitude,
      "score" : sentiment.documentSentiment.score,
      "language" : sentiment.language
    }

    res.setHeader('content-type','application/json');
    res.send(sentiment);
    res.end();
    // console.log(`Sentiment score: ${sentiment.score}`);
    // console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
};