// Reload to top of page
$(document).ready(function(){
    $('html, body').scrollTop(0);
    $(window).on('load', function() {
    setTimeout(function(){
        $('html, body').scrollTop(0);
    }, 0);
 });
});

function getCandidates() {
    // <!-- Add Alcaldes -->
   $.getJSON("/lista_candidatos.json", function(data) {
        $("#alcalde-results tbody tr").remove();
        var items = [];
        for (i = 0; i < data.length; i++) {
            if (data[i].Candidatura === mi_municipio) items.push("<tr><td></td><td>" + data[i].Nombre +
                " (" + data[i].Candidatura + ")</td><td>" + data[i].Partido +
                "</td><td></td></tr>")
        };
        $('#alcalde-results').find('tbody').append(items)
    });
    // <!-- Add Diputados Locales -->
    $.getJSON("lista_candidatos.json", function(data) {
        $("#dl-results tbody tr").remove();
        var items = [];
        for (i = 0; i < data.length; i++) {
            if (data[i].Candidatura.includes("Diputado Local DTTO. " + mi_distrito + " ")) items.push(
                "<tr><td></td><td>" + data[i].Nombre + " (Distrito " + data[i].Candidatura.replace(/\D/g, '') +
                ")</td><td>" + data[i].Partido + "</td><td></td></tr>")
        };
        $('#dl-results').find('tbody').append(items)
    });
    // <!-- Add Diputados Federales -->
    $.getJSON("lista_candidatos.json", function(data) {
        $("#df-results tbody tr").remove();
        var items = [];
        for (i = 0; i < data.length; i++) {
            if (data[i].Candidatura === "Diputado Federal DTTO. " + mi_distrito) items.push(
                "<tr><td></td><td>" + data[i].Nombre + " (Distrito " + data[i].Candidatura.replace(/\D/g, '') +
                ")</td><td>" + data[i].Partido + "</td><td></td></tr>")
        };
        $('#df-results').find('tbody').append(items)
    });
    // <!-- Add candidates for the senate -->
    $.getJSON("lista_candidatos.json", function(data) {
        $("#senador-results tbody tr").remove();
        var items = [];
        for (i = 0; i < data.length; i++) {
            if (data[i].Candidatura === "Senador") items.push("<tr><td></td><td>" + data[i].Nombre +
                "</td><td>" + data[i].Partido + "</td><td></td></tr>")
        };
        $('#senador-results').find('tbody').append(items)
    });
    // <!-- Add gubernatorial candidates -->
    $.getJSON("lista_candidatos.json", function(data) {
        $("#gobernador-results tbody tr").remove();
        var items = [];
        for (i = 0; i < data.length; i++) {
            if (data[i].Candidatura === "Gobernador") items.push("<tr><td></td><td>" + data[i].Nombre +
                "</td><td>" + data[i].Partido + "</td><td></td></tr>")
        };
        $('#gobernador-results').find('tbody').append(items)
    });
    // <!-- Add presidential candidates -->
    $.getJSON("lista_candidatos.json", function(data) {
        $("#presidente-results tbody tr").remove();
        var items = [];
        for (i = 0; i < data.length; i++) {
            if (data[i].Candidatura === "Presidente") items.push("<tr><td></td><td>" + data[i].Nombre +
                "</td><td>" + data[i].Partido + "</td><td></td></tr>")
        };
        $('#presidente-results').find('tbody').append(items)
    });
    showResults();
}


function showResults() {

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