function refreshInbox() {

    var newSession = WinJS.Navigation.state;
    // newSession = newSession[0];
    console.log(newSession);
    WinJS.Navigation.navigate("/pages/viewInbox.html", newSession);

}

function goBack1() {
    var newSession = WinJS.Navigation.state;
    // newSession = newSession[0];
    console.log(newSession);
    WinJS.Navigation.navigate("/pages/page2.html", newSession);

}

function setup(userSession) {
    

    console.log(userSession);

    


    var options = {
        url: "http://assign6-final.appspot.com/inbox/" + userSession.value1.userID + "/",
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


                 jsonArray.push(singleObj);
            }
            return jsonArray
        }).then(
            function (result){
                
                
                for (var i = 0; i < result.length; i++) {
                    console.log(result[i]);
                    Sample.ListView.data.push(result[i]);

                }
                console.log(Sample.ListView.data);
          
        });
}




//This will be used to navigate
function handler(event) {
   
    
    var index = document.getElementById('listView1').winControl.currentItem.index;
    var selectedItem = document.getElementById('listView1').winControl.elementFromIndex(index);

    //might want a try catch here
    var inboxID = selectedItem.getElementsByClassName('inboxID')[0].innerText;
    console.log(inboxID);
    
    var newSession = WinJS.Navigation.state;
    newSession.value2 = inboxID;
    console.log(newSession);
    WinJS.Navigation.navigate("/pages/addLetter.html", newSession);

}



(function () {
    "use strict";
    
    var userSession;


    WinJS.Namespace.define("Sample.ListView", {
        data: new WinJS.Binding.List([])
    });
   


       

            WinJS.UI.Pages.define("/pages/viewInbox.html", {
                // This function is called whenever a user navigates to this page. It
                // populates the page elements with the app's data.
                ready: function (element, options) {
                    var tempList;
                    userSession = WinJS.Navigation.state;

                    setup(userSession);
                   
                    tempList = WinJS.Utilities.query('#listView1');
                    
                    tempList = tempList[0].winControl;
                    
                    element.querySelector('#goBack1').addEventListener('click', goBack1, false);
                    element.querySelector('#refreshInbox1').addEventListener('click', refreshInbox, false);
            
                    tempList.addEventListener('click', handler, false);
                



                },

             
                unload: function () {
                    // TODO: Respond to navigations away from this page.
                   
                    //This needs to be done otherwise Data becomes duplicated upon reentry
                    Sample.ListView.data = new WinJS.Binding.List([]);


                    // NOTE: This event handler is never called.
                }
            });

        

     


})();
