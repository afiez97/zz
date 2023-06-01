$(function () {
    $.ajaxSetup({
        cache: false
    });
    checkSession();
    let token = window.localStorage.token;
    if(sessionStorage.capaian == capaian[2]){
        $("#btnAddSoalan").removeClass('hidden').attr('onclick',"daftarSoalan('"+window.sessionStorage.id_penilaian+"');");
    }
    $("#leftsidebar").load('../aside/aside_pen_list_bank_soalan.html');
    let id_penilaian = sessionStorage.id_penilaian;
    load_penilaian(id_penilaian,window.localStorage.token,function(){
        if(objPenilaian.success){
            let data = objPenilaian.data;
            
            $("#kategori").html(data.nama_kategori_penilaian);
            $("#nama_penilaian_1").html(data.nama_penilaian);
            $("#kod_penilaian_1").html(data.kod_penilaian);
            $("#nama_kluster_1").html(data.nama_kluster);
                                
            $("#nama_penilaian").html(data.nama_penilaian);
            $("#kod_penilaian").html(data.kod_penilaian);                    
            $("#FK_kategori_penilaian").val(data.id_kategori_penilaian);
            $("#nama_kategori_penilaian").html(data.nama_kategori_penilaian);
            $("#FK_kluster").val(data.id_kluster);
            $("#nama_penyelaras").html(data.nama);
            $("#notel_kerajaan_penyelaras").html(data.notel_kerajaan);
            $("#emel_kerajaan_penyelaras").html(data.emel_kerajaan);
        }
    });

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

    $("#pen_topik").tagsinput({
        source: ['Amsterdam', 'Washington', 'Sydney', 'Beijing', 'Cairo']
    });

    jenis_soalan(window.localStorage.token,function(){
        if(objJenisSoalan.success){
            $("#jenis_soalan").html('');
            $.each(objJenisSoalan.data,function(i,field){
                $("#jenis_soalan").append(
                    '<option value="'+field.id_jenis_soalan+'">'+field.jenis_soalan+'</option>'
                );
            });
        }
    });
    $("#btn_listBankSoalan").trigger("click");
    if(window.sessionStorage.id_siri_penilaian && window.sessionStorage.PK_bank_soalan){
        $("#btn_backSoalan").html('');
        $("#divButtons").addClass('hidden');
        setTimeout(function(){
            upt_bank_soalan(window.sessionStorage.PK_bank_soalan);
        },500);
    } else if(window.sessionStorage.id_siri_penilaian && window.sessionStorage.FK_infodetail){
        $("#btn_backSoalan").html('');
        $("#divButtons").addClass('hidden');
        setTimeout(function(){
            upt_soalan_berangkai(window.sessionStorage.FK_infodetail);
        },500);
    }
});

function modalSoalanBerangkai(flag){

    $('#modalSoalanBerangkai').modal('show');
    $('#flag_teks').html(flag);

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

    if(flag > 0){

        let teks = $('#txt_teks').html();
        $('#teks_textarea').val(teks);

    }else{
        $('#teks_textarea').val('');
    }
}

function viewSoalan(flag){
    jawapan_list = [];
    $('#soalanBerangkai').addClass('hidden');
    $('#senaraiSoalan_append').addClass('hidden');
    $('#txt_teks').html('');
    $('#list_btnSoalan').html(`<button type="button" class="btn btn-warning btn-round " onclick="viewSoalanBerangkai(0)" id="btnAdd"><i class="fa fa-plus-circle"></i>&nbsp;Soalan</button> `);

    $("#form_soalan")[0].reset();
    $("#content_jawapan").html('');
    $('#view_soalanBerangkai').addClass('hidden');
    $("#kod_soalan_upt").html('');
    $('#txt_soalan').html(``);
    $('#txt_jawapan').html(``);
    $('#txt_kategori_soalan').html(``);
    $('#txt_tahap_soalan').html(``);
    $('#txt_topik').html(``);
    $('#txt_mark').html(``);
    tinymce.remove("textarea#teks_textarea");
    setTextSoalan('teks_textarea');

    $('#det_soalan').removeClass('hidden');
    $('#id_infodetails').html(``);

    $('#view_soalanBerangkai').addClass('hidden');
}

function setTextSoalan(jenis_soalan){
    tinymce.init({
        selector: 'textarea#'+jenis_soalan,
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
}

$('#btn_soalanBerangkai').click(function(){

    $('#jenis_soalan').val(2);
    setTextarea('teks_textarea');

});

$("#btnKembali").click(function(){
    if(window.sessionStorage.id_siri_penilaian && (window.sessionStorage.PK_bank_soalan || window.sessionStorage.FK_infodetail)){
        window.sessionStorage.removeItem('PK_bank_soalan');
        window.sessionStorage.removeItem('FK_infodetail');
        sessionStorage.child = "900a5a773ccfab87f28ae75375519def"; // PATAH BALIK PENGURUSAN BANK SOALAN SIRI PENILAIAN
        checkAuthentication(sessionStorage.child);
    } else {
        sessionStorage.child = "b0f7c80a40e3d2b78df8f0e6c22f31e5"; // PATAH BALIK SECARA NORMAL
        checkAuthentication(sessionStorage.child);
    }    
});

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
    $("#content_jawapan").append(jawapan_form);
    setTinymce('jawapan_' + num);  
    $("#num_answers").val(numbers);
});

$("#btn_addJawapanMulti").click(function(){
    let num = (jawapan_list.length + 1);//
    numbers += 1;
    let jawapan_form =
    `<div id="section_`+num+`">
        <div class="row mb-3">
            <div class="col-1">
                <input type="checkbox" name="jawapan_point" id="jawapan_point_`+numbers+`" onclick="pick_jawapan_multi('`+numbers+`')" value="`+numbers+`"  class="text-success">
            </div>                
            <div class="col-9">
                <textarea name="jawapan_`+numbers+`" id="jawapan_`+num+`" class="tinymce"></textarea>
                <div class="row"><div class="col-md-3">
                    <input type="text" name="mark_point_`+num+`" onblur="pick_jawapan_multi('`+numbers+`')" id="mark_point_`+numbers+`" class="form-control mt-3" placeholder="Markah Jawapan" />
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
    $("#num_answers").val(numbers);
});

function del_answer(num){
    numbers -= 1;
    $("#num_answers").val(numbers);
    $("#section_"+num).html('');
}


$("#jenis_soalan").change(function(){
    numbers = 0;
    $("#num_answers").val(numbers);
    $("#content_jawapan").html('').removeClass('d-none');
    let jenis_soalan = this.value;
    let fungsi = 'pick_jawapan';

    if(jenis_soalan == "1"){
        $("#divJawapan").removeClass('hidden');
        $("#divSkemaJawapan").addClass('hidden');
        $("#btn_addJawapanObjektif").prop('class','btn btn-info btn-simple');
        $("#btn_addJawapanMulti").prop('class','d-none');
        $("#card_fileUpload").prop('class','d-none');
        
        tinymce.remove("textarea#skema_jawapan");
        $("#alert_jawapan").prop('class','d-none');
        $("#alert_skema").prop('class','alert alert-dark text-dark');
    }
    else if(jenis_soalan == "2" || jenis_soalan == "5"){
        $("#divJawapan").addClass('hidden');
        $("#divSkemaJawapan").removeClass('hidden');
        $("#alert_skema").prop('class','d-none');
        $("#alert_jawapan").prop('class','alert alert-dark text-dark');
        $("#btn_addJawapanObjektif").prop('class','d-none');
        $("#btn_addJawapanMulti").prop('class','d-none');
        $("#card_fileUpload").prop('class','d-none');

        setTinymce('skema_jawapan');
         
    }
    else if(jenis_soalan == "3"){
        $("#divJawapan").removeClass('hidden');
        $("#divSkemaJawapan").addClass('hidden');
        $("#btn_addJawapanObjektif").prop('class','d-none');
        $("#btn_addJawapanMulti").prop('class','btn btn-warning btn-simple');
        $("#card_fileUpload").prop('class','d-none');
        $("#alert_jawapan").prop('class','d-none');

        tinymce.remove("textarea#skema_jawapan");
        // $("#skema_jawapan").prop('class','d-none');
        $("#alert_skema").prop('class','alert alert-dark text-dark');
        fungsi = 'pick_jawapan_multi';
    }
    else if(jenis_soalan == "4"){
        $("#divJawapan").removeClass('hidden');
        $("#divSkemaJawapan").addClass('hidden');
        $("#btn_addJawapanObjektif").prop('class','d-none');
        $("#btn_addJawapanMulti").prop('class','d-none');
        $("#card_fileUpload").prop('class','d-none');
        tinymce.remove("textarea#skema_jawapan");
        $("#alert_skema").prop('class','alert alert-dark text-dark');

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
                        <input type="radio" name="jawapan_point" id="jawapan_point_`+numbers+`" onclick="`+fungsi+`('`+text+`')" value="`+text+`" class="text-success">
                    </div>                
                    <div class="col-11">
                        <textarea name="jawapan_`+text+`" id="jawapan_`+text+`" class="tinymce">`+text+`</textarea>
                    </div>              
                </div>
            </div>`;
            $("#content_jawapan").append(jawapan_form).removeClass('d-none');
            jawapan_list.push(num);
            setTinymce('jawapan_' + text);             
            // setTinymce('jawapan_' + num);             
        }
        $("#num_answers").val((numbers - 1));        
    }
    else if(jenis_soalan == "6"){
        $("#divJawapan").removeClass('hidden');
        $("#divSkemaJawapan").addClass('hidden');
        $("#btn_addJawapanObjektif").prop('class','d-none');
        $("#btn_addJawapanMulti").prop('class','d-none');
        $("#card_fileUpload").prop('class','card');
        tinymce.remove("textarea#skema_jawapan");
        $("#alert_jawapan").prop('class','d-none');
        $("#alert_skema").prop('class','alert alert-dark text-dark');
    }
});

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
        plugins: [
            'image','media','table','lists',
         ],
        images_upload_url: host+'fileUpload',
        images_upload_credentials: true,
        // plugins:'table'
    });
}

function pick_jawapan(text){
    $("#skema_jawapan").val(text);
}

function pick_jawapan_multi(text){
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


// Load Data Function

function load_penilaian(id_penilaian,token,returnValue){
    var form = new FormData();
    form.append("id_penilaian", id_penilaian);
    var settings = {
        "url": host+"penilaian/show",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": "penilaian "+token
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

//End Load Data Function


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

            if(jenis_soalan == "1" || jenis_soalan == "3" || jenis_soalan == "4"){
                jawapan = JSON.stringify(list_data);
            }
            else if(jenis_soalan == "6"){
                jawapan = $("#content_jawapan").html();
            }

            let id_infodetails = $('#id_infodetails').html();

            if(id_infodetails != '' && id_infodetails > 0){
                form.append('FK_infodetails',id_infodetails);
            }

            let skema_jawapan = $("#skema_jawapan").val();

            if(skema_jawapan == "" && (jenis_soalan != "2" || jenis_soalan != "5" || jenis_soalan != "6")){
                swal("Skema Jawapan Wajib dipilih!","","warning");
                return;
            }

            form.append('created_by',id_users_master);
            form.append('jawapan',jawapan);
            form.append('FK_penilaian',window.sessionStorage.id_penilaian);
            
            kod_soalan = "";
            if($("#kod_soalan_upt").html() != ""){
                kod_soalan = $("#kod_soalan_upt").html();
                form.append('kod_soalan_upt',kod_soalan);
            }

            let token = window.localStorage.token;
            if(kod_soalan == ""){
                bank_soalan(form,token,function(){
                    if(obj_banksoalan.success){
                        // token = obj_banksoalan.token;
                        // window.localStorage.token = token;
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
                                if(window.sessionStorage.id_siri_penilaian && window.sessionStorage.PK_bank_soalan){
                                    window.sessionStorage.removeItem('PK_bank_soalan');
                                    window.sessionStorage.removeItem('FK_infodetail');
                                    sessionStorage.child = "900a5a773ccfab87f28ae75375519def"; // PATAH BALIK PENGURUSAN BANK SOALAN SIRI PENILAIAN
                                    checkAuthentication(sessionStorage.child);
                                } else {                                
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
            }
            else{
                // for (var pair of form.entries()) {
                //     console.log(pair[0]+ ', ' + pair[1]); 
                // }
                update_bank_soalan(form,token,function(){
                    if(obj_banksoalan.success){
                        // token = obj_banksoalan.token;
                        // window.localStorage.token = token;
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
                                if(window.sessionStorage.id_siri_penilaian && window.sessionStorage.PK_bank_soalan){
                                    window.sessionStorage.removeItem('PK_bank_soalan');
                                    window.sessionStorage.removeItem('FK_infodetail');
                                    sessionStorage.child = "900a5a773ccfab87f28ae75375519def"; // PATAH BALIK PENGURUSAN BANK SOALAN SIRI PENILAIAN
                                    checkAuthentication(sessionStorage.child);
                                } else {
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
            }
        });
    }
});

//kemaskini bank soalan
function upt_bank_soalan(PK_bank_soalan){
    
    view_siri_soalan(PK_bank_soalan,window.localStorage.token,function(){
        if(objSiriSoalan.success){
            let data = objSiriSoalan.data;
            let jawapan = "";

            if(data.FK_jenis_soalan == "1"){
                $("#content_jawapan").html('');
                list_jawapan = JSON.parse(data.jawapan);
                let jawapan_form = "";
                let topik = [];
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
            else if(data.FK_jenis_soalan == "4"){
                $("#content_jawapan").html('');
                list_jawapan = JSON.parse(data.jawapan);
                let jawapan_form = "";
                let topik = [];
                numbers = 0;
                $.each(list_jawapan,function(i,field){
                    let num = (jawapan_list.length + 1);
                    numbers += 1;
                    jawapan_form =
                    `<div id="section_`+num+`">
                        <div class="row mb-3">
                            <div class="col-1">
                                <input type="radio" name="jawapan_point" id="radio_`+field.name+`" onclick="pick_jawapan('`+field.name+`')" value="`+numbers+`"  class="text-success">
                            </div>                
                            <div class="col-9">
                                <textarea name="`+field.name+`" id="`+field.name+`" class="tinymce">`+field.value+`</textarea>
                            </div>
                            <div class="col-1">
                                <a onclick="del_answer('`+field.name+`')" class="btn btn-link"><i class="fa fa-trash text-danger"></i></a>
                            </div>                
                        </div>
                    </div>`;
                    jawapan_list.push(num);
                    $("#content_jawapan").append(jawapan_form);
                    tinymce.remove("textarea#" + field.name);
                    setTinymce(field.name);
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
                $("#alert_skema").prop('class','d-none');
                $("#alert_jawapan").prop('class','alert alert-dark text-dark');
                $("#btn_addJawapanObjektif").prop('class','d-none');
                $("#content_jawapan").html('');
                $("#btn_addJawapanMulti").prop('class','d-none');
                $("#card_fileUpload").prop('class','d-none');    
                tinymce.remove("textarea#skema_jawapan");            
                setTinymce('skema_jawapan');
                $("#skema_jawapan").val(data.skema);

                let txt_topik = data.topik;
                if(data.topik != ''){
                    let topik = txt_topik.split(',');
                    if(topik.length > 1){

                    }

                    $("#pen_topik").tagsinput('removeAll');
                    $.each(topik, function(i,value) {
                        $('#pen_topik').tagsinput('add', value);
                    })
                    
                }
                $("#pen_topik").val(data.topik);
                // tinyMCE.get('skema_jawapan').setContent(data.skema);
            }
            else if(data.FK_jenis_soalan == "3"){
                list_jawapan = JSON.parse(data.jawapan);
                let skema = JSON.parse(data.skema);
                let jawapan_form = "";
                numbers = 0;

                $("#content_jawapan").html('');

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
                                    <input type="text" value="" name="mark_point_`+numbers+`" onblur="pick_jawapan_multi('`+numbers+`')" id="mark_point_`+numbers+`" class="form-control mt-3" placeholder="Markah Jawapan" />
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
                    setTinymce('jawapan_' + numbers); 
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
                
                $("#content_jawapan").append(data.jawapan);              
            }
            else{
                jawapan = `<textarea id="jawapan"></textarea>`;

            }
            
            $("#kod_soalan_upt").text(data.kod_soalan);
            tinyMCE.get('soalan_textarea').setContent(data.soalan);
            $("#jenis_soalan").val(data.FK_jenis_soalan);
            $("#pen_tahap").val(data.tahap);
            $("#markah").val(data.mark);
            let topik = data.topik.split(',');

            $("#pen_topik").tagsinput('removeAll');
            $.each(topik, function(i,value) {
                $('#pen_topik').tagsinput('add', value);
            })

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



function view_bank_soalan(PK_bank_soalan){
    
    view_siri_soalan(PK_bank_soalan,window.localStorage.token,function(){
        if(objSiriSoalan.success){
            let data = objSiriSoalan.data;
            let jawapan = "";
            tinymce.remove("textarea#jawapan");

            if(data.FK_jenis_soalan == "1" || data.FK_jenis_soalan == "4"){
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
            else if(data.FK_jenis_soalan == "3"){
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
            else if(data.FK_jenis_soalan == "6"){
                jawapan = data.jawapan;
            }
            else{
                jawapan = `<textarea id="jawapan"></textarea>`;

            }
            
            $("#kod_soalan_view").text(data.kod_soalan);
            $("#data_soalan_view").html(`
                <div class="border p-3 mb-3">`+data.soalan+`</div>
                <div class="">JAWAPAN<br>`+jawapan+`</div>
            `);

            if(data.FK_jenis_soalan == "2" || data.FK_jenis_soalan == "5"){
                $("#divJawapan").addClass('hidden');
                $("#divSkemaJawapan").removeClass('hidden');
                setTinymce('jawapan');
            } else {
                $("#divJawapan").removeClass('hidden');
                $("#divSkemaJawapan").addClass('hidden');
            }

            $("#view_soalan").modal('show');    
        }
        else{

        }
    });
}

function view_siri_soalan(PK_bank_soalan,token,returnValue){
    var form = new FormData();
    form.append("PK_bank_soalan", PK_bank_soalan);
    var settings = {
        "url": host+"banksoalan/view",
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
        objSiriSoalan = response;

        returnValue();
      });
}

// $('#btn_listBankSoalan').click(function(){

    

// });
$('#btn_listBankSoalan').click(function(){
    $('#soalanBerangkai').addClass('hidden');
    $('#det_soalan').addClass('hidden');
    $('#view_soalanBerangkai').addClass('hidden');
    $('#senaraiSoalan_append').removeClass('hidden');

    $("#form_soalan")[0].reset();
    $("#content_jawapan").html('');
    
    list_soalan(window.sessionStorage.id_penilaian,window.localStorage.token,function(){
        // console.log(window.sessionStorage.id_penilaian);
        if(obj_banksoalan.success){
            list_flag = [];

            $("#list_soalan_append").html('');
            $.each(obj_banksoalan.data,function(i,field){

                topik = "";
                let flag = '';
                if(field.topik != '' && field.topik != null){
                    list_topik = field.topik.split(',');

                    // console.log(list_topik);
                    $.each(list_topik,function(t,row){
                        topik += `<span class="badge badge-info">`+row+`</span> `;
                    });
                }
                

                let FK_infodetail = field.FK_infodetail;
                if(FK_infodetail == null){

                    $("#list_soalan_append").append(`
                    <div class="card border mb-3 class_soalan">
                        <div class="body">
                            <div class="row">
                                <div class="col-12">
                                    
                                    `+field.soalan+`                                        
                                    <small><i>`+topik+`</i></small>
                                    <table class="table">
                                        <tr><td><b>JENIS SOALAN</b><br>`+field.jenis_soalan+`</td><td><b>TAHAP</b><br>`+field.tahap+`</td></tr>
                                    </table>
                                </div>
                            </div>
                        <div class="justify-content-end d-flex ">
                            <button class="btn btn-warning btn-simple" onclick="upt_bank_soalan(`+field.PK_bank_soalan+`)"><i class="fa fa-pencil" ></i> Kemaskini</button>
                            <button class="btn btn-primary btn-simple" onclick="view_bank_soalan(`+field.PK_bank_soalan+`)"><i class="fa fa-list" ></i> Terperinci</button>
                        </div>
                    </div>
                    </div>
                    `);
                }else{
                    flag = list_flag.indexOf(FK_infodetail);
                    let append = '';

                    if(flag < 0){
                        list_flag.push(FK_infodetail);

                        var form = new FormData();
                        form.append('id_infodetails',FK_infodetail);

                        get_infodetails(form,window.localStorage.token,function(){
                            if(obj_det.success){

                                $("#list_soalan_append").append(`
                                <div class="card border mb-3 class_soalan">
                                    <div class="body">
                                        <div class="row">
                                            <div class="col-12">
                                                <b>SOALAN BERANGKAI</b>
                                                `+obj_det.data.teks+`
                                            </div>
                                        </div>
                                        <div class="justify-content-end d-flex ">
                                            <button class="btn btn-warning btn-simple" onclick="upt_soalan_berangkai(`+FK_infodetail+`)"><i class="fa fa-pencil"></i> Kemaskini</button>
                                            <button class="btn btn-primary btn-simple" data-bs-toggle="collapse" data-bs-target="#collapseExample_`+FK_infodetail+`" aria-expanded="false"
                                            aria-controls="collapseExample_`+FK_infodetail+`"><i class="fa fa-list"></i> Terperinci</button>
                                        </div>
                                        <div class="collapse border-top mt-2 pt-2" id="collapseExample_`+FK_infodetail+`">
                                            <div class="well" id="append_soalan_`+FK_infodetail+`"></div>
                                        </div>
                                    </div>
                                </div>
                                `);

                                list_infodetailsSoalan(FK_infodetail,window.localStorage.token,function(){
                                    // console.log(FK_infodetail);
                                    $('#append_soalan_'+FK_infodetail).html('');
                                    if(obj_info.success){

                                        // console.log(obj_info.data);
                                        $.each(obj_info.data,function(i,item){
                                            append = `
                                                <div class="col-md-12">
                                                    
                                                    `+item.soalan+`                                        
                                                    <small><i>`+topik+`</i></small>
                                                    <table class="table">
                                                        <tr><td><b>JENIS SOALAN</b><br>`+item.jenis_soalan+`</td><td><b>TAHAP</b><br>`+item.tahap+`</td></tr>
                                                    </table>
                                                </div>
                                            `;
                                            $('#append_soalan_'+FK_infodetail).append(append);
                                        });
                                    }
                                });
                                
                            }
                        });
                    }
                }
            });            
        }
    }); 
});

function upt_soalan_berangkai(FK_infodetail){
    $('#soalanBerangkai').removeClass('hidden');
    $('#det_soalan').removeClass('hidden');
    $('#senaraiSoalan_append').addClass('hidden');

    $('#id_infodetails').html(FK_infodetail);
    
    var form = new FormData();
    form.append('id_infodetails',FK_infodetail);

    get_infodetails(form,window.localStorage.token,function(){
        if(obj_det.success){

            let data = obj_det.data;
            $('#txt_teks').html(data.teks);

            list_infodetailsSoalan(FK_infodetail,window.localStorage.token,function(){
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

        }
    });//
}

function btnBatal(){
    $("#det_soalan").addClass('hidden');
    $("#senaraiSoalan_append").removeClass('hidden');
}

function list_soalan(id_penilaian,token,returnValue){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": host+"banksoalan/list/"+id_penilaian,
        // "url": host+"banksoalan/listNoInfodetails/"+id_penilaian,
        "method": "GET",
        "headers": {
          "Authorization": "penilaian "+token
        }
      };    
      var request = $.ajax(settings);

      request.done(function (response) {
        obj_banksoalan = response;

        returnValue();
      }); 
      
      request.fail(function (response) {
        obj_banksoalan = response;

        returnValue();
      });    
}

$("#search_bank_soalan").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".class_soalan").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});

$('#btn_updateSoalan').click(function(){

    let PK_bank_soalan = $('#PK_bank_soalan').html();
    upt_bank_soalan(PK_bank_soalan);
    // $('#det_soalan').removeClass('hidden');
    // $('#view_soalanBerangkai').addClass('hidden');
    // $('#btn_batalUpdateSoalan').removeClass('hidden');

    // let PK_bank_soalan = $('#PK_bank_soalan').val();

    // var form = new FormData();
    // form.append('PK_bank_soalan',PK_bank_soalan);

    // get_infodetailsSoalan(form,function(){

    //     if(obj_det.success){
    //         let data = obj_det.data;
    //         let FK_jenis_soalan = data.FK_jenis_soalan;
    //         let jawapan = data.jawapan;
    //         let jawapan_size = 0;
    //         let skema = data.skema;
    //         let skema_size = 0;
    //         let index = 0;
    //         let soalan = data.soalan;

    //         $('#jenis_soalan').val(FK_jenis_soalan);

    //         tinymce.remove("textarea#soalan_textarea");

    //         tinymce.init({
    //             selector: 'textarea#soalan_textarea',
    //             menubar: false,
    //             height: 250,
    //             submit_patch : false,
    //             add_form_submit_trigger : false,
    //             toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat ',
    //             tinycomments_mode: 'embedded',
    //             tinycomments_author: 'Author name',
    //             mergetags_list: [
    //             { value: 'First.Name', title: 'First Name' },
    //             { value: 'Email', title: 'Email' },
    //             ],
    //             plugins: [
    //                 'image','media','table','lists',
    //             ],
    //             images_upload_url: host+'fileUpload',
    //             images_upload_credentials: true,
    //         });

    //         $('#txt_soalan').html(soalan);
    //         if(FK_jenis_soalan != 2 && FK_jenis_soalan != 5){
    //             jawapan = JSON.parse(jawapan);
    //             jawapan_size = jawapan.length-1;

    //             if(FK_jenis_soalan == 3){
    //                 skema = JSON.parse(skema);
    //                 skema_size = skema.length;

    //                 $.each(jawapan,function(i,item){

    //                 });
    //             }else if(FK_jenis_soalan == 1){
    //                 $('#content_jawapan').html('');

    //                 let num = jawapan.length+1;
    //                 let total_ans = jawapan.length-1;
    //                 let last_ind = jawapan[total_ans].name.split('_');
    //                 numbers = last_ind[1];
    //                 $("#num_answers").val(numbers);
    //                 $.each(jawapan,function(i,item){
    //                     index = item.name.split('_');

    //                     if(index[1] == skema){
    //                         $('#content_jawapan').html(`
    //                         <div id="section_`+index[1]+`">
    //                             <div class="row mb-3">
    //                                 <div class="col-1">
    //                                     <input type="radio" checked name="jawapan_point" id="radio_jawapan_`+index[1]+`" onclick="pick_jawapan('`+index[1]+`')" value="`+index[1]+`"  class="text-success">
    //                                 </div>                
    //                                 <div class="col-9">
    //                                     <textarea name="jawapan_`+index[1]+`" id="jawapan_`+index[1]+`" class="tinymce">`+item.value+`</textarea>
    //                                 </div>
    //                                 <div class="col-1">
    //                                     <a onclick="del_answer('`+index[1]+`')" class="btn btn-link"><i class="fa fa-trash text-danger"></i></a>
    //                                 </div>                
    //                             </div>
    //                         </div>
    //                         `);
    //                     }else{
    //                         $('#content_jawapan').html(`
    //                         <div id="section_`+index[1]+`">
    //                             <div class="row mb-3">
    //                                 <div class="col-1">
    //                                     <input type="radio" checked name="jawapan_point" id="radio_jawapan_`+index[1]+`" onclick="pick_jawapan('`+index[1]+`')" value="`+index[1]+`"  class="text-success">
    //                                 </div>                
    //                                 <div class="col-9">
    //                                     <textarea name="jawapan_`+index[1]+`" id="jawapan_`+index[1]+`" class="tinymce">`+item.value+`</textarea>
    //                                 </div>
    //                                 <div class="col-1">
    //                                     <a onclick="del_answer('`+index[1]+`')" class="btn btn-link"><i class="fa fa-trash text-danger"></i></a>
    //                                 </div>                
    //                             </div>
    //                         </div>
    //                         `);
    //                     }
    //                     jawapan_list.push(num);
    //                 });
    //             }else{
    //                 $.each(jawapan,function(i,item){
    //                     index = item.name.split('_');
    //                     if(index[1] == skema){

    //                     }else{}
    //                 });
    //             }
    //         }else{

    //         }
    //     }
    // });
});

$('#btn_batalUpdateSoalan').click(function(){

    $('#det_soalan').addClass('hidden');
    $('#view_soalanBerangkai').removeClass('hidden');
    $('#btn_batalUpdateSoalan').addClass('hidden');

    get_infodetailsSoalan(form,function(){

        if(obj_det.success){
            let data = obj_det.data;
            let FK_jenis_soalan = data.FK_jenis_soalan;
            let jawapan = data.jawapan;
            let jawapan_size = 0;
            let skema = data.skema;
            let skema_size = 0;
            let index = 0;
        }

        tinymce.remove("textarea#soalan_textarea");

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

        $('#soalan_textarea').val()

    });
});

function viewInfodetailsSoalan(PK_bank_soalan){

    let id_infodetails = $('#id_infodetails').html();
    $('#btnAdd').addClass('btn-simple');
    list_infodetailsSoalan(id_infodetails,window.localStorage.token,function(){
        if(obj_info.success){
            let data = obj_info.data;

            // console.log(data);
            $.each(data,function(i,item){
                if(PK_bank_soalan == item.PK_bank_soalan){
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
    $('#PK_bank_soalan').html('');

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

            $('#det_soalan').addClass('hidden');
            $('#view_soalanBerangkai').removeClass('hidden');

            if(FK_jenis_soalan != 2 && FK_jenis_soalan != 5){
                $("#divJawapan").removeClass('hidden');
                $("#divSkemaJawapan").addClass('hidden');
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
                $("#divJawapan").addClass('hidden');
                $("#divSkemaJawapan").removeClass('hidden');
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
            $('#txt_mark').html(data.mark);
            $('#PK_bank_soalan').html(PK_bank_soalan).addClass('d-none');
            
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

        // console.log(obj_info);
        // obj_info = JSON.parse(response);

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"senarai bank soalan berangkai Error","data":""};
        obj_info = response;

        returnValue();
    });
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

            if($('#flag_teks').html() > 0){
                form.append('id_infodetails',$('#id_infodetails').html());
                update_infodetails(form,token,function(){
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
    
                                $('#modalSoalanBerangkai').modal('hide');
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
            }else{
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
    
                                $('#modalSoalanBerangkai').modal('hide');
                                $('#soalanBerangkai').removeClass('hidden');
                                $('#soalan').addClass('hidden');
                                $('#senaraiSoalan_append').addClass('hidden');
    
                                $('#id_infodetails').html(obj_infodetail.data);
    
                                var form2 = new FormData();
                                form2.append('id_infodetails',obj_infodetail.data);
    
                                get_infodetails(form2,token,function(){
                                    if(obj_det.success){
    
                                        let data = obj_det.data;
    
                                        $('#txt_teks').html(data.teks);
                                        // tinymce.remove("textarea#teks_textarea");
    
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
            }
            
        });
    }
});

function viewSoalanBerangkai(flag){
    
    $('#btn_viewSoalanBerangkai').removeClass('btn-simple');
    $('#det_soalan').removeClass('hidden');
    $('#view_soalanBerangkai').addClass('hidden');

    if(flag > 0){

    }
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

function update_infodetails(form,token,returnValue){
    var settings = {
        "url": host+"infodetails/update",
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

function bank_soalan(form,token,returnValue){
    var settings = {
        "url": host+"banksoalan/add",
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

function update_bank_soalan(form,token,returnValue){
    var settings = {
        "url": host+"banksoalan/update",
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
//END FORM SOALAN SUBMIT