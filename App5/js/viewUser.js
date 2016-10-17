function userChangePage() {

    var newSession = WinJS.Navigation.state;
    // newSession = newSession[0];
    console.log(newSession);
    WinJS.Navigation.navigate("/pages/page2.html", newSession);


}

function showPassForm() {

    document.getElementById("userForm1").style.display = "block";


}

function updatePassword() {

    var localSession = WinJS.Navigation.state;


    if (document.getElementById("passChange").value == "") {
        alert("Please enter a valid password");

        return;
    }

    var formparams = "password=" + document.getElementById("passChange").value;

    var options = {
        url: "http://assign6-final.appspot.com/users/" + localSession.value1.userID + "/",
        type: "PUT",
        data: formparams,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }

    console.log(options);

    //Trying a then chain
    WinJS.xhr(options).done(
        function success(req) {



            var result = req.responseText;

            document.getElementById("vuP1").innerText = result;


          



        });
}


function Usersetup(userSession) {


    console.log(userSession);



    //Get User information from API
    var options = {
        url: "http://assign6-final.appspot.com/users/" + userSession.value1.userID + "/",
        type: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        headers: { "If-Modified-Since": "Mon, 27 Mar 1972 00:00:00 GMT" }
    }

    console.log(options);

    //Trying a then chain
    WinJS.xhr(options).done(
        function success(req) {


            
            var result = JSON.parse(req.response);




            //Pass data values over
            document.getElementById("vuName").innerText = "Name: " + result["name"];
            document.getElementById("vuPassword").innerText = "Password: " + result["password"];
            document.getElementById("vuID").innerText = "UserID: " + result["userID"];
            document.getElementById("vuLatitude").innerText = "Last recorded Latitude: " + result["latitude"];
            document.getElementById("vuLongitude").innerText = "Last recorded Longitude: " + result["longitude"];





        });
}


(function () {
    "use strict";



    //set up GeoLocation
    var coordField;
    var addrField;

    var userSession;

    //set up navigation 


    WinJS.UI.Pages.define("/pages/viewUser.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            userSession = options;
            Usersetup(userSession)
            element.querySelector('#updatePassword').addEventListener('click', showPassForm, false);
            element.querySelector('#userGoBack').addEventListener('click', userChangePage, false);
            element.querySelector('#passSubmit').addEventListener('click', updatePassword, false);



        },
        unload: function () {
            // TODO: Respond to navigations away from this page.
            document.getElementById("userForm1").style.display = "none";
            // NOTE: This event handler is never called.
        }
    });

   

})();