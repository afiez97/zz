$(function () {
    $.ajaxSetup({
        cache: false
    });

    let token = window.localStorage.token;
    if((token == null) || (sessionStorage.capaian == null)){
        window.location.replace('login/');
    }
    else{
        let noic = window.localStorage.no_kad_pengenalan;
        users(noic,token,function(){
            if(dataUsers.success){
                let data = dataUsers.data;
                // window.localStorage.token = dataUsers.token;
                nama = data.nama;
                id_users = data.id_users;
                nama_agensi = data.nama_agensi;
                nama_kluster = data.nama_kluster;
                FK_agensi = data.FK_agensi;
                FK_kluster = data.FK_kluster;
                updated_at = data.updated_at;

                $("#text_nama_pengguna").html(nama + '  <span class="caret"></span>');
                $("#text_nama_peranan").html(sessionStorage.nama_peranan);
                $("#text_nama_agensi").html(nama_agensi);
                $("#input_id_users").val(id_users);
                $("#input_agensi").val(FK_agensi);
                $("#input_nama_agensi").val(nama_agensi);
                $("#input_kluster").val(FK_kluster);
                $("#input_nama_kluster").val(nama_kluster);
            }
            else{
                reject_load();
            }
        });
    }
});

// $(document).ready(function () {
    
// });

$("#super_admin_login").click(function(){
    let token = window.localStorage.token;
    checkCapaian(capaian[0],token,function(){
        if(dataCapaian.success){
            sessionStorage.capaian = "c4ca4238a0b923820dcc509a6f75849b";
            window.location.replace('super/');
        }
        else{
            swal({
                title: "Ralat",
                text: "Anda Tidak Mempunyai Capaian Sebagai Super Admin",
                type: "error",
                confirmButtonText: "OK",
                closeOnConfirm: true,
                allowOutsideClick: false,
                html: false
            });
        }
    });
});

$("#pegawai_tadbir_latihan_login").click(function(){
    let token = window.localStorage.token;
    checkCapaian(capaian[1],token,function(){
        console.log(dataCapaian);
        if(dataCapaian.success){
            sessionStorage.capaian = "c81e728d9d4c2f636f067f89cc14862c";
            window.location.replace('ptl/');
        }
        else{
            swal({
                title: "Ralat",
                text: "Anda Tidak Mempunyai Capaian Sebagai Pegawai Tadbir Latihan",
                type: "error",
                confirmButtonText: "OK",
                closeOnConfirm: true,
                allowOutsideClick: false,
                html: false
            });
        }
    });
});

$("#penyelaras_penilaian_login").click(function(){
    let token = window.localStorage.token;
    checkCapaian(capaian[2],token,function(){
        if(dataCapaian.success){
            sessionStorage.capaian = "eccbc87e4b5ce2fe28308fd9f2a7baf3";
            window.location.replace('ppp/');
        }
        else{
            swal({
                title: "Ralat",
                text: "Anda Tidak Mempunyai Capaian Sebagai Pegawai Penyelaras Penilaian",
                type: "error",
                confirmButtonText: "OK",
                closeOnConfirm: true,
                allowOutsideClick: false,
                html: false
            });
        }
    });
});

$("#urusetia_login").click(function(){
    sessionStorage.capaian = 'a87ff679a2f3e71d9181a67b7542122c';
    window.location.replace('us/');
});