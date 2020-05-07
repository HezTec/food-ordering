import express from "express";//importing express library

let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http, {
  pingTimeout: 60000000
});
let port = process.env.PORT || 3000;//getting the port

var order_count = 0;// variable that saves the order number in the server
var saved_orders = new Array();





app.use(express.static('public'))//telling the node.js sever where to get static files like css and images

app.get('/', function(req: any, res: any) {
  res.sendFile(__dirname + '/index.html');//assigning the html file where input comes from
});


//the block of code for handling all socket funcitons
io.on('connection', function(socket: any) {

  /**
   *receives an order and both relays the order on to the kithen pages as well as saves
   *the order to a local sever
   *
   *@param {JSON[]} order the order item in json format
   *@param {number} order_number the order number of the order
   */
  socket.on('order', function(order: [], order_number: number) {

    saved_orders.push({ order_number, order });//saving the order info to the serverside array

    io.emit('kitchen_order', order, order_number);//sending the order info to the kitchen for live view


    order_count++;//incrementing the order counter
    //if the order count goes past 300 it resets to 0
    if (order_count > 300) {
      order_count = 0;
    }
  });

  /**
   *Sends the current order the kitchen is on
   *@param {function} callback the function that will then send back the order
   *number the kitchen is currently on
   */
  socket.on('order_count_request', function(callback: any) {
    callback(order_count);//returning the function
  });

  /**
   *sends the currnt orders that havent been served yet
   *@param {funciton} callback the function that sends the current orderlist back to the requester
   */
  socket.on('order_list_request', function(callback: any) {
    callback(saved_orders);
  });


  /**
   *removes an order from the saved orders here on the server
   *@param {number} id the id of the order to be removed
   *
   */
  socket.on('remove_order_request', function(id: number) {
    for (var i = 0; i < saved_orders.length; i++) {
      if (saved_orders[i].order_number == id) {
        saved_orders.splice(i, 1);
      }
    }
  });

});


http.listen(port, function() {
  console.log('listening on *:3000');
});
