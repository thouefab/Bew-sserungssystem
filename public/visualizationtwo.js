var rootUrl = window.location.origin; // get the root URL, e.g. https://example.herokuapp.com or http://localhost:3001

// initialise server-sent events
function initSSE() {
    if (typeof (EventSource) !== "undefined") {
        var url = rootUrl + "/api/events";
        var source = new EventSource(url);
        source.onmessage = (event) => {
            updateVariables(JSON.parse(event.data));
        };
    } else {
        alert("Your browser does not support server-sent events.");
    }
}
initSSE();


// Array, in dem alle empfangenen Lux-Werte gespeichert werden.
var LuxMeasurements = [];
var FeuchtigkeitMeasurements = [];
var BewässerungMeasurements = [];


// Maximaler Lux Level für die Berechnung des Prozentwerts und als maximaler Wert für das Chart.
// -- TODO Aufgabe 1 -- 
// Maximalwert anpassen
var maxLevel = 100;
var bewässerungLevel = 1;

// Diese Funktion wird immer dann ausgeführt, wenn ein neues Event empfangen wird.
function updateVariables(data) {

    if (data.eventName === "Lux") {
        // Erhaltenen Wert in der Variable 'lux' speichern
        var lux = Number(data.eventData);
        //console.log(lux);

        // Wert am Ende des Arrays 'allMeasurements' hinzufügen
        LuxMeasurements.push(lux);

        // Wert in Prozent umrechnen und in 'level' speichern
        var level = lux * (100 / maxLevel);

        // Farbe des Balkens abhängig von Level festlegen
        // Liste aller unterstützten Farben: https://www.w3schools.com/cssref/css_colors.asp
        // -- TODO Aufgabe 2 -- 
        // Weitere Farben abhängig vom Level
        if (level <= 30) {
            color = "Green";
        } else {
            color = "Orange";
        }

        // CSS Style für die Hintergrundfarbe des Balkens
        var colorStyle = "background-color: " + color + " !important;";

        // CSS Style für die Breite des Balkens in Prozent
        var widthStyle = "width: " + level + "%;"

        // Oben definierte Styles für Hintergrundfarbe und Breite des Balkens verwenden, um
        // den Progressbar im HTML-Dokument zu aktualisieren
        document.getElementById("luxlevel-bar").style = colorStyle + widthStyle;

        // Text unterhalb des Balkens aktualisieren
        document.getElementById("luxlevel-text").innerHTML = lux + " Lux"

        // Durchschnitt aller bisherigen Messungen berechnen und in 'luxAverage' speichern
        var luxSum = 0;
        for (var measurement of LuxMeasurements) {
            luxSum = luxSum + measurement;
        }
        var luxAverage = luxSum / LuxMeasurements.length;
        //console.log(luxAverage);

        // -- TODO Aufgabe 3 -- 
        // Durchschnittlichen Lux-Wert (luxAverage) in Prozent umrechnen und als Balken und Text anzeigen
        

        // Wert im Chart hinzufügen
        addData(lux);
    }
    
    //Feuchtigkeitslevelbar

    if (data.eventName === "Feuchtigkeit") {
        // Erhaltenen Wert in der Variable 'lux' speichern
        var feuchtigkeit = Number(data.eventData);
     //console.log(lux);

        // Wert am Ende des Arrays 'allMeasurements' hinzufügen
     FeuchtigkeitMeasurements.push(feuchtigkeit);

        // Wert in Prozent umrechnen und in 'level' speichern
        var level = feuchtigkeit * (100 / maxLevel);

        // Farbe des Balkens abhängig von Level festlegen
        // Liste aller unterstützten Farben: https://www.w3schools.com/cssref/css_colors.asp
        // -- TODO Aufgabe 2 -- 
        // Weitere Farben abhängig vom Level
        if (level <= 40) {
            color = "Brown";
        } else if (level <= 60) {
            color = "Orange";
        } else {
           color = "Green";
        }

        // CSS Style für die Hintergrundfarbe des Balkens
        var colorStyle = "background-color: " + color + " !important;";

        // CSS Style für die Breite des Balkens in Prozent
        var widthStyle = "width: " + level + "%;"

        // Oben definierte Styles für Hintergrundfarbe und Breite des Balkens verwenden, um
        // den Progressbar im HTML-Dokument zu aktualisieren
        document.getElementById("feuchtigkeit-bar").style = colorStyle + widthStyle;

        // Text unterhalb des Balkens aktualisieren
        document.getElementById("feuchtigkeit-text").innerHTML = "Feuchtigkeit: " + feuchtigkeit + " %"

        // Durchschnitt aller bisherigen Messungen berechnen und in 'luxAverage' speichern
        var feuchtigkeitSum = 0;
        for (var measurement of FeuchtigkeitMeasurements) {
            feuchtigkeitSum = feuchtigkeitSum + measurement;
        }
        var feuchtigkeitAverage = feuchtigkeitSum / FeuchtigkeitMeasurements.length;
        //console.log(luxAverage);

        // -- TODO Aufgabe 3 -- 
        // Durchschnittlichen Lux-Wert (luxAverage) in Prozent umrechnen und als Balken und Text anzeigen
    

        // Wert im Chart hinzufügen
        addData1(feuchtigkeit);
    }
    //Bewässerungslevelbar

    if (data.eventName === "Bewässerung") {
        // Erhaltenen Wert in der Variable 'lux' speichern
        var bewässerung = Number(data.eventData);
     //console.log(lux);

        // Wert am Ende des Arrays 'allMeasurements' hinzufügen
        BewässerungMeasurements.push(bewässerung);

        // Wert in Prozent umrechnen und in 'level' speichern
        var level = bewässerung * (100 / bewässerungLevel);

        // Farbe des Balkens abhängig von Level festlegen
        // Liste aller unterstützten Farben: https://www.w3schools.com/cssref/css_colors.asp
        // -- TODO Aufgabe 2 -- 
        // Weitere Farben abhängig vom Level
        if (level <= 100) {
            color = "Blue";
            document.getElementById("bewässerung-text").innerHTML = "Bewässerung erfolgt ";
        } else {
           color = "Red";
           document.getElementById("bewässerung-text").innerHTML = "Bewässerung erfolgt nicht";
        }

        // CSS Style für die Hintergrundfarbe des Balkens
        var colorStyle = "background-color: " + color + " !important;";

        // CSS Style für die Breite des Balkens in Prozent
        var widthStyle = "width: " + level + "%;"

        // Oben definierte Styles für Hintergrundfarbe und Breite des Balkens verwenden, um
        // den Progressbar im HTML-Dokument zu aktualisieren
        document.getElementById("bewässerung-bar").style = colorStyle + widthStyle;

        // Text unterhalb des Balkens aktualisieren
        

        // Durchschnitt aller bisherigen Messungen berechnen und in 'luxAverage' speichern
        var bewässerungSum = 0;
        for (var measurement of BewässerungMeasurements) {
            bewässerungSum = bewässerungSum + measurement;
        }
        var bewässerungAverage = bewässerungtSum / BewässerungMeasurements.length;
        //console.log(luxAverage);

        // -- TODO Aufgabe 3 -- 
        // Durchschnittlichen Lux-Wert (luxAverage) in Prozent umrechnen und als Balken und Text anzeigen
    

        // Wert im Chart hinzufügen
        addData2(bewässerung);
    }
}

//////////////////////////////////
/////   Code für das Chart 1  ///// 
//////////////////////////////////

// Chart und Variablen 
var chartData, chartData1, chartOptions, chartOptions1, chart, chart1;
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

// Chart initialisieren. Diese Funktion wird einmalig aufgerufen, wenn die Page geladen wurde.
function drawChart() {
    // Daten mit dem Dummy-Wert ["", 0] initialisieren. 
    // (Dieser Dummy-Wert ist nötig, damit wir das Chart schon anzeigen können, bevor 
    // wir Daten erhalten. Es können keine Charts ohne Daten gezeichnet werden.)
    chartData = new google.visualization.arrayToDataTable([['Time', 'Lux'], ["", 0]]);
    
    // Chart Options festlegen
    chartOptions = {
        title: 'Lux Level',
        hAxis: { title: 'Time' },
        vAxis: { title: 'Lux' },
        animation: {
            duration: 300, // Dauer der Animation in Millisekunden
            easing: 'out',
        },
        curveType: 'function', // Werte als Kurve darstellen (statt mit Strichen verbundene Punkte)
        legend: 'none',
        vAxis: {
            // Range der vertikalen Achse
            viewWindow: {
                min: 0,
                max: maxLevel
            },
        }
    };
   
    
    // LineChart initialisieren
    chart = new google.visualization.LineChart(document.getElementById('lux-chart'));
    chartData.removeRow(0); // Workaround: ersten (Dummy-)Wert löschen, bevor das Chart zum ersten mal gezeichnet wird.
    chart.draw(chartData, chartOptions); // Chart zeichnen

    chartData1 = new google.visualization.arrayToDataTable([['Time', 'Feuchtigkeit'], ["", 0]]);
    chartOptions1 = {
        title: 'Feuchtigkeit Level',
        hAxis: { title: 'Time' },
        vAxis: { title: 'Feuchtigkeit' },
        animation: {
            duration: 300, // Dauer der Animation in Millisekunden
            easing: 'out',
        },
        curveType: 'function', // Werte als Kurve darstellen (statt mit Strichen verbundene Punkte)
        legend: 'none',
        vAxis: {
            // Range der vertikalen Achse
            viewWindow: {
                min: 0,
                max: maxLevel
            },
        }
    };

    // LineChart initialisieren
    chart1 = new google.visualization.LineChart(document.getElementById('feuchtigkeit-chart'));
    chartData1.removeRow(0); // Workaround: ersten (Dummy-)Wert löschen, bevor das Chart zum ersten mal gezeichnet wird.
    chart1.draw(chartData1, chartOptions1); // Chart zeichnen
}

// Eine neuen Wert ins Chart hinzufügen
function addData(lux) {

    // -- TODO Aufgabe 4 --
    // Nur die letzten 10 gemessenen Werte anzeigen.
    // Tipp: mit chartData.removeRow(0) kann der erste Eintrag im Chart entfernt werden.

    // aktuelles Datum/Zeit
    var date = new Date();
    // aktuelle Zeit in der Variable 'localTime' speichern
    var localTime = date.toLocaleTimeString();

    // neuen Wert zu den Chartdaten hinzufügen
    chartData.addRow([localTime, lux]);

    // Chart neu rendern
    chart.draw(chartData, chartOptions);
}

function addData1(feuchtigkeit) {

    // -- TODO Aufgabe 4 --
    // Nur die letzten 10 gemessenen Werte anzeigen.
    // Tipp: mit chartData.removeRow(0) kann der erste Eintrag im Chart entfernt werden.

    // aktuelles Datum/Zeit
    var date1 = new Date();
    // aktuelle Zeit in der Variable 'localTime' speichern
    var localTime1 = date1.toLocaleTimeString();

    // neuen Wert zu den Chartdaten hinzufügen
    chartData1.addRow([localTime1, feuchtigkeit]);

    // Chart neu rendern
    chart1.draw(chartData1, chartOptions1);
}













