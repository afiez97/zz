$(function () {
    $.ajaxSetup({
        cache: false
    });
    let token = window.localStorage.token;    
    if(sessionStorage.capaian == capaian[0])    {
        $("#buttonDaftarKategoriPenilaian").removeClass('hidden').attr('onclick',"daftar('kategoripenilaian');");
    }
    $("#leftsidebar").load('../aside/aside_pen_ttpn_kategori_penilaian.html');
    $("#btnKembali").attr('onclick','kembali2()');
    checkSession();
    saveLog("View Page: Tetapan Kategori Penilaian", sessionStorage.browser);
    tableKategoriPenilaian(token);
    // users(noic_master,token,function(){
    //     if(dataUsers.success){
    //     }
    //     else{
    //         reject_load();
    //     }
    // });

});

function daftar(content) {
    var listSettings = ["kategoripenilaian"];
    $.each(listSettings, function (i, item) {
        switch (item) {
            case content: $('#modaldaftar' + item).modal('show'); break;
        }
    });
}

var confirmed = false;

// FUNCTION REGISTER

$("#daftar_kategori_penilaian").on('submit', function (e) {
    let token = localStorage.token;
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Daftar Kategori Penilaian",
            text: "Anda Pasti Untuk Daftar?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {
            let nama_kategori_penilaian = $("#nama_kategori_penilaian").val();

            var form = new FormData();
            // formData.append("key","mSideDiary");
            form.append("nama_kategori_penilaian", nama_kategori_penilaian);
            form.append("created_by", id_users_master);

            var settings = {
                "url": host + "kategori_penilaian/add",
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
            let request = $.ajax(settings);
            request.done(function (response) {
                result = JSON.parse(response);
                if (!result.success) {
                    swal({
                        title: "Daftar Kategori Penilaian",
                        text: result.data,
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        resetForm();
                        $("#modaldaftarkategoripenilaian").modal('hide');
                    });
                } else {
                    swal({
                        title: "Daftar Kategori Penilaian",
                        text: "Berjaya!",
                        type: "success",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        saveLog("Register Data: [Page: Tetapan Kategori Penilaian], [Kategori: "+ nama_kategori_penilaian +"]", sessionStorage.browser);
                        $("#modaldaftarkategoripenilaian").modal('hide');
                        resetForm();
                        tableKategoriPenilaian(token);
                    });                    
                }
            });

            request.fail(function(response){
                console.log(response);
                swal({
                    title: "Capaian Telah Tamat.",
                    // text: "Berjaya Kemaskini Profile!",
                    type: "info",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    html: false,
                    timer: 2000
                }).then(function(){},
                    function (dismiss) {
                        if (dismiss === 'timer') {
                            $("#modaldaftarkategoripenilaian").modal('hide');
                        }
                    }
                );
            });
        });
    }
});

$("#update_kategori_penilaian").on('submit', function (e) {
    let token = localStorage.token;
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Kemaskini Kategori Penilaian",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {
            let id_kategori_penilaian = $("#id_kategori_penilaian").val();
            let nama_kategori_penilaian = $("#upt_nama_kategori_penilaian").val();
            // let default_logo = $("#default_logo").val();
            // let new_default_logo = $("#new_default_logo")[0].files[0];

            var form = new FormData();
            // formData.append("key","mSideDiary");
            form.append("id_kategori_penilaian", id_kategori_penilaian);
            form.append("nama_kategori_penilaian", nama_kategori_penilaian);
            // form.append("default_logo", default_logo);
            // form.append("new_default_logo", new_default_logo);
            form.append("updated_by", id_users_master);

            var settings = {
                "url": host + "kategori_penilaian/update",
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
            let request = $.ajax(settings);
            request.done(function (response) {
                console.log(response);
                result = JSON.parse(response);
                if (!result.success) {
                    swal({
                        title: "Kemaskini Kategori Penilaian",
                        text: result.data,
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        resetForm();
                        $("#modalupdatekategoripenilaian").modal('hide');
                    });
                } else {
                    swal({
                        title: "Kemaskini Kategori Penilaian",
                        text: "Berjaya!",
                        type: "success",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        // localStorage.token = result.token;
                        token = localStorage.token;
                        saveLog("Update Data: [Page: Tetapan Kategori Penilaian], [Kategori: "+ nama_kategori_penilaian +"], ", sessionStorage.browser);
                        $("#modalupdatekategoripenilaian").modal('hide');
                        resetForm();
                        tableKategoriPenilaian(token);
                    });                    
                }
            });

            request.fail(function(response){
                console.log(response);
                swal({
                    title: "Capaian Telah Tamat.",
                    // text: "Berjaya Kemaskini Profile!",
                    type: "info",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    html: false,
                    timer: 2000
                }).then(function(){},
                    function (dismiss) {
                        if (dismiss === 'timer') {
                            $("#modalupdatekategoripenilaian").modal('hide');
                        }
                    }
                );
            });
        });
    }
});

function tableKategoriPenilaian(token) {
    console.log(123);
    var columns = [
        { "name": "bil", "title": "Bil" },
        { "name": "nama_kategori_penilaian", "title": "Kategori Penilaian" },
        { "name": "statusrekod", "title": "Status" },
        { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
        // {"name":"status","title":"Status","breakpoints":"sm xs"}
    ];

    var settings = {
        "url": host + "kategori_penilaian/listAll",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        }
    };
    let request = $.ajax(settings);
    request.done(function (response) {
        result = response;
        let convertList = JSON.stringify(result.data);
        $("#dataKategoriPenilaian").val(convertList);
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

            console.log(sessionStorage.capaian+" == "+capaian[0]);
            if (sessionStorage.capaian == capaian[0]) {
                disableddel = '';
                onclickdel = 'del_rekod(\'' + field.id_kategori_penilaian + '\',\'' + token + '\')';
            }

            list.push({
                bil: bil++, id_kategori_penilaian: field.id_kategori_penilaian, 
                nama_kategori_penilaian: field.nama_kategori_penilaian,
                statusrekod: '<div class="material-switch"><input id="switch_del'+ field.id_kategori_penilaian +'" ' + disableddel + ' ' + checked + ' onclick="' + onclickdel + '" type="checkbox"/><label for="switch_del'+ field.id_kategori_penilaian +'" id="label_switch'+ field.id_kategori_penilaian +'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod' + field.id_kategori_penilaian + '" class="badge ' + badge + '">' + text_statusrekod + '</span></div>',
                upt_btn: '<button class="btn btn-circle btn-info btn-sm" data-ui-toggle-class="zoom" data-ui-target="#animate" onclick="load_data(\'' + i + '\')"><i class="material-icons">mode_edit</i></button>'
            });
        });
        $("#listKategoriPenilaian").html("");
        $("#listKategoriPenilaian").footable({
            "columns": columns,
            "rows": list,
            "paging": {
                "enabled": false,
                "size": 10
            },
            "filtering": {
                "enabled": false,
                "placeholder": "Carian...",
                "dropdownTitle": "Carian untuk:",
                "class": "brown-700"
            }
        });
    });
    request.fail(function (response) {
        swal({
            title: "Tiada Kategori Penilaian.",
            // text: "Berjaya Kemaskini Profile!",
            type: "info",
            showConfirmButton: false,
            allowOutsideClick: false,
            html: false,
            timer: 2000
        }).then(function(){},
            function (dismiss) {
                if (dismiss === 'timer') {
                    daftar('kategoripenilaian');
                }
            }
        );
    });
}

function load_data(indexs){
    result = JSON.parse($("#dataKategoriPenilaian").val());
    result = result[indexs];
    $("#id_kategori_penilaian").val(result.id_kategori_penilaian);
    $("#default_logo").val(result.default_logo);
    $("#upt_nama_kategori_penilaian").val(result.nama_kategori_penilaian);
    $("#current_default_logo").attr("src",'../../api_penilaian/public/kategori_penilaian/' + result.default_logo);
    $("#modalupdatekategoripenilaian").modal('show');
}

// FUNCTION DELETE

function del_rekod(i, token) {
    let id = i;

    var form = new FormData();
    // form.append("recordstatus", statusrekod);
    form.append("id_kategori_penilaian", id);
    // console.log(id)
    var settings = {
        "url": host + "kategori_penilaian/delete",
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
        // console.log(response)
        result = JSON.parse(response);
        if (!result.success) {
            // Swal(result.message, result.data, "error");
            // return;
            swal({
                title: "Kemaskini Status Kategori Penilaian",
                text: "Kemaskini Gagal!",
                type: "error",
                closeOnConfirm: true,
                allowOutsideClick: false,
                html: false
            }).then(function () {
                window.location.reload();
            });
        }
        // console.log(result.data)
        if (result.data.statusrekod == 1) {
            $('#text_statusrekod' + result.data.id_kategori_penilaian).text('Aktif').removeClass("badge-danger").addClass("badge-success");
        } else {
            $('#text_statusrekod' + result.data.id_kategori_penilaian).text('Tidak Aktif').removeClass("badge-success").addClass("badge-danger");
        }
        // saveLog(window.sessionStorage.id, "Update Data for [id_capaian = " + id + "], [FK_users = " + FK_users + "] at Tetapan Peranan & Capaian.", window.sessionStorage.browser);
    });
}
function resetForm() {
    document.getElementById('update_kategori_penilaian').reset();
}

function load_kluster(token,returnValue){
    var settings = {
        "url": host+"klusterList/",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": "penyelaras "+token
        },
      };
      var request = $.ajax(settings);

      request.done(function (response) {
        objKluster = response;

        returnValue();
      });

      request.fail(function (response) {
          swal({
              title: "Tiada Maklumat Program/Pusat",
              // text: "Berjaya Kemaskini Profile!",
              type: "error",
              showConfirmButton: false,
              allowOutsideClick: false,
              html: false,
              timer: 2000
          }).then(function(){},
              function (dismiss) {
                //   if (dismiss === 'timer') {
                //         window.sessionStorage.child = "15aaa21373a7090f86dcd348a755b94c";
                //         checkAuthentication(window.sessionStorage.child);
                //   }
              }
          );
      });
}

function kembali2(){
    window.sessionStorage.removeItem("child");
    window.location.reload();
}