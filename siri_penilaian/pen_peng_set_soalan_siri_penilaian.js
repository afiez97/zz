var markah_full = 0, jk_penilai = 0;
$(function () {
    $.ajaxSetup({
        cache: false
    });
    checkSession();
    // const onConfirmRefresh = function (event) {
    //     event.preventDefault();
    //     return event.returnValue = "Anda Pasti Untuk RELOAD Paparan?";
    //   }
      
    // window.addEventListener("beforeunload", onConfirmRefresh, { capture: true });

    let token = window.localStorage.token;
    $("#leftsidebar").load('../aside/aside_detail_siri_penilaian.html');
    let id_siri_penilaian = sessionStorage.id_siri_penilaian;
    // resetForm();

    load_siri_penilaian(id_siri_penilaian,token,function(){        
        if(objSiriPenilaian.success){
            let data = objSiriPenilaian.data;
            $("#btnKembali").attr('onclick','kembali2(\'' + data.id_penilaian + '\')');
            $("#kembali").attr('onclick','kembali()');
            $("#kembali2").attr('onclick','kembali2(\'' + data.id_penilaian + '\')');
            $("#nama_penilaian").html(data.nama_penilaian + " SIRI " + data.kod+"/"+data.tahun);
            $("#txt_nama_penilaian").html(data.nama_penilaian);
            $("#txt_kod_siri_penilaian").html(data.kod_siri_penilaian);
            $("#FK_kategori_penilaian").val(data.id_kategori_penilaian);
            $("#txt_nama_kategori_penilaian").html(data.nama_kategori_penilaian);
            $("#FK_kluster").val(data.id_kluster);
            $("#txt_nama_penyelaras").html(data.nama);
            $("#txt_notel_kerajaan_penyelaras").html(data.notel_kerajaan);
            $("#txt_emel_kerajaan_penyelaras").html(data.emel_kerajaan);
        }
    });

    $("#bil_set").append(`<option value="">-PILIH-</option>`);
    for(i=1;i<11;i++){
      $("#bil_set").append(`<option value="`+i+`">`+i+`</option>`);
    }
    
    load_setSoalan();

    $('.dd').nestable();
    let rawak_length = 0;
    list_siri_soalan(id_siri_penilaian,token,function(){
        let flag = 0;
        if(obj_sirisoalan.success){
            $("#total_soalan").attr("max",obj_sirisoalan.data.length).val(obj_sirisoalan.data.length);
            rawak_length = obj_sirisoalan.data.length;
            console.log(rawak_length);
            $.each(obj_sirisoalan.data,function(i,item){
                if(item.FK_infodetail != '' && item.FK_infodetail != null){
                    // console.log(item.FK_infodetail);
                    flag = 1;
                }

                if(i == (obj_sirisoalan.data.length-1)){
                    if(flag == 1){
                        $('#btn_rawak').prop('disabled','disabled');
                        $('#text_msg').html(`Fungsi Rawak tidak boleh digunakan kerana terdapat soalan berangkai. Sila tekan Butang <i class="fa fa-circle-plus"></i> Set Soalan bagi menjana Set Soalan Rawak Manual.`);
                    }else{
                        $('#btn_rawak').prop('disabled','');
                        $('#text_msg').html(``);
                    }
                }
            });
        }
    });

    checkJKPenilai(window.sessionStorage.id_siri_penilaian,function(){
        if(obj_setSoalan.success){
            jk_penilai = 1;
        } else {
            jk_penilai = 2;
        }
    });

    // list_rawak(id_siri_penilaian,function(){
        
    //     $("#total_soalan").attr("max");
    // });
});

function load_setSoalan(){            
    list_setSoalan(window.sessionStorage.id_siri_penilaian,window.localStorage.token,function(){
        var columns = [
            { "name": "bil", "title": "Bil" }, 
            { "name": "kod_set", "title": "Set Soalan" },
            { "name": "jenis_set", "title": "Jenis Set" },
            { "name": "statusrekod", "title": "Status" },
            { "name": "lihat_set", "title": "Lihat Set Soalan" },
            { "name": "mark_btn", "title": "Set Markah" },
            { "name": "upt_btn", "title": "Tindakan" },
        ];
        var list = [];
        let bil = 1;
        
        if(obj_setSoalan.success){
            
            let data = obj_setSoalan.data;
            let total_set = 1;
            $.each(char, function(i, item){
                if(item == data[data.length-1].kod_set){
                    total_set = i+1;
                    return;
                }
            });

            let id_set_soalan = $("#id_set_soalan").val();

            // alert($('#bahagian_list ul li').length);
            if ( id_set_soalan != "" ) {
                $("#set_soalan_key").html(char[total_set-1]);
                $("#input_set_soalan_key").val(char[total_set-1]);
            }else{
                $("#set_soalan_key").html(char[total_set]);
                $("#input_set_soalan_key").val(char[total_set]);
            }
            // $("#set_soalan_key").html(char[total_set]);
            $.each(data,function(f,field){
                loadSesiPenilaianBySet(field.id_set_soalan,function(){
                    let upt_btn = "<span style='white-space: pre-line;'>SET INI TELAH DIGUNAPAKAI UNTUK ";
                    if(objSesi.success){
                        $.each(objSesi.data,function(i, item){
                            if(i == 0){
                                upt_btn += item.sesi_penilaian;
                            } else if(i == objSesi.data.length-1){
                                upt_btn += ", DAN "+item.sesi_penilaian;
                            } else {
                                upt_btn += ", "+item.sesi_penilaian;
                            }
                        });
                        upt_btn += "</span>";
                    } else {
                        upt_btn = `<button class="btn btn-circle btn-danger btn-sm" data-ui-toggle-class="zoom" data-ui-target="#animate" onclick="padamSetSingle('`+field.id_set_soalan+`')"><i class="fas fa-trash"></i></button>`;
                    }
                    field.upt_btn = upt_btn;
                    setTimeout(function(){
                        if(data.length == (f+1)){
                            $.each(data,function(i,item){
                                if(item.statusrekod == 1){
                                    statusrekod = `<span class="badge bg-warning">DALAM PROSES</span>`;
                                }
                                else if(item.statusrekod == 2){
                                    statusrekod = `<span class="badge bg-success">SELESAI</span>`;
                                }
                                else if(item.statusrekod == 3){
                                    statusrekod = `<span class="badge bg-danger">DITOLAK</span>`;
                                }
                                list.push({
                                    bil:bil++,
                                    kod_set:"SET "+item.kod_set,
                                    jenis_set:item.jenis_set,
                                    statusrekod:statusrekod,
                                    lihat_set:`<a href="javascript:void(0)" onclick="popUp('display_set/?set_soalan=`+item.id_set_soalan+`')" class="btn btn-link btn-sm text-info"><i class="fa fa-eye"></i></a>`,
                                    mark_btn:`<a onclick="setMarkah(`+item.id_set_soalan+`,'`+item.kod_set+`')" class="btn btn-primary btn-sm">Set Markah</a>`,
                                    upt_btn:item.upt_btn
                                });  
                            });
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
                                $(".row-count-set").html(list.length);
                            }
                        }
                    },500);
                });
            });
        }            
    });
}

function checkThisSet(kod_set){
    $.each(char, function(i, item){
        if(item == kod_set.toUpperCase()){
            var form = new FormData();
            form.append("FK_siri_penilaian",window.sessionStorage.id_siri_penilaian);
            form.append("kod_set",kod_set);
            show_setSoalanKodSet(form, window.localStorage.token, function(){
                if(obj_setSoalan.success){
                    swal({
                        title: "Set Soalan",
                        text: "Kod Set Telah Didaftarkan. Sila Pilih Kod Set Lain.",
                        type: "info",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        $("#input_set_soalan_key").val($("#set_soalan_key").html()).focus();
                    });
                } else {
                    swal({
                        title: "Set Soalan",
                        text: "Kod Set Diterima.",
                        type: "success",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        $("#set_soalan_key").html(kod_set);
                    });
                }
            });
        } else if(char.length == (i+1)){
            swal({
                title: "Set Soalan",
                text: "Kod Set Tidak Sah.",
                type: "info",
                closeOnConfirm: true,
                allowOutsideClick: false,
                html: false
            }).then(function () {
                $("#input_set_soalan_key").val($("#set_soalan_key").html()).focus();
            });            
        }
    });
}

function emptyDiv(){
    $("#set_markah").html('');
    $("#set_markah").html(`
        <div class="modal-dialog modal-xl">
            <div class="modal-content modal-dialog-scrollable">
                <div class="modal-header">
                    <h5>SET MARKAH</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" onclick="emptyDiv();" aria-label="Close"></button>
                </div>
                <hr>
                <div id="overviews-soalan">
                    
                </div>
            </div>
        </div>`);
}

function padamSetSingle(id_set_soalan){
    swal({
        title: "Hapus Set Soalan",
        text: "Anda Pasti Untuk Hapus?",
        type: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
        closeOnConfirm: true,
        allowOutsideClick: false,
        html: false
    }).then(function () {
        var form = new FormData();
        form.append("id_set_soalan",id_set_soalan);
        delSetSoalan(form, function(){
            if(obj.success){
                swal({
                    title: "Hapus Set Soalan",
                    text: "Hapus Berjaya!",
                    type: "success",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function () {
                    load_setSoalan();
                });
            }
        });
    });
}

function setMarkah(id,kod_set){
    let json_list_bahagian = [], json_list_soalan = [], markah_full = 0;
    var columns = [
        { "name": "bil", "title": "Bil" }, 
        { "name": "soalan", "title": "Soalan" },
        { "name": "mark", "title": "Markah" },
    ];
    var form = new FormData();
    form.append("id_set_soalan",id);
    json_list_bahagian = [];
    json_list_soalan = [];
    show_setSoalan(form,window.localStorage.token,function(){
        let json_list = JSON.parse(obj_setSoalan.data.json_list);
        // console.log(json_list);
        $.each(json_list, function(f, field){
            let bahagian = field.bahagian.replaceAll(' ', '_');
            json_list_bahagian.push({
                bahagian: bahagian,
                peratus: obj_setSoalan.data.peratus
            });
            $.each(field.soalan,function(x,row){
                json_list_soalan.push({
                    bahagian: bahagian,
                    PK_siri_soalan: row.id
                });
            });

            var form = new FormData();
            form.append("json_list_soalan",JSON.stringify(json_list_soalan));
            
            list_allSoalan(form,window.localStorage.token,function(){
                // console.log(obj_siriSoalan.data);
                $.each(obj_siriSoalan.data,function(x,row){
                    if(json_list_soalan.filter(e => e.PK_siri_soalan == row.PK_siri_soalan)){
                        let index = json_list_soalan.findIndex(e => e.PK_siri_soalan == row.PK_siri_soalan);
                        json_list_soalan[index].jawapan = row.jawapan;
                        json_list_soalan[index].FK_jenis_soalan = row.FK_jenis_soalan;
                        json_list_soalan[index].kod_soalan = row.kod_soalan;
                        json_list_soalan[index].soalan = row.soalan;
                        json_list_soalan[index].FK_infodetail = row.FK_infodetail;
                        json_list_soalan[index].teks = row.teks;
                        json_list_soalan[index].mark = row.mark;
                        json_list_soalan[index].skema = row.skema;
                    }
                });

                if((json_list.length-1) == f){
                    $.each(json_list_bahagian, function(i, item){
                        if(i == 0){
                            $("#overviews-soalan").append(`
                                <div id="div_`+item.bahagian+`" style="background-color:#e7e7e7;margin-bottom:15px;padding:15px">
                                    <div class="row mt-3 mb-3">
                                        <div style="font-weight:bold; font-size:20px; text-align:left;" class="col-4">
                                            <span style="text-transform:uppercase">SET `+kod_set+` : </span><span style="text-transform:capitalize">`+item.bahagian.replaceAll('_', ' ')+`</span>
                                        </div>
                                        <div style="text-align:right;" class="col-8 row">
                                            <div class="col-6">
                                                <span style="font-weight:bold; font-size:20px;">MARKAH PENUH: </span><span id="markah_full" style="font-weight:bold; font-size:20px;">100</span>
                                            </div>
                                            <div class="col-6 row me-0">
                                                <div class="col-6 me-0">
                                                    <label style="font-weight:bold; font-size:20px;" for="peratus">PERATUS SET</label>
                                                </div>
                                                <div class="col-6 me-0">
                                                    <div class="input-group me-0">
                                                        <input type="number" step=".01" min="0" max="100" value="`+item.peratus+`" onblur="updatePeratusSet(`+obj_setSoalan.data.id_set_soalan+`,this.value);" class="form-control" id="peratus" style="background-color: white;">
                                                        <span class="input-group-text">%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <table class="table" id="table_`+item.bahagian+`"></table>
                                </div>
                            `);
                        } else {
                            $("#overviews-soalan").append(`
                                <div id="div_`+item.bahagian+`" style="background-color:#e7e7e7;margin-bottom:15px;padding:15px">
                                    <div class="row mt-3 mb-3">
                                        <div style="font-weight:bold; font-size:20px; text-align:left;" class="col-4">
                                            <span style="text-transform:uppercase">SET `+kod_set+` : </span><span style="text-transform:capitalize">`+item.bahagian.replaceAll('_', ' ')+`</span>
                                        </div>
                                    </div>
                                    <table class="table" id="table_`+item.bahagian+`"></table>
                                </div>
                            `);
                        }

                        let listTable = [];
                        if(json_list_bahagian.length == (i+1)){
                            $.each(json_list_bahagian, function(ix, itemx){
                                let bil = 1;
                                let first = 0;
                                let list = [];
                                
                                $.each(json_list_soalan,function(i2, item2){
                                    if(item2.bahagian == itemx.bahagian){
                                        let mark = 0;
                                        if(item2.mark != null){
                                            mark = item2.mark;
                                        }
                                        list.push({
                                            bil: bil++,
                                            soalan: item2.soalan,
                                            mark: `<input type="text" pattern="[0-9]+" style="background-color:#ffffff;" class="form-control" value="`+mark+`" onchange="updateMark(this,`+mark+`,`+item2.PK_siri_soalan+`,`+item2.FK_jenis_soalan+`);">`
                                        });
                                        if (item2.mark > 0){
                                            markah_full += parseInt(item2.mark);
                                        }
                                    }
                                });
                                listTable.push({
                                    bahagian:itemx.bahagian,
                                    soalan:list
                                });
                                
                                if(json_list_bahagian.length == (ix+1)){
                                    $("#markah_full").html(markah_full);
                                    $.each(listTable, function(f, final){
                                        $(`#table_`+final.bahagian).html('');
                                        if (list.length > 0){
                                            $(`#table_`+final.bahagian).footable({
                                                "columns": columns,
                                                "rows": final.soalan,
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
                            });
                        }
                    });
                }                
            });            
        });
    });
    $("#set_markah").modal("show");
}

function updatePeratusSet(id_set_soalan, peratus){
    var form = new FormData();
    form.append("id_set_soalan", id_set_soalan);
    form.append("peratus", peratus);
    var settings = {
        "url": host+"setsoalan/updatePeratusSet",
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

    });
}

function updateMark(mark, old_mark, PK_siri_soalan, FK_jenis_soalan){
    var form = new FormData();
    form.append("PK_siri_soalan", PK_siri_soalan);
    form.append("mark", mark.value);
    var settings = {
        "url": host+"sirisoalan/updateMark",
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
        if(mark.value < old_mark){
            markah_full = markah_full - (old_mark - mark.value);
            $("#markah_full").html(markah_full);
            $(mark).attr('onchange',`updateMark(this,`+mark.value+`,`+PK_siri_soalan+`,`+FK_jenis_soalan+`);`);
        } else if (mark.value > old_mark){
            markah_full = markah_full + (mark.value - old_mark);
            $("#markah_full").html(markah_full);
            $(mark).attr('onchange',`updateMark(this,`+mark.value+`,`+PK_siri_soalan+`,`+FK_jenis_soalan+`);`);
        }
        if(FK_jenis_soalan == 3){
            var form = new FormData();
            form.append("PK_siri_soalan", PK_siri_soalan);
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
                "data": form
            };
        
            var request = $.ajax(settings);
        
            request.done(function (response) {
                result = JSON.parse(response);
                let skema = JSON.parse(result.data.skema);
                let total = 0;
                $.each(skema, function(i, item){
                    total += parseFloat(item[1]);
                });
                $.each(skema, function(i, item){
                    x = (mark.value*item[1])/total;
                    item[1] = x;
                    if(skema.length == (i+1)){
                        var form = new FormData();
                        form.append("PK_siri_soalan",PK_siri_soalan);
                        form.append("skema",JSON.stringify(skema));
                        var settings = {
                            "url": host+"sirisoalan/updateSkema",
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

                        });
                    }
                });
            });
        }
    });

}

function kembali2(id){
    sessionStorage.id_penilaian = id;
    sessionStorage.child = "b0f7c80a40e3d2b78df8f0e6c22f31e5";
    checkAuthentication(sessionStorage.child);
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
              function (dismiss) {}
          );
      });
}

function list_siri_soalan(id_siri_penilaian,token,returnValue){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": host+"sirisoalan/list/"+id_siri_penilaian,
        "method": "GET",
        "headers": {
          "Authorization": "penilaian "+window.localStorage.token
        }
      };    
      var request = $.ajax(settings);

      request.done(function (response) {
        obj_sirisoalan = response;

        returnValue();
      }); 
      
      request.fail(function (response) {
        obj_sirisoalan = response;

        returnValue();
      });    
}

$("#btn_rawak").click(function(){
    $("#soalan_rawak").modal('show');
});

$("#btn_setSoalan").click(function(){
    $("#add_setSoalan").prop('class','card mb-3').focus();

    let flag_list = [];
    let flag = '';
    list_siri_soalan(window.sessionStorage.id_siri_penilaian,window.localStorage.token,function(){
        if(obj_sirisoalan.success){
            let data = obj_sirisoalan.data;
            
            $("#list_siriSoalan").html('<ul class="list-group">');
            $.each(data,function(i,field){

                if(field.FK_infodetail != '' && field.FK_infodetail != null){
                    flag = flag_list.indexOf(field.FK_infodetail);
                    if(flag < 0){
                        flag_list.push(field.FK_infodetail);

                        var form = new FormData();
                        form.append('id_infodetails',field.FK_infodetail);

                        get_infodetails(form,window.localStorage.token,function(){

                            if(obj_det.success){

                                $("#list_siriSoalan").append(
                                    `
                                    <li class="list-group-item class_listSoalan" id="li_soalan_b`+field.PK_siri_soalan+`">
                                        <p><b>`+obj_det.data.kod_teks+`</b> <span class="float-right">Soalan Berangkai</span></p>
                                        <span class="text-ellipsis--2" id="text-`+field.PK_siri_soalan+`">`+obj_det.data.teks+`</span>
                                        <p><span class="justify-content-end d-flex">
                                        <div class="btn-group justify-content-end d-flex">
                                            <button type="button" class="btn btn-simple btn-info" onclick="view_soalan('`+obj_det.data.id_infodetails+`',true)"><span>Lihat</span>
                                            </button>
                                            <button type="button" class="btn btn-info" id="btn_b`+obj_det.data.id_infodetails+`" onclick="up_setSoalan('`+obj_det.data.id_infodetails+`',true)" ><span>Pilih</span>
                                            </button>
                                        </div>
                                        </span></p>
                                    </li>`
                                );
                            }
                            
                        });
                    }else{
                    }
                }else{
                    topik = field.topik;
                    list_topik = topik.split(',');
                    topik = "";

                    $.each(list_topik,function(t,row){
                        topik += `<span class="badge badge-info">`+row+`</span> `;
                    });

                    // let check_iframe = field.soalan.search("iframe");
                    // if(check_iframe > -1){}

                    $("#list_siriSoalan").append(
                        `
                        <li class="list-group-item class_listSoalan" id="li_soalan_s`+field.PK_siri_soalan+`">
                            <p><b>`+field.tahap+`</b> <span class="float-right">`+field.jenis_soalan+`</span></p>
                            `+field.soalan+`<br/>
                            `+topik+`
                            <p><span class="justify-content-end d-flex">
                                <div class="btn-group justify-content-end d-flex">
                                    <button type="button" class="btn btn-simple btn-info" onclick="view_soalan('`+field.PK_siri_soalan+`',false)"><span>Lihat</span>
                                    </button>
                                    <button type="button" class="btn btn-info" id="btn_s`+field.PK_siri_soalan+`" onclick="up_setSoalan('`+field.PK_siri_soalan+`',false)" ><span>Pilih</span>
                                    </button>
                                </div>
                            </span></p>
                        </li>`
                    );
                }
                
            });
            $(".row-count-siri-soalan").html(obj_sirisoalan.data.length);
            $("#list_siriSoalan").append('</ul>');
        }
    });
});

$("#search_siri_soalan").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".class_listSoalan").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});

function get_infodetails(form,token,returnValue){
    var settings = {
        "url": host+"infodetails/view",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": window.localStorage.token
        //   "Authorization": "PENILAIAN "+token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    let request = $.ajax(settings);
    request.done(function (response) {
        obj_det = JSON.parse(response);

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"papar bank soalan berangkai Error","data":""};
        obj_det = response;

        returnValue();
    });
}

function up_setSoalan(id,flag){
    if(flag == false){
        $('#btn_s'+id).prop('disabled','disabled');
        $('#li_soalan_s'+id).addClass('d-none');
        view_siri_soalan(id,'PK_siri_soalan','sirisoalan/view',window.localStorage.token,function(){
            if(objSiriSoalan.success){
                let data = objSiriSoalan.data;
                $("#list_data_select").append(`
                <li class="dd-item dd3-item" data-id="S`+id+`">
                    <div class="dd-handle dd3-handle"></div>
                    <div class="dd3-content">
                        <p><b>`+data.kod_soalan+`</b> <span class="float-right">`+data.jenis_soalan+`</span></p>
                        `+data.soalan+`
                        <div class="row">
                            <div class="col-9"></div>
                            <div class="col-3">
                                <p class="mr-3 justify-content-end d-flex">
                                    <div class="btn-group justify-content-end d-flex">
                                        <button type="button" class="btn btn-success" onclick="view_soalan('`+id+`',`+flag+`)">Lihat</button>
                                        <button type="button" class="btn bg-light btn-success btn-simple" onclick="delete_list('`+id+`',`+flag+`)">Padam</button>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                </li>`);
            }
        });
        $(".row-count-siri-soalan").html((parseInt($(".row-count-siri-soalan").html()) - 1));
        $(".row-count-siri-soalan-pilih").html((parseInt($(".row-count-siri-soalan-pilih").html()) + 1));
    }else{
        $('#li_soalan_b'+id).addClass('d-none');
        $('#btn_b'+id).prop('disabled','disabled');
        var form = new FormData();
        form.append('id_infodetails',id);

        get_infodetails(form,window.localStorage.token,function(){
            if(obj_det.success){

                view_siri_soalan(id,'FK_infodetail','sirisoalan/infodetail/view',window.localStorage.token,function(){
                    let soalan = '';
                    let list = [];
                    if(objSiriSoalan.success){
                        $.each(objSiriSoalan.data,function(i,item){
                            list.push({
                                id:item.PK_siri_soalan
                            });
                            soalan += `
                                <div class="col-12 mt-5">
                                <p><b>`+item.kod_soalan+`</b> <span class="float-right">`+item.jenis_soalan+`</span></p>
                                <span>`+item.soalan+`</span>
                                </div>
                            `;
                            $(".row-count-siri-soalan").html((parseInt($(".row-count-siri-soalan").html()) - 1));
                            $(".row-count-siri-soalan-pilih").html((parseInt($(".row-count-siri-soalan-pilih").html()) + 1));
                        });

                        $("#list_data_select").append(`
                        <li class="dd-item dd3-item" data-id="B`+id+`">
                            <div class="dd-handle dd3-handle"></div>
                            <div class="dd3-content">
                                <p><b>`+obj_det.data.kod_teks+`</b> <span class="float-right">Soalan Berangkai</span></p>
                                <span class="text-ellipsis--2">`+obj_det.data.teks+`</span>
                                <hr><span id="B`+id+`">`+JSON.stringify(list).replaceAll('"id"','`id`')+`</span>
                                `+soalan+`
                                <div class="row">
                                    <div class="col-9"></div>
                                    <div class="col-3">
                                        <p class="mr-3 justify-content-end d-flex">
                                            <div class="btn-group justify-content-end d-flex">
                                                <button type="button" class="btn btn-success" onclick="view_soalan('`+id+`',`+flag+`)">Lihat</button>
                                                <button type="button" class="btn bg-light btn-success btn-simple" onclick="delete_list('`+id+`',`+flag+`)">Padam</button>
                                            </div>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>`);
                    }
                });                
            }
        });        
    }
}

function delete_list(id,flag){
    let serializedData = $(".dd").nestable('serialize');
    var lis = document.querySelectorAll('#list_data_select li');
    let id_flag = '';

    Array.prototype.getIndexOf = function(el) {

        var arr = this;
      
        for (var i=0; i<arr.length; i++){
        //    console.log(arr[i].id);
           if(arr[i].id==el){
             return i;
           }
           
        }
        
        return -1;
      
      }

      if(flag == false){
        id_flag = 'S'+id
        $('#li_soalan_s'+id).removeClass('d-none');
        $('#btn_s'+id).prop('disabled','');
      }else{
        id_flag = 'B'+id;
        $('#li_soalan_b'+id).removeClass('d-none');
        $('#btn_b'+id).prop('disabled','');
      }
    var index = serializedData.getIndexOf(id_flag);
    serializedData.splice(index,1);
    lis[index].remove();
    $(".row-count-siri-soalan").html((parseInt($(".row-count-siri-soalan").html()) + 1));
    $(".row-count-siri-soalan-pilih").html((parseInt($(".row-count-siri-soalan-pilih").html()) - 1));
}

var confirmed = false;

//FORM SOALAN RAWAK
$("#form_janaRawak").on('submit',function(e){
    if(!confirmed){
        e.preventDefault();
        swal({
            title: "Anda Pasti Untuk JANA Bahagian Set?",
            // text: "Berjaya Kemaskini Profile!",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Simpan",
            cancelButtonText: "Batal",
            confirmButtonColor: "#2196f3",
            closeOnConfirm: true,
            allowOutsideClick: false,
        }).then(function(){
            let bil_set = $("#bil_set").val();
            let total_soalan = $("#total_soalan").val();

            var form = new FormData();
            form.append('limit',total_soalan);
            form.append('id_siri_penilaian',window.sessionStorage.id_siri_penilaian);

            character = $("#set_soalan_key").html();
            total_set = char.indexOf(character);
            for(i = 0; i < bil_set; i++){
                
                var form_create = new FormData();            
                form_create.append('id_siri_penilaian',window.sessionStorage.id_siri_penilaian);
                form_create.append('id_penilaian',window.sessionStorage.id_penilaian);
                form_create.append('noic',window.localStorage.no_kad_pengenalan);

                soalan = [];
                set_soalanRandom(form,window.localStorage.token,function(){
                    if(obj_siriSoalan.success){
                        data = obj_siriSoalan.data;
                        $.each(data,function(i,field){
                            soalan.push({"id":field.PK_siri_soalan});
                        });
                        json_list = [{"bahagian":"BAHAGIAN A"}];
                        json_list[0]['soalan'] = soalan;

                        //add set
                        set = char[total_set];
                        total_set++;
                        form_create.append('kod_set',set);

                        let jsons = JSON.stringify(json_list);                    
                        form_create.append('json_list',jsons);
                        if(jk_penilai == 1) {
                            form_create.append('statusrekod','1');
                        } else {
                            form_create.append('statusrekod','2');
                        }
                        form_create.append('jenis_set','SOALAN RAWAK'); 
                        // console.log(jsons);
                        set_soalan(form_create,window.localStorage.token,function(){
                            if(obj_setSoalan.success){
                                window.location.reload();
                            }
                        });
                        //end add set
                        soalan = [];
                        json_list = [];
                    }
                });                
            }
        });
    }
});
//END SOALAN RAWAK

//FORM SOALAN SUBMIT
$("#form_set").on('submit',function(e){
    if(!confirmed){
        e.preventDefault();
        let serializedData = $(".dd").nestable('serialize');
        if(serializedData.length > 0){
            let kod_set = $("#set_soalan_key").html();
            let id_set_soalan = $("#id_set_soalan").val();

            var form = new FormData();
            form.append('id_siri_penilaian',window.sessionStorage.id_siri_penilaian);
            form.append('id_penilaian',window.sessionStorage.id_penilaian);
            form.append('kod_set',kod_set);
            form.append('id_set_soalan',id_set_soalan);
            form.append('noic',window.localStorage.no_kad_pengenalan);

            swal({
                title: "Anda pasti untuk simpan?",
                // text: "Berjaya Kemaskini Profile!",
                type: "question",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
                confirmButtonColor: "#2196f3",
                closeOnConfirm: true,
                allowOutsideClick: false,
            }).then(function(){
                let size = serializedData.length-1;
                let latest_list = [];
                if(id_set_soalan != ""){

                    $.each(serializedData,function(i,item){
                        let str_id = item.id.substring(0, 1);
                        let item_id = item.id.slice(1);
                        if(str_id == 'B'){
                            latest_list = latest_list.concat(JSON.parse($('#B'+item_id).html().replaceAll("`id`",`"id"`)));
                        }else{
                            let new_id = item.id.slice(1);
                            latest_list.push({
                                id:new_id
                            });
                        }

                        if(i == size){
                            show_setSoalan(form,window.localStorage.token,function(){
                                if(obj_setSoalan.success){
                                    obj_data = obj_setSoalan.data;
                                    let data = JSON.parse(obj_data.json_list);
                                    let bil = data.length;
                                    let bahagian = $("#bahagian_set").val();
                                    let new_bahagian = {"bahagian":bahagian,"soalan":latest_list};
                                    data.push(new_bahagian);
                                    let json_list = JSON.stringify(data);                    
                                    form.append('json_list',json_list);  
        
                                    update_setSoalan(form,window.localStorage.token,function(){
                                        if(obj_setSoalan.success){
                                            $("#list_data_select").empty();
                                            $("#bahagian_set").val('');
                                                                                
                                            $("#bahagian_list").append(`
                                            <li class="nav-item">
                                                <a class="nav-link " data-bs-toggle="tab" href="#bahagian`+bil+`">`+new_bahagian.bahagian+`</a>
                                            </li>`);
                
                                            $.each(new_bahagian.soalan,function(i,field){
                
                                            });
                
                                            $("#soalan_bahagian").append(`
                                            <div role="tabpanel" class="tab-pane in " id="bahagian`+bil+`">
                                                <p class="hidden">`+JSON.stringify(new_bahagian.soalan)+`</p>
                                            </div>                            
                                            `);                                    
                                        }
                                    });
                                }
                            });
                        }
                    });
                    
                }
                else{

                    $.each(serializedData,function(i,item){
                        let str_id = item.id.substring(0, 1);
                        let item_id = item.id.slice(1);
                        if(str_id == 'B'){
                            latest_list = latest_list.concat(JSON.parse($('#B'+item_id).html().replaceAll("`id`",`"id"`)));
                        }else{
                            let new_id = item.id.slice(1);
                            latest_list.push({
                                id:new_id
                            });
                        }

                        if(i == size){
                            let data = [];
                            let bahagian = $("#bahagian_set").val();
                            data.push({"bahagian":bahagian,"soalan":latest_list});
                            let json_list = JSON.stringify(data);                    
                            form.append('json_list',json_list);
                            form.append('statusrekod','1');
                            form.append('jenis_set','SOALAN SET');

                            set_soalan(form,window.localStorage.token,function(){
                                if(obj_setSoalan.success){
                                    let obj = obj_setSoalan.data;
                                    $("#id_set_soalan").val(obj.id_set_soalan);
                                    $("#list_data_select").empty();
                                    $("#bahagian_set").val('');
                                    obj_jsonList = JSON.parse(obj.json_list);
                                    
                                    $("#bahagian_list").html(`
                                    <li class="nav-item">
                                        <a class="nav-link active" data-bs-toggle="tab" href="#bahagian0">`+obj_jsonList[0].bahagian+`</a>
                                    </li>`);

                                    // $.each(obj_jsonList[0].soalan,function(i,field){ });

                                    $("#soalan_bahagian").html(``);
                                    swal({
                                        title: "Simpan Bahagian Set",
                                        text: "Berjaya!",
                                        type: "success",
                                        showConfirmButton: false,
                                        allowOutsideClick: false,
                                        html: false,
                                        timer: 2000
                                    }).then(function(){},
                                        function (dismiss) {
                                            // load_setSoalan();
                                        }
                                    );
                                }
                                else{
                                    alert("SINI");
                                    swal(obj_setSoalan.message,'','error');
                                }
                            });
                        }

                    });
                } 
            });
        }
        else{
            swal('Tiada Soalan Dipilih','','warning');
        }
    }
});

var confirmed = false;
$('#submit_btn').click(function(e){
    
    if(!confirmed){
        e.preventDefault();
        let id_set_soalan = $("#id_set_soalan").val();
        if(jk_penilai == 1){
            swal({
                title: "Set Soalan Perlukan Pengesahan Jawatankuasa Penilai?",
                // text: "Berjaya Kemaskini Profile!",
                type: "question",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
                confirmButtonColor: "#2196f3",
                closeOnConfirm: true,
                allowOutsideClick: false,
            }).then(function(){
    
                if(id_set_soalan != ''){
                    
                    var form = new FormData();
                    form.append('id_set_soalan',id_set_soalan);
                    form.append('statusrekod',1);
    
                    uptStatusJK(form,window.localStorage.token,function(){
    
                        if(obj_setSoalanJK.success){
                            swal({
                                title: "Set Soalan Selesai",
                                text: "Berjaya!",
                                type: "success",
                                showConfirmButton: false,
                                allowOutsideClick: false,
                                html: false,
                                timer: 2000
                            }).then(function(){},
                                function (dismiss) {
                                    window.location.reload();
                                }
                            );
                        }else{
                            swal(obj_setSoalanJK.message,'','error');
                        }
                    });
                }else{
                    swal({
                        title: "Tiada Soalan Dipilih",
                        text: "Gagal!",
                        type: "Warning",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 2000
                    }).then(function(){},
                        function (dismiss) {
                            window.location.reload();
                        }
                    );
                }
    
            },function(dismiss){
                if(dismiss == 'cancel'){
                    if(id_set_soalan != ''){
                    
                        var form = new FormData();
                        form.append('id_set_soalan',id_set_soalan);
                        form.append('statusrekod',2);
        
                        uptStatusJK(form,window.localStorage.token,function(){
        
                            if(obj_setSoalanJK.success){
                                swal({
                                    title: "Set Soalan Selesai",
                                    text: "Berjaya!",
                                    type: "success",
                                    showConfirmButton: false,
                                    allowOutsideClick: false,
                                    html: false,
                                    timer: 2000
                                }).then(function(){},
                                    function (dismiss) {
                                        window.location.reload();
                                    }
                                );
                            }else{
                                swal(obj_setSoalanJK.message,'','error');
                            }
                        });
                    }else{
                        swal({
                            title: "Tiada Soalan Dipilih",
                            text: "Gagal!",
                            type: "warning",
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            html: false,
                            timer: 2000
                        }).then(function(){},
                            function (dismiss) {
                                window.location.reload();
                            }
                        );
                    }
                }                
            });
        } else {
            if(id_set_soalan != ''){
            
                var form = new FormData();
                form.append('id_set_soalan',id_set_soalan);
                form.append('statusrekod',2);

                uptStatusJK(form,window.localStorage.token,function(){

                    if(obj_setSoalanJK.success){
                        swal({
                            title: "Set Soalan Selesai",
                            text: "Berjaya!",
                            type: "success",
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            html: false,
                            timer: 2000
                        }).then(function(){},
                            function (dismiss) {
                                window.location.reload();
                            }
                        );
                    }else{
                        swal(obj_setSoalanJK.message,'','error');
                    }
                });
            }else{
                swal({
                    title: "Tiada Soalan Dipilih",
                    text: "Gagal!",
                    type: "warning",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    html: false,
                    timer: 2000
                }).then(function(){},
                    function (dismiss) {
                        window.location.reload();
                    }
                );
            }           
        }
    }
});

function uptStatusJK(form,token,returnValue){
    var settings = {
        "url": host+"setsoalan/uptJK",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": "PENILAIAN "+token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    let request = $.ajax(settings);
    request.done(function (response) {
        // let obj = JSON.parse(response);
        obj_setSoalanJK = JSON.parse(response);

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"daftar bank soalan Error","data":""};
        obj_setSoalan = response;

        returnValue();
    }); 

}

function checkJKPenilai(FK_siri_penilaian, returnValue){
    var form = new FormData();
    form.append('FK_siri_penilaian', FK_siri_penilaian);
    var settings = {
        "url": host+"urusetia/showJKBySiriPenilaian",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": "PENILAIAN "+window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    let request = $.ajax(settings);
    request.done(function (response) {
        obj_setSoalan = JSON.parse(response);

        returnValue();
        
    });
    request.fail(function(response){
        obj_setSoalan = response;

        returnValue();
    }); 
}

function set_soalan(form,token,returnValue){
    var settings = {
        "url": host+"setsoalan/add",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": "PENILAIAN "+token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    let request = $.ajax(settings);
    request.done(function (response) {
        // let obj = JSON.parse(response);
        obj_setSoalan = JSON.parse(response);

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"daftar bank soalan Error","data":""};
        obj_setSoalan = response;

        returnValue();
    }); 

}

function set_soalanRandom(form,token,returnValue){
    var settings = {
        "url": host+"sirisoalan/random",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": "PENILAIAN "+token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    let request = $.ajax(settings);
    request.done(function (response) {
        // let obj = JSON.parse(response);
        obj_siriSoalan = JSON.parse(response);

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"data bank soalan Error","data":""};
        obj_siriSoalan = response;

        returnValue();
    }); 

}

function show_setSoalan(form,token,returnValue){
    var settings = {
        "url": host+"setsoalan/view",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": "PENILAIAN "+token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    let request = $.ajax(settings);
    request.done(function (response) {
        obj_setSoalan = JSON.parse(response);

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"daftar bank soalan Error","data":""};
        obj_setSoalan = response;

        returnValue();
    }); 
}

function view_soalan(id,flag){
    if(flag == false){
        $('#teks_soalan_view').addClass('d-none');
        $('#data_soalan_view').addClass('col-md-12').removeClass('col-md-7').addClass('ps-4');

        view_siri_soalan(id,'PK_siri_soalan','sirisoalan/view',window.localStorage.token,function(){
            if(objSiriSoalan.success){
                let data = objSiriSoalan.data;
                let jawapan = "";
                tinymce.remove("textarea#jawapan");
    
                if(data.FK_jenis_soalan == "01" || data.FK_jenis_soalan == "04"){
                    list_jawapan = JSON.parse(data.jawapan);
                    $.each(list_jawapan,function(i,field){
                        jawapan += 
                        `<ul class="list-group">
                            <li class="list-group-item">
                                <label><input type="radio" name="pilih_jawapan" />`+field.value+`</label>
                            </li>
                        </ul>`;
                    });
    
                }
                else if(data.FK_jenis_soalan == "03"){
                    list_jawapan = JSON.parse(data.jawapan);
                    $.each(list_jawapan,function(i,field){
                        jawapan += 
                        `<ul class="list-group">
                            <li class="list-group-item">
                                <label><input type="checkbox" name="pilih_jawapan" />`+field.value+`</label>
                            </li>
                        </ul>`;
                    });
                }
                else if(data.FK_jenis_soalan == "06"){
                    jawapan = data.jawapan;
                }
                else{
                    jawapan = `<textarea id="jawapan"></textarea>`;
    
                }
                
                // $("#kod_soalan_view").text(data.kod_soalan);
                $("#data_soalan_view").html(`
                    <div class="border p-3 bg-light-default">`+data.soalan+`</div>
                    <div class="">`+jawapan+`</div>
                `);
    
                if(data.FK_jenis_soalan == "02" || data.FK_jenis_soalan == "05"){
                    setTinymce('jawapan');                
                }
    
                $("#view_soalan").modal('show');    
            }
            else{
    
            }
        });
    }else{
        $('#teks_soalan_view').removeClass('d-none');
        $('#data_soalan_view').addClass('col-md-7').removeClass('col-md-12').removeClass('ps-4');

        var form = new FormData();
        form.append('id_infodetails',id);

        get_infodetails(form,token,function(){
            if(obj_det.success){
                let kod_teks = obj_det.data.kod_teks;
                let teks = obj_det.data.teks;
                $("#kod_soalan_view").text(kod_teks);
                $("#teks_soalan_view").html(teks);
                
                view_siri_soalan(id,'FK_infodetail','sirisoalan/infodetail/view',window.localStorage.token,function(){
                    if(objSiriSoalan.success){
                        tinymce.remove("textarea#jawapan");
                        $("#data_soalan_view").html('');
                        $.each(objSiriSoalan.data,function(i,item){
                            let jawapan = "";
                            let PK_siri_soalan = item.PK_siri_soalan;
                            let kod_soalan = item.kod_soalan;
                            let soalan = item.soalan;

                            if(item.FK_jenis_soalan == "01" || item.FK_jenis_soalan == "04"){
                                list_jawapan = JSON.parse(item.jawapan);
                                $.each(list_jawapan,function(i,field){
                                    jawapan += 
                                    `<ul class="list-group">
                                        <li class="list-group-item">
                                            <label><input type="radio" name="pilih_jawapan" />`+field.value+`</label>
                                        </li>
                                    </ul>`;
                                });
                            }
                            else if(item.FK_jenis_soalan == "03"){
                                list_jawapan = JSON.parse(item.jawapan);
                                $.each(list_jawapan,function(i,field){
                                    jawapan += 
                                    `<ul class="list-group">
                                        <li class="list-group-item">
                                            <label><input type="checkbox" name="pilih_jawapan" />`+field.value+`</label>
                                        </li>
                                    </ul>`;
                                });
                            }
                            else if(item.FK_jenis_soalan == "06"){
                                jawapan = item.jawapan;
                            }
                            else{
                                jawapan = `<textarea id="jawapan"></textarea>`;
                
                            }

                            $("#data_soalan_view").append(`
                                <div class="col-12 bg-light-default " id="soalan_`+PK_siri_soalan+`">
                                    <div class="border px-3 pt-3"><div><b>`+kod_soalan+`</b></div>`+soalan+`</div>
                                </div>
                                <div class="col-12 mb-3" id="jawapan_`+PK_siri_soalan+`">
                                    `+jawapan+`
                                </div>
                            `);

                            if(item.FK_jenis_soalan == "02" || item.FK_jenis_soalan == "05"){
                                setTinymce('jawapan');                
                            }
                
                            $("#view_soalan").modal('show');  
                        });
                        
                        // $("#kod_soalan_view").text(kod_teks);
                        // $("#data_soalan_view").html(`
                        // <div class="border p-3 mb-3">`+data.soalan+`</div>
                        // <div class="">JAWAPAN<br>`+jawapan+`</div>
                    // `);
                    }
                });
                // view_siri_soalan(id,window.localStorage.token,function(){
                // });
            }
        });
    }
    
}

function list_infodetail(id_infodetails,token,returnValue){
    var form = new FormData();
    
    form.append('FK_infodetail',id_infodetails);
    var settings = {
        "url": host+"sirisoalan/infodetail/view",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    //   };
    };

    let request = $.ajax(settings);
    request.done(function (response) {
        obj_info = response;

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"senarai bank soalan berangkai Error","data":""};
        obj_info = response;
        returnValue();
    });
}

function view_siri_soalan(id,param,url,token,returnValue){
    var form = new FormData();
    form.append(param, id);
    var settings = {
        "url": host+url,
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
      var request = $.ajax(settings);

      request.done(function (response) {
        objSiriSoalan = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
        objSiriSoalan = JSON.parse(response);

        returnValue();
      });
}

function setTinymce(id_name){
    tinymce.init({
        selector: 'textarea#'+id_name,
        menubar: false,
        height: 200,
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        plugins:'table'
    });
}