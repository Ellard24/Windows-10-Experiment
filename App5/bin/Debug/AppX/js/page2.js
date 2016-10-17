function mainScreen() {
    var array = [
  { type: "item", title: "View User Info", picture: "http://charactersheets.minotaur.cc/images/party.png", page: "viewUsers.html"},
  { type: "item", title: "View Inboxes", picture: "https://s-media-cache-ak0.pinimg.com/736x/58/a6/a9/58a6a980f2d5baa6c8e0ea3bf519736b.jpg", page: "viewInbox.html"},
  { type: "item", title: "Add Inbox", picture: "https://rotgrub.files.wordpress.com/2013/04/pathfinder-iconics.jpg", page: "addInbox.html"},
  { type: "item", title: "View Files", picture: "http://www.iconsdb.com/icons/preview/black/text-file-xxl.png", page: "viewFiles.html"}
    ];
    var bindingList = new WinJS.Binding.List(array);

    WinJS.Namespace.define("DefaultData", {
        bindingList: bindingList,
        array: array
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
            console.log(options.name);
            userSession = options;
            element.querySelector("#assign1").textContent = "Welcome " + options.name;
            // TODO: Initialize the page here.
            // document.getElementById("btnhome").addEventListener('click', btnclick, false);
           // mainScreen();
        }
    });
})();


