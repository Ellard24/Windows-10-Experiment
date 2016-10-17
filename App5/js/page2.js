
function updateGeolocation() {

    var localSession = WinJS.Navigation.state;

    var formparams = "latitude=" + document.getElementById("passChange").value + "&longitude=" + something; 

    var options = {
        url: "http://assign6-final.appspot.com/location/" + localSession.value1.userID + "/",
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






        });


}






(function () {
    "use strict";
    var userSession;
    
    function changePage1() {
        console.log(userSession);
        WinJS.Navigation.navigate("/pages/viewUser.html", userSession);
        

    }

    function changePage2() {
        console.log(userSession);
        WinJS.Navigation.navigate("/pages/viewInbox.html", userSession);

    }

    function changePage3() {
        console.log(userSession);
        
        WinJS.Navigation.navigate("/pages/addInbox.html", userSession);

    }





    
    WinJS.UI.Pages.define("/pages/page2.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            
            element.querySelector("#p2b1").addEventListener('click', changePage1, false);
            element.querySelector("#p2b2").addEventListener('click', changePage2, false);
            element.querySelector("#p2b3").addEventListener('click', changePage3, false);
           // console.log(options.name);
            userSession = options;
            element.querySelector("#assign1").textContent = "Welcome " + userSession.value1.name;
            // TODO: Initialize the page here.
            // document.getElementById("btnhome").addEventListener('click', btnclick, false);
           // mainScreen();
        }
    });
})();


