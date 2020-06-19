
var server = require('http');
var fs = require('fs');
var path = require('path');

server = server.createServer(function(request , response)
{
    var url = request.url;
    var type = url[1];
    var name = "Requests/";
    console.log("request : "+ __dirname + request.url);
    console.log("server : "+ url);

    
    if(request.url.match("index$"))
    {  name = "index.html";
        var indcustom = fs.createReadStream(name , 'utf8');
        response.writeHead(200 , {'Content-Type' : 'text/html'});
        indcustom.pipe(response); 
    }
    else if(request.url.match("auth$"))
    {  name = "auth.html";
        var indcustom = fs.createReadStream(name , 'utf8');
        response.writeHead(200 , {'Content-Type' : 'text/html'});
        indcustom.pipe(response); 
    }
    else if(request.url.match("chat$"))
    {  name = "chat.html";
        var indcustom = fs.createReadStream(name , 'utf8');
        response.writeHead(200 , {'Content-Type' : 'text/html'});
        indcustom.pipe(response); 
    }
    else if(request.url.match("css$"))
    {
        var indcustom = fs.createReadStream(__dirname + request.url , 'utf8');
        response.writeHead(200, {'Content-Type' : 'text/css'});
        indcustom.pipe(response);
    }
    else if(request.url.match("js$"))
    {
        var indcustom = fs.createReadStream(__dirname + request.url , 'utf8');
        response.writeHead(200, {'Content-Type' : 'text/javascript'});
        indcustom.pipe(response);
    }
    else if(request.url.match(".png$"))
    {
        var indcustom = fs.createReadStream(__dirname + request.url);
        response.writeHead(200, {'Content-Type' : 'image/png'});
        indcustom.pipe(response);
    }
    else if(request.url.match(".jpg$"))
    {
        var indcustom = fs.createReadStream(__dirname + request.url);
        response.writeHead(200, {'Content-Type' : 'image/jpg'});
        indcustom.pipe(response);
    }
    else if(request.url.match(".gif$"))
    {
        var indcustom = fs.createReadStream(__dirname + request.url);
        response.writeHead(200, {'Content-Type' : 'image/gif'});
        indcustom.pipe(response);
    }
    else if(request.url.match(".ttf$"))
    {
        var indcustom = fs.createReadStream(__dirname + request.url);
        response.writeHead(200, {'Content-Type' : 'font/ttf'});
        indcustom.pipe(response);
    }
    else if(request.url.match("favicon$"))
    {}
    
      
  }

);
server.listen(3000);
console.log('Listening at 3000.....');