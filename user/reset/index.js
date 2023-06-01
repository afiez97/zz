const queryString = window.location.search;
if (queryString != '')  {
    $("#divIC").addClass('d-none');
    $("#divReset").removeClass('d-none');
    const urlParams = new URLSearchParams(queryString);
    const temp = urlParams.get('temp');
    var settings = {
        "url": host+"usersResetKatalaluan/" + temp,
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        $("#no_kad_pengenalan_final").val(response.data.no_kad_pengenalan);
        if (typeof response.data.no_kad_pengenalan !== 'undefined')  {
            $("#checkic").addClass("hidden");
            $("#backtologin").addClass("hidden");
            $("#checkic3").removeClass("hidden");
        } else  {
            swal({
                title: "Lupa Katalaluan",
                text: "",
                type: "error",
                closeOnConfirm: true,
                allowOutsideClick: false,
                html: "Pautan ini telah luput."
            }).then(function(){
                window.location.replace('../login');
            });
        }
    });
    // console.log(temp);
    
}

$('.toggle-password').click(function(){
    $(this).children().toggleClass('fa-eye fa-eye-slash');
    let input = $(this).prev();
    input.attr('type', input.attr('type') === 'password' ? 'text' : 'password');
});

function submit(){
    if($("#no_kad_pengenalan_Semak").val() != ""){
        $("#checkusers").submit();
    }
}

function submitReset(){
    if(($("#no_kad_pengenalan_final").val() != "") && ($("#katalaluan").val() != "") && ($("#ckatalaluan").val() != "")){
        $("#checkusers3").submit();
    }
}

var confirmed = false;

$("#ckatalaluan").on('change', function(){
    if($("#ckatalaluan").val() != $("#katalaluan").val()){
        swal({
            title: "Katalaluan Tidak Sama",
            // text: "Berjaya Kemaskini Profile!",
            type: "error",
            showConfirmButton: false,
            allowOutsideClick: false,
            html: false,
            timer: 1000
        }).then(function(){},
            function (dismiss) {
              if (dismiss === 'timer') {
                $("#ckatalaluan").val('');
                $("#katalaluan").focus();
              }
            }
        );        
    }
});

$("#checkusers").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        let no_kad_pengenalan = $("#no_kad_pengenalan_Semak").val();

        var form = new FormData();
        form.append("no_kad_pengenalan",no_kad_pengenalan);
        form.append("masa",new Date());
        form.append("landing_page","user");
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

$("#checkusers3").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        $('#hantar').prop('disabled',true);
        $("#icon_hantar").prop('class','fa fa-cog fa-spin');
        let no_kad_pengenalan = $("#no_kad_pengenalan_final").val();
        let katalaluan = $("#katalaluan").val();

        var form = new FormData();
        form.append("no_kad_pengenalan",no_kad_pengenalan);
        form.append("katalaluan",katalaluan);

        // console.log(nama_user)
        var settings = {
            "url": host+"usersReset",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": window.sessionStorage.token
            },
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };
        console.log(settings);

        $.ajax(settings).done(function (response) {
            // console.log(response);
            result = JSON.parse(response);
            // console.log(result);
            if (!result.success) {            
                swal({
                    title: "Lupa Katalaluan",
                    text: "Gagal.",
                    type: "error",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function(){
                    sessionStorage.token = result.token;
                    window.location.reload();
                });
            } else  {    
                swal({
                    title: "Lupa Katalaluan",
                    text: "Katalaluan telah disetsemula. Sila log masuk menggunakan katalaluan baharu.",
                    type: "success",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function(){
                    window.sessionStorage.removeItem("no_kad_pengenalan");
                    window.sessionStorage.removeItem("emel");
                    const urlParams = new URLSearchParams(queryString);
                    const capaian = urlParams.get('capaian');
                    if(capaian != 'admin'){
                        // SERVER
                        window.location.replace('http://10.1.3.38/user/login');
                        
                        // LOCALHOST
                        // window.location.reload();
                    } else {
                        // SERVER
                        window.location.replace('http://10.1.3.38/admin/login');
                        
                        // LOCALHOST
                        // window.location.replace('../admin/login');
                    }
                });
            }
        });
    }
});

function kembali(){
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.location.replace('../login');
}