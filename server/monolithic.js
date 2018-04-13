// HTTP 를 이용하여 만든다.
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const members = require('./monolithic_members.js');
const goods = require('./monolithic_goods.js');
const purchase = require('./monolithic_purchases.js');

var server = http.createServer((req, res) => {
    var method = req.method;
    var uri = url.parse(req.url, true);
    var pathname = uri.pathname;

    if (method === "POST" || method === "PUT") {
        var body = "";

        req.on('data', function (data) {
            body += data;
        });

        req.on('end', function () {
            var params;

            if (req.headers['content-type'] == "application/json") {
                params = JSON.parse(body);
            } else {
                params = querystring.parse(body);
            }

            onRequest(res, method, pathname, params);
        });        
    } else {
        onRequest(res, method, pathname, uri.query);
    }


}).listen(8000);

function onRequest(res, method, pathname, params) {
    //res.end("ok, I got it!");
    switch (pathname) {
        case "/members":
            members.onRequest(res, method, pathname, params, response);
            break;

        case "/goods":
            goods.onRequest(res, method, pathname, params, response);
            break;

        case "/purchases":
            purchases.onRequest(res, method, pathname, params, response);
            break;
        default:
            res.writeHead(404);
            return res.end("oops!\n" + pathname + "\nis wrong page");
    }
}

function response(res, packet) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(packet));
}