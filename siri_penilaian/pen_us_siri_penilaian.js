$(function () {
    $.ajaxSetup({
        cache: false
    });
    let token = window.localStorage.token;
    $("#leftsidebar").load('../aside/aside_detail_siri_penilaian.html');
    checkSession();
    saveLog("View Page: Tetapan Urusetia Siri Penilaian", sessionStorage.browser);
    let id_siri_penilaian = sessionStorage.id_siri_penilaian;
    resetForm();
    load_urusetia(token);
    // load_kategori_urusetia(token);
    load_siri_penilaian(id_siri_penilaian,token,function(){
        if(objSiriPenilaian.success){
            let data = objSiriPenilaian.data;
            $("#btnKembali").attr('onclick','kembali2(\'' + data.id_penilaian + '\')');
            $("#kembali").attr('onclick','kembali()');
            $("#kembali2").attr('onclick','kembali2(\'' + data.id_penilaian + '\')');
            $("#nama_penilaian").html(data.nama_penilaian + " SIRI " + data.kod+"/"+data.tahun);
            $("#txt_nama_penilaian").html(data.nama_penilaian);
            $("#txt_kod_siri_penilaian").html(data.kod_siri_penilaian);
            $("#FK_kategori_penilaian").val(data.id_kategori_penilaian);
            $("#txt_nama_kategori_penilaian").html(data.nama_kategori_penilaian);
            $("#FK_kluster").val(data.id_kluster);
            $("#txt_nama_penyelaras").html(data.nama);
            $("#txt_notel_kerajaan_penyelaras").html(data.notel_kerajaan);
            $("#txt_emel_kerajaan_penyelaras").html(data.emel_kerajaan);
            if (data.FK_urusetia != null && data.FK_urusetia != '') {
                $("#urusetia").val(data.FK_urusetia);
                sessionStorage.urusetia = data.FK_urusetia.replace('[', '').replace(']', '');
                var urusetia = ["Urusetia", "JKPenggubal", "JKPenilai", "PanelPenilai"];
                $.each(urusetia, function (i, item) {
                    tableItem("table" + item, "urusetia", data.FK_urusetia, token);
                    load_urusetia(token);
                });
            }
        }
    });
    // users(noic_master,token,function(){
    //     if(dataUsers.success){
    //     }
    //     else{
    //         reject_load();
    //     }
    // });
});

function tableUsSiriPenilaian(token) {
    $("#tableussiripenilaian").empty();
    var columns = [
                    { "name": "bil", "title": "Bil" }, 
                    { "name": "nama", "title": "Nama" },
                    { "name": "no_kad_pengenalan", "title": "No. KP" },
                    { "name": "urusetia", "title": "Urusetia" },
                    { "name": "jk_penggubal", "title": "JK Penggubal" },
                    { "name": "jk_penilai", "title": "JK Penilai" },
                    { "name": "panel_penilai", "title": "Panel Penilai" },
    ];
    var list = [];
    let bil = 1;
    // let count = JSON.parse(JSONitem).length;

    $.each(JSON.parse(JSONitem), function (i, field) {
        let upt_btn = '';
        // let upt_btn = '<button type="button" class="btn btn-danger btn-square btn-sm" onclick="remItem(\'' + item + '\',\'' + rem + '\',\'' + i + '\')" data-whatever="@getbootstrap"><i class="material-icons">remove</i></button> ';
        
        if (item == "tableUrusetia" && field.urusetia == "1")  {
            list.push({
                bil: bil++, nama: field.nama, no_kad_pengenalan: field.no_kad_pengenalan, upt_btn: upt_btn
            });
        }
        if (item == "tableJKPenggubal" && field.jk_penggubal == "1")  {
            list.push({
                bil: bil++, nama: field.nama, no_kad_pengenalan: field.no_kad_pengenalan, upt_btn: upt_btn
            });
        }
        if (item == "tableJKPenilai" && field.jk_penilai == "1")  {
            list.push({
                bil: bil++, nama: field.nama, no_kad_pengenalan: field.no_kad_pengenalan, upt_btn: upt_btn
            });
        }
        if (item == "tablePanelPenilai" && field.panel_penilai == "1")  {
            list.push({
                bil: bil++, nama: field.nama, no_kad_pengenalan: field.no_kad_pengenalan, upt_btn: upt_btn
            });
        }
    });
    $("#" + item).html('');
    if (list.length > 0){
        // console.log(list);
        $("#" + item).footable({
            "columns": columns,
            "rows": list,
            "paging": {
                "enabled": true,
                "size": 10
            },
            "filtering": {
                "enabled": false
            }
        });
    }
}

function tableItem(item, rem, JSONitem, token) {
    $("#" + item).empty();
    $("#" + item).removeClass("hidden");
    var columns = [
                    { "name": "bil", "title": "Bil", "breakpoints": "sm xs" }, 
                    { "name": "nama", "title": "Nama" },
                    { "name": "no_kad_pengenalan", "title": "No. KP", "breakpoints": "sm xs" },
                    { "name": "upt_btn", "title": "Padam", "breakpoints": "sm xs" },
    ];
    var list = [];
    let bil = 1;
    // let count = JSON.parse(JSONitem).length;
    $.each(JSON.parse(JSONitem), function (i, field) {
        let upt_btn = '<button type="button" class="btn btn-danger btn-square btn-sm" onclick="remItem(\'' + item + '\',\'' + rem + '\',\'' + i + '\')" data-whatever="@getbootstrap"><i class="material-icons">delete</i></button> ';
        
        if (item == "tableUrusetia" && field.urusetia == "1")  {
            list.push({
                bil: bil++, nama: field.nama, no_kad_pengenalan: field.no_kad_pengenalan, upt_btn: upt_btn
            });
        }
        if (item == "tableJKPenggubal" && field.jk_penggubal == "1")  {
            list.push({
                bil: bil++, nama: field.nama, no_kad_pengenalan: field.no_kad_pengenalan, upt_btn: upt_btn
            });
        }
        if (item == "tableJKPenilai" && field.jk_penilai == "1")  {
            list.push({
                bil: bil++, nama: field.nama, no_kad_pengenalan: field.no_kad_pengenalan, upt_btn: upt_btn
            });
        }
        if (item == "tablePanelPenilai" && field.panel_penilai == "1")  {
            list.push({
                bil: bil++, nama: field.nama, no_kad_pengenalan: field.no_kad_pengenalan, upt_btn: upt_btn
            });
        }
    });
    $("#" + item).html('');
    if (list.length > 0){
        // console.log(list);
        $("#" + item).footable({
            "columns": columns,
            "rows": list,
            "paging": {
                "enabled": true,
                "size": 10
            },
            "filtering": {
                "enabled": false
            }
        });
    }
}

$("#kat1").change(function(){
    if(this.checked) {
        $("#kat3").attr("disabled", true);
    } else  {
        if ($("#kat2").is(":not(:checked)") && $("#kat4").is(":not(:checked)"))    {
            $("#kat3").attr("disabled", false);
        }
    }
});

$("#kat2").change(function(){
    if(this.checked) {
        $("#kat3").attr("disabled", true);
    } else  {
        if ($("#kat1").is(":not(:checked)") && $("#kat4").is(":not(:checked)"))    {
            $("#kat3").attr("disabled", false);
        }
    }
});

$("#kat4").change(function(){
    if(this.checked) {
        $("#kat3").attr("disabled", true);
    } else  {
        if ($("#kat1").is(":not(:checked)") && $("#kat2").is(":not(:checked)"))    {
            $("#kat3").attr("disabled", false);
        }
    }
});

$("#kat3").change(function(){
    if(this.checked) {
        $("#kat1").attr("disabled", true);
        $("#kat2").attr("disabled", true);
        $("#kat4").attr("disabled", true);
    } else  {
        $("#kat1").attr("disabled", false);
        $("#kat2").attr("disabled", false);
        $("#kat4").attr("disabled", false);

    }
});

var confirmed = false;

// FUNCTION REGISTER

$("#update").on('submit', function (e) {
    let token = localStorage.token;
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        // swal({
        //     title: "Kemaskini Urusetia Siri Penilaian",
        //     text: "Anda Pasti Untuk Kemaskini?",
        //     type: "question",
        //     showCancelButton: true,
        //     confirmButtonText: "Ya",
        //     cancelButtonText: "Tidak",
        //     closeOnConfirm: true,
        //     allowOutsideClick: false,
        //     html: false
        // }).then(function () {
        // });
        let id = sessionStorage.id_siri_penilaian;
        let FK_urusetia = $("#urusetia").val();

        var form = new FormData();
        // formData.append("key","mSideDiary");
        form.append("id_siri_penilaian", id);
        form.append("FK_urusetia", FK_urusetia);
        form.append("updated_by", id_users_master);
        // console.log(FK_urusetia);
        pen_siri_penilaianUpdateUrusetia(form,function(){
            result = JSON.parse(objUpdate);
            if (result.success) {
                // localStorage.token = result.token;
                // token = result.token;
                $.each(JSON.parse(FK_urusetia),function(i, item){
                    var form = new FormData();
                    form.append('FK_siri_penilaian', id);
                    form.append('FK_users', item.FK_users);
                    pen_urusetiaShowBySiriPenilaian(form, function(){
                        resultShow = objShow;
                        if (resultShow.success){
                            var formUS = new FormData();
                            formUS.append('id_urusetia', resultShow.data.id_urusetia);
                            formUS.append('urusetia', item.urusetia);
                            formUS.append('jk_penggubal', item.jk_penggubal);
                            formUS.append('jk_penilai', item.jk_penilai);
                            formUS.append('panel_penilai', item.panel_penilai);
                            formUS.append('FK_users', item.FK_users);
                            formUS.append('FK_siri_penilaian', id);
                            formUS.append("created_by", id_users_master);
                            formUS.append("updated_by", id_users_master);

                            pen_urusetiaUpdate(formUS, function(){
                                resultUpdate = objUpdate;
                                if (objUpdate.success){
                                    // window.localStorage.token = objUpdate.token;
                                } else {

                                }
                            });
                        } else  {
                            var formUS = new FormData();
                            formUS.append('urusetia', item.urusetia);
                            formUS.append('jk_penggubal', item.jk_penggubal);
                            formUS.append('jk_penilai', item.jk_penilai);
                            formUS.append('panel_penilai', item.panel_penilai);
                            formUS.append('FK_users', item.FK_users);
                            formUS.append('FK_siri_penilaian', id);
                            formUS.append("created_by", id_users_master);
                            formUS.append("updated_by", id_users_master);

                            pen_urusetiaRegister(formUS, function(){
                                resultAdd = objAdd;
                                if (objAdd.success){
                                    
                                } else {
                                    
                                }
                            });
                        }
                    });
                });
                
                var form = new FormData();
                form.append('FK_siri_penilaian', id);
                pen_urusetiaListBySiriPenilaian(form, function(){
                    $.each(objList.data, function(i, item){
                        if(FK_urusetia.indexOf('FK_users": "'+ item.FK_users +'"') < 0){
                            var formUS = new FormData();
                            formUS.append('id_urusetia', item.id_urusetia);
                            pen_urusetiaPermDelete(formUS, function(){
                                resultDelete = JSON.parse(objDelete);
                                if (objDelete.success){

                                } else {

                                }
                            });
                        }
                    });
                    swal({
                        title: "Kemaskini Lantikan Siri Penilaian",
                        text: "Berjaya!",
                        type: "success",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        saveLog("Update Data: [Page: Tetapan Lantikan Siri Penilaian], [Urusetia: "+ FK_urusetia +"]", sessionStorage.browser);
                        // window.sessionStorage.child = "a9221c9f4f6ef013df3ca90f4344fed8";
                        // checkAuthentication(window.sessionStorage.child);                            
                    });  
                });
            } else {
                swal({
                    title: "Kemaskini Lantikan Siri Penilaian",
                    text: "Gagal!",
                    type: "error",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function () {
                    $("#modaldaftarsiripenilaian").modal('hide');
                });              
            }
        });
    }
});

function pen_siri_penilaianUpdateUrusetia(form, returnValue){
    var settings = {
        "url": host + "siri_penilaian/updateUrusetia",
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

    var request = $.ajax(settings);
    request.done(function (response) {
        objUpdate = response;
        returnValue();
    });

    request.fail(function (response) {
        objUpdate = response;
        returnValue();        
    });
}

function pen_urusetiaRegister(formUS, returnValue){
    var settings = {
        "url": host + "urusetia/add",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": formUS
    };
    var request = $.ajax(settings);
    request.done(function(response){
        // get kena parse. first takyah parse
        objAdd = JSON.parse(response);
        // window.localStorage.token = objAdd.token;
        returnValue();
    }); 
    
    request.fail(function(response){
        objAdd = response;
        returnValue();
    });
}

function pen_urusetiaPermDelete(formUS, returnValue){
    var settings = {
        "url": host + "urusetia/permDelete",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": formUS
    };
    var request = $.ajax(settings);
    request.done(function(response){
        objDelete = response;
        returnValue();
    }); 
    
    request.fail(function(response){
        objDelete = response;
        returnValue();
    });
}

function pen_urusetiaPermDeleteUsersSiri(formUS, returnValue){
    var settings = {
        "url": host + "urusetia/permDeleteUsersSiri",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": formUS
    };
    var request = $.ajax(settings);
    request.done(function(response){
        objDelete = response;
        returnValue();
    }); 
    
    request.fail(function(response){
        objDelete = response;
        returnValue();
    });
}

function pen_urusetiaUpdate(formUS, returnValue){
    var settings = {
        "url": host + "urusetia/update",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": formUS
    };
    var request = $.ajax(settings);
    request.done(function(response){
        objUpdate = JSON.parse(response);
        returnValue();
    }); 
    
    request.fail(function(response){
        objUpdate = response;
        returnValue();
    });
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

    window.sessionStorage.child = "516d3532d70fde6af5d573655d774419";
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

function load_urusetia(token){
    var existed = '[{"urusetia": "0","penggubal": "0","jk_penilai": "0","panel_penilai": "0","FK_users":"0","nama":"None","no_kad_pengenalan":"000000000000"}]';
    if (($("#urusetia").val() != null) && ($("#urusetia").val() != ''))    {
        existed = $("#urusetia").val();
    }

    var form = new FormData();
    form.append("jenis_pentadbir", '4');
    form.append("FK_peranan", '4');
    form.append("existed", existed);
    
    var settings = {
        "url": host + "usersListPentadbir",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
        contentType: false,
        processData: false,
        data: form,
    };
    var request = $.ajax(settings);

    request.done(function (response) {
        objUrusetia = response;
        $("#FK_users").html("");
        if(objUrusetia.success){
            $("#FK_users").html('<option value="">Pilih Lantikan</option>');
            let dataUrusetia = objUrusetia.data;
            
            $.each(dataUrusetia,function(i,field){
                $("#FK_users").append('<option value="'+field.id_users+'">'+field.nama+'</option>');
            });
            
            $("#FK_users").select2({
                // dropdownParent: $("#modaldaftarsiripenilaian"),
                width: null,
                containerCssClass: ':all:'
            });
        }
      });

      request.fail(function (response) {
          swal({
              title: "Lantikan",
              text: "Tiada Maklumat",
              type: "info",
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

function load_kategori_urusetia(token){
    var settings = {
        "url": host+"kategori_urusetia/list",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": window.localStorage.token
        },
      };
      var request = $.ajax(settings);

      request.done(function (response) {
        
        objKategoriUrusetia = response;
        if(objKategoriUrusetia.success){
            let dataKategoriUrusetia = objKategoriUrusetia.data;
            $("#FK_kategori_urusetia").html("");
            $.each(dataKategoriUrusetia,function(i,field){
                $("#FK_kategori_urusetia").append(
                    '<div class="checkbox checkbox-primary">'+
                        '<input id="kat'+field.id_kategori_urusetia+'" value="'+field.id_kategori_urusetia+'" type="checkbox">'+
                        '<label for="kat'+field.id_kategori_urusetia+'"> '+field.nama_kategori_urusetia+' </label>'+
                    '</div>'
                );
            });
            // $("#FK_kategori_urusetia").html('<option value="">Pilih Kategori Urusetia</option>');
            // let dataKategoriUrusetia = objKategoriUrusetia.data;
            
            // $.each(dataKategoriUrusetia,function(i,field){
            //     $("#FK_kategori_urusetia").append('<option value="'+field.id_kategori_urusetia+'">'+field.nama_kategori_urusetia+'</option>');
            // });
            
            // $("#FK_kategori_urusetia").select2({
            //     width: null,
            //     containerCssClass: ':all:'
            // });
        }
      });

      request.fail(function (response) {
          swal({
              title: "Kategori Lantikan",
              text: "Tiada Maklumat",
              type: "info",
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

$("#addListFK_urusetia").click(function () {
    let token = window.localStorage.token;
    let appendurusetia, appendpenggubal, appendpenilai, appendpanel;
    let process = 0;
    if (($("#FK_users").val() != "")) {
        if ($("#kat1").is(":checked") || $("#kat2").is(":checked") || $("#kat3").is(":checked") || $("#kat4").is(":checked"))    {
            if ($("#kat1").is(":checked")){
                appendurusetia = '"urusetia": "1",';
            } else  {
                appendurusetia = '"urusetia": "0",';
            }
            if ($("#kat2").is(":checked")){
                appendpenggubal = '"jk_penggubal": "1",';
            } else  {
                appendpenggubal = '"jk_penggubal": "0",';
            }
            if ($("#kat3").is(":checked")){
                appendpenilai = '"jk_penilai": "1",';
            } else  {
                appendpenilai = '"jk_penilai": "0",';
            }
            if ($("#kat4").is(":checked")){
                appendpanel = '"panel_penilai": "1",';
            } else  {
                appendpanel = '"panel_penilai": "0",';
            }
        }
        let append = '{'+ appendurusetia + appendpenggubal + appendpenilai + appendpanel +'"FK_users":"' + $("#FK_users").val() + '","nama":"' + $("#nama").val() + '","no_kad_pengenalan":"' + $("#no_kad_pengenalan").val() + '"}';
        if ((sessionStorage.urusetia == null) || (sessionStorage.urusetia == '')) {
            sessionStorage.urusetia = append;
            process = 1;
        } else {
            if (sessionStorage.urusetia.indexOf('"FK_users":"' + $("#FK_users").val() + '","nama":"' + $("#nama").val() + '","no_kad_pengenalan":"' + $("#no_kad_pengenalan").val() + '"') < '0') {
                sessionStorage.urusetia = sessionStorage.urusetia + ', ' + append;                
                process = 1;
            } else  {
                let tempJSON = "["+ sessionStorage.urusetia +"]";
                temp = JSON.parse(tempJSON);
                index = temp.findIndex((obj=>obj.FK_users==$("#FK_users").val()));
                if ($("#kat1").is(":checked")){
                    temp[index].urusetia = "1";
                }
                if ($("#kat2").is(":checked")){
                    temp[index].penggubal = "1";
                }
                if ($("#kat3").is(":checked")){
                    temp[index].penilai = "1";
                }
                if ($("#kat4").is(":checked")){
                    temp[index].panel_penilai = "1";
                }
                tempJSON = JSON.stringify(temp);
                tempJSON = tempJSON.replace("[{","{");
                tempJSON = tempJSON.replace("}]","}");
                sessionStorage.urusetia = tempJSON;
                process = 1;
            }
        }
    }
    if (process == 1)   {
        let JSONurusetia = "[" + sessionStorage.urusetia + "]";
        $("#urusetia").val(JSONurusetia);
        if ($("#kat1").is(":checked")){
            tableItem("tableUrusetia", "urusetia", JSONurusetia, token);
        }
        if ($("#kat2").is(":checked")){
            tableItem("tableJKPenggubal", "urusetia", JSONurusetia, token);
        }
        if ($("#kat3").is(":checked")){
            tableItem("tableJKPenilai", "urusetia", JSONurusetia, token);
        }
        if ($("#kat4").is(":checked")){
            tableItem("tablePanelPenilai", "urusetia", JSONurusetia, token);
        }
        $('#FK_users').val("");
        load_urusetia(token);

        let listCheckbox = ["kat1", "kat2", "kat3", "kat4"];
        $.each(listCheckbox, function (i, item) {
            $("#" +item).prop("checked", false).attr("disabled", false);
        });
    }
    $("#update").submit();
});

function kembali(){
    sessionStorage.child = "959cde393ca127ad75c147ec76ac778b";
    checkAuthentication(sessionStorage.child);
}

function kembali2(id){
    sessionStorage.id_penilaian = id;
    sessionStorage.child = "b0f7c80a40e3d2b78df8f0e6c22f31e5";
    checkAuthentication(sessionStorage.child);
}

function remItem(table, jenis_item, index) {
    let token = window.localStorage.token;
    let temp = "";
    item = JSON.parse($("#" + jenis_item).val());
    $.each(item, function (i, field) {
        let urusetia = field.urusetia;
        let jk_penggubal = field.jk_penggubal;
        let jk_penilai = field.jk_penilai;
        let panel_penilai = field.panel_penilai;
        if (i != index) {
            if (temp == "") {
                temp = '{"urusetia": "'+ field.urusetia + '",'+
                        '"jk_penggubal": "'+ field.jk_penggubal + '",'+
                        '"jk_penilai": "'+ field.jk_penilai + '",'+
                        '"panel_penilai": "'+ field.panel_penilai + '",'+
                        '"FK_users":"' + field.FK_users + '","nama":"' + field.nama + '","no_kad_pengenalan":"' + field.no_kad_pengenalan + '"}';
            } else {
                temp = temp + ', ' + '{"urusetia": "'+ field.urusetia + '",'+
                '"jk_penggubal": "'+ field.jk_penggubal + '",'+
                '"jk_penilai": "'+ field.jk_penilai + '",'+
                '"panel_penilai": "'+ field.panel_penilai + '",'+
                '"FK_users":"' + field.FK_users + '","nama":"' + field.nama + '","no_kad_pengenalan":"' + field.no_kad_pengenalan + '"}';
            }
        } else  {
            if (table == "tableUrusetia")   {
                urusetia = "0";
            }
            if (table == "tableJKPenggubal")   {
                jk_penggubal = "0";
            }
            if (table == "tableJKPenilai")   {
                jk_penilai = "0";
            }
            if (table == "tablePanelPenilai")   {
                panel_penilai = "0";
            }
            if (!(urusetia == "0" && jk_penggubal == "0" && jk_penilai == "0" && panel_penilai == "0"))    {
                if (temp == "") {
                    temp = '{"urusetia": "'+ urusetia + '",'+
                            '"jk_penggubal": "'+ jk_penggubal + '",'+
                            '"jk_penilai": "'+ jk_penilai + '",'+
                            '"panel_penilai": "'+ panel_penilai + '",'+
                            '"FK_users":"' + field.FK_users + '","nama":"' + field.nama + '","no_kad_pengenalan":"' + field.no_kad_pengenalan + '"}';
                } else {
                    temp = temp + ', ' + '{"urusetia": "'+ urusetia + '",'+
                    '"jk_penggubal": "'+ jk_penggubal + '",'+
                    '"jk_penilai": "'+ jk_penilai + '",'+
                    '"panel_penilai": "'+ panel_penilai + '",'+
                    '"FK_users":"' + field.FK_users + '","nama":"' + field.nama + '","no_kad_pengenalan":"' + field.no_kad_pengenalan + '"}';
                }
            } else {
                var formUS = new FormData();
                formUS.append('FK_users', field.FK_users);
                formUS.append('FK_siri_penilaian', window.sessionStorage.id_siri_penilaian);
                pen_urusetiaPermDeleteUsersSiri(formUS, function(){
                    resultDelete = JSON.parse(objDelete);
                    if (objDelete.success){

                    } else {

                    }
                });                
            }
        }
    });
    let JSONtemp = '[' + temp + ']';
    $("#" + jenis_item).val(JSONtemp);
    sessionStorage.urusetia = temp;
    $("#update").submit();
    load_urusetia(token);
    tableItem(table, jenis_item, JSONtemp, token);
}

$("#FK_users").on('change', function(){
    let token = window.localStorage.token;
    usersGetId($("#FK_users").val(), token, function(){
        if(dataUsers.success){
            let data = dataUsers.data;
            $("#nama").val(data.nama);
            $("#no_kad_pengenalan").val(data.no_kad_pengenalan);
        }
    });
});

function resetForm() {
    // let listDivTable = [];
    // $.each(listDivTable, function (i, item) {
    //     $("#" + item).addClass('hidden');
    // });

    let listSession = ["urusetia"];
    $.each(listSession, function (i, item) {
        sessionStorage.removeItem(item);
    });

    let listHtml = ["tableUrusetia", "tableJKPenggubal", "tableJKPenilai", "tablePanelPenilai",
    ];
    $.each(listHtml, function (i, item) {
        $("#" + item).html("");
    });

    // document.getElementById('register').reset();
}