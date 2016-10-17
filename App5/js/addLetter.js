function changeBack() {


    var newSession = WinJS.Navigation.state;
   // newSession = newSession[0];
    console.log(newSession);
    WinJS.Navigation.navigate("/pages/viewInbox.html", newSession);
}


function refreshPage() {

    var newSession = WinJS.Navigation.state;
    // newSession = newSession[0];
    console.log(newSession);
    WinJS.Navigation.navigate("/pages/addLetter.html", newSession);
}

function deleteLetter() {

    var index = document.getElementById('listView2').winControl.currentItem.index;
    var selectedItem = document.getElementById('listView2').winControl.elementFromIndex(index);

    //might want a try catch here
    var letterID = selectedItem.getElementsByClassName('letterID')[0].innerText;
    console.log(letterID);

  
    var options = {
        url: "http://assign6-final.appspot.com/deleteLetter/" + letterID + "/",
        type: "DELETE",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }



    WinJS.xhr(options).done(
        function success(req) {


            var result = req.responseText;

            document.getElementById("letterP1").innerText = result;


          
        });


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

    var localUser = WinJS.Navigation.state;


    var formparams = "title=" + document.getElementById("title").value + "&content=" + document.getElementById("content").value + "&inbox=" + localUser.value2;
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

    //Pass the ID of the inbox to the API . Value 2 is the inboxID
    var options = {
        url: "http://assign6-final.appspot.com/letter/" + userSession.value2 + "/",
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
                singleObj.title = result[i]["title"];
                singleObj.letterID = result[i]["letterID"];
                singleObj.content = result[i]["content"];


                jsonArray.push(singleObj);
            }
            return jsonArray
        }).then(
            function (result) {

                for (var i = 0; i < result.length; i++) {
                    console.log(result[i]);
                    Letter.ListView.data.push(result[i]);

                }
                
                

                
            });
}



(function () {
    "use strict";
    var userSession;


    WinJS.Namespace.define("Letter.ListView", {
        data: new WinJS.Binding.List([])
    });

    WinJS.UI.Pages.define("/pages/addLetter.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            var letterList;

            userSession = options;
            letterSetup(userSession);

            element.querySelector('#refresh1').addEventListener('click', refreshPage, false);
            element.querySelector('#back1').addEventListener('click', changeBack, false);
            element.querySelector('#submission2').addEventListener('click', createLetter, false);
         
            
            letterList = WinJS.Utilities.query('#listView2');

            letterList = letterList[0].winControl;

          
            letterList.addEventListener('click', deleteLetter, false);

            

          
        },
        unload: function () {
            // TODO: Respond to navigations away from this page.
            Letter.ListView.data = new WinJS.Binding.List([]);
            // NOTE: This event handler is never called.
        }
    });
})();