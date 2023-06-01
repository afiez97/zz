window.sessionStorage.clear();
$(function() {
    // $("#no_kad_pengenalan").focus();
    document.getElementById("no_kad_pengenalan").focus();
});

var confirmed = false;

$("#checkusers").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        let no_kad_pengenalan = $("#no_kad_pengenalan_Semak").val();

        var form = new FormData();
        form.append("no_kad_pengenalan",no_kad_pengenalan);
        form.append("masa",new Date());
        form.append("landing_page","admin");
        // console.log(nama_user)
        var settings = {
            "url": host+"usersResetToEmail",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };

        $.ajax(settings).done(function (response) {
            // console.log(response);
            result = JSON.parse(response);
            // console.log(result);
            if (!result.success) {            
                swal({
                    title: "Lupa Katalaluan",
                    text: "No Kad Pengenalan " + no_kad_pengenalan + " tidak berdaftar di dalam sistem.",
                    type: "success",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: true
                }).then(function(){
                    window.location.reload(); 
                });
            } else  {    
                swal({
                    title: "Lupa Katalaluan",
                    text: "",
                    type: "success",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: result.message
                }).then(function(){
                    sessionStorage.no_kad_pengenalan = no_kad_pengenalan;
                    window.location.reload();
                });
            }
        });
    }
});

function saveLogin(action_made, browser_name){
    var form = new FormData();
    form.append("no_kad_pengenalan", window.localStorage.no_kad_pengenalan);
    form.append("action_made", action_made);
    form.append("browser_name", browser_name);
    var settings = {
        "url": host + "addLogs",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        return;
    });    
}

function kembali(){
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.location.replace('../login');
}