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
                // if(val == 0){
                //     $("#content-soalan").append('<b>'+field.bahagian+'</b>');
                // }
                // val = 1;
                $.each(field.soalan,function(x,row){
                    let formSoalan = new FormData();
                    formSoalan.append('PK_siri_soalan',row.id);
                    
                    view_siriSoalan(formSoalan,token,function(){
                        if(obj_siriSoalan.success){
                            let dataSoalan = obj_siriSoalan.data;
                            jawapan = "";
                            
                            if(dataSoalan.jawapan == ""){
                                jawapan = '<p>Jawapan : </p><textarea class="form-control" rows="5"></textarea>';
                            }
                            else{
                                box = `<input type="radio" />`;
                                if(dataSoalan.FK_jenis_soalan == "3"){
                                    box = `<input type="checkbox" />`;
                                }                                                                
                                jawapan = `<ul class="list-unstyled">`;
                                $.each(JSON.parse(dataSoalan.jawapan),function(a,rows){
                                    jawapan += `<li class="">`+box+' - '+rows.value+`</li>`;
                                });
                                jawapan += `</ul>`;
                            }

                            $("#content-soalan").append(`
                            <div class="card border bg-white mb-2">
                                <div class="card-body">
                                    `+(bil++)+dataSoalan.soalan+`
                                    `+jawapan+`
                                </div>
                            </div>
                            `);                         
                        }
                    });
                });
            });
        }
        else{
            window.close();
        }
    });
    
});

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

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"data siri soalan Error","data":""};
        obj_siriSoalan = response;

        returnValue();
    });     
}