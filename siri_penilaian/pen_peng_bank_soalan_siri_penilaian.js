$(function () {
    $.ajaxSetup({
        cache: false
    });
    checkSession();
    let token = window.localStorage.token;
    $("#leftsidebar").load('../aside/aside_detail_siri_penilaian.html');
    let id_siri_penilaian = sessionStorage.id_siri_penilaian;
    loads_data(id_siri_penilaian, token);
});

$("#choose_type").change(function(){
    if($(this).prop('checked')){
        $("#choose_docx").prop('checked',false);
        $("#choose_xlsx").prop('checked',false);
        $("#choose_pdf").prop('checked',false);
        $("#choose_pptx").prop('checked',false);
        $("#choose_dwg").prop('checked',false);
        $("#choose_jpg").prop('checked',false);
        $("#choose_mp3").prop('checked',false);
    }
    else{
        $("#choose_docx").prop('checked',true);
        $("#choose_xlsx").prop('checked',true);
        $("#choose_pdf").prop('checked',true);
        $("#choose_pptx").prop('checked',true);
        $("#choose_dwg").prop('checked',true);
        $("#choose_jpg").prop('checked',true);
        $("#choose_mp3").prop('checked',true);
    }
});

$("#bil_fail").change(function(){
    numbers = 1;
    let jawapan_form = '';
    $("#content_jawapan").prop('class','row');
    $("#content_jawapan").html(jawapan_form);
    let num = $(this).val();
    for(i=0;i<num;i++){
        jawapan_form += 
        `<div id="section_`+i+`">
            <div class="row mb-3">
                <div class="col-auto">
                    File `+numbers+`
                </div>
                <div class="col-auto">
                    <input type="file" class="form-control" id="file_`+i+`" />
                </div>
            </div>
        </div>`;

        numbers++;
    }
    $("#content_jawapan").append(jawapan_form).addClass('d-none');
    // console.log($("#content_jawapan"));
    $("#num_answers").val(numbers);
});

function viewList(id){

    // console.log(id);

    if($('#collapseOne_'+id).hasClass('show')){
        $('#collapseOne_'+id).removeClass('show');
        $('#collapse_'+id).removeClass('show');

        $('#collapse_'+id).html('');
    }else{
        $('#collapseOne_'+id).addClass('show');
        $('#collapse_'+id).addClass('show');

        list_infodetailsSoalan(id,window.localStorage.token,function(){
            if(obj_info.success){
                let data = obj_info.data;
    
                $.each(data,function(i,field){
                    $('#collapse_'+id).append(`
                        <div class="row">
                        <div class="col-6">
                            <!-- <h6 class="pt-3">`+field.kod_soalan+`</h6> -->
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-12">
                            <p>JENIS SOALAN : `+field.jenis_soalan+`&nbsp;&nbsp;&nbsp;&nbsp;TAHAP : `+field.tahap+`</p>
                            `+field.soalan+`
                            <small><i>`+field.topik+`</i></small>
                        </div>
                    </div><hr>
                    `)
                });
            }
        });
    }
    
}

function modalSoalanBerangkai(flag){

    // $('#modalSoalanBerangkai').modal('show');
    $("#tab_siri_soalan").addClass('d-none');
    $("#tab_soalan").addClass('d-none');
    $("#input_soalanBerangkai").removeClass('hidden');


    $('#btn_backSoalan').addClass('hidden');
    
    tinymce.remove("textarea#teks_textarea");

    tinymce.init({
        selector: 'textarea#teks_textarea',
        // selector: 'textarea#'+jenis_soalan,
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

    $('#teks_textarea').val('');
}

$("#form_teks").on('submit',function(e){
    if(!confirmed){
        e.preventDefault();
        swal({
            title: "Anda Pasti Untuk Simpan?",
            // text: "Berjaya Kemaskini Profile!",
            type: "info",
            showCancelButton: true,
            confirmButtonText: "Simpan",
            cancelButtonText: "Batal",
            confirmButtonColor: "#2196f3",
            closeOnConfirm: true,
            allowOutsideClick: false,
        }).then(function(){
            var form = new FormData();
            
            let teks = tinymce.get('teks_textarea').getContent();
            form.append('FK_penilaian',window.sessionStorage.id_penilaian);
            form.append('teks',teks);
            form.append('created_by',id_users_master);

            let token = window.localStorage.token;

            simpan_infodetails(form,token,function(){
                if(obj_infodetail.success){
                    swal({
                        title: "Simpan Berjaya",
                        // text: "Berjaya Kemaskini Profile!",
                        type: "success",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 1000
                    }).then(function(){},
                        function(){
                            // window.location.reload();
                            token = window.localStorage.token;
                            // window.localStorage.token = obj_infodetail.token;

                            $('#input_soalanBerangkai').addClass('hidden');
                            $('#soalanBerangkai').removeClass('hidden');

                            // $('#modalSoalanBerangkai').modal('hide');
                            // $('#soalanBerangkai').removeClass('hidden');
                            // $('#soalan').addClass('hidden');
                            // $('#senaraiSoalan').addClass('hidden');

                            $('#id_infodetails').html(obj_infodetail.data);

                            var form2 = new FormData();
                            form2.append('id_infodetails',obj_infodetail.data);

                            get_infodetails(form2,token,function(){
                                if(obj_det.success){

                                    let data = obj_det.data;

                                    $('#txt_teks').html(data.teks);

                                }
                            });
                        }
                    );
                }
                else{
                    swal({
                        title: "Simpan Gagal",
                        // text: "Berjaya Kemaskini Profile!",
                        type: "error",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 1000
                    }).then(function(){},
                        function(dismiss){}
                    ); 
                }
            });
        });
    }
});

//kemaskini bank soalan
function upt_bank_soalan(PK_bank_soalan){
    $("#tab_siri_soalan").prop('class','d-none');
    $("#tab_soalan").prop('class','tab-content');
    $('#soalanBerangkai').addClass('hidden');
    $('#input_soalanBerangkai').addClass('hidden');
    $('#btn_backSoalan').removeClass('hidden');
    // $('#teks_textarea').val('');

    tinymce.init({
        selector: 'textarea#soalan_textarea',
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

    jenis_soalan(window.localStorage.token,function(){
        if(objJenisSoalan.success){
            $("#jenis_soalan").html('');
            $.each(objJenisSoalan.data,function(i,field){
                $("#jenis_soalan").append(
                    '<option value="'+field.kod_jenis_soalan+'">'+field.jenis_soalan+'</option>'
                );
            });
        }
    });
    
    view_siri_soalan(PK_bank_soalan,window.localStorage.token,function(){
        if(objSiriSoalan.success){
            let data = objSiriSoalan.data;
            let jawapan = "";

            if(data.FK_jenis_soalan == "1"){
                list_jawapan = JSON.parse(data.jawapan);
                let jawapan_form = "";
                numbers = 0;
                $.each(list_jawapan,function(i,field){
                    let num = (jawapan_list.length + 1);
                    numbers += 1;
                    jawapan_form =
                    `<div id="section_`+num+`">
                        <div class="row mb-3">
                            <div class="col-1">
                                <input type="radio" name="jawapan_point" id="radio_jawapan_`+numbers+`" onclick="pick_jawapan('`+numbers+`')" value="`+numbers+`"  class="text-success">
                            </div>                
                            <div class="col-9">
                                <textarea name="jawapan_`+numbers+`" id="jawapan_`+numbers+`" class="tinymce">`+field.value+`</textarea>
                            </div>
                            <div class="col-1">
                                <a onclick="del_answer('`+num+`')" class="btn btn-link"><i class="fa fa-trash text-danger"></i></a>
                            </div>                
                        </div>
                    </div>`;
                    jawapan_list.push(num);
                    $("#content_jawapan").append(jawapan_form);
                    tinymce.remove("textarea#jawapan_" + numbers);
                    setTinymce('jawapan_' + numbers);
                    $("#num_answers").val(numbers);
                });

                $("#btn_addJawapanObjektif").prop('class','btn btn-info btn-simple');
                $("#btn_addJawapanMulti").prop('class','d-none');
                $("#card_fileUpload").prop('class','d-none');
                
                tinymce.remove("textarea#skema_jawapan");
                $("#alert_jawapan").prop('class','d-none');
                $("#alert_skema").prop('class','alert alert-dark text-dark');
                $("#skema_jawapan").val(data.skema);
                $("#radio_jawapan_"+data.skema).prop('checked',true);

            }
            else if(data.FK_jenis_soalan == "2" || data.FK_jenis_soalan == "5"){
                $("#divJawapan").addClass('hidden');
                $("#divSkemaJawapan").removeClass('hidden');
                $("#alert_skema").prop('class','d-none');
                $("#alert_jawapan").prop('class','alert alert-dark text-dark');
                $("#btn_addJawapanObjektif").prop('class','d-none');
                $("#btn_addJawapanMulti").prop('class','d-none');
                $("#card_fileUpload").prop('class','d-none');
                setTinymce('skema_jawapan');
                tinyMCE.get('skema_jawapan').setContent(data.skema);
            }
            else if(data.FK_jenis_soalan == "3"){
                list_jawapan = JSON.parse(data.jawapan);
                let skema = JSON.parse(data.skema);
                let jawapan_form = "";
                numbers = 0;
                $.each(list_jawapan,function(i,field){
                    let num = (jawapan_list.length + 1);
                    numbers += 1;
                     jawapan_form =
                    `<div id="section_`+num+`">
                        <div class="row mb-3">
                            <div class="col-1">
                                <input type="checkbox" name="jawapan_point" id="jawapan_point_`+numbers+`" onclick="pick_jawapan_multi('`+numbers+`')" value="`+numbers+`"  class="text-success">
                            </div>                
                            <div class="col-9">
                                <textarea name="jawapan_`+numbers+`" id="jawapan_`+numbers+`" class="tinymce">`+field.value+`</textarea>
                                <div class="row"><div class="col-md-3">
                                    <input type="text" value="" name="mark_point_`+numbers+`" id="mark_point_`+numbers+`" class="form-control mt-3" placeholder="Markah Jawapan" />
                                </div></div>
                            </div>
                            <div class="col-1">
                                <a onclick="del_answer('`+num+`')" class="btn btn-link"><i class="fa fa-trash text-danger"></i></a>
                            </div>                
                        </div>
                    </div>`;
                    jawapan_list.push(num);
                    $("#content_jawapan").append(jawapan_form);
                    tinymce.remove("textarea#jawapan_" + numbers);
                    setTinymce('jawapan_' + num); 
                    $("#num_answers").val(numbers);
                });

                $.each(skema,function(i,item){
                    if(item[1] != ""){
                        $("#jawapan_point_"+item[0]).prop('checked',true);
                    }
                    $("#mark_point_"+item[0]).val(item[1]);
                });

                $("#btn_addJawapanObjektif").prop('class','d-none');
                $("#btn_addJawapanMulti").prop('class','btn btn-warning btn-simple');
                $("#card_fileUpload").prop('class','d-none');
                $("#alert_jawapan").prop('class','d-none');

                tinymce.remove("textarea#skema_jawapan");
                $("#skema_jawapan").val(data.skema);
                // $("#radio_jawapan_"+data.skema).prop('checked',true);
                $("#alert_skema").prop('class','alert alert-dark text-dark');
                fungsi = 'pick_jawapan_multi';
            }
            else if(data.FK_jenis_soalan == "6"){
                $("#btn_addJawapanObjektif").prop('class','d-none');
                $("#btn_addJawapanMulti").prop('class','d-none');
                $("#card_fileUpload").prop('class','card');
                tinymce.remove("textarea#skema_jawapan");
                $("#alert_jawapan").prop('class','d-none');
                $("#alert_skema").prop('class','alert alert-dark text-dark');  
                
                $("#content_jawapan").append(data.jawapan).addClass('d-none');
            }
            else{
                jawapan = `<textarea id="jawapan"></textarea>`;

            }
            
            $("#kod_soalan_upt").text(data.kod_soalan);
            tinyMCE.get('soalan_textarea').setContent(data.soalan);
            $("#jenis_soalan").val(data.FK_jenis_soalan);
            $("#pen_tahap").val(data.tahap);
            let topik = data.topik.split(',');
            console.log(topik);
            $("#pen_topik").tagsinput({
                source: topik
            });

            $('#soalanBerangkai').addClass('hidden');
            $('#det_soalan').removeClass('hidden');
            $('#view_soalanBerangkai').addClass('hidden');
            $('#senaraiSoalan_append').addClass('hidden');   
        }
        else{
            $("#form_soalan")[0].reset();
            $("#content_jawapan").html('');
        }
    });
}

function viewSoalanBerangkai(flag){
    
    $('#btn_viewSoalanBerangkai').removeClass('btn-simple');
    // $('#det_soalan').removeClass('hidden');
    $("#tab_soalan").prop('class','tab-content'); 
    $('#view_soalanBerangkai').addClass('hidden');

    tinymce.init({
        selector: 'textarea#soalan_textarea',
        // selector: 'textarea#'+jenis_soalan,
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

    jenis_soalan(window.localStorage.token,function(){
        if(objJenisSoalan.success){
            $("#jenis_soalan").html('');
            $.each(objJenisSoalan.data,function(i,field){
                $("#jenis_soalan").append(
                    '<option value="'+field.kod_jenis_soalan+'">'+field.jenis_soalan+'</option>'
                );
            });
        }
    });
    // if(flag > 0){

    // }
}

function get_infodetails(form,token,returnValue){
    var settings = {
        "url": host+"infodetails/view",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": token
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

function simpan_infodetails(form,token,returnValue){
    var settings = {
        "url": host+"infodetails/add",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": token
        //   "Authorization": "PENILAIAN "+token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    let request = $.ajax(settings);
    request.done(function (response) {
        obj_infodetail = JSON.parse(response);

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"daftar bank soalan berangkai Error","data":""};
        obj_infodetail = response;

        returnValue();
    });
}

$("#search_bank_soalan").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".class_soalan").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});

$("#search_siri_soalan").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".class_siri_soalan").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});

// $("#btnBatal").click(function(){
//     $("#tab_siri_soalan").prop('class','tab-content');
//     $("#tab_soalan").prop('class','d-none'); 
//     $("#input_soalanBerangkai").addClass('hidden'); 
//     $("#soalanBerangkai").addClass('hidden'); 
//     tinymce.remove("textarea#soalan_textarea"); 
//     $("#jenis_soalan").html('');  
// });

function btnBatal(){
    $("#tab_siri_soalan").prop('class','tab-content');
    $("#tab_soalan").prop('class','d-none'); 
    $("#input_soalanBerangkai").addClass('hidden'); 
    $("#soalanBerangkai").addClass('hidden'); 
    tinymce.remove("textarea#soalan_textarea"); 
    $("#jenis_soalan").html('');  
};

$("#btn_addSoalan").click(function(){
    $("#tab_siri_soalan").prop('class','d-none');
    $("#tab_soalan").prop('class','tab-content');
    $('#soalanBerangkai').addClass('hidden');
    $('#input_soalanBerangkai').addClass('hidden');
    $('#btn_backSoalan').removeClass('hidden');
    // $('#teks_textarea').val('');

    tinymce.init({
        selector: 'textarea#soalan_textarea',
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

    jenis_soalan(window.localStorage.token,function(){
        if(objJenisSoalan.success){
            $("#jenis_soalan").html('');
            $.each(objJenisSoalan.data,function(i,field){
                $("#jenis_soalan").append(
                    '<option value="'+field.kod_jenis_soalan+'">'+field.jenis_soalan+'</option>'
                );
            });
        }
    });
});

function kembali(){
    sessionStorage.child = "959cde393ca127ad75c147ec76ac778b";
    checkAuthentication(sessionStorage.child);
}

function kembali2(id){
    sessionStorage.id_penilaian = id;
    sessionStorage.child = "b0f7c80a40e3d2b78df8f0e6c22f31e5";
    checkAuthentication(sessionStorage.child);
}

function pilih(id,flag){
    swal({
        title: "Anda Pasti Untuk Pilih?",
        // text: "Berjaya Kemaskini Profile!",
        type: "info",
        showCancelButton: true,
        confirmButtonText: "PILIH",
        cancelButtonText: "BATAL",
        confirmButtonColor: "#2196f3",
        closeOnConfirm: true,
        allowOutsideClick: false,
    }).then(function(){
        if(flag == 0){
            create_siri_soalan(id,window.sessionStorage.id_siri_penilaian,window.localStorage.token,function(){
                if(objSiriSoalan.success){
                    loads_data(window.sessionStorage.id_siri_penilaian, window.localStorage.token);
                    $('#count_soalan').html('0');
                    // window.location.reload();
                }
                else{
                    swal({
                        title: objSiriSoalan.message,
                        // text: "Berjaya Kemaskini Profile!",
                        type: "error",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 2000
                    }).then(function(){},
                        function (dismiss) {}
                    );                
                }
            });
        }else{
            list_infodetailsSoalan(id,window.localStorage.token,function(){
                if(obj_info.success){
                    let data = obj_info.data;
                    let data_size = data.length-1;
                    $.each(data,function(i,item){
                        create_siri_soalan(item.PK_bank_soalan,window.sessionStorage.id_siri_penilaian,window.localStorage.token,function(){
                            if(data_size == i){
                                if(objSiriSoalan.success){
                                    loads_data(window.sessionStorage.id_siri_penilaian, window.localStorage.token);
                                    $('#count_soalan').html('0');
                                    // window.location.reload();
                                }
                                else{
                                    swal({
                                        title: objSiriSoalan.message,
                                        // text: "Berjaya Kemaskini Profile!",
                                        type: "error",
                                        showConfirmButton: false,
                                        allowOutsideClick: false,
                                        html: false,
                                        timer: 2000
                                    }).then(function(){},
                                        function (dismiss) {}
                                    );
                                }
                            }
                        });
                    });
                }
            });
        }
    });
}

function update(id, flag){
    if(flag == 0){
        sessionStorage.PK_bank_soalan = id;
    } else {
        sessionStorage.FK_infodetail = id;
    }
    sessionStorage.child = "d6f1027b300c5e96f439dabb028385be"; // JUMP KE BANK SOALAN LUAR
    checkAuthentication(sessionStorage.child);    
}

function deleteList(id,flag){
    swal({
        title: "Anda Pasti Untuk Padam?",
        // text: "Berjaya Kemaskini Profile!",
        type: "info",
        showCancelButton: true,
        confirmButtonText: "PADAM",
        cancelButtonText: "BATAL",
        confirmButtonColor: "#2196f3",
        closeOnConfirm: true,
        allowOutsideClick: false,
    }).then(function(){
        var form = new FormData();
        let url = '';
        if(flag == 0){
            url = 'sirisoalan/delete';
            form.append('PK_siri_soalan',id);
        }else{
            url = 'sirisoalan/infodetails/delete';
            form.append('FK_infodetail',id);
        }
        form.append('FK_siri_penilaian',window.sessionStorage.id_siri_penilaian);
        
        delete_siri_soalan(form,url,window.localStorage.token,function(){
            if(objSiriSoalan.success){
                loads_data(window.sessionStorage.id_siri_penilaian, window.localStorage.token);
                $('#count_soalan').html('0');
                // window.location.reload();
            }
            else{
                swal({
                    title: objSiriSoalan.message,
                    // text: "Berjaya Kemaskini Profile!",
                    type: "error",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    html: false,
                    timer: 2000
                }).then(function(){},
                    function (dismiss) {}
                );                
            }
        });
    });
}


// LOAD FUNCTION DATA

function create_siri_soalan(PK_bank_soalan,id_siri_penilaian,token,returnValue){
    var form = new FormData();
    form.append("id_siri_penilaian", id_siri_penilaian);
    form.append("id_bank_soalan", PK_bank_soalan);
    var settings = {
        "url": host+"sirisoalan/add",
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

function create_siri_soalan_infodetails(form,token,returnValue){
    
    var settings = {
        "url": host+"sirisoalan/add",
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

function delete_siri_soalan(form,url,token,returnValue){
    // var form = new FormData();
    // form.append("FK_siri_penilaian", FK_siri_penilaian);
    // form.append("PK_siri_soalan", PK_siri_soalan);
    var settings = {
        "url": host+""+url,
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
        // objSiriSoalan = response;
        objSiriSoalan = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
        objSiriSoalan = response;
        // objSiriSoalan = JSON.parse(response);

        returnValue();
          
      });    
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
              function (dismiss) {
                //   if (dismiss === 'timer') {
                //         window.sessionStorage.child = "15aaa21373a7090f86dcd348a755b94c";
                //         checkAuthentication(window.sessionStorage.child);
                //   }
              }
          );
      });
}

function list_soalan(id_penilaian,token,returnValue){

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": host+"banksoalan/list/"+id_penilaian,
        "method": "GET",
        "headers": {
          "Authorization": "penilaian "+token
        }
      };    
      var request = $.ajax(settings);

      request.done(function (response) {
        obj_banksoalan = response;
        // obj_banksoalan = JSON.parse(response);

        returnValue();
      }); 
      
      request.fail(function (response) {
        obj_banksoalan = response;

        returnValue();
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

// END FUNCTION DATA

//FORM SOALAN SUBMIT
var confirmed = false;
$("#form_soalan").on('submit',function(e){
    if(!confirmed){
        e.preventDefault();
        swal({
            title: "Anda Pasti Untuk Simpan?",
            // text: "Berjaya Kemaskini Profile!",
            type: "info",
            showCancelButton: true,
            confirmButtonText: "Simpan",
            cancelButtonText: "Batal",
            confirmButtonColor: "#2196f3",
            closeOnConfirm: true,
            allowOutsideClick: false,
        }).then(function(){
            var list_data = [];
            let mark = $("#markah").val();
            var form = new FormData();
            
            $("form#form_soalan :input").each(function(){
                names = $(this).attr('name');
                values = $(this).val();

                if($(this).attr('class') == "tinymce_soalan"){
                    let id_form = $(this).attr('id');
                    values = tinymce.get(id_form).getContent();
                    form.append(names,values);
                }
                else if($(this).attr('class') == "tinymce"){
                    let id_form = $(this).attr('id');
                    values = tinymce.get(id_form).getContent();
                    list_data.push({"name":names,"value":values});
                }
                else{
                    form.append(names,values);
                }

            });
            let jenis_soalan = $("#jenis_soalan").val();
            jawapan = "";

            if(jenis_soalan == "01" || jenis_soalan == "03" || jenis_soalan == "04"){
                jawapan = JSON.stringify(list_data);
            }
            else if(jenis_soalan == "06"){
                jawapan = $("#content_jawapan").html();
            }
            else if (jenis_soalan == "07") {
                jawapan = $("#respon").html();
                // console.log(jawapan)
            }
            else if (jenis_soalan == "08") {

                $('#tableMultipleRadio').removeClass('table-fit');

                jawapan = $("#jawapantableMultipleRadio").html();


            } else if (jenis_soalan == "09") {
                $('#tableMultipleCheck').removeClass('table-fit');

                jawapan = $("#jawapantableMultipleCheck").html();

            }

            let id_infodetails = $('#id_infodetails').html();

            if(id_infodetails != '' && id_infodetails > 0){

                form.append('FK_infodetail',id_infodetails);
            }

            let skema_jawapan = $("#skema_jawapan").val();

            if (jenis_soalan != "07" && jenis_soalan != "08" && jenis_soalan != "09") {
                if (skema_jawapan == "" && (jenis_soalan != "2" || jenis_soalan != "5" || jenis_soalan != "6")) {
                    swal("Skema Jawapan Wajib dipilih!", "", "warning");
                    return;
                }
            }

            form.append('jawapan',jawapan);
            form.append('mark',mark);
            form.append('FK_penilaian',window.sessionStorage.id_penilaian);
            form.append('FK_siri_penilaian',window.sessionStorage.id_siri_penilaian);

            // for (var pair of form.entries()) {
            //     console.log(pair[0]+ ', ' + pair[1]); 
            // }

            let token = window.localStorage.token;
            bank_soalan(form,token,function(){
                if(obj_banksoalan.success){
                    swal({
                        title: "Simpan Berjaya",
                        // text: "Berjaya Kemaskini Profile!",
                        type: "success",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 1000
                    }).then(function(){},
                        function(){
                            // window.location.reload();
                            document.getElementById('form_soalan').reset();
                            $('.tag').remove();
                            $("#btn_addJawapanObjektif").prop('class','btn btn-info btn-simple');
                            $("#btn_addJawapanMulti").prop('class','d-none');
                            $("#card_fileUpload").prop('class','d-none');
                            
                            tinymce.remove("textarea#skema_jawapan");
                            $("#alert_jawapan").prop('class','d-none');
                            $("#alert_skema").prop('class','alert alert-dark text-dark');
                            $("#content_jawapan").html('');
                            // setTinymce('jawapan_' + num);  
                            $("#num_answers").val(0);

                            if(id_infodetails != '' && id_infodetails > 0){
                                list_infodetailsSoalan(id_infodetails,token,function(){
                                    if(obj_info.success){
                                        let data = obj_info.data;
                                        let bil = 1;
    
                                        $('#list_btnSoalan').html('').append(`<button type="button" class="btn btn-warning btn-round " onclick="viewSoalanBerangkai(0)" id="btnAdd"><i class="fa fa-plus-circle"></i>&nbsp;Soalan</button> `);
                                        $.each(data,function(i,item){
                                            $('#list_btnSoalan').append(`
                                                <button type="button" class="btn btn-primary btn-round btn-simple" id="btnView_`+item.PK_bank_soalan+`" onclick="viewInfodetailsSoalan(`+item.PK_bank_soalan+`)">`+bil+`</button>
                                            `);
                                            bil++;
                                        });
                                    }
                                });
                            }else{
                                window.location.reload();
                            }
                            
                        }
                    );
                }
                else{
                    swal({
                        title: "Simpan Gagal",
                        // text: "Berjaya Kemaskini Profile!",
                        type: "error",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 1000
                    }).then(function(){},
                        function(dismiss){}
                    ); 
                }
            });
        });
    }
});

// function bank_soalan(form,token,returnValue){
//     var settings = {
//         "url": host+"banksoalan/add",
//         "method": "POST",
//         "timeout": 0,
//         "headers": {
//           "Authorization": "PENILAIAN "+token
//         },
//         "processData": false,
//         "mimeType": "multipart/form-data",
//         "contentType": false,
//         "data": form
//     };

//     let request = $.ajax(settings);
//     request.done(function (response) {
//         // let obj = JSON.parse(response);
//         obj_banksoalan = JSON.parse(response);

//         console.log(obj_banksoalan);
//         returnValue();
        
//     });
//     request.fail(function(){
//         response = {"success":false,"message":"daftar bank soalan Error","data":""};
//         obj_banksoalan = response;

//         returnValue();
//     }); 
// }

function list_infodetailsSoalan(id_infodetails,token,returnValue){
    var settings = {
        "url": host+"banksoalan/listByInfodetail/"+id_infodetails,
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": token
        }
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

function list_infodetailsSiriSoalan(form,token,returnValue){
    var settings = {
        "url": host+"sirisoalan/infodetail/view",
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

    let request = $.ajax(settings);
    request.done(function (response) {
        obj_info = response;

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"senarai siri soalan berangkai Error","data":""};
        obj_info = response;

        returnValue();
    });
}
// $("#form_soalan").on('submit',function(e){
//     if(!confirmed){
//         e.preventDefault();
//         swal({
//             title: "Anda Pasti Untuk Simpan?",
//             // text: "Berjaya Kemaskini Profile!",
//             type: "info",
//             showCancelButton: true,
//             confirmButtonText: "Simpan",
//             cancelButtonText: "Batal",
//             confirmButtonColor: "#2196f3",
//             closeOnConfirm: true,
//             allowOutsideClick: false,
//         }).then(function(){
//             var list_data = [];
//             var form = new FormData();
//             // console.log(tinymce.get("soalan_textarea").getContent());
//             $("form#form_soalan :input").each(function(){
//                 names = $(this).attr('name');
//                 values = $(this).val();
//                 // form.append(names,values);

//                 if($(this).attr('class') == "tinymce_soalan"){
//                     let id_form = $(this).attr('id');
//                     values = tinymce.get(id_form).getContent();
//                     form.append(names,values);
//                 }
//                 else if($(this).attr('class') == "tinymce"){
//                     let id_form = $(this).attr('id');
//                     values = tinymce.get(id_form).getContent();
//                     list_data.push({"name":names,"value":values});
//                 }
//                 else{
//                     form.append(names,values);
//                 }
//             });
//             let jenis_soalan = $("#jenis_soalan").val();
//             jawapan = "";

//             if(jenis_soalan == "01" || jenis_soalan == "03" || jenis_soalan == "04"){
//                 jawapan = JSON.stringify(list_data);
//             }
//             form.append('jawapan',jawapan);
//             form.append('FK_penilaian',window.sessionStorage.id_penilaian);
//             form.append('FK_siri_penilaian',window.sessionStorage.id_siri_penilaian);

//             let token = window.localStorage.token;
//             bank_soalan(form,token,function(){
//                 if(obj_banksoalan.success){
//                     swal({
//                         title: "Simpan Berjaya",
//                         // text: "Berjaya Kemaskini Profile!",
//                         type: "success",
//                         showConfirmButton: false,
//                         allowOutsideClick: false,
//                         html: false,
//                         timer: 1000
//                     }).then(function(){},
//                         function(){
//                             window.location.reload();
//                         }
//                     );                    
//                 }
//                 else{
//                     swal({
//                         title: "Simpan Gagal",
//                         // text: "Berjaya Kemaskini Profile!",
//                         type: "error",
//                         showConfirmButton: false,
//                         allowOutsideClick: false,
//                         html: false,
//                         timer: 1000
//                     }).then(function(){},
//                         function(dismiss){}
//                     ); 
//                 }
//             });
//         });
//     }
// });

function bank_soalan(form,token,returnValue){
    var settings = {
        "url": host+"sirisoalan/add/siri",
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
        obj_banksoalan = JSON.parse(response);

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"daftar bank soalan Error","data":""};
        obj_banksoalan = response;

        returnValue();
    }); 
}

function jenis_soalan(token,returnValue){
    var settings = {
       "async": true,
       "crossDomain": true,
       "url": host+"jenis_soalan/list",
       "method": "GET",
       "headers": {
         "Authorization": "penilaian "+token
       }
     };    
     var request = $.ajax(settings);

     request.done(function (response) {
       objJenisSoalan = response;

       returnValue();
     }); 
     
     request.fail(function (response) {
       objJenisSoalan = response;

       returnValue();
     });
}


// function add soalan form

var jawapan_list = [];
var numbers = 0;
$("#btn_addJawapanObjektif").click(function(){
    let num = (jawapan_list.length + 1);
    numbers += 1;
    let jawapan_form =
    `<div id="section_`+num+`">
        <div class="row mb-3">
            <div class="col-1">
                <input type="radio" name="jawapan_point" id="radio_jawapan_`+numbers+`" onclick="pick_jawapan('`+numbers+`')" value="`+numbers+`"  class="text-success">
            </div>                
            <div class="col-9">
                <textarea name="jawapan_`+numbers+`" id="jawapan_`+num+`" class="tinymce"></textarea>
            </div>
            <div class="col-1">
                <a onclick="del_answer('`+num+`')" class="btn btn-link"><i class="fa fa-trash text-danger"></i></a>
            </div>                
        </div>
    </div>`;
    jawapan_list.push(num);
    $("#content_jawapan").append(jawapan_form).removeClass('d-none');
    setTinymce('jawapan_' + num);  
    $("#num_answers").val(numbers);
});

$("#btn_addJawapanMulti").click(function(){
    let num = (jawapan_list.length + 1);
    numbers += 1;
    let jawapan_form =
    `<div id="section_`+num+`">
        <div class="row mb-3">
            <div class="col-1">
                <input type="checkbox" name="jawapan_point" id="jawapan_point_`+numbers+`" onclick="pick_jawapanM('`+numbers+`')" value="`+numbers+`"  class="text-success">
            </div>
            <div class="col-9">
                <textarea name="jawapan_`+numbers+`" id="jawapan_`+num+`" class="tinymce"></textarea>
                <div class="row"><div class="col-md-3">
                    <input type="text" name="mark_point_`+numbers+`" onblur="pick_jawapanM('`+numbers+`')" id="mark_point_`+numbers+`" class="form-control mt-3 d-none" placeholder="Markah Jawapan" />
                </div></div>
            </div>
            <div class="col-1">
                <a onclick="del_answer('`+num+`')" class="btn btn-link"><i class="fa fa-trash text-danger"></i></a>
            </div>
        </div>
    </div>`;
    jawapan_list.push(num);
    $("#content_jawapan").append(jawapan_form).removeClass('d-none');
    setTinymce('jawapan_' + num); 
    $("#num_answers").val(numbers);
});

function pick_jawapanM(text){
    // alert(text)
    let list = [], list_det = [];
    let mark = $('#mark_point_'+text).val();
    let skema = $('#skema_jawapan').val();

    list_det[0] = text;
    list_det[1] = mark;

    if ($("#jawapan_point_"+text).is(':checked')) {
        if(skema != ''){
            list = JSON.parse(skema);
            count = 1;
            $.each(list, function(i, item){
                if(item[0] == text){
                    list[i][1] = mark;
                    count = 0;
                }
            });
            if(count == 1){
                list.push(list_det);
            }
        }
        $("#mark_point_"+text).removeClass('d-none');
    } else {
        if(skema != '') list = JSON.parse(skema);
        $("#mark_point_"+text).addClass('d-none');
        
        for(var m = 0;m < list.length;m++){
            
            if(list[m][0] == text){
                list.splice(m,1);
            }
        }
        
    }

    $("#skema_jawapan").val(JSON.stringify(list));
}

function viewInfodetailsSoalan(PK_bank_soalan){

    let id_infodetails = $('#id_infodetails').html();

    list_infodetailsSoalan(id_infodetails,window.localStorage.token,function(){
        if(obj_info.success){
            let data = obj_info.data;

            $('#btnAdd').addClass('btn-simple');
            $.each(data,function(i,item){
                if(PK_bank_soalan == item){
                    $('#btnView_'+item.PK_bank_soalan).removeClass('btn-simple');
                }else{
                    $('#btnView_'+item.PK_bank_soalan).addClass('btn-simple');
                }
            });
            
        }
    });

    $('#txt_jawapan').html('');
    $('#txt_kategori_soalan').html('');
    $('#txt_tahap_soalan').html('');
    $('#txt_topik').html('');
    $('#txt_mark').html('');

    var form = new FormData();
    form.append('PK_bank_soalan',PK_bank_soalan);

    get_infodetailsSoalan(form,function(){

        if(obj_det.success){
            let data = obj_det.data;
            let FK_jenis_soalan = data.FK_jenis_soalan;
            let jawapan = data.jawapan;
            let jawapan_size = 0;
            let skema = data.skema;
            let skema_size = 0;
            let index = 0;
            $('#txt_soalan').html('');

            $('#tab_soalan').addClass('d-none');
            $('#view_soalanBerangkai').removeClass('hidden');

            if(FK_jenis_soalan != 2 && FK_jenis_soalan != 5){
                jawapan = JSON.parse(jawapan);
                jawapan_size = jawapan.length-1;

                if(FK_jenis_soalan == 3){
                    skema = JSON.parse(skema);
                    skema_size = skema.length;

                    $.each(jawapan,function(i,item){

                        $('#txt_jawapan').append(`
                            <div id="alert_`+(i+1)+`" class="alert bg-default">
                            <i id="icon_`+(i+1)+`" class="fa fa-circle-xmark"></i>&nbsp;`+item.value+`
                            </div>
                        `);

                        if(i == jawapan_size){
                            for( v = 1; v <= skema_size; v++){
                                jwpn = skema[v-1][0];
                                mrkh = skema[v-1][1];

                                $('#alert_'+jwpn).addClass('alert-success').removeClass('bg-default');
                                $('#icon_'+jwpn).addClass('fa-circle-check').removeClass('fa-circle-xmark');
                            }
                        }
                        
                    });
                }else if(FK_jenis_soalan == 1){
                    $.each(jawapan,function(i,item){
                        index = item.name.split('_');

                        if(index[1] == skema){
                            $('#txt_jawapan').append(`
                            <div class="alert alert-success">
                            <i class="fa fa-circle-check"></i>&nbsp;`+item.value+`
                            </div>
                        `);
                        }else{
                            $('#txt_jawapan').append(`
                                <div class="alert bg-default">
                                <i class="fa fa-circle-xmark"></i>&nbsp;`+item.value+`
                                </div>
                            `);
                        }
                    });
                }else{
                    $.each(jawapan,function(i,item){
                        index = item.name.split('_');
                        if(index[1] == skema){
                            $('#txt_jawapan').append(`
                            <div class="alert alert-success">
                            <i class="fa fa-circle-check"></i>&nbsp;`+item.value+`
                            </div>
                        `);
                        }else{
                            $('#txt_jawapan').append(`
                                <div class="alert bg-default">
                                <i class="fa fa-circle-xmark"></i>&nbsp;`+item.value+`
                                </div>
                            `);
                        }
                    });
                }
            }else{
                $('#txt_jawapan').append(`
                    <div class="alert alert-success">
                    <i class="fa fa-circle-check"></i>&nbsp;`+skema+`
                    </div>
                `);
            }

            $('#txt_kategori_soalan').html(data.jenis_soalan);
            $('#txt_tahap_soalan').html(data.tahap);
            $('#txt_topik').html(data.topik);
            $('#txt_soalan').html(data.soalan);
            $('#txt_markah').html(data.mark);
            
        }
    });
}

function get_infodetailsSoalan(form,returnValue){

    var settings = {
        "url": host+"banksoalan/view",
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

$("#choose_type").change(function(){
    if($(this).prop('checked')){
        $("#choose_docx").prop('checked',false);
        $("#choose_xlsx").prop('checked',false);
        $("#choose_pdf").prop('checked',false);
        $("#choose_pptx").prop('checked',false);
        $("#choose_dwg").prop('checked',false);
        $("#choose_jpg").prop('checked',false);
        $("#choose_mp3").prop('checked',false);
    }
    else{
        $("#choose_docx").prop('checked',true);
        $("#choose_xlsx").prop('checked',true);
        $("#choose_pdf").prop('checked',true);
        $("#choose_pptx").prop('checked',true);
        $("#choose_dwg").prop('checked',true);
        $("#choose_jpg").prop('checked',true);
        $("#choose_mp3").prop('checked',true);        
    }
});

function del_answer(num){
    numbers -= 1;
    $("#num_answers").val(numbers);
    $("#section_"+num).html('');
}


$("#jenis_soalan").change(function(){
    numbers = 0;
    $("#num_answers").val(numbers);
    let jenis_soalan = this.value;

    if(jenis_soalan == "01"){
        $("#content_jawapan").html('');
        $("#divJawapan").removeClass('hidden');
        $("#divSkemaJawapan").addClass('hidden');
        $("#btn_addJawapanObjektif").prop('class','btn btn-info btn-simple');
        $("#btn_addJawapanMulti").prop('class','d-none');
        tinymce.remove("textarea#skema_jawapan");
        $("#alert_jawapan").prop('class','d-none');
        $("#alert_skema").prop('class','alert alert-dark text-dark');
        $("#card_fileUpload").prop('class','d-none');

        $("#linearStruct").prop('class', 'd-none')
        $("#MultipleDiv").prop('class', 'd-none');
        $("#tabChecked").prop('class', 'd-none');
        $("#tabRadio").prop('class', 'd-none');
    }
    else if(jenis_soalan == "02" || jenis_soalan == "05"){
        $("#content_jawapan").html('');
        $("#divJawapan").addClass('hidden');
        $("#divSkemaJawapan").removeClass('hidden');
        $("#alert_skema").prop('class','d-none');
        $("#alert_jawapan").prop('class','alert alert-dark text-dark');
        $("#btn_addJawapanObjektif").prop('class','d-none');
        $("#btn_addJawapanMulti").prop('class','d-none');
        $("#card_fileUpload").prop('class','d-none');
        setTinymce('skema_jawapan');

        $("#linearStruct").prop('class', 'd-none')
        $("#MultipleDiv").prop('class', 'd-none');
        $("#tabChecked").prop('class', 'd-none');
        $("#tabRadio").prop('class', 'd-none');

         
    }
    else if(jenis_soalan == "03"){
        $("#content_jawapan").html('');
        $("#divJawapan").removeClass('hidden');
        $("#divSkemaJawapan").addClass('hidden');
        $("#btn_addJawapanObjektif").prop('class','d-none');
        $("#btn_addJawapanMulti").prop('class','btn btn-warning btn-simple');
        $("#alert_jawapan").prop('class','d-none');
        $("#card_fileUpload").prop('class','d-none');

        tinymce.remove("textarea#skema_jawapan");
        // $("#skema_jawapan").prop('class','d-none');
        $("#alert_skema").prop('class','alert alert-dark text-dark');

        $("#linearStruct").prop('class', 'd-none')
        $("#MultipleDiv").prop('class', 'd-none');
        $("#tabChecked").prop('class', 'd-none');
        $("#tabRadio").prop('class', 'd-none');
    }
    else if(jenis_soalan == "04"){
        $("#content_jawapan").html('');
        $("#divJawapan").removeClass('hidden');
        $("#divSkemaJawapan").addClass('hidden');
        $("#btn_addJawapanObjektif").prop('class','d-none');
        $("#btn_addJawapanMulti").prop('class','d-none');
        $("#card_fileUpload").prop('class','d-none');
        tinymce.remove("textarea#skema_jawapan");
        $("#alert_skema").prop('class','alert alert-dark text-dark');

        $("#linearStruct").prop('class', 'd-none')
        $("#MultipleDiv").prop('class', 'd-none');
        $("#tabChecked").prop('class', 'd-none');
        $("#tabRadio").prop('class', 'd-none');

        for(numbers=1;numbers<3;numbers++){
            let num = (jawapan_list.length + 1);
            let text = true;
            if((numbers%2) == 0){
                text = false;
            }
            let jawapan_form =
            `<div id="section_`+num+`">
                <div class="row mb-3">
                    <div class="col-1">
                        <input type="radio" name="jawapan_point" id="jawapan_point_`+numbers+`" onclick="pick_jawapan('`+text+`')" value="`+text+`" class="text-success">
                    </div>                
                    <div class="col-11">
                        <textarea name="jawapan_`+text+`" id="jawapan_`+num+`" class="tinymce">`+text+`</textarea>
                    </div>              
                </div>
            </div>`;
            $("#content_jawapan").append(jawapan_form).removeClass('d-none');
            jawapan_list.push(num);
            setTinymce('jawapan_' + num);             
        }
        $("#num_answers").val((numbers - 1));        
    }else if(jenis_soalan == "06"){
        $("#content_jawapan").html('');
        $("#divJawapan").removeClass('hidden');
        $("#divSkemaJawapan").addClass('hidden');
        $("#btn_addJawapanObjektif").prop('class','d-none');
        $("#btn_addJawapanMulti").prop('class','d-none');
        $("#card_fileUpload").prop('class','card');
        tinymce.remove("textarea#skema_jawapan");
        $("#alert_jawapan").prop('class','d-none');
        $("#alert_skema").prop('class','alert alert-dark text-dark');

        $("#linearStruct").prop('class', 'd-none')
        $("#MultipleDiv").prop('class', 'd-none');
        $("#tabChecked").prop('class', 'd-none');
        $("#tabRadio").prop('class', 'd-none');



    } else if (jenis_soalan == "07") {
        $("#content_jawapan").html('');
        $("#divJawapan").removeClass('hidden');
        $("#divSkemaJawapan").addClass('hidden');
        $("#btn_addJawapanObjektif").prop('class', 'd-none');
        $("#btn_addJawapanMulti").prop('class', 'd-none');
        $("#card_fileUpload").prop('class', 'd-none');
        $("#MultipleDiv").prop('class', 'd-none');
        $("#tabChecked").prop('class', 'd-none');
        $("#tabRadio").prop('class', 'd-none');

        tinymce.remove("textarea#skema_jawapan");

        $("#MultipleDiv").prop('class', 'd-none');
        $("#tabChecked").prop('class', 'd-none');
        $("#tabRadio").prop('class', 'd-none');
        $("#linearStruct").removeClass('d-none')
    }
    else if (jenis_soalan == "08") {

        $("#content_jawapan").html('');

        $("#divJawapan").removeClass('hidden');
        $("#divSkemaJawapan").addClass('hidden');
        $("#btn_addJawapanObjektif").prop('class', 'd-none');
        $("#btn_addJawapanMulti").prop('class', 'd-none');
        $("#card_fileUpload").prop('class', 'd-none');
        $("#linearStruct").addClass('d-none');
        $("#alert_jawapan").prop('class', 'd-none');

        // TypeMultipleChoice(jenis_soalan);
        $("#MultipleDiv").removeClass('d-none');
        $("#tabChecked").prop('class', 'd-none');
        $("#tabRadio").removeClass('d-none');

        $('#tabRadio').html(`<form id="myformRadio" class="form-group row">

                                    <div id="jawapantableMultipleRadio"
                                        class="table-responsive">
                                        <table id="tableMultipleRadio"
                                            class="table table-fit table-hover text-nowrap border">

                                            <tr id="Row1" class="bg-secondary">
                                                <th style="width: 150px;" scope="col">#</th>
                                                <th style="width: 100px;" scope="col">
                                                    <input onclick="InputToSpan()" type="text"
                                                        class="InputTable"
                                                        placeholder="Masukkan Label" name="shade" /><span
                                                        class="spanInputTable"
                                                        onclick="InputToSpan()"></span>
                                                </th>
                                            </tr>
                                            <!-- style="border: 1px solid black;
                                        border-collapse: collapse;"  -->
                                            <tr id="row2">
                                                <th class="bg-secondary" scope="row">
                                                    <span onclick="InputToSpan()"
                                                        class="spanInputTable"></span>
                                                    <input onclick="InputToSpan()" type="text"
                                                        class="InputTable"
                                                        placeholder="Masukkan Label" name="shade"
                                                        style="width: 150px;" />

                                                </th>
                                                <td id="radioTD" class="text-center">
                                                    <input class="form-check-input" type="radio"
                                                        name="option1" />
                                                </td>

                                            </tr>


                                        </table>
                                    </div>
                                </form>
                                <div class="col-xs-7">
                                    <button type="button" class="btn btn-primary"
                                        id="radio_btnAddCol">Add Column</button>
                                    <button type="button" class="btn btn-primary"
                                        id="radio_btnAddRow">Add Row</button>


                                    <!-- <input type="submit" class="btn btn-primary"></input> -->
                                </div>`);

        // call function nie lpas append or html
        radio_TypeMultipleChoice();


    } else if (jenis_soalan == "09") {

        $("#content_jawapan").html('');
        $("#divJawapan").removeClass('d-none');
        $("#divSkemaJawapan").addClass('hidden');
        $("#btn_addJawapanObjektif").prop('class', 'd-none');
        $("#btn_addJawapanMulti").prop('class', 'd-none');
        $("#card_fileUpload").prop('class', 'd-none');
        $("#linearStruct").addClass('d-none');
        $("#alert_jawapan").prop('class', 'd-none');

        $("#MultipleDiv").removeClass('d-none');
        $("#tabChecked").removeClass('d-none');
        $("#tabRadio").addClass('d-none');
        $('#tabChecked').html(`<form id="myformCheck" class="form-group row">
                                <div
                                id="jawapantableMultipleCheck"
                                class="table-responsive"
                                >
                                <table
                                    id="tableMultipleCheck"
                                    class="table table-fit table-hover text-nowrap border"
                                >
                                    <tr id="Row1_check" class="bg-secondary">
                                    <th style="width: 150px;" scope="col">#</th>
                                    <th scope="col">
                                        <span
                                        class="spanInputTable"
                                        onclick="InputToSpan()"
                                        ></span>
                                        <input
                                        type="text"
                                        class="InputTable"
                                        placeholder="Masukkan Label"
                                        name=""
                                        style="width: 150px"
                                        onclick="InputToSpan()"
                                        />
                                    </th>
                                    </tr>

                                    <tr id="row2_check">
                                    <th scope="row" class="bg-secondary">
                                        <span
                                        onclick="InputToSpan()"
                                        class="spanInputTable"
                                        ></span>
                                        <input
                                        type="text"
                                        onclick="InputToSpan()"
                                        class="InputTable"
                                        placeholder="Masukkan Label"
                                        name="shade"
                                        style="width: 150px"
                                        />
                                    </th>

                                    <td id="checkTD" class="text-center">
                                        <input
                                        class="form-check-input"
                                        type="checkbox"
                                        name="cb-1"
                                        />
                                    </td>
                                    </tr>
                                </table>
                                </div>
                                <div class="col-xs-7">
                                <button
                                    type="button"
                                    class="btn btn-primary"
                                    id="checked_btnAddCol"
                                >
                                Add Column
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-primary"
                                    id="checked_btnAddRow"
                                >
                                    Add Row
                                </button>

                                <!-- <input type="submit_check" class="btn btn-primary"></input> -->
                                </div>
                                </form>`);
        checked_TypeMultipleChoice();

    }

});


function radio_TypeMultipleChoice() {


    $('#radio_btnAddRow').click(function () {


        let CountCol = $('#Row1').find('th').length;
        let CountRow = $('#tabRadio').find('tr').length;


        var newRow = $("<tr>");

        var thElement = $('<th class="text-center bg-secondary" style="width: 100px;">  <span onclick="InputToSpan()" style="width: 150px;" class="spanInputTable"></span><input onclick="InputToSpan()" class="InputTable" type="" placeholder="Label Row' + CountRow + '" style="width: 150px;"></input>').appendTo(newRow);

        for (let x = 1; x < CountCol; x++) {
            var tdElement1 = $('<td class="text-center"><input class="form-check-input" type="radio" id="checkboxNoLabel" value="" name="option' + CountRow + '"/></td>').appendTo(newRow);
        }

        $("#tableMultipleRadio").append(newRow);

    });


    var myform_tabRadio = $('#tableMultipleRadio'),
        iter = 0;
    $('#radio_btnAddCol').click(function () {
        myform_tabRadio.find('tr').each(function () {
            var trow_radio = $(this);
            var gila = trow_radio.index();

            if (trow_radio.index() === 0) {

                trow_radio.append('<th class="text-center bg-secondary"> <span onclick="InputToSpan()" style="width: 150px;" class="spanInputTable" ></span><input onclick="InputToSpan()" type="text" class="InputTable" scope="col"  style="width: 150px;" placeholder="Masukkan Label" name="shade" /></th>');
            } else {
                trow_radio.append('<td class="text-center"><input onclick="InputToSpan()" class="form-check-input" type="radio" id="checkboxNoLabel" value="" name="option' + gila + '"/></td>');
            }

        });
        iter += 1;
    });


}


function checked_TypeMultipleChoice() {

    $('#checked_btnAddRow').click(function () {
        var count = 1,
            first_row = $('#row2_check');
        while (count-- > 0) first_row.clone().appendTo('#tableMultipleCheck');
    });


    var myform_tabCheck = $('#jawapantableMultipleCheck'),
        iter = 0;

    $('#checked_btnAddCol').click(function () {

        myform_tabCheck.find('tr').each(function () {

            var trow = $(this);

            if (trow.index() === 0) {
                trow.append('<th class="text-center bg-secondary" ><input onclick="InputToSpan()" type="text" class="InputTable" scope="col" style="width: 200px;" placeholder="Masukkan Label" name="shade" /></input> <span onclick="InputToSpan()" class="spanInputTable"></span></th>');
            } else {
                trow.append('<td class="text-center"><input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" name=""/></td>');
            }

        });
        iter += 1;
    });
}




function InputToSpan() {

    $(".spanInputTable").click(function (event) {
        event.stopPropagation();
        $(this).hide();
        $(this).parent().children('input').attr('type', 'text');
    });

    $(".InputTable").change(function () {
        $(this).attr('type', 'hidden');
        $(this).parent().children('span').html($(this).val());
        $(this).parent().children('span').show();
    });

}

function LinearScale() {

    $("#respon").html("");
    var minScale = $("#minScale").val();
    var MaxScale = $("#maxScale").val();

    $("#textMinScale").html(minScale);
    $("#textMaxScale").html(MaxScale);

}
function LinearScale_2() {

    $("#respon").html("");
    var minScale = $("#minScale").val();
    var MaxScale = $("#maxScale").val();


    var nameScaleMin = $("#nameScaleMin").val().toUpperCase();
    var nameScaleMax = $("#nameScaleMax").val().toUpperCase();
 

    $('#respon').append(' <section class="pb-4"> <div class="bg-white border rounded-5"> <section class="p-4 d-flex justify-content-center bg-white"><div class="mx-0 mx-sm-auto"><div class="text-center mb-3"><div id="" class="d-inline mx-3 fw-bold">' + nameScaleMin + '</div><div id="LinearRadio" class="rounded-pill d-inline bg-secondary p-2">');
    for (let i = minScale; i <= MaxScale; i++) {

        $("#LinearRadio").append('<div class="form-check form-check-inline "> <label class="label-linear pb-3" for="my_radio_button_' + i + '">'+i+'</label> <input class="input-linear" type="radio" name="radio" id="my_radio_button_'+ i +'" /> </div>');

            // asal bawah nie
            // $("#LinearRadio").append('<div class="form-check form-check-inline">' +
            // '<input class="form-check-input" type="radio" name="inlineRadioOptions" value="option' + i + '>' +
            // '<label class= "form-check-label"> ' + i + '</label ></div >');
    }
    $('#LinearRadio').after('</div><div class="d-inline mx-3 fw-bold">' + nameScaleMax + '</div> </div></div></section>');

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

function pick_jawapan(text){
    // alert(text)
    $("#skema_jawapan").val(text);
}

// end function add soalan form