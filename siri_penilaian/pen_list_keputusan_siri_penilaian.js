$(function () {
    $.ajaxSetup({
        cache: false
    });    
    checkSession();
    let token = window.localStorage.token;            
    $("#leftsidebar").load('../aside/aside_detail_siri_penilaian.html');
    let id_siri_penilaian = sessionStorage.id_siri_penilaian;
    resetForm();
    load_siri_penilaian(id_siri_penilaian,token,function(){        
        if(objSiriPenilaian.success){
            let data = objSiriPenilaian.data;
            $("#btnKembali").attr('onclick','kembali2(\'' + data.id_penilaian + '\')');
            $("#kembali").attr('onclick','kembali()');
            $("#kembali2").attr('onclick','kembali2(\'' + data.id_penilaian + '\')');
            $("#nama_penilaian").html(data.nama_penilaian + " SIRI " + data.kod+"/"+data.tahun);
        }
    });
    loadSesiPenilaian(id_siri_penilaian,function(){
        let list = [];
        if(objSesi.success){
            let data = objSesi.data; let size = data.length; let length = size - 1;

            $('#tab_sesi').html('');
            $("#divClassTetapanSoalan").removeClass('hidden');
            if(size > 0){
                $.each(data, function(i,item){
                    let status_active = '';
                    if(i == 0){
                        status_active = 'active';
                        load_calon_soalan(item.id_sesi_siri_penilaian, item.sesi_penilaian);
                    } 

                    $('#tab_sesi').append(
                        `<li class="nav-item"><a class="nav-link btn-simple `+status_active+`" data-bs-toggle="tab" href="javascript:void(0);" onclick="load_calon_soalan(`+item.id_sesi_siri_penilaian+`,'`+item.sesi_penilaian+`');" id="tab_`+item.id_sesi_siri_penilaian+`"> `+item.sesi_penilaian+`</a></li>`
                    );

                    list.push(item.id_sesi_siri_penilaian);
                });
            }
        }else{
            
        }
    });
});

function load_calon_soalan(FK_sesi,nama_sesi){
    var columns = [
        { "name": "check", "title": `<input class="form-check-input" type="checkbox" name="checkBoxtable_calonAll" onclick="toggleCheckBox('table_calon');">` },
        { "name": "bil", "title": "Bil." },
        { "name": "nama", "title": "Nama", "breakpoints": "md sm xs" },
        { "name": "no_kad_pengenalan", "title": "No. Kad Pengenalan" },
        { "name": "no_angka_giliran", "title": "No. Angka Giliran", "breakpoints": "md sm xs"  },
        { "name": "bil_tanda", "title": "Bil. Tanda", "breakpoints": "md sm xs" },
        { "name": "markah", "title": "Markah (%).", "breakpoints": "md sm xs" },
        // { "name": "peratus_set", "title": "Bil. Tanda", "breakpoints": "md sm xs" },
        { "name": "gred", "title": "Gred", "breakpoints": "md sm xs" },
        { "name": "upt_btn", "title": "Lihat Jawapan", "breakpoints": "md sm xs" },
    ];
    var form = new FormData();
    form.append("FK_siri_penilaian", window.sessionStorage.id_siri_penilaian);
    form.append("FK_sesi", FK_sesi);
    listCalonSoalanBySiriPenilaian(form, function(){
        var list = [];
        let bil = 1;
        let count = 0;

        $.each(obj.data, function (f, field) {
            var formBilTanda = new FormData();
            formBilTanda.append("FK_calon_soalan", field.id_calon_soalan);
            formBilTanda.append("FK_siri_penilaian", window.sessionStorage.id_siri_penilaian);
            list_allJawapan(formBilTanda,window.localStorage.token,function(){
                // console.log(obj_Jawapan);
                if(obj_Jawapan.success){
                    let result = obj_Jawapan.data;
                    let bill = 0;
                    $.each(result, function(i, item){
                        if(item.flag_markah == "DONE"){
                            bill++;
                        }
                        if(result.length == (i+1)){
                            let flag_markah = '';
                            if(bill == (i+1)){
                                flag_markah = '<h5><span class="badge bg-success">'+bill+'/'+(i+1)+'</span></h5>';
                            } else if(bill > 0){
                                flag_markah = '<h5><span class="badge bg-warning">'+bill+'/'+(i+1)+'</span></h5>';
                            } else {
                                flag_markah = '<h5><span class="badge bg-danger">'+bill+'/'+(i+1)+'</span></h5>';
                            }
                            
                            list.push({
                                check: `<div class="form-check">
                                            <input class="form-check-input table_calon" type="checkbox" name="field_calon_soalan" value="`+field.id_calon_soalan+`" id="calon_soalan`+i+`">
                                        </div>`,
                                bil: bil++, 
                                nama: field.nama, 
                                no_kad_pengenalan: field.no_kad_pengenalan, 
                                no_angka_giliran: field.no_angka_giliran, 
                                bil_tanda: flag_markah, 
                                markah: "<span>"+field.markah_akhir+"/"+field.markah_full+" ("+field.peratus_set+"%)</span>", 
                                gred: "<span class='text-capitalize'>"+field.peratus_siri+"</span>", 
                                upt_btn: `<button class="btn btn-circle btn-primary btn-sm" data-ui-toggle-class="zoom" data-ui-target="#animate" onclick="details('`+field.id_calon_soalan+`')"><i class="fas fa-arrow-right"></i></button>`
                            });

                            count++;

                            if((obj.data.length == (f+1) || obj.data.length == (f+2)) && (count == obj.data.length)){
                                // console.log("SINI");
                                $("#jana_markah_akhir").attr("onclick",`jana_markah('`+FK_sesi+`','`+nama_sesi+`')`);
                                $("#emel_markah_akhir").attr("onclick",`emel_keputusan('`+FK_sesi+`','`+nama_sesi+`')`);
                                $("#nama_sesi").html(nama_sesi);
                                $("#nama_sesi_emel").html(nama_sesi);
                                $("#table_calon").html("");
                                $("#table_calon").footable({
                                    "columns": columns,
                                    "rows": list,
                                    "paging": {
                                        "enabled": false,
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
                        }
                    });
                } else {
                    list.push({
                        bil: bil++, 
                        nama: field.nama, 
                        no_kad_pengenalan: field.no_kad_pengenalan, 
                        no_angka_giliran: field.no_angka_giliran, 
                        bil_tanda: '<span style="font-weight: bold;">CALON TIDAK HADIR</span>',
                    });
                    count++;
                    if(obj.data.length == (f+1) && (count == obj.data.length)){
                        // console.log("SINI");
                        $("#jana_markah_akhir").attr("onclick",`jana_markah('`+FK_sesi+`','`+nama_sesi+`')`);
                        $("#emel_markah_akhir").attr("onclick",`emel_keputusan('`+FK_sesi+`','`+nama_sesi+`')`);
                        $("#nama_sesi").html(nama_sesi);
                        $("#nama_sesi_emel").html(nama_sesi);
                        $("#table_calon").html("");
                        $("#table_calon").footable({
                            "columns": columns,
                            "rows": list,
                            "paging": {
                                "enabled": false,
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
                }
            });
        });
    });
}

function jana_markah(FK_sesi,nama_sesi){
    var form = new FormData();
    form.append("FK_sesi", FK_sesi);

    var settings = {
        "url": host+"calon_jawapan/list134",
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
        let result = JSON.parse(response);
        $.each(result.data, function(i, item){
            mark = 0.00;
            if(item.FK_jenis_soalan == "1" || item.FK_jenis_soalan == "4"){
                $.each(JSON.parse(item.jawapan),function(a,rows){
                    value = rows.name.split("jawapan_");
                    if(value[1] == item.skema){
                        if(item.skema == item.jawapan_calon){
                            mark = item.mark;
                        }
                    }
                });
                updateMarks(mark,item.mark,item.id_calon_jawapan);
            } else {
                let markCheckBox = 0;
                $.each(JSON.parse(item.jawapan),function(a,rows){
                    value = rows.name.split("jawapan_");
                    skema = JSON.parse(item.skema);
                    jawapan_calon = item.jawapan_calon.split(',');
                    $.each(skema, function(s,scheme){
                        if(value[1] == scheme[0]){
                            if(jawapan_calon.findIndex(x => x === value[1]) >= 0){
                                markCheckBox = parseFloat(markCheckBox) + parseFloat(scheme[1]);
                                mark = markCheckBox;
                                s = skema.length + 1;
                                check = skema.length + 1;
                            }
                        }
                    });
                });
                updateMarks(markCheckBox,item.mark,item.id_calon_jawapan);
            }
            if(result.data.length == (i+1)){
                var settings = {
                    "url": host+"calon_jawapan/listSumMarkahJawapan",
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
                    resultSum = JSON.parse(response);
                    $.each(resultSum.data, function(f, field){
                        resultSum.data[f].markah_full = 0;
                        var formfull1 = new FormData();
                        formfull1.append("id_calon_soalan", field.FK_calon_soalan);
                        showCalonSoalanJsonList(formfull1,function(){
                            if(obj.success){
                                obj = obj.data;
                                resultSum.data[f].peratus_set = obj.peratus;
                                gred = JSON.parse(obj.gred);
                                $.each(gred[0].gred, function(g, greds){
                                    if(gred[0].gred.length == (g+1)){
                                        resultSum.data[f].gred = greds.max_value;
                                    }
                                });
                                json_list = JSON.parse(obj.json_list);
                                $.each(json_list, function(t, itemt){
                                    $.each(itemt.soalan, function(p, itemp){
                                        var formmarkahfull = new FormData();
                                        formmarkahfull.append("PK_siri_soalan", itemp.id);
                                        var settings = {
                                            "url": host+"sirisoalan/view",
                                            "method": "POST",
                                            "timeout": 0,
                                            "headers": {
                                              "Authorization": window.localStorage.token
                                            },
                                            "processData": false,
                                            "mimeType": "multipart/form-data",
                                            "contentType": false,
                                            "data": formmarkahfull
                                        };
                                    
                                        var request = $.ajax(settings);
                                    
                                        request.done(function (response) {
                                            markah_soalan = JSON.parse(response);
                                            if (markah_soalan.data.mark > 0){
                                                resultSum.data[f].markah_full += parseFloat(markah_soalan.data.mark);
                                            }
                                            if(resultSum.data.length == (f+1)){
                                                let final_last = resultSum.data;
                                                $.each(final_last, function(fi, final){
                                                    let peratus_set = 0;
                                                    let peratus_siri = 0;
                                                    if(final.markah_jawapan >= 0 && final.markah_full >= 0){
                                                        peratus_siri = (parseFloat(final.markah_jawapan)/parseFloat(final.markah_full)) * parseFloat(final.gred);
                                                        peratus_set = (parseFloat(final.markah_jawapan)/parseFloat(final.markah_full)) * parseFloat(final.peratus_set);
                                                        gred = JSON.parse(obj.gred);
                                                        $.each(gred[0].gred, function(g, greds){
                                                            if(peratus_siri <= parseFloat(greds.max_value)){
                                                                peratus_siri = greds.gred;
                                                                g = gred[0].gred.length + 1;
                                                            }
                                                        });
                                                    }
                                                    var formAkhir = new FormData();
                                                    formAkhir.append("id_calon_soalan", final.FK_calon_soalan);
                                                    formAkhir.append("markah_akhir", final.markah_jawapan);
                                                    formAkhir.append("markah_full", final.markah_full);
                                                    formAkhir.append("peratus_set", peratus_set);
                                                    formAkhir.append("peratus_siri", peratus_siri);
                                                    var settings = {
                                                        "url": host+"calon_soalan/updateMarkahAkhir",
                                                        "method": "POST",
                                                        "timeout": 0,
                                                        "headers": {
                                                            "Authorization": window.localStorage.token
                                                        },
                                                        "processData": false,
                                                        "mimeType": "multipart/form-data",
                                                        "contentType": false,
                                                        "data": formAkhir
                                                    };
                                                    var request = $.ajax(settings);
                            
                                                    request.done(function (response) {
                                                        if( resultSum.data.length == (f+1) && 
                                                            json_list.length == (t+1) && 
                                                            itemt.soalan.length == (p+1) && 
                                                            final_last.length == (fi+1)){
                                                            swal({
                                                                title: "Jana Markah Akhir Berjaya!",
                                                                // text: "",
                                                                type: "success",
                                                                showConfirmButton: false,
                                                                allowOutsideClick: false,
                                                                html: false,
                                                                timer: 1000
                                                            }).then(function(){},
                                                                function (dismiss) {
                                                                    if (dismiss === 'timer') {
                                                                        load_calon_soalan(FK_sesi,nama_sesi);
                                                                    }
                                                                }
                                                            );
                                                        }  
                                                    });
                                                })
                                            }
                                        });
                                    });
                                });
                            }
                        });
                    });
                });

                request.fail(function (response){
                    swal({
                        title: "Jana Markah Akhir Gagal!",
                        text: "Sila semak markah jawapan calon. Terdapat calon yang belum dinilai.",
                        type: "error",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 1000
                    }).then(function(){},
                        function (dismiss) {
                            // if (dismiss === 'timer') {
                                
                            // }
                        }
                    );            
                });
            }
        });
    });   

    request.fail(function(response){
        var settings = {
            "url": host+"calon_jawapan/listSumMarkahJawapan",
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
            result = JSON.parse(response);
            $.each(result.data, function(f, field){
                var formAkhir = new FormData();
                formAkhir.append("id_calon_soalan", field.FK_calon_soalan);
                formAkhir.append("markah_akhir", field.markah_jawapan);
                var settings = {
                    "url": host+"calon_soalan/updateMarkahAkhir",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Authorization": window.localStorage.token
                    },
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": formAkhir
                };
                var request = $.ajax(settings);

                request.done(function (response) {
                    swal({
                        title: "Jana Markah Akhir Berjaya!",
                        text: "",
                        type: "success",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 1000
                    }).then(function(){},
                        function (dismiss) {
                            // if (dismiss === 'timer') {
                                
                            // }
                        }
                    );
                });
            });
        });

        request.fail(function (response){
            swal({
                title: "Jana Markah Akhir Gagal!",
                text: "Sila semak markah jawapan calon. Terdapat calon yang belum dinilai.",
                type: "error",
                showConfirmButton: false,
                allowOutsideClick: false,
                html: false,
                timer: 1000
            }).then(function(){},
                function (dismiss) {
                    // if (dismiss === 'timer') {
                        
                    // }
                }
            );            
        });
    });
}

function updateMarks(markah_jawapan, full_mark, id_calon_jawapan){
    var form = new FormData();
    form.append("markah_jawapan", markah_jawapan);
    form.append("id_calon_jawapan", id_calon_jawapan);
    var settings = {
        "url": host+"calon_jawapan/updateMarks",
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
        return;
    });
}

var confirmed = false;

function details(id){

    sessionStorage.id_calon_soalan = id;

    window.sessionStorage.child = "78797c6eb1602af05f21fe6c7f0dcb11";
    checkAuthentication(window.sessionStorage.child);

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

function toggleCheckBox(nama_table){
    var checkBoxes = $("."+nama_table);
    if($("input[name='checkBoxtable_calonAll']").is(':checked')){
        checkBoxes.prop("checked", true);
    } else {
        checkBoxes.prop("checked", false);
    }
}

function emel_keputusan(FK_sesi, nama_sesi){
    let count = 0;
    $('input[name="field_calon_soalan"]:checked').each(function() {
        let id_calon_soalan = this.value;
        calonEmailKeputusan(id_calon_soalan);
        count++;
        if(count == $('input[name="field_calon_soalan"]:checked').length){
            swal({
                title: "Hantar Emel Keputusan Kepada Calon",
                text: "Berjaya! Calon-Calon Telah Dimaklumkan Keputusan.",
                type: "success",
                showConfirmButton: false,
                allowOutsideClick: false,
                html: false,
                timer: 1000
            }).then(function(){},
                function (dismiss) {
                    load_calon_soalan(FK_sesi, nama_sesi);
                }                
            );
        }
    });

}