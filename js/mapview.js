var map;
var panorama;
var astorPlace = new google.maps.LatLng(40.729884, -73.990988);
var busStop = new google.maps.LatLng(40.729559678851025, -73.99074196815491);
var cafe = new google.maps.LatLng(40.730031233910694, -73.99142861366272);
var bank = new google.maps.LatLng(40.72968163306612, -73.9911389350891);

function initialize() {

  // Set up the map
  var mapOptions = {
    center: astorPlace,
    zoom: 18,
    streetViewControl: true
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
	  
  //Initializing pano-canvas
   panoramaService = new google.maps.StreetViewService();
   panorama = new google.maps.StreetViewPanorama(document.getElementById("pano-canvas"));
   map.setStreetView(panorama);
   streetView = map.getStreetView();
   //streetView.setVisible( true );
	
  // Setup the markers on the map
  var binacleMarker = new google.maps.Marker({
      position: cafe,
      map: panorama,//map,
      icon: 'xygifs/binacle.gif',//'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=cafe|FFFF00',
      title: 'Binacle'//'cafe'
  });

  var bankMarker = new google.maps.Marker({
      position: bank,
      map: map,
      icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=dollar|FFFF00',
      title: 'Bank'
  });

  var busMarker = new google.maps.Marker({
      position: busStop,
      map: map,
      icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=bus|FFFF00',
      title: 'Bus Stop'
  });

  // We get the map's default panorama and set up some defaults.
  // Note that we don't yet set it visible.
  panorama = map.getStreetView();
  panorama.setPosition(astorPlace);
  panorama.setPov(/** @type {google.maps.StreetViewPov} */({
    heading: 265,
    pitch: 0
  }));
  
  var infowindow = new google.maps.InfoWindow({
      content: "ROOAAAR!!!"
  });
  
  google.maps.event.addListener(binacleMarker, 'mouseover', function() {
    infowindow.setContent("ROOAAAR!!!");
	//Trigger audio through howlerjs here
	infowindow.open(panorama, binacleMarker);
	console.log("the event was fired.");
});
}

function toggleStreetView() {
  var toggle = panorama.getVisible();
  if (toggle == false) {
    panorama.setVisible(true);
  } else {
    panorama.setVisible(false);
  }
}

google.maps.event.addDomListener(window, 'load', initialize);