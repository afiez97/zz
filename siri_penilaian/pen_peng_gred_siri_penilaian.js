$(function () {
    $.ajaxSetup({
        cache: false
    });
    checkSession();
    let token = window.localStorage.token;            
    $("#leftsidebar").load('../aside/aside_detail_siri_penilaian.html');
    let id_siri_penilaian = sessionStorage.id_siri_penilaian;

    let JSONgred = []; let pass_mark = ''; let pass_gred = [];
    resetForm();
    $("#buttonUptSiriPenilaian").removeClass('hidden').attr('onclick',"kemaskini('siripenilaian');");
    load_siri_penilaian(id_siri_penilaian,token,function(){        
        if(objSiriPenilaian.success){
            let data = objSiriPenilaian.data;
            $("#btnKembali").attr('onclick','kembali2(\'' + data.id_penilaian + '\')');
            $("#kembali").attr('onclick','kembali()');
            $("#kembali2").attr('onclick','kembali2(\'' + data.id_penilaian + '\')');
            $("#nama_penilaian").html(data.nama_penilaian + " SIRI " + data.kod+"/"+data.tahun);
            range_count = 0;

            if (data.gred != null && data.gred != '[]'){
                JSONgred = JSON.parse(data.gred);
                pass_mark = JSONgred[0].passmark;
                pass_gred = JSONgred[0].gred;

                if(pass_mark != '%'){

                    $("#switch_pass").attr('checked', true);
                    $("#pass_value").attr('disabled', false);
                    $("#pass_unit").attr('disabled', false);
                    $('#pass_value').val(pass_mark.slice(0, -1))
                }

                if(pass_gred.length > 0){
                    $("#switch_range").attr('checked', true);
                    $("#div_range").removeClass('hidden');
                    $.each(pass_gred, function(i,item){
                        add_range(item.gred, item.max_value);
                    });
                }

                // $("#switch_range").attr('checked', true);
                // $("#div_range").removeClass('hidden');
                // $.each(pass_gred, function(i,item){
                //     add_range(item.gred, item.max_value);
                // });
                
            }
            tinymce.remove("textarea#tamat_penilaian_textarea");
            tinymce.init({
                selector: 'textarea#tamat_penilaian_textarea',
                menubar: false,
                height: 250,
                submit_patch : false,
                add_form_submit_trigger : false,
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat ',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                  { value: 'First.Name', title: 'First Name' },
                  { value: 'Email', title: 'Email' },
                ],
                plugins: [
                    'image','media','table','lists',
                ],
                images_upload_url: host+'fileUpload',
                images_upload_credentials: true,
            });
            if (data.tamat_penilaian != null){
                $("#tamat_penilaian_textarea").val(data.tamat_penilaian);
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

function load_jenis_penilaian(token,returnValue){

    var settings = {
        "url": host+"jenis_penilaian/list",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": token
        },
      };
      var request = $.ajax(settings);

      request.done(function (response) {
        objJenisPenilaian = response;

        returnValue();
      });

      request.fail(function (response) {
      });
    
}

var confirmed = false;

$("#form_update").on('submit', function (e) {
    let token = localStorage.token;
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Kemaskini Gred Siri Penilaian",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {
            let id_siri_penilaian = sessionStorage.id_siri_penilaian;
            
            let count = 0;
            let gred = [];
            let test = [];
            while (count<range_count){
                count++;
                gred.push({
                    gred:$("#grade_range"+count).val(),
                    max_value:$("#value_range"+count).val(),
                });

            }
            if(count == range_count){
                test.push({
                    passmark: $("#pass_value").val().toString() + $("#pass_unit").val().toString(),
                    gred: gred
                });
            }

            let tamat_penilaian_textarea = tinymce.get('tamat_penilaian_textarea').getContent();
            var form = new FormData();
            form.append("id_siri_penilaian", id_siri_penilaian);
            form.append("gred", JSON.stringify(test));
            form.append("tamat_penilaian", tamat_penilaian_textarea);
            form.append("updated_by", id_users_master);

            var settings = {
                "url": host + "siri_penilaian/updateGred",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Authorization": token
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
                        title: "Kemaskini Gred Siri Penilaian",
                        text: "Berjaya!",
                        type: "success",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        // let token = result.token;
                        // localStorage.token = token;
                    });  
                } else {
                    swal({
                        title: "Kemaskini Penilaian",
                        text: "Gagal!",
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        $("#modaluptsiripenilaian").modal('hide');
                    });              
                }
            });
        });
    }
});

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
            "Authorization": "fasiliti " + token
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

function pass_mark(){
    if ($('#switch_pass').is(':checked')) {
        $("#pass_value").attr('disabled', false);
        $("#pass_unit").attr('disabled', false);
    } else {
        $("#pass_value").attr('disabled', true);
        $("#pass_unit").attr('disabled', true);
    }
}

function range(){
    if ($('#switch_range').is(':checked')) {
        $("#div_range").removeClass('hidden');
    } else {
        $("#div_range").addClass('hidden');
    }
}
$("#add_range").on('click', function(){
    add_range(0,0);
});

function change_range(count){

    $("#rangeBefore"+(count+1)).html($("#value_range"+count).val());
}

function del_range(count){
    initcount = count;
    while(count <= range_count){
        if (initcount == count) {
            $("#value_range"+count).val($("#value_range"+(count+1)).val());
            $("#grade_range"+count).val($("#grade_range"+(count+1)).val());
        } else {
            $("#rangeBefore"+count).html($("#value_range"+(count-1)).val());
            $("#value_range"+count).val($("#value_range"+(count+1)).val());
            $("#grade_range"+count).val($("#grade_range"+(count+1)).val());
        }
        count++;
    }
    $("#divRange"+range_count).html('');
    range_count--;
}

function add_range(gred,max_value){
    range_count++;
    let add_range = `
                        <div id="divRange`+range_count+`">
                            <div class="mb-3">
                                Skala `+range_count+` : Dari: <span id="rangeBefore`+range_count+`">0</span>% hingga : <input onchange="change_range(`+range_count+`);" id="value_range`+range_count+`" type="number" > %
                                <div class="float-md-end"><a onclick="del_range(`+range_count+`);" class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></a></div>
                            </div>
                            <p>
                                <label for="grade_range`+range_count+`" class="mb-3">Gred</label>
                                <input id="grade_range`+range_count+`" type="text" class="form-control">
                            </p>
                            <hr>
                        </div>
                    `;
    $("#div_add_range").append(add_range);
    if (gred != '0' && max_value != '0'){
        $("#value_range"+(range_count)).val(max_value);
        $("#grade_range"+(range_count)).val(gred);
    }
    $("#rangeBefore"+range_count).html($("#value_range"+(range_count-1)).val());


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

function load_siri_penilaian(id_siri_penilaian,token,returnValue){

    var form = new FormData();
    form.append("id_siri_penilaian", id_siri_penilaian);
    var settings = {
        "url": host+"siri_penilaian/show",
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
        objSiriPenilaian = JSON.parse(response);

        console.log(objSiriPenilaian);

        returnValue();
      });

      request.fail(function (response) {
          swal({
              title: "Tiada Data Penilaian",
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

function load_penyelaras(token,returnValue){
    var settings = {
        "url": host+"usersListAll",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": window.localStorage.token
        },
      };
      
      $.ajax(settings).done(function (response) {
        objPenyelaras = response;

        returnValue();
      });
}

function load_kluster(token,returnValue){
    var form = new FormData();
    form.append('FK_users', id_users_master);
    var settings = {
        "url": host+"penyelaras/listKlusterByPenyelaras",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": "penyelaras "+token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
      };
      var request = $.ajax(settings);

      request.done(function (response) {
        objKluster = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
          swal({
              title: "Anda Masih Belum Berdaftar Di Bawah Mana-Mana Program/Pusat Penilaian",
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

function load_kategori_penilaian(token,returnValue){
    var settings = {
        "url": host+"kategori_penilaian/list",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": "penyelaras "+token
        },
      };
      var request = $.ajax(settings);

      request.done(function (response) {
        objKategori = response;

        returnValue();
      });

      request.fail(function (response) {
          swal({
              title: "Tiada Kategori Yang Berdaftar",
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

function load_urusetia(token){
    var settings = {
        "url": host+"usersgovsIntanList",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": "penyelaras "+token
        },
      };
      var request = $.ajax(settings);

      request.done(function (response) {
        objUrusetia = response;
        if(objUrusetia.success){
            $("#FK_users").html('<option value="">Pilih Pegawai INTAN</option>');
            let dataUrusetia = objUrusetia.data;
            
            $.each(dataUrusetia,function(i,field){
                $("#FK_users").append('<option value="'+field.id_users+'">'+field.nama+' ('+ field.no_kad_pengenalan +')</option>');
            });
            
            $("#FK_users").select2({
                width: null,
                containerCssClass: ':all:'
            });
        }
      });

      request.fail(function (response) {
          swal({
              title: "Tiada Pengguna INTAN Yang Berdaftar",
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

function load_kategori_urusetia(token){
    var settings = {
        "url": host+"kategori_urusetia/list",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": "penyelaras "+token
        },
      };
      var request = $.ajax(settings);

      request.done(function (response) {
        objKategoriUrusetia = response;
        if(objKategoriUrusetia.success){
            $("#FK_kategori_urusetia").html('<option value="">Pilih Kategori Urusetia</option>');
            let dataKategoriUrusetia = objKategoriUrusetia.data;
            
            $.each(dataKategoriUrusetia,function(i,field){
                $("#FK_kategori_urusetia").append('<option value="'+field.id_kategori_urusetia+'">'+field.nama_kategori_urusetia+'</option>');
            });
            
            $("#FK_kategori_urusetia").select2({
                width: null,
                containerCssClass: ':all:'
            });
        }
      });

      request.fail(function (response) {
          swal({
              title: "Tiada Pengguna INTAN Yang Berdaftar",
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

$("#addListFK_urusetia").click(function () {
    let token = window.localStorage.token;
    if (($("#FK_users").val() != "") && ($("#FK_kategori_urusetia").val() != "")) {
        let append = '{"FK_kategori_urusetia": "' + $("#FK_kategori_urusetia").val() + '", "FK_users": "' + $("#FK_users").val() + '", "nama": "' + $("#nama").val() + '", "no_kad_pengenalan": "' + $("#no_kad_pengenalan").val() + '"}';
        if ((sessionStorage.urusetia == null) || (sessionStorage.urusetia == '')) {
            sessionStorage.urusetia = append;
        } else {
            if (sessionStorage.urusetia.indexOf(append) < 0) {
                sessionStorage.urusetia = sessionStorage.urusetia + ', ' + append;                
            }
        }
    }
    let JSONurusetia = "[" + sessionStorage.urusetia + "]";
    $("#urusetia").val(JSONurusetia);
    if ($("#FK_kategori_urusetia").val() == 1){
        tableItem("tablePengesahan", "urusetia", JSONurusetia, token);
    } else if ($("#FK_kategori_urusetia").val() == 2){
        tableItem("tablePenggubal", "urusetia", JSONurusetia, token);
    } else if ($("#FK_kategori_urusetia").val() == 3){
        tableItem("tablePenilai", "urusetia", JSONurusetia, token);
    }
    $('#FK_users').val("");
    $('#FK_kategori_urusetia').val("");
    load_urusetia(token);
    load_kategori_urusetia(token);
});

function tableItem(item, rem, JSONitem, token) {
    $("#" + item).empty();
    $("#" + item).removeClass("hidden");
    var columns = [
                    { "name": "bil", "title": "Bil" }, 
                    { "name": "nama", "title": "Nama" },
                    { "name": "no_kad_pengenalan", "title": "No. KP" },
                    { "name": "upt_btn", "title": "Padam" },
    ];
    var list = [];
    let bil = 1;
    // let count = JSON.parse(JSONitem).length;
    $.each(JSON.parse(JSONitem), function (i, field) {
        // let upt_btn = '<button type="button" class="btn btn-xs btn-danger" onclick="remItem(\'' + rem + '\',\'' + field.FK_kategori_urusetia + '\',\'' + field.FK_users + '\',\'' + field.nama + '\',\'' + field.no_kad_pengenalan + '\')" data-whatever="@getbootstrap"><i class="ti-minus"></i></button> ';
        let upt_btn = '<button type="button" class="btn btn-danger btn-square btn-sm" onclick="remItem(\'' + item + '\',\'' + rem + '\',\'' + i + '\')" data-whatever="@getbootstrap"><i class="ti-minus"></i></button> ';
        
        if (item == "tablePengesahan" && field.FK_kategori_urusetia == "1")  {
            list.push({
                bil: bil++, nama: field.nama, no_kad_pengenalan: field.no_kad_pengenalan, upt_btn: upt_btn
            });
        }
        if (item == "tablePenggubal" && field.FK_kategori_urusetia == "2")  {
            list.push({
                bil: bil++, nama: field.nama, no_kad_pengenalan: field.no_kad_pengenalan, upt_btn: upt_btn
            });
        }
        if (item == "tablePenilai" && field.FK_kategori_urusetia == "3")  {
            list.push({
                bil: bil++, nama: field.nama, no_kad_pengenalan: field.no_kad_pengenalan, upt_btn: upt_btn
            });
        }
    });
    $("#" + item).html('');
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
        if (i != index) {
            if (temp == "") {
                temp = '{"FK_kategori_urusetia": "' + field.FK_kategori_urusetia + '", "FK_users": "' + field.FK_users + '", "nama": "' + field.nama + '", "no_kad_pengenalan": "' + field.no_kad_pengenalan + '"}';
            } else {
                temp = temp + ', ' + '{"FK_kategori_urusetia": "' + field.FK_kategori_urusetia + '", "FK_users": "' + field.FK_users + '", "nama": "' + field.nama + '", "no_kad_pengenalan": "' + field.no_kad_pengenalan + '"}';
            }
        }
    })
    let JSONtemp = '[' + temp + ']';
    $("#" + jenis_item).val(JSONtemp);
    sessionStorage.urusetia = temp;
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

    let listHtml = ["tablePengesahan", "tablePenggubal", "tablePenilai",
    ];
    $.each(listHtml, function (i, item) {
        $("#" + item).html("");
    });

    // document.getElementById('register').reset();
}