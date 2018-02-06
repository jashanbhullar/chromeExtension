// Global variable for getting data from content script
var data;
var downloadId;


// This checks whether we have recieved the data or not
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //console.log("Request incoming",request,"Sender is",sender);
    if(request.message == "talbrum"){
        console.log(localStorage.getItem("userData"));
        try{
            var talbrum = JSON.parse(localStorage.getItem("userData"));
            talbrum.resume = localStorage.getItem("resume");
            sendResponse(talbrum);
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
        // '?TalbrumExtension' enusres that the script doesn't run everytime the user opens the page
        try{
            chrome.downloads.download({
                url : data.cv_uri
            },function(id){
                console.log('Download has begun',id);
                //chrome.downloads.drag(downloadId);
                downloadId = id;
                // chrome.downloads.search({
                //     "id" : downloadId
                // },function(Items){
                //     console.log(Items);
                //     var fileUrl = 'file://'+Items[0].filename;
                //
                //     console.log(fileUrl);
                //
                // });
            });
        }catch(err){
            console.log("some error occured while downloading");
        }
    }
});

chrome.downloads.onChanged.addListener(function(downloadItem){
    console.log("Event fired");
    console.log(downloadItem);
    if(downloadItem.id == downloadId && downloadItem.state.current == 'complete'){
        chrome.downloads.search({
            "id" : downloadId
        },function(Items){
            console.log(Items);
            var fileUrl = 'file://'+Items[0].filename;
            $.ajax({
                type:'GET',
                url: fileUrl
            }).done(function(data){
                localStorage.setItem("resume",data);
                var win = window.open('http://merahunar.talbrum.com/recruitment/cv/upload_cv?TalbrumExtension');
            });
        });
    }
});
