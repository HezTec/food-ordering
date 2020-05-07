window.onload = load;
var socket = io.connect();

function load() {

  var store_button = document.getElementById("store");
  store_button.onclick = storeWindow;

  socket = io.connect();//defining the socket object for use in the load function

  /**
   *loads the unserved that were saved in the server
   *@param {JSON[]} data the resut of a socket.io aknowldedgement callback function requesting to get
   *the current orders saved to the server
   */
  socket.emit('order_list_request', function(data) {
    for (var i = 0; i < data.length; i++) {
      display(data[i].order, data[i].order_number);
    }

  });
}


function display(order, order_number) {

  var div = document.getElementById("order_window"); //getting the window where orders will be displayed
  var ul = document.createElement("ul"); //setting the new unordered list element to be created

  //setitng attributes and values to append the order number with
  ul.setAttribute('id', order_number);
  ul.setAttribute('onclick', "removeItem(" + order_number + ")");
  ul.appendChild(document.createTextNode("Order Number: " + order_number));
  div.appendChild(ul);

  ul = document.getElementById(order_number); //setting the ul to the new value that we just created to add to it

  //adding the food items to the order in the order page
  for (var i = 0; i < order.length; i++) {
    var ul_order = document.createElement("ul"); //the ul item that hold the name of the item
    ul_order.setAttribute("id", order_number + "-" + i); //setting the id for the description
    ul_order.appendChild(document.createTextNode("Order: " + order[i].name)); //setting the order name to be displayed
    ul.appendChild(ul_order); //adding the item to the order

    //getting new newly made ul and adding the descripton to it
    ul_order = document.getElementById(order_number + "-" + i); //setting the newly made ul to a variable
    var li = document.createElement("li"); //making the li item that will be added to the list
    li.appendChild(document.createTextNode("description: " + order[i].description)); //setting the description of the item
    ul_order.appendChild(li); //adding it to the order
  }
}

function storeWindow() {

}



/**
 *This class gets an order from the socket and displays it to the window
 *
 *@param {JSON[]} order a json array of all the food items in the order
 *@param {number} order_number the current order number in the list of orders.
 */
socket.on('kitchen_order', function(order, order_number) {

  var div = document.getElementById("order_window"); //getting the window where orders will be displayed
  var ul = document.createElement("ul"); //setting the new unordered list element to be created

  //setitng attributes and values to append the order number with
  ul.setAttribute('id', order_number);
  ul.setAttribute('onclick', "removeItem(" + order_number + ")");
  ul.appendChild(document.createTextNode("Order Number: " + order_number));
  div.appendChild(ul);

  ul = document.getElementById(order_number); //setting the ul to the new value that we just created to add to it

  //adding the food items to the order in the order page
  for (var i = 0; i < order.length; i++) {
    var ul_order = document.createElement("ul"); //the ul item that hold the name of the item
    ul_order.setAttribute("id", order_number + "-" + i); //setting the id for the description
    ul_order.appendChild(document.createTextNode("Order: " + order[i].name)); //setting the order name to be displayed
    ul.appendChild(ul_order); //adding the item to the order

    //getting new newly made ul and adding the descripton to it
    ul_order = document.getElementById(order_number + "-" + i); //setting the newly made ul to a variable
    var li = document.createElement("li"); //making the li item that will be added to the list
    li.appendChild(document.createTextNode("description: " + order[i].description)); //setting the description of the item
    ul_order.appendChild(li); //adding it to the order
  }
});



/**
 *This function removes an order from the window of kitchen orders
 *
 *@param {string} id the element id of the element to be removed
 */
function removeItem(id) {

  socket.emit('remove_order_request', id);

  var order_window = document.getElementById("order_window"); //the window with all the orders in it

  var count = 0;
  var found = false;

  //while loop to loop through all the orders, and find the order that is to be removed
  while (found == false) {
    if (order_window.childNodes[count].id == id) {
      order_window.removeChild(order_window.childNodes[count]);
      found = true;
    } else if (count == 100) { //the system isnt meant for 100+ entries so if it can find the id in 100 searches it will cancel
      found = true;
    }
    count++;
  }
}
