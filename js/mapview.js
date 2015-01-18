var map;
var panorama;
var upenn = new google.maps.LatLng(39.952219, -75.19321400000001);//(40.729884, -73.990988);//        
var abra = new google.maps.LatLng(39.95080436904778, -75.19529539419557);//(40.729559678851025, -73.99074196815491);//
var binacle = new google.maps.LatLng(39.95072212216224, -75.19469457937623);//(40.730031233910694, -73.99142861366272);//
var chesnaught = new google.maps.LatLng(39.951815997650776, -75.19372898413087);//(40.72968163306612, -73.9911389350891);//

/*
$.get( "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=39.952219,%20-75.19321400000001&radius=500&types=hospital&key=AIzaSyDVG6IDv5hlauLnvxyxkOCF0P4HEa9ffq4",function( data ) {

  console.log( "Load was performed." + data);
}, 'json');
*/

function initialize() {

	  // Set up the map
	  var mapOptions = {
		center: upenn,
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
	  var binacleMarker1 = new google.maps.Marker({
		  position: binacle,
		  map: panorama,//map, I HAVE TO FIGURE OUT A WAY TO ADD THE MARKER TO BOTH THE MAP AND STREETVIEW PANO
		  icon: 'xygifs/binacle.gif',//'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=binacle|FFFF00',
		  title: 'Binacle'//'binacle'
	  });
  
	  var binacleMarker2 = new google.maps.Marker({
		  position: binacle,
		  map: map,//map, I HAVE TO FIGURE OUT A WAY TO ADD THE MARKER TO BOTH THE MAP AND STREETVIEW PANO
		  icon: 'xygifs/binacle.gif',//'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=binacle|FFFF00',
		  title: 'Binacle'//'binacle'
	  });

	  var chesnaughtMarker1 = new google.maps.Marker({
		  position: chesnaught,
		  map: map,
		  icon: 'xygifs/chesnaught.gif',
		  title: 'chesnaught'
	  });
  
	  var chesnaughtMarker2 = new google.maps.Marker({
		  position: chesnaught,
		  map: panorama,
		  icon: 'xygifs/chesnaught.gif',
		  title: 'chesnaught'
	  });

	  var busMarker = new google.maps.Marker({
		  position: abra,
		  map: map,
		  icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=bus|FFFF00',
		  title: 'Bus Stop'
	  });

	  // We get the map's default panorama and set up some defaults.
	  // Note that we don't yet set it visible.
	  panorama = map.getStreetView();
	  panorama.setPosition(upenn);
	  panorama.setPov(/** @type {google.maps.StreetViewPov} */({
		heading: 300,
		pitch: 0
	  }));
  
	  var infowindow = new google.maps.InfoWindow({
		  content: "ROOAAAR!!!"
	  });
  
	google.maps.event.addListener(binacleMarker1, 'mouseover', function() {
		infowindow.setContent("ROOAAAR!!!");
		//Trigger audio through howlerjs here
		var sound = new Howl({
			urls: ['sfx/battle.mp3']
		}).play();
		infowindow.open(panorama, binacleMarker);
		console.log("the event was fired.");
	});
	
	//Google Places API below
	function getIcon(types) {
		switch(types) {
			//case "pharmacy": return "icons/drugstore.png";
			case "hospital": return "https://www.phoenixchildrens.org/sites/default/files/images/hospital-building.png";
			//case "lab": return "icons/barber.png";
			default: return "http://www.bloodjournal.org/sites/all/modules/highwire/highwire/images/google-icon.png";
		}
	}
	geocoder = new google.maps.Geocoder();
	
	var request = {
		location: upenn,
		radius: '500',
		types: ['hospital']
	}
	
	service = new google.maps.places.PlacesService(map);
	service.nearbySearch(request, callback);
	
	function callback(results, status) {
	//I must process all of the data from with the callback 
	    console.log(results);
		
	    for(var i = 0; i < results.length; i++){
		var mapData = results[i];
		//function(mapData,idx) {
		(function(data, idx){ //start wrapper code
				 geocoder.geocode( { 'address': data.vicinity}, function(geodata, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						console.log("index: " + idx + ", " + "type: " + data.types);
						
						var marker = new google.maps.Marker({
							map: map, 
							position: data.geometry.location,
							title: data.title,
							icon: getIcon(mapData.types[0])
						});	
						console.log("place:" + data.geometry.location);
					}					
				});
			
		})(mapData, i);//passing in variable to var here
		   
		}
	}
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