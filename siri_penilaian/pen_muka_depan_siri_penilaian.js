$(function () {
    $.ajaxSetup({
        cache: false
    });
    checkSession();
    let token = window.localStorage.token;
    $("#leftsidebar").load('../aside/aside_detail_siri_penilaian.html');
    saveLog("View Page: Tetapan Muka Depan Siri Penilaian", sessionStorage.browser);
    let id_siri_penilaian = sessionStorage.id_siri_penilaian;
    resetForm();
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


    loadMukaDepan(id_siri_penilaian,token,function(){

        if(objMukaDepan.success){

            let data = objMukaDepan.data;

                createTinymce('arahan_textarea',data.arahan);

                $('#id_muka_depan').val(data.id_muka_depan);
                $('#FK_siri_penilaian').val(data.FK_siri_penilaian);
    
                setTableData(data.nama,data.stat_nama,data.no_kad_pengenalan,data.stat_no_kad_pengenalan,data.gred,data.stat_gred,data.jawatan,data.stat_jawatan,data.no_angka_giliran,data.stat_no_angka_giliran,data.emel,data.stat_emel);

        }else{
        
            $('#addField').removeClass('hidden');
            createTinymce('arahan_textarea','');
            setTableData(1,'OFF',0,'',0,'',0,'',0,'',0,''); //DEFAULT NAMA(SINGLE DATA)

            swal({
                title: "Tiada Muka Depan Yang Berdaftar",
                type: "info",
                showConfirmButton: false,
                allowOutsideClick: false,
                html: false,
                timer: 2000
            }).then(function(){},
                function (dismiss) {}
            );

        }

    });
    // users(noic_master,token,function(){
    //     if(dataUsers.success){
    //     }else{
    //         reject_load();
    //     }
    // });
});

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

function setTableData(nama,stat_nama,no_kad_pengenalan,stat_no_kad_pengenalan,gred,stat_gred,jawatan,stat_jawatan,no_angka_giliran,stat_no_angka_giliran,emel,stat_emel,notel,stat_notel){

    let list = []; 

    var columns = [
        // { "name": "bil", "title": "Bil" },
        // { "name": "label", "title": "Label" },
        { "name": "data_list", "title": "Data" },
        { "name": "status", "title": "Mandatory" },
        { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
        // {"name":"status","title":"Status","breakpoints":"sm xs"}
    ];

    loadDataCalon(token,function(){

        let data = objDataCalon.data;
        let data_runn = JSON.parse(JSON.stringify(data));

        let size = data.length - 1;
        let flag_nama = '',flag_no_kad_pengenalan = '',flag_gred = '',flag_jawatan = '',flag_emel = '',flag_no_angka_giliran = '',flag_notel = ''; 
        let bil = '';
        let append = '';

        $.each(JSON.parse(JSON.stringify(data)),function(i,item){

            switch(item.data_calon){
                case "nama" :
                    if(nama == 1){

                        if(bil !== 'undefined' && bil !== '') ++bil;
                        else bil = 0;

                        data_runn = JSON.parse(JSON.stringify(data_runn));

                        var index = data_runn.findIndex(object => {
                            return object.data_calon === 'nama';
                        });
                        
                        data_runn.splice(index,1);
                        list[bil] = [];
                        flag_nama = bil;


                    }
                break;

                case "no_kad_pengenalan" : 
                    if(no_kad_pengenalan == 1){
                        
                        if(bil !== 'undefined' && bil !== '') ++bil;
                        else bil = 0;

                        data_runn = JSON.parse(JSON.stringify(data_runn));

                        var index = data_runn.findIndex(object => {
                            return object.data_calon === 'no_kad_pengenalan';
                        });

                        data_runn.splice(index,1);
                        list[bil] = [];
                        flag_no_kad_pengenalan = bil;
                        

                    }
                break;

                case "gred" :
                    if(gred == 1){
                        
                        if(bil !== 'undefined' && bil !== '') ++bil;
                        else bil = 0;

                        data_runn = JSON.parse(JSON.stringify(data_runn));

                        var index = data_runn.findIndex(object => {
                            return object.data_calon === 'gred';
                        });
                        
                        data_runn.splice(index,1);
                        list[bil] = [];
                        flag_gred = bil;
                        

                    }
                break;

                case "jawatan" :
                    if(jawatan == 1){
                        
                        if(bil !== 'undefined' && bil !== '') ++bil;
                        else bil = 0;

                        data_runn = JSON.parse(JSON.stringify(data_runn));

                        var index = data_runn.findIndex(object => {
                            return object.data_calon === 'jawatan';
                        });

                        data_runn.splice(index,1);
                        list[bil] = [];
                        flag_jawatan = bil;
                        

                    }
                break;

                case "emel" :
                    if(emel == 1){
                        
                        if(bil !== 'undefined' && bil !== '') ++bil;
                        else bil = 0;

                        data_runn = JSON.parse(JSON.stringify(data_runn));

                        var index = data_runn.findIndex(object => {
                            return object.data_calon === 'emel';
                        });

                        data_runn.splice(index,1);
                        list[bil] = [];
                        flag_emel = bil;
                        

                    }
                break;

                case "no_angka_giliran" :
                    if(no_angka_giliran == 1){
                        
                        if(bil !== 'undefined' && bil !== '') ++bil;
                        else bil = 0;
                        
                        data_runn = JSON.parse(JSON.stringify(data_runn));

                        var index = data_runn.findIndex(object => {
                            return object.data_calon === 'no_angka_giliran';
                        });

                        data_runn.splice(index,1);
                        list[bil] = [];
                        flag_no_angka_giliran = bil;
                        
                        
                    }
                break;

                case "notel" :
                    if(notel == 1){
                        
                        if(bil !== 'undefined' && bil !== '') ++bil;
                        else bil = 0;
                        
                        data_runn = JSON.parse(JSON.stringify(data_runn));

                        var index = data_runn.findIndex(object => {
                            return object.data_calon === 'notel';
                        });

                        data_runn.splice(index,1);
                        list[bil] = [];
                        flag_notel= bil;
                        
                        
                    }
                break;

                default: ++bil; break;
            }
            
            if(i == size){

                if(data_runn.length > 0){
                    $.each(data_runn,function(k,items){
    
                        append += '<option value="'+items.data_calon+'">'+items.label+'</option>';
    
                        if(k == (data_runn.length - 1)){

                            if ($.isNumeric(flag_nama) === true) { 
    
                                list[flag_nama] = {
                                    label       : "Nama",
                                    flag        : stat_nama,
                                    data_calon  : "nama",
                                    data_list   : "<select onchange='setList("+flag_nama+")' class='form-control' id='data_"+flag_nama+"' ><option selected value='nama'>Nama</option>"+append+"</select>",
                                    status      : '<div class="material-switch"><input onclick="changeColor('+ flag_nama +',`'+ stat_nama +'`)" id="switch_del_'+flag_nama+'" ' + (stat_nama == "ON" ? "checked" : "") + ' " type="checkbox"/><label for="switch_del_'+flag_nama+'" id="label_switch_'+flag_nama+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_'+flag_nama+'" class="badge ' + (stat_nama == "ON" ? "badge-success" : "badge-danger") + '">' + (stat_nama == "ON" ? "Wajib" : "Tidak Wajib") + '</span></div><input type="text" value="'+stat_nama+'" class="form-control  hidden" id="stat_'+flag_nama+'">',
                                    upt_btn     : '<button class="btn btn-danger" type="button" onclick="remData('+flag_nama+')" id="del_'+flag_nama+'"><i class="fa fa-trash"></i></button>'
                                };

                            }
                            
                            if ($.isNumeric(flag_no_kad_pengenalan) === true) { 

                                list[flag_no_kad_pengenalan] = { 
                                    label       : "No. Kad Pengenalan",
                                    flag        : stat_no_kad_pengenalan,
                                    data_calon  : "no_kad_pengenalan",
                                    data_list   : "<select onchange='setList("+flag_no_kad_pengenalan+")' class='form-control' id='data_"+flag_no_kad_pengenalan+"'><option selected value='no_kad_pengenalan'>No. Kad Pengenalan</option>"+append+"</select>",
                                    status      : '<div class="material-switch"><input onclick="changeColor('+ flag_no_kad_pengenalan +',`'+ stat_no_kad_pengenalan +'`)"  id="switch_del_'+flag_no_kad_pengenalan+'" ' + (stat_no_kad_pengenalan == "ON" ? "checked" : "") + ' " type="checkbox"/><label for="switch_del_'+flag_no_kad_pengenalan+'" id="label_switch_'+flag_no_kad_pengenalan+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_'+flag_no_kad_pengenalan+'" class="badge ' + (stat_no_kad_pengenalan == "ON" ? "badge-success" : "badge-danger") + '">' + (stat_no_kad_pengenalan == "ON" ? "Wajib" : "Tidak Wajib") + '</span></div><input type="text" value="'+stat_no_kad_pengenalan+'" class="form-control  hidden" id="stat_'+flag_no_kad_pengenalan+'">',
                                    upt_btn     : '<button class="btn btn-danger" type="button" onclick="remData('+flag_no_kad_pengenalan+')" id="del_'+flag_no_kad_pengenalan+'"><i class="fa fa-trash"></i></button>'
                                }

                            }
                            
                            if ($.isNumeric(flag_gred) === true) { 
                                
                                list[flag_gred] = {
                                    label       : "Gred",
                                    flag        : stat_gred,
                                    data_calon  : "gred",
                                    data_list   : "<select onchange='setList("+flag_gred+")' class='form-control' id='data_"+flag_gred+"'><option selected value='gred'>Gred</option>"+append+"</select>",
                                    status      : '<div class="material-switch"><input onclick="changeColor('+ flag_gred +',`'+ stat_gred +'`)"  id="switch_del_'+flag_gred+'" ' + (stat_gred == "ON" ? "checked" : "") + ' " type="checkbox"/><label for="switch_del_'+flag_gred+'" id="label_switch_'+flag_gred+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_'+flag_gred+'" class="badge ' + (stat_gred == "ON" ? "badge-success" : "badge-danger") + '">' + (stat_gred == "ON" ? "Wajib" : "Tidak Wajib") + '</span></div><input type="text" value="'+stat_gred+'" class="form-control  hidden" id="stat_'+flag_gred+'">',
                                    upt_btn     : '<button class="btn btn-danger" type="button" onclick="remData('+flag_gred+')" id="del_'+flag_gred+'"><i class="fa fa-trash"></i></button>' 
                                }
                                
                            }
                            
                            if ($.isNumeric(flag_jawatan) === true) { 
                                
                                list[flag_jawatan] = { 
                                    label       : "Jawatan",
                                    flag        : stat_jawatan,
                                    data_calon  : "jawatan",
                                    data_list   : "<select onchange='setList("+flag_jawatan+")' class='form-control' id='data_"+flag_jawatan+"'><option selected value='jawatan'>Jawatan</option>"+append+"</select>",
                                    status      : '<div class="material-switch"><input onclick="changeColor('+ flag_jawatan +',`'+ stat_jawatan +'`)" id="switch_del_'+flag_jawatan+'" ' + (stat_jawatan == "ON" ? "checked" : "") + ' " type="checkbox"/><label for="switch_del_'+flag_jawatan+'" id="label_switch_'+flag_jawatan+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_'+flag_jawatan+'" class="badge ' + (stat_jawatan == "ON" ? "badge-success" : "badge-danger") + '">' + (stat_jawatan == "ON" ? "Wajib" : "Tidak Wajib") + '</span></div><input type="text" value="'+stat_jawatan+'" class="form-control  hidden" id="stat_'+flag_jawatan+'">',
                                    upt_btn     : '<button class="btn btn-danger" type="button" onclick="remData('+flag_jawatan+')" id="del_'+flag_jawatan+'"><i class="fa fa-trash"></i></button>' 
                                }
                            
                            }
                            
                            if ($.isNumeric(flag_no_angka_giliran) === true) {
                                
                                list[flag_no_angka_giliran] = { 
                                    label       : "No. Angka Giliran",
                                    flag        : stat_no_angka_giliran,
                                    data_calon  : "no_angka_giliran",
                                    data_list   : "<select onchange='setList("+flag_no_angka_giliran+")' class='form-control' id='data_"+flag_no_angka_giliran+"'><option selected value='no_angka_giliran'>No. Angka Giliran</option>"+append+"</select>",
                                    status      : '<div class="material-switch"><input onclick="changeColor('+ flag_no_angka_giliran +',`'+ stat_no_angka_giliran +'`)" id="switch_del_'+flag_no_angka_giliran+'" ' + (stat_no_angka_giliran == "ON" ? "checked" : "") + ' " type="checkbox"/><label for="switch_del_'+flag_no_angka_giliran+'" id="label_switch_'+flag_no_angka_giliran+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_'+flag_no_angka_giliran+'" class="badge ' + (stat_no_angka_giliran == "ON" ? "badge-success" : "badge-danger") + '">' + (stat_no_angka_giliran == "ON" ? "Wajib" : "Tidak Wajib") + '</span></div><input type="text" value="'+stat_no_angka_giliran+'" class="form-control  hidden" id="stat_'+flag_no_angka_giliran+'">',
                                    upt_btn     : '<button class="btn btn-danger" type="button" onclick="remData('+flag_no_angka_giliran+')" id="del_'+flag_no_angka_giliran+'"><i class="fa fa-trash"></i></button>'
                                }
                            
                            }
                            
                            if ($.isNumeric(flag_emel) === true) { 
                                
                                list[flag_emel] = { 
                                    label       : "Emel",
                                    flag        : stat_emel,
                                    data_calon  : "emel",
                                    data_list   : "<select onchange='setList("+flag_emel+")' class='form-control' id='data_"+flag_emel+"'><option selected value='emel'>Emel</option>"+append+"</select>",
                                    status      : '<div class="material-switch"><input onclick="changeColor('+ flag_emel +',`'+ stat_emel +'`)" id="switch_del_'+flag_emel+'" ' + (stat_emel == "ON" ? "checked" : "") + ' " type="checkbox"/><label for="switch_del_'+flag_emel+'" id="label_switch_'+flag_emel+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_'+flag_emel+'" class="badge ' + (stat_emel == "ON" ? "badge-success" : "badge-danger") + '">' + (stat_emel == "ON" ? "Wajib" : "Tidak Wajib") + '</span></div><input type="text" value="'+stat_emel+'" class="form-control  hidden" id="stat_'+flag_emel+'">',
                                    upt_btn     : '<button class="btn btn-danger" type="button" onclick="remData('+flag_emel+')" id="del_'+flag_emel+'"><i class="fa fa-trash"></i></button>' 
                                }
                            
                            }

                            if ($.isNumeric(flag_notel) === true) { 
                                
                                list[flag_notel] = { 
                                    label       : "No. Telefon",
                                    flag        : flag_notel,
                                    data_calon  : "notel",
                                    data_list   : "<select onchange='setList("+flag_notel+")' class='form-control' id='data_"+flag_notel+"'><option selected value='notel'>No. Telefon</option>"+append+"</select>",
                                    status      : '<div class="material-switch"><input onclick="changeColor('+ flag_notel +',`'+ stat_notel +'`)" id="switch_del_'+flag_notel+'" ' + (stat_notel == "ON" ? "checked" : "") + ' " type="checkbox"/><label for="switch_del_'+flag_notel+'" id="label_switch_'+flag_notel+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_'+flag_notel+'" class="badge ' + (stat_notel == "ON" ? "badge-success" : "badge-danger") + '">' + (stat_notel == "ON" ? "Wajib" : "Tidak Wajib") + '</span></div><input type="text" value="'+stat_notel+'" class="form-control  hidden" id="stat_'+flag_notel+'">',
                                    upt_btn     : '<button class="btn btn-danger" type="button" onclick="remData('+flag_notel+')" id="del_'+flag_notel+'"><i class="fa fa-trash"></i></button>' 
                                }
                            
                            }
    
                            list = JSON.parse(JSON.stringify(list).replace("[null,","["));
                            
                            $('#dataSenarai').val(JSON.stringify(data_runn));
                            $('#dataRunningSenarai').val(JSON.stringify(list));
    
                            if(data_runn.length > 0){
                                $('#addField').removeClass('hidden');
                            }
    
                            $("#listSenarai").footable({
                                "columns": columns,
                                "rows": list,
                                "paging": {
                                    "enabled": true,
                                    "size": 10
                                }
                            });
                
                        }
    
                    });
                }else{

                    if ($.isNumeric(flag_nama) === true) { 
    
                        list[flag_nama] ={
                            label       : "Nama",
                            flag        : stat_nama,
                            data_calon  : "nama",
                            data_list   : "<select onchange='setList("+flag_nama+")' class='form-control' id='data_"+flag_nama+"' ><option selected value='nama'>Nama</option>"+append+"</select>",
                            status      : '<div class="material-switch"><input onclick="changeColor('+ flag_nama +',`'+ stat_nama +'`)" id="switch_del_'+flag_nama+'" ' + (stat_nama == "ON" ? "checked" : "") + ' " type="checkbox"/><label for="switch_del_'+flag_nama+'" id="label_switch_'+flag_nama+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_nama" class="badge ' + (stat_nama == "ON" ? "badge-success" : "badge-danger") + '">' + (stat_nama == "ON" ? "Wajib" : "Tidak Wajib") + '</span></div><input type="text" value="'+stat_nama+'" class="form-control  hidden" id="stat_'+flag_nama+'">',
                            upt_btn     : '<button class="btn btn-danger" type="button" onclick="remData('+flag_nama+')" id="del_'+flag_nama+'"><i class="fa fa-trash"></i></button>'
                        };
                    }
                    
                    if ($.isNumeric(flag_no_kad_pengenalan) === true) { 

                        list[flag_no_kad_pengenalan] = { 
                            label       : "No. Kad Pengenalan",
                            flag        : stat_no_kad_pengenalan,
                            data_calon  : "no_kad_pengenalan",
                            data_list   : "<select onchange='setList("+flag_no_kad_pengenalan+")' class='form-control' id='data_"+flag_no_kad_pengenalan+"'><option selected value='no_kad_pengenalan'>No. Kad Pengenalan</option>"+append+"</select>",
                            status      : '<div class="material-switch"><input onclick="changeColor('+ flag_no_kad_pengenalan +',`'+ stat_no_kad_pengenalan +'`)"  id="switch_del_'+flag_no_kad_pengenalan+'" ' + (stat_no_kad_pengenalan == "ON" ? "checked" : "") + ' " type="checkbox"/><label for="switch_del_'+flag_no_kad_pengenalan+'" id="label_switch_'+flag_no_kad_pengenalan+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_'+flag_no_kad_pengenalan+'" class="badge ' + (stat_no_kad_pengenalan == "ON" ? "badge-success" : "badge-danger") + '">' + (stat_no_kad_pengenalan == "ON" ? "Wajib" : "Tidak Wajib") + '</span></div><input type="text" value="'+stat_no_kad_pengenalan+'" class="form-control  hidden" id="stat_'+flag_no_kad_pengenalan+'">',
                            upt_btn     : '<button class="btn btn-danger" type="button" onclick="remData('+flag_no_kad_pengenalan+')" id="del_'+flag_no_kad_pengenalan+'"><i class="fa fa-trash"></i></button>'
                        }
                    }
                    
                    if ($.isNumeric(flag_gred) === true) { 
                        
                        list[flag_gred] = {
                            label       : "Gred",
                            flag        : stat_gred,
                            data_calon  : "gred",
                            data_list   : "<select onchange='setList("+flag_gred+")' class='form-control' id='data_"+flag_gred+"'><option selected value='gred'>Gred</option>"+append+"</select>",
                            status      : '<div class="material-switch"><input onclick="changeColor('+ flag_gred +',`'+ stat_gred +'`)"  id="switch_del_'+flag_gred+'" ' + (stat_gred == "ON" ? "checked" : "") + ' " type="checkbox"/><label for="switch_del_'+flag_gred+'" id="label_switch_'+flag_gred+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_'+flag_gred+'" class="badge ' + (stat_gred == "ON" ? "badge-success" : "badge-danger") + '">' + (stat_gred == "ON" ? "Wajib" : "Tidak Wajib") + '</span></div><input type="text" value="'+stat_gred+'" class="form-control  hidden" id="stat_'+flag_gred+'">',
                            upt_btn     : '<button class="btn btn-danger" type="button" onclick="remData('+flag_gred+')" id="del_'+flag_gred+'"><i class="fa fa-trash"></i></button>' 
                        }
                    }
                    
                    if ($.isNumeric(flag_jawatan) === true) { 
                        
                        list[flag_jawatan] = { 
                            label       : "Jawatan",
                            flag        : stat_jawatan,
                            data_calon  : "jawatan",
                            data_list   : "<select onchange='setList("+flag_jawatan+")' class='form-control' id='data_"+flag_jawatan+"'><option selected value='jawatan'>Jawatan</option>"+append+"</select>",
                            status      : '<div class="material-switch"><input onclick="changeColor('+ flag_jawatan +',`'+ stat_jawatan +'`)" id="switch_del_'+flag_jawatan+'" ' + (stat_jawatan == "ON" ? "checked" : "") + ' " type="checkbox"/><label for="switch_del_'+flag_jawatan+'" id="label_switch_'+flag_jawatan+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_'+flag_jawatan+'" class="badge ' + (stat_jawatan == "ON" ? "badge-success" : "badge-danger") + '">' + (stat_jawatan == "ON" ? "Wajib" : "Tidak Wajib") + '</span></div><input type="text" value="'+stat_jawatan+'" class="form-control  hidden" id="stat_'+flag_jawatan+'">',
                            upt_btn     : '<button class="btn btn-danger" type="button" onclick="remData('+flag_jawatan+')" id="del_'+flag_jawatan+'"><i class="fa fa-trash"></i></button>' 
                        }
                    
                    }
                    
                    if ($.isNumeric(flag_no_angka_giliran) === true) {
                        
                        list[flag_no_angka_giliran] = { 
                            label       : "No. Angka Giliran",
                            flag        : stat_no_angka_giliran,
                            data_calon  : "no_angka_giliran",
                            data_list   : "<select onchange='setList("+flag_no_angka_giliran+")' class='form-control' id='data_"+flag_no_angka_giliran+"'><option selected value='no_angka_giliran'>No. Angka Giliran</option>"+append+"</select>",
                            status      : '<div class="material-switch"><input onclick="changeColor('+ flag_no_angka_giliran +',`'+ stat_no_angka_giliran +'`)" id="switch_del_'+flag_no_angka_giliran+'" ' + (stat_no_angka_giliran == "ON" ? "checked" : "") + ' " type="checkbox"/><label for="switch_del_'+flag_no_angka_giliran+'" id="label_switch_'+flag_no_angka_giliran+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_'+flag_no_angka_giliran+'" class="badge ' + (stat_no_angka_giliran == "ON" ? "badge-success" : "badge-danger") + '">' + (stat_no_angka_giliran == "ON" ? "Wajib" : "Tidak Wajib") + '</span></div><input type="text" value="'+stat_no_angka_giliran+'" class="form-control  hidden" id="stat_'+flag_no_angka_giliran+'">',
                            upt_btn     : '<button class="btn btn-danger" type="button" onclick="remData('+flag_no_angka_giliran+')" id="del_'+flag_no_angka_giliran+'"><i class="fa fa-trash"></i></button>'
                        }
                    
                    }
                    
                    if ($.isNumeric(flag_emel) === true) { 
                        
                        list[flag_emel] = { 
                            label       : "Emel",
                            flag        : stat_emel,
                            data_calon  : "emel",
                            data_list   : "<select onchange='setList("+flag_emel+")' class='form-control' id='data_"+flag_emel+"'><option selected value='emel'>Emel</option>"+append+"</select>",
                            status      : '<div class="material-switch"><input onclick="changeColor('+ flag_emel +',`'+ stat_emel +'`)" id="switch_del_'+flag_emel+'" ' + (stat_emel == "ON" ? "checked" : "") + ' " type="checkbox"/><label for="switch_del_'+flag_emel+'" id="label_switch_'+flag_emel+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_'+flag_emel+'" class="badge ' + (stat_emel == "ON" ? "badge-success" : "badge-danger") + '">' + (stat_emel == "ON" ? "Wajib" : "Tidak Wajib") + '</span></div><input type="text" value="'+stat_emel+'" class="form-control  hidden" id="stat_'+flag_emel+'">',
                            upt_btn     : '<button class="btn btn-danger" type="button" onclick="remData('+flag_emel+')" id="del_'+flag_emel+'"><i class="fa fa-trash"></i></button>' 
                        }
                    
                    }

                    if ($.isNumeric(flag_notel) === true) { 
                        
                        list[flag_notel] = { 
                            label       : "No. Telefon",
                            flag        : stat_notel,
                            data_calon  : "notel",
                            data_list   : "<select onchange='setList("+flag_notel+")' class='form-control' id='data_"+flag_notel+"'><option selected value='notel'>No. Telefon</option>"+append+"</select>",
                            status      : '<div class="material-switch"><input onclick="changeColor('+ flag_notel +',`'+ stat_notel +'`)" id="switch_del_'+flag_notel+'" ' + (stat_notel == "ON" ? "checked" : "") + ' " type="checkbox"/><label for="switch_del_'+flag_notel+'" id="label_switch_'+flag_notel+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_'+flag_notel+'" class="badge ' + (stat_notel == "ON" ? "badge-success" : "badge-danger") + '">' + (stat_notel == "ON" ? "Wajib" : "Tidak Wajib") + '</span></div><input type="text" value="'+stat_notel+'" class="form-control  hidden" id="stat_'+flag_notel+'">',
                            upt_btn     : '<button class="btn btn-danger" type="button" onclick="remData('+flag_notel+')" id="del_'+flag_notel+'"><i class="fa fa-trash"></i></button>' 
                        }
                    
                    }

                    list = JSON.parse(JSON.stringify(list).replace("[null,","["));
                    
                    $('#dataSenarai').val(JSON.stringify(data_runn));
                    $('#dataRunningSenarai').val(JSON.stringify(list));

                    if(data_runn.length > 0){
                        $('#addField').removeClass('hidden');
                    }

                    $("#listSenarai").footable({
                        "columns": columns,
                        "rows": list,
                        "paging": {
                            "enabled": true,
                            "size": 10
                        }
                    });

                }
                
            }
        });

    })

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
              type: "info",
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

function loadMukaDepan(id_siri_penilaian,token,returnValue){

    var form = new FormData();
    form.append('id_siri_penilaian', id_siri_penilaian);

    var settings = {
        "url": host+"muka_depan/view",
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

        objMukaDepan = JSON.parse(response);
        returnValue();

      });

      request.fail(function (response) {

        objMukaDepan = response;
        returnValue();

      });

}

function tableDataMukaDepan(id_siri_penilaian,token){

    var columns = [
        { "name": "bil", "title": "Bil" },
        { "name": "data_calon", "title": "Kod Siri Penilaian" },
        { "name": "mandatori", "title": "No. Siri Penilaian" },
        { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
        // {"name":"status","title":"Status","breakpoints":"sm xs"}
    ];

    var form = new FormData();
    form.append('FK_muka_depan', id_siri_penilaian);
    var settings = {
        "url": host + "siri_penilaian/listByPen2ilaian",
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
    
}

function loadSenaraiData(token,returnValue){

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
        objData = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
        swal({
            title: "Tiada Rekod Data",
            // text: "Berjaya Kemaskini Profile!",
            type: "info",
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

var confirmed = false;

// FUNCTION REGISTER

$("#process").on('submit', function (e) {
    let token = localStorage.token;
    let $this = $(this);
    let process = 'add';

    let id_muka_depan = $('#id_muka_depan').val();
    let text = (id_muka_depan === "" ? "Pendaftaran" : "Kemaskini")
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: text+" Muka Depan Siri Penilaian",
            text: "Anda Pasti Untuk "+text+"?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {
            let id = sessionStorage.id_siri_penilaian;
            // let arahan = $("#arahan").val();
            let arahan_textarea = tinymce.get('arahan_textarea').getContent();
            let list = JSON.parse($('#dataRunningSenarai').val()); let length = list.length; let size = length - 1;

            var forms = new FormData();
            forms.append("FK_siri_penilaian", id);
            forms.append("arahan", arahan_textarea);
            forms.append("updated_by", id_users_master);

            if(id_muka_depan !== ''){ forms.append("id_muka_depan", id_muka_depan); process = 'update'; }
            
            pen_muka_depan_siri_penilaianProcess(process,forms,function(){
                result = objProcess;

                if (result.success) {

                    // localStorage.token = result.token;
                    token = localStorage.token;

                    let id_inserted = result.data;
                    let flag_nama = 0;                  let stat_nama = 'OFF';
                    let flag_no_kad_pengenalan = 0;     let stat_no_kad_pengenalan = 'OFF';
                    let flag_gred = 0;                  let stat_gred = 'OFF';
                    let flag_jawatan = 0;               let stat_jawatan = 'OFF';
                    let flag_emel = 0;                  let stat_emel = 'OFF';
                    let flag_no_angka_giliran = 0;      let stat_no_angka_giliran = 'OFF';
                    let flag_notel = 0;                 let stat_notel = 'OFF';

                    console.log(list);
                    console.log(id_inserted);
                    $.each(list,function(i, item){
                        
                        switch(item.data_calon){
                            case "nama":
                                flag_nama = 1; stat_nama = item.flag;
                                break;
                            case "no_kad_pengenalan":
                                flag_no_kad_pengenalan = 1; stat_no_kad_pengenalan = item.flag;
                                break;
                            case "gred":
                                flag_gred = 1; stat_gred = item.flag;
                                break;
                            case "jawatan":
                                flag_jawatan = 1; stat_jawatan = item.flag;
                                break;
                            case "emel":
                                flag_emel = 1; stat_emel = item.flag;
                                break;
                            case "no_angka_giliran":
                                flag_no_angka_giliran = 1; stat_no_angka_giliran = item.flag;
                                break;
                            case "notel":
                                flag_notel = 1; stat_notel = item.notel;
                                break;
                        }

                        if(i == size){

                            var form = new FormData();
                            form.append('id_muka_depan', id_inserted);                    
                            form.append('nama', flag_nama);                                
                            form.append('stat_nama', stat_nama);                            
                            form.append('no_kad_pengenalan', flag_no_kad_pengenalan);       
                            form.append('stat_no_kad_pengenalan', stat_no_kad_pengenalan);  
                            form.append('gred', flag_gred);                                 
                            form.append('stat_gred', stat_gred);                            
                            form.append('jawatan', flag_jawatan);                           
                            form.append('stat_jawatan', stat_jawatan);                      
                            form.append('emel', flag_emel);                                 
                            form.append('stat_emel', stat_emel);                            
                            form.append('no_angka_giliran', flag_no_angka_giliran);         
                            form.append('stat_no_angka_giliran', stat_no_angka_giliran);    
                            form.append('notel', flag_notel);         
                            form.append('stat_notel', stat_notel);    
                            form.append("updated_by", id_users_master);                     

                            // token = result.token;


                            pen_data_calonUpdate(form,token,function(){

                                if(objData.success){
                                    

                                    // localStorage.token = objData.token;
                                    // token = objData.token;

                                    swal({
                                        title: text+" Muka Depan Siri Penilaian",
                                        text: "Berjaya!",
                                        type: "success",
                                        closeOnConfirm: true,
                                        allowOutsideClick: false,
                                        html: false
                                    }).then(function () {
                                        document.getElementById('process').reset();

                                        loadMukaDepan(id,token,function(){
                                            
                                            if(objMukaDepan.success){
                                                
                                                let data = objMukaDepan.data;
                            
                                                tinymce.remove("textarea#arahan_textarea");
                                                    createTinymce('arahan_textarea',data.arahan);
                                                    
                                                    $('#id_muka_depan').val(data.id_muka_depan);
                                                    $('#FK_siri_penilaian').val(data.FK_siri_penilaian);
                                        
                                                    setTableData(data.nama,data.stat_nama,data.no_kad_pengenalan,data.stat_no_kad_pengenalan,data.gred,data.stat_gred,data.jawatan,data.stat_jawatan,data.no_angka_giliran,data.stat_no_angka_giliran,data.emel,data.stat_emel,data.notel,data.stat_notel);
                            
                                            }else{
                                                $('#addField').removeClass('hidden');
                                                createTinymce('arahan_textarea','');
                            
                                            }
                            
                                        });
                                        
                                        // tableSiriPenilaian(token);
                                    });
                                }else{
                                    console.log('done 9');
                                    swal({
                                        title: text+" Muka Depan Siri Penilaian ",
                                        text: "Gagal!",
                                        type: "error",
                                        closeOnConfirm: true,
                                        allowOutsideClick: false,
                                        html: false
                                    }).then(function () {
                                        loadMukaDepan(id,token,function(){

                                            if(objMukaDepan.success){
                            
                                                let data = objMukaDepan.data;
                            
                                                    // createTinymce('arahan_textarea',data.arahan);
                            
                                                    $('#id_muka_depan').val(data.id_muka_depan);
                                                    $('#FK_siri_penilaian').val(data.FK_siri_penilaian);
                                        
                                                    setTableData(data.nama,data.stat_nama,data.no_kad_pengenalan,data.stat_no_kad_pengenalan,data.gred,data.stat_gred,data.jawatan,data.stat_jawatan,data.no_angka_giliran,data.stat_no_angka_giliran,data.emel,data.stat_emel,data.notel,data.stat_notel);
                            
                                            }else{
                            
                                                $('#addField').removeClass('hidden');
                                                // createTinymce('arahan_textarea','');
                            
                                            }
                            
                                        });
                                        
                                        // tableSiriPenilaian(token);
                                    });   
                                }
                            });
                        }
                        
                    });
                    
                } else {
                    console.log('haii');
                    swal({
                        title: text+" Muka Depan Siri Penilaian",
                        text: "Gagal!",
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function () {
                        document.getElementById('process').reset();
                        // $("#modaldaftarsiripenilaian").modal('hide');
                    });              
                }
            });
        });
    }
});

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

function details(id){

    sessionStorage.id_penilaian = id;

    window.sessionStorage.child = "516d3532d70fde6af5d573655d774419";
    checkAuthentication(window.sessionStorage.child);   

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
    console.log(list);
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
                        flag        : "ON",
                        data_calon  : list[0].data_calon,
                        data_list   : "<select onchange='setList("+size_list_runn+")' class='form-control' id='data_"+size_list_runn+"'>"+append+"</select>",
                        status      : '<div class="material-switch"><input onclick="changeColor('+ size_list_runn +',`ON`)" checked id="switch_del_'+size_list_runn+'" " type="checkbox"/><label for="switch_del_'+size_list_runn+'" id="label_switch_'+size_list_runn+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_'+size_list_runn+'" class="badge badge-success">Wajib</span></div><input type="text" value="ON" class="form-control  hidden" id="stat_'+size_list_runn+'">',
                        // status      : '<div class="material-switch"><input onclick="changeColor('+ size_list_runn +',`OFF`)" id="switch_del_'+size_list_runn+'" " type="checkbox"/><label for="switch_del_'+size_list_runn+'" id="label_switch_'+size_list_runn+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_'+size_list_runn+'" class="badge badge-danger">Tidak Wajib</span></div><input type="text" value="OFF" class="form-control  hidden" id="stat_'+size_list_runn+'">',
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
                        flag       : 'ON',
                        // flag       : list_runn[k].flag,
                        data_calon  : list_runn[k].data_calon,
                        data_list   : "<select onchange='setList("+k+")' class='form-control' id='data_"+k+"'><option value='"+list_runn[k].data_calon+"' selected>"+list_runn[k].label+"</option>"+append_old+"</select>",
                        // status      : '<div class="material-switch"><input onclick="changeColor('+ k +',ON)" id="switch_del_'+k+'" checked " type="checkbox"/><label for="switch_del_'+k+'" id="label_switch_'+k+'" class="label-success"></label><span style="font-size: 8px;" id="text_statusrekod_'+k+'" class="badge badge-success">Wajib</span></div><input type="text" value="ON" class="form-control  hidden" id="stat_'+k+'">',
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
    
    $('#modalPreviewMukaDepan').modal('show');
    
    let append = `<div class="row clearfix g-3">
                    <div class="col-md-12 col-sm-12">
                        <label for="data-calon">Sila lengkapkan maklumat calon sebelum memulakan Ujian</label>
                    </div>
                </div>`;
    let id = $('#FK_siri_penilaian').val();

    load_siri_penilaian(id,window.localStorage.token,function(){
        if(objSiriPenilaian.success){

            let data = objSiriPenilaian.data;

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
                    $('#penilaian-logo-bersemuka').html('').append(`<img src="`+path+logo+`" style="width:150px; height:100%" class="img-fluid img-thumbnail mt-5">`);
                    $('#penilaian-title').html(` 
                        <span class="fw-bolder text-30  lh-1">`+nama_kluster+`</span>
                    `);
                    $('#penilaian-title-bersemuka').html(` 
                        <span class="fw-bolder text-30 text-decoration-underline lh-base">`+nama_penilaian+` (`+kod_penilaian+`)</span><br/>
                        <span class="fw-bolder text-20  lh-1">`+nama_kluster+`</span>
                        <span class="" id="arahan_muka_depan">`+arahan+`</span>
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
                                            <label for="emel">No. Angka Giliran</label>
                                        </div>
                                        <div class="col-md-9 col-sm-8">
                                            <div class="form-group mb-2">
                                                <input type="text" id="no_angka_giliran" `+(stat_no_angka_giliran == "ON" ? "required" : "")+` class="form-control" placeholder="No. Angka Giliran">
                                            </div>
                                        </div>
                                    </div>`;
                    //     append   += `<div class="row clearfix g-3">
                    //     <div class="modal modal-fullscreen fade" id="modalPreviewMukaDepan" tabindex="-1" role="dialog">
                    //     <div class="modal-dialog modal-lg" role="document">
                    //         <div class="modal-content px-3">
                    //             <div class="modal-header justify-content-center- pb-0">
                    //                 <!-- <h4 class="title" id="largeModalLabel">Previu Muka Depan</h4> -->
                    //                 <ul class="nav nav-tabs">
                    //                     <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#online"><i class="fa fa-desktop"></i> Atas Talian</a></li>
                    //                     <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#offline"><i class="fa fa-users"></i> Bersemuka</a></li>
                    //                 </ul> 
                    //             </div>
                    //             <hr>
            
                    //             <div class="modal-body py-0">
                                                           
                    //                 <!-- Tab panes -->
                    //                 <div class="tab-content py-4">
                    //                     <div role="tabpanel" class="tab-pane in active" id="online"> <b></b>
                    //                         <div class="col-md-12 container">
                    //                             <div class="row align-items-center" >
                    //                                 <div class="col-12 px-4 py-2">
                    //                                     <div class="row vertical-align">
                    //                                         <div class="col-md-12" id="penilaian-title" ></div>
                    //                                         <div class="col-md-4 mt-3" id="penilaian-logo"></div>
                    //                                         <div class="col-md-8 mt-5" id="penilaian-data-calon" ></div>
                    //                                         <div class="col-md-12 mt-4" id="penilaian-arahan" ></div>
                    //                                     </div>
                    //                                 </div>
                    //                             </div>
                    //                         </div>
                    //                     </div>
                    //                     <div role="tabpanel" class="tab-pane" id="offline"> <b>Paparan Bersemuka</b>
                    //                         <div class="col-md-12 container">
                    //                             <div class="row align-items-center" >
                    //                                 <div class="col-12 px-4 py-2">
                    //                                     <div class="row vertical-align">
                    //                                         <div class="col-md-12" id="penilaian-title" style="border:solid 1px black; height:850px; width:600px" >
                    //                                             <div class="col-md-12  text-center" id="penilaian-logo-bersemuka"></div>
                    //                                             <div class="col-md-12" id="penilaian-title-bersemuka" ></div>
                    //                                             <div class="col-md-12 mt-4" id="penilaian-data-calon-bersemuka" ></div>
                    //                                         </div>
                    //                                     </div>
                    //                                 </div>
                    //                             </div>
                    //                         </div>
                    //                     </div>
                    //                 </div>
                    //             </div>
                    //             <div class="modal-footer">
                    //                 <!-- <button type="button" class="btn btn-default btn-round waves-effect">SAVE CHANGES</button> -->
                    //                 <button type="button" class="btn btn-danger btn-simple btn-round waves-effect" data-bs-dismiss="modal">TUTUP</button>
                    //             </div>
                    //         </div>
                    //     </div>
                    // </div>
                    //                             <input type="text" id="no_angka_giliran" `+(stat_no_angka_giliran == "ON" ? "required" : "")+` class="form-control" placeholder="No. Angka Giliran">
                    //                         </div>
                    //                     </div>
                    //                 </div>`;
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
                    $('#penilaian-data-calon-bersemuka').html(append);

                }
            });

            

            
        



        }
    });
});

// function load_siri_penilaian(form,returnValue){

//     var settings = {
//         "url": host+"siri_penilaian/show",
//         "method": "POST",
//         "timeout": 0,
//         "headers": {
//           "Authorization": window.localStorage.token
//         },
//         "processData": false,
//         "mimeType": "multipart/form-data",
//         "contentType": false,
//         "data": form
//       };

//     var request = $.ajax(settings);
//     request.done(function (response) {
//         objSiri = JSON.parse(response);
//         returnValue();
//     });

//     request.fail(function (response) {
//         objSiri = response;
//         returnValue();        
//     });
// }