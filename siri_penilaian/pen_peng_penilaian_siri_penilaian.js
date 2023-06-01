var masterSoalan = [];

$(function () {
    $.ajaxSetup({
        cache: false
    });
    //Masked Input ============================================================================================================================
    var $demoMaskedInput = $('.demo-masked-input');

    //Date
    $demoMaskedInput.find('.date').inputmask('dd/mm/yyyy', { placeholder: '__/__/____' });

    //Time
    $demoMaskedInput.find('.time12').inputmask('hh:mm t', { placeholder: '__:__ _m', alias: 'time12', hourFormat: '12' });
    $demoMaskedInput.find('.time24').inputmask('hh:mm', { placeholder: '__:__ _m', alias: 'time24', hourFormat: '24' });
    //===========================================================================================================================================

    checkSession();    
    let token = window.localStorage.token;
    $("#leftsidebar").load('../aside/aside_detail_siri_penilaian.html');
    $("#btnKembali").attr('onclick','kembali2(\'' + sessionStorage.id_penilaian + '\')');
    $("#kembali").attr('onclick','kembali()');
    $("#kembali2").attr('onclick','kembali2(\'' + sessionStorage.id_penilaian + '\')');
    saveLog("View Page: Pengurusan Penilaian", sessionStorage.browser);
    let id_siri_penilaian = sessionStorage.id_siri_penilaian;
    resetForm();

    loadDataPenilaian(id_siri_penilaian,function(){

        if(objPenilaian.success){
            let data = objPenilaian.data;

            $('#txt_nama_penilaian').html(data.nama_penilaian);
            $("#nama_penilaian").html(data.nama_penilaian + " SIRI " + data.kod+"/"+data.tahun);
            $('#txt_nosiri').html(data.tahun+'/'+data.nosiri);
            $('#txt_kategori_penilaian').html(data.nama_kategori_penilaian);

            tinymce.remove("textarea#template_emel_textarea");
            tinymce.init({
                selector: 'textarea#template_emel_textarea',
                menubar: false,
                height: 250,
                submit_patch : false,
                add_form_submit_trigger : false,
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat ',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                  { value: 'First.Name', title: 'First Name' },
                  { value: 'Email', title: 'Email' },
                ],
                plugins: [
                    'image','media','table','lists',
                ],
                images_upload_url: host+'fileUpload',
                images_upload_credentials: true,
            });
            if (data.template_emel != null){
                $("#template_emel_textarea").val(data.template_emel);
            }
        }
    });

    loadDataTetapanMasa(function(){

        if(objTetapan.success){
            let data = objTetapan.data;

            $('#tetapan_masa').html('').append(`<option value="">-Pilih-</option>`);
            $.each(data,function(i,item){
                $('#tetapan_masa').append(`<option value="`+item.id_tetapan_masa+`">`+item.tetapan_masa+`</option>`);
            });
        }
    });

    loadListSetSoalan(id_siri_penilaian,function(){

        if(objSet.success){
            let data = objSet.data;

            $('#set_soalan').html('').append('<option value="">-Pilih-</option>');
            $.each(data,function(i,item){
                $('#set_soalan').append(`<option value="`+item.id_set_soalan+`">SET `+item.kod_set+`</option>`)
            })
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
                        if(item.status_penilaian == 2){
                            loadPautan(item.id_sesi_siri_penilaian);
                        } else {
                            $("#pautan_sistem").html('');
                        }
                        status_active = 'active';
                        resetForm('process');

                        loadContentSesi(item.id_sesi_siri_penilaian,function(){//

                            if(objSesi.success){
                                let data = objSesi.data;

                                if(data.pautan_status > 0){
                                    $('#pautan').removeClass('hidden');
                                    $('#switch_status').prop('checked',true);
                                    $('#text_pautan').html('Ya').addClass('badge-success').removeClass('badge-danger');
                                    $('#label_switch').addClass('label-success').removeClass('label-danger');
                                }
                                $('#tetapan_masa').val(data.id_tetapan_masa);
                                $('#id_sesi_siri_penilaian').val(data.id_sesi_siri_penilaian).removeAttr('disabled');
                                $('#sesi_penilaian').val(data.sesi_penilaian).removeAttr('disabled');
                                $('#tarikh_mula').val(data.tarikh_mula).removeAttr('disabled');
                                $('#tarikh_tamat').val(data.tarikh_tamat).removeAttr('disabled');
                                $('#masa_mula').val(data.masa_mula).removeAttr('disabled');
                                $('#masa_tamat').val(data.masa_tamat).removeAttr('disabled');
                                $('#pautan_google').val(data.pautan_google).removeAttr('disabled');
                                $('#pautan_skype').val(data.pautan_skype).removeAttr('disabled');
                                $('#pautan_team').val(data.pautan_team).removeAttr('disabled');
                                $('#pautan_zoom').val(data.pautan_zoom).removeAttr('disabled');
                                $('#pautan_status').val(data.pautan_status).removeAttr('disabled');
                                $('#bil_calon').val(data.bil_calon).removeAttr('disabled');

                                $('#text_total_sum_value').html(secondsToHms(data.duration));
                                $("#total_sum_value").html(data.duration);

                                loadTabSesi(data.id_sesi_siri_penilaian);
                                loadTabSesiSoalan(data.id_sesi_siri_penilaian);
                                loadTabCalonSoalan(data.id_sesi_siri_penilaian);
                                loadTetapanTable(data.FK_tetapan_masa);
                                // $('#').val(data.);
                            }
                        });
                    } 

                    $('#tab_sesi').append(
                        `<li class="nav-item"><a class="nav-link btn-simple `+status_active+`" data-bs-toggle="tab" href="javascript:void(0);" onclick="loadTabSesi(`+item.id_sesi_siri_penilaian+`);" id="tab_`+item.id_sesi_siri_penilaian+`"> `+item.sesi_penilaian+`</a></li>`
                    );
                    $('#tab_sesi_soalan').append(
                        `<li class="nav-item"><a class="nav-link btn-simple `+status_active+`" data-bs-toggle="tab" href="javascript:void(0);" onclick="loadTabSesiSoalan(`+item.id_sesi_siri_penilaian+`);" id="tab_soalan_`+item.id_sesi_siri_penilaian+`"> `+item.sesi_penilaian+`</a></li>`
                    );
                    $('#tab_calon_soalan').append(
                        `<li class="nav-item"><a class="nav-link btn-simple `+status_active+`" data-bs-toggle="tab" href="javascript:void(0);" onclick="loadTabCalonSoalan(`+item.id_sesi_siri_penilaian+`);" id="tab_calon_`+item.id_sesi_siri_penilaian+`"> `+item.sesi_penilaian+`</a></li>`
                    );

                    list.push(item.id_sesi_siri_penilaian);

                    if(length == i){
                        $(".process_simpan").html("Kemaskini");
                        $(".process_padam").html("Padam").addClass('btn btn-danger').attr("onclick","padamSesi("+data[0].id_sesi_siri_penilaian+")");
                        
                        $('#tab_sesi').append(
                            `<li class="nav-item float-sm-end float-md-end float-lg-end float-xl-end "><a class="nav-link btn-simple" data-bs-toggle="tab" id="tab_0" href="javascript:void(0);" onclick="loadTabSesi(0)"><i class="fa fa-plus-circle"></i>&nbsp; Daftar Sesi Baharu</a></li>`
                        );

                        list.push(0);

                        $('#senaraiSesi').html(JSON.stringify(list));
                        $("#btnAddCalon").attr('disabled',false);
                        $("#btnUploadCalon").attr('disabled',false);

                    }
                });
            }else{
                $(".process_simpan").html("Simpan");
                $(".process_padam").html('').removeClass('btn btn-danger');
                $('#tab_sesi').append(
                    `<li class="nav-item float-sm-end float-md-end float-lg-end float-xl-end "><a class="nav-link btn-simple" data-bs-toggle="tab" id="tab_0" href="javascript:void(0);" onclick="loadTabSesi(0)"><i class="fa fa-plus-circle"></i>&nbsp; Daftar Sesi Baharu</a></li>`
                );

                list.push(0);

                $('#senaraiSesi').html(JSON.stringify(list));
                $("#btnAddCalon").attr('disabled',true);
                $("#btnUploadCalon").attr('disabled',true);
            }
        }else{
            $('#tab_sesi').html('');

            $('#tab_sesi').append(
                `<li class="nav-item float-sm-end float-md-end float-lg-end float-xl-end "><a class="nav-link btn-simple" data-bs-toggle="tab" id="tab_0" href="javascript:void(0);" onclick="loadTabSesi(0)"> Daftar Sesi Baharu</a></li>`
            );

            list.push(0);

            $('#senaraiSesi').html(JSON.stringify(list));
            $("#btnAddCalon").attr('disabled',true);
            $("#btnUploadCalon").attr('disabled',true);
        }
    });
    
    // users(noic_master,token,function(){
    //     if(dataUsers.success){
    //     }else{
    //         reject_load();
    //     }
    // });
});

function loadListSetSoalan(id_siri_penilaian,returnValue){

    var settings = {
        "url": host+"setsoalan/list/"+id_siri_penilaian,
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        // "data": form
    };

      var request = $.ajax(settings);

      request.done(function (response) {
        objSet = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
          
    });

}

$('#set_soalan').change(function(){

    masterSoalan = [];
    
    // console.log(masterSoalan.length);

    $('#table_soalan').html('');

    let id_set_soalan = $('#set_soalan').val();

    reloadDataSetSoalan(id_set_soalan);

});

function reloadDataSetSoalan(id_set_soalan){

    var form = new FormData();
    form.append('id_set_soalan',id_set_soalan);

    loadDataSetSoalan(form,function(){

        if(objSoalan.success){
            let list = '';
            let json_list = JSON.parse(objSoalan.data.json_list);
            let json_list_bahagian = [];
            let json_list_soalan = [];
            let size_list = json_list.length - 1;

            let bil = 1;
            let count = 1;
            $.each(json_list, function(i, item){
                let bahagian = item.bahagian.replaceAll(' ', '_');
                json_list_bahagian.push({
                    bahagian: bahagian
                });
                let soalan = item.soalan;
                $.each(soalan, function(s, field){
                    json_list_soalan.push({
                        bahagian: bahagian,
                        PK_siri_soalan: field.id
                    });
                    let id_siri_soalan = field.id;
                    var form = new FormData();
                    form.append("PK_siri_soalan", id_siri_soalan);
                    getSoalanByID(form, function(){
                        $.each(json_list_soalan, function(jls, jlsitem){
                            if(jlsitem.PK_siri_soalan == objData.data.PK_siri_soalan){
                                json_list_soalan[jls].jawapan = objData.data.jawapan;
                                json_list_soalan[jls].jenis_soalan = objData.data.jenis_soalan;
                                json_list_soalan[jls].kod_soalan = objData.data.kod_soalan;
                                json_list_soalan[jls].skema = objData.data.skema;
                                json_list_soalan[jls].soalan = objData.data.soalan;
                                json_list_soalan[jls].tahap = objData.data.tahap;
                                json_list_soalan[jls].topik = objData.data.topik;
                            }
                        });
                        count++;
                        if((count-1) == json_list_soalan.length){
                            $("#bahagian").html('');
                            $.each(json_list_bahagian,function(i,gen2){
                                $('#bahagian').append(`
                                    <table width="100%" class="table table-bordered" id="table_`+gen2.bahagian+`"></table><br>
                                `);
                            });
                
                            let bill = 1;
                            $.each(json_list_soalan,function(i, gen3){
                                if($("#table_"+gen3.bahagian).html() === ''){
                                    $("#table_"+gen3.bahagian).append(`
                                        <tr>
                                            <th colspan="7">`+gen3.bahagian.replaceAll('_', ' ')+`</th>
                                        </tr>
                                    `);
                                }
                                $("#table_"+gen3.bahagian).append(`
                                    <tr>
                                        <td width="5%">`+bill+`</td>
                                        <td width="55%">`+gen3.soalan+`</td>
                                        <td width="10%">`+gen3.jenis_soalan+`</td>
                                        <td width="10%">`+gen3.topik+`</td>
                                        <td width="10%">`+gen3.tahap+`</td>
                                        <td width="10%">
                                            <input type="text" pattern="[0-9]+" class="form-control bg-light txtCal" id="minit_`+bill+`" value="`+gen3.saat_menjawab+`" placeholder="Saat: 30" onkeyup="countTiming(`+bill+`)">
                                            <input type="text" class="form-control bg-light hidden" value="`+gen3.PK_siri_soalan+`" id="PK_siri_soalan_`+bill+`">                        
                                        </td>
                                    </tr>
                                `);
                                bill++;
                            });
                        }
                    });
                });
            });                
        }
    });
}

$("#process input[name=status_penilaian]").on('change',function(){
    if($("input[name=status_penilaian]:checked").val() == 3){
        $("#div_tarikh_mohon").removeClass('d-none');
    } else {
        $("#div_tarikh_mohon").addClass('d-none');
    }
});

function processSoalanById(form){
    
}

function setDataListByIndex(string_1,string_2){

    if(string_1 != ``){
        masterSoalan.push(
            {data :string_1 },
            {data :string_2}
        );
    }else{
        masterSoalan.push(
            {data :string_2}
        );
    }
        
}

function getSoalanByID(form,returnValue){

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
        objData = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
          
    });

}

function loadDataSetSoalan(form,returnValue){

    var settings = {
        "url": host+"setsoalan/view",
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
        objSoalan = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
          
    });

}

$("#switch_status").change(function() {
    if($('#status_pautan').val() == 0){
        $('#status_pautan').val(1)
        $('#pautan').removeClass('hidden');
        $('#label_switch').addClass('label-success').removeClass('label-danger').prop('checked',true);
        $('#text_pautan').addClass('badge-success').removeClass('badge-danger').html('Ya');
    }else{
        $('#status_pautan').val(0)
        $('#pautan').addClass('hidden');
        $('#label_switch').removeClass('label-success').addClass('label-danger').prop('checked',false);
        $('#text_pautan').removeClass('badge-success').addClass('badge-danger').html('Tidak');
    }
});

function btn_upload(){
    $("#file_calon").trigger("click");
}

$("#file_calon").change(function() {

    let file = $("#file_calon").val().split('\\').pop().split('.')
    read_file('file_calon');
    $('#text_file_calon').val(file[0]);

    // var allowedExtensions =/(\.xlsx)$/i;

    // if (!allowedExtensions.exec($("#file_calon").val())) {
    //     swal({
    //         title: "Tiada Data Yang Berdaftar",
    //         type: "error",
    //         showConfirmButton: false,
    //         allowOutsideClick: false,
    //         html: false,
    //         timer: 2000
    //     }).then(function(){},
    //         function (dismiss) {
    //         }
    //     );
    // }else{
        
    // }
    

});

function read_file(file_name){
    let list_calon = JSON.parse($('#list_calon').val());
    let selectedFile;
    selectedFile = $("#"+file_name)[0].files[0];
    
    let data=[{
      "name":"file_name",
      "data":"CALON_PENILAIAN",
    }];
    
    XLSX.utils.json_to_sheet(data, 'imran.xlsx');
    if(selectedFile){
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event)=>{
         let data = event.target.result;
         let workbook = XLSX.read(data,{type:"binary"});
         workbook.SheetNames.forEach(sheet => {
            data_set = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
            length_data = data_set.length;

            let newData = [],chunk = [],list = [];
            
            var columns = [
                { "name": "NAMA", "title": "Nama" },
                { "name": "NO_KAD_PENGENALAN", "title": "No. Kad Pengenalan", "breakpoints": "md sm xs"  },
                { "name": "GRED", "title": "Gred", "breakpoints": "sm xs" },
                { "name": "JAWATAN_TEXT","title":"Jawatan","breakpoints":"sm xs"},
                { "name": "EMEL","title":"Emel","breakpoints":"sm xs"},
                { "name": "NOTEL","title":"No. Telefon","breakpoints":"sm xs"},
                { "name": "STATUS_DATA","title":"Status"},
            ];

            const middleIndex = Math.ceil(length_data / 20);
            while (data_set.length > 0) {
                
                chunk = data_set.splice(0, 20);
                newData.push(chunk);
                
            }
            console.log(chunk);

            let runData = newData[0];

            runData.forEach(object => {
                object.STATUS = 1;
                object.STATUS_DATA = `<span class="text-success"><i class="fa-regular fa-circle-check"></i></span>`;
            });

            let sizeData = newData[0].length-1;
            let sizeCalon = list_calon.length-1;
            console.log(newData[0]);
            console.log(newData[0][0]);
            if(newData[0][0].NAMA  == undefined || newData[0][0].NO_KAD_PENGENALAN  == undefined || newData[0][0].GRED  == undefined || newData[0][0].JAWATAN  == undefined || newData[0][0].EMEL  == undefined || newData[0][0].NOTEL  == undefined){
                swal({
                    title: "Data Tidak Tepat. Sila Muat Turun Fail Nama Calon Yang Sah.",
                    type: "error",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    html: false,
                    timer: 2000
                }).then(function(){},
                    function (dismiss) {
                    }
                );
            }else{
                $.each(newData[0],function(j,items){
                    // if(items.NAMA  == 'undefined' && items.NO_KAD_PENGENALAN  == 'undefined' && items.GRED  == 'undefined' && items.JAWATAN  == 'undefined' && items.EMEL  == 'undefined' && items.NOTEL  == 'undefined'){
                    //     flag = 1;
                    // }else{
    
                    // }
                    runData[j].JAWATAN_TEXT = `<p>`+runData[j].JAWATAN+`</p>`;
    
                    list.push({
                        NAMA : items.NAMA ,
                        NO_KAD_PENGENALAN : items.NO_KAD_PENGENALAN ,
                        GRED : items.GRED ,
                        JAWATAN : items.JAWATAN ,
                        EMEL : items.EMEL ,
                        NOTEL : items.NOTEL 
                    });
    
                    $.each(list_calon,function(i,item){
    
                        if(item.no_kad_pengenalan == items.NO_KAD_PENGENALAN){
    
                            list.splice(j,1);
                            runData[j].STATUS_DATA = `<span class="text-danger"><i class="fa-regular fa-circle-xmark"></i></span>`;
                            
                        }
         
                        if(j == sizeData){ if(i == sizeCalon){ if(runData.length > 0){ $('#btn-upload').prop('disabled','disabled').removeClass('btn-primary').addClass('btn-secondary'); } } }
    
                    });
    
                });
    
                
                $("#senaraiCalonTemp").footable({
                    "columns": columns,
                    "rows": runData,
                    "paging": {
                        "enabled": true,
                        "size": 10
                    }
                });
                
                $('#listCalonTemp').val(JSON.stringify(list));
            }

            });
        }
    } 
}

function load_calon_soalan(id_sesi_siri_penilaian){
    var columns = [
        { "name": "check", "title": `<input class="form-check-input" type="checkbox" name="checkBoxtable_calonAll" onclick="toggleCheckBox('table_calon');">` },
        { "name": "bil", "title": "Bil" },
        { "name": "nama", "title": "Nama", "breakpoints": "md sm xs" },
        { "name": "nama_jawatan", "title": "Jawatan" },
        { "name": "no_kad_pengenalan", "title": "No. Kad Pengenalan" },
        { "name": "emel", "title": "Emel", "breakpoints": "md sm xs"  },
        { "name": "notel", "title": "No. Telefon", "breakpoints": "md sm xs"  },
        { "name": "no_angka_giliran", "title": "No. Angka Giliran", "breakpoints": "md sm xs"  },
        { "name": "status_emel", "title": "Status Emel", "breakpoints": "md sm xs"  },
        { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
    ];
    var form = new FormData();
    form.append("FK_siri_penilaian", window.sessionStorage.id_siri_penilaian);
    listCalonSoalanBySiriPenilaian(form, function(){
        result = obj;
        var list = [];
        let bil = 1;
        $.each(result.data, function (i, field) {
            status_emel = `<span id="status_emel_calon_`+field.id_calon_soalan+`" class="badge bg-success badge-sm">Telah Dimaklumkan</span>`;
            if(field.json_list == null){
                status_emel = `<span id="status_emel_calon_`+field.id_calon_soalan+`"><button onclick="calonEmel(`+field.id_calon_soalan+`)" class="btn btn-primary btn-sm" style="font-size: 14px;">HANTAR <i class="fa fa-paper-plane "></i></button></span>`;
            }
            if(field.FK_sesi == id_sesi_siri_penilaian){
                list.push({
                    check: `<div class="form-check">
                                <input class="form-check-input table_calon" type="checkbox" name="field_calon_soalan" value="`+field.id_calon_soalan+`" id="calon_soalan`+i+`">
                            </div>`, 
                    bil: bil++, 
                    nama: field.nama, 
                    no_kad_pengenalan: field.no_kad_pengenalan, 
                    nama_jawatan: field.jawatan, 
                    emel: field.emel, 
                    notel: field.notel, 
                    no_angka_giliran: field.no_angka_giliran, 
                    status_emel: status_emel,
                    upt_btn: `<button class="btn btn-circle btn-danger btn-sm" data-ui-toggle-class="zoom" data-ui-target="#animate" onclick="padamCalonSingle('`+field.id_calon_soalan+`','`+field.FK_sesi+`')"><i class="fas fa-trash"></i></button>`
                });
            }
        });
        $('#list_calon').val(JSON.stringify(list));
        if(result.data.length > 0){
            $("#padam_calon").html(`
                <a href="javascript:void(0);" onclick="padamCalon(`+id_sesi_siri_penilaian+`);" class="btn btn-danger btn-sm">Padam Calon&nbsp;<i class="fa fa-trash"></i></a>
                <a href="javascript:void(0);" onclick="emelCalonSelected(`+id_sesi_siri_penilaian+`);" class="btn btn-primary btn-sm">Hantar Emel&nbsp;<i class="fa fa-paper-plane"></i></a>
            `);
        }
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
        $(".row-count").html(list.length);
    });
}

function calonEmel(id_calon_soalan){
    var form = new FormData();
    form.append("id_calon_soalan", id_calon_soalan);
    calonEmailCalonSoalan(form,function(){
        if(obj.success){
            swal({
                title: "Hantar Emel Kepada Calon",
                text: "Berjaya! Calon " + obj.data[0].nama + " Telah Dimaklumkan.",
                type: "success",
                showConfirmButton: false,
                allowOutsideClick: false,
                html: false,
                timer: 1000
            }).then(function(){},
                function (dismiss) {
                    $("#status_emel_calon_"+id_calon_soalan).html('Telah Dimaklumkan').addClass('badge bg-success badge-sm');
                }                
            );
        } else {
            swal({
                title: "Kemaskini Emel Dan Hantar Kepada Calon",
                text: "Gagal! " + obj.message,
                type: "info",
                closeOnConfirm: true,
                allowOutsideClick: false,
                html: false
            }).then(function () {
                // window.location.reload();
            }); 
        }
    });    
}

function padamCalon(id_sesi_siri_penilaian){
    let count = 0;
    $('input[name="field_calon_soalan"]:checked').each(function() {
        var form = new FormData();
        form.append("id_calon_soalan", this.value);
        delCalonSoalan(form, function(){
            count++;
            if(count == $('input[name="field_calon_soalan"]:checked').length){
                load_calon_soalan(id_sesi_siri_penilaian);
            }
        });
    });
}

function emelCalonSelected(id_sesi_siri_penilaian){
    let count = 0;
    $('input[name="field_calon_soalan"]:checked').each(function() {
        let id_calon_soalan = this.value;
        var form = new FormData();
        form.append("id_calon_soalan", id_calon_soalan);
        calonEmailCalonSoalan(form,function(){
            if(obj.success){
                $("#status_emel_calon_"+obj.data[0].id_calon_soalan).html('Telah Dimaklumkan').addClass('badge bg-success badge-sm');
            }
            count++;
            if(count == $('input[name="field_calon_soalan"]:checked').length){
                swal({
                    title: "Hantar Emel Kepada Calon",
                    text: "Berjaya! Calon-Calon Telah Dimaklumkan.",
                    type: "success",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    html: false,
                    timer: 1000
                }).then(function(){},
                    function (dismiss) {
                        load_calon_soalan(id_sesi_siri_penilaian);
                    }                
                );
            }
        });
    });
}

function loadDataTetapanMasa(returnValue){

    var settings = {
        "url": host+"tetapan_masa/list",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        // "data": form
    };

      var request = $.ajax(settings);

      request.done(function (response) {
        objTetapan = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
          
    });
}
function resetForm(form) {
    // sessionStorage.removeItem(form);
    document.getElementById(form).reset();
}

$(".set_soalan_per_bahagian").change(function(){

});

function loadTabSesiSoalan(id_sesi_siri_penilaian){
    loadContentSesi(id_sesi_siri_penilaian,function(){
        if(objSesi.success){
            let data = objSesi.data;
            $("#id_sesi_siri_penilaian_per_bahagian").val(id_sesi_siri_penilaian);
            $("#tarikh_mula_per_bahagian").val(data.tarikh_mula);
            $("#tarikh_tamat_per_bahagian").val(data.tarikh_tamat);
            if(data.id_tetapan_masa == 1){
                $("#divSoalanKeseluruhan").removeClass('d-none');
                $("#divSoalanPerBahagian").addClass('d-none');
                $("#divSoalanPerSoalan").addClass('d-none');
                $("#divPerBahagian").removeClass('d-none');
                $("#divJana").removeClass('d-none');
                $("#div_set_soalan_per_bahagian").html('');
                $("#divSubmit").addClass('d-none');
                loadListSetSoalan(data.FK_siri_penilaian,function(){
                    if(objSet.success){
                        let result = objSet.data;
                        $("#checkbox_set_soalan_keseluruhan").html('');
                        $.each(result,function(i,item){
                            $("#checkbox_set_soalan_keseluruhan").append(`
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="set_soalan_keseluruhan`+item.id_set_soalan+`" name="set_soalan_keseluruhan" value="`+item.id_set_soalan+`">
                                    <label class="form-check-label" for="set_soalan_keseluruhan`+item.id_set_soalan+`"> SET `+item.kod_set+`</label>
                                </div>
                            `);
                        });
                        $.each(JSON.parse(data.json_set_soalan), function(f, field){
                            $("#set_soalan_keseluruhan"+field.id_set).attr('checked',true);
                        });
                    }
                });
            } else if (data.id_tetapan_masa == 2){
                $("#divSoalanPerBahagian").removeClass('d-none');
                $("#divSoalanKeseluruhan").addClass('d-none');
                $("#divSoalanPerSoalan").addClass('d-none');
                $("#divPerBahagian").removeClass('d-none');
                $("#divJana").removeClass('d-none');
                $("#div_set_soalan_per_bahagian").html('');
                $("#divSubmit").addClass('d-none');
                loadListSetSoalan(data.FK_siri_penilaian,function(){
                    if(objSet.success){
                        let result = objSet.data;
                        $("#checkbox_set_soalan_per_bahagian").html('');
                        $.each(result,function(i,item){
                            kod_set = item.kod_set.replaceAll(' ', '_');
                            $("#checkbox_set_soalan_per_bahagian").append(`
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input set_soalan_per_bahagian" type="checkbox" id="set_soalan_per_bahagian`+item.id_set_soalan+`" name="set_soalan_per_bahagian" value="`+item.id_set_soalan+`">
                                    <label class="form-check-label" for="set_soalan_per_bahagian`+item.id_set_soalan+`"> SET `+kod_set+`</label>
                                </div>
                            `);
                        });
                        $.each(JSON.parse(data.json_set_soalan), function(f, field){
                            $("#set_soalan_per_bahagian"+field.id_set).attr('checked',true);
                        });
                    }
                });

            } else if (data.id_tetapan_masa == 3){
                $("#divSoalanPerSoalan").removeClass('d-none');
                $("#divSoalanKeseluruhan").addClass('d-none');
                $("#divSoalanPerBahagian").addClass('d-none');
                $("#divPerBahagian").removeClass('d-none');
                $("#divJana").removeClass('d-none');
                $("#div_set_soalan_per_bahagian").html('');
                $("#divSubmit").addClass('d-none');
            }

            // if(data.pautan_status > 0){
            //     $('#pautan').removeClass('hidden');
            //     $('#switch_status').prop('checked',true);
            //     $('#text_pautan').html('Ya').addClass('badge-success').removeClass('badge-danger');
            //     $('#label_switch').addClass('label-success').removeClass('label-danger');
            // }

            // $('#penilaian_'+data.status_penilaian).prop('checked',true);
            // $('#id_sesi_siri_penilaian').val(data.id_sesi_siri_penilaian).removeAttr('disabled');
            // $('#tetapan_masa').val(data.id_tetapan_masa).removeAttr('disabled');
            // $('#sesi_penilaian').val(data.sesi_penilaian).removeAttr('disabled');
            // $('#tarikh_mula').val(data.tarikh_mula).removeAttr('disabled');
            // $('#tarikh_tamat').val(data.tarikh_tamat).removeAttr('disabled');
            // $('#masa_mula').val(data.masa_mula).removeAttr('disabled');
            // $('#masa_tamat').val(data.masa_tamat).removeAttr('disabled');
            // $('#pautan_google').val(data.pautan_google).removeAttr('disabled');
            // $('#pautan_team').val(data.pautan_team).removeAttr('disabled');
            // $('#pautan_skype').val(data.pautan_skype).removeAttr('disabled');
            // $('#pautan_zoom').val(data.pautan_zoom).removeAttr('disabled');
            // $('#bil_calon').val(data.bil_calon).removeAttr('disabled');

            // $('#text_total_sum_value').html(secondsToHms(data.duration));
            // $("#total_sum_value").html(data.duration);
            // // $('#').val(data.);
            // loadTetapanTable(data.id_tetapan_masa);
        }
    });
}

function loadPautan(id_sesi_siri_penilaian){
    var form = new FormData();
    form.append("id_sesi_siri_penilaian", id_sesi_siri_penilaian);
    var settings = {
        "url": host+"sesi_siri_penilaian/viewPautan",
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
        objSesiPautan = JSON.parse(response);
        if(objSesiPautan.success){
            var form = new FormData();
            form.append("id_tetapan", 1);
            var settings = {
                "url": host+"tetapans",
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
                objTetapan = JSON.parse(response);
                if(objTetapan.success){

                    $('#pautanqr').removeClass('d-none');
                    let generated_url = objTetapan.data.link_sistem+'/user/exam/?issp='+objSesiPautan.data.enc_id_sesi_siri_penilaian;

                    $("#pautan_sistem").val(generated_url);
                    var qrcode = new QRious({
                                element: document.getElementById("qrcode"),
                                background: '#ffffff',
                                backgroundAlpha: 1,
                                foreground: '#5868bf',
                                foregroundAlpha: 1,
                                level: 'H',
                                padding: 0,
                                size: 100,
                                value: generated_url
                            });    

                }
            });
        }
    });

    request.fail(function (response) {
        
    });

}

function runUrl(){
    // let url_qrcode = url + 'admin/attendance.html?tmt=' + fk_tmtDet + '&id=' + pk_id + '&code_received=' + window.sessionStorage.token + '&year=' + window.sessionStorage.yearTmt;
    let url_qrcode = $("#pautan_sistem").val();

    var qrcode = new QRious({
        element: document.getElementById("big_qrcode"),
        background: '#ffffff',
        backgroundAlpha: 1,
        foreground: '#5868bf',
        foregroundAlpha: 1,
        level: 'H',
        padding: 0,
        size: 256,
        value: url_qrcode
    });    
    $("#modal_qr").modal('show');
}

function copyToClipboard() {
    let url = $("#pautan_sistem").val();
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(url).select();
    document.execCommand("copy");
    $temp.remove();
    $("#icon_copy").removeClass('fa-copy').addClass('fa-check');
  }

function loadTabCalonSoalan(id_sesi_siri_penilaian){
    load_calon_soalan(id_sesi_siri_penilaian);
    loadSesiPenilaian(window.sessionStorage.id_siri_penilaian,function(){
        if(objSesi.success){
            result = objSesi.data;
            $("#sesi_muat_naik").html('<option value="">Sila Pilih Sesi</option>');
            $("#sesi_individu").html('<option value="">Sila Pilih Sesi</option>');
            $.each(result,function(i,item){
                let selected = '';
                if(item.id_sesi_siri_penilaian == id_sesi_siri_penilaian){
                    selected = 'selected';
                }
                $("#sesi_muat_naik").append('<option '+selected+' value="'+item.id_sesi_siri_penilaian+'">'+item.sesi_penilaian+'</option>');
                $("#sesi_individu").append('<option '+selected+' value="'+item.id_sesi_siri_penilaian+'">'+item.sesi_penilaian+'</option>');
            });
        }
    });
}

function loadTabSesi(id_sesi_siri_penilaian){
    if(id_sesi_siri_penilaian != 0){
        $(".process_simpan").html('Kemaskini');
        $(".process_padam").html("Padam").addClass('btn btn-danger').attr("onclick","padamSesi("+id_sesi_siri_penilaian+")");
    } else {
        $(".process_simpan").html('Simpan');
        $(".process_padam").html('').removeClass('btn btn-danger');
    }

    $('#pautanqr').addClass('d-none');

    document.getElementById('process').reset();
    $('#sesi_penilaian').prop('disabled','disabled');
    $('#tarikh_mula').prop('disabled','disabled');
    $('#tarikh_tamat').prop('disabled','disabled');
    $('#masa_mula').prop('disabled','disabled');
    $('#masa_tamat').prop('disabled','disabled');
    $('#pautan_google').prop('disabled','disabled');
    $('#pautan_zoom').prop('disabled','disabled');
    $('#pautan_team').prop('disabled','disabled');
    $('#pautan_skype').prop('disabled','disabled');
    $('#bil_calon').prop('disabled','disabled');
    $('#text_pautan').html('Tidak');
    $('#status_pautan').val(0);

    $('#pautan').addClass('hidden');
    $('#per_bahagian').addClass('hidden');
    $('#per_soalan').addClass('hidden');

    $('.txtCal').val('');
    $('#total_sum_value').html('');
    $('#text_total_sum_value').html('');
 
    if(id_sesi_siri_penilaian > 0){
        loadContentSesi(id_sesi_siri_penilaian,function(){

            if(objSesi.success){
                let data = objSesi.data;

                if(data.pautan_status > 0){
                    $('#pautan').removeClass('hidden');
                    $('#switch_status').prop('checked',true);
                    $('#text_pautan').html('Ya').addClass('badge-success').removeClass('badge-danger');
                    $('#label_switch').addClass('label-success').removeClass('label-danger');
                }
    
                $('#penilaian_'+data.status_penilaian).prop('checked',true);
                $('#id_sesi_siri_penilaian').val(data.id_sesi_siri_penilaian).removeAttr('disabled');
                $('#tetapan_masa').val(data.id_tetapan_masa).removeAttr('disabled');
                $('#sesi_penilaian').val(data.sesi_penilaian).removeAttr('disabled');
                $('#tarikh_mula').val(data.tarikh_mula).removeAttr('disabled');
                $('#tarikh_tamat').val(data.tarikh_tamat).removeAttr('disabled');
                $('#masa_mula').val(data.masa_mula).removeAttr('disabled');
                $('#masa_tamat').val(data.masa_tamat).removeAttr('disabled');
                $('#pautan_google').val(data.pautan_google).removeAttr('disabled');
                $('#pautan_team').val(data.pautan_team).removeAttr('disabled');
                $('#pautan_skype').val(data.pautan_skype).removeAttr('disabled');
                $('#pautan_zoom').val(data.pautan_zoom).removeAttr('disabled');
                $('#bil_calon').val(data.bil_calon).removeAttr('disabled');

                $('#text_total_sum_value').html(secondsToHms(data.duration));
                $("#total_sum_value").html(data.duration);
                // $('#').val(data.);
                loadTetapanTable(data.id_tetapan_masa);
                if(data.status_penilaian == 2){
                    loadPautan(id_sesi_siri_penilaian);
                } else {
                    $("#pautan_sistem").html('');
                }
            }
        });
    }else{

    }

}

function padamSesi(id_sesi_siri_penilaian){
    swal({
        title: "Hapus Sesi",
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
        form.append("id_sesi_siri_penilaian", id_sesi_siri_penilaian);
    
        var settings = {
            "url": host+"sesi_siri_penilaian/delete",
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
            if(result.success){
                var form = new FormData();
                form.append("FK_sesi", id_sesi_siri_penilaian);
            
                var settings = {
                    "url": host+"calon_soalan/deleteBySesi",
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
                    swal({
                        title: "Hapus Sesi & Calon Sesi",
                        text: "Berjaya!",
                        type: "success",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        window.location.reload();
                    });            
                });
            
                request.fail(function (response) {
                    swal({
                        title: "Hapus Sesi",
                        text: "Berjaya!",
                        type: "success",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        window.location.reload();
                    });                  
                });            
            }
        });
    
        request.fail(function (response) {
            
        });
    });
}

function loadContentSesi(id_sesi_siri_penilaian,returnValue){

    var form = new FormData();
    form.append("id_sesi_siri_penilaian", id_sesi_siri_penilaian);

    var settings = {
        "url": host+"sesi_siri_penilaian/view",
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
        objSesi = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
          
      });

}

function loadDataPenilaian(id_siri_penilaian,returnValue){

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
        objPenilaian = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
          
      });

}

function loadSesiPenilaian(id_siri_penilaian,returnValue){

    var settings = {
        "url": host+"sesi_siri_penilaian/list/"+id_siri_penilaian,
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        // "data": form
      };

      var request = $.ajax(settings);

      request.done(function (response) {
        objSesi = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
          
      });

}

$('#tetapan_masa').on('change', function() {
    
    let id_tetapan_masa = parseInt($('#tetapan_masa').val());

    loadTetapanTable(id_tetapan_masa);

    setInputDisabled(id_tetapan_masa);

    // setTetapanTable(id_tetapan_masa);
    
});

function setTetapanTable(id_tetapan_masa){

    let list = [];
    let id_siri_penilaian = sessionStorage.id_siri_penilaian;

    if(id_tetapan_masa == 3){

        loadBankSoalan(id_siri_penilaian,function(){ // cek balik

            if(objSoalan.success){

                let data = objSoalan.data;
                // let bil = 1;

                // $.each(data,function(i,item){

                //     // let text = `<p style="overflow-wrap: break-word;">`+item.soalan+`</p>`;
                //     list.push({
                //         bil : bil,
                //         PK_siri_soalan : item.PK_siri_soalan,
                //         soalan : item.soalan,
                //         jenis_soalan : item.jenis_soalan,
                //         topik : item.topik,
                //         tahap : item.tahap,
                //         min_menjawab : `<input type="text" pattern="[0-9]+" class="form-control bg-light txtCal" id="minit_`+i+`" value="`+item.saat_menjawab+`" placeholder="Saat: 30" onkeyup="countTiming(`+i+`)"><input type="text" class="form-control bg-light hidden" value="`+item.PK_siri_soalan+`" id="PK_siri_soalan_`+i+`">`
                //     });

                //     bil++;

                // });

                // if (list.length > 0){

                //     let columns = [
                //         { "name": "bil", "title": "Bil" }, 
                //         { "name": "soalan", "title": "soalan" },
                //         { "name": "jenis_soalan", "title": "Jenis Soalan" },
                //         { "name": "topik", "title": "Topik" },
                //         { "name": "tahap", "title": "Tahap" },
                //         { "name": "min_menjawab", "title": "Minit Menjawab (Saat)" },
                //     ];
                //     $("#table_soalan").footable({
                //         "columns": columns,
                //         "rows": list,
                //         "paging": {
                //             "enabled": true,
                //             "size": 10
                //         },
                //         "filtering": {
                //             "enabled": false
                //         }
                //     });

                //     $('#data_soalan').val(JSON.stringify(list));
                // }
            }

        })

    }
}

$("#table_soalan").on('input', '.txtCal', function () {
    var calculated_total_sum = 0;
    var index = $('#index').val();
    var new_val = parseFloat($('#minit_'+index).val());
    var diff_masa = parseFloat($('#diff_masa').val())
    var extra = 0;
    var total = '';
  
    $("#table_soalan .txtCal").each(function () {
        var get_textbox_value = $(this).val();
        if ($.isNumeric(get_textbox_value)) {
            if((calculated_total_sum += parseFloat(get_textbox_value)) <= diff_masa){
                calculated_total_sum = calculated_total_sum;
            }else{

                extra = calculated_total_sum - diff_masa;
                let runn_val = diff_masa - new_val;
                calculated_total_sum = runn_val;
                $('#minit_'+index).val(0);

                swal({
                    title: "Masa telah melebihi "+extra+" saat berbanding jumlah maksima masa penilaian yang telah ditetapkan",
                    type: "error",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    html: false,
                    timer: 2000
                }).then(function(){
                    
                },
                    function (dismiss) {
                        
                    }
                    
                );

                
            }
           
        }                  
    });
    
    total = calculated_total_sum + extra;
    $('#text_total_sum_value').html(secondsToHms(total));
    $("#total_sum_value").html(total);

});

function countTiming(index){

    $('#index').val(index);

}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " jam, " : " jam, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minit, " : " minit, ") : "";
    // var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minit, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " saat" : " saat") : "";
    return hDisplay + mDisplay + sDisplay; 
    // return hDisplay + mDisplay ; 
}

function reset_per_bahagian(){    
    $("#divPerBahagian").removeClass('d-none');
    $("#divJana").removeClass('d-none');
    $("#div_set_soalan_per_bahagian").html('');
    $("#divSubmit").addClass('d-none');
}

function getDataPerBahagian(id, value){
    let id_set_soalan = id.split("-")[1];
    let kod_set = id.split("-")[2];

    let seconds ='00'; let dif = ''; let id_siri_penilaian = sessionStorage.id_siri_penilaian;
    let date_mula = ''; let date_tamat = '';

    let tarikh_mula     = $('#tarikh_mula_per_bahagian').val();
    let masa_mula       = $('#masa_mula-'+id_set_soalan+'-'+kod_set).val();
    if(masa_mula != ''){
        // masa_mula       = formatTimeOnly(masa_mula);
        masa_mula       = masa_mula;
    }
    
    if(tarikh_mula != '' && masa_mula != ''){

        let [year_mula, month_mula, day_mula] = tarikh_mula.split('-');
        let [hours_mula, minutes_mula]        = masa_mula.split(':');
        date_mula                         = new Date(+year_mula, +month_mula - 1, +day_mula, +hours_mula, +minutes_mula, +seconds);

    }
    
    
    let tarikh_tamat    = $('#tarikh_tamat_per_bahagian').val();
    let masa_tamat       = $('#masa_tamat-'+id_set_soalan+'-'+kod_set).val();
    if(masa_tamat != ''){
        masa_tamat       = masa_tamat;
    }

    if(tarikh_tamat != '' && masa_tamat != ''){

        let [year_tamat, month_tamat, day_tamat]  = tarikh_tamat.split('-');
        let [hours_tamat, minutes_tamat]          = masa_tamat.split(':');
        date_tamat                            = new Date(+year_tamat, +month_tamat - 1, +day_tamat, +hours_tamat, +minutes_tamat, +seconds);

    }
    

    if(date_mula != '' && date_tamat != ''){

        dif = Math.abs(date_mula - date_tamat) / 1000;
        $('#duration-'+id_set_soalan+'-'+kod_set).val(dif);
        // $('#text_total_sum_value').html(secondsToHms(dif));
        // $('#total_sum_value').html(dif);
    
    }


    // loadBankSoalan(id_siri_penilaian,function(){

    //     if(objSoalan.success){

    //         let data = objSoalan.data; let total_data = data.length;
    //         let sec = dif/total_data;

    //         $.each(data,function(i,item){
    //             $('#minit_'+i).val(sec);
    //         });

    //     }

    // });
}

function getData(){

    let seconds ='00'; let dif = ''; let id_siri_penilaian = sessionStorage.id_siri_penilaian;
    let date_mula = ''; let date_tamat = '';

    let tarikh_mula     = $('#tarikh_mula').val();
    let masa_mula       = formatTimeOnly($('#masa_mula').val());

    // console.log(masa_mula);
    if(tarikh_mula != '' && masa_mula != ''){

        let [year_mula, month_mula, day_mula] = tarikh_mula.split('-');
        let [hours_mula, minutes_mula]        = masa_mula.split(':');
        date_mula                         = new Date(+year_mula, +month_mula - 1, +day_mula, +hours_mula, +minutes_mula, +seconds);

    }
    
    
    let tarikh_tamat    = $('#tarikh_tamat').val();
    let masa_tamat      = formatTimeOnly($('#masa_tamat').val());

    if(tarikh_tamat != '' && masa_tamat != ''){

        let [year_tamat, month_tamat, day_tamat]  = tarikh_tamat.split('-');
        let [hours_tamat, minutes_tamat]          = masa_tamat.split(':');
        date_tamat                            = new Date(+year_tamat, +month_tamat - 1, +day_tamat, +hours_tamat, +minutes_tamat, +seconds);

    }
    

    if(date_mula != '' && date_tamat != ''){

        dif = Math.abs(date_mula - date_tamat) / 1000;

        $('#diff_masa').val(dif);
        $('#text_total_sum_value').html(secondsToHms(dif));
        $('#total_sum_value').html(dif);
    
    }


    loadBankSoalan(id_siri_penilaian,function(){

        if(objSoalan.success){

            let data = objSoalan.data; let total_data = data.length;
            let sec = dif/total_data;

            $.each(data,function(i,item){
                $('#minit_'+i).val(sec);
            });

        }

    });
}

function set_tarikh_tamat(){
    $("#tarikh_tamat").val($("#tarikh_mula").val());
    getData();
}

function set_masa_tamat(){
    $("#masa_tamat").val($("#masa_mula").val());
    getData();
}

function loadBankSoalan(id_siri_penilaian,returnValue){
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
        objSoalan = response;

        returnValue();
      }); 
      
      request.fail(function (response) {
        objSoalan = response;

        returnValue();
      });    
}

function setInputDisabled(id_tetapan_masa){

    if(!isNaN(id_tetapan_masa)){
        $('#sesi_penilaian').removeAttr('disabled');
        $('#tarikh_mula').removeAttr('disabled');
        $('#tarikh_tamat').removeAttr('disabled');
        $('#masa_mula').removeAttr('disabled');
        $('#masa_tamat').removeAttr('disabled');
        $('#pautan_zoom').removeAttr('disabled');    
        $('#pautan_skype').removeAttr('disabled');    
        $('#pautan_google').removeAttr('disabled');    
        $('#pautan_team').removeAttr('disabled');    
        $('#bil_calon').removeAttr('disabled');    
        $('#status_penilaian').removeAttr('disabled');   
        
    }else{
        $('#sesi_penilaian').prop('disabled','disabled');
        $('#tarikh_mula').prop('disabled','disabled');
        $('#tarikh_tamat').prop('disabled','disabled');
        $('#masa_mula').prop('disabled','disabled');
        $('#masa_tamat').prop('disabled','disabled');
        $('#pautan_zoom').prop('disabled','disabled');
        $('#pautan_google').prop('disabled','disabled');
        $('#pautan_skype').prop('disabled','disabled');
        $('#pautan_team').prop('disabled','disabled');
        $('#bil_calon').prop('disabled','disabled');
        $('#status_penilaian').prop('disabled','disabled');
        $('#label_switch').addClass('label-danger').removeClass('label-success') ;
        $('#text_pautan').addClass('badge-danger').removeClass('badge-success') ;
    }

}

function loadTetapanTable(id_tetapan_masa){

    setTetapanTable(id_tetapan_masa);
    
    switch(id_tetapan_masa){
        case 2: 
            $('#tab_bahagian').removeClass('hidden');
            $('#per_bahagian').removeClass('hidden');
            $('#tab_soalan').addClass('hidden');
            $('#per_soalan').addClass('hidden');
            break;
        
        case 3: 
            $('#tab_bahagian').addClass('hidden');
            $('#per_bahagian').addClass('hidden');
            $('#tab_soalan').removeClass('hidden');
            $('#per_soalan').removeClass('hidden');
            break;

        default :
            $('#tab_bahagian').addClass('hidden');
            $('#per_bahagian').addClass('hidden');
            $('#tab_soalan').addClass('hidden');
            $('#per_soalan').addClass('hidden');
            break;
    }
}


function createTinymce(idName,input){

    tinymce.init({
        selector: 'textarea#'+idName,
        menubar: false,
        height: 250,
        submit_patch : false,
        add_form_submit_trigger : false,
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat ',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        plugins: [
            'image','media','table','lists',
         ],
        images_upload_url: host+'fileUpload',
        images_upload_credentials: true,
    });

    $('#'+idName).val(input);
    // tinymce.get(idName).setContent(input);

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

function loadDataCalon(token,returnValue){

    var settings = {
        "url": host+"data/list",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": window.localStorage.token
        },
      };

      var request = $.ajax(settings);

      request.done(function (response) {
        objDataCalon = response;

        returnValue();
      });

      request.fail(function (response) {
          swal({
              title: "Tiada Data Yang Berdaftar",
              type: "error",
              showConfirmButton: false,
              allowOutsideClick: false,
              html: false,
              timer: 2000
          }).then(function(){},
              function (dismiss) {
              }
          );
      });

}

var confirmed = false;

$("#form_soalan_keseluruhan").on('submit',function(e){
    let $this = $(this);
    if(!confirmed){
        e.preventDefault();
        let json_list_keseluruhan = [];
        let id_sesi_siri_penilaian = $("#id_sesi_siri_penilaian_per_bahagian").val();
        let count = 0;
        var checkbox = $("input[name='set_soalan_keseluruhan']:checked").map(function(){
            return $(this).val();
        }).get();
        $.each(checkbox, function(i, item){
            var form = new FormData();
            form.append("id_set_soalan", item);
            show_setSoalan(form, window.localStorage.token, function(){
                json_list_keseluruhan.push({
                    id_set: obj_setSoalan.data.id_set_soalan,
                    json_list: obj_setSoalan.data.json_list
                });
                count++;
                if(count == checkbox.length){
                    var form = new FormData();
                    form.append("id_sesi_siri_penilaian", id_sesi_siri_penilaian);
                    form.append("json_set_soalan", JSON.stringify(json_list_keseluruhan));
                    form.append("updated_by", id_users_master);
                    updateSenaraiSetSesiPenilaian(form, function(){
                        if(obj.success){
                            swal({
                                title: "Kemaskini Set Soalan",
                                type: "success",
                                text: "Berjaya!",
                                showConfirmButton: false,
                                allowOutsideClick: false,
                                html: false,
                                timer: 2000
                            }).then(function(){},
                                function (dismiss) {
                                    window.location.reload();
                                }
                            );
                        } else {
                            swal({
                                title: "Kemaskini Set Soalan",
                                type: "info",
                                text: "Gagal!",
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
                    });
                }
            });
        });
    }
});

$("#form_soalan_per_bahagian").on('submit',function(e){
    let $this = $(this);
    if(!confirmed){
        e.preventDefault();
        let json_list_per_bahagian = [];
        let count = 0;
        var checkbox = $("input[name='set_soalan_per_bahagian']:checked").map(function(){
            return $(this).val();
        }).get();
        if($("#div_set_soalan_per_bahagian").html() === ''){
            $("#div_set_soalan_per_bahagian").html('');
            $.each(checkbox, function(i, item){
                var form = new FormData();
                form.append('id_set_soalan',item);
                loadDataSetSoalan(form,function(){
                    if(objSoalan.success){
                        json_list_per_bahagian.push({
                            id_set: objSoalan.data.id_set_soalan,
                            kod_set: objSoalan.data.kod_set,
                            json_list: objSoalan.data.json_list
                        });
                        $("#divPerBahagian").addClass('d-none');
                        $("#divJana").addClass('d-none');
                        $("#divSubmit").removeClass('d-none');
                    }
                    count++;
                    if(count == checkbox.length){
                        $.each(json_list_per_bahagian,function(g,gen){
                            $('#div_set_soalan_per_bahagian').append(`
                                <h5>SET `+gen.kod_set+`</h5>
                                <table width="100%" class="table table-bordered" id="table_`+gen.id_set+`">
                                    <tr>
                                        <th>Bahagian</th>
                                        <th>Masa Mula</th>
                                        <th>Masa Tamat</th>
                                    </tr>
                                </table><br>
                            `);
                        });
                        $.each(json_list_per_bahagian,function(i,gen2){
                            $.each(JSON.parse(gen2.json_list),function(f,field){
                                $('#table_'+gen2.id_set).append(`
                                    <tr>
                                        <td width="30%">`+field.bahagian+`<input id="duration-`+gen2.id_set+`-`+field.bahagian.replaceAll(' ', '_')+`" class="d-none" type="text"></td>
                                        <td width="35%"><div class="demo-masked-input"><input type="text" onchange="getDataPerBahagian(this.id, this.value);" class="form-control time24" id="masa_mula-`+gen2.id_set+`-`+field.bahagian.replaceAll(' ', '_')+`" placeholder="Ex: 11:59"></div></td>
                                        <td width="35%"><div class="demo-masked-input"><input type="text" onchange="getDataPerBahagian(this.id, this.value);" class="form-control time24" id="masa_tamat-`+gen2.id_set+`-`+field.bahagian.replaceAll(' ', '_')+`" placeholder="Ex: 11:59"></div></td>
                                    </tr>
                                `);
                            });
                        });    
                        //Masked Input ============================================================================================================================
                        var $demoMaskedInput = $('.demo-masked-input');
                    
                        //Time
                        $demoMaskedInput.find('.time24').inputmask('hh:mm', { placeholder: '__:__', alias: 'time24', hourFormat: '24' });
                        //===========================================================================================================================================                    
                    }
                });
            });
        } else {
            $.each(checkbox, function(i, item){
                let id_sesi_siri_penilaian = $("#id_sesi_siri_penilaian_per_bahagian").val();
                var form = new FormData();
                form.append('id_set_soalan',item);
                loadDataSetSoalan(form,function(){
                    if(objSoalan.success){
                        json_list_per_bahagian.push({
                            id_set: objSoalan.data.id_set_soalan,
                            json_list: objSoalan.data.json_list
                        });  
                    }
                    count++;
                    if(count == checkbox.length){
                        let count = 0;
                        $.each(json_list_per_bahagian,function(g,gen){
                            let json_list_final = JSON.parse(gen.json_list);
                            $.each(json_list_final,function(f,field){                      
                                let masa_mula = $("#masa_mula-"+gen.id_set+"-"+field.bahagian).val();
                                let masa_tamat = $("#masa_tamat-"+gen.id_set+"-"+field.bahagian).val();
                                // masa_mula = formatTimeOnly($("#masa_mula-"+gen.id_set+"-"+field.bahagian.replaceAll(' ', '_')).val());
                                masa_mula = $("#masa_mula-"+gen.id_set+"-"+field.bahagian.replaceAll(' ', '_')).val();
                                // masa_tamat = formatTimeOnly($("#masa_tamat-"+gen.id_set+"-"+field.bahagian.replaceAll(' ', '_')).val());
                                masa_tamat = $("#masa_tamat-"+gen.id_set+"-"+field.bahagian.replaceAll(' ', '_')).val();
                                let duration = $("#duration-"+gen.id_set+"-"+field.bahagian.replaceAll(' ', '_')).val();
                                json_list_final[f].masa_mula = masa_mula;
                                json_list_final[f].masa_tamat = masa_tamat;
                                json_list_final[f].duration = duration;
                            });
                            json_list_per_bahagian[g].json_list = json_list_final;
                            count++;
                            if(count == json_list_per_bahagian.length){
                                let json_set_soalan = JSON.stringify(json_list_per_bahagian);
                                var form = new FormData();
                                form.append("id_sesi_siri_penilaian", id_sesi_siri_penilaian);
                                form.append("json_set_soalan", json_set_soalan);
                                form.append("updated_by", id_users_master);
                                updateSenaraiSetSesiPenilaian(form, function(){
                                    if(obj.success){
                                        swal({
                                            title: "Kemaskini Set Soalan",
                                            type: "success",
                                            text: "Berjaya!",
                                            showConfirmButton: false,
                                            allowOutsideClick: false,
                                            html: false,
                                            timer: 1000
                                        }).then(function(){},
                                            function (dismiss) {
                                            }
                                        );
                                    } else {
                                        swal({
                                            title: "Kemaskini Set Soalan",
                                            type: "info",
                                            text: "Gagal!",
                                            showConfirmButton: false,
                                            allowOutsideClick: false,
                                            html: false,
                                            timer: 1000
                                        }).then(function(){},
                                            function (dismiss) {
                                            }
                                        );
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }
    }
});

$('#simpan_kumpulan').on('submit', function(e){
    // let token = localStorage.token;
    let $this = $(this);
    let flag = 2;//flag_upload

    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Muat Naik Calon",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {            
            let id_sesi_siri_penilaian = $("#sesi_muat_naik").val();
            let id_siri_penilaian = sessionStorage.id_siri_penilaian;
            let list = JSON.parse($('#listCalonTemp').val());
            let length_data = list.length - 1;
            var formNoAngkaGiliran = new FormData();
            formNoAngkaGiliran.append('FK_siri_penilaian', id_siri_penilaian);
            let no_angka_giliran = "";
            showCalonSoalanBySiriPenilaian(formNoAngkaGiliran,function(){
                if(no_angka_giliran == ""){
                    if(obj.success){
                        let result = obj.data;
                        no_angka_giliran = parseInt(result.no_angka_giliran);
                    } else {
                        no_angka_giliran = parseInt("10000");
                    }
                }

                $.each(list,function(i,item){
                    var form = new FormData();
                    form.append('FK_siri_penilaian', id_siri_penilaian);
                    form.append('FK_sesi', id_sesi_siri_penilaian);
                    form.append('nama', item.NAMA);
                    form.append('no_kad_pengenalan', item.NO_KAD_PENGENALAN);
                    form.append('gred', item.GRED);
                    form.append('jawatan', item.JAWATAN);
                    form.append('emel', item.EMEL);
                    form.append('notel', item.NOTEL);
                    form.append("created_by", id_users_master);
    
                    loadContentSesi(id_sesi_siri_penilaian, function(){
                        let data = objSesi.data;
                        let json_set_soalan = JSON.parse(data.json_set_soalan);
                        let random = Math.floor(Math.random() * json_set_soalan.length);
                        let json_list = json_set_soalan[random].json_list;
                        if(data.id_tetapan_masa == 1) {
                            form.append('json_list',json_list);
                        } else if(data.id_tetapan_masa == 2) {
                            form.append('json_list',JSON.stringify(json_list));
                        }
                        form.append("no_angka_giliran", ++no_angka_giliran);
                        simpanCalon(form,function(){    
                            if(objCalon.success){    
                                $('#loading_modal').modal('show');
                                // setTimeout(function(){ },5000);    
                                if(length_data == i){
                                    swal({
                                        title: "Muat Naik",
                                        text: "Berjaya!",
                                        type: "success",
                                        closeOnConfirm: true,
                                        allowOutsideClick: false,
                                        html: false
                                    }).then(function () {
                                        resetForm();
                                        $('#senaraiCalonTemp').html('');
                                        $('#listCalonTemp').val('');
                                        $('#text_file_calon').val('');
                                        $("#uploadCalon").modal('hide');
                                        $('#btn-upload').removeAttr('disabled').removeClass('btn-secondary').addClass('btn-primary');
                                        load_calon_soalan(id_sesi_siri_penilaian);
                                    });
                                }
                            }else{
                                swal({
                                    title: "Muat Naik Calon",
                                    text: "Gagal!",
                                    type: "error",
                                    closeOnConfirm: true,
                                    allowOutsideClick: false,
                                    html: false
                                }).then(function () {
                                    document.getElementById('simpan_kumpulan').reset();
                                    close_modal(flag);
                                    // $('#uploadCalon').modal('hide');
                                    // $("#modaldaftarsiripenilaian").modal('hide');
                                });    
                            }                
                        });
                    });
                });
            });
        });
    }    
});

function getSoalanSet(id_siri_penilaian,returnValue){
    // console.log(id_siri_penilaian);
    var settings = {
        "url": host+"setsoalan/list/"+id_siri_penilaian,
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": "PENILAIAN "+window.localStorage.token
        }
    };

    let request = $.ajax(settings);
    request.done(function (response) {
        obj_setSoalan = response;
        // obj_setSoalan = JSON.parse(response);

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"daftar bank soalan Error","data":""};
        obj_setSoalan = response;

        returnValue();
    }); 
}

function reset_modal(flag){

    if(flag == 2){
        $('#senaraiCalonTemp').html('');
        $('#btn-upload').removeAttr('disabled').removeClass('btn-secondary').addClass('btn-primary');
        document.getElementById('simpan_kumpulan').reset();
    }else{
        $('#message_load_0').addClass('hidden');
        $('#message_load_1').addClass('hidden');
        $('#message_load_2').addClass('hidden');
        $('#message_load_3').addClass('hidden');
        $('#data_load_1').addClass('hidden');
        $('#data_load_2').addClass('hidden');
        $('#data_load_3').addClass('hidden');

        $("#nama_text_add").html('');
        $("#noic_text_add").html('');
        $("#notel_text_add").html('');
        $("#emel_text_add").html('');
        $("#jawatan_text_add").html('');
        $("#gred_text_add").html('');

        $("#nama_add").val('');
        $("#noic_add").val('');
        $("#notel_add").val('');
        $("#emel_add").val('');
        $("#jawatan_add").val('');
        $("#gred_add").val('');

        $('#no_kad_pengenalan').val('').prop('disabled',false).focus();
        $('#btn_semak').prop('disabled',false);
    }

}

function close_modal(flag){

    if(flag == 2){
        reset_modal(flag);
        $('#uploadCalon').modal('hide');
    }else{
        reset_modal(flag);
        $('#addCalon').modal('hide');
    }

}

function simpanCalon(form,returnValue){
    var settings = {
        "url": host+"calon_soalan/register",
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
        objCalon = JSON.parse(response);
        returnValue();
    });

    request.fail(function (response) {
        objCalon = response;
        returnValue();        
    });

}

$( "#btn_form" ).on( "click", function() {

    $("#no_kad_pengenalan").prop('disabled', true);
    $("#btn_semak").prop('disabled', true);

    $('#message_load_3').addClass('hidden');
    $('#data_load_1').removeClass('hidden');
    $('#data_load_2').removeClass('hidden');
    $('#data_load_3').removeClass('hidden');

    $('#nama_text_add').addClass('hidden');
    $('#noic_text_add').addClass('hidden');
    $('#nama_add').removeClass('hidden');
    $('#noic_add').removeClass('hidden');

    $("#btn_modal_footer").append(`    
        <button class="btn btn-primary btn-anim" type="submit" >Simpan</button>
        <button type="button" onclick="reset_modal(1)" class="btn btn-secondary btn-simple" >Semula</button>
        <button type="button" onclick="close_modal(1)" class="btn btn-danger" >Tutup</button>
    `);

    $("#nama_add").focus();

});

$("#no_kad_pengenalan").on("change", function() {

    let token = localStorage.token;
    let noic = $('#no_kad_pengenalan').val();

    let list_calon = JSON.parse($('#list_calon').val());
    // console.log(list_calon);
    let size_list_calon = list_calon.length-1;
    let flag = 0;

    $('#message_load_0').removeClass('hidden');
    $('#message_load_1').removeClass('hidden');
    $('#message_load_2').addClass('hidden');
    $('#message_load_3').addClass('hidden');
    $('#data_load_1').addClass('hidden');
    $('#data_load_2').addClass('hidden');
    $('#data_load_3').addClass('hidden');
    $("#no_kad_pengenalan").prop('disabled', true);
    $("#btn_semak").prop('disabled', true);

    if(list_calon.length > 0){
        $.each(list_calon,function(i,item){
            if(item.no_kad_pengenalan == noic){
                flag = 1;                
            }
            if(i == size_list_calon){
                
                if(flag == 1){
                    swal({
                        title: "Semak Maklumat Calon",
                        text: "Calon Telah Berdaftar.",
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        $("#no_kad_pengenalan").prop('disabled', false);
                        $("#no_kad_pengenalan").val('');
                        $("#no_kad_pengenalan").focus();
                        $("#btn_semak").prop('disabled', false);

                        $('#message_load_1').addClass('hidden');
                        $('#message_load_2').removeClass('hidden');
                        $('#message_load_3').addClass('hidden');
                        $('#data_load_1').addClass('hidden');
                        $('#data_load_2').addClass('hidden');
                        $('#data_load_3').addClass('hidden');
                        // $("#icon_semak_ic").removeClass('fas fa-cog fa-spin').addClass('fas fa-search');
    
                    });
                }else{

                    check_users(noic, function () {
                        if (dataUsers.success) {
                            $("#no_kad_pengenalan").prop('disabled', false);
                            $("#noic_add").val($("#no_kad_pengenalan").val());
                            $("#no_kad_pengenalan").val('');
                            
                            $('#message_load_1').addClass('hidden');
                            $('#message_load_2').addClass('hidden');
                            $('#message_load_3').addClass('hidden');
                            $('#data_load_1').removeClass('hidden');
                            $('#data_load_2').removeClass('hidden');
                            $('#data_load_3').removeClass('hidden');

                            $("#nama_text_add").html(dataUsers.data.nama);
                            $("#noic_text_add").html(dataUsers.data.no_kad_pengenalan);
                            $("#notel_text_add").html(dataUsers.data.notel);
                            $("#emel_text_add").html(dataUsers.data.emel_kerajaan);
                            $("#jawatan_text_add").html(dataUsers.data.nama_jawatan);
                            $("#gred_text_add").html(dataUsers.data.skim);
                
                            $("#nama_add").val(dataUsers.data.nama);
                            $("#noic_add").val(dataUsers.data.no_kad_pengenalan);
                            $("#notel_add").val(dataUsers.data.notel);
                            $("#emel_add").val(dataUsers.data.emel_kerajaan);
                            $("#jawatan_add").val(dataUsers.data.nama_jawatan);
                            $("#gred_add").val(dataUsers.data.skim);
                
                            // $("#noic_check").val('');
                            // $("#noic_check").prop('disabled', false);
                            // $("#btn_semak").prop('disabled', false);
                            // $("#icon_semak").removeClass('fas fa-cog fa-spin').addClass('fas fa-search');
                
                        } else {
                            check_hrmis(noic, function () {
                                if (obj_hrmis == "2") {
                                    swal({
                                        title: "Semak Maklumat Calon",
                                        text: "Rekod Tidak Dijumpai.",
                                        type: "error",
                                        closeOnConfirm: true,
                                        allowOutsideClick: false,
                                        html: false
                                    }).then(function () {
                                        $("#no_kad_pengenalan").prop('disabled', false);
                                        $("#noic_add").val($("#no_kad_pengenalan").val());
                                        $("#no_kad_pengenalan").val('');
                
                                        $("#nama_add").val('');
                                        $("#notel_add").val('');
                                        $("#emel_add").val('');
                                        $("#jawatan_add").val('');
                                        $("#gred_add").val('');

                                        $('#message_load_1').addClass('hidden');
                                        $('#message_load_2').addClass('hidden');
                                        $('#message_load_3').addClass('hidden');
                                        $("#btn_semak").prop('disabled', true);

                                        $('#data_load_1').removeClass('hidden');
                                        $('#data_load_2').removeClass('hidden');
                                        $('#data_load_3').removeClass('hidden');

                                        $('#nama_text_add').addClass('hidden');
                                        $('#noic_text_add').addClass('hidden');
                                        $('#nama_add').removeClass('hidden');
                                        $('#noic_add').removeClass('hidden');

                                        $("#btn_modal_footer").html(`    
                                            <button class="btn btn-primary btn-anim" type="submit" >Simpan</button>
                                            <button type="button" onclick="reset_modal(1)" class="btn btn-secondary btn-simple" >Semula</button>
                                            <button type="button" onclick="close_modal(1)" class="btn btn-danger" >Tutup</button>
                                        `);

                                        $("#nama_add").focus();

                                        // $("#icon_semak_ic").removeClass('fas fa-cog fa-spin').addClass('fas fa-search');
                                    });
                                }else {
                                    $("#noic_add").val($("#no_kad_pengenalan").val());
                                    $("#no_kad_pengenalan").val('');
                                    
                                    $('#message_load_1').addClass('hidden');
                                    $('#message_load_2').addClass('hidden');
                                    $('#message_load_3').addClass('hidden');
                                    $('#data_load_1').removeClass('hidden');
                                    $('#data_load_2').removeClass('hidden');
                                    $('#data_load_3').removeClass('hidden');

                                    $("#nama_text_add").html(obj_hrmis.peribadi.nama);
                                    $("#noic_text_add").html(obj_hrmis.peribadi.icno);
                                    $("#notel_text_add").html(obj_hrmis.peribadi.COHPhoneNo);
                                    $("#emel_text_add").html(obj_hrmis.peribadi.COEmail);
                                    $("#jawatan_text_add").html(obj_hrmis.perkhidmatan.schmofservtitle);
                                    $("#gred_text_add").html(obj_hrmis.perkhidmatan.SalGrd);
                
                                    $("#nama_add").val(bj_hrmis.peribadi.nama);
                                    $("#noic_add").val(obj_hrmis.peribadi.icno);
                                    $("#notel_add").val(obj_hrmis.peribadi.COHPhoneNo);
                                    $("#emel_add").val(obj_hrmis.peribadi.COEmail);
                                    $("#jawatan_add").val(obj_hrmis.perkhidmatan.schmofservtitle);
                                    $("#gred_add").val(obj_hrmis.perkhidmatan.SalGrd);

                                    $("#btn_modal_footer").html(`    
                                        <button class="btn btn-primary btn-anim" type="submit" >Simpan</button>
                                        <button type="button" onclick="reset_modal(1)" class="btn btn-secondary btn-simple" >Semula</button>
                                        <button type="button" onclick="close_modal(1)" class="btn btn-danger" >Tutup</button>
                                    `);
                    
                                    // $("#noic_check").val('');
                                    // $("#noic_check").prop('disabled', false);
                                    // $("#btn_semak").prop('disabled', false);
                                    // $("#icon_semak").removeClass('fas fa-cog fa-spin').addClass('fas fa-search');
                                    
                                }
                            });
                        }
                
                    });
                }
            }

        });
    }else{

        check_users(noic, function () {
            if (dataUsers.success) {
                
                $('#message_load_1').addClass('hidden');
                $('#message_load_2').addClass('hidden');
                $('#message_load_3').addClass('hidden');
                $('#data_load_1').removeClass('hidden');
                $('#data_load_2').removeClass('hidden');
                $('#data_load_3').removeClass('hidden');

                $("#nama_text_add").html(dataUsers.data.nama);
                $("#noic_text_add").html(dataUsers.data.no_kad_pengenalan);
                $("#notel_text_add").html(dataUsers.data.notel);
                $("#emel_text_add").html(dataUsers.data.emel_kerajaan);
                $("#jawatan_text_add").html(dataUsers.data.nama_jawatan);
                $("#gred_text_add").html(dataUsers.data.skim);
    
                $("#nama_add").val(dataUsers.data.nama);
                $("#noic_add").val(dataUsers.data.no_kad_pengenalan);
                $("#notel_add").val(dataUsers.data.notel);
                $("#emel_add").val(dataUsers.data.emel_kerajaan);
                $("#jawatan_add").val(dataUsers.data.jawatan);
                $("#gred_add").val(dataUsers.data.skim);
    
                // $("#noic_check").val('');
                // $("#noic_check").prop('disabled', false);
                // $("#btn_semak").prop('disabled', false);
                // $("#icon_semak").removeClass('fas fa-cog fa-spin').addClass('fas fa-search');
    
            } else {
                check_hrmis(noic, function () {
                    if (obj_hrmis == "2") {
                        swal({
                            title: "Semak Maklumat Calon",
                            text: "Rekod Tidak Dijumpai.",
                            type: "error",
                            closeOnConfirm: true,
                            allowOutsideClick: false,
                            html: false
                        }).then(function () {
                            $("#no_kad_pengenalan").prop('disabled', false);
                            $("#no_kad_pengenalan").val('');
                            $("#no_kad_pengenalan").focus();
                            $("#btn_semak").prop('disabled', false);

                            $('#message_load_1').addClass('hidden');
                            $('#message_load_2').addClass('hidden');
                            $('#message_load_3').removeClass('hidden');
                            $('#data_load_1').addClass('hidden');
                            $('#data_load_2').addClass('hidden');
                            $('#data_load_3').addClass('hidden');

                            $("#icon_semak_ic").removeClass('fas fa-cog fa-spin').addClass('fas fa-search');
                        });
                    }else {
                        
                        $('#message_load_1').addClass('hidden');
                        $('#message_load_2').addClass('hidden');
                        $('#message_load_3').addClass('hidden');
                        $('#data_load_1').removeClass('hidden');
                        $('#data_load_2').removeClass('hidden');
                        $('#data_load_3').removeClass('hidden');

                        $("#nama_text_add").html(obj_hrmis.peribadi.nama);
                        $("#noic_text_add").html(obj_hrmis.peribadi.icno);
                        $("#notel_text_add").html(obj_hrmis.peribadi.COHPhoneNo);
                        $("#emel_text_add").html(obj_hrmis.peribadi.COEmail);
                        $("#jawatan_text_add").html(obj_hrmis.perkhidmatan.schmofservtitle);
                        $("#gred_text_add").html(obj_hrmis.perkhidmatan.SalGrd);
    
                        $("#nama_add").val(bj_hrmis.peribadi.nama);
                        $("#noic_add").val(obj_hrmis.peribadi.icno);
                        $("#notel_add").val(obj_hrmis.peribadi.COHPhoneNo);
                        $("#emel_add").val(obj_hrmis.peribadi.COEmail);
                        $("#jawatan_add").val(obj_hrmis.perkhidmatan.schmofservtitle);
                        $("#gred_add").val(obj_hrmis.perkhidmatan.SalGrd);
        
                        // $("#noic_check").val('');
                        // $("#noic_check").prop('disabled', false);
                        // $("#btn_semak").prop('disabled', false);
                        // $("#icon_semak").removeClass('fas fa-cog fa-spin').addClass('fas fa-search');
                        
                    }
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
        returnValue();
    });
}

// var confirmed = false;

$('#simpan_individu').on('submit', function(e){
    let token = localStorage.token;
    let $this = $(this);

    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Tambah Calon",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {
            let id = sessionStorage.id_siri_penilaian;
            let id_sesi_siri_penilaian = $("#sesi_individu").val();
            let id_siri_penilaian = sessionStorage.id_siri_penilaian;
            var formNoAngkaGiliran = new FormData();
            formNoAngkaGiliran.append('FK_siri_penilaian', id_siri_penilaian);
            let no_angka_giliran = "";
            showCalonSoalanBySiriPenilaian(formNoAngkaGiliran,function(){
                if(no_angka_giliran == ""){
                    if(obj.success){
                        let result = obj.data;
                        no_angka_giliran = parseInt(result.no_angka_giliran);
                    } else {
                        no_angka_giliran = parseInt("10000");
                    }
                }

                let noic = $('#noic_add').val();
                let nama = $('#nama_add').val();
                let notel = $('#notel_add').val();
                let emel = $('#emel_add').val();
                let jawatan = $('#jawatan_add').val();
                let gred = $('#gred_add').val();
    
                var form = new FormData();
    
                form.append('FK_siri_penilaian', id);
                form.append('FK_sesi', id_sesi_siri_penilaian);
                form.append('nama', nama);
                form.append('no_kad_pengenalan', noic);
                form.append('gred', gred);
                form.append('jawatan', jawatan);
                form.append('emel', emel);
                form.append('notel', notel);
                form.append("created_by", id_users_master);
                loadContentSesi(id_sesi_siri_penilaian, function(){
                    let data = objSesi.data;
                    let json_set_soalan = JSON.parse(data.json_set_soalan);
                    let random = Math.floor(Math.random() * json_set_soalan.length);
                    let json_list = json_set_soalan[random].json_list;
                    form.append('json_list',JSON.stringify(json_list));
                    form.append("no_angka_giliran", ++no_angka_giliran);
                    simpanCalon(form,function(){    
                        if(objCalon.success){    
                            $('#loading_modal').modal('show');
                            swal({
                                title: "Pendaftaran Calon",
                                text: "Berjaya!",
                                type: "success",
                                closeOnConfirm: true,
                                allowOutsideClick: false,
                                html: false
                            }).then(function () {
                                resetForm();
                                // $('#senaraiCalonTemp').html('');
                                $('#btn_semak').prop('disabled',false);
                                $('#nama_text_add').html('');
                                $('#noic_text_add').html('');
    
                                $('#message_load_0').addClass('hidden');
                                $('#message_load_1').addClass('hidden');
                                $('#message_load_2').addClass('hidden');
                                $('#message_load_3').addClass('hidden');
                                $('#data_load_1').addClass('hidden');
                                $('#data_load_2').addClass('hidden');
                                $('#data_load_3').addClass('hidden');
    
                                $('#nama_add').val('');
                                $('#noic_add').val('');
                                $('#notel_add').val('');
                                $('#emel_add').val('');
                                $('#gred_add').val('');
                                $('#jawatan_add').val('');
                                $('#no_kad_pengenalan').val('').prop('disabled',false);
                                
                                // document.getElementById('addCalon').reset();
                                $("#addCalon").modal('hide');
                                // $('#btn-upload').removeAttr('disabled').removeClass('btn-secondary').addClass('btn-primary');
                                load_calon_soalan(id_sesi_siri_penilaian);
                            });
                        }else{
                            swal({
                                title: "Muat Naik Calon",
                                text: "Gagal!",
                                type: "error",
                                closeOnConfirm: true,
                                allowOutsideClick: false,
                                html: false
                            }).then(function () {
                                document.getElementById('simpan_kumpulan').reset();
                                close_modal(flag);
                                // $('#uploadCalon').modal('hide');
                                // $("#modaldaftarsiripenilaian").modal('hide');
                            });    
                        }                
                    });
                });
            });
        });
    }
});

// FUNCTION REGISTER

$("#process").on('submit', function (e) {
    let token = localStorage.token;
    let $this = $(this);
    let process = 'add';

    let id = sessionStorage.id_siri_penilaian
    let id_sesi_siri_penilaian = $('#id_sesi_siri_penilaian').val();
    if (!confirmed) {
        e.preventDefault();
        if(id_sesi_siri_penilaian > 0){
            swal({
                title: "Kemaskini Sesi Siri Penilaian",
                text: "Anda Pasti Untuk Kemaskini?",
                type: "question",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
                closeOnConfirm: true,
                allowOutsideClick: false,
                html: false
            }).then(function () {
                let tetapan_masa = $('#tetapan_masa').val();
                let sesi_penilaian = $('#sesi_penilaian').val();
                let tarikh_mula = $('#tarikh_mula').val();
                let tarikh_tamat = $('#tarikh_tamat').val();
                let masa_mula = $('#masa_mula').val();
                let masa_tamat = $('#masa_tamat').val();
                let status_pautan = $('#status_pautan').val();
                let status_penilaian = $("input[name='status_penilaian']:checked").val();
    
                let pautan_zoom = $('#pautan_zoom').val();
                let pautan_google = $('#pautan_google').val();
                let pautan_skype = $('#pautan_skype').val();
                let pautan_team = $('#pautan_team').val();
    
                let duration = $('#diff_masa').val();
    
                let tarikh_mula_mohon = $("#tarikh_mula_mohon").val();
                let tarikh_tamat_mohon = $("#tarikh_tamat_mohon").val();
    
                let data_soalan = JSON.parse($('#data_soalan').val()); let size_dataSoalan = data_soalan.length - 1;
    
                var form = new FormData();
    
                form.append('id_sesi_siri_penilaian',id_sesi_siri_penilaian);
                form.append('id_tetapan_masa',tetapan_masa);
                form.append('sesi_penilaian',sesi_penilaian);
                form.append('tarikh_mula',tarikh_mula);
                form.append('tarikh_tamat',tarikh_tamat);
                form.append('masa_mula',formatTimeOnly(masa_mula));
                form.append('masa_tamat',formatTimeOnly(masa_tamat));
                form.append('duration',duration);
                form.append('pautan_status',status_pautan);
                form.append('pautan_zoom',pautan_zoom);
                form.append('pautan_google',pautan_google);
                form.append('pautan_skype',pautan_skype);
                form.append('pautan_team',pautan_team);
                form.append('id_siri_penilaian',window.sessionStorage.id_siri_penilaian);
                form.append('status_penilaian',status_penilaian);
                form.append("keterbukaan", status_penilaian);
                form.append("tarikh_mula_mohon", tarikh_mula_mohon);
                form.append("tarikh_tamat_mohon", tarikh_tamat_mohon);
                form.append('FK_siri_penilaian',id);
                form.append('created_by',id_users_master);
    
                upt_siri_penilaian_keterbukaan(form,function(){
                    if(objSiriPenilaian.success){   
                        // for (var pair of form.entries()) {
                        //     console.log(pair[0]+ ', ' + pair[1]); 
                        // }
                        simpanDataSesi(form,function(){
                            if(objSesi.success){
                                if(data_soalan.length > 0){
                                    $.each(data_soalan,function(i,item){        
                                        let saat_menjawab = $('#minit_'+i).val();        
                                        var forms = new FormData();            
                                        forms.append('PK_siri_soalan',item.PK_siri_soalan);
                                        forms.append('saat_menjawab',saat_menjawab);
                                        forms.append('created_by',id_users_master);            
                                        simpanSaatMenjawab(forms,function(){            
                                            if(objSoalan.success){
                                                if(size_dataSoalan == i){
                                                    swal({
                                                        title: "Kemaskini Sesi Siri Penilaian",
                                                        text: "Berjaya!",
                                                        type: "success",
                                                        closeOnConfirm: true,
                                                        allowOutsideClick: false,
                                                        html: false
                                                    }).then(function () {
                                                        window.location.reload();
                                                        $('#sesi-'+data.id_sesi_siri_penilaian).addClass('active');
                                                    });
                                                }            
                                            }else{
                                                if(size_dataSoalan == i){
                                                    swal({
                                                        title: "Kemaskini Sesi Siri Penilaian",
                                                        text: "Berjaya!",
                                                        type: "success",
                                                        closeOnConfirm: true,
                                                        allowOutsideClick: false,
                                                        html: false
                                                    }).then(function () {
                                                        window.location.reload();
                                                        $('#sesi-'+data.id_sesi_siri_penilaian).addClass('active');                                                        
                                                    });
                                                }
                                            }            
                                        });
                                    });
                                }else{
                                    swal({
                                        title: "Daftar Sesi Siri Penilaian",
                                        text: "Berjaya!",
                                        type: "success",
                                        closeOnConfirm: true,
                                        allowOutsideClick: false,
                                        html: false
                                    }).then(function () {
                                        window.location.reload();
                                        $('#sesi-'+id_sesi_siri_penilaian).addClass('active');
                                    });
                                }
        
                            }else{
                                swal({
                                    title: "Daftar Sesi Siri Penilaian",
                                    text: "Pendaftaran Gagal!",
                                    type: "error",
                                    closeOnConfirm: true,
                                    allowOutsideClick: false,
                                    html: false
                                }).then(function () {
                                    // window.location.reload();
                                });
                            }
                        });
                    }
                });
            });

        } else {
            swal({
                title: "Daftar Sesi Siri Penilaian",
                text: "Anda Pasti Untuk Simpan?",
                type: "question",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
                closeOnConfirm: true,
                allowOutsideClick: false,
                html: false
            }).then(function () {
                let tetapan_masa = $('#tetapan_masa').val();
                let sesi_penilaian = $('#sesi_penilaian').val();
                let tarikh_mula = $('#tarikh_mula').val();
                let tarikh_tamat = $('#tarikh_tamat').val();
                let masa_mula = $('#masa_mula').val();
                let masa_tamat = $('#masa_tamat').val();
                let status_pautan = $('#status_pautan').val();
                let status_penilaian = $("input[name='status_penilaian']:checked").val();
    
                let pautan_zoom = $('#pautan_zoom').val();
                let pautan_google = $('#pautan_google').val();
                let pautan_skype = $('#pautan_skype').val();
                let pautan_team = $('#pautan_team').val();
    
                let duration = $('#diff_masa').val();
    
                let tarikh_mula_mohon = $("#tarikh_mula_mohon").val();
                let tarikh_tamat_mohon = $("#tarikh_tamat_mohon").val();
    
                let data_soalan = JSON.parse($('#data_soalan').val()); let size_dataSoalan = data_soalan.length - 1;
    
                var form = new FormData();
    
                form.append('id_tetapan_masa',tetapan_masa);
                form.append('sesi_penilaian',sesi_penilaian);
                form.append('tarikh_mula',tarikh_mula);
                form.append('tarikh_tamat',tarikh_tamat);
                form.append('masa_mula',formatTimeOnly(masa_mula));
                form.append('masa_tamat',formatTimeOnly(masa_tamat));
                form.append('duration',duration);
                form.append('pautan_status',status_pautan);
                form.append('pautan_zoom',pautan_zoom);
                form.append('pautan_google',pautan_google);
                form.append('pautan_skype',pautan_skype);
                form.append('pautan_team',pautan_team);
                form.append('id_siri_penilaian',window.sessionStorage.id_siri_penilaian);
                form.append('status_penilaian',status_penilaian);
                form.append("keterbukaan", status_penilaian);
                form.append("tarikh_mula_mohon", tarikh_mula_mohon);
                form.append("tarikh_tamat_mohon", tarikh_tamat_mohon);
                form.append('FK_siri_penilaian',id);
                form.append('created_by',id_users_master);
    
                upt_siri_penilaian_keterbukaan(form,function(){
                    if(objSiriPenilaian.success){            
                        simpanDataSesi(form,function(){
                            if(objSesi.success){
                                // localStorage.token = objSesi.token;
        
                                if(data_soalan.length > 0){
                                    $.each(data_soalan,function(i,item){
        
                                        let saat_menjawab = $('#minit_'+i).val();
        
                                        var forms = new FormData();
            
                                        forms.append('PK_siri_soalan',item.PK_siri_soalan);
                                        forms.append('saat_menjawab',saat_menjawab);
                                        forms.append('created_by',id_users_master);
            
                                        simpanSaatMenjawab(forms,function(){
            
                                            if(objSoalan.success){
                                                // localStorage.token = objSoalan.token;
                                                if(size_dataSoalan == i){
                                                    swal({
                                                        title: "Daftar Sesi Siri Penilaian",
                                                        text: "Berjaya!",
                                                        type: "success",
                                                        closeOnConfirm: true,
                                                        allowOutsideClick: false,
                                                        html: false
                                                    }).then(function () {
                                                        window.location.reload();
                                                    // $('ul li').each(function(i){
                                                    // $(this).attr('rel'); // This is your rel value
                                                    // });
                                                    $('#sesi-'+data.id_sesi_siri_penilaian).addClass('active');
                                                        
                                                        // tableSiriPenilaian(token);
                                                    });
                                                }
            
                                            }else{
                                                if(size_dataSoalan == i){
                                                    swal({
                                                        title: "Daftar Sesi Siri Penilaian",
                                                        text: "Berjaya!",
                                                        type: "success",
                                                        closeOnConfirm: true,
                                                        allowOutsideClick: false,
                                                        html: false
                                                    }).then(function () {
                                                        window.location.reload();
                                                    // $('ul li').each(function(i){
                                                    // $(this).attr('rel'); // This is your rel value
                                                    // });
                                                    $('#sesi-'+data.id_sesi_siri_penilaian).addClass('active');
                                                        
                                                        // tableSiriPenilaian(token);
                                                    });
                                                }
                                                // window.location.reload();
                                                // console.log(objSoalan);DOUBLE CHECK
                                                // swal({
                                                //     title: "Daftar Sesi Siri Penilaian",
                                                //     text: "Pendaftaran Gagal!",
                                                //     type: "error",
                                                //     closeOnConfirm: true,
                                                //     allowOutsideClick: false,
                                                //     html: false
                                                // }).then(function () {
                                                //     window.location.reload();
                                                // });
                                            }
            
                                        });
                                    });
                                }else{
                                    swal({
                                        title: "Daftar Sesi Siri Penilaian",
                                        text: "Berjaya!",
                                        type: "success",
                                        closeOnConfirm: true,
                                        allowOutsideClick: false,
                                        html: false
                                    }).then(function () {
                                        window.location.reload();
                                        $('#sesi-'+id_sesi_siri_penilaian).addClass('active');
                                    });
                                }
        
                            }else{
                                swal({
                                    title: "Daftar Sesi Siri Penilaian",
                                    text: "Pendaftaran Gagal!",
                                    type: "error",
                                    closeOnConfirm: true,
                                    allowOutsideClick: false,
                                    html: false
                                }).then(function () {
                                    // window.location.reload();
                                });
                            }
                        });
                    }
                });
            });
        }
    }
});

$("#form_template").on('submit', function (e) {
    let token = localStorage.token;
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Kemaskini Emel",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {
            let id_siri_penilaian = sessionStorage.id_siri_penilaian;
            let template_emel = tinymce.get('template_emel_textarea').getContent();
            var form = new FormData();
            form.append("id_siri_penilaian", id_siri_penilaian);
            form.append("template_emel", template_emel);
            form.append("updated_by", id_users_master);
            // for (var pair of form.entries()) {
            //     console.log(pair[0]+ ', ' + pair[1]); 
            // }

            upt_siri_penilaian_template_emel(form,function(){
                if (result.success) {       
                    if(obj.success){
                        swal({
                            title: "Kemaskini Emel",
                            text: "Berjaya!",
                            type: "success",
                            closeOnConfirm: true,
                            allowOutsideClick: false,
                            html: false
                        }).then(function () {
                            // window.location.reload();
                        }); 
                    } else {
                        swal({
                            title: "Kemaskini Emel Dan Hantar Kepada Calon",
                            text: "Gagal! " + obj.message,
                            type: "info",
                            closeOnConfirm: true,
                            allowOutsideClick: false,
                            html: false
                        }).then(function () {
                            // window.location.reload();
                        }); 
                    }             
                    // form.append("FK_siri_penilaian", id_siri_penilaian);
                    // blastEmailCalonSoalan(form,function(){
                    //     if(obj.success){
                    //         swal({
                    //             title: "Kemaskini Emel Dan Hantar Kepada Calon",
                    //             text: "Berjaya!",
                    //             type: "success",
                    //             closeOnConfirm: true,
                    //             allowOutsideClick: false,
                    //             html: false
                    //         }).then(function () {
                    //             // window.location.reload();
                    //         }); 
                    //     } else {
                    //         swal({
                    //             title: "Kemaskini Emel Dan Hantar Kepada Calon",
                    //             text: "Gagal! " + obj.message,
                    //             type: "info",
                    //             closeOnConfirm: true,
                    //             allowOutsideClick: false,
                    //             html: false
                    //         }).then(function () {
                    //             // window.location.reload();
                    //         }); 
                    //     }
                    // });
                } else {
                    swal({
                        title: "Kemaskini Emel",
                        text: "Gagal!",
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        window.location.reload();
                    });              
                }
            });
        });
    }
});

function simpanSaatMenjawab(form,returnValue){

    var settings = {
        "url": host+"sirisoalan/updateMasa",
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
        objSoalan = JSON.parse(response);
        returnValue();
    });

    request.fail(function (response) {
        objSoalan = response;
        returnValue();        
    });

}

function simpanDataSesi(form,returnValue){

    var settings = {
        "url": host+"sesi_siri_penilaian/register",
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
        objSesi = JSON.parse(response);
        returnValue();
    });

    request.fail(function (response) {
        objSesi = response;
        returnValue();        
    });

}

function pen_muka_depan_siri_penilaianProcess(process,form,returnValue){


    var settings = {
        "url": host+"muka_depan/"+process,
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
        objProcess = JSON.parse(response);
        returnValue();
    });

    request.fail(function (response) {
        objProcess = response;
        returnValue();        
    });

}

function pen_data_calonUpdate(form,token,returnValue){

    var settings = {
        "url": host+"muka_depan/data_calon",
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
        objData = JSON.parse(response);
        returnValue();
    });

    request.fail(function (response) {
        objData = response;
        returnValue();        
    });

}

// FUNCTION DELETE

function del_rekod(i, token) {
    let id = i;

    var form = new FormData();
    form.append("id_penilaian", id);
    
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

function padamCalonSingle(id_calon_soalan,id_sesi_siri_penilaian){
    var form = new FormData();
    form.append("id_calon_soalan",id_calon_soalan);
    delCalonSoalan(form, function(){
        if(obj.success){
            swal({
                title: "Hapus Calon Penilaian",
                text: "Hapus Berjaya!",
                type: "success",
                closeOnConfirm: true,
                allowOutsideClick: false,
                html: false
            }).then(function () {
                load_calon_soalan(id_sesi_siri_penilaian);
            });
        }
    });
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

    let listHtml = ["tableUrusetia", "tableJKPenggubal", "tableJKPenilai", "tablePanelPenilai",
    ];
    $.each(listHtml, function (i, item) {
        $("#" + item).html("");
    });

    // document.getElementById('register').reset();
}

$("#addField").on("click", function(){

    let curr = $('#dataSenarai').val(); let list = JSON.parse(curr); let size_list = list.length; let index_list = size_list - 1; 
    let runn = $('#dataRunningSenarai').val(); let list_runn = JSON.parse(runn); let size_list_runn = list_runn.length; let index_list_runn = size_list_runn - 1; 
    let append = ''; let append_old = '';
    let new_list = [];

    var columns = [
        // { "name": "label", "title": "Label" },
        { "name": "data_list", "title": "Data" },
        { "name": "status", "title": "Mandatory" },
        { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
        // {"name":"status","title":"Status","breakpoints":"sm xs"}
    ];

    $.each(list,function(i,item){

        if(size_list > 1){

            if(i == 0){ append += '<option selected value="'+item.data_calon+'">'+item.label+'</option>'; }
            else{ append += '<option value="'+item.data_calon+'">'+item.label+'</option>'; append_old += '<option value="'+item.data_calon+'">'+item.label+'</option>';}
            
        }else{

            append = '<option selected value="'+item.data_calon+'">'+item.label+'</option>';

        }

        if(i == index_list){

            $.each(list_runn,function(k,items){

                if(k == index_list_runn){

                    list_runn[k] ={
                        label       : list_runn[k].label,
                        flag        : list_runn[k].flag,
                        data_calon  : list_runn[k].data_calon,
                        data_list   : "<select onchange='setList("+k+")' class='form-control' id='data_"+k+"'><option value='"+list_runn[k].data_calon+"' selected>"+list_runn[k].label+"</option>"+append_old+"</select>",
                        status      : '<div class="material-switch"><input onclick="changeColor('+ k +',`'+ list_runn[k].flag +'`)" id="switch_del_'+k+'" '+ (list_runn[k].flag == "ON" ? "checked" : "") +' " type="checkbox"/><label for="switch_del_'+k+'" id="label_switch_'+k+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_'+k+'" class="badge '+ (list_runn[k].flag == "ON" ? "badge-success" : "badge-danger") +'">'+ (list_runn[k].flag == "ON" ? "Wajib" : "Tidak Wajib") +'</span></div><input type="text" value="'+list_runn[k].flag+'" class="form-control  hidden" id="stat_'+k+'">',
                        upt_btn     : '<button class="btn btn-danger" type="button" onclick="remData('+k+')" id="del_'+k+'"><i class="fa fa-trash"></i></button>'
                    };

                    list_runn[size_list_runn] ={
                        label       : list[0].label,
                        flag        : "OFF",
                        data_calon  : list[0].data_calon,
                        data_list   : "<select onchange='setList("+size_list_runn+")' class='form-control' id='data_"+size_list_runn+"'>"+append+"</select>",
                        status      : '<div class="material-switch"><input onclick="changeColor('+ size_list_runn +',`OFF`)" id="switch_del_'+size_list_runn+'" " type="checkbox"/><label for="switch_del_'+size_list_runn+'" id="label_switch_'+size_list_runn+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_'+size_list_runn+'" class="badge badge-danger">Tidak Wajib</span></div><input type="text" value="OFF" class="form-control  hidden" id="stat_'+size_list_runn+'">',
                        upt_btn     : '<button class="btn btn-danger" type="button" onclick="remData('+size_list_runn+')" id="del_'+size_list_runn+'"><i class="fa fa-trash"></i></button>'
                    };

                    list.splice(0,1);
                    $('#dataSenarai').val(JSON.stringify(list));
                    $('#dataRunningSenarai').val(JSON.stringify(list_runn));

                    if(list.length > 0){
                        $('#addField').removeClass('hidden');
                    }else{
                        $('#addField').addClass('hidden');
                    }
                        
                    $("#listSenarai").footable({
                        "columns": columns,
                        "rows": list_runn,
                        "paging": {
                            "enabled": true,
                            "size": 10
                        }
                    });
                }else{

                    list_runn[k] ={
                        label       : list_runn[k].label,
                        flag       : list_runn[k].flag,
                        data_calon  : list_runn[k].data_calon,
                        data_list   : "<select onchange='setList("+k+")' class='form-control' id='data_"+k+"'><option value='"+list_runn[k].data_calon+"' selected>"+list_runn[k].label+"</option>"+append_old+"</select>",
                        status      : '<div class="material-switch"><input onclick="changeColor('+ k +',`'+ list_runn[k].flag +'`)" id="switch_del_'+k+'" '+ (list_runn[k].flag == "ON" ? "checked" : "") +' " type="checkbox"/><label for="switch_del_'+k+'" id="label_switch_'+k+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_'+k+'" class="badge '+ (list_runn[k].flag == "ON" ? "badge-success" : "badge-danger") +'">'+ (list_runn[k].flag == "ON" ? "Wajib" : "Tidak Wajib") +'</span></div><input type="text" value="'+list_runn[k].flag+'" class="form-control  hidden" id="stat_'+k+'">',
                        upt_btn     : '<button class="btn btn-danger" type="button" onclick="remData('+k+')" id="del_'+k+'"><i class="fa fa-trash"></i></button>'
                    };

                }

            });

        }

    })

});

function remData(index){

    let append = '';
    let list = JSON.parse($('#dataSenarai').val()); 
    let list_runn = JSON.parse($('#dataRunningSenarai').val()); 

    var columns = [
        { "name": "data_list", "title": "Data" },
        { "name": "status", "title": "Mandatory" },
        { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
    ];

    list.push({
        id_data       : "",
        data_calon    : list_runn[index].data_calon,
        label         : list_runn[index].label
    });

    let size_list = list.length; let index_list = size_list - 1; 

    list_runn.splice(index,1);

    let size_list_runn = list_runn.length; let index_list_runn = size_list_runn - 1; 

    $.each(list,function(i,item){

        append += '<option value="'+item.data_calon+'">'+item.label+'</option>';

        if(i == index_list){

            $.each(list_runn,function(k,items){

                list_runn[k] ={
                    label       : items.label,
                    flag        : items.flag,
                    data_calon  : items.data_calon,
                    data_list   : '<select onchange="setList('+k+')" class="form-control" id="data_'+k+'"><option selected value="'+items.data_calon+'">'+items.label+'</option>'+append+'</select>',
                    status      : '<div class="material-switch"><input onclick="changeColor('+ k +',`'+ items.flag +'`)"  id="switch_del_'+k+'" '+ (items.flag == "ON" ? "checked" : "") +' " type="checkbox"/><label for="switch_del_'+k+'" id="label_switch_'+k+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_'+k+'" class="badge '+ (items.flag == "ON" ? "badge-success" : "badge-danger") +'">'+ (items.flag == "ON" ? "Wajib" : "Tidak Wajib") +'</span></div><input type="text" value="'+items.flag+'" class="form-control  hidden" id="stat_'+k+'">',
                    upt_btn     : '<button class="btn btn-danger" type="button" onclick="remData('+k+')" id="del_'+k+'"><i class="fa fa-trash"></i></button>'
                };

                if(k == index_list_runn){

                    $('#dataSenarai').val(JSON.stringify(list));
                    $('#dataRunningSenarai').val(JSON.stringify(list_runn));

                    if(list.length > 0) $('#addField').removeClass('hidden');
                    else $('#addField').addClass('hidden');
                        
                    $("#listSenarai").footable({
                        "columns": columns,
                        "rows": list_runn,
                        "paging": {
                            "enabled": true,
                            "size": 10
                        }
                    });

                }

            });

        }

    });

}

function setList(index){

    let list = JSON.parse($('#dataSenarai').val()); let list_size = list.length - 1;
    let list_new = [];
    let list_runn = JSON.parse($('#dataRunningSenarai').val()); let size_list_runn = list_runn.length; let index_list_runn = size_list_runn - 1; 
    let data_calon_val = $('#data_'+index).val(); let data_calon_text = $('#data_'+index+' option:selected').text();
    let append = '';

    var columns = [
        { "name": "data_list", "title": "Data" },
        { "name": "status", "title": "Mandatory" },
        { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
    ];

    $("#data_"+index+" option").each(function(){
        if($(this).val() != data_calon_val){

            list_new.push({
                id_data     : "",
                data_calon  : $(this).val(),
                label       : $(this).text(),
            });

        }
    });

    $.each(list_new,function(i,item){

        append += '<option value="'+item.data_calon+'">'+item.label+'</option>';

        if(i == list_size){

            $.each(list_runn,function(k,items){

                if(k == index){
                    list_runn[index] ={
                        label       : data_calon_text,
                        flag        : "OFF",
                        data_calon  : data_calon_val,
                        data_list   : '<select onchange="setList('+index+')" class="form-control" id="data_'+index+'"><option selected value="'+data_calon_val+'">'+data_calon_text+'</option>'+append+'</select>',
                        status      : '<div class="material-switch"><input onclick="changeColor('+ index +',`OFF`)" id="switch_del_'+index+'" type="checkbox"/><label for="switch_del_'+index+'" id="label_switch_'+index+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_'+index+'" class="badge badge-danger">Tidak Wajib</span></div><input type="text" value="OFF" class="form-control hidden" id="stat_'+index+'">',
                        upt_btn     : '<button class="btn btn-danger" type="button" onclick="remData('+index+')" id="del_'+index+'"><i class="fa fa-trash"></i></button>'
                    };
                }else{
                    list_runn[k] ={
                        label       : items.label,
                        flag        : items.flag,
                        data_calon  : items.data_calon,
                        data_list   : '<select onchange="setList('+k+')" class="form-control" id="data_'+k+'"><option selected value="'+items.data_calon+'">'+items.label+'</option>'+append+'</select>',
                        status      : '<div class="material-switch"><input onclick="changeColor('+ k +',`'+ items.flag +'`)" id="switch_del_'+k+'" '+ (items.flag == "ON" ? "checked" : "") +' " type="checkbox"/><label for="switch_del_'+k+'" id="label_switch_'+k+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_'+k+'" class="badge '+ (items.flag == "ON" ? "badge-success" : "badge-danger") +'">'+ (items.flag == "ON" ? "Wajib" : "Tidak Wajib") +'</span></div><input type="text" value="'+items.flag+'" class="form-control  hidden" id="stat_'+k+'">',
                        upt_btn     : '<button class="btn btn-danger" type="button" onclick="remData('+k+')" id="del_'+k+'"><i class="fa fa-trash"></i></button>'
                    };
                }

                if(k == index_list_runn){

                    $('#dataSenarai').val(JSON.stringify(list_new));
                    $('#dataRunningSenarai').val(JSON.stringify(list_runn));
                        
                    $("#listSenarai").footable({
                        "columns": columns,
                        "rows": list_runn,
                        "paging": {
                            "enabled": true,
                            "size": 10
                        }
                    });

                }

            });
        }
    });

}

function changeColor(index,status){

    let addBadge    = (status == "ON" ? "badge-danger" : "badge-success");
    let remBadge    = (status == "OFF" ? "badge-danger" : "badge-success");
    let text        = (status == "ON" ? "Tidak Wajib" : "Wajib");
    let val         = (status == "ON" ? "OFF" : "ON");

    $('#text_statusrekod_'+index).addClass(addBadge);
    $('#text_statusrekod_'+index).removeClass(remBadge);
    $('#text_statusrekod_'+index).html(text);
    $('#switch_del_'+index).attr("onclick","changeColor("+index+",`"+val+"`)");
    $('#stat_'+index).val(val);

    let list = JSON.parse($('#dataRunningSenarai').val());

    list[index].flag = val;

    $('#dataRunningSenarai').val(JSON.stringify(list));

}

$("#preview").on("click", function() {
    
    $('#modalPreview').modal('show');
    
    let append = `<div class="row clearfix g-3">
                    <div class="col-md-12 col-sm-12">
                        <label for="data-calon">Sila lengkapkan maklumat calon sebelum memulakan Ujian</label>
                    </div>
                </div>`;
    let id = $('#FK_siri_penilaian').val();

    var form = new FormData();
    form.append('id_siri_penilaian', id);

    load_siri_penilaian(form,function(){

        if(objSiri.success){

            let data = objSiri.data;

            let path = "../../api_penilaian/public/logo/";
            let logo = "default/JATA_NEGARA_MALAYSIA.png";

            let tahun           = data.tahun;
            let nosiri          = data.nosiri;
            let kod_penilaian   = data.kod_penilaian;
            let nama_penilaian  = data.nama_penilaian;
            let nama_kluster    = data.nama_kluster;

            if(data.logo !== '' && data.logo !== null) logo = data.logo;

            loadMukaDepan(id,token,function(){

                if(objMukaDepan.success){

                    let dataCalon = objMukaDepan.data;

                    let arahan                  = dataCalon.arahan;
                    let nama                    = dataCalon.nama;
                    let stat_nama               = dataCalon.stat_nama;
                    let no_kad_pengenalan       = dataCalon.no_kad_pengenalan;
                    let stat_no_kad_pengenalan  = dataCalon.stat_no_kad_pengenalan;
                    let gred                    = dataCalon.gred;
                    let stat_gred               = dataCalon.stat_gred;
                    let jawatan                 = dataCalon.jawatan;
                    let stat_jawatan            = dataCalon.stat_jawatan;
                    let emel                    = dataCalon.emel;
                    let stat_emel               = dataCalon.stat_emel;
                    let no_angka_giliran        = dataCalon.no_angka_giliran;
                    let stat_no_angka_giliran   = dataCalon.stat_no_angka_giliran;
                    let notel                   = dataCalon.notel;
                    let stat_notel              = dataCalon.stat_notel;

                    $('#penilaian-logo').html('').append(`<img src="`+path+logo+`" class="img-fluid img-thumbnail">`);
                    $('#penilaian-title').html(` 
                        <span class="fw-bolder text-35 text-decoration-underline lh-base">`+nama_penilaian+` (`+kod_penilaian+`)</span><br/>
                        <span class="fw-bolder text-20  lh-1">`+nama_kluster+`</span>
                    `);
                    $('#penilaian-arahan').html(arahan);

                    if(nama == 1){
                        append   += `<div class="row clearfix g-3">
                                        <div class="col-md-3 col-sm-4 form-control-label">
                                            <label for="nama">Nama</label>
                                        </div>
                                        <div class="col-md-9 col-sm-8">
                                            <div class="form-group mb-2">
                                                <input type="text" id="nama" `+(stat_nama == "ON" ? "required" : "")+` class="form-control" placeholder="Nama">
                                            </div>
                                        </div>
                                    </div>`;
                    }

                    if(no_kad_pengenalan == 1){
                        append   += `<div class="row clearfix g-3">
                                        <div class="col-md-3 col-sm-4 form-control-label">
                                            <label for="no_kad_pengenalan">No. Kad Pengenalan</label>
                                        </div>
                                        <div class="col-md-9 col-sm-8">
                                            <div class="form-group mb-2">
                                                <input type="text" id="no_kad_pengenalan" `+(stat_no_kad_pengenalan == "ON" ? "required" : "")+` class="form-control" placeholder="No. Kad Pengenalan">
                                            </div>
                                        </div>
                                    </div>`;
                    }

                    if(gred == 1){
                        append   += `<div class="row clearfix g-3">
                                        <div class="col-md-3 col-sm-4 form-control-label">
                                            <label for="gred">Gred</label>
                                        </div>
                                        <div class="col-md-9 col-sm-8">
                                            <div class="form-group mb-2">
                                                <input type="text" id="gred" `+(stat_gred == "ON" ? "required" : "")+` class="form-control" placeholder="Gred">
                                            </div>
                                        </div>
                                    </div>`;
                    }

                    if(jawatan == 1){
                        append   += `<div class="row clearfix g-3">
                                        <div class="col-md-3 col-sm-4 form-control-label">
                                            <label for="jawatan">Jawatan</label>
                                        </div>
                                        <div class="col-md-9 col-sm-8">
                                            <div class="form-group mb-2">
                                                <input type="text" id="jawatan" `+(stat_jawatan == "ON" ? "required" : "")+` class="form-control" placeholder="Jawatan">
                                            </div>
                                        </div>
                                    </div>`;
                    }

                    if(emel == 1){
                        append   += `<div class="row clearfix g-3">
                                        <div class="col-md-3 col-sm-4 form-control-label">
                                            <label for="emel">Emel</label>
                                        </div>
                                        <div class="col-md-9 col-sm-8">
                                            <div class="form-group mb-2">
                                                <input type="text" id="emel" `+(stat_emel == "ON" ? "required" : "")+` class="form-control" placeholder="Emel">
                                            </div>
                                        </div>
                                    </div>`;
                    }

                    if(no_angka_giliran == 1){
                        append   += `<div class="row clearfix g-3">
                                        <div class="col-md-3 col-sm-4 form-control-label">
                                            <label for="no_angka_giliran">No. Angka Giliran</label>
                                        </div>
                                        <div class="col-md-9 col-sm-8">
                                            <div class="form-group mb-2">
                                                <input type="text" id="no_angka_giliran" `+(stat_no_angka_giliran == "ON" ? "required" : "")+` class="form-control" placeholder="No. Angka Giliran">
                                            </div>
                                        </div>
                                    </div>`;
                    }

                    if(notel == 1){
                        append   += `<div class="row clearfix g-3">
                                        <div class="col-md-3 col-sm-4 form-control-label">
                                            <label for="notel">No. Telefon</label>
                                        </div>
                                        <div class="col-md-9 col-sm-8">
                                            <div class="form-group mb-2">
                                                <input type="text" id="notel" `+(stat_notel == "ON" ? "required" : "")+` class="form-control" placeholder="No. Telefon">
                                            </div>
                                        </div>
                                    </div>`;
                    }

                    $('#penilaian-data-calon').html(append);

                }
            });
        }
    });
});

function load_siri_penilaian(form,returnValue){

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
        objSiri = JSON.parse(response);
        returnValue();
    });

    request.fail(function (response) {
        objSiri = response;
        returnValue();        
    });
}

function toggleCheckBox(nama_table){
    var checkBoxes = $("."+nama_table);
    if($("input[name='checkBoxtable_calonAll']").is(':checked')){
        checkBoxes.prop("checked", true);
    } else {
        checkBoxes.prop("checked", false);
    }
}

