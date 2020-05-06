window.onload = load;

var socket = io.connect(); //the socket object


/**
 * load fucntion for window.onload
 */
function load() {

  var pictures = $$("#sandwhich_box img");

  for (var i = 0; i < pictures.length; i++) {
    pictures[i].ondblclick = pictureClick;
    console.log("adding picture at ", i);
  }
}

function pictureClick() {
  console.log(this);
}
