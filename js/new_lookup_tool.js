function getCandidates() {
    $.getJSON("data/lista_candidatos.json", function(data) {
    // <!-- Add Alcaldes -->
        $("#alcalde-results tbody tr").remove();
        var items = [];
        for (i = 0; i < data.length; i++) {
            if (data[i].Candidatura === mi_municipio) {
                var nombre = "<b>" + data[i].Nombre + "</b>";
                if (data[i].Nombre_corto || 0 !== data[i].Nombre_corto.length) {
                    nombre = nombre + " (" + data[i].Nombre_corto + ")"
                }
                var tableguts = "<tr><td>" + nombre +
                    "</td><td class='long'>" + data[i].Partido + "</td><td>";
                if (data[i].twitter || 0 !== data[i].twitter.length) {
                    tableguts = tableguts + "<a href='" + data[i].twitter 
                    + "' target='_blank'><i class='fab fa-twitter'></i></a>&nbsp;&nbsp;"
                };
                if (data[i].facebook || 0 !== data[i].facebook.length) {
                    tableguts = tableguts + "<a href='" + data[i].facebook 
                    + "' target='_blank'><i class='fab fa-facebook'></i></a>"
                };
                items.push(tableguts + "</td></tr>");
            }
        };
        if (items.length == 0) { 
            $('#alcalde-container-not-found').show();
            $('#alcalde-container').hide();
        }
        else { 
            $('#alcalde-container-not-found').hide();
            $('#alcalde-container').show();
            $('#alcalde-results').find('tbody').append(items) };

    // <!-- Add Diputados Locales -->
        $("#dl-results tbody tr").remove();
        var items = [];
        for (i = 0; i < data.length; i++) {
            var regex = new RegExp( "Diputado Local DTTO. " + mi_distrito + '\\b');
            if (data[i].Candidatura.match(regex)) {
                var nombre = "<b>" + data[i].Nombre + "</b>";
                if (data[i].Nombre_corto || 0 !== data[i].Nombre_corto.length) {
                    nombre = nombre + " (" + data[i].Nombre_corto + ")"
                }
                var tableguts = "<tr><td>" + nombre + "</td><td class='long'>" + 
                    data[i].Partido + "</td><td>"
                if (data[i].twitter || 0 !== data[i].twitter.length) {
                    tableguts = tableguts + "<a href='" + data[i].twitter 
                    + "' target='_blank'><i class='fab fa-twitter'></i></a>&nbsp;&nbsp;"
                };
                if (data[i].facebook || 0 !== data[i].facebook.length) {
                    tableguts = tableguts + "<a href='" + data[i].facebook 
                    + "' target='_blank'><i class='fab fa-facebook'></i></a>"
                };
                items.push(tableguts + "</td></tr>");
            }
        };
        $('#dl-results').find('tbody').append(items);

    // <!-- Add Diputados Federales -->
        $("#df-results tbody tr").remove();
        var items = [];
        for (i = 0; i < data.length; i++) {
            if (data[i].Candidatura === "Diputado Federal DTTO. " + mi_distrito) {
                var nombre = "<b>" + data[i].Nombre + "</b>";
                if (data[i].Nombre_corto || 0 !== data[i].Nombre_corto.length) {
                    nombre = nombre + " (" + data[i].Nombre_corto + ")"
                }
                var tableguts = "<tr><td>" + nombre + "</td><td class='long'>" + 
                    data[i].Partido + "</td><td>"
                if (data[i].twitter || 0 !== data[i].twitter.length) {
                    tableguts = tableguts + "<a href='" + data[i].twitter 
                    + "' target='_blank'><i class='fab fa-twitter'></i></a>&nbsp;&nbsp;"
                };
                if (data[i].facebook || 0 !== data[i].facebook.length) {
                    tableguts = tableguts + "<a href='" + data[i].facebook 
                    + "' target='_blank'><i class='fab fa-facebook'></i></a>"
                };
                items.push(tableguts + "</td></tr>");
            }
        };
        $('#df-results').find('tbody').append(items);

    // <!-- Add candidates for the senate -->
        $("#senador-results tbody tr").remove();
        var items = [];
        for (i = 0; i < data.length; i++) {
            if (data[i].Candidatura === "Senador") {
                var tableguts = "<tr><td><b>" +
                    data[i].Nombre.split(' y ').join("</b><span style='color: #555'> y </span><b>") +
                    "</b></td><td class='long'>" + data[i].Partido + "</td><td class='long'>";
                if (data[i].facebook_senadores || 0 !== data[i].facebook_senadores.length) {
                    var info = data[i].facebook_senadores.split(',');
                    tableguts = tableguts + info[0] + ": <a href='" + info[1] + 
                        "' target='_blank'><i class='fab fa-facebook'></i></a><br>" + 
                        info[2] + ": <a href='" + info[3] + 
                        "' target='_blank'><i class='fab fa-facebook'></i></a>";
                };
                items.push(tableguts + "</td></tr>");
            }
        };
        $('#senador-results').find('tbody').append(items);

    // <!-- Add gubernatorial candidates -->
        $("#gobernador-results tbody tr").remove();
        var items = [];
        for (i = 0; i < data.length; i++) {
            if (data[i].Candidatura === "Gobernador") {
                var tableguts = "<tr><td><b>" + data[i].Nombre 
                    + "</b></td><td class='long'>" + data[i].Partido + "</td><td>";
                if (data[i].url || 0 !== data[i].url.length)  {
                    tableguts = tableguts + "<a href='" + data[i].url 
                    + "' target='_blank'><i class='fas fa-globe'></i></a>&nbsp;&nbsp;"
                };
                if (data[i].twitter || 0 !== data[i].twitter.length) {
                    tableguts = tableguts + "<a href='" + data[i].twitter 
                    + "' target='_blank'><i class='fab fa-twitter'></i></a>&nbsp;&nbsp;"
                };
                if (data[i].facebook || 0 !== data[i].facebook.length) {
                    tableguts = tableguts + "<a href='" + data[i].facebook 
                    + "' target='_blank'><i class='fab fa-facebook'></i></a>"
                };
                items.push(tableguts + "</td></tr>");
            };
        };
        $('#gobernador-results').find('tbody').append(items);

    // <!-- Add presidential candidates -->
        $("#presidente-results tbody tr").remove();
        var items = [];
        for (i = 0; i < data.length; i++) {
            if (data[i].Candidatura === "Presidente") {
                var nombre = "<b>" + data[i].Nombre + "</b>";
                if (data[i].Nombre_corto || 0 !== data[i].Nombre_corto.length) {
                    nombre = nombre + " (" + data[i].Nombre_corto + ")"
                }
                var tableguts = "<tr><td>" + nombre + "</td><td class='long'>" 
                    + data[i].Partido + "</td><td>";
                if (data[i].url || 0 !== data[i].url.length)  {
                    tableguts = tableguts + "<a href='" + data[i].url 
                    + "' target='_blank'><i class='fas fa-globe'></i></a>&nbsp;&nbsp;"
                };
                if (data[i].twitter || 0 !== data[i].twitter.length) {
                    tableguts = tableguts + "<a href='" + data[i].twitter 
                    + "' target='_blank'><i class='fab fa-twitter'></i></a>&nbsp;&nbsp;"
                };
                if (data[i].facebook || 0 !== data[i].facebook.length) {
                    tableguts = tableguts + "<a href='" + data[i].facebook 
                    + "' target='_blank'><i class='fab fa-facebook'></i></a>"
                };
                items.push(tableguts + "</td></tr>");
            };
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

    // set levels from checkboxes
    if ($('#show_alcalde_results').is(':checked')) {
        show_alcalde = true;
    }
    if ($('#show_dl_results').is(':checked')) {
        show_dl = true;
    }
    if ($('#show_df_results').is(':checked')) {
        show_df = true;
    }
    if ($('#show_senador_results').is(':checked')) {
        show_senador = true;
    }
    if ($('#show_gobernador_results').is(':checked')) {
        show_gobernador = true;
    }
    if ($('#show_presidente_results').is(':checked')) {
        show_presidente = true;
    }

    if (show_alcalde) {
        $('#alcalde-nav').show();
    } 
    else {
        $('#alcalde-container').hide()
        $('#alcalde-nav').hide();
        $('#alcalde-container-not-found').hide();
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

