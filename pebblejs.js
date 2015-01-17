var xhrRequest = function (url, type, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    callback(this.responseText);
  };
  xhr.open(type, url);
  xhr.send();
};

function sendArrow(status) {
  console.log("status is " + status);
  var url = 'http://104.131.39.157:8124/';
  xhrRequest(url, 'POST', function(text) { console.log("callback! >> " + text); });
}

Pebble.addEventListener("ready", function() { console.log("ready"); });

// Called when incoming message from the Pebble is received
Pebble.addEventListener("appmessage",
							function(e) {
								console.log("Received Status: " + e.payload.status);
                sendArrow(e.payload.status);
              });
