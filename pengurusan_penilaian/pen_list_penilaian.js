$(function () {
    $.ajaxSetup({
        cache: false
    });
    checkSession();
    let token = window.localStorage.token;
    if(sessionStorage.capaian == capaian[2])    {
        $("#buttonDaftarPenilaian").removeClass('hidden').attr('onclick',"daftar('penilaian');");
    }
    $("#leftsidebar").load('../aside/aside_pen_list_penilaian.html');
    $("#btnKembali").attr('onclick','kembali2()');
    saveLog("View Page: Senarai Penilaian", sessionStorage.browser);
    load_kluster(token,function(){
        if(objKluster.success){
            let dataKluster = objKluster.data;
            $("#FK_kluster").val(dataKluster.id_kluster);
            $("#nama_kluster").val(dataKluster.nama_kluster);
        }
    });

    load_kategori_penilaian(token,function(){
        if(objKategori.success){
            $("#FK_kategori_penilaian").html('<option value="">Pilih Kategori Penilaian</option>');
            let dataKategori = objKategori.data;
            $.each(dataKategori,function(i,field){
                $("#FK_kategori_penilaian").append('<option value="'+field.id_kategori_penilaian+'">'+field.nama_kategori_penilaian+'</option>');
            });
        }
    });

    tablePenilaian(token);
    // users(noic_master,token,function(){
    //     if(dataUsers.success){
    //     }
    //     else{
    //         reject_load();
    //     }
    // });
});

function daftar(content) {
    var listSettings = ["penilaian"];
    $.each(listSettings, function (i, item) {
        switch (item) {
            case content: $('#modaldaftar' + item).modal('show'); break;
        }
    });
}

$("#dftr_users").click(function () {
    $("#check_noic").modal('show');
});

var confirmed = false;

// FUNCTION REGISTER

$("#register").on('submit', function (e) {
    let token = localStorage.token;
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Daftar Penilaian",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {
            let kod_penilaian = $("#kod_penilaian").val();
            let nama_penilaian = $("#nama_penilaian").val();
            let FK_kategori_penilaian = $("#FK_kategori_penilaian").val();
            let FK_penyelaras = id_users_master;
            let FK_kluster = $("#FK_kluster").val();
            let logo = $('#logo')[0].files[0];

            var form = new FormData();
            // formData.append("key","mSideDiary");
            form.append("kod_penilaian", kod_penilaian);
            form.append("nama_penilaian", nama_penilaian);
            form.append("FK_kategori_penilaian", FK_kategori_penilaian);
            form.append("FK_penyelaras", FK_penyelaras);
            form.append("FK_kluster", FK_kluster);
            form.append("created_by", id_users_master);
            form.append("updated_by", id_users_master);
            form.append("logo", logo);

            var settings = {
                "url": host + "penilaian/add",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Authorization": window.localStorage.token
                },
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": form
            };

            $.ajax(settings).done(function (response) {
                result = JSON.parse(response);
                if (result.success) {
                    swal({
                        title: "Daftar Penilaian",
                        text: "Berjaya!",
                        type: "success",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        resetForm();
                        $("#modaldaftarpenilaian").modal('hide');
                        // localStorage.token = result.token;
                        token = localStorage.token;
                        tablePenilaian(token);
                    });
                } else {  
                    swal({
                        title: "Daftar Penilaian",
                        text: result.data,
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        resetForm();
                        $("#modaldaftarpenilaian").modal('hide');
                        tablePenilaian(token);
                    });                  
                }
            });
        });
    }
});

function tablePenilaian(token) {
    var columns = [
        { "name": "bil", "title": "Bil" },
        { "name": "nama_kategori_penilaian", "title": "Kategori", "breakpoints": "md sm xs" },
        { "name": "penilaian", "title": "Penilaian" },
        // { "name": "nama_kluster", "title": "Program/Pusat" },
        // { "name": "nama", "title": "Nama Penyelaras" },
        // { "name": "statusrekod", "title": "Status" },
        // { "name": "upt_btn", "title": "Terperinci", "breakpoints": "md sm xs" },
        // {"name":"status","title":"Status","breakpoints":"sm xs"}
    ];

    if(sessionStorage.capaian == capaian[0]){
        columns.push({
            name: "nama_kluster",
            title: "Program/Pusat"
        });
        columns.push({
            name: "nama",
            title: "Nama Penyelaras"
        });
    }
    columns.push({
        name: "upt_btn",
        title: "Terperinci",
        breakpoints: "md sm xs"
    });
    var form = new FormData();
    form.append('FK_users', id_users_master);
    form.append('FK_penilaian', sessionStorage.id_penilaian);
    form.append('FK_kluster', FK_kluster_master);
    form.append('capaian', sessionStorage.capaian);
    if (sessionStorage.capaian == capaian[3]){ // urusetia
        pen_siri_penilaianlistByUrusetiaSiriPenilaian(form, function(){
            result = objPenilaian;
            // console.log(result)
            let convertList = JSON.stringify(result.data);
            $("#dataSenaraiPenilaian").val(convertList);
            var list = [];
            let bil = 1;
    
            $.each(result.data, function (i, field) {
                var checked;
                // alert(field.statusrekod_capaian);
                if (field.statusrekod == '1') {
                    checked = 'checked';
                    badge = 'badge-success';
                    text_statusrekod = 'Aktif';
                } else {
                    badge = 'badge-danger';
                    text_statusrekod = 'Tidak Aktif';
                }
                let disableddel = 'disabled';
                let onclickdel = '';
                if (sessionStorage.nama_peranan == "Super Admin" || 
                    field.no_kad_pengenalan == localStorage.no_kad_pengenalan) {
                    disableddel = '';
                    onclickdel = 'del_rekod(\'' + field.id_penilaian + '\',\'' + token + '\')';
                }
    
                list.push({
                    bil: bil++, 
                    id_penilaian: field.id_penilaian, 
                    penilaian: "<span style='white-space: pre-line;'>"+ field.kod_penilaian + " - " + field.nama_penilaian +"</span>", 
                    nama_kategori_penilaian: field.nama_kategori_penilaian, nama_kluster: field.nama_kluster, nama: field.nama,
                    statusrekod: '<div class="material-switch"><input id="switch_del'+ field.id_penilaian +'" ' + disableddel + ' ' + checked + ' onclick="' + onclickdel + '" type="checkbox"/><label for="switch_del'+ field.id_penilaian +'" id="label_switch'+ field.id_penilaian +'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod' + field.id_penilaian + '" class="badge ' + badge + '">' + text_statusrekod + '</span></div>',
                    upt_btn: '<button class="btn btn-circle btn-info btn-sm" data-ui-toggle-class="zoom" data-ui-target="#animate" onclick="details(\'' + field.id_penilaian + '\')"><i class="material-icons">arrow_forward</i></button>'
                });
            });
            $("#listSenaraiPenilaian").html("");
            // console.log(list);
            $("#listSenaraiPenilaian").footable({
                "columns": columns,
                "rows": list,
                "paging": {
                    "enabled": true,
                    "size": 10
                },
                "filtering": {
                    "enabled": true,
                    "placeholder": "Carian...",
                    "dropdownTitle": "Carian untuk:",
                    "class": "brown-700"
                }
            });
        });
    } else { // selain urusetia
        pen_siri_penilaianlistByPenilaian(form, function(){
            result = objPenilaian;
            // console.log(result)
            let convertList = JSON.stringify(result.data);
            $("#dataSenaraiPenilaian").val(convertList);
            var list = [];
            let bil = 1;
    
            $.each(result.data, function (i, field) {
                var checked;
                // alert(field.statusrekod_capaian);
                if (field.statusrekod == '1') {
                    checked = 'checked';
                    badge = 'badge-success';
                    text_statusrekod = 'Aktif';
                } else {
                    badge = 'badge-danger';
                    text_statusrekod = 'Tidak Aktif';
                }
                let disableddel = 'disabled';
                let onclickdel = '';
                if (sessionStorage.nama_peranan == "Super Admin" || 
                    field.no_kad_pengenalan == localStorage.no_kad_pengenalan) {
                    disableddel = '';
                    onclickdel = 'del_rekod(\'' + field.id_penilaian + '\',\'' + token + '\')';
                }
                if(sessionStorage.capaian == capaian[1]){
                    list.push({
                        bil: bil++, id_penilaian: field.id_penilaian, penilaian: "<span style='white-space: pre-line;'>"+ field.kod_penilaian + " - " + field.nama_penilaian +"</span>", 
                        nama_kategori_penilaian: field.nama_kategori_penilaian, nama_kluster: field.nama_kluster, nama: field.nama,
                        statusrekod: '<div class="material-switch"><input id="switch_del'+ field.id_penilaian +'" ' + disableddel + ' ' + checked + ' onclick="' + onclickdel + '" type="checkbox"/><label for="switch_del'+ field.id_penilaian +'" id="label_switch'+ field.id_penilaian +'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod' + field.id_penilaian + '" class="badge ' + badge + '">' + text_statusrekod + '</span></div>',
                        // upt_btn: '<button class="btn btn-circle btn-info btn-sm" data-ui-toggle-class="zoom" data-ui-target="#animate" onclick="details(\'' + field.id_penilaian + '\')"><i class="material-icons">arrow_forward</i></button>'
                    });
                } else if(sessionStorage.capaian == capaian[2] && field.FK_penyelaras == id_users_master) {
                    list.push({
                        bil: bil++, id_penilaian: field.id_penilaian, penilaian: "<span style='white-space: pre-line;'>"+ field.kod_penilaian + " - " + field.nama_penilaian +"</span>", 
                        nama_kategori_penilaian: field.nama_kategori_penilaian, nama_kluster: field.nama_kluster, nama: field.nama,
                        statusrekod: '<div class="material-switch"><input id="switch_del'+ field.id_penilaian +'" ' + disableddel + ' ' + checked + ' onclick="' + onclickdel + '" type="checkbox"/><label for="switch_del'+ field.id_penilaian +'" id="label_switch'+ field.id_penilaian +'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod' + field.id_penilaian + '" class="badge ' + badge + '">' + text_statusrekod + '</span></div>',
                        upt_btn: '<button class="btn btn-circle btn-info btn-sm" data-ui-toggle-class="zoom" data-ui-target="#animate" onclick="details(\'' + field.id_penilaian + '\')"><i class="material-icons">arrow_forward</i></button>'
                    });
                } else {
                    list.push({
                        bil: bil++, id_penilaian: field.id_penilaian, penilaian: "<span style='white-space: pre-line;'>"+ field.kod_penilaian + " - " + field.nama_penilaian +"</span>", 
                        nama_kategori_penilaian: field.nama_kategori_penilaian, nama_kluster: field.nama_kluster, nama: field.nama,
                        statusrekod: '<div class="material-switch"><input id="switch_del'+ field.id_penilaian +'" ' + disableddel + ' ' + checked + ' onclick="' + onclickdel + '" type="checkbox"/><label for="switch_del'+ field.id_penilaian +'" id="label_switch'+ field.id_penilaian +'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod' + field.id_penilaian + '" class="badge ' + badge + '">' + text_statusrekod + '</span></div>',
                        upt_btn: '<button class="btn btn-circle btn-info btn-sm" data-ui-toggle-class="zoom" data-ui-target="#animate" onclick="details(\'' + field.id_penilaian + '\')"><i class="material-icons">arrow_forward</i></button>'
                    });
                }
            });
            $("#listSenaraiPenilaian").html("");
            // console.log(list);
            $("#listSenaraiPenilaian").footable({
                "columns": columns,
                "rows": list,
                "paging": {
                    "enabled": true,
                    "size": 10
                },
                "filtering": {
                    "enabled": true,
                    "placeholder": "Carian...",
                    "dropdownTitle": "Carian untuk:",
                    "class": "brown-700"
                }
            });
            $(".row-count").html(list.length);
        });
    }
}

// FUNCTION DELETE

function del_rekod(i, token) {
    let id = i;

    var form = new FormData();
    // form.append("recordstatus", statusrekod);
    form.append("id_penilaian", id);
    // console.log(id)
    var settings = {
        "url": host + "penilaian/delete",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    $.ajax(settings).done(function (response) {
        result = JSON.parse(response);
        if (!result.success) {
            swal({
                title: "Kemaskini Status Capaian",
                text: "Kemaskini Gagal!",
                type: "error",
                closeOnConfirm: true,
                allowOutsideClick: false,
                html: false
            }).then(function () {
                window.location.reload();
            });
        }
        if (result.data.statusrekod == 1) {
            $('#text_statusrekod' + result.data.id_penilaian).text('Aktif').removeClass("badge-danger").addClass("badge-success");
        } else {
            $('#text_statusrekod' + result.data.id_penilaian).text('Tidak Aktif').removeClass("badge-success").addClass("badge-danger");
        }
        // saveLog(window.sessionStorage.id, "Update Data for [id_capaian = " + id + "], [FK_users = " + FK_users + "] at Tetapan Peranan & Capaian.", window.sessionStorage.browser);
    });
}

function details(id){

    sessionStorage.id_penilaian = id;

    window.sessionStorage.child = "b0f7c80a40e3d2b78df8f0e6c22f31e5";
    checkAuthentication(window.sessionStorage.child);   

}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

function resetForm() {
    document.getElementById('register').reset();
}

function load_kluster(token,returnValue){
    var form = new FormData();
    form.append('FK_users', id_users_master);
    var settings = {
        "url": host+"capaian/"+id_users_master,
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": window.localStorage.token
        }
      };
      var request = $.ajax(settings);

      request.done(function (response) {
        // console.log(response);
        objKluster = response;

        returnValue();
      });

      request.fail(function (response) {
        //   swal({
        //       title: "Anda Masih Belum Berdaftar Di Bawah Mana-Mana Program/Pusat Penilaian",
        //       // text: "Berjaya Kemaskini Profile!",
        //       type: "error",
        //       showConfirmButton: false,
        //       allowOutsideClick: false,
        //       html: false,
        //       timer: 2000
        //   }).then(function(){},
        //       function (dismiss) {
        //           if (dismiss === 'timer') {
        //             $("#buttonDaftarPenilaian").prop('disabled',true);
        //           }
        //       }
        //   );
      });
}

function load_kategori_penilaian(token,returnValue){
    var settings = {
        "url": host+"kategori_penilaian/list",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": window.localStorage.token
        },
      };
      var request = $.ajax(settings);

      request.done(function (response) {
        objKategori = response;

        returnValue();
      });

      request.fail(function (response) {
        //   swal({
        //       title: "Tiada Kategori Yang Berdaftar",
        //       // text: "Berjaya Kemaskini Profile!",
        //       type: "error",
        //       showConfirmButton: false,
        //       allowOutsideClick: false,
        //       html: false,
        //       timer: 2000
        //   }).then(function(){},
        //       function (dismiss) {
        //         //   if (dismiss === 'timer') {
        //         //         window.sessionStorage.child = "15aaa21373a7090f86dcd348a755b94c";
        //         //         checkAuthentication(window.sessionStorage.child);
        //         //   }
        //       }
        //   );
      });
}

function kembali2(){
    window.sessionStorage.removeItem("child");
    window.location.reload();
}

function removeLogo(){

    let path = "../../api_penilaian/public/logo/default/";
    let img = "default.png";
    let append = '<span class="input-group-text"><i class=" text-muted material-icons">add_a_photo</i></span><span  id="btn-upload" onclick="triggerLogo();" class="input-group-text input-info btn-info" style="cursor:pointer"> <a class="text-white " >Muat Naik</a> </span>';

    $('#logo_1').attr('src',path+img);
    $('#logo').val(null);
    $('#btn-remove').addClass('hidden');
    $('#divLogo').html(append);

}

$("#btn-upload").on("click", function(){
    triggerLogo();
});

function triggerLogo(){

    $("#logo").trigger("click");

}

$("#logo").change(function(event) {

    if($("#logo").val() != null || $("#logo").val() != ""){
        
        $('#btn-upload').css('cursor','not-allowed').removeClass('input-info btn-info').removeAttr("onclick").addClass('input-info-disabled disabled');
        $("#url-logo").removeAttr('href');
        $("#divLogo").append("<span class='input-group-text'>"+$("#logo").val().split('\\').pop()+"</span><span id='btn-remove' onclick='removeLogo();' class='input-danger btn-danger input-group-text' style='cursor:pointer'><i class=' text-white material-icons'>delete_forever</i></span>");
        
        var reader = new FileReader();

        reader.onload = function (e)
        {

            $('#logo_1').attr('src', e.target.result);
        }

        reader.readAsDataURL(this.files[0]);

    }

});
