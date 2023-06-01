window.sessionStorage.clear();
$(function() {
    // $("#no_kad_pengenalan").focus();
    document.getElementById("no_kad_pengenalan").focus();
});

var confirmed = false;
$("#login").on('submit', function (e) {
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        let no_kad_pengenalan = $("#no_kad_pengenalan").val();
        let katalaluan = $("#katalaluan").val();
        
        var form = new FormData();
        form.append("no_kad_pengenalan", no_kad_pengenalan);
        form.append("katalaluan", katalaluan);
        var settings = {
            "url": host + "login",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };

        var request = $.ajax(settings);
    
        request.done(function (response) {
            result = JSON.parse(response);
            if (!result.success) {
                swal({
                    title: "Log Masuk Gagal",
                    text: "Kombinasi No. Kad Pengenalan & Katalaluan tidak tepat.",
                    type: "error",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function(){
                    window.location.reload();      
                });
            } else  {
                window.localStorage.token = result.token;
                window.localStorage.no_kad_pengenalan = result.data.no_kad_pengenalan;
                checkLoginAdmin(form, function(){
                    if(objCheck.success){
                        $("#FK_capaian").html('');
                        let dataCheck = objCheck.data;
                        sessionStorage.browser = getBrowser();
                        console.log(objCheck.data);
                        saveLogin("Login As " + objCheck.data[0].nama_peranan, sessionStorage.browser);
                        var FK_capaian = objCheck.data[0].id_peranan;
                        sessionStorage.capaian = capaian[(parseInt(FK_capaian) - 1)];
                        window.location.replace('../'+objCheck.data[0].FK_submodul+'/');
                    }
                });
            }
        });
    
        request.fail(function(response, textStatus){
            swal(
              {
                  title: "Log Masuk Gagal",
                  text: "Kombinasi No. Kad Pengenalan & Katalaluan tidak tepat.",
                  type: "error",
                  showCancelButton: false,
                  allowOutsideClick: false,
              }).then(function(){
                window.location.reload();
              });  
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

$("#lupakatalaluan").on('click',function () {
    window.location.replace('../reset/');
});