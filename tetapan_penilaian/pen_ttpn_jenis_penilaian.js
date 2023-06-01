$(function () {
    $.ajaxSetup({
        cache: false
    });
    let token = window.localStorage.token;    
    if(sessionStorage.capaian == capaian[0])    {
        $("#buttonDaftarJenisPenilaian").removeClass('hidden').attr('onclick',"daftar('jenispenilaian');");
    }
    $("#leftsidebar").load('../aside/aside_pen_ttpn_jenis_penilaian.html');
    $("#btnKembali").attr('onclick','kembali2()');
    checkSession();
    saveLog("View Page: Tetapan Jenis Penilaian", sessionStorage.browser);
    tableJenisPenilaian(token);
    // users(noic_master,token,function(){
    //     if(dataUsers.success){
    //     }
    //     else{
    //         reject_load();
    //     }
    // });

});

function daftar(content) {
    var listSettings = ["jenispenilaian"];
    $.each(listSettings, function (i, item) {
        switch (item) {
            case content: $('#modaldaftar' + item).modal('show'); break;
        }
    });
}

var confirmed = false;

// FUNCTION REGISTER

$("#update_jenis_penilaian").on('submit', function (e) {
    let token = localStorage.token;
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Kemaskini Jenis Penilaian",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {
            let id_jenis_penilaian = $("#id_jenis_penilaian").val();
            let nama_jenis_penilaian = $("#nama_jenis_penilaian").val();
            let mod_jenis_penilaian = $("#mod_jenis_penilaian").is(":checked");

            var form = new FormData();
            if(mod_jenis_penilaian == true) form.append("mod_jenis_penilaian", 'online');
            else form.append("mod_jenis_penilaian", 'offline');
            form.append("id_jenis_penilaian", id_jenis_penilaian);
            form.append("nama_jenis_penilaian", nama_jenis_penilaian);
            form.append("updated_by", id_users_master);

            var settings = {
                "url": host + "jenis_penilaian/update",
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
                        title: "Kemaskini Jenis Penilaian",
                        text: result.data,
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        resetForm();
                        $("#modalupdatejenispenilaian").modal('hide');
                    });
                } else {
                    swal({
                        title: "Kemaskini Jenis Penilaian",
                        text: "Berjaya!",
                        type: "success",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        // localStorage.token = result.token;
                        token = localStorage.token;
                        $("#modalupdatejenispenilaian").modal('hide');
                        resetForm();
                        tableJenisPenilaian(token);
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
                            $("#modalupdatejenispenilaian").modal('hide');
                        }
                    }
                );
            });
        });
    }
});

function tableJenisPenilaian(token) {
    var columns = [
        { "name": "bil", "title": "Bil" },
        { "name": "nama_jenis_penilaian", "title": "Jenis Penilaian" },
        { "name": "statusrekod", "title": "Status" },
        { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
        // {"name":"status","title":"Status","breakpoints":"sm xs"}
    ];

    var settings = {
        "url": host + "jenis_penilaian/listAll",
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
        $("#dataJenisPenilaian").val(convertList);
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
            if (sessionStorage.capaian == capaian[0]) {
                disableddel = '';
                onclickdel = 'del_rekod(\'' + field.id_jenis_penilaian + '\',\'' + token + '\')';
            }

            list.push({
                bil: bil++, id_jenis_penilaian: field.id_jenis_penilaian, 
                nama_jenis_penilaian: field.nama_jenis_penilaian,
                statusrekod: '<div class="material-switch"><input id="switch_del'+ field.id_jenis_penilaian +'" ' + disableddel + ' ' + checked + ' onclick="' + onclickdel + '" type="checkbox"/><label for="switch_del'+ field.id_jenis_penilaian +'" id="label_switch'+ field.id_jenis_penilaian +'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod' + field.id_jenis_penilaian + '" class="badge ' + badge + '">' + text_statusrekod + '</span></div>',
                upt_btn: '<button class="btn btn-circle btn-info btn-sm" data-ui-toggle-class="zoom" data-ui-target="#animate" onclick="load_data(\'' + i + '\')"><i class="material-icons">mode_edit</i></button>'
            });
        });
        $("#listJenisPenilaian").html("");
        $("#listJenisPenilaian").footable({
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
    request.fail(function (response) {
        swal({
            title: "Tiada Jenis Penilaian.",
            // text: "Berjaya Kemaskini Profile!",
            type: "info",
            showConfirmButton: false,
            allowOutsideClick: false,
            html: false,
            timer: 2000
        }).then(function(){},
            function (dismiss) {
                if (dismiss === 'timer') {
                    daftar('jenispenilaian');
                }
            }
        );
    });
}

function load_data(indexs){
    result = JSON.parse($("#dataJenisPenilaian").val());
    result = result[indexs];
    $("#text_mod_jenis_penilaian").removeClass('badge-success badge-danger').text(result.mod_jenis_penilaian);
    if (result.mod_jenis_penilaian == 'online') {
        checked = true;
        badge = 'badge-success';
        text_statusrekod = 'Aktif';
    } else {
        checked = false;
        badge = 'badge-danger';
        text_statusrekod = 'Tidak Aktif';
    }
    onclickchg = 'chg_mod(\'' + result.id_jenis_penilaian + '\')';
    $("#id_jenis_penilaian").val(result.id_jenis_penilaian);
    $("#nama_jenis_penilaian").val(result.nama_jenis_penilaian);
    $("#mod_jenis_penilaian").prop("checked", checked).attr("onclick", onclickchg);
    $("#text_mod_jenis_penilaian").addClass(badge).text(result.mod_jenis_penilaian);
    $("#modalupdatejenispenilaian").modal('show');
}

// FUNCTION DELETE

function chg_mod(i) {
    let id = i;

    var form = new FormData();
    // form.append("recordstatus", statusrekod);
    form.append("id_jenis_penilaian", id);
    form.append("updated_by", id_users_master);
    // console.log(id)
    var settings = {
        "url": host + "jenis_penilaian/chgmod",
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
                title: "Kemaskini Status Jenis Penilaian",
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
        // window.localStorage.token = result.token;
        token = window.localStorage.token;
        $('#text_mod_jenis_penilaian').removeClass("badge-danger badge-success");
        if (result.data.mod_jenis_penilaian == 'online') {
            $('#text_mod_jenis_penilaian').addClass("badge-success").text(result.data.mod_jenis_penilaian);
        } else {
            $('#text_mod_jenis_penilaian').addClass("badge-danger").text(result.data.mod_jenis_penilaian);
        }
        // saveLog(window.sessionStorage.id, "Update Data for [id_capaian = " + id + "], [FK_users = " + FK_users + "] at Tetapan Peranan & Capaian.", window.sessionStorage.browser);
    });
}

// FUNCTION DELETE

function del_rekod(i, token) {
    let id = i;

    var form = new FormData();
    // form.append("recordstatus", statusrekod);
    form.append("id_jenis_penilaian", id);
    form.append("updated_by", id_users_master);
    // console.log(id)
    var settings = {
        "url": host + "jenis_penilaian/delete",
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
                title: "Kemaskini Status Jenis Penilaian",
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
        // window.localStorage.token = result.token;
        token = result.token;
        if (result.data.statusrekod == 1) {
            $('#text_statusrekod' + result.data.id_jenis_penilaian).text('Aktif').removeClass("badge-danger").addClass("badge-success");
        } else {
            $('#text_statusrekod' + result.data.id_jenis_penilaian).text('Tidak Aktif').removeClass("badge-success").addClass("badge-danger");
        }
        // saveLog(window.sessionStorage.id, "Update Data for [id_capaian = " + id + "], [FK_users = " + FK_users + "] at Tetapan Peranan & Capaian.", window.sessionStorage.browser);
    });
}
function resetForm() {
    document.getElementById('update_jenis_penilaian').reset();
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