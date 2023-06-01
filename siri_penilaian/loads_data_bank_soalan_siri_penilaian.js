

function loads_data(id_siri_penilaian, token){
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

    let list_siri = [];
    let flag_list_siri_penilaian = '';
    let append = '';

    let list_select = [];
    
    list_siri_soalan(window.sessionStorage.id_siri_penilaian,window.localStorage.token,function(){
        var columns = [
            // { "name": "check", "title": `<input class="form-check-input" type="checkbox" name="checkBoxtable_calonAll" onclick="toggleCheckBox('table_calon');">` },
            { "name": "bil", "title": "Bil" },
            { "name": "soalan", "title": "Soalan", "breakpoints": "md sm xs" },
            { "name": "jenis_soalan_tahap", "title": "Jenis Soalan / Tahap" },
            { "name": "senarai_soalan", "title": "", "breakpoints": "lg xl md sm xs" },
            { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
        ];
        let list = [];
        let bil = 1;
        if(obj_sirisoalan.success){
            $("#list_siri_soalan").html('');
            $('#count_siri').html('['+obj_sirisoalan.data.length+' Soalan]')
            $.each(obj_sirisoalan.data,function(ss,field){
                list_select.push(field.PK_bank_soalan);

                let FK_infodetail = field.FK_infodetail;
                if(field.FK_infodetail == '' || field.FK_infodetail == null){
                    topik = field.topik;
                    list_topik = topik.split(',');
                    topik = "";
                    
                    $.each(list_topik,function(t,row){
                        topik += `<span class="badge badge-info">`+row+`</span> `;
                    });
                    let jenis_soalan = "";
                    if(field.jenis_soalan == "Single Choice") jenis_soalan = "SC";
                    else if(field.jenis_soalan == "Descriptive") jenis_soalan = "D";
                    else if(field.jenis_soalan == "Multiple Response") jenis_soalan = "MR";
                    else if(field.jenis_soalan == "True/False") jenis_soalan = "TF";
                    else if(field.jenis_soalan == "Short Answers") jenis_soalan = "SA";
                    else if(field.jenis_soalan == "File Upload") jenis_soalan = "FU";

                    let tahap = "";
                    if(field.tahap == "MUDAH") tahap = "M";
                    else if(field.tahap == "SEDERHANA") tahap = "Se";
                    else if(field.tahap == "SUKAR") tahap = "Su";
                    
                    list.push({
                        bil: bil++,
                        soalan: `<span style="white-space: pre-line;">`+field.soalan+`</span><small><i>`+topik+`</i></small>`,
                        jenis_soalan_tahap: jenis_soalan + " / " + tahap,
                        upt_btn: `<button onclick="deleteList('`+field.PK_siri_soalan+`',0)" class="btn btn-sm btn-simple btn-link btn-danger"><i class="fa fa-times"></i></button>`
                    });
                    $("#list_siri_soalan").append(`
                        <div class="card border border-primary mb-3 class_siri_soalan">
                            <div class="body">
                                <div class="row">
                                    <div class="col-6">
                                        <!-- <h6 class="pt-3">`+field.kod_soalan+`</h6> -->
                                    </div>
                                    <div class="col-6 justify-content-end d-flex ">
                                        <button onclick="deleteList('`+field.PK_siri_soalan+`',0)" class="btn btn-sm btn-simple btn-link btn-danger"><i class="fa fa-times"></i></button>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-12">
                                        <p>JENIS SOALAN : `+field.jenis_soalan+`&nbsp;&nbsp;&nbsp;&nbsp;TAHAP : `+field.tahap+`</p>
                                        `+field.soalan+`
                                        <small><i>`+field.topik+`</i></small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
                }else{
                    flag_list_siri_penilaian = list_siri.indexOf(field.FK_infodetail);

                    if(flag_list_siri_penilaian < 0){
                        list_siri.push(field.FK_infodetail);

                        var form2 = new FormData();
                        form2.append('id_infodetails',field.FK_infodetail);

                        get_infodetails(form2,window.localStorage.token,function(){
                            if(obj_det.success){
                                let data = obj_det.data;
                                
                                let jenis_soalan = "";
                                if(field.jenis_soalan == "Single Choice") jenis_soalan = "SC";
                                else if(field.jenis_soalan == "Descriptive") jenis_soalan = "D";
                                else if(field.jenis_soalan == "Multiple Response") jenis_soalan = "MR";
                                else if(field.jenis_soalan == "True/False") jenis_soalan = "TF";
                                else if(field.jenis_soalan == "Short Answers") jenis_soalan = "SA";
                                else if(field.jenis_soalan == "File Upload") jenis_soalan = "FU";

                                let tahap = "";
                                if(field.tahap == "MUDAH") tahap = "M";
                                else if(field.tahap == "SEDERHANA") tahap = "Se";
                                else if(field.tahap == "SUKAR") tahap = "Su";
                                
                                list.push({
                                    soalan: `<span style="white-space: pre-line;">`+data.teks+`</span>`,
                                    jenis_soalan_tahap: "SOALAN BERANGKAI",
                                    upt_btn: `<button onclick="deleteList('`+field.FK_infodetail+`',1)" class="btn btn-sm btn-simple btn-link btn-danger"><i class="fa fa-times"></i></button>`
                                });

                                $("#list_siri_soalan").append(`
                                <div class="card border border-primary mb-3 class_siri_soalan">
                                    <div class="body">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <span class="bg-light-default">`+data.teks+`</span>
                                            </div>
                                        </div>
                                        <div class="row" id="append_soalan_`+field.FK_infodetail+`">
                                            <div class="col-6"></div>
                                            <div class="col-6 p-0 justify-content-end d-flex ">
                                                <button class="btn btn-primary btn-sm btn-link" id="btnView_`+field.FK_infodetail+`" onclick="viewList(`+field.FK_infodetail+`)"><i class="fa fa-arrow-down"></i></button>&nbsp;&nbsp;
                                                <button onclick="deleteList('`+field.FK_infodetail+`',1)" class="btn btn-sm btn-simple btn-link btn-danger"><i class="fa fa-times"></i></button>
                                            </div>
                                        <hr>
                                        <div class="col-12">
                                            <div id="collapseOne_`+field.FK_infodetail+`" class="panel-collapse collapse in">
                                                <div class="panel-body" id="collapse_`+field.FK_infodetail+`">
                                                
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `);
                            }
                        });
                    }
                }
                if(ss == (obj_sirisoalan.data.length-1)){
                    setTimeout(function(){
                        if(list_siri.length > 0){
                            $.each(list_siri, function(id, infodetail){
                                var formBerangkai = new FormData();
                                formBerangkai.append("FK_infodetail",infodetail);
                                list_infodetailsSiriSoalan(formBerangkai,window.localStorage.token,function(){
                                    obj_info = JSON.parse(obj_info);
                                    if(obj_info.success){
                                        console.log(obj_info.data);
                                        let appends = `<table class="table">
                                                        <tr>
                                                            <th>Bil.</th>
                                                            <th>Soalan</th>
                                                            <th>Topik</th>
                                                            <th>Jenis Soalan / Tahap</th>
                                                        </tr>
                                        `;
                                        $.each(obj_info.data,function(i,item){
                                            if(item.FK_siri_penilaian == window.sessionStorage.id_siri_penilaian){
                                                flag_exist = list_select.indexOf(item.PK_bank_soalan);
                                                if(flag_exist < 0){
                                                    append = `
                                                        <tr>
                                                            <td>`+(bil++)+`</td>
                                                            <td><span style="white-space: pre;">`+item.soalan+`</span></td>
                                                            <td>`+item.topik+`</td>
                                                            <td>`+item.jenis_soalan+`/`+item.tahap+`</td>
                                                        </tr>
                                                    `;
                                                    appends = appends + append;
                                                }
                                                if(obj_info.data.length == (i+1)){
                                                    appends = appends + `</table>`;
                                                    $.each(list, function(s,search){
                                                        if(search.upt_btn.indexOf(`deleteList('`+infodetail+`',1)`) >= 0){
                                                            list[s].senarai_soalan = appends;
                                                        }
                                                    });
                                                    console.log(list_siri.length);
                                                    console.log(id);
                                                    if(list_siri.length == (id+1)){
                                                        $("#table_list_siri_soalan").html("");
                                                        $("#table_list_siri_soalan").footable({
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
                                            }
                                        });
                                    }
                                });
                            });
                        } else {
                            $("#table_list_siri_soalan").html("");
                            $("#table_list_siri_soalan").footable({
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
                    },500);

                    var columns_soalan = [
                        // { "name": "check", "title": `<input class="form-check-input" type="checkbox" name="checkBoxtable_calonAll" onclick="toggleCheckBox('table_calon');">` },
                        { "name": "bil", "title": "Bil" },
                        { "name": "soalan", "title": "Soalan", "breakpoints": "md sm xs" },
                        { "name": "jenis_soalan_tahap", "title": "Jenis Soalan / Tahap" },
                        { "name": "senarai_soalan", "title": "", "breakpoints": "lg xl md sm xs" },
                        { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
                    ];
                    let list_soalan_kiri = [];
                    let bil_kiri = 1;
                    list_soalan(window.sessionStorage.id_penilaian,window.localStorage.token,function(){
                        if(obj_banksoalan.success){
                            list_flag = []; let count_soalan = 1;
                
                            $("#list_soalan").html('');
                            $.each(obj_banksoalan.data,function(f,field){
                                let flag_exist = '';

                                topik = field.topik;
                                list_topik = topik.split(',');
                                topik = "";
                                
                                let flag = '';
                                $.each(list_topik,function(t,row){
                                    topik += `<span class="badge badge-info">`+row+`</span> `;
                                });
                    
                                let FK_infodetail = field.FK_infodetail;
                                if(FK_infodetail == null){
                                    flag_exist = list_select.indexOf(field.PK_bank_soalan);
                                    count = parseInt($('#count_soalan').html());
                                    if(flag_exist < 0){
                                        let jenis_soalan = "";
                                        if(field.jenis_soalan == "Single Choice") jenis_soalan = "SC";
                                        else if(field.jenis_soalan == "Descriptive") jenis_soalan = "D";
                                        else if(field.jenis_soalan == "Multiple Response") jenis_soalan = "MR";
                                        else if(field.jenis_soalan == "True/False") jenis_soalan = "TF";
                                        else if(field.jenis_soalan == "Short Answers") jenis_soalan = "SA";
                                        else if(field.jenis_soalan == "File Upload") jenis_soalan = "FU";
                    
                                        let tahap = "";
                                        if(field.tahap == "MUDAH") tahap = "M";
                                        else if(field.tahap == "SEDERHANA") tahap = "Se";
                                        else if(field.tahap == "SUKAR") tahap = "Su";
                                        
                                        list_soalan_kiri.push({
                                            bil: bil_kiri++,
                                            soalan: `<span style="white-space: pre-line;">`+field.soalan+`</span><small><i>`+topik+`</i></small>`,
                                            jenis_soalan_tahap: jenis_soalan + " / " + tahap,
                                            upt_btn: `<button onclick="update('`+field.PK_bank_soalan+`',0)" class="btn btn-simple btn-danger btn-sm"><small>Kemaskini</small> <i class="fa fa-pencil-alt"></i></button><br>
                                                    <button onclick="pilih('`+field.PK_bank_soalan+`',0)" class="btn btn-simple btn-primary btn-sm"><small>Pilih</small> <i class="fa fa-arrow-right"></i></button>`
                                        });
                                        $("#list_soalan").append(`
                                        <div class="card border mb-3 class_soalan" id="card_soalan_`+field.PK_bank_soalan+`">
                                            <div class="body">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <!-- <b>`+field.kod_soalan+`</b> -->
                                                        `+field.soalan+`
                                                        <small><i>`+topik+`</i></small>
                                                        <table class="table">
                                                            <tr><td><b>JENIS SOALAN</b><br>`+field.jenis_soalan+`</td><td><b>TAHAP</b><br>`+field.tahap+`</td></tr>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="justify-content-end d-flex ">
                                                    <button onclick="pilih('`+field.PK_bank_soalan+`',0)" class="btn btn-simple btn-danger">Pilih <i class="fa fa-arrow-right"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        `);
                                        $('#count_soalan').html(count+1);
                                    }
                                }else{
                                    if(list_siri.length > 0){
                                        $.each(list_siri, function(id, infodetail){
                                            if(infodetail == FK_infodetail){
                                                return;
                                            } else if(list_siri.length == (id+1)){
                                                flag = list_flag.indexOf(FK_infodetail);
                                                let append = '';
                                
                                                if(flag < 0){
                                                    list_flag.push(FK_infodetail);
                                
                                                    var form = new FormData();
                                                    form.append('id_infodetails',FK_infodetail);
                                
                                                    get_infodetails(form,window.localStorage.token,function(){
                                                        if(obj_det.success){
                                                            let jenis_soalan = "";
                                                            if(field.jenis_soalan == "Single Choice") jenis_soalan = "SC";
                                                            else if(field.jenis_soalan == "Descriptive") jenis_soalan = "D";
                                                            else if(field.jenis_soalan == "Multiple Response") jenis_soalan = "MR";
                                                            else if(field.jenis_soalan == "True/False") jenis_soalan = "TF";
                                                            else if(field.jenis_soalan == "Short Answers") jenis_soalan = "SA";
                                                            else if(field.jenis_soalan == "File Upload") jenis_soalan = "FU";
                            
                                                            let tahap = "";
                                                            if(field.tahap == "MUDAH") tahap = "M";
                                                            else if(field.tahap == "SEDERHANA") tahap = "Se";
                                                            else if(field.tahap == "SUKAR") tahap = "Su";
                                                            
                                                            list_soalan_kiri.push({
                                                                soalan: `<span style="white-space: pre-line;">`+obj_det.data.teks+`</span>`,
                                                                jenis_soalan_tahap: `SOALAN BERANGKAI`,
                                                                upt_btn: `<button onclick="update('`+FK_infodetail+`',1)" class="btn btn-simple btn-danger btn-sm"><small>Kemaskini</small> <i class="fa fa-pencil-alt"></i></button><br>
                                                                        <button onclick="pilih('`+FK_infodetail+`',1)" class="btn btn-simple btn-simple btn-danger btn-sm">Pilih <i class="fa fa-arrow-right"></i></button>`
                                                            });
                                
                                                            $("#list_soalan").append(`
                                                            <div class="card border mb-3 class_soalan d-none" id="card-infodetails`+FK_infodetail+`">
                                                                <div class="body">
                                                                    <div class="row">
                                                                        <div class="col-12">
                                                                            `+obj_det.data.teks+`
                                                                        </div>
                                                                    </div>
                                                                    <div class="justify-content-end d-flex ">
                                                                        <button class="btn btn-primary btn-simple" data-bs-toggle="collapse" data-bs-target="#collapseExample_`+FK_infodetail+`" aria-expanded="false"
                                                                        aria-controls="collapseExample_`+FK_infodetail+`"><i class="fa fa-list"></i> Terperinci</button>
                                                                        <button onclick="pilih('`+FK_infodetail+`',1)" class="btn btn-simple btn-simple btn-danger">Pilih <i class="fa fa-arrow-right"></i></button>
                                                                    </div>
                                                                    <div class="collapse border-top mt-2 pt-2" id="collapseExample_`+FK_infodetail+`">
                                                                        <div class="well" id="append_soalan_`+FK_infodetail+`"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            `);
                                                            list_infodetailsSoalan(FK_infodetail,window.localStorage.token,function(){
                                                                $('#append_soalan_'+FK_infodetail).html('');
                                                                if(obj_info.success){
                                                                    let appends = `<table class="table">
                                                                                    <tr>
                                                                                        <th>Bil.</th>
                                                                                        <th>Soalan</th>
                                                                                        <th>Topik</th>
                                                                                        <th>Jenis Soalan / Tahap</th>
                                                                                    </tr>
                                                                    `;
                                                                    $.each(obj_info.data,function(i,item){
                                                                        flag_exist = list_select.indexOf(item.PK_bank_soalan);
                                                                        count = parseInt($('#count_soalan').html());
                                                                        if(flag_exist < 0){
                                                                            $('#card-infodetails'+FK_infodetail).removeClass('d-none');
                                                                            // append = `
                                                                            //     <div class="col-md-12">
                                                                            //         <!-- <b>`+item.kod_soalan+`</b> -->
                                                                            //         `+item.soalan+`
                                                                            //         <small><i>`+topik+`</i></small>
                                                                            //         <table class="table">
                                                                            //             <tr><td><b>JENIS SOALAN</b><br>`+item.jenis_soalan+`</td><td><b>TAHAP</b><br>`+item.tahap+`</td></tr>
                                                                            //         </table>
                                                                            //     </div>
                                                                            // `;
                                                                            append = `
                                                                                <tr>
                                                                                    <td>`+(bil_kiri++)+`</td>
                                                                                    <td><span style="white-space: pre;">`+item.soalan+`</span></td>
                                                                                    <td>`+item.topik+`</td>
                                                                                    <td>`+item.jenis_soalan+`/`+item.tahap+`</td>
                                                                                </tr>
                                                                            `;
                                                                            appends = appends + append;
                                                                            $('#append_soalan_'+FK_infodetail).append(append);
                                                                            $('#count_soalan').html(count+1);
                                                                        }
                                                                        if(obj_info.data.length == (i+1)){
                                                                            appends = appends + `</table>`;
                                                                            $.each(list_soalan_kiri, function(s,search){
                                                                                if(search.upt_btn.indexOf(`pilih('`+FK_infodetail+`',1)`) >= 0){
                                                                                    list_soalan_kiri[s].senarai_soalan = appends;
                                                                                }
                                                                            });
                                                                            if(obj_banksoalan.data.length == (count+obj_sirisoalan.data.length+1)){
                                                                                $("#table_list_soalan").html("");
                                                                                $("#table_list_soalan").footable({
                                                                                    "columns": columns_soalan,
                                                                                    "rows": list_soalan_kiri,
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
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    } else {flag = list_flag.indexOf(FK_infodetail);
                                        let append = '';
                        
                                        if(flag < 0){
                                            list_flag.push(FK_infodetail);
                        
                                            var form = new FormData();
                                            form.append('id_infodetails',FK_infodetail);
                        
                                            get_infodetails(form,window.localStorage.token,function(){
                                                if(obj_det.success){
                                                    let jenis_soalan = "";
                                                    if(field.jenis_soalan == "Single Choice") jenis_soalan = "SC";
                                                    else if(field.jenis_soalan == "Descriptive") jenis_soalan = "D";
                                                    else if(field.jenis_soalan == "Multiple Response") jenis_soalan = "MR";
                                                    else if(field.jenis_soalan == "True/False") jenis_soalan = "TF";
                                                    else if(field.jenis_soalan == "Short Answers") jenis_soalan = "SA";
                                                    else if(field.jenis_soalan == "File Upload") jenis_soalan = "FU";
                    
                                                    let tahap = "";
                                                    if(field.tahap == "MUDAH") tahap = "M";
                                                    else if(field.tahap == "SEDERHANA") tahap = "Se";
                                                    else if(field.tahap == "SUKAR") tahap = "Su";
                                                    
                                                    list_soalan_kiri.push({
                                                        soalan: `<span style="white-space: pre-line;">`+obj_det.data.teks+`</span>`,
                                                        jenis_soalan_tahap: `SOALAN BERANGKAI`,
                                                        upt_btn: `<button onclick="update('`+FK_infodetail+`',1)" class="btn btn-simple btn-danger btn-sm"><small>Kemaskini</small> <i class="fa fa-pencil-alt"></i></button><br>
                                                                <button onclick="pilih('`+FK_infodetail+`',1)" class="btn btn-simple btn-simple btn-primary btn-sm">Pilih <i class="fa fa-arrow-right"></i></button>`
                                                    });
                        
                                                    $("#list_soalan").append(`
                                                    <div class="card border mb-3 class_soalan d-none" id="card-infodetails`+FK_infodetail+`">
                                                        <div class="body">
                                                            <div class="row">
                                                                <div class="col-12">
                                                                    `+obj_det.data.teks+`
                                                                </div>
                                                            </div>
                                                            <div class="justify-content-end d-flex ">
                                                                <button class="btn btn-primary btn-simple" data-bs-toggle="collapse" data-bs-target="#collapseExample_`+FK_infodetail+`" aria-expanded="false"
                                                                aria-controls="collapseExample_`+FK_infodetail+`"><i class="fa fa-list"></i> Terperinci</button>
                                                                <button onclick="pilih('`+FK_infodetail+`',1)" class="btn btn-simple btn-simple btn-danger">Pilih <i class="fa fa-arrow-right"></i></button>
                                                            </div>
                                                            <div class="collapse border-top mt-2 pt-2" id="collapseExample_`+FK_infodetail+`">
                                                                <div class="well" id="append_soalan_`+FK_infodetail+`"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    `);
                                                    list_infodetailsSoalan(FK_infodetail,window.localStorage.token,function(){
                                                        $('#append_soalan_'+FK_infodetail).html('');
                                                        if(obj_info.success){
                                                            let appends = `<table class="table">
                                                                            <tr>
                                                                                <th>Bil.</th>
                                                                                <th>Soalan</th>
                                                                                <th>Topik</th>
                                                                                <th>Jenis Soalan / Tahap</th>
                                                                            </tr>
                                                            `;
                                                            $.each(obj_info.data,function(i,item){
                                                                flag_exist = list_select.indexOf(item.PK_bank_soalan);
                                                                count = parseInt($('#count_soalan').html());
                                                                if(flag_exist < 0){
                                                                    $('#card-infodetails'+FK_infodetail).removeClass('d-none');
                                                                    // append = `
                                                                    //     <div class="col-md-12">
                                                                    //         <!-- <b>`+item.kod_soalan+`</b> -->
                                                                    //         `+item.soalan+`
                                                                    //         <small><i>`+topik+`</i></small>
                                                                    //         <table class="table">
                                                                    //             <tr><td><b>JENIS SOALAN</b><br>`+item.jenis_soalan+`</td><td><b>TAHAP</b><br>`+item.tahap+`</td></tr>
                                                                    //         </table>
                                                                    //     </div>
                                                                    // `;
                                                                    append = `
                                                                        <tr>
                                                                            <td>`+(bil_kiri++)+`</td>
                                                                            <td><span style="white-space: pre;">`+item.soalan+`</span></td>
                                                                            <td>`+item.topik+`</td>
                                                                            <td>`+item.jenis_soalan+`/`+item.tahap+`</td>
                                                                        </tr>
                                                                    `;
                                                                    appends = appends + append;
                                                                    $('#append_soalan_'+FK_infodetail).append(append);
                                                                    $('#count_soalan').html(count+1);
                                                                }
                                                                if(obj_info.data.length == (i+1)){
                                                                    appends = appends + `</table>`;
                                                                    $.each(list_soalan_kiri, function(s,search){
                                                                        if(search.upt_btn.indexOf(`pilih('`+FK_infodetail+`',1)`) >= 0){
                                                                            list_soalan_kiri[s].senarai_soalan = appends;
                                                                        }
                                                                    });
                                                                    if(obj_banksoalan.data.length == (count+obj_sirisoalan.data.length) || obj_banksoalan.data.length == (count+obj_sirisoalan.data.length+1)){
                                                                        $("#table_list_soalan").html("");
                                                                        $("#table_list_soalan").footable({
                                                                            "columns": columns_soalan,
                                                                            "rows": list_soalan_kiri,
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
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }
                                }
                                // console.log('last = '+count_soalan);

                                // if(i == (obj_banksoalan.data.length-1)){
                                //     $('#count_soalan').html('['+count_soalan+' Soalan]');
                                // }
                            });
                            console.log(obj_banksoalan.data.length);
                            if(obj_banksoalan.data.length == (count+obj_sirisoalan.data.length) || obj_banksoalan.data.length == (count+obj_sirisoalan.data.length+1)){
                                $("#table_list_soalan").html("");
                                $("#table_list_soalan").footable({
                                    "columns": columns_soalan,
                                    "rows": list_soalan_kiri,
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
                }          
            });
        }
        else{
            var columns = [
                // { "name": "check", "title": `<input class="form-check-input" type="checkbox" name="checkBoxtable_calonAll" onclick="toggleCheckBox('table_calon');">` },
                { "name": "bil", "title": "Bil" },
                { "name": "soalan", "title": "Soalan", "breakpoints": "md sm xs" },
                { "name": "jenis_soalan_tahap", "title": "Jenis Soalan / Tahap" },
                { "name": "senarai_soalan", "title": "", "breakpoints": "lg xl md sm xs" },
                { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
            ];
            $("#table_list_siri_soalan").html("");
            $("#table_list_siri_soalan").footable({
                "columns": columns,
                "rows": [],
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
            var columns_soalan = [
                // { "name": "check", "title": `<input class="form-check-input" type="checkbox" name="checkBoxtable_calonAll" onclick="toggleCheckBox('table_calon');">` },
                { "name": "bil", "title": "Bil" },
                { "name": "soalan", "title": "Soalan", "breakpoints": "md sm xs" },
                { "name": "jenis_soalan_tahap", "title": "Jenis Soalan / Tahap" },
                { "name": "senarai_soalan", "title": "", "breakpoints": "lg xl md sm xs" },
                { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
            ];
            let list_soalan_kiri = [];
            let bil_kiri = 1;
            list_soalan(window.sessionStorage.id_penilaian,window.localStorage.token,function(){
                if(obj_banksoalan.success){
                    list_flag = []; let count_soalan = 1;
        
                    $("#list_soalan").html('');
                    $.each(obj_banksoalan.data,function(f,field){
                        let flag_exist = '';

                        topik = field.topik;
                        list_topik = topik.split(',');
                        topik = "";
                        
                        let flag = '';
                        $.each(list_topik,function(t,row){
                            topik += `<span class="badge badge-info">`+row+`</span> `;
                        });
            
                        let FK_infodetail = field.FK_infodetail;
                        if(FK_infodetail == null){
                            flag_exist = list_select.indexOf(field.PK_bank_soalan);
                            count = parseInt($('#count_soalan').html());
                            if(flag_exist < 0){
                                let jenis_soalan = "";
                                if(field.jenis_soalan == "Single Choice") jenis_soalan = "SC";
                                else if(field.jenis_soalan == "Descriptive") jenis_soalan = "D";
                                else if(field.jenis_soalan == "Multiple Response") jenis_soalan = "MR";
                                else if(field.jenis_soalan == "True/False") jenis_soalan = "TF";
                                else if(field.jenis_soalan == "Short Answers") jenis_soalan = "SA";
                                else if(field.jenis_soalan == "File Upload") jenis_soalan = "FU";
            
                                let tahap = "";
                                if(field.tahap == "MUDAH") tahap = "M";
                                else if(field.tahap == "SEDERHANA") tahap = "Se";
                                else if(field.tahap == "SUKAR") tahap = "Su";
                                
                                list_soalan_kiri.push({
                                    bil: bil_kiri++,
                                    soalan: `<span style="white-space: pre-line;">`+field.soalan+`</span><small><i>`+topik+`</i></small>`,
                                    jenis_soalan_tahap: jenis_soalan + " / " + tahap,
                                    upt_btn: `<button onclick="update('`+field.PK_bank_soalan+`',0)" class="btn btn-simple btn-danger btn-sm"><small>Kemaskini</small> <i class="fa fa-pencil-alt"></i></button><br>
                                            <button onclick="pilih('`+field.PK_bank_soalan+`',0)" class="btn btn-simple btn-primary btn-sm"><small>Pilih</small> <i class="fa fa-arrow-right"></i></button>`
                                });
                                $("#list_soalan").append(`
                                <div class="card border mb-3 class_soalan" id="card_soalan_`+field.PK_bank_soalan+`">
                                    <div class="body">
                                        <div class="row">
                                            <div class="col-12">
                                                <!-- <b>`+field.kod_soalan+`</b> -->
                                                `+field.soalan+`
                                                <small><i>`+topik+`</i></small>
                                                <table class="table">
                                                    <tr><td><b>JENIS SOALAN</b><br>`+field.jenis_soalan+`</td><td><b>TAHAP</b><br>`+field.tahap+`</td></tr>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="justify-content-end d-flex ">
                                            <button onclick="pilih('`+field.PK_bank_soalan+`',0)" class="btn btn-simple btn-danger">Pilih <i class="fa fa-arrow-right"></i></button>
                                        </div>
                                    </div>
                                </div>
                                `);
                                $('#count_soalan').html(count+1);
                            }
                        }else{
                            if(list_siri.length > 0){
                                $.each(list_siri, function(id, infodetail){
                                    if(infodetail == FK_infodetail){
                                        return;
                                    } else if(list_siri.length == (id+1)){
                                        flag = list_flag.indexOf(FK_infodetail);
                                        let append = '';
                        
                                        if(flag < 0){
                                            list_flag.push(FK_infodetail);
                        
                                            var form = new FormData();
                                            form.append('id_infodetails',FK_infodetail);
                        
                                            get_infodetails(form,window.localStorage.token,function(){
                                                if(obj_det.success){
                                                    let jenis_soalan = "";
                                                    if(field.jenis_soalan == "Single Choice") jenis_soalan = "SC";
                                                    else if(field.jenis_soalan == "Descriptive") jenis_soalan = "D";
                                                    else if(field.jenis_soalan == "Multiple Response") jenis_soalan = "MR";
                                                    else if(field.jenis_soalan == "True/False") jenis_soalan = "TF";
                                                    else if(field.jenis_soalan == "Short Answers") jenis_soalan = "SA";
                                                    else if(field.jenis_soalan == "File Upload") jenis_soalan = "FU";
                    
                                                    let tahap = "";
                                                    if(field.tahap == "MUDAH") tahap = "M";
                                                    else if(field.tahap == "SEDERHANA") tahap = "Se";
                                                    else if(field.tahap == "SUKAR") tahap = "Su";
                                                    
                                                    list_soalan_kiri.push({
                                                        soalan: `<span style="white-space: pre-line;">`+obj_det.data.teks+`</span>`,
                                                        jenis_soalan_tahap: `SOALAN BERANGKAI`,
                                                        upt_btn: `<button onclick="update('`+FK_infodetail+`',1)" class="btn btn-simple btn-danger btn-sm"><small>Kemaskini</small> <i class="fa fa-pencil-alt"></i></button><br>
                                                                <button onclick="pilih('`+FK_infodetail+`',1)" class="btn btn-simple btn-simple btn-primary btn-sm">Pilih <i class="fa fa-arrow-right"></i></button>`
                                                    });
                        
                                                    $("#list_soalan").append(`
                                                    <div class="card border mb-3 class_soalan d-none" id="card-infodetails`+FK_infodetail+`">
                                                        <div class="body">
                                                            <div class="row">
                                                                <div class="col-12">
                                                                    `+obj_det.data.teks+`
                                                                </div>
                                                            </div>
                                                            <div class="justify-content-end d-flex ">
                                                                <button class="btn btn-primary btn-simple" data-bs-toggle="collapse" data-bs-target="#collapseExample_`+FK_infodetail+`" aria-expanded="false"
                                                                aria-controls="collapseExample_`+FK_infodetail+`"><i class="fa fa-list"></i> Terperinci</button>
                                                                <button onclick="pilih('`+FK_infodetail+`',1)" class="btn btn-simple btn-simple btn-danger">Pilih <i class="fa fa-arrow-right"></i></button>
                                                            </div>
                                                            <div class="collapse border-top mt-2 pt-2" id="collapseExample_`+FK_infodetail+`">
                                                                <div class="well" id="append_soalan_`+FK_infodetail+`"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    `);
                                                    list_infodetailsSoalan(FK_infodetail,window.localStorage.token,function(){
                                                        $('#append_soalan_'+FK_infodetail).html('');
                                                        if(obj_info.success){
                                                            let appends = `<table class="table">
                                                                            <tr>
                                                                                <th>Bil.</th>
                                                                                <th>Soalan</th>
                                                                                <th>Topik</th>
                                                                                <th>Jenis Soalan / Tahap</th>
                                                                            </tr>
                                                            `;
                                                            $.each(obj_info.data,function(i,item){
                                                                flag_exist = list_select.indexOf(item.PK_bank_soalan);
                                                                count = parseInt($('#count_soalan').html());
                                                                if(flag_exist < 0){
                                                                    $('#card-infodetails'+FK_infodetail).removeClass('d-none');
                                                                    // append = `
                                                                    //     <div class="col-md-12">
                                                                    //         <!-- <b>`+item.kod_soalan+`</b> -->
                                                                    //         `+item.soalan+`
                                                                    //         <small><i>`+topik+`</i></small>
                                                                    //         <table class="table">
                                                                    //             <tr><td><b>JENIS SOALAN</b><br>`+item.jenis_soalan+`</td><td><b>TAHAP</b><br>`+item.tahap+`</td></tr>
                                                                    //         </table>
                                                                    //     </div>
                                                                    // `;
                                                                    append = `
                                                                        <tr>
                                                                            <td>`+(bil_kiri++)+`</td>
                                                                            <td><span style="white-space: pre;">`+item.soalan+`</span></td>
                                                                            <td>`+item.topik+`</td>
                                                                            <td>`+item.jenis_soalan+`/`+item.tahap+`</td>
                                                                        </tr>
                                                                    `;
                                                                    appends = appends + append;
                                                                    $('#append_soalan_'+FK_infodetail).append(append);
                                                                    $('#count_soalan').html(count+1);
                                                                }
                                                                if(obj_info.data.length == (i+1)){
                                                                    appends = appends + `</table>`;
                                                                    $.each(list_soalan_kiri, function(s,search){
                                                                        if(search.upt_btn.indexOf(`pilih('`+FK_infodetail+`',1)`) >= 0){
                                                                            list_soalan_kiri[s].senarai_soalan = appends;
                                                                        }
                                                                    });
                                                                    if(obj_banksoalan.data.length == (count+obj_sirisoalan.data.length+1)){
                                                                        $("#table_list_soalan").html("");
                                                                        $("#table_list_soalan").footable({
                                                                            "columns": columns_soalan,
                                                                            "rows": list_soalan_kiri,
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
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }
                                });
                            } else {flag = list_flag.indexOf(FK_infodetail);
                                let append = '';
                
                                if(flag < 0){
                                    list_flag.push(FK_infodetail);
                
                                    var form = new FormData();
                                    form.append('id_infodetails',FK_infodetail);
                
                                    get_infodetails(form,window.localStorage.token,function(){
                                        if(obj_det.success){
                                            let jenis_soalan = "";
                                            if(field.jenis_soalan == "Single Choice") jenis_soalan = "SC";
                                            else if(field.jenis_soalan == "Descriptive") jenis_soalan = "D";
                                            else if(field.jenis_soalan == "Multiple Response") jenis_soalan = "MR";
                                            else if(field.jenis_soalan == "True/False") jenis_soalan = "TF";
                                            else if(field.jenis_soalan == "Short Answers") jenis_soalan = "SA";
                                            else if(field.jenis_soalan == "File Upload") jenis_soalan = "FU";
            
                                            let tahap = "";
                                            if(field.tahap == "MUDAH") tahap = "M";
                                            else if(field.tahap == "SEDERHANA") tahap = "Se";
                                            else if(field.tahap == "SUKAR") tahap = "Su";
                                            
                                            list_soalan_kiri.push({
                                                soalan: `<span style="white-space: pre-line;">`+obj_det.data.teks+`</span>`,
                                                jenis_soalan_tahap: `SOALAN BERANGKAI`,
                                                upt_btn: `<button onclick="update('`+FK_infodetail+`',1)" class="btn btn-simple btn-danger btn-sm"><small>Kemaskini</small> <i class="fa fa-pencil-alt"></i></button><br>
                                                        <button onclick="pilih('`+FK_infodetail+`',1)" class="btn btn-simple btn-simple btn-primary btn-sm">Pilih <i class="fa fa-arrow-right"></i></button>`
                                            });
                
                                            $("#list_soalan").append(`
                                            <div class="card border mb-3 class_soalan d-none" id="card-infodetails`+FK_infodetail+`">
                                                <div class="body">
                                                    <div class="row">
                                                        <div class="col-12">
                                                            `+obj_det.data.teks+`
                                                        </div>
                                                    </div>
                                                    <div class="justify-content-end d-flex ">
                                                        <button class="btn btn-primary btn-simple" data-bs-toggle="collapse" data-bs-target="#collapseExample_`+FK_infodetail+`" aria-expanded="false"
                                                        aria-controls="collapseExample_`+FK_infodetail+`"><i class="fa fa-list"></i> Terperinci</button>
                                                        <button onclick="pilih('`+FK_infodetail+`',1)" class="btn btn-simple btn-simple btn-danger">Pilih <i class="fa fa-arrow-right"></i></button>
                                                    </div>
                                                    <div class="collapse border-top mt-2 pt-2" id="collapseExample_`+FK_infodetail+`">
                                                        <div class="well" id="append_soalan_`+FK_infodetail+`"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            `);
                                            list_infodetailsSoalan(FK_infodetail,window.localStorage.token,function(){
                                                $('#append_soalan_'+FK_infodetail).html('');
                                                if(obj_info.success){
                                                    let appends = `<table class="table">
                                                                    <tr>
                                                                        <th>Bil.</th>
                                                                        <th>Soalan</th>
                                                                        <th>Topik</th>
                                                                        <th>Jenis Soalan / Tahap</th>
                                                                    </tr>
                                                    `;
                                                    $.each(obj_info.data,function(i,item){
                                                        flag_exist = list_select.indexOf(item.PK_bank_soalan);
                                                        count = parseInt($('#count_soalan').html());
                                                        if(flag_exist < 0){
                                                            $('#card-infodetails'+FK_infodetail).removeClass('d-none');
                                                            // append = `
                                                            //     <div class="col-md-12">
                                                            //         <!-- <b>`+item.kod_soalan+`</b> -->
                                                            //         `+item.soalan+`
                                                            //         <small><i>`+topik+`</i></small>
                                                            //         <table class="table">
                                                            //             <tr><td><b>JENIS SOALAN</b><br>`+item.jenis_soalan+`</td><td><b>TAHAP</b><br>`+item.tahap+`</td></tr>
                                                            //         </table>
                                                            //     </div>
                                                            // `;
                                                            append = `
                                                                <tr>
                                                                    <td>`+(bil_kiri++)+`</td>
                                                                    <td><span style="white-space: pre;">`+item.soalan+`</span></td>
                                                                    <td>`+item.topik+`</td>
                                                                    <td>`+item.jenis_soalan+`/`+item.tahap+`</td>
                                                                </tr>
                                                            `;
                                                            appends = appends + append;
                                                            $('#append_soalan_'+FK_infodetail).append(append);
                                                            $('#count_soalan').html(count+1);
                                                        }
                                                        if(obj_info.data.length == (i+1)){
                                                            appends = appends + `</table>`;
                                                            $.each(list_soalan_kiri, function(s,search){
                                                                if(search.upt_btn.indexOf(`pilih('`+FK_infodetail+`',1)`) >= 0){
                                                                    list_soalan_kiri[s].senarai_soalan = appends;
                                                                }
                                                            });
                                                            if(obj_banksoalan.data.length == (f+1)){
                                                                $("#table_list_soalan").html("");
                                                                $("#table_list_soalan").footable({
                                                                    "columns": columns_soalan,
                                                                    "rows": list_soalan_kiri,
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
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        }
                        // console.log('last = '+count_soalan);

                        // if(i == (obj_banksoalan.data.length-1)){
                        //     $('#count_soalan').html('['+count_soalan+' Soalan]');
                        // }
                        setTimeout(function(){
                            if(obj_banksoalan.data.length == (f+1)){
                                $("#table_list_soalan").html("");
                                $("#table_list_soalan").footable({
                                    "columns": columns_soalan,
                                    "rows": list_soalan_kiri,
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
                        },500);
                    });
                }
            }); 
            // list_soalan(window.sessionStorage.id_penilaian,window.localStorage.token,function(){
            //     if(obj_banksoalan.success){
                    
            //         list_flag = []; let count_soalan = 1;
        
            //         $("#list_soalan").html('');
        
            //         $.each(obj_banksoalan.data,function(i,field){
            //             let flag_exist = '';

            //             topik = field.topik;
            //             list_topik = topik.split(',');
            //             topik = "";
                        
            //             let flag = '';
            //             $.each(list_topik,function(t,row){
                            
            //                 topik += `<span class="badge badge-info">`+row+`</span> `;
            //             });
            
            //             let FK_infodetail = field.FK_infodetail;
            //             if(FK_infodetail == null){
            //                 flag_exist = list_select.indexOf(field.PK_bank_soalan);
            //                 count = parseInt($('#count_soalan').html());
                            
            //                 if(flag_exist < 0){
            //                     $("#list_soalan").append(`
            //                     <div class="card border mb-3 class_soalan" id="card_soalan_`+field.PK_bank_soalan+`">
            //                         <div class="body">
            //                             <div class="row">
            //                                 <div class="col-12">
            //                                     <!-- <b>`+field.kod_soalan+`</b> -->
            //                                     `+field.soalan+`
            //                                     <small><i>`+topik+`</i></small>
            //                                     <table class="table">
            //                                         <tr><td><b>JENIS SOALAN</b><br>`+field.jenis_soalan+`</td><td><b>TAHAP</b><br>`+field.tahap+`</td></tr>
            //                                     </table>
            //                                 </div>
            //                             </div>
            //                         <div class="justify-content-end d-flex ">
            //                             <button onclick="pilih('`+field.PK_bank_soalan+`',0)" class="btn btn-simple btn-danger">Pilih <i class="fa fa-arrow-right"></i></button>
            //                         </div>
            //                     </div>
            //                     </div>
            //                     `);
            //                     $('#count_soalan').html(count+1);
            //                 }

            //             }else{
            //                 flag = list_flag.indexOf(FK_infodetail);
            //                 let append = '';
            
            //                 if(flag < 0){
            //                     list_flag.push(FK_infodetail);
            
            //                     var form = new FormData();
            //                     form.append('id_infodetails',FK_infodetail);
            
            //                     get_infodetails(form,window.localStorage.token,function(){
            //                         if(obj_det.success){
            
            //                             $("#list_soalan").append(`
            //                             <div class="card border mb-3 class_soalan d-none" id="card-infodetails`+FK_infodetail+`">
            //                                 <div class="body">
            //                                     <div class="row">
            //                                         <div class="col-12">
            //                                             `+obj_det.data.teks+`
            //                                         </div>
            //                                     </div>
            //                                     <div class="justify-content-end d-flex ">
            //                                         <button class="btn btn-primary btn-simple" data-bs-toggle="collapse" data-bs-target="#collapseExample_`+FK_infodetail+`" aria-expanded="false"
            //                                         aria-controls="collapseExample_`+FK_infodetail+`"><i class="fa fa-list"></i> Terperinci</button>
            //                                         <button onclick="pilih('`+FK_infodetail+`',1)" class="btn btn-simple btn-simple btn-danger">Pilih <i class="fa fa-arrow-right"></i></button>
            //                                     </div>
            //                                     <div class="collapse border-top mt-2 pt-2" id="collapseExample_`+FK_infodetail+`">
            //                                         <div class="well" id="append_soalan_`+FK_infodetail+`"></div>
            //                                     </div>
            //                                 </div>
            //                             </div>
            //                             `);
            
            //                             list_infodetailsSoalan(FK_infodetail,window.localStorage.token,function(){
            //                                 $('#append_soalan_'+FK_infodetail).html('');
            //                                 if(obj_info.success){
            
            //                                     $.each(obj_info.data,function(i,item){
                                                    
            //                                         flag_exist = list_select.indexOf(item.PK_bank_soalan);
            //                                         count = parseInt($('#count_soalan').html());
            //                                         if(flag_exist < 0){
            //                                             $('#card-infodetails'+FK_infodetail).removeClass('d-none');
            //                                             append = `
            //                                                 <div class="col-md-12">
            //                                                     <!-- <b>`+item.kod_soalan+`</b> -->
            //                                                     `+item.soalan+`
            //                                                     <small><i>`+topik+`</i></small>
            //                                                     <table class="table">
            //                                                         <tr><td><b>JENIS SOALAN</b><br>`+item.jenis_soalan+`</td><td><b>TAHAP</b><br>`+item.tahap+`</td></tr>
            //                                                     </table>
            //                                                 </div>
            //                                             `;
            //                                             $('#append_soalan_'+FK_infodetail).append(append);
            //                                             $('#count_soalan').html(count+1);
            //                                         }
            //                                     });
            //                                 }
            //                             });
            //                         }
            //                     });
            //                 }
            //             }
            //             // console.log('last = '+count_soalan);

            //             // if(i == (obj_banksoalan.data.length-1)){
            //             //     $('#count_soalan').html('['+count_soalan+' Soalan]');
            //             // }
            //         });
            //     }
            // });
        }
    });
}