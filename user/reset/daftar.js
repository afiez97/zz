$(function () {
    $.ajaxSetup({
        cache: false
    });
    $("#loading_modal").modal('show');
    
    gelaranList(function () {
        $('#FK_gelaran').empty();
        $('#FK_gelaran').append($('<option>', {
            value: "",
            text: "Pilih gelaran"
        }));
        if (obj_gelaranList.success) {
            $.each(obj_gelaranList.data, function (i, item) {
                $('#FK_gelaran').append($('<option>', {
                    value: item.id_gelaran,
                    text: item.nama_gelaran
                }));
            });
        }
    });
    
    kategoriperkhidmatanList(function () {
        $('#kategori_perkhidmatan').empty();
        $('#kategori_perkhidmatan').append($('<option>', {
            value: "",
            text: "Pilih Kategori Perkhidmatan"
        }));
        if (obj_kategoriperkhidmatanList.success) {
            $.each(obj_kategoriperkhidmatanList.data, function (i, item) {
                $('#kategori_perkhidmatan').append($('<option>', {
                    value: item.id_kategoriperkhidmatan,
                    text: item.nama_kategoriperkhidmatan
                }));
            });
        }
    });
    kementerianList(function () {
        $('#FK_kementerian').empty();
        $('#FK_kementerian').append($('<option>', {
            value: "",
            text: "Pilih Kementerian"
        }));
        if (obj_kementerianList.success) {
            $.each(obj_kementerianList.data, function (i, item) {
                $('#FK_kementerian').append($('<option>', {
                    value: item.id_kementerian,
                    text: item.nama_kementerian
                }));
            });
        }
    });
    agensiList(function () {
        $('#FK_agensi').empty();
        $('#FK_agensi').append($('<option>', {
            value: "",
            text: "Pilih Agensi"
        }));
        if (obj_agensiList.success) {
            $.each(obj_agensiList.data, function (i, item) {
                $('#FK_agensi').append($('<option>', {
                    value: item.id_agensi,
                    text: item.nama_agensi
                }));
            });
        }
    });
    kat_agensiList(function () {
        $('#FK_kat_agensi').empty();
        $('#FK_kat_agensi').append($('<option>', {
            value: "",
            text: "Pilih Kategori Agensi"
        }));
        if (obj_kat_agensiList.success) {
            $.each(obj_kat_agensiList.data, function (i, item) {
                $('#FK_kat_agensi').append($('<option>', {
                    value: item.id_kat_agensi,
                    text: item.nama_kat_agensi
                }));
            });
        }
    });
    tarafJawatanList(function () {
        $('#taraf_jawatan').empty();
        $('#taraf_jawatan').append($('<option>', {
            value: "",
            text: "Pilih Kategori Agensi"
        }));
        if (obj_tarafJawatanList.success) {
            $.each(obj_tarafJawatanList.data, function (i, item) {
                $('#taraf_jawatan').append($('<option>', {
                    value: item.id_tarafjawatan,
                    text: item.nama_tarafjawatan
                }));
            });
        }
    });
    // document.getElementById("no_kad_pengenalan").value = window.sessionStorage.no_kad_pengenalan;
    let noic = window.localStorage.no_kad_pengenalan;
    check_hrmis(noic, function () {

        if (obj_hrmis == "2") {
            $("#no_kad_pengenalan").val(noic);

        }
        else {
            // $("#FK_kat_agensi option").filter(function() {
            //     return $(this).text() == obj_hrmis.perkhidmatan.AgcyGrpNm;
            // }).prop('selected', true);
            hrmisGelaran(obj_hrmis.peribadi.Title, function () {
                $('#FK_gelaran').val(objhrmisGelaran.data.id_gelaran);
            });
            hrmisKategoriPerkhidmatan(obj_hrmis.peribadi.ArmyPolice, function () {
                $('#kategori_perkhidmatan').val(objhrmisKategoriPerkhidmatan.data.id_kategoriperkhidmatan);
            });
            hrmisTarafJawatan(obj_hrmis.perkhidmatan.ApmtStatusNm, function () {
                $('#taraf_jawatan').val(objhrmisTarafJawatan.data.id_tarafjawatan);
            });
            $("#nama_jawatan").val(obj_hrmis.perkhidmatan.schmofservtitle).attr('readonly', true);
            // $("#FK_gelaran").val(6);
            $("#nama").val(obj_hrmis.peribadi.nama).attr('readonly', true);
            // $("#emel").val(obj_hrmis.peribadi.COEmail);
            $("#no_kad_pengenalan").val(obj_hrmis.peribadi.icno);
            $("#notel").val(obj_hrmis.peribadi.COOffTelNo);
            $("#emel_kerajaan").val(obj_hrmis.peribadi.COEmail).attr('readonly', true);
            $("#notel_kerajaan").val(obj_hrmis.peribadi.COHPhoneNo).attr('readonly', true);
            $("#skim").val(obj_hrmis.perkhidmatan.SalGrd);
            $("#usersluar").show();
            $("#no_kad_pengenalan_Semak").val('');
            hrmisKementerian(obj_hrmis.perkhidmatan.Kementerian, function () {
                $('#FK_kementerian').val(objhrmisKementerian.data.id_kementerian);
                hrmisKatAgensi(obj_hrmis.perkhidmatan.AgcyGrpNm, function(){
                    $('#FK_kat_agensi').val(obj_kat_agensi.data.id_kat_agensi);
                    let agensi = obj_hrmis.perkhidmatan.Bahagian.split(', ');
                    $.each(agensi, function (i, item) {
                        // console.log(item);
                        check_agensi(item, function () {
                            result = JSON.parse(obj_check_agensi);
                            let nama_agensi = result.data.nama_agensi;
                            if (result.success) {
                                hrmisAgensi($('#FK_kementerian').val(), $('#FK_kat_agensi').val(), function () {
                                    //LIST OPTION
                                    $('#FK_agensi').empty();
                                    $('#FK_agensi').append($('<option>', {
                                        value: "",
                                        text: "Pilih Agensi"
                                    }));
                                    if (obj_agensiList.success) {
                                        $.each(obj_agensiList.data, function (i, item) {
                                            if (nama_agensi == item.nama_agensi) {
                                                $('#FK_agensi').append($('<option>', {
                                                    value: item.id_agensi,
                                                    text: item.nama_agensi
                                                }).attr('selected', true));
                                            } else {
                                                $('#FK_agensi').append($('<option>', {
                                                    value: item.id_agensi,
                                                    text: item.nama_agensi
                                                }));
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    });
                });
            });
        }
    });
});
var confirmed = false;
$("#register").on('submit', function (e) {
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        $('#loading_modal').modal('show');
        $('#daftar').prop('disabled', true);
        let nama = $("#nama").val();
        let emel = $("#emel").val();
        let no_kad_pengenalan = $("#no_kad_pengenalan").val();
        let notel = $("#notel").val();
        let FK_jenis_pengguna = window.sessionStorage.FK_jenis_pengguna;
        let FK_gelaran = $("#FK_gelaran").val();
        let katalaluan = $("#katalaluan").val();
        let emel_kerajaan = $("#emel_kerajaan").val();
        let notel_kerajaan = $("#notel_kerajaan").val();
        let nama_jawatan = $("#nama_jawatan").val();
        let FK_kementerian = $('#FK_kementerian').val();
        let FK_kat_agensi = $('#FK_kat_agensi').val();
        let FK_agensi = $('#FK_agensi').val();
        let kategori_perkhidmatan = $('#kategori_perkhidmatan').val();
        let skim = $('#skim').val();
        let taraf_jawatan = $('#taraf_jawatan').val();
        let nama_majikan = $("#nama_majikan").val();
        let emel_majikan = $("#emel_majikan").val();
        let notel_majikan = $("#notel_majikan").val();

        var form = new FormData();
        
        form.append("no_kad_pengenalan", no_kad_pengenalan);
        form.append("nama", nama);
        form.append("emel", emel);
        form.append("notel", notel);
        form.append("FK_jenis_pengguna", FK_jenis_pengguna);
        form.append("FK_gelaran", FK_gelaran);
        form.append("katalaluan", katalaluan);
        form.append("emel_kerajaan", emel_kerajaan);
        form.append("notel_kerajaan", notel_kerajaan);
        form.append("nama_jawatan", nama_jawatan);
        form.append("FK_kementerian", FK_kementerian);
        form.append("FK_kat_agensi", FK_kat_agensi);
        form.append("FK_agensi", FK_agensi);
        form.append("kategori_perkhidmatan", kategori_perkhidmatan);
        form.append("skim", skim);
        form.append("taraf_jawatan", taraf_jawatan);
        form.append("nama_majikan", nama_majikan);
        form.append("emel_majikan", emel_majikan);
        form.append("notel_majikan", notel_majikan);

        auth_RegUser(form, function(){
            if(obj.success){
                swal({
                    title: "Daftar Pengguna",
                    text: obj.message,
                    confirmButtonText: "OK",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function () {
                    window.location.replace('../login/');
                });
            } else {
                swal({
                    title: "Daftar Pengguna",
                    text: obj.message,
                    confirmButtonText: "OK",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function () {
                    window.location.replace('../login/');
                });
            }
        });
    }
});

$("#poskod_pejabat").blur(function () {
    var settings = {
        "url": host + "sysposkod/" + $("#poskod_pejabat").val(),
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
    };

    $.ajax(settings).done(function (response) {
        document.getElementById("daerah_pejabat").value = response.data.bandar;
        document.getElementById("negeri_pejabat").value = response.data.nama;
    });
});

$('#FK_kat_agensi').change(function () {
    // alert($("#FK_kat_agensi").val())
    var settings = {
        "url": host + "agensis/" + $('#FK_kementerian').val() + "/" + $('#FK_kat_agensi').val(),
        "method": "GET",
        "timeout": 0
    };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_agensi').empty();
        $('#FK_agensi').append($('<option>', {
            value: "",
            text: "Pilih Agensi"
        }));
        $.each(response.data, function (i, item) {
            $('#FK_agensi').append($('<option>', {
                value: item.id_agensi,
                text: item.nama_agensi + " (" + item.kod_agensi + ")"
            }));
        });

    });
    // END Dropdown Sub Modul List    
});

function div(id, action){
    if(action == 'back'){
        $("#div"+(parseInt(id)-1)).removeClass('d-none');
        $("#div"+id).addClass('d-none');
    } else if(action == 'next') {
        $("#div"+(parseInt(id)+1)).removeClass('d-none');
        $("#div"+id).addClass('d-none');
    }
}

function gelaranList(returnValue) {
    //Dropdown Gelaran List
    var settings = {
        "url": host + "gelaransList",
        "method": "GET",
        "timeout": 0
    };

    $.ajax(settings).done(function (response) {
        obj_gelaranList = response;
        returnValue();
    });
    // END Dropdown Gelaran List
}

function skimList(returnValue) {
    //Dropdown Skim List
    var settings = {
        "url": host + "skimsList",
        "method": "GET",
        "timeout": 0
    };

    $.ajax(settings).done(function (response) {
        obj_skimList = response;
        returnValue();
    });
    // END Dropdown Skim List   
}

function gredList(returnValue) {
    //Dropdown Gred List
    var settings = {
        "url": host + "gredsList",
        "method": "GET",
        "timeout": 0
    };

    $.ajax(settings).done(function (response) {
        obj_gredList = response;
        returnValue();
    });
    // END Dropdown Gred List
}

function kategoriperkhidmatanList(returnValue) {
    //Dropdown Kategori Perkhidmatan List
    var settings = {
        "url": host + "kategoriperkhidmatansList",
        "method": "GET",
        "timeout": 0
    };
    $.ajax(settings).done(function (response) {
        obj_kategoriperkhidmatanList = response;
        returnValue();
    });
    // END Dropdown Kategori Perkhidmatan List
}

function kementerianList(returnValue) {
    //Dropdown Kementerian List
    var form = new FormData();
    form.append("FK_peranan", '1');
    form.append("FK_agensi", '0');
    var settings = {
        "url": host + "kementeriansList",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    $.ajax(settings).done(function (response) {
        obj_kementerianList = JSON.parse(response);
        returnValue();
    });
    // END Dropdown Kementerian List
}

function kat_agensiList(returnValue) {
    var settings = {
        "url": host + "katAgensisList",
        "method": "GET",
        "timeout": 0
    };
    $.ajax(settings).done(function (response) {
        // console.log(response)
        obj_kat_agensiList = response;
        returnValue();
    });
}

function tarafJawatanList(returnValue) {
    var settings = {
        "url": host + "tarafjawatansList",
        "method": "GET",
        "timeout": 0
    };
    $.ajax(settings).done(function (response) {
        // console.log(response)
        obj_tarafJawatanList = response;
        returnValue();
    });
}

function agensiList(returnValue) {
    //Dropdown Agensi List
    var form = new FormData();
    form.append("FK_peranan", '1');
    form.append("FK_agensi", '0');
    var settings = {
        "url": host + "agensisList",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    $.ajax(settings).done(function (response) {
        obj_agensiList = response;
        returnValue();
    });
    // END Dropdown Agensi List
}

function check_agensi(nama_agensi, returnValue) {
    var form = new FormData();
    form.append("FK_peranan", "1");
    form.append("FK_agensi", "0");
    form.append("nama_agensi", nama_agensi);

    var settings = {
        "url": host + "fasiliti_agensi/listCheckNama",
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
        obj_check_agensi = response;
        returnValue();
    });
    // END Dropdown Agensi List
}

function kat_agensiKod(kod_kat_agensi, returnValue) {
    //Dropdown Agensi List
    var form = new FormData();
    form.append("kod_kat_agensi", kod_kat_agensi);
    var settings = {
        "url": host + "katAgensisKod",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    $.ajax(settings).done(function (response) {
        obj_kat_agensi_Kod = JSON.parse(response);
        returnValue();
    });
    // END Dropdown Agensi List
}

function check_users(noic, returnValue) {
    var form = new FormData();
    form.append("no_kad_pengenalan", noic);

    var settings = {
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
    $.ajax(settings).done(function (response) {
        obj_users = response;
        returnValue();

    });
}

function check_hrmis(noic, returnValue) {
    var settings = {
        "url": "https://admin.dtims.intan.my/api/hrmis/check/"+noic,
        // "url": "http://'+window.location.hostname+'/admin/" + noic + ".json",
        // "url": "http://10.1.3.152/ezxs_webservice/index.php?ic="+noic,
        "method": "GET",
        "timeout": 0,
        // "headers": {
        //     "Authorization": window.localStorage.token
        // },
    };
    $.ajax(settings).done(function (response) {
        obj_hrmis = JSON.parse(response);
        // obj_hrmis = response;

        returnValue();
    });
}

function hrmisKementerianList(nama_kementerian) {
    //Dropdown Kementerian List
    var form = new FormData();
    form.append("nama_kementerian", nama_kementerian);
    var settings = {
        "url": host + "kementeriansName",
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
        //LIST OPTION
        result = JSON.parse(response)
        objhrmisKementerian = result;
        $('#FK_kementerian').empty();
        $.each(result.data, function (i, item) {
            $('#FK_kementerian').append($('<option>', {
                value: item.kod_kementerian,
                text: item.nama_kementerian + " (" + item.kod_kementerian + ")"
            }));
        });

    });
    // END Dropdown Kementerian List
}

function hrmisAgensiList(kod_agensi) {
    //Dropdown Agensi List
    var form = new FormData();
    form.append("kod_agensi", kod_agensi);
    var settings = {
        "url": host + "agensisKod",
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
        //LIST OPTION
        result = JSON.parse(response)
        $('#FK_agensi').empty();
        $.each(result.data, function (i, item) {
            $('#FK_agensi').append($('<option>', {
                value: item.kod_agensi,
                text: item.nama_agensi + " (" + item.kod_agensi + ")"
            }));
            hrmisBahagianList();
        });

    });
    // END Dropdown Agensi List
}

function hrmisBahagianList() {
    //Dropdown Bahagian List
    $('#FK_agensi').empty();
    $('#FK_agensi').append($('<option>', {
        value: "",
        text: "Pilih Agensi"
    }));

    $('#FK_kat_agensi').change(function () {
        var settings = {
            "url": host + "agensis/" + $('#FK_kementerian').val() + "/" + $('#FK_kat_agensi').val(),
            "method": "GET",
            "timeout": 0
        };
        // console.log(settings);

        $.ajax(settings).done(function (response) {
            //LIST OPTION
            $('#FK_agensi').empty();
            $('#FK_agensi').append($('<option>', {
                value: "",
                text: "Pilih Agensi"
            }));
            $.each(response.data, function (i, item) {
                $('#FK_agensi').append($('<option>', {
                    value: item.id_agensi,
                    text: item.nama_agensi + " (" + item.kod_agensi + ")"
                }));
            });

        });
        // END Dropdown Sub Modul List    
    });
}

function hrmisGelaran(nama_gelaran, returnValue) {
    var form = new FormData();
    form.append("nama_gelaran", nama_gelaran);
    var settings = {
        "url": host + "gelaransHrmis",
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
        objhrmisGelaran = JSON.parse(response);
        returnValue();
    });
}

function hrmisKategoriPerkhidmatan(nama_kategoriperkhidmatan, returnValue) {
    var form = new FormData();
    form.append("nama_kategoriperkhidmatan", nama_kategoriperkhidmatan);
    var settings = {
        "url": host + "kategoriperkhidmatansHrmis",
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
        objhrmisKategoriPerkhidmatan = JSON.parse(response);
        returnValue();
    });
}

function hrmisTarafJawatan(nama_tarafjawatan, returnValue) {
    var form = new FormData();
    form.append("nama_tarafjawatan", nama_tarafjawatan);
    var settings = {
        "url": host + "tarafjawatansHrmis",
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
        objhrmisTarafJawatan = JSON.parse(response);
        returnValue();
    });
}

function hrmisKementerian(nama_kementerian, returnValue) {
    //Dropdown Kementerian List
    var form = new FormData();
    form.append("nama_kementerian", nama_kementerian);
    var settings = {
        "url": host + "kementeriansHrmis",
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
        //LIST OPTION
        result = JSON.parse(response)
        objhrmisKementerian = result;
        returnValue();
    });
    // END Dropdown Kementerian List
}

// function hrmisAgensi(kod_agensi, returnValue) {
//     //Dropdown Agensi List
//     var form = new FormData();
//     form.append("kod_agensi", kod_agensi);
//     var settings = {
//         "url": host + "agensisKod",
//         "method": "POST",
//         "timeout": 0,
//         "headers": {
//             "Authorization": window.localStorage.token
//         },
//         "processData": false,
//         "mimeType": "multipart/form-data",
//         "contentType": false,
//         "data": form
//     };
//     $.ajax(settings).done(function (response) {
//         //LIST OPTION
//         result = JSON.parse(response);
//         objhrmisAgensi = result;
//         returnValue();
//     });
//     // END Dropdown Agensi List
// }

function hrmisKatAgensi(nama_kat_agensi, returnValue) {
    var form = new FormData();
    form.append("nama_kat_agensi", nama_kat_agensi);
    var settings = {
        "url": host + "katAgensisNama",
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
    // console.log(settings);

    $.ajax(settings).done(function (response) {
        obj_kat_agensi = JSON.parse(response);
        // console.log(obj_agensiList)
        returnValue();
    });
    // END Dropdown Sub Modul List    
}

function hrmisAgensi(kod_kementerian, kod_kat_agensi, returnValue) {
    var settings = {
        "url": host + "agensis/" + kod_kementerian + "/" + kod_kat_agensi,
        "method": "GET",
        "timeout": 0
    };
    // console.log(settings);

    $.ajax(settings).done(function (response) {
        obj_agensiList = response;
        // console.log(obj_agensiList)
        returnValue();
    });
    // END Dropdown Sub Modul List    
}