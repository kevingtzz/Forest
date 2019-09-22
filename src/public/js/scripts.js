const MEDELLIN_COORDS = {
  lat: 6.252045,
  lng: -75.574566
}

const MEDELLIN_BOUNDS = {
  north: 6.523298,
  south: 6.044107,
  west: -75.839895,
  east: -75.125109,
}

const CATEGORIES = {
  good: '	#32CD32',
  moderate: '#FFD700',
  harmfulSensible: '#FF8C00',
  harmful: '#FF4500',
  veryHarmful: '#800080',
  dangeruous: '#8B4513'
}

var data = []

//---------------------RENDERING MAP----------------------------//

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: MEDELLIN_COORDS,
    restriction: { latLngBounds: MEDELLIN_BOUNDS,strictBounds: true}, 
    zoom: 12
  })

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      map.setCenter(pos)
      map.setZoom(16)

      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: 'Hello World!'
      });
    })
  } 
  graph_dos_cinco()
}

//-------------------------BUTTON FUNCTIONS---------------------//

var online_nodes_button = document.getElementById('online')
var offline_nodes_button = document.getElementById('offline')
var layers_button = document.getElementById('layers')

online_nodes_button.addEventListener('click', get_online_nodes)
offline_nodes_button.addEventListener('click', get_offline_nodes)
layers_button.addEventListener('click', graph_dos_cinco)

//----------------------GET DATA FUNCTIONS----------------------//

function get_online_nodes() {  
  for(i = 0; i < data.length; i++) {
    let marker = new google.maps.Marker({
      position: {
        lat: data[i].latitude,
        lng: data[i].longitude
      },
      map: map,
      title: 'Hello World!',
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });
  }
}


function get_offline_nodes() {

  var req = new XMLHttpRequest()
  req.open("GET", '/get_offline_nodes', true)
  req.addEventListener('load', () => {
    if (req.status == 200) {
      let data = JSON.parse(req.response)
  
      for(i = 0; i < data.length; i++) {
        let marker = new google.maps.Marker({
          position: {
            lat: data[i].latitude,
            lng: data[i].longitude
          },
          map: map,
          title: 'Hello World!',
          icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        });
      }
    } else if (req.status > 200) {
      console.log(req.responseText)
    } else {
      console.error(req.status + ' ' + req.statusText)
    }
  })
  req.addEventListener("error", function () {
    console.error("Error de red"); // Error de conexión
  });
  req.send(null)

}

//----------------------------- Graphic data ------------------------//

function graph_dos_cinco() {

  var req = new XMLHttpRequest()
  req.open("GET", '/get_online_nodes', true)
  req.addEventListener('load', () => {
    if (req.status == 200) {
      data = JSON.parse(req.response)
      for (var i in data) {
        let cent = {
          lat: data[i].latitude,
          lng: data[i].longitude
        }

        //set color
        let color = '#000000'
        if (data[i].PM2_5_CC_ICA >= 0.0 && data[i].PM2_5_CC_ICA <= 50.0) {
          color = CATEGORIES.good
        } else if (data[i].PM2_5_CC_ICA >= 51.0 && data[i].PM2_5_CC_ICA <= 100.0) {
          color = CATEGORIES.moderate
        } else if (data[i].PM2_5_CC_ICA >= 101.0 && data[i].PM2_5_CC_ICA <= 150.0) {
          color = CATEGORIES.harmfulSensible
        } else if (data[i].PM2_5_CC_ICA >= 151.0 && data[i].PM2_5_CC_ICA <= 200.0) {
          color = CATEGORIES.harmful
        } else if (data[i].PM2_5_CC_ICA >= 201.0 && data[i].PM2_5_CC_ICA <= 300.0) {
          color = CATEGORIES.veryHarmful
        } else if (data[i].PM2_5_CC_ICA >= 301.0 && data[i].PM2_5_CC_ICA <= 500.0) {
          color = CATEGORIES.dangeruous
        } 
        console.log(data[i].PM2_5_CC_ICA)
        // Add the circle for this city to the map.
        var cityCircle = new google.maps.Circle({
          strokeColor: color,
          strokeOpacity: 0.2,
          strokeWeight: 1,
          fillColor: color,
          fillOpacity: 0.4,
          map: map,
          center: cent ,
          radius: 400
        });
      }
    } else if (req.status > 200) {
      console.log(req.responseText)
    } else {
      console.error(req.status + ' ' + req.statusText)
    }
  })
  req.addEventListener("error", function () {
    console.error("Error de red"); // Error de conexión
  });
  req.send(null)
}
