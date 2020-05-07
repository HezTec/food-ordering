window.onload = load;

var socket; //the socket object
var order = [];
var order_total = 0;
var order_number = 0;
//array of all food items to substitue for a database of food
var food_array = [{
  "id": "grilled_cheese",
  "name": "grilled cheese",
  "price": 4.99,
  "description": "American cheese between two toasted slices of bread",
  "special": "none"
},
{
  "id": "turkey_sandwhich",
  "name": "turkey sandwhich",
  "price": 4.99,
  "description": "turkey on bread, with cheese letuce and mayo",
  "special": "none"
},
{
  "id": "mayo_sandwhich",
  "name": "mayo sandwhich",
  "price": 5.99,
  "description": "mayo, tomato, onions and chopped letuce between two toasted buns",
  "special": "none"
},
{
  "id": "ham_sandwhich",
  "name": "ham sandwhich",
  "price": 5.99,
  "description": "ham, letuce, and american cheese toasted between two slices of bread",
  "special": "none"
},
{
  "id": "water",
  "name": "water",
  "price": 0.99,
  "description": "purified water",
  "special": "none"
},
{
  "id": "mnt_dew",
  "name": "mountian dew",
  "price": 1.99,
  "description": "bottled mountain dew",
  "special": "none"
},
{
  "id": "iced_tea",
  "name": "iced tea",
  "price": 1.99,
  "description": "fresh homemade iced tea",
  "special": "none"
},
{
  "id": "coke",
  "name": "coca-cola",
  "price": 1.99,
  "description": "a standard can of coke",
  "special": "none"
},
{
  "id": "potato",
  "name": "potato chips",
  "price": 2.99,
  "description": "A medium sized bag of chips",
  "special": "none"
},
{
  "id": "snv",
  "name": "salt and vinegar",
  "price": 2.99,
  "description": "a medium sized bag of salt and vinegar chips",
  "special": "none"
},
{
  "id": "flame",
  "name": "flamin hot",
  "price": 2.99,
  "description": "a medium sized bag of flamin hot chips",
  "special": "none"
},
{
  "id": "bbq",
  "name": "honey bbq",
  "price": 2.99,
  "description": "a medium sized bag of honey bbq",
  "special": "none"
},
{
  "id": "vanilla",
  "name": "vanilla",
  "price": 3.99,
  "description": "home made vanilla ice cream",
  "special": "none"
},
{
  "id": "choco",
  "name": "chocolate",
  "price": 3.99,
  "description": "home made chocolate ice cream",
  "special": "none"
},
{
  "id": "strawberry",
  "name": "strawberry",
  "price": 3.99,
  "description": "home made strawberry ice cream",
  "special": "none"
},
{
  "id": "blue",
  "name": "blueberry",
  "price": 3.99,
  "description": "home made blueberry ice cream",
  "special": "none"
}
];



/**
 * load fucntion for window.onload
 */
function load() {

  var pictures = $$("#food_box img"); //getting the sandwhich pictures

  //loading the pictures to be double clickable
  for (var i = 0; i < pictures.length; i++) {
    pictures[i].ondblclick = foodClick;
  }

  //enabling the pictures to be dragged
  for (var i = 0; i < pictures.length; i++) {
    new Draggable(pictures[i], {
      revert: true
    });
  }

  //specifying a function when foods are dragged to the cart
  Droppables.add("drop_container", {
    onDrop: foodDrop
  });

  //defining the submit button
  var submit = document.getElementById("submitButton");
  submit.onclick = submitOrder;

  //defining the kitchen button
  var kitchenButton = document.getElementById("kitchen");
  kitchenButton.onclick = kitchenWindow;


  socket = io.connect();//setting the socket object to use

  //getting the current saved order number
  socket.emit('order_count_request', function(data) {
    order_number = data;
  });


}


/**
 * fucntion that checks which food was double clicked and adds it to the order array
 *
 */
function foodClick() {
  //searching for the food item in the array
  for (var i = 0; i < food_array.length; i++) {
    if (this.id == food_array[i].id) {
      order.push(food_array[i]);

      //appending the orders page with the food item
      var order_string = food_array[i].name + "  Price: " + food_array[i].price; //the sting to be displayed in the order windwo

      //setting a new list item with an id and onclick function as well as a value for its price
      var ul = document.getElementById("order_list");
      var li = document.createElement("li");
      li.setAttribute("onclick", "removeItem('" + food_array[i].id + "_li');"); //setitng the remove funciton on click
      li.setAttribute("id", food_array[i].id + "_li");
      li.setAttribute("value", food_array[i].price);
      li.appendChild(document.createTextNode(order_string)); //adding the text to the list item
      ul.appendChild(li);

      //adding the order price to the toal
      order_total += food_array[i].price;
      document.getElementById("total").innerHTML = "Total: " + order_total.toFixed(2);
    }
  }
}



/**
 * fucntion that checks which food was dragged and adds it to the order array
 *
 */
function foodDrop(dropped) {
  //finding the food item in the array
  for (var i = 0; i < food_array.length; i++) {
    if (dropped.id == food_array[i].id) {

      order.push(food_array[i]);

      //appending the orders page with the food item
      var order_string = food_array[i].name + "  Price: " + food_array[i].price; //the sting to be displayed in the order windwo

      //setting a new list item with an id and onclick function as well as a value for its price
      var ul = document.getElementById("order_list");
      var li = document.createElement("li");
      li.setAttribute("onclick", "removeItem('" + food_array[i].id + "_li');"); //setitng the remove funciton on click
      li.setAttribute("id", food_array[i].id + "_li");
      li.setAttribute("value", food_array[i].price);
      li.appendChild(document.createTextNode(order_string)); //adding the text to the list item
      ul.appendChild(li);

      //adding the order price to the toal
      order_total += food_array[i].price;
      document.getElementById("total").innerHTML = "Total: " + order_total.toFixed(2);
    }
  }
}



/**
 * this class removes a food item from the order
 *@param {string} food_id the id of the food being removed from the list
 */
function removeItem(food_id) {

  var order_list = document.getElementById("order_list"); //the list of orders client side

  //pasring through the cliet side orders to find the order they want to remove
  for (var i = 0; i < order.length; i++) {
    if (order_list.childNodes[i].id == food_id) {

      //removing the order from the order array
      var count = 0; //count for the while loop
      var found = false; //if the id of the food to be removed has been found in the order array yet
      while (found == false) {
        if (order[count].id + "_li" == food_id) {
          order.splice(count, 1); //removing the item from the array
          found = true;
        }
        count++;
      }

      //removing the food order from the cliet side list
      order_total = order_total - order_list.childNodes[i].value - 0.99; //removing the item price from the total
      document.getElementById("total").innerHTML = "Total: " + order_total.toFixed(2);
      order_list.removeChild(order_list.childNodes[i]); //removing the item from the food list

      break; // breaking if the correct value is found
    }
  }
}

/**
 *sends the order to the server which will then be displayed on the kitchen page
 *
 */
function submitOrder() {

  if (order.length > 0) {
    socket.emit('order', order, order_number); //sending the order over the socket

    var order_list = document.getElementById("order_list"); //the list of orders client side
    //removing all orders client side
    order_list.innerHTML = '';
    order = [];
    order_total = 0.00;
    document.getElementById("total").innerHTML = "Total: " + order_total.toFixed(2);
    window.alert("Order has been submitted!\n" + "you are order number: " + order_number);
    order_number++;
  }
}

function kitchenWindow() {
  window.location.href = "html_ref/html/kitchen.html";
}
