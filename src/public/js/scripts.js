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
let data = [];
let user_position = {};
//---------------------RENDERING MAP----------------------------//

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: MEDELLIN_COORDS,
    restriction: { latLngBounds: MEDELLIN_BOUNDS,strictBounds: true}, 
    zoom: 12
  })

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
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
var online_visible_markers = false;
var offline_visible_markers = false;

online_nodes_button.addEventListener('click', get_online_nodes)
offline_nodes_button.addEventListener('click', get_offline_nodes)
layers_button.addEventListener('click', distancia_recomendación)

//----------------------GET DATA FUNCTIONS----------------------//

function get_online_nodes() {  

    if (online_visible_markers) {
        for(var i in online_markers) {
           online_markers[i].setMap(null);
        }
        online_visible_markers = false;
        return;
    }

    online_markers = [];
    for(i = 0; i < data.length; i++) {
        online_markers.push(new google.maps.Marker({
        position: {
            lat: data[i].latitude,
            lng: data[i].longitude
        },
        map: map,
        title: data[i].barrio,
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    }));
  }
  online_visible_markers = true;
}


function get_offline_nodes() {

    if (offline_visible_markers) {
        for(var i in offline_markers) {
           offline_markers[i].setMap(null);
        }
        offline_visible_markers = false;
        return;
    }

  var req = new XMLHttpRequest()
  req.open("GET", '/get_offline_nodes', true)
  req.addEventListener('load', () => {
    if (req.status == 200) {
      let data = JSON.parse(req.response)
        

      offline_markers = [];
      for(i = 0; i < data.length; i++) {
        offline_markers.push(new google.maps.Marker({
          position: {
            lat: data[i].latitude,
            lng: data[i].longitude
          },
          map: map,
          title: data[i].barrio,
          icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        }));
      }
      offline_visible_markers = true;
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
        //console.log(data[i].PM2_5_CC_ICA)
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

 function Dist(lat1, lon1, lat2, lon2){
    rad = function(x) {
        return x*Math.PI/180;
    }

    var RadioTierra     = 6378.137;    //Km
    var dLat  = rad( lat2 - lat1 );
    var dLong = rad( lon2 - lon1 );

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = RadioTierra * c;

    return d.toFixed(6);                //Decimales
}

function distancia_recomendación() {
    let distancia_minima;
    let estacion;
    let medicion;
    let unidad = 'km';
    let fiable = 'confiable.';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            user_position = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            for (var i in data) {
                let distacion_minima_aux = Dist(user_position.lat, user_position.lng, data[i].latitude, data[i].longitude);
                let estacion_aux = data[i].barrio
                let medicion_aux = data[i].PM2_5_CC_ICA
                if (i == 0) {
                    distancia_minima = distacion_minima_aux;
                    estacion = estacion_aux;
                    medicion = medicion_aux;
                } else {
                    if (distacion_minima_aux < distancia_minima) {
                        distancia_minima = distacion_minima_aux;
                        estacion = estacion_aux;
                        medicion = medicion_aux;
                    }
                }
            }
            if  (distancia_minima > 0.5) {
                fiable = 'poco confiable por su lejanía.';
            }
            if (distancia_minima < 1) {
                distancia_minima = distancia_minima*1000;
                unidad = 'm'
            }

            alert('Usted está a ' + distancia_minima.toFixed(0) + unidad + ' de la estación ' + estacion + ' con medición ' + medicion.toFixed(3) + ' de PM 2.5.' + ' Dada su distancía a la estación esta medicion es ' + fiable) ;
        })
    }
}

