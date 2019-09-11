//GET DATA TO PLOT
var req = new XMLHttpRequest()
req.open("GET", '/get_nodes', true)
req.addEventListener('load', () => {
  if(req.status == 200) {
    let data = JSON.parse(req.response)
    console.log(req.responseText)
  } else if (req.status > 200) {
    console.log(req.responseText)
  } else {
    console.error(req.status + ' ' + req.statusText)
  }
}) 
req.addEventListener("error", function(){
  console.error("Error de red"); // Error de conexión
});
req.send(null)
  

//Render map

var medellin = {lat: 6.2537201, lng: -75.6078822}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: medellin,
    zoom: 12
    })

            // Create the DIV to hold the control and call the CenterControl()
        // constructor passing in this DIV.
        var centerControlDiv = document.createElement('div');
        var centerControl = new CenterControl(centerControlDiv, map);

        centerControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

        function CenterControl(controlDiv, map) {

            // Set CSS for the control border.
            var controlUI = document.createElement('div');
            controlUI.style.backgroundColor = '#fff';
            controlUI.style.border = '2px solid #fff';
            controlUI.style.borderRadius = '3px';
            controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
            controlUI.style.cursor = 'pointer';
            controlUI.style.marginBottom = '22px';
            controlUI.style.textAlign = 'center';
            controlUI.title = 'Click to recenter the map';
            controlDiv.appendChild(controlUI);
    
            // Set CSS for the control interior.
            var controlText = document.createElement('div');
            controlText.style.color = 'rgb(25,25,25)';
            controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
            controlText.style.fontSize = '16px';
            controlText.style.lineHeight = '38px';
            controlText.style.paddingLeft = '5px';
            controlText.style.paddingRight = '5px';
            controlText.innerHTML = 'Center Map';
            controlUI.appendChild(controlText);
    
            // Setup the click event listeners: simply set the map to Chicago.
            controlUI.addEventListener('click', function() {
              map.setCenter(medellin);
            });
    
          }
}

