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
}

//-------------------------BUTTON FUNCTIONS---------------------//

var online_nodes_button = document.getElementById('online')
var offline_nodes_button = document.getElementById('offline')
var layers_button = document.getElementById('layers')

online_nodes_button.addEventListener('click', get_online_nodes)
offline_nodes_button.addEventListener('click', get_offline_nodes)

//----------------------GET DATA FUNCTIONS----------------------//

function get_online_nodes() {

  var req = new XMLHttpRequest()
  req.open("GET", '/get_online_nodes', true)
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
          icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
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



