$(function () {
    $.ajaxSetup({
        cache: false
    });
    checkSession();
    let token = window.localStorage.token;
    
    if(sessionStorage.capaian == capaian[1])    {
        $("#buttonDaftarPenyelaras").removeClass('hidden').attr('onclick',"daftar('penyelaras');");
    }

    load_penyelaras(token,FK_kluster_master,function(){
        if(objPenyelaras.success){
            $("#FK_users").html('<option value="">Pilih Pegawai Penyelaras</option>');
            let dataPenyelaras = objPenyelaras.data;
            
            $.each(dataPenyelaras,function(i,field){
                $("#FK_users").append('<option value="'+field.FK_users+'">'+field.nama+' ('+ field.no_kad_pengenalan +')</option>');
            });
            
            $("#FK_users").select2({
                width: null,
                containerCssClass: ':all:'
            });
        }
    });

    load_kluster(token,function(){
        if(objKluster.success){
            $("#FK_kluster").html('<option value="">Pilih Program/Pusat Penilaian</option>');
            let dataPenyelaras = objKluster.data;
            $.each(dataPenyelaras,function(i,field){
                let selected = "";
                if(field.id_kluster == FK_kluster_master){
                    selected = "selected"
                }
                $("#FK_kluster").append('<option '+ selected +' value="'+field.id_kluster+'">'+field.nama_kluster+'</option>');
            });
            
            $("#FK_kluster").select2({
                width: null,
                containerCssClass: ':all:'
            });
        }
    });

    tablePenyelaras(token);
});

function daftar(content) {
    var listSettings = ["penyelaras"];
    $.each(listSettings, function (i, item) {
        switch (item) {
            case content: $('#modaldaftar' + item).modal('show'); break;
        }
    });
}

$("#dftr_users").click(function () {
    $("#check_noic").modal('show');
});

var confirmed = false;

// FUNCTION REGISTER

$("#register").on('submit', function (e) {
    let token = localStorage.token;
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Daftar Penyelaras Penilaian Bagi Program/Pusat " + nama_kluster_master,
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {
            let FK_users = $("#FK_users").val();
            let FK_kluster = $("#FK_kluster").val();

            var form = new FormData();
            // formData.append("key","mSideDiary");
            form.append("FK_users", FK_users);
            form.append("FK_kluster", FK_kluster);
            form.append("created_by", id_users_master);
            form.append("updated_by", id_users_master);

            var settings = {
                "url": host + "penyelaras/add",
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
                        title: "Daftar Penyelaras Penilaian Bagi Program/Pusat " + nama_kluster_master,
                        text: result.data,
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        $("#modaldaftarpenyelaras").modal('hide');
                    });
                } else {
                    swal({
                        title: "Daftar Penyelaras Penilaian Bagi Program/Pusat " + nama_kluster_master,
                        text: "Berjaya!",
                        type: "success",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        refreshToken(noic_master,token,function(){
                            if(dataToken.success){
                                // localStorage.token = dataToken.token;
                                token = localStorage.token;
                                $("#modaldaftarpenyelaras").modal('hide');
                                tablePenyelaras(token);
                            }
                        });
                    });
                    
                }
            });

            $.ajax(settings).fail(function(response){
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
                            $("#modaldaftarpenyelaras").modal('hide');
                        }
                    }
                );
            });
        });
    }
});

function tablePenyelaras(token) {
    var columns = [
        { "name": "bil", "title": "Bil" },
        { "name": "nama_kluster", "title": "Program/Pusat" },
        { "name": "nama", "title": "Nama Penyelaras" },
        { "name": "statusrekod", "title": "Status" },
        { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
        // {"name":"status","title":"Status","breakpoints":"sm xs"}
    ];

    var form = new FormData();
    form.append("FK_kluster", FK_kluster_master);
    var settings = {
        "url": host + "penyelaras/listByKluster",
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
        let convertList = JSON.stringify(result.data);
        $("#dataSenaraiPenyelaras").val(convertList);
        var list = [];
        let bil = 1;
        $.each(result.data, function (i, field) {
            var checked;
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
            if (sessionStorage.capaian == capaian[1]) {
                disableddel = '';
                onclickdel = 'del_rekod(\'' + field.id_penyelaras + '\',\'' + token + '\')';
            }

            list.push({
                bil: bil++, id_penyelaras: field.id_penyelaras, 
                nama: field.nama, nama_kluster: field.nama_kluster,
                statusrekod: '<div class="material-switch"><input id="switch_del'+ field.id_penyelaras +'" ' + disableddel + ' ' + checked + ' onclick="' + onclickdel + '" type="checkbox"/><label for="switch_del'+ field.id_penyelaras +'" id="label_switch'+ field.id_penyelaras +'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod' + field.id_penyelaras + '" class="badge ' + badge + '">' + text_statusrekod + '</span></div>',
                upt_btn: '<button class="btn btn-circle btn-primary btn-sm" data-ui-toggle-class="zoom" data-ui-target="#animate" onclick="loadDataCapaian(\'' + i + '\')"><i class="ti-pencil-alt"></i></button> '
            });
        });
        $("#listSenaraiPenyelaras").html("");
        $("#listSenaraiPenyelaras").footable({
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
            title: "Tiada Pegawai Berdaftar.",
            // text: "Berjaya Kemaskini Profile!",
            type: "error",
            showConfirmButton: false,
            allowOutsideClick: false,
            html: false,
            timer: 2000
        }).then(function(){},
            function (dismiss) {
                if (dismiss === 'timer') {
                    daftar('penyelaras');
                }
            }
        );
    });
}

// FUNCTION DELETE

function del_rekod(i, token) {
    let id = i;

    var form = new FormData();
    // form.append("recordstatus", statusrekod);
    form.append("id_penyelaras", id);
    // console.log(id)
    var settings = {
        "url": host + "penyelaras/delete",
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
                window.location.reload();
            });
        }
        // console.log(result.data)
        if (result.data.statusrekod == 1) {
            $('#text_statusrekod' + result.data.id_penyelaras).text('Aktif').removeClass("badge-danger").addClass("badge-success");
        } else {
            $('#text_statusrekod' + result.data.id_penyelaras).text('Tidak Aktif').removeClass("badge-success").addClass("badge-danger");
        }
        // saveLog(window.sessionStorage.id, "Update Data for [id_capaian = " + id + "], [FK_users = " + FK_users + "] at Tetapan Peranan & Capaian.", window.sessionStorage.browser);
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
            "Authorization": "fasiliti " + window.localStorage.token
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
        saveLog(window.sessionStorage.id, "Update Data for [id_users = " + id + "], [FK_users = " + FK_users + "] at Tetapan Peranan & Capaian.", window.sessionStorage.browser);
    });
}

$('#FK_agensi').change(function () {
    var settings = {
        "url": host + "klusters/" + $('#FK_agensi').val(),
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "fasiliti " + window.localStorage.token
        }
    };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_kluster').empty();
        $('#FK_kluster').append($('<option>', {
            value: "",
            text: "Pilih Program/Pusat"
        }));
        $.each(response.data, function (i, item) {
            if ($('#FK_agensi').val() != '11') {
                var selected = 'selected';
                $('#FK_kluster').append($('<option>', {
                    value: item.id_kluster,
                    text: item.nama_kluster
                }).attr(selected, true));
                subklusterListNonKiara();
                // alert(selected)
            } else {
                var selected = 'selected';
                $('#FK_kluster').append($('<option>', {
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
            "Authorization": "fasiliti " + window.localStorage.token
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
            "Authorization": "fasiliti " + window.localStorage.token
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

$('#FK_kluster').change(function () {
    //Dropdown Subkluster List
    var settings = {
        "url": host + "subklusters/" + $('#FK_kluster').val(),
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "fasiliti " + window.localStorage.token
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
            "Authorization": "fasiliti " + window.localStorage.token
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
            "Authorization": "fasiliti " + window.localStorage.token
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

function gelaranlist(returnValue) {

    var settings = {
        "url": host + "gelaransList",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "fasiliti " + window.localStorage.token
        }
    };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        obj_gelaran = response;
        returnValue();
    });
    // END Dropdown Agensi List
}

function agensilist(nama_agensi) {
    var form = new FormData();
    form.append("FK_peranan", window.sessionStorage.FK_peranan);
    form.append("FK_agensi", window.sessionStorage.FK_agensi);

    var settings = {
        "url": host + "fasiliti_agensi/list",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": "fasiliti " + window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        result = JSON.parse(response);
        $('#FK_agensi_add').empty();
        $('#FK_agensi_add').append($('<option>', {
            value: "",
            text: "Pilih Agensi"
        }));
        $('#FK_agensi').empty();
        $('#FK_agensi').append($('<option>', {
            value: "",
            text: "Pilih Agensi"
        }));
        $('#upt_FK_agensi').empty();
        $('#upt_FK_agensi').append($('<option>', {
            value: "",
            text: "Pilih Agensi"
        }));
        $.each(result.data, function (i, item) {
            if (nama_agensi == item.nama_agensi) {
                $('#FK_agensi_add').append($('<option>', {
                    value: item.id_agensi,
                    text: item.nama_agensi
                }).attr('selected', true));
                $('#FK_agensi').append($('<option>', {
                    value: item.id_agensi,
                    text: item.nama_agensi
                }).attr('selected', true));
                $('#upt_FK_agensi').append($('<option>', {
                    value: item.id_agensi,
                    text: item.nama_agensi
                }).attr('selected', true));
            } else {
                $('#FK_agensi_add').append($('<option>', {
                    value: item.id_agensi,
                    text: item.nama_agensi
                }));
                $('#FK_agensi').append($('<option>', {
                    value: item.id_agensi,
                    text: item.nama_agensi
                }));
                $('#upt_FK_agensi').append($('<option>', {
                    value: item.id_agensi,
                    text: item.nama_agensi
                }));
            }
        });

    });
    // END Dropdown Agensi List
}

function kementerianlist(nama_kementerian) {
    var form = new FormData();
    form.append("FK_peranan", window.sessionStorage.FK_peranan);
    form.append("FK_kementerian", window.sessionStorage.FK_kementerian);

    var settings = {
        "url": host + "kementeriansList",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": "fasiliti " + window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        result = JSON.parse(response);
        $('#FK_kementerian_add').empty();
        $('#FK_kementerian_add').append($('<option>', {
            value: "",
            text: "Pilih Kementerian"
        }));
        $('#FK_kementerian').empty();
        $('#FK_kementerian').append($('<option>', {
            value: "",
            text: "Pilih Kementerian"
        }));
        $('#upt_FK_kementerian').empty();
        $('#upt_FK_kementerian').append($('<option>', {
            value: "",
            text: "Pilih Kementerian"
        }));
        $.each(result.data, function (i, item) {
            if (nama_kementerian == item.nama_kementerian) {
                $('#FK_kementerian_add').append($('<option>', {
                    value: item.id_kementerian,
                    text: item.nama_kementerian
                }).attr('selected', true));
                $('#FK_kementerian').append($('<option>', {
                    value: item.id_kementerian,
                    text: item.nama_kementerian
                }).attr('selected', true));
                $('#upt_FK_kementerian').append($('<option>', {
                    value: item.id_kementerian,
                    text: item.nama_kementerian
                }).attr('selected', true));
            } else {
                $('#FK_kementerian_add').append($('<option>', {
                    value: item.id_kementerian,
                    text: item.nama_kementerian
                }));
                $('#FK_kementerian').append($('<option>', {
                    value: item.id_kementerian,
                    text: item.nama_kementerian
                }));
                $('#upt_FK_kementerian').append($('<option>', {
                    value: item.id_kementerian,
                    text: item.nama_kementerian
                }));
            }
        });

    });
    // END Dropdown Kementerian List
}

function check_agensi(nama_agensi, returnValue) {
    var form = new FormData();
    form.append("FK_peranan", window.sessionStorage.FK_peranan);
    form.append("FK_agensi", window.sessionStorage.FK_agensi);
    form.append("nama_agensi", nama_agensi);

    var settings = {
        "url": host + "fasiliti_agensi/listCheckNama",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": "fasiliti " + window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    $.ajax(settings).done(function (response) {
        obj_check_agensi = response;
        returnValue();
    });
    // END Dropdown Agensi List
}

//Dropdown Peranan List
var settings = {
    "url": host + "perananList",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "Authorization": "fasiliti " + window.localStorage.token
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
        "Authorization": "fasiliti " + window.localStorage.token
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

function listsubmodul() {
    //Checkbox Submodul List
    sessionStorage.listsubmodule = [];
    var listsubmodule = [];
    var settings = {
        "url": host + "submodulsList",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "fasiliti " + window.localStorage.token
        },
    };

    $.ajax(settings).done(function (response) {

        //LIST OPTION
        $.each(response.data, function (i, item) {
            $('#FK_capaian').append($('<table width="70%">' +
                '<tbody>' +
                '<tr>' +
                '<td width="40%"><label>' + item.nama_submodul + '</label></td>' +
                '<td width="10%"><input class="form-control filled-in chk-col-light-blue" type="checkbox" name="crud" value="C' + item.id_submodul + '" id="c' + item.id_submodul + '"/><label for="c' + item.id_submodul + '"> Create</label></td>' +
                '<td width="10%"><input class="form-control filled-in chk-col-light-blue" type="checkbox" name="crud" value="R' + item.id_submodul + '" id="r' + item.id_submodul + '"/><label for="r' + item.id_submodul + '"> Read</label></td>' +
                '<td width="10%"><input class="form-control filled-in chk-col-light-blue" type="checkbox" name="crud" value="U' + item.id_submodul + '" id="u' + item.id_submodul + '"/><label for="u' + item.id_submodul + '"> Update</label></td>' +
                '<td width="10%"><input class="form-control filled-in chk-col-light-blue" type="checkbox" name="crud" value="D' + item.id_submodul + '" id="d' + item.id_submodul + '"/><label for="d' + item.id_submodul + '"> Delete</label></td>' +
                '</tr>' +
                '</tbody>' +
                '</table>'));


            $('#upt_FK_capaian').append($('<table width="70%">' +
                '<tbody>' +
                '<tr>' +
                '<td width="40%"><label>' + item.nama_submodul + '</label></td>' +
                '<td width="10%"><input class="form-control filled-in chk-col-light-blue" type="checkbox" name="upt_crud" value="C' + item.id_submodul + '" id="upt_C' + item.id_submodul + '"/><label for="upt_C' + item.id_submodul + '"> Create</label></td>' +
                '<td width="10%"><input class="form-control filled-in chk-col-light-blue" type="checkbox" name="upt_crud" value="R' + item.id_submodul + '" id="upt_R' + item.id_submodul + '"/><label for="upt_R' + item.id_submodul + '"> Read</label></td>' +
                '<td width="10%"><input class="form-control filled-in chk-col-light-blue" type="checkbox" name="upt_crud" value="U' + item.id_submodul + '" id="upt_U' + item.id_submodul + '"/><label for="upt_U' + item.id_submodul + '"> Update</label></td>' +
                '<td width="10%"><input class="form-control filled-in chk-col-light-blue" type="checkbox" name="upt_crud" value="D' + item.id_submodul + '" id="upt_D' + item.id_submodul + '"/><label for="upt_D' + item.id_submodul + '"> Delete</label></td>' +
                '</tr>' +
                '</tbody>' +
                '</table>'));
            listsubmodule.push(item.id_submodul);
        });
        sessionStorage.listsubmodule = listsubmodule;
    });
    // END Checkbox Format List
}

function listfasiliti(peranan, values) {
    //Checkbox Submodul List
    console.log(values);
    let check = '';
    if ((peranan == '1') || (peranan == '2') || (peranan == '3')) {
        check = 'checked';
    }
    sessionStorage.listfasiliti = [];
    var listfasiliti = [];
    var settings = {
        "url": host + "daftar/jenis_fasiliti/list",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "fasiliti " + window.localStorage.token
        },
    };
    $.ajax(settings).done(function (response) {
        $('#jenis_fasiliti').append($('<table width="70%">' +
            '<tbody>'));
        $('#jenis_fasiliti_add').append($('<table width="70%">' +
            '<tbody>'));
        //LIST OPTION
        $.each(response.data, function (i, item) {
            $('#jenis_fasiliti').append($('<tr>' +
                '<td width="10%"><input class="form-control filled-in chk-col-light-blue" type="checkbox" ' + check + ' name="list_jenis_fasiliti" value="' + item.kod_jenis_fas + '" id="fasiliti_' + item.kod_jenis_fas + '"/><label style="text-transform: capitalize;" for="fasiliti_' + item.kod_jenis_fas + '"> ' + item.jenis_fas + '</label></td>' +
                '</tr>'));

            $('#jenis_fasiliti_add').append($('<tr>' +
                '<td width="10%"><input class="form-control filled-in chk-col-light-blue" type="checkbox" ' + check + ' name="list_jenis_fasiliti_add" value="' + item.kod_jenis_fas + '" id="fasiliti_' + item.kod_jenis_fas + '_add"/><label style="text-transform: capitalize;" for="fasiliti_' + item.kod_jenis_fas + '_add"> ' + item.jenis_fas + '</label></td>' +
                '</tr>'));

            $('#upt_jenis_fasiliti').append($('<tr>' +
                '<td width="10%"><input class="form-control filled-in chk-col-light-blue" type="checkbox" name="upt_list_jenis_fasiliti" value="' + item.kod_jenis_fas + '" id="upt_fasiliti_' + item.kod_jenis_fas + '"/><label style="text-transform: capitalize;" for="upt_fasiliti_' + item.kod_jenis_fas + '"> ' + item.jenis_fas + '</label></td>' +
                '</tr>'));
            listfasiliti.push(item.kod_jenis_fas);
        });
        $('#jenis_fasiliti').append($('<table width="70%">' +
            '<tbody>'));
        $('#jenis_fasiliti_add').append($('<table width="70%">' +
            '<tbody>'));
        sessionStorage.listfasiliti = listfasiliti;
        if (values != null) {
            $('input[type=checkbox]').prop('checked', false);
            listjenisfasiliti = values.split(",");

            $.each(JSON.parse(listjenisfasiliti), function(i, item){
                $("#upt_fasiliti_"+item.fasiliti).prop("checked", true);
            });
        }
    });
    // END Checkbox Format List
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
function resetForm() {
    document.getElementById('registerPeranan').reset();
    sessionStorage.removeItem('peranan');
    $('#jenis_fasiliti').html('');
    $('#jenis_fasiliti_add').html('');
    $('#upt_jenis_fasiliti').html('');
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
