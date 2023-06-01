var id_calon_soalan_master, gred_master, no_angka_giliran_master, json_list_master, kod_siri_penilaian_master, tarikh_penilaian_master, tarikh_mula_master, tarikh_tamat_master, masa_mula_master, masa_tamat_master, duration_master, kod_penilaian_master, nama_penilaian_master, currentQ, jenis_pengesahan_master,tamat_penilaian_master;
let json_image = [];
const queryString = window.location.search;

// $(document).on("keydown", disableF);
// $(document).bind("contextmenu", function(e) {
//     return false;
// });

$(function() {
    if (queryString != '')  {
        const urlParams = new URLSearchParams(queryString);
        const temp = urlParams.get('issp');
        var form = new FormData();
        form.append("id_sesi_siri_penilaian", temp);
        var settings = {
            "url": host+"sesi_siri_penilaian/showEncId",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "contentType": false,
            "data": form
        }
        $.ajax(settings).done(function (response) {
            result = response.data;
            if(result.no_kad_pengenalan == 1){
                $("#divForm").append(`<input class="form-control mb-3" placeholder="No. Kad Pengenalan" autofocus maxlength="12" type="text" id="no_kad_pengenalan">`);
            }
            if(result.no_angka_giliran == 1){
                $("#divForm").append(`<input class="form-control mb-3" placeholder="No Angka Giliran" type="password" id="no_angka_giliran">`);
            }
            if(result.nama == 1){
                $("#divForm").append(`<input class="form-control mb-3" placeholder="Nama" type="text" id="nama">`);
            }
            if(result.jawatan == 1){
                $("#divForm").append(`<input class="form-control mb-3" placeholder="Jawatan" type="text" id="jawatan">`);
            }
            if(result.gred == 1){
                $("#divForm").append(`<input class="form-control mb-3" placeholder="Gred" type="text" id="gred">`);
            }
            if(result.emel == 1){
                $("#divForm").append(`<input class="form-control mb-3" placeholder="Emel" type="text" id="emel">`);
            }

            let path = "../../api_penilaian/public/logo/";
            let logo = "default/JATA_NEGARA_MALAYSIA.png";

            if(result.logo !== '' && result.logo !== null) logo = result.logo;

            $('#divLogoUser').append(`<img src="`+path+logo+`" class="brand-img" width="165px">`);

            $('#divPenilaian').html(result.nama_penilaian);
            
            $('#divArahan').html(result.arahan);
            window.sessionStorage.isp = response.data.id_siri_penilaian;

            
        });        
    }    
    // $("#no_kad_pengenalan").focus();
    let token = window.localStorage.token;
    let isp = window.sessionStorage.isp;
    if(token == null || isp == null){
        // document.getElementById("no_kad_pengenalan").focus();
    }
    else{
        let noic = window.localStorage.no_kad_pengenalan;
        // alert(token);
        usersPenilaian(noic,isp,token,function(){
            if(dataUsers.success){
                let data = dataUsers.data;

                
                id_calon_soalan_master = data.id_calon_soalan;
                nama = data.nama;
                noic_master = data.no_kad_pengenalan;
                gred_master = data.gred;
                nama_jawatan_master = data.jawatan;
                emel_master = data.emel;
                no_angka_giliran_master = data.no_angka_giliran;
                json_list_master = data.json_list;
                kod_siri_penilaian_master = data.kod_siri_penilaian;
                tarikh_penilaian_master = data.tarikh_penilaian;
                tarikh_mula_master = data.tarikh_mula;
                tarikh_tamat_master = data.tarikh_tamat;
                masa_mula_master = data.masa_mula;
                masa_tamat_master = data.masa_tamat;
                duration_master = data.duration;
                kod_penilaian_master = data.kod_penilaian;
                nama_penilaian_master = data.nama_penilaian;
                // jenis_pengesahan_master = data.statusrekod;
                tamat_penilaian_master = data.tamat_penilaian;
                if(data.image != null){
                    json_image = JSON.parse(data.image);
                }

                console.log(tamat_penilaian_master);
                $("#text_nama_pengguna").html(nama);
                $("#displaycontent").load("soalan.html");
            }
            else{
                reject_load();
            }
        });
    }
});

var confirmed = false;
$("#login").on('submit', function (e) {
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        let no_kad_pengenalan = $("#no_kad_pengenalan").val();
        let no_angka_giliran = $("#no_angka_giliran").val();
        let nama = $("#nama").val();
        let jawatan = $("#jawatan").val();
        let gred = $("#gred").val();
        let emel = $("#emel").val();
        let isp = window.sessionStorage.isp;
        
        var d = new Date();
        var dateNow = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();

        var form = new FormData();
        form.append("no_kad_pengenalan", no_kad_pengenalan);
        form.append("no_angka_giliran", no_angka_giliran);
        form.append("nama", nama);
        form.append("jawatan", jawatan);
        form.append("gred", gred);
        form.append("emel", emel);
        form.append("isp", isp);
        form.append("dateNow", dateNow);
        var settings = {
            "url": host + "loginPenilaian",
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
            console.log(result);
            if (!result.success) {
                swal({
                    title: "Log Masuk Gagal",
                    text: result.messages,
                    type: "error",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function(){
                    window.localStorage.removeItem('no_kad_pengenalan');
                    window.location.reload();      
                });
            } else  {
                window.localStorage.token = result.token;
                window.localStorage.no_kad_pengenalan = result.data.no_kad_pengenalan;
                let noic = window.localStorage.no_kad_pengenalan;
                let isp = window.sessionStorage.isp;
                let token = window.localStorage.token;
                usersPenilaian(noic,isp,token,function(){
                    if(dataUsers.success){
                        window.location.reload();
                    }
                    else{
                        reject_load();
                    }
                });
            }
        });
    
        request.fail(function(response, textStatus){
            console.log(response);
            result = JSON.parse(response);
            swal(
              {
                  title: "Log Masuk Gagal",
                  text: result.messages,
                  type: "error",
                  showCancelButton: false,
                  allowOutsideClick: false,
              }).then(function(){
                window.location.reload();
              });  
        });
    }
});

// $(window).blur(function() {
//     window.sessionStorage.clear();
//     window.localStorage.clear();
//     window.location.reload();    
// });

function disableF(e) { 
    if ((e.which || e.keyCode) == 116) e.preventDefault(); 
    if ((e.which || e.keyCode) == 123) e.preventDefault(); 
};

$("#register").on('click', function(){
    window.location.replace('../register/');
});

$("#logKeluar").on('click',function () {
    logKeluarExam("Log Keluar");
});

function logKeluarExam(flag){
    swal({
        title: "Jawapan Anda Telah Disimpan. Anda Pasti Untuk "+flag+"?",
        text: result.messages,
        type: "info",
        confirmButtonText: "Ya",
        showCancelButton: true,
        cancelButtonText: "Tidak",
        allowOutsideClick: false,
    }).then(function(){
        if(json_list_soalan.length > 0){
            window.sessionStorage.json_list_soalan = JSON.stringify(json_list_soalan);
        }
        logkeluarPenilaian();
    }); 
}