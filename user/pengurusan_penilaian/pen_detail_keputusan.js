$(function () {
    $.ajaxSetup({
        cache: false
    });
    $.each(capaian, function(i, item){
        if(item == sessionStorage.capaian){
            
        }
    });
    let token = window.localStorage.token;
    if(token == null){
        window.location.replace('login/');
    }
    else{
        let noic = window.localStorage.no_kad_pengenalan;
        let id_calon_soalan = window.sessionStorage.id_calon_soalan;
        // alert(token);
        users(noic,token,function(){
            if(dataUsers.success){
                let data = dataUsers.data;
                nama = data.nama;
                id_users_master = data.id_users;
                nama_master = data.nama;
                emel_master = data.emel;
                noic_master = data.no_kad_pengenalan;
                notel_master = data.notel;
                FK_jenis_pengguna_master = data.FK_jenis_pengguna;
                FK_taraf_jawatan_master = data.taraf_jawatan;
                FK_gelaran_master = data.FK_gelaran;
                emel_kerajaan_master = data.emel_kerajaan;
                notel_kerajaan_master = data.notel_kerajaan;
                nama_jawatan_master = data.nama_jawatan;
                users_intan_master = data.users_intan;
                FK_kampus_master = data.FK_kampus;
                FK_kluster_master = data.FK_kluster;
                FK_kementerian_master = data.FK_kementerian;
                FK_agensi_master = data.FK_agensi;
                nama_majikan_master = data.nama_majikan;
                alamat_majikan_master = data.alamat_majikan;
                notel_majikan_master = data.notel_majikan;
                emel_majikan_master = data.emel_majikan;
                nama_ketua_jabatan_master = data.nama_ketua_jabatan;
                notel_ketua_jabatan_master = data.notel_ketua_jabatan;
                emel_ketua_jabatan_master = data.emel_ketua_jabatan;
                jawatan_ketua_jabatan_master = data.jawatan_ketua_jabatan;
                nama_agensi_master = data.nama_agensi;
                nama_kluster_master = data.nama_kluster;
                updated_at = data.updated_at;
                $("#text_nama_pengguna").html(nama + `<i class="zmdi zmdi-chevron-down"></i>`);
                $("#text_nama_agensi").html(nama_agensi_master);
                loads_detail_keputusan_penilaian(id_calon_soalan);
                // loads_others();
            }
            else{
                reject_load();
            }
        });
    }
});

$("#btnKembali").attr('onclick','kembali(\'' + window.sessionStorage.id_calon_soalan + '\')');

function kembali(id){
    sessionStorage.id_calon_soalan = id;
    sessionStorage.child = "fd27f1111bc2f84406c1bbe6a567254e";
    checkAuthentication(sessionStorage.child);
}

function loads_detail_keputusan_penilaian(id){
    var form = new FormData();
    form.append("id_calon_soalan", id);
    detailKeputusanByIdCalon(form, function(){
        let json_list_bahagian = [], json_list_soalan = [];
        var list = [];
        let bil = 1;
        
        if(obj.success){
            // $.each(obj.data, function (i, field) {
                let data = obj.data;
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
                    // console.log(json_list_soalan);
                    form.append("json_list_soalan",JSON.stringify(json_list_soalan));
                    list_allSoalan(form,window.localStorage.token,function(){
                        $("#content-soalan").html('');
                        $("#overview-soalan").html('');
                        // console.log(obj.data);
                        $.each(obj.data,function(x,row){
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
                            
                            // console.log(obj_Jawapan.data);
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
                            // console.log(json_list_soalan);
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
                                    } 
                                    else {
                                        
                                        let markCheckBox = 0;
                                        $.each(JSON.parse(item.jawapan),function(a,rows){
                                            textColor = '';
                                            value = rows.name.split("jawapan_");
                                            // console.log(item.PK_siri_soalan+') '+item.FK_jenis_soalan+' == '+item.skema);
                                            // console.log(markCheckBox);
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
                                                // console.log('markCheckBox = '+markCheckBox);
                                                // updateMarks(markCheckBox,item.mark,item.id_calon_jawapan);
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
                                    // console.log('mark = '+mark);
                                    // updateMarks(mark,item.mark,item.id_calon_jawapan);
                                }
                                else if(item.FK_jenis_soalan == "6"){
                                    if(item.jawapan_calon != '' && item.jawapan_calon != null){
                                        // console.log(item.PK_siri_soalan);
                                        jawapan_calon = JSON.parse(item.jawapan_calon);
                                        
                                        jawapan += `<table class="table table-bordered">`;
                                        $.each(jawapan_calon, function(f, field){
                                            jawapan += `<tr>
                                                            <td>Fail `+(f+1)+`</td><td><img src="`+host+field.name+`" height="200px"></td>
                                                        </tr>`;
                                        });
                                        jawapan += `</table>`;
                                        markHTML = `<span id="soalan_`+item.id_calon_jawapan+`" style="font-weight: bold;">`+item.markah_jawapan+`</span><span style="font-weight: bold;">/`+item.mark+`</span>`;
                                        // markHTML = `<input value="`+item.markah_jawapan+`" id="soalan_`+item.id_calon_jawapan+`" name="soalan_`+item.id_calon_jawapan+`" onchange="updateMarks(this.value, `+item.mark+`, `+item.id_calon_jawapan+`)" type="number" step=".01" min="0" max="`+item.mark+`"><span style="font-weight: bold;">/`+item.mark+`</span>`;
                                        jawapan = item.jawapan;
                                    } 
                                    else {
                                        jawapan += `<b>CALON TIDAK MENJAWAB SOALAN INI.</b>`;
                                        markHTML = `<span id="soalan_`+item.id_calon_jawapan+`" style="font-weight: bold;">0</span><span style="font-weight: bold;">/`+item.mark+`</span>`;
                                        // markHTML = `<input value="`+item.markah_jawapan+`" id="soalan_`+item.id_calon_jawapan+`" name="soalan_`+item.id_calon_jawapan+`" onchange="updateMarks(this.value, `+item.mark+`, `+item.id_calon_jawapan+`)" type="number" step=".01" min="0" max="`+item.mark+`"><span style="font-weight: bold;">/`+item.mark+`</span>`;
                                    }
                                }
                                else{
                                    jawapan = `<textarea id='textarea`+ item.kod_soalan + `' class'tinymce' cols='100' rows='4' readonly></textarea>`;    
                                    markHTML = `<span id="soalan_`+item.id_calon_jawapan+`" style="font-weight: bold;">`+item.markah_jawapan+`</span><span style="font-weight: bold;">/`+item.mark+`</span>`;
                                    // markHTML = `<input value="`+item.markah_jawapan+`" id="soalan_`+item.id_calon_jawapan+`" name="soalan_`+item.id_calon_jawapan+`" onchange="updateMarks(this.value, `+item.mark+`, `+item.id_calon_jawapan+`)" type="number" step=".01" min="0" max="`+item.mark+`"><span style="font-weight: bold;">/`+item.mark+`</span>`;
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
                                    // console.log('test');
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

                });



                // list.push({
                //     bil: bil++, 
                //     id_calon_soalan: field.id_calon_soalan, 
                //     penilaian: `<span style='white-space: pre-line;'>`+ field.kod_siri_penilaian + ` - ` + field.nama_penilaian +`</span>`, 
                //     tarikh_penilaian: formatDate(field.tarikh_penilaian), 
                //     peratus_set: field.peratus_set, 
                //     peratus_siri: field.peratus_siri, 
                //     no_angka_giliran: field.no_angka_giliran, 
                //     btn_tindakan: `<button class="btn btn-primary btn-sm" id="btnKeputusan" onclick="detail(`+field.id_calon_soalan+`)">SEMAK</button>`, 
                // });
            // });
            // $("#listKeputusanPenilaian").html("");
            // // console.log(list);
            // $("#listKeputusanPenilaian").footable({
            //     "columns": columns,
            //     "rows": list,
            //     "paging": {
            //         "enabled": true,
            //         "size": 10
            //     },
            //     "filtering": {
            //         "enabled": true,
            //         "placeholder": "Carian...",
            //         "dropdownTitle": "Carian untuk:",
            //         "class": "brown-700"
            //     }
            // });
        }
    });
}

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

// function detail(id){
//     sessionStorage.id_calon_soalan = id;

//     window.sessionStorage.child = "78797c6eb1602af05f21fe6c7f0dcb11";
//     checkAuthentication(window.sessionStorage.child);
    

// }