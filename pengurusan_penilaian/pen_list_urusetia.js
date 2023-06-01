$(function () {
    $.ajaxSetup({
        cache: false
    });
    checkSession();
    let token = window.localStorage.token;
    if(sessionStorage.capaian == capaian[2])    {
        $("#buttonDaftarUrusetia").removeClass('hidden').attr('onclick',"daftar('4');");
    }
    $("#leftsidebar").load('../aside/aside_pen_list_urusetia.html');

    load_kluster(token,function(){
        if(objKluster.success){
            let dataKluster = objKluster.data;
            $("#FK_kluster").val(dataKluster.id_kluster);
            $("#nama_kluster").val(dataKluster.nama_kluster);
            // $("#FK_kluster").html('<option value="">Pilih Program/Pusat Penilaian</option>');
            // $.each(dataKluster,function(i,field){
            //     $("#FK_kluster").append('<option value="'+field.id_kluster+'">'+field.nama_kluster+'</option>');
            // });
            // $("#FK_kluster").select2({
            //     width: null,
            //     containerCssClass: ':all:'
            // });
        }
    });

    tableUrusetia(token);
    // users(noic_master,token,function(){
    //     if(dataUsers.success){
    //     }
    //     else{
    //         reject_load();
    //     }
    // });
});

function daftar(capaian) {
    sessionStorage.peranan = capaian;
    $("#check_noic").modal('show');
}

var confirmed = false;

$("#send_noic").on('submit', function (e) {
    let token = localStorage.token;
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        let noic = $("#noic_check").val();
        
        check_users(noic, function () {
            if (dataUsers.success) {
                check_capaian(noic, sessionStorage.peranan, function () {
                    if (obj_capaian.success) {
                        swal({
                            title: "Daftar Capaian Pengguna",
                            text: "Pengguna telah berdaftar sebagai " + obj_capaian.data.nama_peranan,
                            type: "error",
                            closeOnConfirm: true,
                            allowOutsideClick: false,
                            html: false
                        }).then(function () {
                            $("#noic_check").prop('disabled', false);
                            $("#noic_check").val('');
                            $("#noic_check").focus();
                            $("#semak_btn").prop('disabled', false);
                            $("#icon_semak").prop('class', 'fas fa-search');
                        });
                    } else {
                        agensilist(dataUsers.data.nama_agensi);
                        $("#FK_peranan").val(window.sessionStorage.peranan);
                        $("#noic_check").val('');
                        $("#check_noic").modal('hide');
                        $("#nama_pegawai").html('<i class="fa fa-user"></i> ' + dataUsers.data.nama);
                        $("#FK_users").val(noic);
                        $("#FK_user").val(dataUsers.data.id_users);
                        $("#FK_agensi").val(dataUsers.data.FK_agensi);
                        $("#divKluster").removeClass('hidden');
                        $("#FK_kluster").val(dataUsers.data.FK_kluster);
                        $("#nama_kluster").val(dataUsers.data.nama_kluster);

                        $("#reg-capaian").modal('show');
                    }
                });
            } else {
                $("#noic_check").prop('disabled', true);
                $("#semak_btn").prop('disabled', true);
                $("#icon_semak").removeClass('fas fa-search').addClass('fas fa-cog fa-spin');
                check_hrmis(noic, function () {
                    // console.log(obj_hrmis);
                    if (obj_hrmis != "2") {
                        let gelaran = obj_hrmis.peribadi.Title;
                        let agensi = obj_hrmis.perkhidmatan.Bahagian.split(', ');
                        let kementerian = obj_hrmis.perkhidmatan.Kementerian;

                        gelaranlist(function () {
                            $.each(obj_gelaran.data, function (i, item) {
                                if (gelaran == item.nama_gelaran) {
                                    $("#FK_gelaran_add").val(item.id_gelaran);
                                }
                            })
                        });
                        if (agensi[2] == 'INSTITUT TADBIRAN AWAM NEGARA (INTAN) (BAHARU)' || agensi[3] == 'INSTITUT TADBIRAN AWAM NEGARA (INTAN) (BAHARU)') {
                            
                            if (agensi[2] == 'INSTITUT TADBIRAN AWAM NEGARA (INTAN) (BAHARU)') {
                                
                                if (agensi[0].indexOf('INT') >= 0) {
                                    
                                    agensilist(agensi[0]);
                                } else {
                                    
                                    agensilist(agensi[2]);
                                }
                            } else if (agensi[3] == 'INSTITUT TADBIRAN AWAM NEGARA (INTAN) (BAHARU)') {
                                
                                if (agensi[0].indexOf('INT') >= 0) {
                                    agensilist(agensi[0]);
                                } else {
                                    agensilist(agensi[3]);
                                }
                            }
                            // listfasiliti(window.sessionStorage.peranan);
                        } else  {
                            agensilist(obj_hrmis.perkhidmatan.Agensi);
                        }
                        kementerianlist(kementerian);
                        klusterlist();
                        $("#nama_text_add").text(obj_hrmis.peribadi.Title + " " + obj_hrmis.peribadi.nama);
                        $("#noic_text_add").text(obj_hrmis.peribadi.icno);
                        $("#notel_text_add").text(obj_hrmis.peribadi.COHPhoneNo);
    
                        $("#emel_text_add").html(obj_hrmis.peribadi.COEmail);
                        $("#nama_add").val(obj_hrmis.peribadi.nama);
                        $("#emel_add").val(obj_hrmis.peribadi.COEmail);
                        $("#no_kad_pengenalan_add").val(obj_hrmis.peribadi.icno);
                        $("#notel_add").val(obj_hrmis.peribadi.COHPhoneNo);
                        $("#emel_kerajaan_add").val(obj_hrmis.peribadi.COEmail);
                        $("#notel_kerajaan_add").val(obj_hrmis.peribadi.COOffTelNo);
                        $("#nama_jawatan_add").val(obj_hrmis.perkhidmatan.schmofservtitle);
                        $("#FK_peranan_add").val(window.sessionStorage.peranan);
                        $("#register_users").modal('show');
                    } else  {
                        gelaranlist(function () {
                            $("#FK_gelaran_add_swasta").html("");
                            $("#FK_gelaran_add_swasta").html('<option value="">Pilih Gelaran</option>');
                            $.each(obj_gelaran.data, function (i, item) {
                                $("#FK_gelaran_add_swasta").append('<option value="'+item.id_gelaran+'">'+item.nama_gelaran+'</option>');
                            });
                            $("#FK_gelaran_add_swasta").select2({
                                dropdownParent: $("#register_users_swasta"),
                                width: null,
                                containerCssClass: ':all:'
                            });
                        });
                        $("#FK_peranan_add_swasta").val(window.sessionStorage.peranan);
                        $("#no_kad_pengenalan_add_swasta").val(noic);
                        $("#register_users_swasta").modal('show');
                    }

                    $("#noic_check").val('');
                    $("#check_noic").modal('hide');
                    $("#noic_check").prop('disabled', false);
                    $("#semak_btn").prop('disabled', false);
                    $("#icon_semak").removeClass('fas fa-cog fa-spin').addClass('fas fa-search');
                });
            }
        });
    }
});

// FUNCTION REGISTER

$("#registergov").on('submit', function (e) {
    let token = window.localStorage.token
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        $('#daftar').prop('disabled', true);
        $("#icon_Ya").prop('class', 'fa fa-cog fa-spin');
        let nama = $("#nama_add").val();
        let emel = $("#emel_add").val();
        let no_kad_pengenalan = $("#no_kad_pengenalan_add").val();
        let katalaluan = makeid(12);
        let notel = $("#notel_add").val();
        let nama_jawatan = $("#nama_jawatan_add").val();
        let emel_kerajaan = $("#emel_kerajaan_add").val();
        let notel_kerajaan = $("#notel_kerajaan_add").val();
        let FK_gelaran = $("#FK_gelaran_add").val();
        let FK_kementerian = $("#FK_kementerian_add").val();
        let FK_agensi = $("#FK_agensi_add").val();
        let FK_kluster = $("#FK_kluster_add").val();
        let FK_peranan = $("#FK_peranan_add").val();
        let jenis_fasiliti = $("#jenis_fasiliti_add").val();
        let FK_jenis_pengguna = "1";
        
        var form = new FormData();
        
        form.append("nama", nama);
        form.append("emel", emel);
        form.append("no_kad_pengenalan", no_kad_pengenalan);
        form.append("katalaluan", katalaluan);
        form.append("notel", notel);
        form.append("nama_jawatan", nama_jawatan);
        form.append("emel_kerajaan", emel_kerajaan);
        form.append("notel_kerajaan", notel_kerajaan);
        form.append("FK_gelaran", FK_gelaran);
        form.append("FK_kementerian", FK_kementerian);
        form.append("FK_agensi", FK_agensi);
        form.append("FK_kluster", FK_kluster);
        form.append("users_intan", "1");
        form.append("FK_peranan", FK_peranan);
        form.append("jenis_fasiliti", jenis_fasiliti);
        form.append("FK_jenis_pengguna", FK_jenis_pengguna);
        form.append("created_by", id_users_master);
        // formData.append("token",window.localStorage.token);
        var settingsregusers = {
            "url": host + "addUsers",
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

        $.ajax(settingsregusers).done(function (response) {
            // console.log(response);
            result = JSON.parse(response);
            token = window.localStorage.token;
            if (!result.success) {
                Swal(result.message, result.data, "error");
                return;
            }
            else {
                var settingsfetchusers = {
                    "url": host + "users",
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
    
                $.ajax(settingsfetchusers).done(function (response) {
                    result = JSON.parse(response);
                    let jenis_fasiliti = [];
                    $.each(jQuery("input[name='list_jenis_fasiliti_add']:checked"), function () {
                        jenis_fasiliti.push({ fasiliti: jQuery(this).val() });
                    });
                    let FK_users = result.data.id_users;
                    let FK_peranan = $('#FK_peranan_add').val();
                    let FK_agensi = $('#FK_agensi_add').val();
                    let FK_kluster = $('#FK_kluster_add').val();
                    var stringjenis_fasiliti = JSON.stringify(jenis_fasiliti);
    
                    var formCapaian = new FormData();
                    formCapaian.append("FK_users", FK_users);
                    formCapaian.append("FK_peranan", FK_peranan);
                    formCapaian.append("FK_agensi", FK_agensi);
                    formCapaian.append("FK_kluster", FK_kluster);
                    formCapaian.append("jenis_fasiliti", stringjenis_fasiliti);
                    formCapaian.append("created_by", id_users_master);
                    formCapaian.append("updated_by", id_users_master);
                    
                    pen_capaianRegister(formCapaian, function(){
                        if (objAddCapaian.success){
                            swal({
                                title: "Daftar Capaian Pengguna",
                                text: "Berjaya!",
                                type: "success",
                                closeOnConfirm: true,
                                allowOutsideClick: false,
                                html: false
                            }).then(function () {
                                saveLog(id_users_master, "Register Data [FK_peranan: " + FK_peranan + "], [FK_users: " + FK_users + "],  at Tetapan Peranan & Capaian.", window.sessionStorage.browser);
                            });
                        } else {
                            swal({
                                title: "Daftar Capaian Pengguna",
                                text: "Gagal!",
                                type: "error",
                                closeOnConfirm: true,
                                allowOutsideClick: false,
                                html: false
                            }).then(function () {});
                        }
                        $('#daftar').prop('disabled', false);
                        $("#icon_Ya").prop('class', 'ti-check');
                        tableUrusetia(window.localStorage.token);
                        sessionStorage.removeItem('peranan');
                        $("#register_users").modal("hide");
                    });
                });
            }
        });
    }
});

$("#registerswasta").on('submit', function (e) {
    let token = window.localStorage.token
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        $('#daftar').prop('disabled', true);
        $("#icon_Ya").prop('class', 'fa fa-cog fa-spin');
        let nama = $("#nama_add_swasta").val();
        let emel = $("#emel_add_swasta").val();
        let no_kad_pengenalan = $("#no_kad_pengenalan_add_swasta").val();
        let katalaluan = makeid(12);
        let notel = $("#notel_add_swasta").val();
        let nama_jawatan = $("#nama_jawatan_add_swasta").val();
        let emel_kerajaan = $("#emel_kerajaan_add").val();
        let notel_kerajaan = $("#notel_kerajaan_add").val();
        let FK_gelaran = $("#FK_gelaran_add_swasta").val();
        // let FK_kementerian = $("#FK_kementerian_add").val();
        // let FK_agensi = $("#FK_agensi_add").val();
        // let FK_kluster = $("#FK_kluster_add").val();
        let FK_peranan = $("#FK_peranan_add_swasta").val();
        let jenis_fasiliti = $("#jenis_fasiliti_add").val();
        let FK_jenis_pengguna = "2";
        
        var form = new FormData();
        
        form.append("nama", nama);
        form.append("emel", emel);
        form.append("no_kad_pengenalan", no_kad_pengenalan);
        form.append("katalaluan", katalaluan);
        form.append("notel", notel);
        form.append("nama_jawatan", nama_jawatan);
        form.append("emel_kerajaan", emel_kerajaan);
        form.append("notel_kerajaan", notel_kerajaan);
        form.append("FK_gelaran", FK_gelaran);
        // form.append("FK_kementerian", FK_kementerian);
        // form.append("FK_agensi", FK_agensi);
        // form.append("FK_kluster", FK_kluster);
        form.append("users_intan", "0");
        form.append("FK_peranan", FK_peranan);
        form.append("jenis_fasiliti", jenis_fasiliti);
        form.append("FK_jenis_pengguna", FK_jenis_pengguna);
        form.append("created_by", id_users_master);
        // formData.append("token",window.localStorage.token);
        var settingsregusers = {
            "url": host + "addUsers",
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

        $.ajax(settingsregusers).done(function (response) {
            // console.log(response);
            result = JSON.parse(response);
            token = window.localStorage.token;
            if (!result.success) {
                Swal(result.message, result.data, "error");
                return;
            }
            else {
                var settingsfetchusers = {
                    "url": host + "users",
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
    
                $.ajax(settingsfetchusers).done(function (response) {
                    result = JSON.parse(response);
                    let jenis_fasiliti = [];
                    $.each(jQuery("input[name='list_jenis_fasiliti_add']:checked"), function () {
                        jenis_fasiliti.push({ fasiliti: jQuery(this).val() });
                    });
                    let FK_users = result.data.id_users;
                    let FK_peranan = $('#FK_peranan_add_swasta').val();
                    let FK_agensi = $('#FK_agensi_add').val();
                    let FK_kluster = $('#FK_kluster_add').val();
    
                    var formCapaian = new FormData();
                    formCapaian.append("FK_users", FK_users);
                    formCapaian.append("FK_peranan", FK_peranan);
                    // formCapaian.append("FK_agensi", FK_agensi);
                    // formCapaian.append("FK_kluster", FK_kluster);
                    formCapaian.append("created_by", id_users_master);
                    formCapaian.append("updated_by", id_users_master);
                    
                    pen_capaianRegister(formCapaian, function(){
                        if (objAddCapaian.success){
                            swal({
                                title: "Daftar Capaian Pengguna",
                                text: "Berjaya!",
                                type: "success",
                                closeOnConfirm: true,
                                allowOutsideClick: false,
                                html: false
                            }).then(function () {
                                saveLog(id_users_master, "Register Data [FK_peranan: " + FK_peranan + "], [FK_users: " + FK_users + "],  at Tetapan Peranan & Capaian.", window.sessionStorage.browser);
                            });
                        } else {
                            swal({
                                title: "Daftar Capaian Pengguna",
                                text: "Gagal!",
                                type: "error",
                                closeOnConfirm: true,
                                allowOutsideClick: false,
                                html: false
                            }).then(function () {});
                        }
                        $('#daftar').prop('disabled', false);
                        $("#icon_Ya").prop('class', 'ti-check');
                        tableUrusetia(window.localStorage.token);
                        sessionStorage.removeItem('peranan');
                        $("#register_users_swasta").modal("hide");
                    });
                });
            }
        });
    }
});

$("#registerCapaian").on('submit', function(e){
    let token = window.localStorage.token
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        let FK_users = $("#FK_user").val();
        let FK_peranan = $('#FK_peranan').val();
        let FK_agensi = $('#FK_agensi').val();
        let FK_kluster = $('#FK_kluster').val();

        var formCapaian = new FormData();
        formCapaian.append("FK_users", FK_users);
        formCapaian.append("FK_peranan", FK_peranan);
        formCapaian.append("FK_agensi", FK_agensi);
        formCapaian.append("FK_kluster", FK_kluster);
        formCapaian.append("created_by", id_users_master);
        formCapaian.append("updated_by", id_users_master);
        
        pen_capaianRegister(formCapaian, function(){
            if (objAddCapaian.success){
                swal({
                    title: "Daftar Capaian Pengguna",
                    text: "Berjaya!",
                    type: "success",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function () {
                    saveLog(id_users_master, "Register Data [FK_peranan: " + FK_peranan + "], [FK_users: " + FK_users + "],  at Tetapan Peranan & Capaian.", window.sessionStorage.browser);
                });
            } else {
                swal({
                    title: "Daftar Capaian Pengguna",
                    text: "Gagal!",
                    type: "error",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function () {});
            }
            tableUrusetia(window.localStorage.token);
            sessionStorage.removeItem('peranan');
            $("#reg-capaian").modal("hide");
        });
    }
});

function tableUrusetia(token) {
    var columns = [
        { "name": "bil", "title": "Bil" },
        { "name": "nama", "title": "Nama" },
        { "name": "emel", "title": "Emel", "breakpoints": "md sm xs" },
        // { "name": "no_kad_pengenalan", "title": "No. K/P", "breakpoints": "md sm xs" },
        { "name": "status_rekod", "title": "Status" },
        // {"name":"status","title":"Status","breakpoints":"sm xs"}
    ];
    var form = new FormData();
    var existed = '[{"urusetia": "0","penggubal": "0","penilai": "0","panel_penilai": "0","FK_users":"0","nama":"None","no_kad_pengenalan":"000000000000"}]';
    form.append("jenis_pentadbir", '4');
    form.append("FK_peranan", '4');
    form.append("existed", existed);
    // form.append("FK_agensi", window.sessionStorage.FK_agensi);
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
    let request = $.ajax(settings);
    request.done(function (response) {
        let convertList = JSON.stringify(response.data);
        let jenis_fasiliti = '';
        $("#dataSenaraiUrusetia").val(convertList);
        var list = [];
        let bil = 1;

        $.each(response.data, function (i, field) {
            var checked;
            // alert(field.statusrekod_capaian);
            if (field.statusrekod_capaian == '1') {
                checked = 'checked';
                badge = 'badge-success';
                text_statusrekod = 'Aktif';
            } else {
                badge = 'badge-danger';
                text_statusrekod = 'Tidak Aktif';
            }
            let disableddel = 'disabled';
            let onclickdel = '';
            disableddel = '';
            onclickdel = 'del_rekod(\'' + field.id_capaian + '\',\'' + field.statusrekod_capaian + '\')';
            let disabledupt = 'disabled';
            let onclickupt = '';
            disabledupt = '';
            onclickupt = 'loadDataCapaian(\'' + i + '\')';
            
            list.push({
                id: field.id_users, nama: field.nama, emel: field.emel, no_kad_pengenalan: field.no_kad_pengenalan,
                notel: field.notel, jenis_fasiliti: jenis_fasiliti, nama_peranan: field.nama_peranan,
                bil: bil++, nama_agensi: field.nama_agensi,
                status_rekod: '<div class="material-switch"><input id="switch_del'+ field.id_capaian +'" ' + disableddel + ' ' + checked + ' onclick="' + onclickdel + '" type="checkbox"/><label for="switch_del'+ field.id_capaian +'" id="label_switch'+ field.id_capaian +'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod' + field.id_capaian + '" class="badge ' + badge + '">' + text_statusrekod + '</span></div>',
                // testswitch: '<label class="adomx-switch-2 success "><input type="checkbox" class="form-control mb-20 status_sistem" ' + disableddel + ' ' + checked + ' onclick="' + onclickdel + '"> <i class="lever"></i> <span id="text_statusrekod' + field.id_capaian + '" class="badge ' + badge + '">' + text_statusrekod + '</span></label>',
                // upt_btn: '<button name="upt_btn' + tab + '" class="btn btn-circle btn-primary btn-sm '+ disabledupt +'" onclick="'+ onclickupt +'" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="material-icons">mode_edit</i></button> '
                // '<button class="button button-box button-sm button-danger" title="Hapus" onclick="del_rekod(\''+field.id_users+'\')"><i class="ti-trash"></i>'
            });
        });
        $("#listSenaraiUrusetia").html("");
        $("#listSenaraiUrusetia").footable({
            "columns": columns,
            "rows": list,
            "paging": {
                "enabled": true,
                "size": 10
            },
            "filtering": {
                "colspan": 3,
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
            title: "Maklumat Tidak Dijumpai",
            // text: "Berjaya Kemaskini Profile!",
            type: "error",
            showConfirmButton: false,
            allowOutsideClick: false,
            html: false,
            timer: 2000
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

    sessionStorage.id_penilaian = id;

    window.sessionStorage.child = "b0f7c80a40e3d2b78df8f0e6c22f31e5";
    checkAuthentication(window.sessionStorage.child);   

}

function resetForm() {
    document.getElementById('registergov').reset();
    sessionStorage.removeItem('peranan');
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
                  if (dismiss === 'timer') {
                    $("#buttonDaftarPenilaian").prop('disabled',true);
                  }
              }
          );
      });
}

function check_users(noic, returnValue) {
    
    var settings = {
        "url": host + "usersGetIc/" + noic,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
    };
    let request = $.ajax(settings);
    request.done(function (response) {
        dataUsers = response;
        // window.localStorage.token = dataUsers.token;
        returnValue();
    });
    request.fail(function (response) {
        dataUsers = response;
        // console.log(dataUsers);
        returnValue();
    });
}

function check_hrmis(noic, returnValue) {
    var settings = {
        "url": "https://admin.dtims.intan.my/api/hrmis/check/"+noic,
        // "url": "http://10.1.3.10/admin/" + noic + ".json",
        "method": "GET",
        "timeout": 0,
        // "headers": {
        //     "Authorization": window.localStorage.token
        // },
    };
    $.ajax(settings).done(function (response) {
        obj_hrmis = JSON.parse(response);
        // obj_hrmis = response;
        // console.log(obj_hrmis);
        returnValue();
    });
}

function check_capaian(noic, peranan, returnValue) {
    var settings = {
        // "url": "https://admin.dtims.intan.my/api/hrmis/check/"+noic,
        "url": host + "usersPentadbir/" + noic + "/" + peranan,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
    };
    var request = $.ajax(settings);
    request.done(function (response) {
        // obj_hrmis = JSON.parse(response);
        obj_capaian = response;

        returnValue();
    });
    request.fail(function (response) {
        obj_capaian = response;

        returnValue();
    });
}