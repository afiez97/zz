$(function () {
    $.ajaxSetup({
        cache: false
    });    
    checkSession();
    let token = window.localStorage.token;
    $("#btnKembali").attr('onclick','kembali2(\'' + sessionStorage.id_penilaian + '\')');
    $("#leftsidebar").load('../aside/aside_detail_siri_penilaian.html');
    let id_siri_penilaian = sessionStorage.id_siri_penilaian;
    resetForm();
    load_siri_penilaian(id_siri_penilaian,token,function(){        
        if(objSiriPenilaian.success){
            let data = objSiriPenilaian.data;
            $("#nama_penilaian").html(data.nama_penilaian + " SIRI " + data.kod+"/"+data.tahun);
        }
    });
    var form = new FormData();
    form.append("id_calon_soalan", window.sessionStorage.id_calon_soalan);
    showCalonSoalan(form,function(){
        let json_list_bahagian = [], json_list_soalan = [];
        let data = obj.data;
        console.log(data);
        let json_list = JSON.parse(data.json_list);
        $.each(json_list,function(i,field){
            let bahagian = field.bahagian.replaceAll(' ', '_');
            json_list_bahagian.push({
                bahagian: bahagian
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
                $("#content-soalan").html('');
                $("#overview-soalan").html('');
                $.each(obj_siriSoalan.data,function(x,row){
                    if(json_list_soalan.filter(e => e.PK_siri_soalan == row.PK_siri_soalan)){
                        let index = json_list_soalan.findIndex(e => e.PK_siri_soalan == row.PK_siri_soalan);
                        json_list_soalan[index].jawapan = row.jawapan;
                        json_list_soalan[index].FK_jenis_soalan = row.FK_jenis_soalan;
                        json_list_soalan[index].kod_soalan = row.kod_soalan;
                        json_list_soalan[index].soalan = row.soalan;
                        json_list_soalan[index].FK_infodetail = row.FK_infodetail;
                        json_list_soalan[index].teks = row.teks;
                        json_list_soalan[index].skema = row.skema;
                        if(row.mark != null && row.mark != ''){
                            json_list_soalan[index].mark = row.mark;
                        } else {
                            json_list_soalan[index].mark = "0";
                        }
                    }
                });
                var formJawapan = new FormData();
                formJawapan.append("FK_calon_soalan", window.sessionStorage.id_calon_soalan);
                formJawapan.append("FK_siri_penilaian", window.sessionStorage.id_siri_penilaian);
                list_allJawapan(formJawapan,window.localStorage.token,function(){
                    $.each(obj_Jawapan.data,function(x,row){
                        if(json_list_soalan.filter(e => e.PK_siri_soalan == row.FK_siri_soalan)){
                            let index = json_list_soalan.findIndex(e => e.PK_siri_soalan == row.FK_siri_soalan);
                            json_list_soalan[index].jawapan_calon = row.jawapan;
                            json_list_soalan[index].id_calon_jawapan = row.id_calon_jawapan;
                            json_list_soalan[index].markah_jawapan = row.markah_jawapan;
                        }
                    });
                    let bil = 1;
                    let total_mark = 0.00;
                    let mark = 0.00;
                    let betul = 0;
                    let salah = 0;
                    let first = 0;
                    $.each(json_list_soalan,function(i, item){
                        if(item.jawapan_calon == null){
                            var form = new FormData();
                            form.append("FK_calon_soalan", data.id_calon_soalan);
                            form.append("no_kad_pengenalan", data.no_kad_pengenalan);
                            form.append("FK_siri_soalan", item.PK_siri_soalan);
                            form.append("jawapan", "");
                            form.append("FK_siri_penilaian", window.sessionStorage.id_siri_penilaian);
                            var settings = {
                                "url": host+"calon_jawapan/register",
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
                                window.location.reload();
                            });
                        }
                        if(first == 0){
                            first = item.PK_siri_soalan;
                        }
                        teks = "";
                        jawapan = "";
                        dnone = '';
                        btnbg = 'bg-white';
                        if(first == item.PK_siri_soalan){
                            dnone = '';
                            btnbg = 'bg-danger';
                            currentQ = item.PK_siri_soalan;
                        }
                        $("#div_"+item.bahagian).append(`
                        <button class="btn btn-circle `+btnbg+` btn-outline-dark mt-2" id="overview`+item.PK_siri_soalan+`" onclick="dispSoalan('`+item.PK_siri_soalan+`')">` + bil + `</button>
                        `);
                        let markHTML = '';
                        if(item.FK_jenis_soalan == "1" || item.FK_jenis_soalan == "3" || item.FK_jenis_soalan == "4"){
                            let abcd = ['A','B','C','D','E','F','G','H','I','J','K','L'];
                            box = `<span name="`+ item.kod_soalan;
                            if(item.FK_jenis_soalan == "3"){
                                box = `<span`;
                            }
                            jawapan = `<ul class="list-unstyled">`;
                            mark = 0.00;
                            if(item.FK_jenis_soalan == "1" || item.FK_jenis_soalan == "4"){
                                $.each(JSON.parse(item.jawapan),function(a,rows){
                                    value = rows.name.split("jawapan_");
                                    if(value[1] == item.skema){
                                        if(item.skema == item.jawapan_calon){
                                            mark = item.mark;
                                            betul++;
                                            total_mark = parseFloat(total_mark) + parseFloat(mark);
                                            textColor = 'color: green; font-weight: bold; text-decoration: underline;';
                                        } else {
                                            textColor = 'color: green; font-weight: bold; text-decoration: underline;';
                                        }
                                        jawapan += `<li style="`+ textColor +`">`+box+`" id="`+ item.kod_soalan + rows.value +`">`+abcd[a]+`. </span> <label style="`+ textColor +`" for="`+ item.kod_soalan + rows.value +`">`+rows.value+`</label></li>`;
                                    } else {
                                        if(value[1] == item.jawapan_calon){
                                            salah++;
                                            textColor = 'color: red;';
                                        } else {
                                            textColor = '';
                                        }
                                        jawapan += `<li style="`+ textColor +`" >`+box+`" id="`+ item.kod_soalan + rows.value +`">`+abcd[a]+`. </span> <label for="`+ item.kod_soalan + rows.value +`">`+rows.value+`</label></li>`;
                                    }
                                });
                                jawapan += `</ul>`;
                                markHTML = `<span style="font-weight: bold;">`+mark+`/`+item.mark+`</span>`;
                            } else {
                                let markCheckBox = 0;
                                $.each(JSON.parse(item.jawapan),function(a,rows){
                                    textColor = '';
                                    value = rows.name.split("jawapan_");
                                    skema = JSON.parse(item.skema);
                                    answer_marks = '';
                                    if(item.jawapan_calon != '' && item.jawapan_calon != null){
                                        jawapan_calon = item.jawapan_calon.split(',');
                                        $.each(skema, function(s,scheme){
                                            if(value[1] == scheme[0]){
                                                if(jawapan_calon.findIndex(x => x === value[1]) >= 0){
                                                    markCheckBox = parseFloat(markCheckBox) + parseFloat(scheme[1]);
                                                    mark = markCheckBox;
                                                    total_mark = parseFloat(total_mark) + parseFloat(scheme[1]);
                                                    textColor = 'color: green; font-weight: bold; text-decoration: underline;';
                                                    // answer_marks = `(<span style="text-decoration: italic;">Markah/Marks: `+scheme[1]+`</span>)`;
                                                    s = skema.length + 1;
                                                    check = skema.length + 1;
                                                } else {
                                                    textColor = 'color: green;';
                                                }
                                            }
                                        });
                                        if(textColor == ''){
                                            if(jawapan_calon.findIndex(x => x === value[1]) >= 0){
                                                salah++;
                                                textColor = 'color: red;';
                                            } else {
                                                textColor = '';
                                            }
                                        }
                                        jawapan += `<li style="`+ textColor +`">`+box+`" id="`+ item.kod_soalan + rows.value +`">`+abcd[a]+`. </span> <label style="`+ textColor +`" for="`+ item.kod_soalan + rows.value +`">`+rows.value+`</label> `+answer_marks+`</li>`;    
                                        updateMarks(markCheckBox,item.mark,item.id_calon_jawapan);
                                    } else {
                                        $.each(skema, function(s,scheme){
                                            if(value[1] == scheme[0]){
                                                textColor = 'color: green;';
                                            }
                                        });
                                        jawapan += `<li style="`+ textColor +`">`+box+`" id="`+ item.kod_soalan + rows.value +`">`+abcd[a]+`. </span> <label style="`+ textColor +`" for="`+ item.kod_soalan + rows.value +`">`+rows.value+`</label> `+answer_marks+`</li>`;                                            
                                    }
                                });
                                jawapan += `</ul>`;
                                markHTML = `<span style="font-weight: bold;">`+mark+`/`+item.mark+`</span>`;
                            }
                            updateMarks(mark,item.mark,item.id_calon_jawapan);
                        }
                        else if(item.FK_jenis_soalan == "6"){
                            if(item.jawapan_calon != '' && item.jawapan_calon != null){
                                jawapan_calon = JSON.parse(item.jawapan_calon);
                                // console.log(jawapan_calon);
                                jawapan += `<table class="table table-bordered">`;
                                $.each(jawapan_calon, function(f, field){
                                    jawapan += `<tr>
                                                    <td>Fail `+(f+1)+`</td><td><img src="`+host+field.name+`" height="200px"></td>
                                                </tr>`;
                                });
                                jawapan += `</table>`;
                                markHTML = `<input value="`+item.markah_jawapan+`" id="soalan_`+item.id_calon_jawapan+`" name="soalan_`+item.id_calon_jawapan+`" onchange="updateMarks(this.value, `+item.mark+`, `+item.id_calon_jawapan+`)" type="number" step=".01" min="0" max="`+item.mark+`"><span style="font-weight: bold;">/`+item.mark+`</span>`;
                                // jawapan = item.jawapan;
                            } else {
                                jawapan += `<b>CALON TIDAK MENJAWAB SOALAN INI.</b>`;
                                markHTML = `<input value="`+item.markah_jawapan+`" id="soalan_`+item.id_calon_jawapan+`" name="soalan_`+item.id_calon_jawapan+`" onchange="updateMarks(this.value, `+item.mark+`, `+item.id_calon_jawapan+`)" type="number" step=".01" min="0" max="`+item.mark+`"><span style="font-weight: bold;">/`+item.mark+`</span>`;
                            }
                        }
                        else{
                            jawapan = `<textarea id='textarea`+ item.kod_soalan + `' class'tinymce' cols='100' rows='4' readonly></textarea>`;    
                            markHTML = `<input value="`+item.markah_jawapan+`" id="soalan_`+item.id_calon_jawapan+`" name="soalan_`+item.id_calon_jawapan+`" onchange="updateMarks(this.value, `+item.mark+`, `+item.id_calon_jawapan+`)" type="number" step=".01" min="0" max="`+item.mark+`"><span style="font-weight: bold;">/`+item.mark+`</span>`;
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
                                            <div class="mb-3 row">
                                                <div class="col-1">
                                                    <span style="color: black;font-size: 12.0pt; mso-fareast-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">` + (bil) + `.</span> 
                                                </div>
                                                <div class="col-11">
                                                    <div class="mb-3">
                                                        <span style="color: black;">` +item.soalan+`</span>                                            
                                                    </div>
                                                    <div class="mb-3">
                                                        `+jawapan+`
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mb-3 float-sm-end float-md-end float-lg-end float-xl-end">
                                                <span style="font-weight: bold;">`+mark+`</span>
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
                                    <div class="mb-3 row">
                                        <div class="col-1">
                                            <span style="color: black;font-size: 12.0pt; mso-fareast-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">` + (bil) + `.</span> 
                                        </div>
                                        <div class="col-11">
                                            <div class="mb-3">
                                                <span style="color: black;">` +item.soalan+`</span>                                            
                                            </div>
                                            <div class="mb-3">
                                                `+jawapan+`
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mb-3 float-sm-end float-md-end float-lg-end float-xl-end">
                                        `+markHTML+`
                                    </div>
                                </div>
                            </div>
                            `);
                        }
                        if($("#content-soalan").html().indexOf(`textarea` + item.kod_soalan) >= 0){
                            $("#textarea"+item.kod_soalan).val(item.jawapan_calon);
                            setTinymce(`textarea` + item.kod_soalan,item.PK_siri_soalan);
                        }
                        if(bil == json_list_soalan.length){
                            // $("#content-soalan").append(`
                            // <div class="card border mb-2">
                            //     <div class="card-body">
                            //         <div class="mb-3">
                            //             <span style="font-weight: bold;">Jumlah Markah: `+total_mark+`</span><br>
                            //         </div>
                            //     </div>
                            // </div>
                            // `);
                        }
                        bil++;
                    });
                });
            });
            // console.log(JSON.stringify(json_list_soalan));
        });
    });
});

function updateMarks(markah_jawapan, full_mark, id_calon_jawapan){
    if(markah_jawapan <= full_mark && markah_jawapan >= 0){
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
    } else {
        swal({
            title: "Ralat Markah",
            text: "Nilai yang dibenarkan: 0.00-"+full_mark,
            type: "error",
            showConfirmButton: false,
            allowOutsideClick: false,
            html: false,
            timer: 1000
        }).then(function(){},
            function (dismiss) {
                if (dismiss === 'timer') {
                    $("#soalan_"+id_calon_jawapan).val('0').focus();
                }
            }
        );
    }
}

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
    });
}

function load_calon_soalan(FK_sesi){
    var columns = [
        { "name": "bil", "title": "Bil" },
        { "name": "nama", "title": "Nama", "breakpoints": "md sm xs" },
        { "name": "no_kad_pengenalan", "title": "No. Kad Pengenalan" },
        { "name": "no_angka_giliran", "title": "No. Angka Giliran", "breakpoints": "md sm xs"  },
        { "name": "upt_btn", "title": "Lihat Jawapan", "breakpoints": "md sm xs" },
    ];
    var form = new FormData();
    form.append("FK_siri_penilaian", window.sessionStorage.id_siri_penilaian);
    form.append("FK_sesi", FK_sesi);
    listCalonSoalanBySiriPenilaian(form, function(){
        result = obj;
        var list = [];
        let bil = 1;

        $.each(result.data, function (i, field) {
            list.push({
                bil: bil++, 
                nama: field.nama, 
                no_kad_pengenalan: field.no_kad_pengenalan, 
                no_angka_giliran: field.no_angka_giliran, 
                upt_btn: `<button class="btn btn-circle btn-primary btn-sm" data-ui-toggle-class="zoom" data-ui-target="#animate" onclick="details('`+field.id_calon_soalan+`')"><i class="fas fa-arrow-right"></i></button>`
            });
        });

        $("#table_calon").html("");
        $("#table_calon").footable({
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
}

function load_jenis_penilaian(token,returnValue){

    var settings = {
        "url": host+"jenis_penilaian/list",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": token
        },
      };
      var request = $.ajax(settings);

      request.done(function (response) {
        objJenisPenilaian = response;

        returnValue();
      });

      request.fail(function (response) {
      });
    
}

function daftar(content) {
    let token = window.localStorage.token;
    load_urusetia(token);
    load_kategori_urusetia(token);
    var listSettings = ["siripenilaian"];
    $.each(listSettings, function (i, item) {
        switch (item) {
            case content: $('#modaldaftar' + item).modal('show'); break;
        }
    });
}

function kemaskini(content) {

    var listSettings = ["siripenilaian"];
    $.each(listSettings, function (i, item) {
        switch (item) {
            case content: $('#modalupt'+ item).modal('show'); break;
        }
    });
   
}

var confirmed = false;

function details(id){

    sessionStorage.id_calon_soalan = id;

    window.sessionStorage.child = "78797c6eb1602af05f21fe6c7f0dcb11";
    checkAuthentication(window.sessionStorage.child);

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

        // console.log(objSiriPenilaian);

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

function load_penyelaras(token,returnValue){
    var settings = {
        "url": host+"usersListAll",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": window.localStorage.token
        },
      };
      
      $.ajax(settings).done(function (response) {
        objPenyelaras = response;

        returnValue();
      });
}

function load_kluster(token,returnValue){
    var form = new FormData();
    form.append('FK_users', id_users_master);
    var settings = {
        "url": host+"penyelaras/listKlusterByPenyelaras",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": "penyelaras "+token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
      };
      var request = $.ajax(settings);

      request.done(function (response) {
        objKluster = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
          swal({
              title: "Anda Masih Belum Berdaftar Di Bawah Mana-Mana Program/Pusat Penilaian",
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

function load_kategori_penilaian(token,returnValue){
    var settings = {
        "url": host+"kategori_penilaian/list",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": "penyelaras "+token
        },
      };
      var request = $.ajax(settings);

      request.done(function (response) {
        objKategori = response;

        returnValue();
      });

      request.fail(function (response) {
          swal({
              title: "Tiada Kategori Yang Berdaftar",
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

function load_urusetia(token){
    var settings = {
        "url": host+"usersgovsIntanList",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": "penyelaras "+token
        },
      };
      var request = $.ajax(settings);

      request.done(function (response) {
        objUrusetia = response;
        if(objUrusetia.success){
            $("#FK_users").html('<option value="">Pilih Pegawai INTAN</option>');
            let dataUrusetia = objUrusetia.data;
            
            $.each(dataUrusetia,function(i,field){
                $("#FK_users").append('<option value="'+field.id_users+'">'+field.nama+' ('+ field.no_kad_pengenalan +')</option>');
            });
            
            $("#FK_users").select2({
                width: null,
                containerCssClass: ':all:'
            });
        }
      });

      request.fail(function (response) {
          swal({
              title: "Tiada Pengguna INTAN Yang Berdaftar",
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

function load_kategori_urusetia(token){
    var settings = {
        "url": host+"kategori_urusetia/list",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": "penyelaras "+token
        },
      };
      var request = $.ajax(settings);

      request.done(function (response) {
        objKategoriUrusetia = response;
        if(objKategoriUrusetia.success){
            $("#FK_kategori_urusetia").html('<option value="">Pilih Kategori Urusetia</option>');
            let dataKategoriUrusetia = objKategoriUrusetia.data;
            
            $.each(dataKategoriUrusetia,function(i,field){
                $("#FK_kategori_urusetia").append('<option value="'+field.id_kategori_urusetia+'">'+field.nama_kategori_urusetia+'</option>');
            });
            
            $("#FK_kategori_urusetia").select2({
                width: null,
                containerCssClass: ':all:'
            });
        }
      });

      request.fail(function (response) {
          swal({
              title: "Tiada Pengguna INTAN Yang Berdaftar",
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

$("#addListFK_urusetia").click(function () {
    let token = window.localStorage.token;
    if (($("#FK_users").val() != "") && ($("#FK_kategori_urusetia").val() != "")) {
        let append = '{"FK_kategori_urusetia": "' + $("#FK_kategori_urusetia").val() + '", "FK_users": "' + $("#FK_users").val() + '", "nama": "' + $("#nama").val() + '", "no_kad_pengenalan": "' + $("#no_kad_pengenalan").val() + '"}';
        if ((sessionStorage.urusetia == null) || (sessionStorage.urusetia == '')) {
            sessionStorage.urusetia = append;
        } else {
            if (sessionStorage.urusetia.indexOf(append) < 0) {
                sessionStorage.urusetia = sessionStorage.urusetia + ', ' + append;                
            }
        }
    }
    let JSONurusetia = "[" + sessionStorage.urusetia + "]";
    $("#urusetia").val(JSONurusetia);
    if ($("#FK_kategori_urusetia").val() == 1){
        tableItem("tablePengesahan", "urusetia", JSONurusetia, token);
    } else if ($("#FK_kategori_urusetia").val() == 2){
        tableItem("tablePenggubal", "urusetia", JSONurusetia, token);
    } else if ($("#FK_kategori_urusetia").val() == 3){
        tableItem("tablePenilai", "urusetia", JSONurusetia, token);
    }
    $('#FK_users').val("");
    $('#FK_kategori_urusetia').val("");
    load_urusetia(token);
    load_kategori_urusetia(token);
});

function tableItem(item, rem, JSONitem, token) {
    $("#" + item).empty();
    $("#" + item).removeClass("hidden");
    var columns = [
                    { "name": "bil", "title": "Bil" }, 
                    { "name": "nama", "title": "Nama" },
                    { "name": "no_kad_pengenalan", "title": "No. KP" },
                    { "name": "upt_btn", "title": "Padam" },
    ];
    var list = [];
    let bil = 1;
    // let count = JSON.parse(JSONitem).length;
    $.each(JSON.parse(JSONitem), function (i, field) {
        // let upt_btn = '<button type="button" class="btn btn-xs btn-danger" onclick="remItem(\'' + rem + '\',\'' + field.FK_kategori_urusetia + '\',\'' + field.FK_users + '\',\'' + field.nama + '\',\'' + field.no_kad_pengenalan + '\')" data-whatever="@getbootstrap"><i class="ti-minus"></i></button> ';
        let upt_btn = '<button type="button" class="btn btn-danger btn-square btn-sm" onclick="remItem(\'' + item + '\',\'' + rem + '\',\'' + i + '\')" data-whatever="@getbootstrap"><i class="ti-minus"></i></button> ';
        
        if (item == "tablePengesahan" && field.FK_kategori_urusetia == "1")  {
            list.push({
                bil: bil++, nama: field.nama, no_kad_pengenalan: field.no_kad_pengenalan, upt_btn: upt_btn
            });
        }
        if (item == "tablePenggubal" && field.FK_kategori_urusetia == "2")  {
            list.push({
                bil: bil++, nama: field.nama, no_kad_pengenalan: field.no_kad_pengenalan, upt_btn: upt_btn
            });
        }
        if (item == "tablePenilai" && field.FK_kategori_urusetia == "3")  {
            list.push({
                bil: bil++, nama: field.nama, no_kad_pengenalan: field.no_kad_pengenalan, upt_btn: upt_btn
            });
        }
    });
    $("#" + item).html('');
    $("#" + item).footable({
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

function kembali(){
    sessionStorage.child = "959cde393ca127ad75c147ec76ac778b";
    checkAuthentication(sessionStorage.child);
}

function kembali2(id){
    sessionStorage.id_penilaian = id;
    sessionStorage.child = "ee6ed0c8d32a8c5f4f97f6538472974d";
    checkAuthentication(sessionStorage.child);
}

function remItem(table, jenis_item, index) {
    let token = window.localStorage.token;
    let temp = "";
    item = JSON.parse($("#" + jenis_item).val());
    $.each(item, function (i, field) {
        if (i != index) {
            if (temp == "") {
                temp = '{"FK_kategori_urusetia": "' + field.FK_kategori_urusetia + '", "FK_users": "' + field.FK_users + '", "nama": "' + field.nama + '", "no_kad_pengenalan": "' + field.no_kad_pengenalan + '"}';
            } else {
                temp = temp + ', ' + '{"FK_kategori_urusetia": "' + field.FK_kategori_urusetia + '", "FK_users": "' + field.FK_users + '", "nama": "' + field.nama + '", "no_kad_pengenalan": "' + field.no_kad_pengenalan + '"}';
            }
        }
    })
    let JSONtemp = '[' + temp + ']';
    $("#" + jenis_item).val(JSONtemp);
    sessionStorage.urusetia = temp;
    tableItem(table, jenis_item, JSONtemp, token);
}

$("#FK_users").on('change', function(){
    let token = window.localStorage.token;
    usersGetId($("#FK_users").val(), token, function(){
        if(dataUsers.success){
            let data = dataUsers.data;
            $("#nama").val(data.nama);
            $("#no_kad_pengenalan").val(data.no_kad_pengenalan);
        }
    });
});

$('input:radio[name="upt_keterbukaan"]').change(
    function(){
        if ($("#tertutup").is(':checked')) {
            $("#tarikh_mula_mohon").prop('disabled', true);
            $("#tarikh_tamat_mohon").prop('disabled', true);
        } else {
            $("#tarikh_mula_mohon").prop('disabled', false);
            $("#tarikh_tamat_mohon").prop('disabled', false);
        }
});

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