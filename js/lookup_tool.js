var geocoder = new google.maps.Geocoder;
var INFO_API = 'https://www.googleapis.com/civicinfo/v2/representatives';

// parsing out division IDs
var federal_pattern = "ocd-division/country:us";
var state_pattern = /ocd-division\/country:us\/state:(\D{2}$)/;
var cd_pattern = /ocd-division\/country:us\/state:(\D{2})\/cd:/;
var sl_pattern = /ocd-division\/country:us\/state:(\D{2})\/(sldl:|sldu:)/;
var county_pattern = /ocd-division\/country:us\/state:\D{2}\/county:\D+/;
var local_pattern = /ocd-division\/country:us\/state:\D{2}\/place:\D+/;
var district_pattern = /ocd-division\/country:us\/district:\D+/;

var federal_offices = ['United States Senate', 'United States House of Representatives']

var social_icon_lookup = {
    'YouTube': 'youtube',
    'Facebook': 'facebook',
    'Twitter': 'twitter',
    'GooglePlus': 'google-plus'
};

var social_link_lookup = {
    'YouTube': 'https://www.youtube.com/user/',
    'Facebook': 'https://www.facebook.com/',
    'Twitter': 'https://twitter.com/',
    'GooglePlus': 'https://plus.google.com/'
};

var selected_alcalde = '';
var selected_dl = '';
var selected_df = '';
var selected_senador = '';
var selected_gobernador = '';
var selected_presidente = '';
var all_people = {};
var pseudo_id = 1;

function addressSearch() {

    // configuration for showing representatives at different levels of government

    var show_alcalde   = false;
    var show_dl  = false;
    var show_df   = false;
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


    $.address.parameter('results_level', results_level_set);

    // console.log('doin search')
    // console.log('local: ' + show_local)
    // console.log('county: ' + show_county)
    // console.log('state: ' + show_state)
    // console.log('federal: ' + show_federal)
    var address = $('#address').val();
    $.address.parameter('address', encodeURIComponent(address));

    var params = {
        'key': API_KEY,
        'address': address
    }
    $.when($.getJSON(INFO_API, params)).then(function(data){
        var divisions = data['divisions'];
        var officials = data['officials'];
        var offices = data['offices'];

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
        var federal_people = [];
        var state_people = [];
        var local_people = [];
        var county_people = [];

        // console.log(data);
        // console.log(divisions);

        if (divisions === undefined) {
            $("#no-response-container").show();
            $("#response-container").hide();
        }
        else {
            setFoundDivisions(divisions);

            $.each(divisions, function(division_id, division){
                // console.log(division.name);
                if (typeof division.officeIndices !== 'undefined'){
                    
                    $.each(division.officeIndices, function(i, office){
                        var office_name = offices[office];

                        $.each(offices[office]['officialIndices'], function(i, official){
                            var info = {
                                'person': null,
                                'office': office_name,
                                'address': null,
                                'channels': null,
                                'phones': null,
                                'urls': null,
                                'emails': null,
                                'division_id': division_id,
                                'pseudo_id': pseudo_id
                            };

                            // console.log(officials[official])
                            var person = officials[official];
                            info['person'] = person;

                            if (typeof person.channels !== 'undefined'){
                                var channels = [];
                                $.each(person.channels, function(i, channel){
                                    if (channel.type != 'GooglePlus' && channel.type != 'YouTube') {
                                        channel['icon'] = social_icon_lookup[channel.type];
                                        channel['link'] = social_link_lookup[channel.type] + channel['id'];
                                        channels.push(channel);
                                    }
                                });
                                info['channels'] = channels;
                            }
                            if (typeof person.address !== 'undefined'){
                                info['address'] = person.address;
                            }
                            if (typeof person.phones !== 'undefined'){
                                info['phones'] = person.phones;
                            }
                            if (typeof person.urls !== 'undefined'){
                                info['urls'] = person.urls;
                            }
                            if (typeof person.emails !== 'undefined'){
                                info['emails'] = person.emails;
                            }

                            if(checkFederal(division_id, office_name)) {
                                info['jurisdiction'] = 'Federal Government';
                                federal_people.push(info);
                            } else if (checkState(division_id)) {
                                info['jurisdiction'] = selected_state;
                                state_people.push(info);
                            } else if (checkCounty(division_id)){
                                info['jurisdiction'] = selected_county;
                                county_people.push(info);
                            } else {
                                info['jurisdiction'] = selected_local;
                                local_people.push(info);
                            }
                            all_people[pseudo_id] = info;
                            pseudo_id = pseudo_id + 1;

                        });

                    });
                }
            });

            $("#address-image").html("<img class='img-responsive img-thumbnail' src='https://maps.googleapis.com/maps/api/staticmap?size=600x200&maptype=roadmap&markers=" + encodeURIComponent(address) + "' alt='" + address + "' title='" + address + "' />");

            var template = new EJS({'text': $('#tableGuts').html()});
            
            if (show_presidente) {
                $('#presidente-container').show();
                $('#presidente-nav').show();
                $('#presidente-results tbody').append(template.render({people: presidente_people}));
            } else {
                $('#presidente-container').hide()
                $('#presidente-nav').hide();
            }

            if (show_gobernador) {
                $('#gobernador-container').show();
                $('#gobernador-nav').show();
                if (gobernador_people.length == 0)
                    $('#gobernador-container').hide();
                $('#gobernador-results tbody').append(template.render({people: gobernador_people}));
            } else {
                $('#gobernador-container').hide()
                $('#gobernador-nav').hide();
            }                

            if (show_alcalde) {
                if (alcalde_people.length == 0) {
                    $('#alcalde-container').hide();
                    if (selected_alcalde == '')
                        $('#alcalde-container-not-found').hide();
                    else
                        $('#alcalde-container-not-found').show();
                }
                else {
                    $('#alcalde-container').show();
                    $('#alcalde-container-not-found').hide();
                }

                $('#alcalde-results tbody').append(template.render({people: alcalde_people}));
            } else {
                $('#alcalde-container').hide()
                $('#alcalde-nav').hide();
            }  

            if (show_dl) {
                if (dl_people.length == 0) {
                    $('#dl-container').hide();
                    if (selected_dl == '')
                        $('#dl-container-not-found').hide();
                    else
                        $('#dl-container-not-found').show();
                }
                else {
                    $('#dl-container').show();
                    $('#dl-container-not-found').hide();
                }

                $('#dl-results tbody').append(template.render({people: dl_people}));
            } else {
                $('#dl-container').hide()
                $('#dl-nav').hide();
            }

            if (show_df) {
                if (df_people.length == 0) {
                    $('#df-container').hide();
                    if (selected_df == '')
                        $('#df-container-not-found').hide();
                    else
                        $('#df-container-not-found').show();
                }
                else {
                    $('#df-container').show();
                    $('#df-container-not-found').hide();
                }

                $('#df-results tbody').append(template.render({people: df_people}));
            } else {
                $('#df-container').hide()
                $('#df-nav').hide();
            }    

            if (show_senador) {
                if (senador_people.length == 0) {
                    $('#senador-container').hide();
                    if (selected_senador == '')
                        $('#senador-container-not-found').hide();
                    else
                        $('#senador-container-not-found').show();
                }
                else {
                    $('#senador-container').show();
                    $('#senador-container-not-found').hide();
                }

                $('#senador-results tbody').append(template.render({people: senador_people}));
            } else {
                $('#senador-container').hide()
                $('#senador-nav').hide();
            }  


            $('#response-container').show();
            $("#no-response-container").hide();

            // hook up modal stuff
            var modal_template = new EJS({'text': $('#modalGuts').html()});
            $('.btn-contact').off('click');
            $('.btn-contact').on('click', function(){
                var info = all_people[$(this).data('id')];
                $('#contactModalLabel').html("Contact " + info.person.name);
                $('#modalContent').html(modal_template.render({info: info}));
                $('#contactModal').modal('show');
            })
        }
    });
}

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
};

function setFoundDivisions(divisions){
    
    // reset the labels
    $("#alcalde-nav").hide();
    $("#dl-nav").hide();
    $("#df-nav").hide();
    $("#senador-nav").hide();
    $("#gobernador-nav").hide();
    $("#presidente-nav").hide();

    // console.log(divisions)
    $.each(divisions, function(division_id, division){
        if (state_pattern.test(division_id)) {
            selected_state = division.name;
            $("[id^=state-name]").html(selected_state);
            $("#state-nav").show();
        }
        if (county_pattern.test(division_id)) {
            selected_county = division.name;
            $("[id^=county-name]").html(selected_county);
            $("#county-nav").show();
        }
        if (local_pattern.test(division_id) || district_pattern.test(division_id)) {
            selected_local = division.name;
            $("[id^=local-name]").html(selected_local);
            $("#local-nav").show();
        }


    });
}

function checkFederal(division_id, office_name) {
    if( division_id == federal_pattern || 
        cd_pattern.test(division_id) ||
        federal_offices.indexOf(office_name.name) >= 0)
        return true;
    else
        return false; 
}

function checkState(division_id){
    if( state_pattern.test(division_id) ||
        sl_pattern.test(division_id))
        return true;
    else
        return false; 
}

function checkCounty(division_id){
    if( county_pattern.test(division_id))
        return true;
    else
        return false; 
}

function formatParty(party) {
    if (party) {
        if (party == 'Unknown')
            return '';

        var party_letter = party.charAt(0);
        var css_class ='label-ind';
        if (party_letter == 'D')
            css_class ='label-dem';
        else if (party_letter == 'R')
            css_class ='label-rep';

        return "(<span title='" + party + "' class='" + css_class + "'>" + party_letter + "</span>)";
    }
    else
        return '';
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

//converts a slug or query string in to readable text
function convertToPlainString(text) {
    if (text === undefined) return '';
    return decodeURIComponent(text);
}
