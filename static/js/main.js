// DOES THIS WORK Last updated 7.27.20 - ap9

// Initialize - get location
var currentLat = 0.0;
var currentLon = 0.0;
// don't set default to 0, look in getYardage logic
var accuracy = 100.0;

var myLoc = document.getElementById("my_loc");
var yd = document.getElementById("yards");

// Call first to set the stage - will call error if there is one.
getLocation();

// Look at this for ajax backend processing https://medium.com/@doobeh/posting-a-wtform-via-ajax-with-flask-b977782edeee

function getYardage() {

    var course = document.getElementById("courses").value;
    var hole = document.getElementById("holes").value;

    var key = course + "" + hole;

    var lat = coordinates[key].lat;
    var lon = coordinates[key].lon;

    var yardage = 0;

    var bailey = [
        '<img src=\"/static/baileyR.png\" width=\"130px\" height=\"130px\">',
        '<img src=\"/static/baileyD.png\" width=\"130px\" height=\"130px\">',
        '<img src=\"/static/baileyL.png\" width=\"130px\" height=\"130px\">',
        '<img src=\"/static/bailey.png\" width=\"130px\" height=\"130px\">'
        ];

    var ctr = 5; // 5 seconds

    var x = setInterval(function() {

        ctr--;

        getLocation();
        yd.innerHTML = bailey[ctr-1];
        
        if (ctr == 0) {

            getLocation();
            clearInterval(x);

            yardage = getDistanceFromLatLonInYd(currentLat, currentLon, lat, lon);
            yd.innerHTML = Math.round(yardage);

            accuracy = 100.0; // important! reset accuracy otherwise getLocation never gets called again
            kramer();
        }
    }, 1000);
}

// https://www.w3schools.com/html/html5_geolocation.asp
function getLocation() {

    if (navigator.geolocation) {

        var options = {maximumAge:0,enableHighAccuracy: true};
        navigator.geolocation.getCurrentPosition(showPosition,errorHandler,options);

    } else {

        myLoc.innerHTML = "Geolocation is not supported by this browser.";
        alert("Geolocation is not supported by this browser.");
    }
}

// called in getLocation
function showPosition(position) {

    var today = new Date();
    var hour = today.getHours();
    var minutes = addZero(today.getMinutes());
    var now = (hour) + ":" + minutes + "PM";

    if (hour > 12)
        now = (hour-12) + ":" + minutes + "PM";
    else if (hour != 12) 
        now = hour + ":" + minutes + "AM";

    currentLat = position.coords.latitude;
    currentLon = position.coords.longitude;
    accuracy = Math.round(position.coords.accuracy * 1.09361);

    // LP1 testing approach shot coordinates 33.069564, -97.000803

    myLoc.innerHTML = now + " " + currentLat.toFixed(2) + "," + currentLon.toFixed(2);
}

// getLocation error handler
function errorHandler(err) {

    switch(err.code)
    {
        case err.TIMEOUT:
            alert("GPS timeout error. Try again in a minute.");
            break;
        case err.POSITION_UNAVAILABLE:
            alert("Location is not available due to device GPS error, try again later. Please report to info link above.");
            break;
        case err.PERMISSION_DENIED:
            alert("Your browser has location services disabled. Allow location services for your browser in your device settings, then refresh page.");
            break;
        default:
            alert("An unknown error occurred. Please report to info link above.");
    }
}

function sleep(milliseconds) {
    
    const date = Date.now();
    let currentDate = null;
    
    do {
        
        currentDate = Date.now();
        
    } while (currentDate - date < milliseconds);
}

// Credit - https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
function getDistanceFromLatLonInYd(lat1, lon1, lat2, lon2) {

    var R = 6378; // Radius of the earth in km
    
    // deg2rad below
    var dLat = deg2rad(lat2-lat1); 
    var dLon = deg2rad(lon2-lon1); 

    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km

    var yardage = d * 1093.6132983; // km * (yd/km) =  yards

    return yardage;
}

function deg2rad(deg) {

  return deg * (Math.PI/180)
  
}

// fun stuff B-)
function kramer() {

    var rando = Math.floor(Math.random() * 3) + 1;
    var x = document.getElementById("main");

    switch(rando) {
        case 1:
            x.style.backgroundImage = "url('/static/takeaway.JPG')";
            break;
        case 2:
            x.style.backgroundImage = "url('/static/follow.JPG')";
            break;
        default:
            x.style.backgroundImage = "url('/static/surprise.JPG')";
    }
}

// see getMinutes
function addZero(i) {

  if (i < 10) {

    i = "0" + i;

  }

  return i;
}