$(function () {
    $.ajaxSetup({
        cache: false
    });
    // $.fn.select2.defaults.set( "theme", "bootstrap" );
    // $.fn.modal.Constructor.prototype.enforceFocus = function() {};
    let token = window.localStorage.token;
    if(token == null){
        window.location.replace('../login/');
    }
    else{
        let noic = window.localStorage.no_kad_pengenalan;
        // alert(token);
        users(noic,token,function(){
            if(dataUsers.success){
                let data = dataUsers.data;
                nama = data.nama;
                id_users_master = data.id_users;
                nama_master = data.nama;
                emel_master = data.emel;
                noic_master = data.no_kad_pengenalan;
                notel_master = data.notel;
                FK_jenis_pengguna_master = data.FK_jenis_pengguna;
                FK_taraf_jawatan_master = data.taraf_jawatan;
                FK_gelaran_master = data.FK_gelaran;
                emel_kerajaan_master = data.emel_kerajaan;
                notel_kerajaan_master = data.notel_kerajaan;
                nama_jawatan_master = data.nama_jawatan;
                users_intan_master = data.users_intan;
                FK_kampus_master = data.FK_kampus;
                FK_kluster_master = data.FK_kluster;
                FK_kementerian_master = data.FK_kementerian;
                FK_agensi_master = data.FK_agensi;
                nama_majikan_master = data.nama_majikan;
                alamat_majikan_master = data.alamat_majikan;
                notel_majikan_master = data.notel_majikan;
                emel_majikan_master = data.emel_majikan;
                nama_ketua_jabatan_master = data.nama_ketua_jabatan;
                notel_ketua_jabatan_master = data.notel_ketua_jabatan;
                emel_ketua_jabatan_master = data.emel_ketua_jabatan;
                jawatan_ketua_jabatan_master = data.jawatan_ketua_jabatan;
                nama_agensi_master = data.nama_agensi;
                nama_kluster_master = data.nama_kluster;
                updated_at = data.updated_at;
                $("#text_nama_pengguna").html(nama + `<i class="zmdi zmdi-chevron-down"></i>`);
                $("#text_nama_agensi").html(nama_agensi_master);
                
                if (window.sessionStorage.child != null){
                    checkAuthentication(window.sessionStorage.child);
                }
                loads_penilaian_open();
                loads_others();
            }
            else{
                reject_load();
            }
        });
    }
});

$(document).ready(function(){

});

$("#dashboard").on('click',function () {
    window.sessionStorage.removeItem("child");
    window.location.reload();
});

$("#editprofile").on('click',function () {
    window.sessionStorage.child = "f5fe4ded77b07f4b4e59a73a3e6773a9";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_permohonan").on('click',function () {
    window.sessionStorage.child = "474b95c4cc31810e4cca92729f12f8d4";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_jadual").on('click',function () {
    window.sessionStorage.child = "4a806157e1ff38beb45f87f9e4556d1a";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_keputusan").on('click',function () {
    window.sessionStorage.child = "fd27f1111bc2f84406c1bbe6a567254e";
    checkAuthentication(window.sessionStorage.child);
});

$("#logKeluar").on('click',function () {
    logkeluar();
});

// dashboard admin super

function loads_penilaian_open(){
    pen_sesi_siri_penilaianlistByTarikhMohonOpen(function(){
        if (obj.success){
            let result = obj;
            var list = [];
            let bil = 1;
            let count = 0;
            var columns = [
                { "name": "bil", "title": "Bil" },
                { "name": "penilaian", "title": "Nama & Siri Penilaian"},
                { "name": "masa", "title": "Masa", "breakpoints": "md sm xs" },
                { "name": "tarikh_penilaian", "title": "Tarikh Penilaian", "breakpoints": "md sm xs" },
                { "name": "tarikh_tamat_mohon", "title": "Tarikh Tutup Permohonan", "breakpoints": "md sm xs" },
                // { "name": "kekosongan", "title": "Kekosongan", "breakpoints": "md sm xs" },
                { "name": "nama_jenis_penilaian", "title": "Platform", "breakpoints": "md sm xs" },
                { "name": "upt_btn", "title": "Pendaftaran", "breakpoints": "md sm xs" },
            ];
            $.each(result.data, function (i, field) {
                let masa;
                if (field.masa_mula != null && field.masa_mula != null) {
                    masa = field.sesi_penilaian + " (" + field.masa_mula + " - " + field.masa_tamat + ")";
                }
                var formCheckCalon = new FormData();
                formCheckCalon.append("FK_sesi", field.id_sesi_siri_penilaian);
                list.push({
                    bil: bil++, 
                    id_siri_penilaian: field.id_siri_penilaian, 
                    penilaian: `<a href="javascript:void(0);" onclick="details(`+field.id_siri_penilaian+`)"><span style='white-space: pre-line;'>`+ field.kod_siri_penilaian + ` - ` + field.nama_penilaian +` - ` + field.nama_kategori_penilaian +`</span></a>`, 
                    masa: masa, 
                    tarikh_penilaian: formatDate(field.tarikh_mula), 
                    tarikh_tamat_mohon: formatDate(field.tarikh_tamat_mohon), 
                    nama_jenis_penilaian: field.nama_jenis_penilaian, 
                    nama_kategori_penilaian: field.nama_kategori_penilaian, 
                    // upt_btn: `<button class="btn btn-info btn-sm" data-ui-toggle-class="zoom" data-ui-target="#animate" onclick="mohon(`+field.id_siri_penilaian+`,`+field.id_sesi_siri_penilaian+`)"><span style="white-space: nowrap; font-size: 11px;">DAFTAR</span></button>`
                });
                pen_calon_soalanshowByFK_sesi(formCheckCalon,function(){
                    if(obj.success){
                        list[i].upt_btn = `<span class="badge bg-success">TELAH BERDAFTAR / MEMOHON</span>`;
                        count++;
                    } else {
                        pen_permohonan_penilaianshowByFK_sesi(formCheckCalon,function(){
                            if(obj.success){
                                list[i].upt_btn = `<span class="badge bg-success">TELAH BERDAFTAR / MEMOHON</span>`
                                count++;
                            } else {
                                list[i].upt_btn = `<button class="btn btn-info btn-sm" data-ui-toggle-class="zoom" data-ui-target="#animate" onclick="mohon(`+field.id_siri_penilaian+`,`+field.id_sesi_siri_penilaian+`)"><span style="white-space: nowrap; font-size: 11px;">DAFTAR</span></button>`
                                count++;
                            }
                            if(count == result.data.length){
                                generateTableSiriPenilaian(columns,list);
                            }
                        });
                    }
                    if(count == result.data.length){
                        generateTableSiriPenilaian(columns,list);                        
                    }
                });
            });
        }
    });
}

function generateTableSiriPenilaian(columns,list){
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
}

function checkNotification(){
    $.each(JSON.parse(window.sessionStorage.jenis_fasiliti), function(i, item){
        var list = [];
        var bil = 1;
        var columns = [
            { "name": "bil", "title": "Bil" },
            { "name": "nama_program", "title": "Nama Program" },
            { "name": "nama_fas", "title": "Fasiliti" },
            { "name": "tarikh", "title": "Tarikh" },
            { "name": "status", "title": "Status" },
            { "name": "nama_pemohon", "title": "Pemohon" }
        ];
        var form = new FormData();
        form.append("kod_jenis_fas", item.fasiliti);
        form.append("FK_agensi", window.sessionStorage.FK_agensi);
        var settings = {
            "url": host + "tempahan/fasiliti_detail/listByJenisFas",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": window.localStorage.token
            },
            "processData": false,
            "contentType": false,
            "data": form
        };
    
        $.ajax(settings).done(function (response) {
            $.each(response.data, function(i, item){
                let append = '';
                let icon = '';
                if (item.kod_jenis_fas == 'dwn')   {
                    icon = 'fa-university';
                } else if (item.kod_jenis_fas == 'blk')   {
                    icon = 'fa-home';
                } else if (item.kod_jenis_fas == 'sjn')   {
                    icon = 'fa-coffee';
                } else if (item.kod_jenis_fas == 'mkl')   {
                    icon = 'fa-desktop';
                } else if (item.kod_jenis_fas == 'skn')   {
                    icon = 'fa-dribbble';
                } else if (item.kod_jenis_fas == 'asr')   {
                    icon = 'fa-hotel';
                } else if (item.kod_jenis_fas == 'kdn')   {
                    icon = 'fa-car';
                }
                append = '<a onclick="notification_details(\'' + item.id_tem_pen_det + '\',\'' + item.kod_jenis_fas + '\',\'' + item.id_tem_fas + '\')">'+
                            '<div class="btn btn-warning btn-circle mr-2"><i class="fa '+ icon +'"></i>'+
                            '</div>'+
                            '<div class="mail-contnet">'+
                                '<h5>'+ item.nama_program +'</h5> <span class="mail-desc">'+ item.nama +'</span> <span class="time">'+ formatDate(item.tarikh_mula) +' - '+ formatDate(item.tarikh_tamat) +'</span>'+
                            '</div>'+
                        '</a>';
                $("#notification_list").append(append);
                
            });
        });

    });    
}

function mohon(id_siri_penilaian,id_sesi_siri_penilaian){
    load_siri_penilaian(id_siri_penilaian, window.localStorage.token, function(){
        if(obj.success){
            $("#FK_siri_penilaian").val(id_siri_penilaian);
            $("#keterbukaan").val(obj.data.keterbukaan);
            $("#FK_sesi").val(id_sesi_siri_penilaian);
            $("#txt_siri_penilaian").html(obj.data.kod_siri_penilaian + " - " + obj.data.nama_penilaian);
        }
    });
    if (FK_jenis_pengguna_master == "2"){
        arr_notel = notel_master.split("/");
        $("#swasta_nama").val(nama_master);
        $("#swasta_nama_jawatan").val(nama_jawatan_master);
        $("#swasta_notel").val(arr_notel[0]);
        $("#swasta_notel_pejabat").val(arr_notel[1]);
        $("#swasta_emel").val(emel_master);
        $("#swasta_alamat_majikan").val(alamat_majikan_master);
        $("#swasta_nama_majikan").val(nama_majikan_master);
        $("#swasta_emel_majikan").val(emel_majikan_master);
        $("#swasta_notel_majikan").val(notel_majikan_master);
        $("#mohon_swasta").removeClass('d-none');        
        $("#mohon_kerajaan").html('');
        $("#modal_daftar_penilaian").modal("show");
    } else {
        $("#loading_modal").modal("show");
        check_hrmis(window.localStorage.no_kad_pengenalan, function(){
            if (nama_master != null){
                $("#kerajaan_nama").val(nama_master);
            } else {
                $("#kerajaan_nama").val(obj_hrmis.peribadi.nama);
            }

            if (skim_master != null){
                $("#kerajaan_skim").val(skim_master);
            } else {
                $("#kerajaan_skim").val(obj_hrmis.perkhidmatan.SalGrd);
            }

            if (FK_taraf_jawatan_master != null){
                $("#kerajaan_FK_taraf_jawatan").val(FK_taraf_jawatan_master);
            } else {
                $("#kerajaan_FK_taraf_jawatan option").filter(function() {
                    //may want to use $.trim in here
                    return $(this).text() == obj_hrmis.perkhidmatan.ApmtStatusNm;
                }).prop('selected', true);
            }
            
            $("#kerajaan_FK_jenis_pengguna").val(FK_jenis_pengguna_master);

            if (notel_kerajaan_master != null){
                $("#kerajaan_notel_kerajaan").val(notel_kerajaan_master);
            } else {
                $("#kerajaan_notel_kerajaan").val(obj_hrmis.peribadi.COOffTelNo);
            }

            if (notel_master != null){
                $("#kerajaan_notel").val(notel_master);
            } else {
                $("#kerajaan_notel").val(obj_hrmis.peribadi.COHPhoneNo);
            }

            if (jawatan_ketua_jabatan_master != null){
                $("#kerajaan_jawatan_ketua_jabatan").val(jawatan_ketua_jabatan_master);
            } else {
                $("#kerajaan_jawatan_ketua_jabatan").val(obj_hrmis["ketua jabatan"].JawatanPenyelia);
            }

            if (FK_kementerian_master != null){
                $("#kerajaan_FK_kementerian").val(FK_kementerian_master);
            } else {
                $("#kerajaan_FK_kementerian option").filter(function() {
                    //may want to use $.trim in here
                    return $(this).text() == obj_hrmis.perkhidmatan.Kementerian;
                }).attr('selected', true);
            }

            $("#kerajaan_FK_agensi").val(FK_agensi_master);

            if (alamat_majikan_master != null){
                $("#kerajaan_alamat_majikan").val(alamat_majikan_master);
            } else {
                $("#kerajaan_alamat_majikan").val(obj_hrmis["alamat bertugas"].BUAddr1 + ', ' + obj_hrmis["alamat bertugas"].BUAddr2 + ', ' + obj_hrmis["alamat bertugas"].BUAddr3 + ', ' + obj_hrmis["alamat bertugas"].BUPostCode + ', ' + obj_hrmis["alamat bertugas"].city + ', ' + obj_hrmis["alamat bertugas"].State);
            }

            if (nama_ketua_jabatan_master != null){
                $("#kerajaan_namappp").val(nama_ketua_jabatan_master);
            } else {
                $("#kerajaan_namappp").val(obj_hrmis["ketua jabatan"].namappp);
            }

            if (emel_ketua_jabatan_master != null){
                $("#kerajaan_emailppp").val(emel_ketua_jabatan_master);
            } else {
                $("#kerajaan_emailppp").val(obj_hrmis["ketua jabatan"].emailppp);
            }

            if (notel_ketua_jabatan_master != null){
                $("#kerajaan_notel_penyelia").val(notel_ketua_jabatan_master);
            }
            $("#loading_modal").modal("hide");
            $("#modal_daftar_penilaian").modal("show");
        });
        $("#mohon_kerajaan").removeClass('d-none');
        $("#mohon_swasta").html('');
    }
}

function notification_details(id_1,id_2,id_3){
    sessionStorage.id_1 = id_1; // ID per tempahan
    sessionStorage.id_2 = id_2; // KOD jenis fasiliti
    sessionStorage.id_3 = id_3; // ID per permohonan

    window.sessionStorage.content = "html/detail_list_temps";
    $('#content').load('html/detail_list_temps.html');
}

var confirmed = false;

$("#mohon_kerajaan").on('submit', function (e) {
    let token = localStorage.token;
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Daftar Permohonan",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {
            let no_kad_pengenalan = noic_master;
            let skim = $("#kerajaan_skim").val();
            let taraf_jawatan = $("#kerajaan_FK_taraf_jawatan").val();
            let FK_jenis_pengguna = $("#kerajaan_FK_jenis_pengguna").val();
            let notel_kerajaan = $("#kerajaan_notel_kerajaan").val();
            let notel = $("#kerajaan_notel").val();
            let FK_kementerian = $("#kerajaan_FK_kementerian").val();
            let FK_agensi = $("#kerajaan_FK_agensi").val();
            let alamat_majikan = $("#kerajaan_alamat_majikan").val();
            let nama_ketua_jabatan = $("#kerajaan_namappp").val();
            let emel_ketua_jabatan = $("#kerajaan_emailppp").val();
            let notel_ketua_jabatan = $("#kerajaan_notel_penyelia").val();
            let jawatan_ketua_jabatan = $("#kerajaan_jawatan_ketua_jabatan").val();

            var form = new FormData();
            // formData.append("key","mSideDiary");
            form.append("id_users", id_users_master);
            form.append("no_kad_pengenalan", no_kad_pengenalan);
            form.append("skim", skim);
            form.append("taraf_jawatan", taraf_jawatan);
            form.append("FK_jenis_pengguna", FK_jenis_pengguna);
            form.append("notel_kerajaan", notel_kerajaan);
            form.append("notel", notel);
            form.append("FK_kementerian", FK_kementerian);
            form.append("FK_agensi", FK_agensi);
            form.append("alamat_majikan", alamat_majikan);
            form.append("nama_ketua_jabatan", nama_ketua_jabatan);
            form.append("emel_ketua_jabatan", emel_ketua_jabatan);
            form.append("notel_ketua_jabatan", notel_ketua_jabatan);
            form.append("jawatan_ketua_jabatan", jawatan_ketua_jabatan);
            form.append("updated_by", id_users_master);

            uptUsersKerajaan(form, function(){
                form.append("FK_siri_penilaian", $("#FK_siri_penilaian").val());
                form.append("created_by", id_users_master);
                regPermohonanPenilaian(form, function(){
                    if(obj.success){
                        swal({
                            title: "Permohonan Penilaian",
                            text: "Berjaya!",
                            type: "success",
                            closeOnConfirm: true,
                            allowOutsideClick: false,
                            html: false
                        }).then(function () {
                            $("#modal_daftar_penilaian").modal('hide');
                        });
                    } else {
                        swal({
                            title: "Permohonan Penilaian",
                            text: "Gagal! Anda telah membuat permohonan untuk penilaian ini.",
                            type: "error",
                            closeOnConfirm: true,
                            allowOutsideClick: false,
                            html: false
                        }).then(function () {
                            $("#modal_daftar_penilaian").modal('hide');
                        });
                    }
                });
            });
        });
    }
});

$("#mohon_swasta").on('submit', function (e) {
    let token = localStorage.token;
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Daftar Permohonan",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {
            let no_kad_pengenalan = noic_master;
            let nama = $("#swasta_nama").val();
            let nama_jawatan = $("#swasta_nama_jawatan").val();
            let notel_pejabat = $("#swasta_notel_pejabat").val();
            let notel = $("#swasta_notel").val();
            let emel = $("#swasta_emel").val();
            let alamat_majikan = $("#swasta_alamat_majikan").val();
            let nama_majikan = $("#swasta_nama_majikan").val();
            let emel_majikan = $("#swasta_emel_majikan").val();
            let notel_majikan = $("#swasta_notel_majikan").val();

            notel = notel + "/" + notel_pejabat;

            var form = new FormData();
            // formData.append("key","mSideDiary");
            form.append("id_users", id_users_master);
            form.append("nama", nama);
            form.append("no_kad_pengenalan", no_kad_pengenalan);
            form.append("jawatan", nama_jawatan);
            form.append("nama_jawatan", nama_jawatan);
            form.append("notel", notel);
            form.append("emel", emel);
            form.append("alamat_majikan", alamat_majikan);
            form.append("nama_majikan", nama_majikan);
            form.append("emel_majikan", emel_majikan);
            form.append("notel_majikan", notel_majikan);
            form.append("updated_by", id_users_master);

            uptUsersSwasta(form, function(){
                form.append("FK_siri_penilaian", $("#FK_siri_penilaian").val());
                form.append("created_by", id_users_master);
                let keterbukaan = $("#keterbukaan").val();
                if (keterbukaan == '3'){
                    form.append("FK_sesi", $("#FK_sesi").val());
                    regPermohonanPenilaian(form, function(){
                        if(obj.success){
                            swal({
                                title: "Permohonan Penilaian",
                                text: "Berjaya!",
                                type: "success",
                                closeOnConfirm: true,
                                allowOutsideClick: false,
                                html: false
                            }).then(function () {
                                $("#modal_daftar_penilaian").modal('hide');
                                loads_penilaian_open();
                            });
                        } else {
                            swal({
                                title: "Permohonan Penilaian",
                                text: "Gagal! Anda telah membuat permohonan untuk penilaian ini.",
                                type: "error",
                                closeOnConfirm: true,
                                allowOutsideClick: false,
                                html: false
                            }).then(function () {
                                $("#modal_daftar_penilaian").modal('hide');
                                loads_penilaian_open();
                            });
                        }
                    });
                } else {
                    var formNoAngkaGiliran = new FormData();
                    formNoAngkaGiliran.append('FK_siri_penilaian', $("#FK_siri_penilaian").val());
                    let no_angka_giliran = "";
                    showCalonSoalanBySiriPenilaian(formNoAngkaGiliran,function(){
                        let no_angka_giliran = "";
                        if(obj.success){
                            let result = obj.data;
                            no_angka_giliran = parseInt(result.no_angka_giliran);
                        } else {
                            no_angka_giliran = parseInt("10000");
                        }
                        form.append("no_angka_giliran", ++no_angka_giliran);
                        form.append("FK_sesi", $("#FK_sesi").val());
                        regCalonSoalan(form, function(){
                            if(obj.success){
                                swal({
                                    title: "Permohonan Penilaian",
                                    text: "Berjaya!",
                                    type: "success",
                                    closeOnConfirm: true,
                                    allowOutsideClick: false,
                                    html: false
                                }).then(function () {
                                    $("#modal_daftar_penilaian").modal('hide');
                                    loads_penilaian_open();
                                });
                            } else {
                                swal({
                                    title: "Permohonan Penilaian",
                                    text: "Gagal! Anda telah membuat permohonan untuk penilaian ini.",
                                    type: "error",
                                    closeOnConfirm: true,
                                    allowOutsideClick: false,
                                    html: false
                                }).then(function () {
                                    $("#modal_daftar_penilaian").modal('hide');
                                    loads_penilaian_open();
                                });
                            }
                        });
                    });
                }
            });
        });
    }
});
