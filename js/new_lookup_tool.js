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

    selected_alcalde = '';
    selected_dl = '';
    selected_df = '';
    selected_senador = '';
    selected_gobernador = '';
    selected_presidente = 'México';
    all_people = {};
    pseudo_id = 1;

    if (show_alcalde) {
        $('#alcalde-container').show();
        $('#alcalde-nav').show();
    } 
    else {
        $('#alcalde-container').hide()
        $('#alcalde-nav').hide();
    }

    if (show_dl) {
        $('#dl-container').show();
        $('#dl-nav').show();
    } 
    else {
        $('#dl-container').hide()
        $('#dl-nav').hide();
    }

    if (show_df) {
        $('#df-container').show();
        $('#df-nav').show();
    } 
    else {
        $('#df-container').hide()
        $('#df-nav').hide();
    }

    if (show_senador) {
        $('#senador-container').show();
        $('#senador-nav').show();
    } 
    else {
        $('#senador-container').hide()
        $('#senador-nav').hide();
    }

    if (show_gobernador) {
        $('#gobernador-container').show();
        $('#gobernador-nav').show();
    } 
    else {
        $('#gobernador-container').hide()
        $('#gobernador-nav').hide();
    }

    if (show_presidente) {
        $('#presidente-container').show();
        $('#presidente-nav').show();
    } 
    else {
        $('#presidente-container').hide()
        $('#presidente-nav').hide();
    }

          $('#no-response-container').hide();
        $("#response-container").show();
   
};