
function setup(userSession) {
    
    var options = {
        url: "http://assign6-final.appspot.com/inbox/" + userSession.userID + "/",
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

              
             //   Sample.ListView.itemDataSource = new WinJS.Binding.List(result);
                Sample.ListView.data = new WinJS.Binding.List(result);

          // WinJS.Namespace.define("Sample.ListView", {
            //    data: new WinJS.Binding.List(result)
            //});
            WinJS.UI.processAll();
        });
}




//This will be used to navigate
function handler(event) {
   
    
    var index = document.getElementById('listView1').winControl.currentItem.index;
    var selectedItem = document.getElementById('listView1').winControl.elementFromIndex(index);

    //might want a try catch here
    var inboxID = selectedItem.getElementsByClassName('inboxID')[0].innerText;
    console.log(inboxID);
    
    var newSession = {value1: WinJS.Navigation.state, value2: inboxID}
    console.log(newSession);
    WinJS.Navigation.navigate("/pages/addLetter.html", newSession);

}



(function () {
    "use strict";
    
    var userSession;

    
  //  WinJS.Namespace.define("Sample.ListView", {
    //    data: new WinJS.Binding.List([])
    //});
   


       

            WinJS.UI.Pages.define("/pages/viewInbox.html", {
                // This function is called whenever a user navigates to this page. It
                // populates the page elements with the app's data.
                ready: function (element, options) {
                    var tempList;
                    tempList = WinJS.Utilities.query('#listView1');
                    tempList = tempList[0].winControl;
                    //tempList.oniteminvoked = 

                  //  tempList.addEventListener('click', handler(userSession), false);
                    
             //       element.querySelector('#edit1').addEventListener('click', editHandler, false);
             //       element.querySelector('#delete1').addEventListener('click', deleteHandler, false);
                   
                    userSession = WinJS.Navigation.state;
                    tempList.addEventListener('click', handler, false);
                    console.log(userSession);
                    setup(userSession);
                    
                   


                   // userSession = options;


                  //  WinJS.UI.processAll();



                },

             
                unload: function () {
                    // TODO: Respond to navigations away from this page.
                   
                    document.getElementById("listView1").innerHTML = "";
                    //document.getElementById("listView1").winControl.itemDataSource = null;
                    // NOTE: This event handler is never called.
                }
            });

        

     


})();
