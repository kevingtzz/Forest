var medellin_coords = {
  lat: 6.2537201,
  lng: -75.6078822
}

//---------------------RENDERING MAP----------------------------//

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: medellin_coords,
    zoom: 12
  })

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



