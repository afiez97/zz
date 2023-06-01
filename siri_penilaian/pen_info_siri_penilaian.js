$(function () {
    $.ajaxSetup({
        cache: false
    });    
    checkSession();
    let token = window.localStorage.token;            
    $("#leftsidebar").load('../aside/aside_detail_siri_penilaian.html');
    let id_siri_penilaian = sessionStorage.id_siri_penilaian;
    resetForm();
    $("#buttonUptSiriPenilaian").removeClass('hidden').attr('onclick',"kemaskini('siripenilaian');");
    load_siri_penilaian(id_siri_penilaian,token,function(){        
        if(objSiriPenilaian.success){
            let data = objSiriPenilaian.data;
            $("#btnKembali").attr('onclick','kembali2(\'' + data.id_penilaian + '\')');
            $("#txt_nama_penilaian").html(data.nama_penilaian.toUpperCase());
            $("#nama_penilaian").html(data.nama_penilaian + " SIRI " + data.kod+"/"+data.tahun);
            $("#kod_penilaian").html(data.kod_penilaian);
            $("#txt_nama_kategori_penilaian").html(data.nama_kategori_penilaian);
            $("#txt_kod_siri_penilaian").html(data.kod_siri_penilaian);
            $("#txt_tahun").html(data.tahun);
            $("#txt_nosiri").html(data.kod+"/"+data.tahun);
            $("#txt_keterangan").html(data.keterangan);
            $("#txt_jenis_penilaian").html(data.nama_jenis_penilaian);
            $("#txt_keterbukaan").html(data.keterbukaan);
            $("#txt_tarikh_permohonan").html(formatDate(data.tarikh_mula_mohon) + " - " + formatDate(data.tarikh_tamat_mohon));

            $('#upt_tahun').val(data.tahun);
            $('#upt_nosiri').val(data.nosiri);
            $('#upt_keterangan').val(data.keterangan);
            $("input[name=jenis_penilaian][value='"+data.jenis_penilaian+"']").prop("checked",true);
            $("input[name=upt_keterbukaan][value='"+data.keterbukaan+"']").prop("checked",true);
            $('#tarikh_mula_mohon').val(data.tarikh_mula_mohon);
            $('#tarikh_tamat_mohon').val(data.tarikh_tamat_mohon);
            // $('#upt_jenis_keterangan').val(data.);


            $("#FK_kategori_penilaian").html(data.id_kategori_penilaian);
            $("#nama_kategori_penilaian").html(data.nama_kategori_penilaian);
            $("#FK_kluster").html(data.id_kluster);
            $("#FK_penilaian").html(data.id_penilaian);
            $("#nama_penyelaras").html(data.nama);
            $("#notel_kerajaan_penyelaras").html(data.notel_kerajaan);
            $("#emel_kerajaan_penyelaras").html(data.emel_kerajaan);

            load_jenis_penilaian(window.localStorage.token, function(){
                if(objJenisPenilaian.success){

                    let dataObj = objJenisPenilaian.data;

                    $('#divJenisPenilaian').html('');
                    $.each(dataObj, function(i,item){
                        let checked = '';

                        if(data.jenis_penilaian == item.id_jenis_penilaian){ checked = 'checked="checked"';}

                        $('#divJenisPenilaian').append(`<div class="radio inlineblock me-3">
                        <input `+checked+` type="radio" name="upt_jenis_penilaian" id="upt_jenis_penilaian_`+item.id_jenis_penilaian+`" class="with-gap" value="`+item.id_jenis_penilaian+`">
                        <label for="upt_jenis_penilaian_`+item.id_jenis_penilaian+`">`+item.nama_jenis_penilaian+`</label>
                    </div>  `);
                    });

                }
            });
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

function daftar(content) {
    let token = window.localStorage.token;
    load_urusetia(token);
    load_kategori_urusetia(token);
    var listSettings = ["siripenilaian"];
    $.each(listSettings, function (i, item) {
        switch (item) {
            case content: $('#modaldaftar' + item).modal('show'); break;
        }
    });
}

function kemaskini(content) {

    var listSettings = ["siripenilaian"];
    $.each(listSettings, function (i, item) {
        switch (item) {
            case content: $('#modalupt'+ item).modal('show'); break;
        }
    });
   
}

var confirmed = false;

// FUNCTION REGISTER

// $("#register").on('submit', function (e) {
//     let token = localStorage.token;
//     let $this = $(this);
//     if (!confirmed) {
//         e.preventDefault();
//         swal({
//             title: "Daftar Siri Penilaian",
//             text: "Anda Pasti Untuk Simpan?",
//             type: "question",
//             showCancelButton: true,
//             confirmButtonText: "Ya",
//             cancelButtonText: "Tidak",
//             closeOnConfirm: true,
//             allowOutsideClick: false,
//             html: false
//         }).then(function () {
//             let FK_penilaian = sessionStorage.id_penilaian;
//             let FK_kategori_penilaian = $("#FK_kategori_penilaian").val();
//             let FK_kluster = $("#FK_kluster").val();
//             let bil_max_calon = $("#bil_max_calon").val();
//             let tarikh_penilaian = $("#tarikh_penilaian").val();
//             let waktu_mula = $("#waktu_mula").val();
//             let waktu_tamat = $("#waktu_tamat").val();
//             let FK_urusetia = $("#urusetia").val();

//             var form = new FormData();
//             // formData.append("key","mSideDiary");
//             form.append("FK_penilaian", FK_penilaian);
//             form.append("FK_kategori_penilaian", FK_kategori_penilaian);
//             form.append("FK_kluster", FK_kluster);
//             form.append("bil_max_calon", bil_max_calon);
//             form.append("tarikh_penilaian", tarikh_penilaian);
//             form.append("waktu_mula", waktu_mula);
//             form.append("waktu_tamat", waktu_tamat);
//             form.append("FK_urusetia", FK_urusetia);
//             form.append("created_by", id_users_master);
//             form.append("updated_by", id_users_master);

//             var settings = {
//                 "url": host + "siri_penilaian/add",
//                 "method": "POST",
//                 "timeout": 0,
//                 "headers": {
//                     "Authorization": "fasiliti " + token
//                 },
//                 "processData": false,
//                 "mimeType": "multipart/form-data",
//                 "contentType": false,
//                 "data": form
//             };

//             $.ajax(settings).done(function (response) {
//                 result = JSON.parse(response);
                
//                 if (result.success) {                    
//                     $.each(JSON.parse(FK_urusetia),function(i, item){
//                         var formUS = new FormData();
//                         formUS.append('FK_kategori_urusetia', item.FK_kategori_urusetia);
//                         formUS.append('FK_users', item.FK_users);
//                         formUS.append('FK_siri_penilaian', result.data);
//                         formUS.append("created_by", id_users_master);
//                         formUS.append("updated_by", id_users_master);
//                         var settings = {
//                             "url": host + "urusetia/add",
//                             "method": "POST",
//                             "timeout": 0,
//                             "headers": {
//                                 "Authorization": "fasiliti " + token
//                             },
//                             "processData": false,
//                             "mimeType": "multipart/form-data",
//                             "contentType": false,
//                             "data": formUS
//                         };
//                         var request = $.ajax(settings);
//                         request.done(function(response){});
//                     });
//                     swal({
//                         title: "Daftar Penilaian",
//                         text: "Berjaya!",
//                         type: "success",
//                         closeOnConfirm: true,
//                         allowOutsideClick: false,
//                         html: false
//                     }).then(function () {
//                         $("#modaldaftarsiripenilaian").modal('hide');
//                         tableSiriPenilaian(token);
//                     });  
//                 } else {
//                     swal({
//                         title: "Daftar Siri Penilaian",
//                         text: "Gagal!",
//                         type: "error",
//                         closeOnConfirm: true,
//                         allowOutsideClick: false,
//                         html: false
//                     }).then(function () {
//                         $("#modaldaftarsiripenilaian").modal('hide');
//                     });              
//                 }
//             });
//         });
//     }
// });

$("#updates").on('submit', function (e) {
    let token = localStorage.token;
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Kemaskini Penilaian",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {
            let id_siri_penilaian = sessionStorage.id_siri_penilaian;
            let FK_kategori_penilaian = $("#FK_kategori_penilaian").text();
            let FK_kluster = $("#FK_kluster").text();
            let FK_penilaian = $("#FK_penilaian").text();

            let tahun = $("#upt_tahun").val();
            let nosiri = $("#upt_nosiri").val();
            let keterangan = $("#upt_keterangan").val();

            let jenis_penilaian_val = '';
            let jenis_penilaian = $("input[name='upt_jenis_penilaian']:checked");
            if (jenis_penilaian.length > 0) {
                jenis_penilaian_val = jenis_penilaian.val();
            }

            let keterbukaan_val = '';
            let keterbukaan = $("input[name='upt_keterbukaan']:checked");
            if (keterbukaan.length > 0) {
                keterbukaan_val = keterbukaan.val();
            }

            let tarikh_mula_mohon = $("#tarikh_mula_mohon").val();
            let tarikh_tamat_mohon = $("#tarikh_tamat_mohon").val();

            var form = new FormData();
            form.append("id_siri_penilaian", id_siri_penilaian);
            form.append("FK_kategori_penilaian", FK_kategori_penilaian);
            form.append("FK_kluster", FK_kluster);
            form.append("FK_penilaian", FK_penilaian);
            form.append("tahun", tahun);
            form.append("nosiri", nosiri);
            form.append("keterangan", keterangan);
            form.append("jenis_penilaian", jenis_penilaian_val);
            form.append("updated_by", id_users_master);

            upt_siri_penilaian(form,function(){
                result = objSiriPenilaian;
                if (result.success) {                    
                    swal({
                        title: "Kemaskini Siri Penilaian",
                        text: "Berjaya!",
                        type: "success",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {

                        let token = window.localStorage.token;

                        // localStorage.token = token;

                        load_siri_penilaian(id_siri_penilaian,token,function(){       

                            if(objSiriPenilaian.success){
                                let data = objSiriPenilaian.data;
                                $("#txt_nama_penilaian").html(data.nama_penilaian.toUpperCase());
                                $("#nama_penilaian").html(data.nama_penilaian);
                                $("#kod_penilaian").html(data.kod_penilaian);

                                $("#txt_nama_kategori_penilaian").html(data.nama_kategori_penilaian);
                                $("#txt_kod_siri_penilaian").html(data.kod_siri_penilaian);
                                $("#txt_tahun").html(data.tahun);
                                $("#txt_nosiri").html(data.kod+"/"+data.tahun);
                                $("#txt_keterangan").html(data.keterangan);
                                $("#txt_jenis_penilaian").html(data.nama_jenis_penilaian);
                                $("#txt_keterbukaan").html(data.keterbukaan);
                                $('#upt_tahun').val(data.tahun);
                                $('#upt_nosiri').val(data.nosiri);
                                $('#upt_keterangan').val(data.keterangan); 
                                $("input[name=jenis_penilaian][value='"+data.jenis_penilaian+"']").prop("checked",true);
                                $("#FK_kategori_penilaian").html(data.id_kategori_penilaian);
                                $("#FK_kluster").html(data.id_kluster);
                                $("#FK_penilaian").html(data.id_penilaian);
                                $("#nama_kategori_penilaian").html(data.nama_kategori_penilaian);
                                $("#nama_penyelaras").html(data.nama);
                                $("#notel_kerajaan_penyelaras").html(data.notel_kerajaan);
                                $("#emel_kerajaan_penyelaras").html(data.emel_kerajaan);                                
                                $("#txt_tarikh_permohonan").html(formatDate(data.tarikh_mula_mohon) + " - " + formatDate(data.tarikh_tamat_mohon));
                                // console.log('balik');
            
                                load_jenis_penilaian(window.localStorage.token, function(){

                                    if(objJenisPenilaian.success){
                    
                                        let dataObj = objJenisPenilaian.data;
                    
                                        $('#divJenisPenilaian').html('');
                                        $.each(dataObj, function(i,item){
                                            let checked = '';
            
                                            if(data.jenis_penilaian == item.id_jenis_penilaian){ checked = 'checked="checked"';}
            
                                            $('#divJenisPenilaian').append(`<div class="radio inlineblock me-3">
                                            <input `+checked+` type="radio" name="upt_jenis_penilaian" id="upt_jenis_penilaian_`+item.id_jenis_penilaian+`" class="with-gap" value="`+item.id_jenis_penilaian+`">
                                            <label for="upt_jenis_penilaian_`+item.id_jenis_penilaian+`">`+item.nama_jenis_penilaian+`</label>
                                        </div>  `);
                                        });
                    
                                    }
                                });
                            }
                        });
                        $("#modaluptsiripenilaian").modal('hide');

                        // tableSiriPenilaian(token);

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

        // console.log(objSiriPenilaian);

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

$('input:radio[name="upt_keterbukaan"]').change(
    function(){
        if ($("#tertutup").is(':checked')) {
            $("#tarikh_mula_mohon").prop('disabled', true);
            $("#tarikh_tamat_mohon").prop('disabled', true);
        } else {
            $("#tarikh_mula_mohon").prop('disabled', false);
            $("#tarikh_tamat_mohon").prop('disabled', false);
        }
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