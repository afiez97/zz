var penilaian_FK_penyelaras, penilaian_FK_kluster;
$(function () {
    $.ajaxSetup({
        cache: false
    });
    checkSession();
    let token = window.localStorage.token;
    if(sessionStorage.capaian == capaian[2])    {
        $("#buttonDaftarSiriPenilaian").removeClass('hidden').attr('onclick',"daftar('siripenilaian');");
        $("#buttonUptPenilaian").removeClass('hidden').attr('onclick',"kemaskini('penilaian');");
    }
    if(sessionStorage.capaian == capaian[0])    {
        $("#buttonUptPenilaian").removeClass('hidden').attr('onclick',"kemaskini('penilaian');");
    }
    $("#leftsidebar").load('../aside/aside_pen_list_siri_penilaian.html');
    let id_penilaian = sessionStorage.id_penilaian;
    resetForm();
    sessionStorage.removeItem('PK_bank_soalan');
    sessionStorage.removeItem('FK_infodetail');
    load_penilaian(id_penilaian,window.localStorage.token,function(){
        if(objPenilaian.success){
            let data = objPenilaian.data;

            let path = "../../api_penilaian/public/logo/";
            let logo = "default/JATA_NEGARA_MALAYSIA.png";
            let logo_default = "default/default.png";

            if(data.logo != null  && data.logo != ""){
                logo = data.logo;
                logo_default = data.logo;
                $('#btn-remove').removeClass('hidden');
                $('#divLogo').html('');

                let append =   `<span class="input-group-text"><i class=" text-muted material-icons">add_a_photo</i></span>
                                <span  id="btn-upload" class="input-group-text input-info-disabled disabled" style="cursor:not-allowed"> 
                                    <a class="text-white " id="url-logo" >Muat Naik</a> 
                                </span>
                                <span class='input-group-text' style='cursor:not-allowed;'>`+logo_default+`</span>
                                <span id='btn-remove' onclick='removeUptLogo();' class='input-danger btn-danger input-group-text' style='cursor:pointer'>
                                    <i class=' text-white material-icons'>delete_forever</i>
                                </span>`;


                // $('#btn-upload').off("click").addClass('input-info-disabled disabled').removeClass('input-info btn-info').removeAttr("onclick").css('cursor','not-allowed');
                // $("#url-logo").removeAttr('href');
                // $('#divLogo').append("<span class='input-group-text' style='cursor:not-allowed;'>"+logo_default+"</span><span id='btn-remove' onclick='removeUptLogo();' class='input-danger btn-danger input-group-text' style='cursor:pointer'><i class=' text-white material-icons'>delete_forever</i></span>");
                $('#divLogo').append(append);
            }

            $("#url_logo_1").attr("href", path+logo);
            $("#logo_1").attr("src", path+logo);
            $("#upt_logo_1").attr("src", path+logo_default);
            
            $("#kategori").html(data.nama_kategori_penilaian);
            $("#nama_penilaian_1").html(data.nama_penilaian);
            $("#kod_penilaian_1").html(data.kod_penilaian);
            $("#nama_kluster_1").html(data.nama_kluster);
                                
            $("#nama_penilaian").html(data.nama_penilaian);
            $("#kod_penilaian").html(data.kod_penilaian);
            $("#FK_kategori_penilaian").html(data.id_kategori_penilaian);
            $("#nama_kategori_penilaian").html(data.nama_kategori_penilaian);
            $("#FK_kluster").html(data.id_kluster);
            $("#nama_penyelaras").html(data.nama);
            $("#notel_kerajaan_penyelaras").html(data.notel_kerajaan);
            $("#emel_kerajaan_penyelaras").html(data.emel_kerajaan);
            $("#kod_siri_penilaian").val(data.kod_penilaian);

            //DETAILS MODAL KEMASKINI
            $("#upt_nama_penilaian").val(data.nama_penilaian);
            $("#upt_kod_penilaian").val(data.kod_penilaian);
            $("#upt_FK_kluster").val(data.id_kluster);
            $("#upt_nama_kluster").val(data.nama_kluster);
            penilaian_FK_penyelaras = data.FK_penyelaras;
            penilaian_FK_kluster = data.FK_kluster;
            // $("#upt_logo_1").prop('src',data.logo);
            load_kategori_penilaian(token,data.id_kategori_penilaian,function(){
                if(objKategori.success){
                    let dataKategori = objKategori.data;                            
                    $.each(dataKategori,function(i,field){
                        if(data.id_kategori_penilaian == field.id_kategori_penilaian){
                            $("#upt_nama_kategori_penilaian").val(field.nama_kategori_penilaian);
                            $("#upt_FK_kategori_penilaian").val(field.id_kategori_penilaian);
                            selected = 'selected';
                        }
                    });
                }
            });

        }
    });

    load_jenis_penilaian(window.localStorage.token, function(){
        if(objJenisPenilaian.success){

            let data = objJenisPenilaian.data;

            $('#divJenisPenilaian').html('');
            $.each(data, function(i,item){
                $('#divJenisPenilaian').append(`<div class="radio inlineblock me-3">
                <input type="radio" required name="jenis_penilaian" id="jenis_penilaian_`+item.id_jenis_penilaian+`" class="with-gap" value="`+item.id_jenis_penilaian+`">
                <label for="jenis_penilaian_`+item.id_jenis_penilaian+`">`+item.nama_jenis_penilaian+`</label>
            </div>  `);
            });

        }
    });
    load_tahun_siri();        
    tableSiriPenilaian(window.localStorage.token);
    // users(noic_master,token,function(){
    //     if(dataUsers.success){
    //     }
    //     else{
    //         reject_load();
    //     }
    // });

    load_penyelaras(window.localStorage.token,FK_kluster_master,function(){
        $.each(objPenyelaras.data, function(i, item){
            let selected = '';
            if (item.FK_users == penilaian_FK_penyelaras){
                selected = 'selected';
            }
            if(sessionStorage.capaian == capaian[2]){
                if(item.FK_kluster == FK_kluster_master){
                    $('#upt_FK_penyelaras').append('<option '+selected+' value="'+item.FK_users+'">'+item.nama.toUpperCase()+'</option>');
                }
            } else {
                if(item.FK_kluster == penilaian_FK_kluster){
                    $('#upt_FK_penyelaras').append('<option '+selected+' value="'+item.FK_users+'">'+item.nama.toUpperCase()+'</option>');
                }
            }
        });
    });
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

function load_tahun_siri(){

    let curr = new Date().getFullYear();
    let run = 0;

    $('#tahun').append('<option value="">Pilih Tahun</option>');
    for(let i = 0; i <= 5; i++){

        run = curr + i;
        $('#tahun').append('<option value="'+run+'">'+run+'</option>');

    }
    
}

// $("#tahun").on('change', function(){
//     let token = window.localStorage.token;

//     let tahun = $('#tahun').val();
//     generateNosiri(token,tahun, function(){
//         if(dataNosiri.success){
//             let data = dataNosiri.data;
//             let nosiri = data.nosiri;

//             $('#nosiri').val(nosiri);
//         }
//     })

// });

// function generateNosiri(token,tahun,returnValue){
//     var form = new FormData();
//     form.append('tahun', tahun);

//     var settings = {
//         "url": host+"siri_penilaian/nosiri",
//         "method": "POST",
//         "timeout": 0,
//         "headers": {
//             "Authorization": window.localStorage.token
//         },
//         "processData": false,
//         "mimeType": "multipart/form-data",
//         "contentType": false,
//         "data": form
//       };
//       var request = $.ajax(settings);

//       request.done(function (response) {
        
//         dataNosiri = response;

//         returnValue();
//       });

//       request.fail(function (response) {
        
//       });
// }

$("#btnKembali").click(function(){
    kembali();
});

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

    var listSettings = ["penilaian"];
    $.each(listSettings, function (i, item) {
        switch (item) {
            case content: $('#modalupt'+ item).modal('show'); break;
        }
    });
   
}

var confirmed = false;

// FUNCTION REGISTER

$("#register").on('submit', function (e) {
    let token = localStorage.token;
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Daftar Siri Penilaian",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {
            let FK_penilaian = sessionStorage.id_penilaian;
            // let nosiri = $('#nosiri').val();
            let tahun = $('#tahun').val();
            let kod_siri_penilaian = $('#kod_siri_penilaian').val();
            let kod = $('#kod_siri_penilaian').val();
            let keterangan = $('#keterangan').val();
            let jenis_penilaian_val = '';
            let jenis_penilaian = $("input[name='jenis_penilaian']:checked");
            if (jenis_penilaian.length > 0) {
                jenis_penilaian_val = jenis_penilaian.val();
            }

            let FK_kategori_penilaian = $("#FK_kategori_penilaian").html();
            let FK_kluster = $("#FK_kluster").html();

            var form = new FormData();
            form.append("FK_penilaian", FK_penilaian);
            form.append("FK_kategori_penilaian", FK_kategori_penilaian);
            form.append("FK_kluster", FK_kluster);
            form.append("tahun", tahun);
            form.append("kod_siri_penilaian", kod_siri_penilaian);
            form.append("kod", kod);
            form.append("keterangan", keterangan);
            form.append("jenis_penilaian", jenis_penilaian_val);
            form.append("created_by", id_users_master);
            form.append("updated_by", id_users_master);

            var settings = {
                "url": host + "siri_penilaian/add",
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
                // console.log(result);
                if (result.success) {
                    swal({
                        title: "Daftar Penilaian",
                        text: "Berjaya!",
                        type: "success",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        document.getElementById('register').reset();
                        $("#modaldaftarsiripenilaian").modal('hide');
                        tableSiriPenilaian(token);
                    });  
                } else {
                    swal({
                        title: "Daftar Siri Penilaian",
                        text: "Gagal!",
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        document.getElementById('register').reset();
                        $("#modaldaftarsiripenilaian").modal('hide');
                    });              
                }
            });
        });
    }
});

//FUNCTION UPDATE

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
            let FK_penilaian = sessionStorage.id_penilaian;
            let FK_kategori_penilaian = $("#upt_FK_kategori_penilaian").val();
            let nama_penilaian = $("#upt_nama_penilaian").val();
            let kod_penilaian = $("#upt_kod_penilaian").val();
            let FK_kluster = $("#upt_FK_kluster").val();
            let FK_penyelaras = $("#upt_FK_penyelaras").val();
            let logo = $("#upt_logo")[0].files[0];

            var form = new FormData();
            form.append("id_penilaian", FK_penilaian);
            form.append("FK_kategori_penilaian", FK_kategori_penilaian);
            form.append("FK_kluster", FK_kluster);
            form.append("FK_penyelaras", FK_penyelaras);
            form.append("nama_penilaian", nama_penilaian);
            form.append("kod_penilaian", kod_penilaian);
            form.append("logo", logo);
            form.append("updated_by", id_users_master);

            var settings = {
                "url": host + "penilaian/update",
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
                        title: "Kemaskini Penilaian",
                        text: "Berjaya!",
                        type: "success",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {

                        let token = localStorage.token;

                        load_penilaian(FK_penilaian,token,function(){
                            
                            if(objPenilaian.success){
                                let data = objPenilaian.data;
            
                                let path = "../../api_penilaian/public/logo/";
                                let logo = "default/JATA_NEGARA_MALAYSIA.png";
                                let logo_default = "default/default.png";
            
                                if(data.logo != null  && data.logo != ""){
                                    logo = data.logo;
                                    logo_default = data.logo;
                                    $('#btn-remove').removeClass('hidden');

                                    $('#divLogo').html('');

                                    let append =   `<span class="input-group-text"><i class=" text-muted material-icons">add_a_photo</i></span>
                                                    <span  id="btn-upload" class="input-group-text input-info-disabled disabled" style="cursor:not-allowed"> 
                                                        <a class="text-white " id="url-logo" >Muat Naik</a> 
                                                    </span>
                                                    <span class='input-group-text' style='cursor:not-allowed;'>`+logo_default+`</span>
                                                    <span id='btn-remove' onclick='removeUptLogo();' class='input-danger btn-danger input-group-text' style='cursor:pointer'>
                                                        <i class=' text-white material-icons'>delete_forever</i>
                                                    </span>`;
                                    $('#divLogo').append(append);
                                }
            
                                $("#url_logo_1").attr("href", path+logo);
                                $("#logo_1").attr("src", path+logo);
                                $("#upt_logo_1").attr("src", path+logo_default);
                                
                                $("#kategori").html(data.nama_kategori_penilaian);
                                $("#nama_penilaian_1").html(data.nama_penilaian);
                                $("#kod_penilaian_1").html(data.kod_penilaian);
                                $("#nama_kluster_1").html(data.nama_kluster);
                                                    
                                $("#nama_penilaian").html(data.nama_penilaian);
                                $("#kod_penilaian").html(data.kod_penilaian);
                                $("#FK_kategori_penilaian").html(data.id_kategori_penilaian);
                                $("#nama_kategori_penilaian").html(data.nama_kategori_penilaian);
                                $("#FK_kluster").html(data.id_kluster);
                                $("#nama_penyelaras").html(data.nama);
                                $("#notel_kerajaan_penyelaras").html(data.notel_kerajaan);
                                $("#emel_kerajaan_penyelaras").html(data.emel_kerajaan);
            
                                //DETAILS MODAL KEMASKINI
                                $("#upt_nama_penilaian").val(data.nama_penilaian);
                                $("#upt_kod_penilaian").val(data.kod_penilaian);
                                $("#upt_FK_kluster").val(data.id_kluster);
                                $("#upt_nama_kluster").val(data.nama_kluster);
                                penilaian_FK_penyelaras = data.FK_penyelaras;
                                penilaian_FK_kluster = data.FK_kluster;
                                
                                load_kategori_penilaian(token,data.id_kategori_penilaian,function(){
                                    if(objKategori.success){
                                        $("#upt_FK_kategori_penilaian").html('<option value="">Pilih Kategori Penilaian</option>');
                                        let dataKategori = objKategori.data;
                                        
                                        $.each(dataKategori,function(i,field){
                    
                                            let selected = '';
                                            if(data.id_kategori_penilaian == field.id_kategori_penilaian){
                                                selected = 'selected';
                                            }
                    
                                            $("#upt_FK_kategori_penilaian").append('<option value="'+field.id_kategori_penilaian+'" '+selected+'>'+field.nama_kategori_penilaian+'</option>');
                    
                                        });
                                        
                                    }
                                });
                            }
                        });
                        $("#modaluptpenilaian").modal('hide');

                        tableSiriPenilaian(token);

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
                        $("#modaluptpenilaian").modal('hide');
                    });              
                }
            });
        });
    }
});

function tableSiriPenilaian(token) {
    var columns = [
        { "name": "bil", "title": "Bil" },
        // { "name": "kod_siri_penilaian", "title": "Kod Siri Penilaian" },
        { "name": "nosiri", "title": "Siri Penilaian" },
        // { "name": "tahun", "title": "Tahun" },
        // { "name": "nosiri", "title": "nosiri" },
        // { "name": "kod_siri_penilaian_auto", "title": "Kod" },
        { "name": "keterangan", "title": "Keterangan", "breakpoints": "md sm xs" },
        { "name": "jenis_penilaian", "title": "Jenis Penilaian", "breakpoints": "sm xs" },
        // { "name": "waktu_penilaian", "title": "Waktu Penilaian" },
        // { "name": "urusetia_penggubal", "title": "Jawatankuasa Penggubal Soalan", "breakpoints": "lg md sm xs"  },
        // { "name": "urusetia_penilai", "title": "Jawatankuasa Penilai", "breakpoints": "lg md sm xs"  },
        // { "name": "urusetia_panel", "title": "Panel Penilai", "breakpoints": "lg md sm xs"  },
        // { "name": "bil_max_calon", "title": "Bilangan Calon (Berdaftar)" },
        { "name": "statusrekod", "title": "Status", "breakpoints": "md sm xs" },
        { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
        // {"name":"status","title":"Status","breakpoints":"sm xs"}
    ];
    var form = new FormData();
    form.append('FK_penilaian', sessionStorage.id_penilaian);
    var settings = {
        "url": host + "siri_penilaian/listByPenilaian",
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

    let request = $.ajax(settings);
    request.done(function (response) {
        result = JSON.parse(response);
        let convertList = JSON.stringify(result.data);
        $("#dataSenaraiSiriPenilaian").val(convertList);
        var list = [];
        let bil = 1;

        $.each(result.data, function (i, field) {
            var checked;
            var jenis_penilaian = '';
            
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
            if (sessionStorage.capaian == capaian[1]) {
                disableddel = '';
                onclickdel = `del_rekod(` + field.id_penilaian + `,` + token + `)`;
            }else if(sessionStorage.capaian == capaian[2]) {
                disableddel = '';
                onclickdel = `del_rekod(` + field.id_penilaian + `,` + token + `)`;
            }
            list.push({
                bil: bil++, kod_siri_penilaian: field.kod_siri_penilaian, 
                // tahun: field.tahun, 
                nosiri: field.kod+'/'+field.tahun, 
                keterangan: "<span style='white-space: pre-line'>"+field.keterangan+"</span>", 
                jenis_penilaian: field.nama_jenis_penilaian, 
                statusrekod: '<div class="material-switch"><input id="switch_del'+ field.id_siri_penilaian +'" ' + disableddel + ' ' + checked + ' onclick="' + onclickdel + '" type="checkbox"/><label for="switch_del'+ field.id_siri_penilaian +'" id="label_switch'+ field.id_siri_penilaian +'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod' + field.id_siri_penilaian + '" class="badge ' + badge + '">' + text_statusrekod + '</span></div>',
                upt_btn: '<button class="btn btn-circle btn-info btn-sm" data-ui-toggle-class="zoom" data-ui-target="#animate" onclick="details(\'' + field.id_siri_penilaian + '\')"><i class="material-icons">arrow_forward</i></button>'
            });
        });

        $("#listSenaraiSiriPenilaian").footable({
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
    request.fail(function (response) {
        swal({
            title: "Tiada Siri Penilaian Yang Berdaftar",
            // text: "Berjaya Kemaskini Profile!",
            type: "info",
            showConfirmButton: false,
            allowOutsideClick: false,
            html: false,
            timer: 1500
        }).then(function(){},
            function (dismiss) {
                // if (dismiss === 'timer') {
                //     window.location.reload();
                // }
            }
        );
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

    sessionStorage.id_siri_penilaian = id;

    window.sessionStorage.child = "3737b150ea9ee0191b5dcc8233bfa472";
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

function load_penilaian(id_penilaian,token,returnValue){
    var form = new FormData();
    form.append("id_penilaian", id_penilaian);
    var settings = {
        "url": host+"penilaian/show",
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
        objPenilaian = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
          swal({
              title: "Tiada Data Penilaian",
              // text: "Berjaya Kemaskini Profile!",
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

function load_kluster(token,returnValue){
    var form = new FormData();
    form.append('FK_users', id_users_master);
    var settings = {
        "url": host+"penyelaras/listKlusterByPenyelaras",
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
        objKluster = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
          swal({
              title: "Anda Masih Belum Berdaftar Di Bawah Mana-Mana Program/Pusat Penilaian",
              // text: "Berjaya Kemaskini Profile!",
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

function load_kategori_penilaian(token,id_kategori_penilaian,returnValue){
    var settings = {
        "url": host+"kategori_penilaian/list",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": window.localStorage.token
        },
      };
      var request = $.ajax(settings);

    //   alert(id_kategori_penilaian);
      request.done(function (response) {
        objKategori = response;

        returnValue();
      });

      request.fail(function (response) {
          swal({
              title: "Tiada Kategori Yang Berdaftar",
              // text: "Berjaya Kemaskini Profile!",
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

function load_urusetia(token){
    var settings = {
        "url": host+"usersgovsIntanList",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": window.localStorage.token
        },
      };
      var request = $.ajax(settings);

      request.done(function (response) {
        objUrusetia = response;
        $("#FK_users").html("");
        if(objUrusetia.success){
            $("#FK_users").html('<option value="">Pilih Pegawai INTAN</option>');
            let dataUrusetia = objUrusetia.data;
            
            $.each(dataUrusetia,function(i,field){
                $("#FK_users").append('<option value="'+field.id_users+'">'+field.nama+' ('+ field.no_kad_pengenalan +')</option>');
            });
            
            $("#FK_users").select2({
                dropdownParent: $("#modaldaftarsiripenilaian"),
                width: null,
                containerCssClass: ':all:'
            });
        }
      });

      request.fail(function (response) {
          swal({
              title: "Tiada Pengguna INTAN Yang Berdaftar",
              // text: "Berjaya Kemaskini Profile!",
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
              title: "Tiada Pengguna INTAN Yang Berdaftar",
              // text: "Berjaya Kemaskini Profile!",
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
                appendpenggubal = '"penggubal": "1",';
            } else  {
                appendpenggubal = '"penggubal": "0",';
            }
            if ($("#kat3").is(":checked")){
                appendpenilai = '"penilai": "1",';
            } else  {
                appendpenilai = '"penilai": "0",';
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
            tableItem("tablePenggubal", "urusetia", JSONurusetia, token);
        }
        if ($("#kat3").is(":checked")){
            tableItem("tablePenilai", "urusetia", JSONurusetia, token);
        }
        if ($("#kat4").is(":checked")){
            tableItem("tablePanelPenilai", "urusetia", JSONurusetia, token);
        }
        $('#FK_users').val("");
        $('#FK_kategori_urusetia').html("");
        load_urusetia(token);
        load_kategori_urusetia(token);
    }
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
        let upt_btn = '<button type="button" class="btn btn-danger btn-square btn-sm" onclick="remItem(\'' + item + '\',\'' + rem + '\',\'' + i + '\')" data-whatever="@getbootstrap"><i class="material-icons">remove</i></button> ';
        
        if (item == "tableUrusetia" && field.urusetia == "1")  {
            list.push({
                bil: bil++, nama: field.nama, no_kad_pengenalan: field.no_kad_pengenalan, upt_btn: upt_btn
            });
        }
        if (item == "tablePenggubal" && field.penggubal == "1")  {
            list.push({
                bil: bil++, nama: field.nama, no_kad_pengenalan: field.no_kad_pengenalan, upt_btn: upt_btn
            });
        }
        if (item == "tablePenilai" && field.penilai == "1")  {
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

function kembali(){
    sessionStorage.child = "959cde393ca127ad75c147ec76ac778b";
    checkAuthentication(sessionStorage.child);
}

function remItem(table, jenis_item, index) {
    let token = window.localStorage.token;
    let temp = "";
    item = JSON.parse($("#" + jenis_item).val());
    $.each(item, function (i, field) {
        let urusetia = field.urusetia;
        let penggubal = field.penggubal;
        let penilai = field.penilai;
        let panel_penilai = field.panel_penilai;
        if (i != index) {
            if (temp == "") {
                temp = '{"urusetia": "'+ field.urusetia + '",'+
                        '"penggubal": "'+ field.penggubal + '",'+
                        '"penilai": "'+ field.penilai + '",'+
                        '"panel_penilai": "'+ field.panel_penilai + '",'+
                        '"FK_users":"' + field.FK_users + '","nama":"' + field.nama + '","no_kad_pengenalan":"' + field.no_kad_pengenalan + '"}';
            } else {
                temp = temp + ', ' + '{"urusetia": "'+ field.urusetia + '",'+
                '"penggubal": "'+ field.penggubal + '",'+
                '"penilai": "'+ field.penilai + '",'+
                '"panel_penilai": "'+ field.panel_penilai + '",'+
                '"FK_users":"' + field.FK_users + '","nama":"' + field.nama + '","no_kad_pengenalan":"' + field.no_kad_pengenalan + '"}';
            }
        } else  {
            if (table == "tableUrusetia")   {
                urusetia = "0";
            }
            if (table == "tablePenggubal")   {
                penggubal = "0";
            }
            if (table == "tablePenilai")   {
                penilai = "0";
            }
            if (table == "tablePanelPenilai")   {
                panel_penilai = "0";
            }
            if (!(urusetia == "0" && penggubal == "0" && penilai == "0" && panel_penilai == "0"))    {
                if (temp == "") {
                    temp = '{"urusetia": "'+ urusetia + '",'+
                            '"penggubal": "'+ penggubal + '",'+
                            '"penilai": "'+ penilai + '",'+
                            '"panel_penilai": "'+ panel_penilai + '",'+
                            '"FK_users":"' + field.FK_users + '","nama":"' + field.nama + '","no_kad_pengenalan":"' + field.no_kad_pengenalan + '"}';
                } else {
                    temp = temp + ', ' + '{"urusetia": "'+ urusetia + '",'+
                    '"penggubal": "'+ penggubal + '",'+
                    '"penilai": "'+ penilai + '",'+
                    '"panel_penilai": "'+ panel_penilai + '",'+
                    '"FK_users":"' + field.FK_users + '","nama":"' + field.nama + '","no_kad_pengenalan":"' + field.no_kad_pengenalan + '"}';
                }
            }
        }
    });
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

    let listHtml = ["tableUrusetia", "tablePenggubal", "tablePenilai", "tablePanelPenilai",
    ];
    $.each(listHtml, function (i, item) {
        $("#" + item).html("");
    });

    document.getElementById('register').reset();
}

function daftarSoalan(id_penilaian){
    sessionStorage.child = "fdc640ca7d4523658068008de71bf603";
    checkAuthentication(sessionStorage.child);
}

$("#btn-remove").click(function () {
    
    removeUptLogo();

});

function removeUptLogo(){

    let path = "../../api_penilaian/public/logo/default/";
    let img = "default.png";
    let append = '<span class="input-group-text"><i class=" text-muted material-icons">add_a_photo</i></span><span  id="btn-upload" onclick="triggerLogo();" class="input-group-text input-info btn-info" style="cursor:pointer"> <a class="text-white " >Muat Naik</a> </span>';

    $('#upt_logo_1').attr('src',path+img);
    $('#upt_logo').val(null);
    $('#btn-remove').addClass('hidden');
    $('#divLogo').html(append);

}

$("#btn-upload").on("click", function(){
    triggerLogo();
});

function triggerLogo(){

    $("#upt_logo").trigger("click");

}

$("#upt_logo").change(function(event) {

    if($("#upt_logo").val() != null || $("#upt_logo").val() != ""){
        
        $('#btn-upload').css('cursor','not-allowed').removeClass('input-info btn-info').removeAttr("onclick").addClass('input-info-disabled disabled');
        $("#url-logo").removeAttr('href');
        $("#divLogo").append("<span class='input-group-text'>"+$("#upt_logo").val().split('\\').pop()+"</span><span id='btn-remove' onclick='removeUptLogo();' class='input-danger btn-danger input-group-text' style='cursor:pointer'><i class=' text-white material-icons'>delete_forever</i></span>");
        
        var reader = new FileReader();

        reader.onload = function (e)
        {

            $('#upt_logo_1').attr('src', e.target.result);
        }

        reader.readAsDataURL(this.files[0]);

    }

});
