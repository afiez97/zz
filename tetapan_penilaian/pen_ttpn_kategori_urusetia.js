$(function () {
    $.ajaxSetup({
        cache: false
    });
    let token = window.localStorage.token;   
    if(sessionStorage.capaian == capaian[0])    {
        $("#buttonDaftarKategoriUrusetia").removeClass('hidden').attr('onclick',"daftar('kategoriurusetia');");
    }
    $("#leftsidebar").load('../aside/aside_pen_ttpn_kategori_urusetia.html');
    $("#btnKembali").attr('onclick','kembali2()');
    checkSession();
    saveLog("View Page: Tetapan Kategori Urusetia", sessionStorage.browser);
    tableKategoriUrusetia(token);
    listMenuDetailSiriPenilaian(15, function(){
        // var listmenu = [];
        $.each(objMenuList.data, function (i, item) {
            $('#polisi_capaian').append($(
                '<table width="70%">' +
                    '<tbody>' +
                        '<tr>' +
                            '<td width="40%"><label>' + item.menu + '</label></td>' +
                            '<td class="checkbox" width="10%"><input type="checkbox" name="crud" value="c-' + item.idmenu + '" id="c-' + item.idmenu + '"/><label style="margin:5px;" for="c-' + item.idmenu + '"> Create</label></td>' +
                            '<td class="checkbox" width="10%"><input type="checkbox" name="crud" value="r-' + item.idmenu + '" id="r-' + item.idmenu + '"/><label style="margin:5px;" for="r-' + item.idmenu + '"> Read</label></td>' +
                            '<td class="checkbox" width="10%"><input type="checkbox" name="crud" value="u-' + item.idmenu + '" id="u-' + item.idmenu + '"/><label style="margin:5px;" for="u-' + item.idmenu + '"> Update</label></td>' +
                            '<td class="checkbox" width="10%"><input type="checkbox" name="crud" value="d-' + item.idmenu + '" id="d-' + item.idmenu + '"/><label style="margin:5px;" for="d-' + item.idmenu + '"> Delete</label></td>' +
                        '</tr>' +
                    '</tbody>' +
                '</table>'));
            // listmenu.push(item.idmenu);
        });
    });
    // users(noic_master,token,function(){
    //     if(dataUsers.success){
    //     }
    //     else{
    //         reject_load();
    //     }
    // });
});

function daftar(content) {
    var listSettings = ["kategoriurusetia"];
    $.each(listSettings, function (i, item) {
        switch (item) {
            case content: $('#modaldaftar' + item).modal('show'); break;
        }
    });
}

var confirmed = false;

// FUNCTION REGISTER

$("#update_kategori_urusetia").on('submit', function (e) {
    let token = localStorage.token;
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Kemaskini Kategori Lantikan",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {
            let id_kategori_urusetia = $("#id_kategori_urusetia").val();
            let nama_kategori_urusetia = $("#nama_kategori_urusetia").val();
            let arr_create = [];
            let arr_read = [];
            let arr_update = [];
            let arr_delete = [];
            $.each(jQuery("input[name='crud']:checked"), function () {
                test = jQuery(this).val().split('-');
                if (test[0] == 'c') {
                    arr_create.push(test[1]);
                }
                if (test[0] == 'r') {
                    arr_read.push(test[1]);
                }
                if (test[0] == 'u') {
                    arr_update.push(test[1]);
                }
                if (test[0] == 'd') {
                    arr_delete.push(test[1]);
                }
                // polisi_capaian.push({ polisi_capaian: jQuery(this).val() });
            });
            let stringpolisi_capaian = '{"c":'+ JSON.stringify(arr_create) +', "r":'+ JSON.stringify(arr_read) +', "u":'+ JSON.stringify(arr_update) +', "d":'+ JSON.stringify(arr_delete) +'}';

            var form = new FormData();
            // formData.append("key","mSideDiary");
            form.append("id_kategori_urusetia", id_kategori_urusetia);
            form.append("nama_kategori_urusetia", nama_kategori_urusetia);
            form.append("polisi_capaian", stringpolisi_capaian);
            form.append("updated_by", id_users_master);

            var settings = {
                "url": host + "kategori_urusetia/update",
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
                if (result.success) {
                    swal({
                        title: "Kemaskini Kategori Lantikan",
                        text: "Berjaya!",
                        type: "success",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        // localStorage.token = result.token;
                        token = localStorage.token;
                        saveLog("View Page: Update Data: [Page: Tetapan Kategori Lantikan], [Kategori: "+ nama_kategori_urusetia +"]", sessionStorage.browser);
                        $("#modalupdatekategoriurusetia").modal('hide');
                        resetForm();
                        tableKategoriUrusetia(token);
                    }); 
                } else { 
                    swal({
                        title: "Kemaskini Kategori Lantikan",
                        text: result.data,
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        resetForm();
                        $("#modalupdatekategoriurusetia").modal('hide');
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
                            $("#modalupdatekategoriurusetia").modal('hide');
                        }
                    }
                );
            });
        });
    }
});

function tableKategoriUrusetia(token) {
    var columns = [
        { "name": "bil", "title": "Bil" },
        { "name": "nama_kategori_urusetia", "title": "Kategori Lantikan" },
        { "name": "polisi_capaian", "title": "Polisi Capaian" },
        // { "name": "statusrekod", "title": "Status" },
        // { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
        // {"name":"status","title":"Status","breakpoints":"sm xs"}
    ];

    var settings = {
        "url": host + "kategori_urusetia/listAll",
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
        $("#dataKategoriUrusetia").val(convertList);
        var list = [];
        let bil = 1;
        let count = 0;
        let countfield = 0;
        $.each(result.data, function (i, field) {
            var checked;
            var nama_submodul = "";
            var senarai_capaian = "";
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
                onclickdel = 'del_rekod(\'' + field.id_kategori_urusetia + '\',\'' + token + '\')';
            }
            upt_btn = '<button class="btn btn-circle btn-info btn-sm" data-ui-toggle-class="zoom" data-ui-target="#animate" onclick="load_data(\'' + i + '\')"><i class="material-icons">mode_edit</i></button>';
            // var polisi_capaian = [];
            var polisi_capaian = "";
            if (field.polisi_capaian != null)   {
                polisi_capaian = JSON.parse(field.polisi_capaian);
            }
            let inc = 1;
            while (inc <= 16) {
                switch (inc) {
                    case 1: nama_submodul = "<tr><td><b>Info Siri Penilaian</b>: </td>"; idmenu = 'pen_info_siri_penilaian'; break;
                    case 2: nama_submodul = "<tr><td><b>Lantikan</b>: </td>"; idmenu = 'pen_us_siri_penilaian'; break;
                    case 3: nama_submodul = "<tr><td><b>Muka Depan Soalan</b>: </td>"; idmenu = 'pen_muka_depan_siri_penilaian'; break;
                    case 4: nama_submodul = "<tr><td><b>Pengurusan Gred</b>: </td>"; idmenu = 'pen_peng_gred_siri_penilaian'; break;
                    case 5: nama_submodul = "<tr><td><b>Pengurusan Penilaian</b>: </td>"; idmenu = 'pen_peng_penilaian_siri_penilaian'; break;
                    case 6: nama_submodul = "<tr><td><b>Pemantauan Penilaian</b>: </td>"; idmenu = 'pen_pantau_penilaian_siri_penilaian'; break;
                    case 7: nama_submodul = "<tr><td><b>Senarai Keputusan</b>: </td>"; idmenu = 'pen_list_keputusan_siri_penilaian'; break;
                    case 8: nama_submodul = "<tr><td><b>Pengurusan Bank Soalan (Siri Penilaian)</b>: </td>"; idmenu = 'pen_peng_bank_soalan_siri_penilaian'; break;
                    case 9: nama_submodul = "<tr><td><b>Pengurusan Bank Soalan (Penilaian)</b>: </td>"; idmenu = 'pen_list_bank_soalan'; break;
                    case 10: nama_submodul = "<tr><td><b>Pengurusan Set Soalan</b>: </td>"; idmenu = 'pen_peng_set_soalan_siri_penilaian'; break;
                    case 11: nama_submodul = "<tr><td><b>Analisa Jawapan</b>: </td>"; idmenu = 'pen_analisa_jawapan_siri_penilaian'; break;
                    case 12: nama_submodul = "<tr><td><b>Statistik Penilaian</b>: </td>"; idmenu = 'pen_stat_penilaian_siri_penilaian'; break;
                    case 13: nama_submodul = "<tr><td><b>Dashboard Penilaian</b>: </td>"; idmenu = 'pen_dashboard_penilaian_siri_penilaian'; break;
                    case 14: nama_submodul = "<tr><td><b>Pengesahan Soalan</b>: </td>"; idmenu = 'pen_sah_soalan_siri_penilaian'; break;
                    case 15: nama_submodul = "<tr><td><b>Pengesahan Markah</b>: </td>"; idmenu = 'pen_sah_markah_siri_penilaian'; break;
                    case 16: nama_submodul = "<tr><td><b>Permohonan Calon</b>: </td>"; idmenu = 'pen_permohonan_calon_siri_penilaian'; break;
                }
                senarai_capaian = senarai_capaian + nama_submodul;
                if (isExactMatch(JSON.stringify(polisi_capaian.c), idmenu) == true)
                    senarai_capaian = senarai_capaian + "<td style='color: green; text-align: center;'><i class='fas fa-check-circle'></i></td>";
                else
                    senarai_capaian = senarai_capaian + "<td></td>";
                if (isExactMatch(JSON.stringify(polisi_capaian.r), idmenu) == true)
                    senarai_capaian = senarai_capaian + "<td style='color: green; text-align: center;'><i class='fas fa-check-circle'></i></td>";
                else
                    senarai_capaian = senarai_capaian + "<td></td>";
                if (isExactMatch(JSON.stringify(polisi_capaian.u), idmenu) == true)
                    senarai_capaian = senarai_capaian + "<td style='color: green; text-align: center;'><i class='fas fa-check-circle'></i></td>";
                else
                    senarai_capaian = senarai_capaian + "<td></td>";
                if (isExactMatch(JSON.stringify(polisi_capaian.d), idmenu) == true)
                    senarai_capaian = senarai_capaian + "<td style='color: green; text-align: center;'><i class='fas fa-check-circle'></i></td>";
                else
                    senarai_capaian = senarai_capaian + "<td></td>";
                senarai_capaian = senarai_capaian + "</tr>";
                inc++;
            }
            list.push({
                bil: bil++, id_kategori_urusetia: field.id_kategori_urusetia, 
                nama_kategori_urusetia: field.nama_kategori_urusetia + " " + upt_btn,
                polisi_capaian: "<table class='table-bordered' width='100%'><tr><th style='padding: 10px;'>Tajuk</th><th style='text-align: center;'>Create</th><th style='text-align: center;'>Read</th><th style='text-align: center;'>Update</th><th style='text-align: center;'>Delete</th></tr>"+ senarai_capaian +"</table>",
                // statusrekod: '<div class="material-switch"><input id="switch_del'+ field.id_kategori_urusetia +'" ' + disableddel + ' ' + checked + ' onclick="' + onclickdel + '" type="checkbox"/><label for="switch_del'+ field.id_kategori_urusetia +'" id="label_switch'+ field.id_kategori_urusetia +'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod' + field.id_kategori_urusetia + '" class="badge ' + badge + '">' + text_statusrekod + '</span></div>',
                // upt_btn: '<button class="btn btn-circle btn-info btn-sm" data-ui-toggle-class="zoom" data-ui-target="#animate" onclick="load_data(\'' + i + '\')"><i class="material-icons">mode_edit</i></button>'
            });
        });
        $("#listKategoriUrusetia").html("");
        $("#listKategoriUrusetia").footable({
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
            title: "Tiada Kategori Urusetia.",
            // text: "Berjaya Kemaskini Profile!",
            type: "info",
            showConfirmButton: false,
            allowOutsideClick: false,
            html: false,
            timer: 2000
        }).then(function(){},
            function (dismiss) {
                if (dismiss === 'timer') {
                    daftar('kategoriurusetia');
                }
            }
        );
    });
}

function load_data(indexs){
    result = JSON.parse($("#dataKategoriUrusetia").val());
    result = result[indexs];
    $("#text_mod_kategori_urusetia").removeClass('badge-success badge-danger').text(result.mod_kategori_urusetia);
    if (result.mod_kategori_urusetia == 'online') {
        checked = true;
        badge = 'badge-success';
        text_statusrekod = 'Aktif';
    } else {
        checked = false;
        badge = 'badge-danger';
        text_statusrekod = 'Tidak Aktif';
    }

    polisi_capaian = JSON.parse(result.polisi_capaian);
    console.log(polisi_capaian);

    for (var i = 0; i < polisi_capaian.c.length; i++) {
        $('#c-' + polisi_capaian.c[i]).prop('checked', true);
    }
    for (var i = 0; i < polisi_capaian.r.length; i++) {
        $('#r-' + polisi_capaian.r[i]).prop('checked', true);
    }
    for (var i = 0; i < polisi_capaian.u.length; i++) {
        $('#u-' + polisi_capaian.u[i]).prop('checked', true);
    }
    for (var i = 0; i < polisi_capaian.d.length; i++) {
        $('#d-' + polisi_capaian.d[i]).prop('checked', true);
    }    

    onclickchg = 'chg_mod(\'' + result.id_kategori_urusetia + '\')';
    $("#id_kategori_urusetia").val(result.id_kategori_urusetia);
    $("#nama_kategori_urusetia").val(result.nama_kategori_urusetia);
    $("#mod_kategori_urusetia").prop("checked", checked).attr("onclick", onclickchg);
    $("#text_mod_kategori_urusetia").addClass(badge).text(result.mod_kategori_urusetia);
    $("#modalupdatekategoriurusetia").modal('show');
}

// FUNCTION DELETE

function del_rekod(i, token) {
    let id = i;

    var form = new FormData();
    // form.append("recordstatus", statusrekod);
    form.append("id_kategori_urusetia", id);
    form.append("updated_by", id_users_master);
    // console.log(id)
    var settings = {
        "url": host + "kategori_urusetia/delete",
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
                title: "Kemaskini Status Kategori Lantikan",
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
        token = localStorage.token;
        if (result.data.statusrekod == 1) {
            $('#text_statusrekod' + result.data.id_kategori_urusetia).text('Aktif').removeClass("badge-danger").addClass("badge-success");
        } else {
            $('#text_statusrekod' + result.data.id_kategori_urusetia).text('Tidak Aktif').removeClass("badge-success").addClass("badge-danger");
        }
        // saveLog(window.sessionStorage.id, "Update Data for [id_capaian = " + id + "], [FK_users = " + FK_users + "] at Tetapan Peranan & Capaian.", window.sessionStorage.browser);
    });
}
function resetForm() {
    document.getElementById('update_kategori_urusetia').reset();
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