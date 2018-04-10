var geocoder = new google.maps.Geocoder;
var marker;
var loc = [];

function codeAddress() {
    var address = document.getElementById("address").value;
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            loc[0] = results[0].geometry.location.lat();
            loc[1] = results[0].geometry.location.lng();

            display(loc);

        } else {
            alert("La geocodificación no tuvo éxito por la siguiente razón: " + status);
        }
    });
}

function findMe() {
    var foundLocation;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            loc[0] = position.coords.latitude;
            loc[1] = position.coords.longitude;

            var accuracy = position.coords.accuracy;
            var coords = new google.maps.LatLng(loc[0], loc[1]);

            geocoder.geocode({
                'location': coords
            }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        $("#address").val(results[1].formatted_address);
                        display(loc);
                    }
                }
            });

        }, function error(msg) {
            alert('Permite que el sitio use tu ubicación.');
        }, {
            enableHighAccuracy: true
        });
    } else {
        alert("La geolocalización no es compatible con tu navegador.");
    }
}

function display(long_lat) {
    if (marker) {
        marker.remove();
    }
    marker = new mapboxgl.Marker()
        .setLngLat([long_lat[1], long_lat[0]])
        .addTo(map);
    map.flyTo({
        center: [long_lat[1], long_lat[0]],
        zoom: 14,
        speed: 10
    });
    showResults()
}

var selected_alcalde = '';
var selected_dl = '';
var selected_df = '';
var selected_senador = '';
var selected_gobernador = '';
var selected_presidente = '';
var all_people = {};
var pseudo_id = 1;


function showResults() {

    var alcalde_people = [];
    var dl_people = [];
    var df_people = [];
    var senador_people = [];
    var gobernador_people = [];
    var presidente_people = [];

    var show_alcalde = false;
    var show_dl = false;
    var show_df = false;
    var show_senador = false;
    var show_gobernador = false;
    var show_presidente = false;

    var offices = {'office': ['alcalde', 'dl', 'df', 'senador', 'gobernador', 'presidente'],};

    var results_level_set = [];
    // set levels from checkboxes
    if ($('#show_alcalde_results').is(':checked')) {
        show_alcalde = true;
        results_level_set.push('alcalde');
    }
    if ($('#show_dl_results').is(':checked')) {
        show_dl = true;
        results_level_set.push('diputado local');
    }
    if ($('#show_df_results').is(':checked')) {
        show_df = true;
        results_level_set.push('diputado federal');
    }
    if ($('#show_senador_results').is(':checked')) {
        show_senador = true;
        results_level_set.push('senador');
    }
    if ($('#show_gobernador_results').is(':checked')) {
        show_gobernador = true;
        results_level_set.push('gobernador');
    }
    if ($('#show_presidente_results').is(':checked')) {
        show_presidente = true;
        results_level_set.push('presidente');
    }
    
    // $('table tbody').empty();

    selected_alcalde = '';
    selected_dl = '';
    selected_df = '';
    selected_senador = '';
    selected_gobernador = '';
    selected_presidente = 'México';
    all_people = {};
    pseudo_id = 1;

    var info = {'person': null};

    // // Get presidential candidates
    // $.getJSON("lista_candidatos.json", function(data) {
    //     for (i = 0; i < data.length; i++) {
    //         if (data[i].Candidatura === "Presidente") {
    //             var person = {};
    //             info['person'] = person
    //             info.person.person = data[i].Nombre;
    //             info.person.party = data[i].Partido;
    //             presidente_people.push(info.person);
                // all_people[pseudo_id] = info.person;
                // pseudo_id = pseudo_id + 1;
                // var result = '';
                // for(var i=0; i<myArray.length; i++) {
                //     result += "<tr>";
                //     for(var j=0; j<myArray[i].length; j++){
                //         result += "<td>"+myArray[i][j]+"</td>";
                //     }
                //     result += "</tr>";
                // $('#presidente-results tbody').append()



    // for (i = 0; i < stock.length; i++) {
    //     var tr = document.createElement('TR');
    //     for (j = 0; j < stock[i].length; j++) {
    //         var td = document.createElement('TD')
    //         td.appendChild(document.createTextNode(stock[i][j]));
    //         tr.appendChild(td)
    //     }
    //     tableBody.appendChild(tr);
    // }  
    // myTableDiv.appendChild(table)


        //     }
        // }
//     });
// // 
//     console.log(all_people)


    // var template = new EJS({
    //     'text': $('#tableGuts').html()
    // });

    if (show_alcalde) {
        $('#alcalde-container').show();
        $('#alcalde-nav').show();
        // $('#alcalde-results tbody').append(template.render({
        //     people: alcalde_people
        // }));
    } else {
        $('#alcalde-container').hide()
        $('#alcalde-nav').hide();
    }

    if (show_dl) {
        $('#dl-container').show();
        $('#dl-nav').show();
        // $('#dl-results tbody').append(template.render({
        //     people: dl_people
        // }));
    } else {
        $('#dl-container').hide()
        $('#dl-nav').hide();
    }

    if (show_df) {
        $('#df-container').show();
        $('#df-nav').show();
        // $('#df-results tbody').append(template.render({
        //     people: df_people
        // }));
    } else {
        $('#df-container').hide()
        $('#df-nav').hide();
    }

    if (show_senador) {
        $('#senador-container').show();
        $('#senador-nav').show();
        // $('#senador-results tbody').append(template.render({
        //     people: senador_people
        // }));
    } else {
        $('#senador-container').hide()
        $('#senador-nav').hide();
    }

    if (show_gobernador) {
        $('#gobernador-container').show();
        $('#gobernador-nav').show();
        // $('#gobernador-results tbody').append(template.render({
        //     people: gobernador_people
        // }));
    } else {
        $('#gobernador-container').hide()
        $('#gobernador-nav').hide();
    }

    if (show_presidente) {
        $('#presidente-container').show();
        $('#presidente-nav').show();
        // $('#presidente-results tbody').append(template.render({
        //     people: presidente_people
        // }));
    } else {
        $('#presidente-container').hide()
        $('#presidente-nav').hide();
    }

    if (marker === undefined || marker === null) {
        $('#no-response-container').show();
        $("#response-container").hide();
    } else {
        $('#no-response-container').hide();
        $("#response-container").show();
    }

    // hook up modal stuff
    // var modal_template = new EJS({'text': $('#modalGuts').html()});
    // $('.btn-contact').off('click');
    // $('.btn-contact').on('click', function(){
    //     var info = all_people[$(this).data('id')];
    //     $('#modalContent').html(modal_template.render({info: info}));
    //     $('#contactModal').modal('show');
    // });
};
