import express from "express";//importing express library

let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http, {
  pingTimeout: 60000000
});
let port = process.env.PORT || 3000;//getting the port



app.use(express.static('public'))//telling the node.js sever where to get static files like css and images

app.get('/', function(req: any, res: any) {
  res.sendFile(__dirname + '/index.html');//assigning the html file where input comes from
});

io.on('connection', function(socket: any) {
  console.log(socket.id);
});


http.listen(port, function() {
  console.log('listening on *:3000');
});
