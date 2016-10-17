function changeBack() {


    var newSession = WinJS.Navigation.state;
    newSession = newSession[0];
    console.log(newSession);
    WinJS.Navigation.navigate("/pages/viewInbox.html", newSession);
}

function createLetter() {

    if (document.getElementById("title").value == "") {
        alert("Please enter a valid title");

        return;
    }


    if (document.getElementById("content").value == "") {
        alert("Please have some content in letter");

        return;
    }


    var formparams = "title=" + document.getElementById("title").value + "&content=" + document.getElementById("content").value + "&inbox=" + userSession.userID;
    console.log(formparams);
    var options = {
        url: "http://assign6-final.appspot.com/letter/",
        type: "POST",
        data: formparams,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }



    WinJS.xhr(options).done(
        function success(req) {


            var result = req.responseText;

            document.getElementById("letterP1").innerText = result;


            if (String(result).includes("exists") == true) {
                alert("Inbox already exists. Please pick a new name");
                document.getElementById("p1").innerText = "Inbox already exists. Please pick a new name";
            }
            else {
                document.getElementById("letterP1").innerText = result;
            }
        });



}


function letterSetup(userSession) {

    //Pass the ID of the inbox to the API 
    var options = {
        url: "http://assign6-final.appspot.com/letter/" + userSession.inboxID + "/",
        type: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        headers: { "If-Modified-Since": "Mon, 27 Mar 1972 00:00:00 GMT" }
    }

    console.log(options);

    //Trying a then chain
    WinJS.xhr(options).then(
        function (req) {


            var jsonArray = [];
            var result = JSON.parse(req.response);



            for (var i = 0; i < result.length; i++) {
                var singleObj = {};
                singleObj.name = result[i]["name"];
                singleObj.inboxID = result[i]["inboxID"];
                singleObj.content = result[i]["content"];


                jsonArray.push(singleObj);
            }
            return jsonArray
        }).then(
            function (result) {


                //   Sample.ListView.itemDataSource = new WinJS.Binding.List(result);
                Letter.ListView.data = new WinJS.Binding.List(result);

                // WinJS.Namespace.define("Sample.ListView", {
                //    data: new WinJS.Binding.List(result)
                //});
                WinJS.UI.processAll();
            });
}



(function () {
    "use strict";
    var userSession;

    WinJS.UI.Pages.define("/pages/addInbox.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            userSession = options;
            letterSetup(userSession);

            element.querySelector('#back1').addEventListener('click', changeBack, false);
            element.querySelector('#submission2').addEventListener('click', createLetter, false);
            // document.getElementById("testB").addEventListener('click', changePage, false);
            // document.getElementById("submission").addEventListener('click', createInbox, false);
            console.log(options.name);
            userSession = options;

            element.querySelector('#p1').innerText = userSession.name;

          
        },
        unload: function () {
            // TODO: Respond to navigations away from this page.

            // NOTE: This event handler is never called.
        }
    });
})();