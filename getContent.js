var axios = require('axios');
var cheerio = require('cheerio');

module.exports = function(req,res){
    var url= req.query.url;

    axios.get(url)
    .then(function(response){
        var $ = cheerio.load(response.data);
        $("footer").remove();
        $('img').remove();
        $('header').remove();
//        $('style').remove();
        var body = $('body').text();
        // body.replace('.jpg">',"");
        // body.replace('<img',"");
        // body.replace('src="','');


        console.log(body);
        res.setHeader('content-type','text/plain');
        res.send(body);
        res.end();
    }).catch(function(err){
        console.log(err);
    });

};