var geocoder = new google.maps.Geocoder;
var INFO_API = 'http://maps.googleapis.com/maps/api/geocode/json';

function addressSearch() {

    // configuration for showing representatives at different levels of government

    var show_alcalde = false;
    var show_dl = false;
    var show_df = false;
    var show_senador = false;
    var show_gobernador = false;
    var show_presidente = false;


    // var results_level_set = [];
    // // set levels from checkboxes
    // if ($('#show_alcalde_results').is(':checked')) {
    //     show_alcalde = true;
    //     results_level_set.push('Alcalde');
    // }
    // if ($('#show_dl_results').is(':checked')) {
    //     show_dl = true;
    //     results_level_set.push('Diputado Local');
    // }
    // if ($('#show_df_results').is(':checked')) {
    //     show_df = true;
    //     results_level_set.push('Diputado Federal');
    // }
    // if ($('#show_senador_results').is(':checked')) {
    //     show_senador = true;
    //     results_level_set.push('Senador');
    // }
    // if ($('#show_gobernador_results').is(':checked')) {
    //     show_gobernador = true;
    //     results_level_set.push('Gobernador');
    // }
    // if ($('#show_presidente_results').is(':checked')) {
    //     show_presidente = true;
    //     results_level_set.push('Presidente');
    // }


    var address = $('#address').val();


    geocoder.geocode( { 'address': address}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
        } 
      }); 


        // $('table tbody').empty();

        // selected_alcalde = '';
        // selected_dl = '';
        // selected_df = '';
        // selected_senador = '';
        // selected_gobernador = '';
        // selected_presidente = '';
        // all_people = {};
        // pseudo_id = 1;

        // var alcalde_people = [];
        // var dl_people = [];
        // var df_people = [];
        // var senador_people = [];
        // var gobernador_people = [];
        // var presidente_people = [];
        // var federal_people = [];
        // var state_people = [];
        // var local_people = [];
        // var county_people = [];

    
};

function findMe() {
    var foundLocation;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var accuracy = position.coords.accuracy;
            var coords = new google.maps.LatLng(latitude, longitude);

            // console.log(coords);

            geocoder.geocode({
                'location': coords
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        $("#address").val(results[1].formatted_address);
                        addressSearch();
                    }
                }
            });

        }, function error(msg) {
            alert('Permite que el sitio use tu ubicación.');
        }, {
            //maximumAge: 600000,
            //timeout: 5000,
            enableHighAccuracy: true
        });
    } else {
        alert("La API de geolocalización no es compatible con tu navegador.");
    }
}
