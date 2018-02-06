// This data will be stored in the localstorage later to be uploaded in talbrum platform
// This automates the whole process of everything.

// Check if the incoming object is empty or not
checkObj = function(obj){
    return (obj != null ? obj[1] : '0' );
};

// Extract total expierence from the incoming string
getExperience = function(data){
        var year = /([0-9]+)yr/g;
        var month = /([0-9]+)m/g;
        var response = {
            "year" : checkObj(year.exec(data)),
            "month" : checkObj(month.exec(data))
        };
        //console.log(data);
        return response;
};

// Regex for getting highest qualification
getDegree = function(data) {
    var degree = /Highest\sDegree(.*)Notice\sPeriod/g;
    return checkObj(degree.exec(data));
};


// Handles errors in case the data is not there
extractData = function(className){
    try{
        return document.getElementsByClassName(className)[0].innerText;
    }catch(err){
        return "";
    }
};

getInstitution = function(){
    try{
        return document.getElementsByClassName('org ppgIns bkt4')[0].innerText;
    }catch(err){
        try{
                return document.getElementsByClassName('org pgIns bkt4')[0].innerText;
        }catch(err){
            try{
                    return document.getElementsByClassName('org pgIns bkt4')[0].innerText;
            }catch(err){
                return "";
            }
        }
    }
};

getCvUri = function(){
    try{
        return document.getElementsByClassName('right')[0].href;
    }catch(err){
        return document.getElementsByClassName("addTo view-cv dwld-prof")[0].childNodes[1].href;
    }
};

// All the data will be stored in this variable
getData = function(){

    var data = {
        "name"              : extractData('bkt4 name userName'),
        "email"             : extractData('email'),
        // True means male
        "gender"            : document.getElementsByClassName('personal-detail-container')[0].outerText.includes('Male'),
        "c0org"             : extractData('cOrg bkt4'),
        "institution"       : getInstitution(),
        "experience"        : getExperience(document.getElementsByClassName('exp-sal-loc-box')[0].innerText),
        "highestDegree"     : getDegree(document.getElementsByClassName('innerDetailsCont clFx')[0].innerText),
        "cv_uri"            : getCvUri()
    };
    console.log(data);
    return data;
};
chrome.runtime.sendMessage(getData(),function(response){
    console.log(response.status);
});
