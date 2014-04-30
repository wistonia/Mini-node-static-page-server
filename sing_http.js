/*jslint node: true */

/* Single file HTTP server
 * 
 * Serves an HTML file from a specified port
 * Disregards content of HTTP request.
 *
 * Usage:
 * node sing_http.js <port> <filename.html>
 * 
 * Author:
 * Tim <support@wistonia.co.uk>
 *
 */

var http = require('http');
var fs = require('fs');

var port = process.argv[2];
var htmlFile = process.argv[3];


// Get file size in bytes
try {
    var fileStats = fs.statSync(htmlFile);
} catch (err) {
    console.log("Error reading file: '" + htmlFile + "'. Server is not running.");
    process.exit(1);
}
var fileSize = fileStats.size;


// Customise HTTP server response
var responseArgs = { 'Content-Length': fileSize,
    'Content-Type': 'text/html; charset=utf-8',
    'X-Powered-By': 'Wistonia node server' };


// Get client IP for logging
var getIpFromRequest = function (request) {
    'use strict';
    return (request.headers['x-forwarded-for'] || '').split(',')[0]
        || request.connection.remoteAddress;
};


// Request Response handler
var handler = function (request, response) {
    'use strict';
    var now = new Date();
    console.log("Request from " + getIpFromRequest(request) + " on " + now);
    response.writeHead(200, responseArgs);
    // Get the file as a stream
    var source = fs.createReadStream(htmlFile);
    // Pipe it to the HTTP response. This should automatically handle the cleanup.
    source.pipe(response);
};

var server = http.createServer(handler);

server.on('error', function (err) {
    'use strict';
    if (err.code === 'EADDRINUSE') {
        console.log("Port number " + port + " is already in use. Server is not running.");
        process.exit(1);
    }
    throw err;
});

server.listen(port);

console.log("Serving " + htmlFile + " on port:" + port);
