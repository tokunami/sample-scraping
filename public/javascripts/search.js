function search(callback){
  var request = require('request');
  var cheerio = require('cheerio');

  var url = require('url');

  var search_url=url.format({
      protocol: 'https:',
      port: null,
      hostname: 'www.googleapis.com',
      search: '?key=<API key>&cx=<engine id>&q=',
      pathname: '/customsearch/v1',
    });
  var keyword_url = 'http://news.google.co.jp/';

    request({
      'uri': keyword_url,
      'proxy':'<proxy url>:<port>'
      }, function (error, response, body) {
        if (error) {
          callback(error);
          console.error(error);
          return;
        }
        if (response.statusCode !== 200) {
          callback(response.statusCode);
          return;
        }

        $ = cheerio.load(body);  //Create cheerio instance
        var searchkey = $("#s_BREAKING_NEWS_BOX").text().slice(2,6);

        request({
          'uri': search_url+searchkey,
          'json': true,
          'proxy':'<proxy url>:<port>'
          }, function(error, response, body) {

            if (error) {
              callback(error);
              console.error(error);
              return;
            }
            if (response.statusCode !== 200) {
              callback(response.statusCode);
              return;
            }

            callback(null, body);

        });
    });

}

module.exports.search = search;
