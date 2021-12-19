const logger = require('./db/logger.js');

exports.sendEvent = null;

exports.registerEventHandlers = function (source) {
    source.addEventListener('Lux', forwardEvent);
    source.addEventListener('Feuchtigkeit', forwardEvent);
    source.addEventListener('Bewässerung', forwardEvent);
    // Register more event handlers here
}

function forwardEvent(event) {
    // read variables from the event
    var data = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data, // the value of the event
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at
    };

    try {        
        // Log the event in the database
        logger.logOne("MyDB", event.type, data);
        
        

        // send data to all connected clients
        exports.sendEvent(data);
    } catch (error) {
        console.log("Could not handle event: " + JSON.stringify(event) + "\n");
        console.log(error)
    }
}
/*function forwardEvent1(event) {
    // read variables from the event
    var data1 = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data, // the value of the event
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at
    };

    try {        
        // Log the event in the database
        logger.logMany("MyDB", "Feuchtigkeit", data1);

        // send data to all connected clients
        exports.sendEvent(data1);
    } catch (error) {
        console.log("Could not handle event: " + JSON.stringify(event) + "\n");
        console.log(error)
    }
}*/