window.onload = load;

var socket = io.connect(); //the socket object
//array of all food items to substitue for a database of food
var food_array = [
  {
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
    "price": 1.00,
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
    "price": 0,
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

  var pictures = $$("#food_box img");//getting the sandwhich pictures

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
  Droppables.add("cart", {
    onDrop: foodDrop
  });

}


function foodClick() {
  for (var i = 0; i < food_array.length; i++) {
    if (this.id == food_array[i].id) {
      console.log("found food");
    }
  }
}

function foodDrop(dropped) {
  for (var i = 0; i < food_array.length; i++) {
    if (dropped.id == food_array[i].id) {
      console.log("found food");
    }
  }
}
