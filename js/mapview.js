var map;
var panorama;
var upenn = new google.maps.LatLng(39.952219, -75.19321400000001);//(40.729884, -73.990988);//        
var groudon = new google.maps.LatLng(39.95080436904778, -75.19529539419557);//(40.729559678851025, -73.99074196815491);//
var sharpedo = new google.maps.LatLng(39.95072212216224, -75.19469457937623);//(40.730031233910694, -73.99142861366272);//
var chesnaught = new google.maps.LatLng(39.951815997650776, -75.19372898413087);//(40.72968163306612, -73.9911389350891);//

/*
$.get( "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=39.952219,%20-75.19321400000001&radius=500&types=hospital&key=AIzaSyDVG6IDv5hlauLnvxyxkOCF0P4HEa9ffq4",function( data ) {

  console.log( "Load was performed." + data);
}, 'json');
*/
var entryPanoId = null;
function initialize() {
var arenaBattle = new google.maps.LatLng(39.95080436904778, -75.19529539419557);
	  // Set up the map
	  var mapOptions = {
		center: upenn,
		zoom: 18,
		streetViewControl: true
	  };
	  var markers = [];
	  map = new google.maps.Map(document.getElementById('map-canvas'),
		  mapOptions);
	  var request = {
		location: upenn,
		radius: '500',
		types: ['hospital']
	}
	   //Initializing pano-canvas
	   panoramaService = new google.maps.StreetViewService();
	   panorama = new google.maps.StreetViewPanorama(document.getElementById("pano-canvas"));
	   map.setStreetView(panorama);
	   streetView = map.getStreetView();
	   //streetView.setVisible( true );
		
		//Searc Box code
	  var input =(document.getElementById('pac-input'));
	  panorama.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
	  var searchBox = new google.maps.places.SearchBox((input));

	  // [START region_getplaces]
	  // Listen for the event fired when the user selects an item from the
	  // pick list. Retrieve the matching places for that item.
	  google.maps.event.addListener(searchBox, 'places_changed', function() {
	  map.setStreetView(panorama);
		var places = searchBox.getPlaces();

		if (places.length == 0) {
		  return;
		}
		for (var i = 0, marker; marker = markers[i]; i++) {
		  marker.setMap(null);
		}

		// For each place, get the icon, place name, and location.
		markers = [];
		var bounds = new google.maps.LatLngBounds();
		for (var i = 0, place; place = places[i]; i++) {
		  /* var image = {
			url: place.icon,
			size: new google.maps.Size(71, 71),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(17, 34),
			scaledSize: new google.maps.Size(25, 25)
		  }; */

		  // Create a marker for each place.
		  /* var marker = new google.maps.Marker({
			map: map,
			icon: image,
			title: place.name,
			position: place.geometry.location
		  }); */

		  markers.push(marker);
		  

		  bounds.extend(place.geometry.location);
		  request = {
		location: place.geometry.location,
		radius: '500',
		types: ['hospital']
	}
		  console.log("fkjnfdfd- " +  place.geometry.location);
		  service.nearbySearch(request, callback)
		  panorama.setPosition(place.geometry.location);
		}
		map.fitBounds(bounds);
	  });
	  // [END region_getplaces]

	  // Setup the markers on the map
	  var sharpedoMarker1 = new google.maps.Marker({
		  position: sharpedo,
		  map: panorama,//map, I HAVE TO FIGURE OUT A WAY TO ADD THE MARKER TO BOTH THE MAP AND STREETVIEW PANO
		  icon: 'xygifs/sharpedo.gif',//'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=sharpedo|FFFF00',
		  title: 'sharpedo'//'sharpedo'
	  });
  
	  var sharpedoMarker2 = new google.maps.Marker({
		  position: sharpedo,
		  map: map,//map, I HAVE TO FIGURE OUT A WAY TO ADD THE MARKER TO BOTH THE MAP AND STREETVIEW PANO
		  icon: 'pokeicons/sharpedo.png',//'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=sharpedo|FFFF00',
		  title: 'sharpedo'//'sharpedo'
	  });

	  var chesnaughtMarker1 = new google.maps.Marker({
		  position: chesnaught,
		  map: map,
		  icon: 'pokeicons/chesnaught.png',
		  title: 'chesnaught'
	  });
  
	  var chesnaughtMarker2 = new google.maps.Marker({
		  position: chesnaught,
		  map: panorama,
		  icon: 'xygifs/chesnaught.gif',
		  title: 'chesnaught'
	  });

	  var groudonMarker1 = new google.maps.Marker({
		  position: groudon,
		  map: map,
		  icon: 'pokeicons/groudon.png',
		  title: 'groudon'
	  });
	  
	  var groudonMarker2 = new google.maps.Marker({
		  position: groudon,
		  map: panorama,
		  icon: 'xygifs/groudon.gif',
		  title: 'groudon'
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
  
	google.maps.event.addListener(sharpedoMarker1, 'mouseover', function() {
		infowindow.setContent("ROOAAAR!!!");
		//Trigger audio through howlerjs here
		var sound = new Howl({
			urls: ['sfx/battle.mp3']
		}).play();
		infowindow.open(panorama, sharpedoMarker1);
		console.log("the event was fired.");
	});
	
	google.maps.event.addListener(chesnaughtMarker2, 'mouseover', function() {
		infowindow.setContent("ROOAAAR!!!");
		//Trigger audio through howlerjs here
		var sound = new Howl({
			urls: ['sfx/battle.mp3']
		}).play();
		infowindow.open(panorama, chesnaughtMarker2);
		console.log("the event was fired.");
	});
	
	google.maps.event.addListener(groudonMarker2, 'mouseover', function() {
		infowindow.setContent("ROOAAAR!!!");
		//Trigger audio through howlerjs here
		var sound = new Howl({
			urls: ['sfx/battle.mp3']
		}).play();
		infowindow.open(panorama, groudonMarker2);
		console.log("the event was fired.");
	});
	
	google.maps.event.addListener(sharpedoMarker1, 'click', function() {
	panorama.setPano('battle')
	});
	
	google.maps.event.addListener(chesnaughtMarker2, 'click', function() {
	panorama.setPano('battle')
	});
	
	google.maps.event.addListener(groudonMarker2, 'click', function() {
	panorama.setPano('battle')
	});
	
	var panoOptions = {
		//position: arenaBattle,
		visible: true,
		panoProvider: getCustomPanorama
    };
    panorama.setOptions(panoOptions);
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
	
	
	
	service = new google.maps.places.PlacesService(map);
	service.nearbySearch(request, callback);//call nearbysearch b/c is calls callback inside of the search box event listener. And declare var request further up pass for location: place.geometry.location
	
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
						
						var marker = new google.maps.Marker({
							map: panorama, 
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

//Swap in Pokemon battle background for streetview
function getCustomPanoramaTileUrl(pano, zoom, tileX, tileY) {
  // Return a pano image given the panoID.
  return 'http://images.eurogamer.net/articles//a/8/5/2/3/3/34779_3_A3_copie.jpg.jpg';
}

function getCustomPanorama(pano) {
console.log("here");
  switch (pano) {
    case 'battle':
      return {
        location: {
          pano: 'battle',
          description: 'Google Sydney - battle',
          latLng: new google.maps.LatLng(40.730031233910694, -73.99142861366272)
        },
        links: [],
        // The text for the copyright control.
        copyright: 'Imagery (c) 2010 Google',
        // The definition of the tiles for this panorama.
        tiles: {
          tileSize: new google.maps.Size(1024, 512),
          worldSize: new google.maps.Size(1024, 512),
          // The heading at the origin of the panorama tile set.
          centerHeading: 105,
          getTileUrl: getCustomPanoramaTileUrl
		  
        }
      };
      break;
    default:
      return null;
  }
}

function createCustomLinks(entryPanoId) {
  var links = panorama.getLinks();
  var panoId = panorama.getPano();
  switch (panoId) {
    case entryPanoId:
      // Adding a link in the view from the entrance of the building to
      // battle.
      links.push({
        heading: 25,
        description: 'Google Sydney',
        pano: 'battle'
      });
      break;
    case 'battle':
      // Adding a link in the view from the entrance of the office
      // with an arrow pointing at 100 degrees, with a text of 'Exit'
      // and loading the street entrance of the building pano on click.
      links.push({
        heading: 195,
        description: 'Exit',
        pano: entryPanoId
      });
      break;
    default:
      return;
  }
}

google.maps.event.addDomListener(window, 'load', initialize);