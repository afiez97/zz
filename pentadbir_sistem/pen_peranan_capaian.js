$(function () {
    $.ajaxSetup({
        cache: false
    });
    checkSession();
    let token = window.localStorage.token;
    $("#leftsidebar").load('../aside/aside_pen_peranan_capaian.html');
    $("#btnKembali").attr('onclick','kembali2()');
    saveLog("View Page: Peranan & Capaian", sessionStorage.browser);
    if ((typeof sessionStorage.tab != null) && (sessionStorage.tab != 'undefined') && (sessionStorage.tab))   {
        triggerTabContent(sessionStorage.tab);
    } else  {
        if(window.sessionStorage.peranan == 1)   {
            triggerTabContent("SuperAdmin");
        } else if(window.sessionStorage.peranan == 2)   {
            triggerTabContent("PPPenilaian");
        } else if(window.sessionStorage.peranan == 3)   {
            triggerTabContent("PPPenilaian");
        }
    }
    tablePentadbir('SuperAdmin', '1');
    tablePentadbir('PTLatihan', '2');
    tablePentadbir('PPPenilaian', '3');
    // users(noic_master,token,function(){
    //     if(dataUsers.success){
    //     }
    //     else{
    //         reject_load();
    //     }
    // });    
});

function triggerTabContent(tab) {
    sessionStorage.tab = tab;
    showDiv(tab);
}

function showDiv(tab) {
    var listTab = ["SuperAdmin", "PTLatihan", "PPPenilaian"];
    $.each(listTab, function (i, item) {
        switch (item) {
            case tab:   $('#li-' + item).addClass('active');
                        $('#data' + item).removeClass('hidden');
                        $("#textDaftar").html($("#"+tab.toLowerCase()).html());
                        $("#tab-daftar").attr('onclick',"daftar('"+(i+1)+"','"+item+"')");
                        break;
            default:    $('#li-' + item).removeClass('active'); $('#button' + item).addClass('hidden'); $('#data' + item).addClass('hidden'); break;
        }
    });
    if (tab == "SuperAdmin")  {
        $("#li-Daftar").removeClass('hidden');
    } else if (tab == "PTLatihan" && (sessionStorage.capaian == capaian[0])){
        $("#li-Daftar").removeClass('hidden');
    } else if (tab == "PPPenilaian" && (sessionStorage.capaian == capaian[1])){
        $("#li-Daftar").removeClass('hidden');
    } else  {
        $("#li-Daftar").addClass('hidden');
    }
}

$("#dftr_users").click(function () {
    $("#check_noic").modal('show');
});

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
                        if (sessionStorage.peranan == 3){ // LANTIK PPP
                            if (dataUsers.data.FK_kluster == FK_kluster_master){ // CHECK KLUSTER PPP == PTL TAK
                                console.log(dataUsers);
                                agensilist(dataUsers.data.nama_agensi);
                                $("#FK_peranan_capaian").val(window.sessionStorage.peranan);
                                $("#noic_check").val('');
                                $("#check_noic").modal('hide');
                                $("#nama_pegawai_capaian").html('<i class="fa fa-user"></i> ' + dataUsers.data.nama);
                                $("#FK_users_capaian").val(noic);
                                $("#FK_user_capaian").val(dataUsers.data.id_users);
                                $("#FK_agensi_capaian").val(dataUsers.data.FK_agensi);
                                $("#FK_kluster_capaian").val(dataUsers.data.FK_kluster);
                                $("#divKluster_capaian").removeClass('hidden');
                                $("#nama_kluster_capaian").val(dataUsers.data.nama_kluster);
                                $("#reg-capaian").modal('show');
                            } else{
                                swal({
                                    title: "Daftar Capaian Pengguna",
                                    text: dataUsers.data.nama + " Dari Program/Pusat Berlainan (" + dataUsers.data.nama_kluster + ")",
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
                            }
                        } else  { // LANTIK SA & PTL
                            if (dataUsers.data.users_intan == 1){
                                agensilist(dataUsers.data.nama_agensi);
                                $("#FK_peranan_capaian").val(window.sessionStorage.peranan);
                                $("#noic_check").val('');
                                $("#check_noic").modal('hide');
                                $("#nama_pegawai_capaian").html('<i class="fa fa-user"></i> ' + dataUsers.data.nama);
                                $("#FK_users_capaian").val(noic);
                                $("#FK_user_capaian").val(dataUsers.data.id_users);
                                $("#FK_agensi_capaian").val(dataUsers.data.FK_agensi);
                                $("#divKluster_capaian").removeClass('hidden');
                                $("#FK_kluster_capaian").val(dataUsers.data.FK_kluster);
                                $("#nama_kluster_capaian").val(dataUsers.data.nama_kluster);
        
                                $("#reg-capaian").modal('show');    
                            } else{
                                swal({
                                    title: "Daftar Capaian Pengguna",
                                    text: "Bukan Kakitangan INTAN.",
                                    type: "info",
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
                            }                        
                        }
                    }
                });
            } else {
                $("#noic_check").prop('disabled', true);
                $("#semak_btn").prop('disabled', true);
                $("#icon_semak").removeClass('fas fa-search').addClass('fas fa-cog fa-spin');
                check_hrmis(noic, function () {
                    if (obj_hrmis == "2") {
                        swal({
                            title: "Daftar Capaian Pengguna",
                            text: "Rekod Tidak Dijumpai.",
                            type: "error",
                            closeOnConfirm: true,
                            allowOutsideClick: false,
                            html: false
                        }).then(function () {
                            $("#noic_check").prop('disabled', false);
                            $("#noic_check").val('');
                            $("#noic_check").focus();
                            $("#semak_btn").prop('disabled', false);
                            $("#icon_semak").removeClass('fas fa-cog fa-spin').addClass('fas fa-search');
                        });
                    }
                    else {
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
                        for(i=0;i<agensi.length;i++){
                            if ((agensi[i] == nama_agensi_master))   {
                                agensilist(agensi[i]);
                                i = (agensi.length + 1);
                                if (agensi[i] == 'INSTITUT TADBIRAN AWAM NEGARA (INTAN) (BAHARU)' || agensi[i] == 'INSTITUT TADBIRAN AWAM NEGARA (INTAN)') {
                                    if (agensi[0].indexOf('INT') >= 0) {
                                        console.log(agensi[0]);
                                        agensilist(agensi[0]);
                                    } else {
                                        console.log(agensi[i]);
                                        agensilist(agensi[i]);
                                    }
                                }
        
                                kementerianlist(kementerian);
                                klusterlist();
                                // listfasiliti(window.sessionStorage.peranan);
        
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
        
                                $("#noic_check").val('');
                                $("#check_noic").modal('hide');
                                $("#register_users").modal('show');
                                $("#noic_check").prop('disabled', false);
                                $("#semak_btn").prop('disabled', false);
                                $("#icon_semak").removeClass('fas fa-cog fa-spin').addClass('fas fa-search');
                            }
                            console.log("NTATTA!");
                            if((i+1) == agensi.length){
                                swal({
                                    title: "Daftar Capaian Pengguna",
                                    text: "REKOD TIDAK SAH. AGENSI PENGGUNA: " + agensi[0] + ", " + agensi[1] + ", " + agensi[2] + ", " + agensi[3],
                                    type: "error",
                                    closeOnConfirm: true,
                                    allowOutsideClick: false,
                                    html: false
                                }).then(function () {
                                    window.location.reload();
                                });
                            }
                        }
                    }
                });
            }
        });

    }
});

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
        // let katalaluan = makeid(12);
        let katalaluan = $("#no_kad_pengenalan_add").val();
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
            // window.localStorage.token = result.token;
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
                                saveLog("Register Data [No. Kad Pengenalan: " + no_kad_pengenalan + "], [Peranan: " + $("#FK_peranan_add option:selected").text() + "],  at Tetapan Peranan & Capaian.", sessionStorage.browser);
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
                        tablePentadbir(window.sessionStorage.tab, window.sessionStorage.peranan);
                        sessionStorage.removeItem('peranan');
                        sessionStorage.removeItem('tab');
                        $("#register_users").modal("hide");
                    });
                });
            }
        });
    }
});

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
        // window.localStorage.token = response.token;
        dataUsers = response;
        returnValue();
    });
    request.fail(function (response) {
        dataUsers = response;
        // console.log(dataUsers);
        returnValue();
    });
}

function check_usersIntan(noic, returnValue) {
    var settings = {
        "url": "https://admin.dtims.intan.my/api/ezxs/check/" + noic,
        // "url": "http://10.1.3.152/ezxs_webservice/index.php?ic="+noic,
        "method": "GET",
        "timeout": 0,
        // "headers": {
        //     "Authorization": window.localStorage.token
        // },
    };
    $.ajax(settings).done(function (response) {
        obj_usersIntan = response.posts;
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
        // obj_hrmis = JSON.parse(response);
        obj_hrmis = response;
        obj_hrmis = JSON.parse(response);
        console.log(obj_hrmis);
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

function tablePengguna() {
    var columns = [
        { "name": "bil", "title": "Bil" },
        { "name": "nama", "title": "Nama" },
        { "name": "jenis_pengguna", "title": "Sektor" },
        { "name": "users_intan", "title": "Staff INTAN" },
        { "name": "emel", "title": "Emel", "breakpoints": "lg md sm xs" },
        { "name": "no_kad_pengenalan", "title": "No. K/P", "breakpoints": "md sm xs" },
        { "name": "status_rekod", "title": "Status", "breakpoints": "lg md sm xs" },
        // { "name": "upt_btn", "title": "Tindakan", "breakpoints": "lg md sm xs" },
        // {"name":"status","title":"Status","breakpoints":"sm xs"}
    ];
    var settings = {
        "url": host + "usersListAll",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
    };

    $.ajax(settings).done(function (response) {
        let convertList = JSON.stringify(response.data);
        $("#dataListPengguna").val(convertList);
        var list = [];
        let bil = 1;

        $.each(response.data, function (i, field) {
            var checked;
            // alert(field.statusrekod_capaian);
            if (field.statusrekod_users == '1') {
                checked = 'checked';
                badge = 'badge-success';
                text_statusrekod = 'Aktif';
            } else {
                badge = 'badge-danger';
                text_statusrekod = 'Tidak Aktif';
            }
            if (field.users_intan == '1') {
                usersintan = 'Ya';
            } else {
                usersintan = 'Tidak';
            }

            list.push({
                id: field.id_users, nama: field.nama, emel: field.emel, no_kad_pengenalan: field.no_kad_pengenalan,
                notel: field.notel, jenis_pengguna: field.jenis_pengguna, nama_peranan: field.nama_peranan,
                bil: bil++, users_intan: usersintan,
                status_rekod: '<label class="adomx-switch-2 success "><input type="checkbox" id="status_sistem" class="form-control mb-20" ' + checked + ' onclick="del_rekod_users(\'' + field.id_users + '\',\'' + field.statusrekod_users + '\')"> <i class="lever"></i> <span id="text_statusrekod' + field.id_users + '" class="badge ' + badge + '">' + text_statusrekod + '</span></label>',
                "upt_btn": '<button class="btn btn-circle btn-primary btn-sm" data-ui-toggle-class="zoom" data-ui-target="#animate" onclick="loadDataCapaian(\'' + i + '\')"><i class="ti-pencil-alt"></i></button> '
                // '<button class="button button-box button-sm button-danger" title="Hapus" onclick="del_rekod(\''+field.id_users+'\')"><i class="ti-trash"></i>'
            });
        });

        $("#listPengguna").footable({
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
}

function tablePentadbir(tab, sf) {
    var columns = [
        { "name": "bil", "title": "Bil" },
        { "name": "nama", "title": "Nama" }
    ];
    if (sf == '1') {
        columns.push({ "name": "nama_agensi", "title": "Nama Agensi", "breakpoints": "md sm xs" });
    }
    columns.push(
        { "name": "emel", "title": "Emel", "breakpoints": "lg md sm xs" },
        { "name": "no_kad_pengenalan", "title": "No. K/P", "breakpoints": "md sm xs" },
        { "name": "status_rekod", "title": "Status", "breakpoints": "md sm xs"  },
        // { "name": "upt_btn", "title": "Tindakan" }
        );
    var form = new FormData();
    var existed = '[{"urusetia": "0","jk_penggubal": "0","jk_penilai": "0","panel_penilai": "0","FK_users":"0","nama":"None","no_kad_pengenalan":"000000000000"}]';
    form.append("jenis_pentadbir", sf);
    form.append("FK_peranan", sf);
    form.append("existed", existed);
    for (var pair of form.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
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
        $("#dataList" + tab).val(convertList);
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
            onclickupt = 'loadDataCapaian(\'' + i + '\', \'' + tab + '\')';
            
            if(sessionStorage.capaian == capaian[1]){
                if(FK_kluster_master == field.FK_kluster){
                    list.push({
                        id: field.id_users, nama: field.nama, 
                        emel: '<span style="white-space: pre-line;">'+field.emel+'</span>', 
                        no_kad_pengenalan: field.no_kad_pengenalan,
                        notel: field.notel, jenis_fasiliti: jenis_fasiliti, nama_peranan: field.nama_peranan,
                        bil: bil++, nama_agensi: '<span style="white-space: pre-line;">'+field.nama_agensi+'</span>',
                        status_rekod: '<div class="material-switch"><input id="switch_del'+ field.id_capaian +'" ' + disableddel + ' ' + checked + ' onclick="' + onclickdel + '" type="checkbox"/><label for="switch_del'+ field.id_capaian +'" id="label_switch'+ field.id_capaian +'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod' + field.id_capaian + '" class="badge ' + badge + '">' + text_statusrekod + '</span></div>',
                        // testswitch: '<label class="adomx-switch-2 success "><input type="checkbox" class="form-control mb-20 status_sistem" ' + disableddel + ' ' + checked + ' onclick="' + onclickdel + '"> <i class="lever"></i> <span id="text_statusrekod' + field.id_capaian + '" class="badge ' + badge + '">' + text_statusrekod + '</span></label>',
                        upt_btn: '<button name="upt_btn' + tab + '" class="btn btn-circle btn-primary btn-sm '+ disabledupt +'" onclick="'+ onclickupt +'" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="material-icons">mode_edit</i></button> '
                        // '<button class="button button-box button-sm button-danger" title="Hapus" onclick="del_rekod(\''+field.id_users+'\')"><i class="ti-trash"></i>'
                    });                    
                }
            } else {
                list.push({
                    id: field.id_users, nama: field.nama, 
                    emel: '<span style="white-space: pre-line;">'+field.emel+'</span>', 
                    no_kad_pengenalan: field.no_kad_pengenalan,
                    notel: field.notel, jenis_fasiliti: jenis_fasiliti, nama_peranan: field.nama_peranan,
                    bil: bil++, nama_agensi: '<span style="white-space: pre-line;">'+field.nama_agensi+'</span>',
                    status_rekod: '<div class="material-switch"><input id="switch_del'+ field.id_capaian +'" ' + disableddel + ' ' + checked + ' onclick="' + onclickdel + '" type="checkbox"/><label for="switch_del'+ field.id_capaian +'" id="label_switch'+ field.id_capaian +'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod' + field.id_capaian + '" class="badge ' + badge + '">' + text_statusrekod + '</span></div>',
                    // testswitch: '<label class="adomx-switch-2 success "><input type="checkbox" class="form-control mb-20 status_sistem" ' + disableddel + ' ' + checked + ' onclick="' + onclickdel + '"> <i class="lever"></i> <span id="text_statusrekod' + field.id_capaian + '" class="badge ' + badge + '">' + text_statusrekod + '</span></label>',
                    upt_btn: '<button name="upt_btn' + tab + '" class="btn btn-circle btn-primary btn-sm '+ disabledupt +'" onclick="'+ onclickupt +'" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="material-icons">mode_edit</i></button> '
                    // '<button class="button button-box button-sm button-danger" title="Hapus" onclick="del_rekod(\''+field.id_users+'\')"><i class="ti-trash"></i>'
                });
            }
        });
        $("#list" + tab).html("");
        $("#list" + tab).footable({
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
    });
}

function daftar(capaian, textcapaian){
    sessionStorage.peranan = capaian;
    sessionStorage.tab = textcapaian;
    $("#check_noic").modal('show');
}

$("#registerCapaian").on('submit', function (e) {
    let token = localStorage.token;
    let $this = $(this);

    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Daftar Capaian Pengguna",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {
            let FK_users = $('#FK_user_capaian').val();
            let FK_peranan = $('#FK_peranan_capaian').val();
            let FK_agensi = $('#FK_agensi_capaian').val();
            let FK_kluster = $('#FK_kluster_capaian').val();

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
                        saveLog("Register Data [No. Kad Pengenalan: " + FK_users + "], [Peranan: " + $("#FK_peranan_capaian option:selected").text() + "],  at Tetapan Peranan & Capaian.", sessionStorage.browser);
                        console.log('cek1');
                        tablePentadbir(window.sessionStorage.tab, window.sessionStorage.peranan);
                        console.log(window.sessionStorage.peranan);
                        resetForm();
                        $("#reg-capaian").modal("hide");
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
                console.log('cek3');
                tablePentadbir(window.sessionStorage.tab, window.sessionStorage.peranan);
                console.log(window.sessionStorage.peranan);
                sessionStorage.removeItem('peranan');
                sessionStorage.removeItem('tab');
                resetForm();
                $("#reg-capaian").modal("hide");
            });
        });
    }
});

$("#updateCapaian").on('submit', function (e) {
    let token = window.localStorage.token;
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Kemaskini Capaian Pengguna",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {
            $("#upt-capaian").modal("hide");
            let FK_capaian = $('#upt_id_capaian').val();
            let FK_peranan = $('#upt_FK_peranan').val();
            let FK_agensi = $('#upt_FK_agensi').val();
            let FK_users = $('#upt_FK_user_capaian').val();

            var form = new FormData();
            form.append("id_capaian", FK_capaian);
            form.append("FK_peranan", FK_peranan);
            form.append("FK_agensi", FK_agensi);
            form.append("FK_users", FK_users);
            form.append("updated_by", id_users_master);

            // var param = {
            //     twmTitle: FK_agensi,
            //     twmDescription: FK_kluster,
            // }
            // console.log(param)
            // alert(FK_subkluster)
            var settings = {
                "url": host + "capaianUpdate",
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
                // console.log(response);
                result = JSON.parse(response);
                if (!result.success) {
                    // Swal(result.message, result.data, "error");
                    // return;
                    swal({
                        title: "Kemaskini Capaian Pengguna",
                        text: "Kemaskini Gagal!",
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        $("#upt-capaian").modal("hide");
                        tablePentadbir(window.sessionStorage.tab, window.sessionStorage.peranan);
                        sessionStorage.removeItem('peranan');
                        sessionStorage.removeItem('tab');
                    });
                } else {
                    swal({
                        title: "Kemaskini Capaian Pengguna",
                        text: result.message,
                        type: "success",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        saveLog("Update Data [FK_users: " + FK_users + "], [Peranan: " + $("#upt_FK_peranan option:selected").text() + "],  at Tetapan Peranan & Capaian.", sessionStorage.browser);
                        $("#upt-capaian").modal("hide");
                        window.location.reload();
                        // tablePentadbir(window.sessionStorage.tab, window.sessionStorage.peranan);
                        // sessionStorage.removeItem('peranan');
                        // sessionStorage.removeItem('tab');
                    });
                }
            });
        });
    }
});

// FUNCTION DELETE

function del_rekod(i, status) {
    let id = i;

    var form = new FormData();
    // form.append("recordstatus", statusrekod);
    form.append("id_capaian", id);
    // console.log(id)
    var settings = {
        "url": host + "capaianDelete",
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
                title: "Kemaskini Status Capaian",
                text: "Kemaskini Gagal!",
                type: "error",
                closeOnConfirm: true,
                allowOutsideClick: false,
                html: false
            }).then(function () {
                sessionStorage.token = result.token;
                window.location.reload();
            });
        }
        // console.log(result.data)
        if (result.data.statusrekod == 1) {
            $('#text_statusrekod' + result.data.id_capaian).text('Aktif').removeClass("badge-danger").addClass("badge-success");
        } else {
            $('#text_statusrekod' + result.data.id_capaian).text('Tidak Aktif').removeClass("badge-success").addClass("badge-danger");
        }
        saveLog("Update Data [FK_users: " + FK_users + "], [id_capaian: " + id + "],  at Tetapan Peranan & Capaian.", sessionStorage.browser);
    });
}

function del_rekod_users(i, status) {
    let id = i;

    var form = new FormData();
    // form.append("recordstatus", statusrekod);
    form.append("id_users", id);
    // console.log(id)
    var settings = {
        "url": host + "usersDelete",
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
                title: "Kemaskini Status Pengguna",
                text: "Kemaskini Gagal!",
                type: "error",
                closeOnConfirm: true,
                allowOutsideClick: false,
                html: false
            }).then(function () {
                sessionStorage.token = result.token;
                window.location.reload();
            });
        }
        // console.log(result.data)
        if (result.data.statusrekod == 1) {
            $('#text_statusrekod' + result.data.id_users).text('Aktif').removeClass("badge-danger").addClass("badge-success");
        } else {
            $('#text_statusrekod' + result.data.id_users).text('Tidak Aktif').removeClass("badge-success").addClass("badge-danger");
        }
        saveLog("Update Data [FK_users: " + FK_users + "], [id_users: " + id + "],  at Tetapan Peranan & Capaian.", sessionStorage.browser);
    });
}



$('#FK_agensi_capaian').change(function () {
    var settings = {
        "url": host + "klusters/" + $('#FK_agensi_capaian').val(),
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        }
    };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_kluster_capaian').empty();
        $('#FK_kluster_capaian').append($('<option>', {
            value: "",
            text: "Pilih Program/Pusat"
        }));
        $.each(response.data, function (i, item) {
            if ($('#FK_agensi_capaian').val() != '11') {
                var selected = 'selected';
                $('#FK_kluster_capaian').append($('<option>', {
                    value: item.id_kluster,
                    text: item.nama_kluster
                }).attr(selected, true));
                subklusterListNonKiara();
                // alert(selected)
            } else {
                var selected = 'selected';
                $('#FK_kluster_capaian').append($('<option>', {
                    value: item.id_kluster,
                    text: item.nama_kluster
                }));
            }
        });

    });
});

$('#FK_agensi_add').change(function () {
    var settings = {
        "url": host + "klusters/" + $('#FK_agensi_add').val(),
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        }
    };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_kluster_add').empty();
        $('#FK_kluster_add').append($('<option>', {
            value: "",
            text: "Pilih Program/Pusat"
        }));
        $.each(response.data, function (i, item) {
            if ($('#FK_agensi_add').val() != '11') {
                var selected = 'selected';
                $('#FK_kluster_add').append($('<option>', {
                    value: item.id_kluster,
                    text: item.nama_kluster
                }).attr(selected, true));
                subklusterListNonKiara();
                // alert(selected)
            } else {
                var selected = 'selected';
                $('#FK_kluster_add').append($('<option>', {
                    value: item.id_kluster,
                    text: item.nama_kluster
                }));
            }
        });

    });
});

$('#FK_kluster_add').change(function () {
    //Dropdown Subkluster List
    var settings = {
        "url": host + "subklusters/" + $('#FK_kluster_add').val(),
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        }
    };
    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_subkluster_add').empty();
        $('#FK_subkluster_add').append($('<option>', {
            value: "",
            text: "Pilih Subkluster"
        }));
        $.each(response.data, function (i, item) {
            $('#FK_subkluster_add').append($('<option>', {
                value: item.id_subkluster,
                text: item.nama_subkluster
            }));
        });

    });
    // END Dropdown Subkluster List

});//Dropdown Subkluster List

$('#FK_kluster_capaian').change(function () {
    //Dropdown Subkluster List
    var settings = {
        "url": host + "subklusters/" + $('#FK_kluster_capaian').val(),
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        }
    };
    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_subkluster').empty();
        $('#FK_subkluster').append($('<option>', {
            value: "",
            text: "Pilih Subkluster"
        }));
        $.each(response.data, function (i, item) {
            $('#FK_subkluster').append($('<option>', {
                value: item.id_subkluster,
                text: item.nama_subkluster
            }));
        });

    });
    // END Dropdown Subkluster List

});//Dropdown Subkluster List

$('#FK_subkluster_add').change(function () {
    //Dropdown Unit List
    var settings = {
        "url": host + "units/" + $('#FK_kluster_add').val() + "/" + $('#FK_subkluster_add').val(),
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        }
    };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_unit_add').empty();
        $('#FK_unit_add').append($('<option>', {
            value: "",
            text: "Pilih Unit"
        }));
        $.each(response.data, function (i, item) {
            $('#FK_unit_add').append($('<option>', {
                value: item.id_unit,
                text: item.nama_unit
            }));
        });

    });
    // END Dropdown Unit List

});

$('#FK_subkluster').change(function () {
    //Dropdown Unit List
    var settings = {
        "url": host + "units/" + $('#FK_kluster').val() + "/" + $('#FK_subkluster').val(),
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        }
    };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_unit').empty();
        $('#FK_unit').append($('<option>', {
            value: "",
            text: "Pilih Unit"
        }));
        $.each(response.data, function (i, item) {
            $('#FK_unit').append($('<option>', {
                value: item.id_unit,
                text: item.nama_unit
            }));
        });

    });
    // END Dropdown Unit List

});

//Dropdown Peranan List
var settings = {
    "url": host + "perananList",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "Authorization": window.localStorage.token
    },
    // "header":{
    //     "Authentication": "ASDCM"+window.localStorage.token
    //   }
};

$.ajax(settings).done(function (response) {
    //LIST OPTION
    $('#FK_peranan_add').empty();
    $('#FK_peranan_add').append($('<option>', {
        value: "",
        text: "Pilih Peranan"
    }));
    $('#FK_peranan').empty();
    $('#FK_peranan').append($('<option>', {
        value: "",
        text: "Pilih Peranan"
    }));
    $('#FK_peranan_capaian').empty();
    $('#FK_peranan_capaian').append($('<option>', {
        value: "",
        text: "Pilih Peranan"
    }));
    $('#upt_FK_peranan').empty();
    $('#upt_FK_peranan').append($('<option>', {
        value: "",
        text: "Pilih Peranan"
    }));
    $.each(response.data, function (i, item) {
        $('#FK_peranan_add').append($('<option>', {
            value: item.id_peranan,
            text: item.nama_peranan
        }));
        $('#FK_peranan').append($('<option>', {
            value: item.id_peranan,
            text: item.nama_peranan
        }));
        $('#FK_peranan_capaian').append($('<option>', {
            value: item.id_peranan,
            text: item.nama_peranan
        }));
        $('#upt_FK_peranan').append($('<option>', {
            value: item.id_peranan,
            text: item.nama_peranan
        }));
    });

});
// END Dropdown Peranan List

//Dropdown User List
var settings = {
    "url": host + "usersgovsIntanList",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "Authorization": window.localStorage.token
    },
    // "header":{
    //     "Authentication": "ASDCM"+window.localStorage.token
    //   }
};

$.ajax(settings).done(function (response) {
    //LIST OPTION
    $('#FK_userss').empty();
    $.each(response.data, function (i, item) {
        $('#FK_userss').append($('<option>', {
            value: item.no_kad_pengenalan,
            text: item.nama
        }));
    });

    //LIST OPTION UPDATE
    $('#upt_FK_users').empty();
    $('#upt_FK_users').append($('<option>', {
        value: "",
        text: "Pilih Pengguna"
    }));
    $.each(response.data, function (i, item) {
        $('#upt_FK_users').append($('<option>', {
            value: item.PK,
            text: item.nama
        }));
    });

});
// END Dropdown User List

function resetForm() {
    sessionStorage.removeItem('peranan');
}

function kembali2(){
    window.sessionStorage.removeItem("child");
    window.location.reload();
}