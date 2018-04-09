var geocoder = new google.maps.Geocoder;
var marker;
var loc=[];

function codeAddress() {
    var address = document.getElementById("address").value;

    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        loc[0]=results[0].geometry.location.lat();
        loc[1]=results[0].geometry.location.lng();

        display( loc ); 

      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
}

function findMe() {
    var foundLocation;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            loc[0] = position.coords.latitude;
            loc[1] = position.coords.longitude;

            var accuracy = position.coords.accuracy;
            var coords = new google.maps.LatLng(loc[0], loc[1]);

            geocoder.geocode({
                'location': coords
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        $("#address").val(results[1].formatted_address);
                        display( loc );
                    }
                }
            });

        }, function error(msg) {
            alert('Permite que el sitio use tu ubicación.');
        }, {
            enableHighAccuracy: true
        });
    } else {
        alert("La API de geolocalización no es compatible con tu navegador.");
    }
}

function display( long_lat ){
    if (marker){ marker.remove();}
    marker = new mapboxgl.Marker()
        .setLngLat([long_lat[1],long_lat[0]])
        .addTo(map);
        map.flyTo({center: [long_lat[1],long_lat[0]], zoom: 14, speed: 10});
    addressSearch()
}


function addressSearch() {

    // configuration for showing candidates at different levels of government

    var show_alcalde = false;
    var show_dl = false;
    var show_df = false;
    var show_senador = false;
    var show_gobernador = false;
    var show_presidente = false;


    var results_level_set = [];
    // set levels from checkboxes
    if ($('#show_alcalde_results').is(':checked')) {
        show_alcalde = true;
        results_level_set.push('Alcalde');
    }
    if ($('#show_dl_results').is(':checked')) {
        show_dl = true;
        results_level_set.push('Diputado Local');
    }
    if ($('#show_df_results').is(':checked')) {
        show_df = true;
        results_level_set.push('Diputado Federal');
    }
    if ($('#show_senador_results').is(':checked')) {
        show_senador = true;
        results_level_set.push('Senador');
    }
    if ($('#show_gobernador_results').is(':checked')) {
        show_gobernador = true;
        results_level_set.push('Gobernador');
    }
    if ($('#show_presidente_results').is(':checked')) {
        show_presidente = true;
        results_level_set.push('Presidente');
    }


        $('table tbody').empty();

        selected_alcalde = '';
        selected_dl = '';
        selected_df = '';
        selected_senador = '';
        selected_gobernador = '';
        selected_presidente = '';
        all_people = {};
        pseudo_id = 1;

        var alcalde_people = [];
        var dl_people = [];
        var df_people = [];
        var senador_people = [];
        var gobernador_people = [];
        var presidente_people = [];
    
};
