var id_sesi_siri_penilaian, json_list, bil_calon;
$(function () {
    $.ajaxSetup({
        cache: false
    });
    checkSession();    
    let token = window.localStorage.token;            
    $("#leftsidebar").load('../aside/aside_detail_siri_penilaian.html');
    let id_siri_penilaian = sessionStorage.id_siri_penilaian;
    // resetForm();

    $("#buttonUptSiriPenilaian").removeClass('hidden').attr('onclick',"kemaskini('siripenilaian');");

    load_siri_penilaian(id_siri_penilaian,token,function(){        
        if(objSiriPenilaian.success){
            let data = objSiriPenilaian.data;
            $("#btnKembali").attr('onclick','kembali2(\'' + data.id_penilaian + '\')');
            $("#kembali").attr('onclick','kembali()');
            $("#kembali2").attr('onclick','kembali2(\'' + data.id_penilaian + '\')');
            $("#nama_penilaian").html(data.nama_penilaian + " SIRI " + data.kod+"/"+data.tahun);
        }
    });
    load_permohonan();
    // users(noic_master,token,function(){
    //     if(dataUsers.success){
    //     }
    //     else{
    //         reject_load();
    //     }
    // });
});

function load_permohonan(){
    var columns = [
        { "name": "bil", "title": "Bil" },
        { "name": "nama", "title": "Nama" },
        { "name": "no_kad_pengenalan", "title": "No. Kad Pengenalan" },
        { "name": "notel", "title": "No. Telefon" },
        { "name": "emel", "title": "Emel"},
        { "name": "nama_jawatan", "title": "Jawatan", "breakpoints": "md sm xs" },
        { "name": "skim", "title": "Skim", "breakpoints": "md sm xs" },
        { "name": "upt_btn", "title": "Status Permohonan", "breakpoints": "md sm xs" },
        // {"name":"status","title":"Status","breakpoints":"sm xs"}
    ];
    var form = new FormData();
    form.append("FK_siri_penilaian", sessionStorage.id_siri_penilaian);
    listPermohonanBySiriPenilaian(form, function(){
        if(obj.success){
            var list = [];
            let bil = 1;
            $.each(obj.data, function (i, field) {
                var checked;
                var jenis_penilaian = '';
                var btn_upt = '';
                let status_permohonan;
                if(field.status_permohonan == "DALAM PROSES"){
                    btn_upt = ` <button class="btn btn-sm btn-success" onclick="setSesi(`+ window.sessionStorage.id_siri_penilaian +`, '`+ field.enc_id_permohonan_penilaian +`')"><i class="fas fa-check"></i></button>
                                <button class="btn btn-sm btn-danger" onclick="approval('DITOLAK', '`+ field.enc_id_permohonan_penilaian +`')"><i class="fas fa-times"></i></button>`;
                } else if(field.status_permohonan == "LULUS"){
                    btn_upt = `<span class="badge bg-success">`+field.status_permohonan+`</span>`;
                } else if(field.status_permohonan == "DITOLAK"){
                    btn_upt = `<span class="badge bg-danger">`+field.status_permohonan+`</span>`;
                }

                list.push({
                    bil: bil++, 
                    nama: field.nama, 
                    no_kad_pengenalan: field.no_kad_pengenalan, 
                    notel: field.notel, 
                    emel: field.emel, 
                    nama_jawatan: field.nama_jawatan,
                    skim: field.skim,
                    status_permohonan: field.status_permohonan,
                    upt_btn: btn_upt,
                });
            });

            $("#listPermohonanCalon").footable({
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
    });
}

function setSesi(id_siri_penilaian, id_permohonan_penilaian){
    loadSesiPenilaian(id_siri_penilaian, function(){
        $("#FK_sesi").html('');
        $("#FK_sesi").append(`<option value="">Pilih Sesi</option>`);
        $.each(objSesi.data, function(i, item){
            $("#FK_sesi").append(`<option value="`+item.id_sesi_siri_penilaian+`">`+item.sesi_penilaian+`</option>`);
        });
        $("#enc_id_permohonan_penilaian").val(id_permohonan_penilaian);
        $("#modalApprovePermohonan").modal("show");
    });
}

function approval(status_permohonan, id_permohonan_penilaian){
    swal({
        title: "Lulus Permohonan",
        text: "Anda Pasti Untuk Kemaskini?",
        type: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
        closeOnConfirm: true,
        allowOutsideClick: false,
        html: false
    }).then(function () {
        var form = new FormData();
        form.append("id_permohonan_penilaian", id_permohonan_penilaian);
        form.append("status_permohonan", status_permohonan);
        apprPermohonanPenilaian(form, function(){
            if(obj.success){
                if(status_permohonan == "LULUS"){
                    console.log(obj.data);
                    form.append("nama", obj.data.nama);
                    form.append("no_kad_pengenalan", obj.data.no_kad_pengenalan);
                    form.append("gred", obj.data.skim);
                    form.append("jawatan", obj.data.nama_jawatan);
                    form.append("emel", obj.data.emel);
                    form.append("notel", obj.data.notel);
                    form.append("FK_siri_penilaian", obj.data.FK_siri_penilaian);
                    form.append("FK_sesi", $("#FK_sesi").val());
                    regCalonSoalan(form,function(){
                        if(obj.success){
                            var form = new FormData();
                            form.append("id_sesi_siri_penilaian", $("#FK_sesi").val());
                            form.append("bil_calon", (parseInt(bil_calon)+1));
                            form.append("updated_by", id_users_master);
                            updateBilCalonSesiPenilaian(form, function(){
                                if(obj.success){
                                    swal({
                                        title: "Permohonan",
                                        text: "Permohonan Berjaya.",
                                        type: "success",
                                        showConfirmButton: false,
                                        allowOutsideClick: false,
                                        html: false,
                                        timer: 1500
                                    }).then(function(){},
                                        function (dismiss) {
                                            if (dismiss === 'timer') {
                                                $("#modalApprovePermohonan").modal("hide");
                                                load_permohonan();
                                            }
                                        }
                                    );
                                }
                            });
                        }
                    });
                } else {
                    swal({
                        title: "Permohonan",
                        text: "Permohonan Berjaya.",
                        type: "success",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 1500
                    }).then(function(){},
                        function (dismiss) {
                            if (dismiss === 'timer') {
                                load_permohonan();
                            }
                        }
                    );

                }
            }
        });
    });
}

var confirmed = false;

$("#approvalLulus").on('submit', function (e) {
    let token = localStorage.token;
    let enc_id_permohonan_penilaian = $("#enc_id_permohonan_penilaian").val();
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        id_sesi_siri_penilaian = $("#FK_sesi").val();
        loadContentSesi(id_sesi_siri_penilaian, function(){
            if(objSesi.success){
                result = objSesi.data;
                json_set_soalan = JSON.parse(result.json_set_soalan);
                bil_calon = result.bil_calon;
                var id_set_soalan = Math.floor(Math.random() * json_set_soalan.length);
                id_set_soalan = json_set_soalan[id_set_soalan];
                var form = new FormData();
                form.append("id_set_soalan", id_set_soalan.id_set);
                show_setSoalan(form,token,function(){
                    if(obj_setSoalan.success){
                        json_list = obj_setSoalan.data.json_list;
                        approval('LULUS', enc_id_permohonan_penilaian);
                    }
                });
            }
        });
    }
});

$("#btnKembali").click(function(){
    kembali();
});

function kembali(){
    sessionStorage.child = "b0f7c80a40e3d2b78df8f0e6c22f31e5";
    checkAuthentication(sessionStorage.child);
}

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