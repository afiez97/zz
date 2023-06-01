let json_list_bahagian = [], json_list_soalan = [];
$(function () {
    $.ajaxSetup({
        cache: false
    });
    token = window.localStorage.token;
    countDownTimer();
    secondsToHms(duration_master);
    $("#text_nama_penilaian").html(nama_penilaian_master);
    $("#text_kod_siri_penilaian").html(kod_siri_penilaian_master);
    $("#topRightDD").html('');
    let json_list = JSON.parse(json_list_master);
    bil = 1;
    let first = 0;
    let count = 1;
    $.each(json_list,function(i,field){
        let bahagian = field.bahagian.replaceAll(' ', '_');
        json_list_bahagian.push({
            bahagian: bahagian
        });
        $("#total_soalan").html(field.soalan.length);
        $.each(field.soalan,function(x,row){
            json_list_soalan.push({
                bahagian: bahagian,
                PK_siri_soalan: row.id
            });
        });
        var form = new FormData();
        form.append("json_list_soalan",JSON.stringify(json_list_soalan));
        list_allSoalan(form,window.localStorage.token,function(){
            $("#content-soalan").html('');
            // $("#overview-soalan").html('');
            $.each(obj_siriSoalan.data,function(x,row){
                if(json_list_soalan.filter(e => e.PK_siri_soalan == row.PK_siri_soalan)){
                    let index = json_list_soalan.findIndex(e => e.PK_siri_soalan == row.PK_siri_soalan);
                    json_list_soalan[index].jawapan = row.jawapan;
                    json_list_soalan[index].FK_jenis_soalan = row.FK_jenis_soalan;
                    json_list_soalan[index].kod_soalan = row.kod_soalan;
                    json_list_soalan[index].soalan = row.soalan;
                    json_list_soalan[index].FK_infodetail = row.FK_infodetail;
                    json_list_soalan[index].teks = row.teks;
                }
            });
            $.each(json_list_soalan, function(i, item){ // initialize jawapan
                var form = new FormData();
                form.append("FK_calon_soalan", id_calon_soalan_master);
                form.append("no_kad_pengenalan", noic_master);
                form.append("FK_siri_soalan", item.PK_siri_soalan);
                form.append("jawapan", "");
                form.append("FK_siri_penilaian", window.sessionStorage.isp);
    
                var settings = {
                    "url": host+"calon_jawapan/register",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                      "AuthorizationExam": window.localStorage.token
                    },
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": form
                };
            
                let request = $.ajax(settings);
                
                request.done(function (response) {
                    
                });
            });
            console.log(i);
            if(json_list.length == (i+1)){
                swal({
                    title: $("#text_nama_penilaian").html(),
                    text: "Sila Jawab Soalan Dalam Masa Yang Diberi. Terima Kasih.",
                    type: "info",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    html: false,
                    timer: 1000
                }).then(function(){},
                    function (dismiss) {
                        $.each(json_list_bahagian, function(i, item){
                            $("#overview-soalan").append(`
                                <div id="div_`+item.bahagian+`"><hr><p>`+item.bahagian.replaceAll('_', ' ')+`</p><br></div>
                            `);
                        });
                        $("#overview-soalan").append(`
                            <div id="div_tamat"><hr><p><button class="btn btn-danger" onclick="logKeluarExam('Menamatkan Penilaian');"><i class="fa fa-sign-out"></i> TAMAT PENILAIAN</button></p><br></div>
                        `);
                        let bil = 1;
                        let first = 0;
                        console.log(json_list_soalan);
                        $.each(json_list_soalan,function(i, item){
                            if(first == 0){
                                first = item.PK_siri_soalan;
                            }
                            teks = "";
                            soalan = "";
                            jawapan = "";
                            dnone = 'd-none';
                            btnbg = 'bg-white';
                            if(first == item.PK_siri_soalan){
                                dnone = '';
                                btnbg = 'bg-danger';
                                currentQ = item.PK_siri_soalan;
                            }
                            $("#div_"+item.bahagian).append(`
                            <button class="btn btn-circle `+btnbg+` btn-outline-dark mt-2" id="overview`+item.PK_siri_soalan+`" onclick="dispSoalan('`+item.PK_siri_soalan+`')">` + bil + `</button>
                            `);
                            if(item.FK_jenis_soalan == "1" || item.FK_jenis_soalan == "3" || item.FK_jenis_soalan == "4"){
                                box = `<input type="radio" name="`+ item.kod_soalan;
                                if(item.FK_jenis_soalan == "3"){
                                    box = `<input type="checkbox" name="`+ item.kod_soalan;
                                }
                                jawapan = `<ul class="list-unstyled">`;
                                $.each(JSON.parse(item.jawapan),function(a,rows){
                                    value = rows.name.split("jawapan_");
                                    if(item.FK_jenis_soalan == "3"){
                                        jawapan += `<li class="mb-2">`+box+`" id="`+ item.kod_soalan + rows.value +`" value="`+value[1]+`" onclick="cCheckBox('`+ item.kod_soalan +`','`+item.PK_siri_soalan+`');"/> <label for="`+ item.kod_soalan + rows.value +`">`+rows.value+`</label></li>`;
                                    } else {
                                        jawapan += `<li class="mb-2">`+box+`" id="`+ item.kod_soalan + rows.value +`" value="`+value[1]+`" onclick="regJ(this.value,'`+item.PK_siri_soalan+`');"/> <label for="`+ item.kod_soalan + rows.value +`">`+rows.value+`</label></li>`;
                                    }
                                });
                                jawapan += `</ul>`;    
                            }
                            else if(item.FK_jenis_soalan == "6"){
                                jawapan = item.jawapan.replaceAll(`class="form-control"`,`class="form-control" onchange="uUploadFile(this.id,this.files[0],'`+item.PK_siri_soalan+`','`+item.kod_soalan+`')"`);
                                jawapan += `<textarea class="d-none" id="`+item.kod_soalan+`"></textarea>`;
                            }
                            else{
                                jawapan = `<textarea id="textarea`+ item.kod_soalan + `" name="textarea`+ item.kod_soalan + `" class="tinymce" cols="100" rows="4" placeholder="Sila Jawab Di Sini..." onchange="regJ(this.value,'`+item.PK_siri_soalan+`')"></textarea>`;
                            }
                            if(first == item.PK_siri_soalan){
                                dnone = '';
                                btnbg = 'bg-danger';
                                currentQ = item.PK_siri_soalan;
                                $("#kod_set").html(item.bahagian.replaceAll('_', ' '));
                            }
                            if(item.teks != null){
                                teks = `<div class="mb-3" style="background-color: lightgrey;">` + item.teks + `</div>`;
                                while(teks.indexOf('<p>')>=0){
                                    teks = teks.replace('<p>','<p style="display: block; color: black;" class="m-3">');
                                }
                                while(teks.indexOf('<p dir="ltr">')>=0){
                                    teks = teks.replace('<p dir="ltr">','<p dir="ltr" style="display: block; color: black;" class="m-3">');
                                }
                                while(teks.indexOf('<p dir="ltr" style="text-align: right;">')>=0){
                                    teks = teks.replace('<p dir="ltr" style="text-align: right;">','<p dir="ltr" style="display: block; color: black; text-align: right;">');
                                }
                                while(teks.indexOf('<p dir="ltr" style="text-align: center;">')>=0){
                                    teks = teks.replace('<p dir="ltr" style="text-align: center;">','<p dir="ltr" style="display: block; color: black; text-align: center;">');
                                }
                            }
                            if(item.soalan != null){
                                soalan = item.soalan;
                                while(soalan.indexOf('<p>')>=0){
                                    soalan = soalan.replace('<p>','<p style="display: block; color: black;" class="m-3">');
                                }
                                while(soalan.indexOf('<p dir="ltr">')>=0){
                                    soalan = soalan.replace('<p dir="ltr">','<p dir="ltr" style="display: block; color: black;" class="m-3">');
                                }
                                while(soalan.indexOf('<p dir="ltr" style="text-align: right;">')>=0){
                                    soalan = soalan.replace('<p dir="ltr" style="text-align: right;">','<p dir="ltr" style="display: block; color: black; text-align: right;">');
                                }
                                while(soalan.indexOf('<p dir="ltr" style="text-align: center;">')>=0){
                                    soalan = soalan.replace('<p dir="ltr" style="text-align: center;">','<p dir="ltr" style="display: block; color: black; text-align: center;">');
                                }
                                while(soalan.indexOf('<p dir="ltr" style="text-align: left;">')>=0){
                                    soalan = soalan.replace('<p dir="ltr" style="text-align: left;">','<p dir="ltr" style="display: block; color: black; text-align: left;">');
                                }
                            }
                            if(item.teks != null){
                                $("#content-soalan").append(`
                                <div class="card border mb-2 `+dnone+`" id="soalan`+item.PK_siri_soalan+`">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-7">
                                                `+teks+`
                                            </div>
                                            <div class="col-md-5">
                                                <div class="mb-3">
                                                `+`<span style="color: black;font-size: 12.0pt; mso-fareast-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">` + (bil) + `.</span> <span style="color: black;">` +soalan+`</span>
                                                </div>
                                                <div class="mb-3">
                                                `+jawapan+`
                                                </div>                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `);
                            } else {
                                $("#content-soalan").append(`
                                <div class="card border mb-2 `+dnone+`" id="soalan`+item.PK_siri_soalan+`">
                                    <div class="card-body">
                                        `+teks+`
                                        <div class="mb-3">
                                        `+`<span style="color: black;font-size: 12.0pt; mso-fareast-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">` + (bil) + `.</span> <span style="color: black;">` +soalan+`</span>
                                        </div>
                                        <div class="mb-3">
                                        `+jawapan+`
                                        </div>
                                    </div>
                                </div>
                                `);
                            }
                            if($("#content-soalan").html().indexOf(`textarea` + item.kod_soalan) >= 0){
                                setTinymce(`textarea` + item.kod_soalan,item.PK_siri_soalan);
                            }
                            
                            bil++;
                        });                        
                    }
                );
            }
        });
        // console.log(JSON.stringify(json_list_soalan));
    });
    // webCam();
});

function setTinymce(id_name, PK_siri_soalan){
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
        plugins:'table',
        setup:function(ed) {
            ed.on('change', function(e) {
                regJ(ed.getContent(),PK_siri_soalan);
            });
        }
    });
}

function dispSoalan(id){
    $("#soalan"+currentQ).addClass('d-none');
    if($("#overview"+currentQ).hasClass("bg-success")){
        $("#overview"+currentQ).prop('class', 'btn btn-circle bg-success btn-outline-dark mt-2');
    } else {
        $("#overview"+currentQ).prop('class', 'btn btn-circle bg-yellow btn-outline-dark mt-2');
    }
    currentQ = id;
    $("#soalan"+id).removeClass('d-none');
    if($("#overview"+currentQ).hasClass("bg-success")){
        $("#overview"+id).prop('class', 'btn btn-circle bg-success btn-outline-dark mt-2');
    } else {
        $("#overview"+id).prop('class', 'btn btn-circle bg-danger btn-outline-dark mt-2');
    }
}

function cCheckBox(inputName, FK_siri_soalan){
    let ansCheckBox = $("input[name='"+inputName+"']:checked").map(function(){
        return $(this).val();
    }).toArray();
    regJ(ansCheckBox, FK_siri_soalan);
}

function uUploadFile(fileUploadId, fileUpload, FK_siri_soalan, kod_soalan){
    var form = new FormData();
    form.append("bil", fileUploadId);
    form.append("file", fileUpload);
    form.append("FK_calon_soalan", id_calon_soalan_master);
    form.append("no_kad_pengenalan", noic_master);
    form.append("FK_siri_soalan", FK_siri_soalan);
    form.append("FK_siri_penilaian", window.sessionStorage.isp);
    
    var settings = {
        "url": host+"calon_jawapan/uploadFile",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "AuthorizationExam": window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };
    
    let request = $.ajax(settings);
    
    request.done(function (response) {
        let obj = JSON.parse(response);
        let textarea = [];
        if($("#"+kod_soalan).val() != null && $("#"+kod_soalan).val() != ''){
            textarea = JSON.parse($("#"+kod_soalan).val());
        }
        let data = obj.data.split("_");
        if(textarea.length == 0){
            textarea.push({
                file: data[0] + "_" + data[1],
                name: "uploads_jawapan/" + obj.data
            });
        } else {
            let check = 0;
            $.each(textarea, function(i, item){
                if(item.file == data[0] + "_" + data[1]){
                    textarea[i].name = "uploads_jawapan/" + obj.data;
                    i = textarea.length + 1;
                    check = textarea.length + 1;
                }
            });
            if(check != textarea.length+1){
                textarea.push({
                    file: data[0] + "_" + data[1],
                    name: "uploads_jawapan/" + obj.data
                });
            }
        }
        $("#"+kod_soalan).val(JSON.stringify(textarea));
        regJ(JSON.stringify(textarea), FK_siri_soalan);
    });
}

function regJ(jawapan, FK_siri_soalan){
    var form = new FormData();
    form.append("FK_calon_soalan", id_calon_soalan_master);
    form.append("no_kad_pengenalan", noic_master);
    form.append("FK_siri_soalan", FK_siri_soalan);
    form.append("jawapan", jawapan);
    form.append("FK_siri_penilaian", window.sessionStorage.isp);
    var settings = {
        "url": host+"calon_jawapan/register",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "AuthorizationExam": window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    let request = $.ajax(settings);
    
    request.done(function (response) {
        obj = JSON.parse(response);
        $("#total_jawab").html(parseInt($("#total_jawab").html()) + parseInt(obj.data));
        $("#overview"+FK_siri_soalan).prop('class', 'btn btn-circle bg-success btn-outline-dark');        
    });

    request.fail(function(){
        response = {"success":false,"message":"Error","data":""};
        obj = response;
    });  
}

function list_allSoalan(form,token,returnValue){
    var settings = {
        "url": host+"sirisoalan/listAllSoalan",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "AuthorizationExam": token
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
        response = {"success":false,"message":"data siri soalan Error","data":""};
        obj_siriSoalan = response;

        returnValue();
    });     
}

function countDownTimer(){
    // Set the date we're counting down to
    var countDownDate = new Date(tarikh_tamat_master + " " + masa_tamat_master).getTime();
    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();
            
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
            
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
        // Output the result in an element with id="countdown_masa"
        document.getElementById("countdown_masa_hari").innerHTML = days;
        document.getElementById("countdown_masa_jam").innerHTML = hours;
        document.getElementById("countdown_masa_minit").innerHTML = minutes;
        document.getElementById("countdown_masa_saat").innerHTML = seconds;
            
        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            // document.getElementById("countdown_masa").innerHTML = "TAMAT";
            swal({
                title: "Masa Menjawab Telah Tamat",
                // text: "Berjaya Kemaskini Profile!",
                type: "info",
                showConfirmButton: false,
                allowOutsideClick: false,
                html: false,
                timer: 2000
            }).then(function(){},
                function (dismiss) {
                    if (dismiss === 'timer') {
                        window.sessionStorage.clear();
                        window.localStorage.clear();
                        window.location.reload();
                    }
                }
            );            
        }
    }, 1000);
}

function webCam(snap){
    Webcam.set({
        width: 320,
        height: 240,
        image_format: 'jpeg',
        jpeg_quality: 90,
        flip_horiz: true
    });
    Webcam.attach( '#my_camera' );
    var x = setInterval(function() {
        Webcam.snap( function(data_uri) {    
            var image = new Image();
            image.src = data_uri;
            $("#my_image").attr("src",data_uri);
            json_image.push({
                data_uri
            });
            var form = new FormData();
            form.append("id_calon_soalan", id_calon_soalan_master);
            form.append("image", JSON.stringify(json_image));
            var settings = {
                "url": host+"calon_soalan/updateImage",
                "method": "POST",
                "timeout": 0,
                "headers": {
                  "AuthorizationExam": window.localStorage.token
                },
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": form
            };
            
            let request = $.ajax(settings);
            
            request.done(function (response) {

            });
        });
    }, 10000);
}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " JAM " : " JAM ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " MINIT " : " MINIT ") : "";
    $("#total_masa").html(hDisplay + mDisplay);
}