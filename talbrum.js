// This lets us know that content script on Talbrum is runnings
//console.log("TalbrumJS running");

// This sends a message to the background
// In response we get the data to be filled in Talbrum CV upload.
chrome.runtime.sendMessage({"message" : "talbrum"},function(response){
    if(response != null){
        document.getElementById("cv_name").value                        =    response.name;
        document.getElementById("cv_email").value                       =    response.email;
        document.getElementById("cv_present_organisation").value        =    response.c0org;
        document.getElementById("cv_institution").value                 =    response.institution;
        document.getElementById("cv_total_experience_year").value       =    response.experience.year;
        document.getElementById("cv_total_experience_month").value      =    response.experience.month;
        if(response.gender == true){
            document.getElementById("candidate_gender").value = "Male";
        }else{
            document.getElementById('candidate_gender').value = "Female";
        }
        var degree = document.getElementById("cv_qualification_id");
        for(var i=0;i<degree.length;i++){
            //console.log(degree.length);
            //console.log("Value of i",i);
            if(response.highestDegree.includes(degree[i].innerHTML)){
                //console.log("Value Set");
                degree.value = i+1;
                break;
            }
        }
        document.getElementById('cv_mode_of_acquisition_external').checked = true;
    }
});
