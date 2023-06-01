let json_list_bahagian = [], json_list_soalan = [];
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

    let form = new FormData();
    form.append('id_set_soalan',getUrlVars()['set_soalan']);

    view_set(form,token,function(){
        if(obj_setSoalan.success){
            let data = obj_setSoalan.data;
            let json_list = JSON.parse(data.json_list);
            $("#kod_set").html(data.kod_set);
            bil = 1;
            // val = 0;


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
                // console.log(JSON.stringify(json_list_soalan));
                list_allSoalan(form,token,function(){
                    $("#content-soalan").html('');
                    $("#overviews-soalan").html('');
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
                    $.each(json_list_bahagian, function(i, item){
                        $("#overviews-soalan").append(`
                            <div id="div_`+item.bahagian+`" style="background-color:#e7e7e7;margin-bottom:15px;padding:15px"><p style="font-weight:bold; font-size:20px;text-align:center"><span style="text-transform:uppercase">SET `+data.kod_set+` : </span><span style="text-transform:capitalize">`+item.bahagian.replaceAll('_', ' ')+`</span></p></div>
                        `);
                    });

                    let bil = 1;
                    let first = 0;
                    
                    $.each(json_list_soalan,function(i, item){
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
                        // $("#div_"+item.bahagian).append(`
                        // <button class="btn btn-circle `+btnbg+` btn-outline-dark mt-2" id="overview`+item.PK_siri_soalan+`" onclick="dispSoalan('`+item.PK_siri_soalan+`')">` + bil + `</button>
                        // `);
                        if(item.FK_jenis_soalan == "1" || item.FK_jenis_soalan == "3" || item.FK_jenis_soalan == "4"){
                            let abcd = ['A','B','C','D','E','F','G','H','I','J','K','L'];
                            box = `<input type="radio" name="`+ item.kod_soalan;
                            if(item.FK_jenis_soalan == "3"){
                                box = `<input type="checkbox"`;
                            }                                                                
                            jawapan = `<ul class="list-unstyled">`;
                            $.each(JSON.parse(item.jawapan),function(a,rows){
                                value = rows.name.split("jawapan_");
                                jawapan += `<div class="row">
                                                <div class="col-1">
                                                    `+abcd[a]+`.
                                                </div>
                                                <div class="col-11">
                                                    `+rows.value+`
                                                </div>
                                            </div>`;
                            });
                            jawapan += `</ul>`;    
                        }
                        else if(item.FK_jenis_soalan == "6"){
                            jawapan = item.jawapan;
                        }
                        else{
                            // jawapan = `<textarea class="form-control" id="`+ item.kod_soalan + `textarea" cols="100" rows="4" value="`+value[1]+`" placeholder="Sila Jawab Di Sini..." onchange="regJ(this.value,'`+item.PK_siri_soalan+`')"></textarea>`;    
                            jawapan = `<textarea class="form-control" cols="100" rows="4" value="" placeholder="Sila Jawab Di Sini..."></textarea>`;    
                        }
                        if(first == item.PK_siri_soalan){
                            dnone = '';
                            btnbg = 'bg-danger';
                            currentQ = item.PK_siri_soalan;
                            $("#kod_set").html(item.bahagian.replaceAll('bahagian_', ' '));
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
                        if(item.teks != null){
                            $("#div_"+item.bahagian).append(
                                `<div class="card border mb-2 `+dnone+`" id="soalan`+item.PK_siri_soalan+`" style="padding:10px;background-color:white">
                                <div class="card-body">
                                    `+teks+`
                                    <div class="mb-3">
                                    `+`<span style="display: inline;color: black;font-size: 12.0pt; mso-fareast-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;float:left;">` + (bil) + `. </span> <span style="font-size:12px;float:left;color: black;">` +item.soalan+`</span>
                                    </div>
                                    <div class="mb-3">
                                    `+jawapan+`
                                    </div>
                                </div>
                            </div>
                            `);
                            // $("#content-soalan").append(`
                            // <div class="card border mb-2 `+dnone+`" id="soalan`+item.PK_siri_soalan+`">
                            //     <div class="card-body">
                            //         <div class="row">
                            //             <div class="col-md-7">
                            //                 `+teks+`
                            //             </div>
                            //             <div class="col-md-5">
                            //                 <div class="mb-3">
                            //                 `+`<span style="color: black;font-size: 12.0pt; mso-fareast-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">` + (bil) + `.</span> <span style="color: black;">` +item.soalan+`</span>
                            //                 </div>
                            //                 <div class="mb-3">
                            //                 `+jawapan+`
                            //                 </div>                                
                            //             </div>
                            //         </div>
                            //     </div>
                            // </div>
                            // `);
                        } else {
                            $("#div_"+item.bahagian).append(
                                `
                            <div class="card border mb-2 `+dnone+`" id="soalan`+item.PK_siri_soalan+`" style="padding:10px;background-color:white">
                                <div class="card-body">
                                    `+teks+`
                                    <div class="mb-3">
                                    `+`<span style="color: black;font-size: 12.0pt; mso-fareast-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">` + (bil) + `.</span> <span style="color: black;">` +item.soalan+`</span>
                                    </div>
                                    <div class="mb-3">
                                    `+jawapan+`
                                    </div>
                                </div>
                            </div>
                            `
                                // `<button class="btn btn-circle `+btnbg+` btn-outline-dark mt-2" id="overview`+item.PK_siri_soalan+`" onclick="dispSoalan('`+item.PK_siri_soalan+`')">` + bil + `</button>`
                            );
                            // $("#content-soalan").append(`
                            // <div class="card border mb-2 `+dnone+`" id="soalan`+item.PK_siri_soalan+`">
                            //     <div class="card-body">
                            //         `+teks+`
                            //         <div class="mb-3">
                            //         `+`<span style="color: black;font-size: 12.0pt; mso-fareast-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">` + (bil) + `.</span> <span style="color: black;">` +item.soalan+`</span>
                            //         </div>
                            //         <div class="mb-3">
                            //         `+jawapan+`
                            //         </div>
                            //     </div>
                            // </div>
                            // `);
                        }
        
                        bil++;
                    });
                });

                // $.each(field.soalan,function(x,row){
                //     let formSoalan = new FormData();
                //     formSoalan.append('PK_siri_soalan',row.id);
                    
                //     view_siriSoalan(formSoalan,token,function(){
                        
                //         if(obj_siriSoalan.success){
                            
                //             let dataSoalan = obj_siriSoalan.data;
                //             jawapan = "";
                            
                //             if(dataSoalan.jawapan == ""){
                //                 jawapan = '<p>Jawapan : </p><textarea class="form-control" rows="5"></textarea>';
                //             }
                //             else{
                //                 box = `<input type="radio" />`;
                //                 if(dataSoalan.FK_jenis_soalan == "3"){
                //                     box = `<input type="checkbox" />`;
                //                 }                                                                
                //                 jawapan = `<ul class="list-unstyled">`;
                //                 $.each(JSON.parse(dataSoalan.jawapan),function(a,rows){
                //                     jawapan += `<li class="">`+box+' - '+rows.value+`</li>`;
                //                 });
                //                 jawapan += `</ul>`;
                //             }

                //             $("#content-soalan").append(`
                //             <div class="card border bg-white mb-2">
                //                 <div class="card-body">
                //                     `+(bil++)+dataSoalan.soalan+`
                //                     `+jawapan+`
                //                 </div>
                //             </div>
                //             `);                         
                //         }
                //     });
                // });
            });
        }
        else{
            window.close();
        }
    });
    
});

function dispSoalan(id){
    $("#soalan"+currentQ).addClass('d-none');
    if($("#overviews"+currentQ).hasClass("bg-success")){
        $("#overviews"+currentQ).prop('class', 'btn btn-circle bg-success btn-outline-dark mt-2');
    } else {
        $("#overviews"+currentQ).prop('class', 'btn btn-circle bg-yellow btn-outline-dark mt-2');
    }
    currentQ = id;
    $("#soalan"+id).removeClass('d-none');
    if($("#overviews"+currentQ).hasClass("bg-success")){
        $("#overviews"+id).prop('class', 'btn btn-circle bg-success btn-outline-dark mt-2');
    } else {
        $("#overviews"+id).prop('class', 'btn btn-circle bg-danger btn-outline-dark mt-2');
    }
}

function list_allSoalan(form,token,returnValue){
    var settings = {
        "url": host+"sirisoalan/listAllSoalan",
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
        obj_siriSoalan = JSON.parse(response);

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"data siri soalan Error","data":""};
        obj_siriSoalan = response;

        returnValue();
    });     
}

function view_set(form,token,returnValue){
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
        // let obj = JSON.parse(response);
        obj_setSoalan = JSON.parse(response);

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"data set soalan Error","data":""};
        obj_setSoalan = response;

        returnValue();
    });     
}

function view_siriSoalan(form,token,returnValue){
    var settings = {
        "url": host+"sirisoalan/view",
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
        console.log(111);

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"data siri soalan Error","data":""};
        obj_siriSoalan = response;
        console.log(222);
        returnValue();
    });     
}