

(function () {
    "use strict";
    var userSession = 0;


    function changePage() {

       
        WinJS.Navigation.navigate("/pages/page2.html", userSession);
    }

    function createInbox() {

        if (document.getElementById("name").value == "") {
            alert("Please enter a valid name");
           
            return;
        }





        var formparams = "name=" + document.getElementById("name").value + "&user=" + userSession.value1.userID;
        console.log(formparams);
        var options = {
            url: "http://assign6-final.appspot.com/inbox/",    
            type: "POST",
            data: formparams,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }


    
        WinJS.xhr(options).done(
            function success(req) {


                var result = req.responseText;

                document.getElementById("p1").innerText = result;


                if (String(result).includes("exists") == true) {
                    alert("Inbox already exists. Please pick a new name");
                    document.getElementById("p1").innerText = "Inbox already exists. Please pick a new name";
                }
                else {
                    document.getElementById("p1").innerText = "Inbox created";
                }
            });



    }















    WinJS.UI.Pages.define("/pages/addInbox.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
           
            element.querySelector('#testB').addEventListener('click', changePage, false);
            element.querySelector('#submission').addEventListener('click', createInbox, false);
           // document.getElementById("testB").addEventListener('click', changePage, false);
           // document.getElementById("submission").addEventListener('click', createInbox, false);
            console.log(options.name);
            userSession = options;
            
            element.querySelector('#p1').innerText = userSession.value1.name;
            
            // TODO: Initialize the page here.
            // document.getElementById("btnhome").addEventListener('click', btnclick, false);
            // mainScreen();
        },
        unload: function () {
            // TODO: Respond to navigations away from this page.

            // NOTE: This event handler is never called.
    }
    });
})();