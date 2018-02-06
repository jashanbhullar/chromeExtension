// Global variable for getting data from content script
var data;


// This checks whether we have recieved the data or not
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //console.log("Request incoming",request,"Sender is",sender);
    if(request.message == "talbrum"){
        console.log(localStorage.getItem("userData"));
        try{
            sendResponse(JSON.parse(localStorage.getItem("userData")));
        }catch(err){
            alert("Some unknown error occured in the extension,please report this at info@merahunar.com");
        }
    }
    else if (request != null){
        data = request;
        sendResponse({status: "Data successfully stored in localStorage"});
    }else{
        alert("Some unknown error occured in the extension,please report this at info@merahunar.com");
    }
});


// Stores the data in localStorage in string format
// Can't store files in localStorage only key value pairs
chrome.commands.onCommand.addListener(function(command){
    if(command == "save"){
        localStorage.setItem("userData",JSON.stringify(data));
        //console.log('Data in localstorage   ',JSON.parse(localStorage.getItem("userData")));
        /*
        console.log(data.cv_uri);
        var link = document.createElement('a');
        link.href = data.cv_uri;
        link.download = 'file.pdf';
        link.dispatchEvent(new MouseEvent('click'));
        */
        // '?TalbrumExtension enusres that the script doesn't run everytime the user opens the page
        var win = window.open('http://merahunar.talbrum.com/recruitment/cv/upload_cv?TalbrumExtension');
        try{
            chrome.downloads.download({
                url : data.cv_uri
                //"filename" : "file.pdf"
            },function(downloadId){
                console.log('successfully downloaded',downloadId);
                //chrome.downloads.drag(downloadId);
            });
        }catch(err){
            console.log("some error occured while downloading");
        }
    }
});
