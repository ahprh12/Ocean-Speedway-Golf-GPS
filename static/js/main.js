// DOES THIS WORK Last updated 10.26.20 - ap9

// Initialize - get location
var currentLat = 0.0;
var currentLon = 0.0;
// Initialize Last Shot location (for displaying driving distance)
var previousLat = 0.0;
var previousLon = 0.0;
var yardsFromLastShot = 0;
// don't set default to 0, look in getYardage logic
var accuracy = 100.0;

var myLoc = document.getElementById("my_loc");
var yd = document.getElementById("yards");
var stamp = document.getElementById("now");

var course = "";
var hole = "";
var key = "";
var lat = 0.0;
var lon = 0.0;
var yardage = 0;
var loc_id = 0;
var now = "";

// crappy solution to try and get the most accurate yardage :| the equivalent of clicking 7 times
function fireoff() {

    for (var x = 1; x < 8; x++) getYardage(x);
}

// Look at this for ajax backend processing https://medium.com/@doobeh/posting-a-wtform-via-ajax-with-flask-b977782edeee
function getYardage() {

    accuracy = 100.0;

    course = document.getElementById("courses").value;
    hole = document.getElementById("holes").value;
    key = course + "" + hole;
    lat = coordinates[key].lat;
    lon = coordinates[key].lon;
    yardage = 0;
    var prvlat = 0.0;
    var prvlon = 0.0;
    var index = 0;
    
    var ctr = 0; // 5 seconds
    
    var x = setInterval(function() {

        getLocation();

        ctr++;
        index = ctr % 3;

        switch(index) {

            case 1:
                yd.innerHTML = "spazzing.";
                myLoc.innerHTML = "Zeroing In." + accuracy + "";
                break;
            case 2:
                yd.innerHTML = "spazzing..";
                myLoc.innerHTML = "Zeroing In.." + accuracy + "";
                break;
            default:
                yd.innerHTML = "spazzing...";
                myLoc.innerHTML = "Zeroing In..." + accuracy + "";
                break;
        }
        
        
        if (accuracy < 11.0) {

            clearInterval(x);
            navigator.geolocation.clearWatch(loc_id);
            
            yardage = getDistanceFromLatLonInYd(currentLat, currentLon, lat, lon);
            yd.innerHTML = Math.round(yardage);
            stamp.innerHTML = now;

            
            if (previousLat != 0.0)
                yardsFromLastShot = getDistanceFromLatLonInYd(currentLat, currentLon, previousLat, previousLon);

            myLoc.innerHTML = "Last shot: " + Math.round(yardsFromLastShot) +  " yds (-+" + accuracy + ")";

            previousLat = currentLat;
            previousLon = currentLon;
        }

    }, 1000);
}

// https://www.w3schools.com/html/html5_geolocation.asp
function getLocation() {

    if (navigator.geolocation) {

        var options = {maximumAge:0,enableHighAccuracy: true};

        loc_id = navigator.geolocation.watchPosition(showPosition,errorHandler,options); // loc_id = watchPos

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
    now = (hour) + ":" + minutes + "PM";

    if (hour > 12)
        now = (hour-12) + ":" + minutes + "PM";
    else if (hour != 12) 
        now = hour + ":" + minutes + "AM";

    accuracy = Math.round(position.coords.accuracy); // accuracy is in metres - 1.09ish yd/metre
    currentLat = position.coords.latitude;
    currentLon = position.coords.longitude;
}

// getLocation error handler
function errorHandler(err) {

    switch(err.code)
    {
        case err.TIMEOUT:
            alert("GPS timeout error. Try again in a minute.");
            break;
        case err.POSITION_UNAVAILABLE:
            // This error may be misleading when in airplane mode. GPS still works.
            //alert("Location is not available due to device GPS error, try again later. Please report to info link above.");
            break;
        case err.PERMISSION_DENIED:
            alert("Your browser has location services disabled. Allow location services for your browser in your device settings, then refresh page.");
            break;
        default:
            alert("An unknown error occurred. Please report to info link above.");
    }
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

// see getMinutes
function addZero(i) {

  if (i < 10) {

    i = "0" + i;
  }
  return i;
}

$('#next').click(function(event) {

    $('#holes option:selected').next().attr('selected', 'selected');  
    event.preventDefault();
});