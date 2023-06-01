$(function () {
    $.ajaxSetup({
        cache: false
    });
    checkSession();    
    let token = window.localStorage.token;            
    $("#leftsidebar").load('../aside/aside_detail_siri_penilaian.html');
    let id_siri_penilaian = sessionStorage.id_siri_penilaian;        
    load_siri_penilaian(id_siri_penilaian,token,function(){        
        if(objSiriPenilaian.success){
            let data = objSiriPenilaian.data;
            $("#btnKembali").attr('onclick','kembali2(\'' + data.id_penilaian + '\')');
            $("#kembali").attr('onclick','kembali()');
            $("#kembali2").attr('onclick','kembali2(\'' + data.id_penilaian + '\')');
            $('#nama_penilaian').html(data.nama_penilaian);
        }
    });

    load_setSoalan();
    // users(noic_master,token,function(){
    //     if(dataUsers.success){
    //     }
    //     else{
    //         reject_load();
    //     }
    // });
});

function load_setSoalan(){            
    list_setSoalan(window.sessionStorage.id_siri_penilaian,window.localStorage.token,function(){
        var columns = [
            { "name": "bil", "title": "Bil" }, 
            { "name": "kod_set", "title": "Set Soalan" },
            { "name": "statusrekod", "title": "Status" },
            { "name": "upt_btn", "title": "Lihat Set Soalan" },
            { "name": "pengesahan", "title": "Tindakan" },
        ];
        var list = [];
        let bil = 1;

        if(obj_setSoalan.success){
            
            let data = obj_setSoalan.data;
            let total_set = data.length;

            $("#set_soalan_key").html(char[total_set]);
            $.each(data,function(i,field){
                if(field.statusrekod == 1){
                    statusrekod = "Dalam Proses";
                }
                else if(field.statusrekod == 2){
                    statusrekod = "Selesai";
                }
                var btn_upt = '';
                if(field.statusrekod == 1){
                    btn_upt = ` <button class="btn btn-sm btn-success" onclick="approvalSetSoalan('2', '`+ field.id_set_soalan +`', '')"><i class="fas fa-check"></i></button>
                                <button class="btn btn-sm btn-danger" onclick="modalApproval('3', '`+ field.id_set_soalan +`')"><i class="fas fa-times"></i></button>`;
                } else if(field.statusrekod == 2){
                    btn_upt = `<span class="badge bg-success">SELESAI</span>`;
                } else if(field.statusrekod == 3){
                    btn_upt = `<span class="badge bg-danger">DITOLAK</span>`;
                }
                list.push({
                    "bil":bil++,
                    "kod_set":"SET "+field.kod_set,
                    "statusrekod":statusrekod,
                    "upt_btn":`<a href="javascript:void(0)" onclick="popUp('display_set/?set_soalan=`+field.id_set_soalan+`')" class="btn btn-link btn-sm text-info"><i class="fa fa-eye"></i></a>`,
                    "pengesahan":btn_upt,
                });
            });
        }
        
        $("#list_setSiri").html('');
        if (list.length > 0){
            $("#list_setSiri").footable({
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
    });
}

var confirmed = false;

$("#approvalTolak").on('submit',function(e){
    if(!confirmed){
        e.preventDefault();
        swal({
            title: "Tolak Set Soalan",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            confirmButtonColor: "#2196f3",
            closeOnConfirm: true,
            allowOutsideClick: false,
        }).then(function(){
            let id_set_soalan = $("#upt_id_set_soalan").val();
            let statusrekod = $("#statusrekod").val();
            let catatan = $("#catatan").val();
            var form = new FormData();
            form.append("id_set_soalan", id_set_soalan);
            form.append("statusrekod", statusrekod);
            form.append("catatan", catatan);
            apprSetSoalan(form, function(){
                if(obj.success){
                    swal({
                        title:"Tolak Set Soalan",
                        text: "Berjaya!",
                        type: "success",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 1500
                    }).then(function(){},
                        function (dismiss) {
                            if (dismiss === 'timer') {
                                load_setSoalan();
                                $("#modalApprovalTolak").modal("hide");
                            }
                        }
                    );
                }
            });
        });
    }
});

function modalApproval(statusrekod, id_set_soalan){
    $("#statusrekod").val(statusrekod);
    $("#upt_id_set_soalan").val(id_set_soalan);
    $("#statusrekod").val(statusrekod);
    $("#modalApprovalTolak").modal("show");
}

function approvalSetSoalan(statusrekod, id_set_soalan, catatan){
    textlulus = "Lulus";
    if(statusrekod == 3){
        textlulus = "Tolak"
    }
    swal({
        title: textlulus + " Set Soalan",
        text: "Anda Pasti Untuk Kemaskini?",
        type: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
        confirmButtonColor: "#2196f3",
        closeOnConfirm: true,
        allowOutsideClick: false,
        html: false
    }).then(function () {
        var form = new FormData();
        form.append("id_set_soalan", id_set_soalan);
        form.append("statusrekod", statusrekod);
        form.append("catatan", catatan);
        apprSetSoalan(form, function(){
            if(obj.success){
                swal({
                    title: textlulus + " Set Soalan",
                    text: "Berjaya!",
                    type: "success",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    html: false,
                    timer: 1500
                }).then(function(){},
                    function (dismiss) {
                        if (dismiss === 'timer') {
                            load_setSoalan();
                        }
                    }
                );
            }
        });
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
