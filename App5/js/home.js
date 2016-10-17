/**************************************************************



Controls the login/register form
*************************************************************/
function showRegister() {

    document.getElementById("form1").style.display = "none";
    document.getElementById("form2").style.display = "block";
    

}

function showLogin() {

    document.getElementById("form2").style.display = "none";
    document.getElementById("form1").style.display = "block";


}




/**********************************************************
Query the datastore to see if the name and password match up

-Return error on failure or head to next page on success 
**********************************************************/
function nameCheck() {

    if (document.getElementById("name").value == "") {
        alert("Please enter a valid name");
        //document.getElementById("p1").innerText = "Please enter a valid name";
        return;
    }


    if (document.getElementById("password").value == "") {
        alert("Please enter a password");
        //document.getElementById("p1").innerText = "Please enter a valid hero class number";
        return;
    }




    var options = {
        url: "http://assign6-final.appspot.com/users/",    //this will need to be changed
        type: "GET",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        headers: { "If-Modified-Since": "Mon, 27 Mar 1972 00:00:00 GMT" }
    }


    //We are going to take the data we receive from the GET and show it in some form 
    WinJS.xhr(options).done(
        function success(req) {
            
            console.log(req);
            var result = JSON.parse(req.response)
            var userSession = { value1: null, value2: null };
            var check = false;
            var userName = document.getElementById("name").value;
            var password = document.getElementById("password").value;
            var lastLocation;
            
            //First Check to see if userName exists
            for (var i = 0; i < result.length; i++) {

                if (userName == result[i]["name"]){
                    if (password == result[i]["password"]){
                        
                        check = true;
                        userSession.value1 = result[i];
                        userSession.value2 = null;
                        lastLocation = "Last Login at Latitude: " + result[i]["latitude"] + " Longitude: " + result[i]["longitude"];
                        
                        if (lastLocation.includes("undefined") == true)
                            lastLocation = "No previous login location recorded";
                        
                    }     
                    else {
                        alert("Incorrect Password");
                        document.getElementById("p1").textContent = "Incorrect Password";
                        return;
                    }
                }
            }

            if (check == false) {
                alert("User doesn't exist");
                document.getElementById("p1").textContent = "User doesnt exist";
                return
            }
            

            
            alert(lastLocation);

            updateGeolocation(userSession);
          //  WinJS.Navigation.navigate("/pages/page2.html", userSession);
            
            
        },

        function error(req) {
            console.log("error");

        });

    
    



}

function updateGeolocation(userSession) {


    var formparams = "latitude=" + document.getElementById('coordinatesLatitude').innerText + "&longitude=" + document.getElementById('coordinatesLongitude').innerText;

    var options = {
        url: "http://assign6-final.appspot.com/location/" + userSession.value1.userID + "/",
        type: "PUT",
        data: formparams,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }

    console.log(options);

    //Trying a then chain
    WinJS.xhr(options).done(
        function success(req) {



            var result = req.responseText;

            console.log(result);




            WinJS.Navigation.navigate("/pages/page2.html", userSession);

        });


}



//Creates user
function createUser() {

    if (document.getElementById("regName").value == "") {
        alert("Please enter a valid name");
        //document.getElementById("p1").innerText = "Please enter a valid name";
        return;
    }


    if (document.getElementById("regPass").value == "") {
        alert("Please enter a password");
        //document.getElementById("p1").innerText = "Please enter a valid hero class number";
        return;
    }
    


    var formparams = "name=" + document.getElementById("regName").value + "&password=" + document.getElementById("regPass").value;
    console.log(formparams);
    var options = {
        url: "http://assign6-final.appspot.com/users/",    //this will need to be changed
        type: "POST",
        data: formparams,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }


    //We are going to take the data we receive from the GET and show it in some form 
    WinJS.xhr(options).done(
        function success(req) {
            

            var result = req.responseText;

            document.getElementById("p1").innerText = result;


            if (String(result).includes("exists") == true) {
                alert("User already exists. Please pick a new name");
                document.getElementById("p1").innerText = "User already exists. Please pick a new name";
            }
            else{
                document.getElementById("p1").innerText = "User Registered";
            }
        },
        function error(err) {
            console.log(err);
        });



}

function alert(message) {
    var msgBox = new Windows.UI.Popups.MessageDialog(message);
    msgBox.showAsync();
}


function btnclick() {
    WinJS.Navigation.navigate('/pages/page2.html', { value1: "it passed" });
}


(function () {
    "use strict";



    //set up GeoLocation
    var coordFieldLatitude;
    var coordFieldLongitude;



    //set up navigation 
    

    WinJS.UI.Pages.define("/pages/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            

            coordFieldLatitude = document.getElementById('coordinatesLatitude');
            coordFieldLongitude = document.getElementById('coordinatesLongitude');
         //   addrField = document.getElementById('address');

            //Set up the buttons 
            document.getElementById("b1").addEventListener('click', showLogin, false);
            document.getElementById("b2").addEventListener('click', showRegister, false);
            document.getElementById("submittion").addEventListener('click', nameCheck, false);
            document.getElementById("regSubmit").addEventListener('click', createUser, false);
            // TODO: Initialize the page here.

            var locator = new Windows.Devices.Geolocation.Geolocator();
            locator.getGeopositionAsync().done(getCoordinates, err)

            

        },
        unload: function () {
            // TODO: Respond to navigations away from this page.

            // NOTE: This event handler is never called.
        }
    });

    function getCoordinates(position) {
        var lat = position.coordinate.latitude;
        var long = position.coordinate.longitude;

        document.getElementById("")
      //  var city = position.civicAddress.City;
      //  var state = position.civicAddress.State;

        coordFieldLatitude.innerText =  lat;
        coordFieldLongitude.innerText =  long;

     //   if (city)
     //       addrField.innerText = 'This is in: ' + city + ', ' + state;
    }
    
    function err(e) {
        console.log(e.message);
    }

})();