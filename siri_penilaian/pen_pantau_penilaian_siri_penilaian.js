$(function () {
    $.ajaxSetup({
        cache: false
    });    
    checkSession();
    let token = window.localStorage.token;            
    $("#leftsidebar").load('../aside/aside_detail_siri_penilaian.html');
    let id_siri_penilaian = sessionStorage.id_siri_penilaian;
    resetForm();
    load_siri_penilaian(id_siri_penilaian,token,function(){        
        if(objSiriPenilaian.success){
            let data = objSiriPenilaian.data;
            $("#btnKembali").attr('onclick','kembali2(\'' + data.id_penilaian + '\')');
            $("#kembali").attr('onclick','kembali()');
            $("#kembali2").attr('onclick','kembali2(\'' + data.id_penilaian + '\')');
            $("#nama_penilaian").html(data.nama_penilaian + " SIRI " + data.kod+"/"+data.tahun);
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
                        status_active = 'active';
                        load_calon_soalan(item.id_sesi_siri_penilaian, item.sesi_penilaian);
                    } 

                    $('#tab_sesi').append(
                        `<li class="nav-item"><a class="nav-link btn-simple `+status_active+`" data-bs-toggle="tab" href="javascript:void(0);" onclick="load_calon_soalan(`+item.id_sesi_siri_penilaian+`,'`+item.sesi_penilaian+`');" id="tab_`+item.id_sesi_siri_penilaian+`"> `+item.sesi_penilaian+`</a></li>`
                    );

                    list.push(item.id_sesi_siri_penilaian);
                });
            }
        }else{
            
        }
    });
});

function load_calon_soalan(FK_sesi,nama_sesi){
    var columns = [
        { "name": "bil", "title": "Bil." },
        { "name": "nama", "title": "Nama", "breakpoints": "md sm xs" },
        { "name": "no_kad_pengenalan", "title": "No. Kad Pengenalan" },
        { "name": "no_angka_giliran", "title": "No. Angka Giliran", "breakpoints": "md sm xs"  },
        { "name": "image", "title": "Gambar", "breakpoints": "md sm xs" },
    ];
    var form = new FormData();
    form.append("FK_siri_penilaian", window.sessionStorage.id_siri_penilaian);
    form.append("FK_sesi", FK_sesi);
    listCalonSoalanBySiriPenilaian(form, function(){
        var list = [];
        let bil = 1;
        console.log(obj);
        let webcam_calon = [];
        $.each(obj.data, function (f, field) {   
            image = '';
            if(field.image != null){
                webcam_calon.push({
                    id_calon_soalan: field.id_calon_soalan
                });
                data_uri = JSON.parse(field.image);
                image = data_uri[data_uri.length-1].data_uri;
                image = `<img id="image_calon_`+field.id_calon_soalan+`" src="`+image+`">`;
            }
            list.push({
                bil: bil++, 
                nama: field.nama, 
                no_kad_pengenalan: field.no_kad_pengenalan, 
                no_angka_giliran: field.no_angka_giliran, 
                image: image
            });
            console.log(list);
        });
        $("#nama_sesi").html(nama_sesi);
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
        webCam(webcam_calon);
    });
}

var confirmed = false;

function details(id){

    sessionStorage.id_calon_soalan = id;

    window.sessionStorage.child = "78797c6eb1602af05f21fe6c7f0dcb11";
    checkAuthentication(window.sessionStorage.child);

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

    let listHtml = ["tablePengesahan", "tablePenggubal", "tablePenilai",
    ];
    $.each(listHtml, function (i, item) {
        $("#" + item).html("");
    });

    // document.getElementById('register').reset();
}

function webCam(webcam_calon){
    var x = setInterval(function() {
        $.each(webcam_calon, function(i, item){
            var form = new FormData();
            form.append("id_calon_soalan", item.id_calon_soalan);
            var settings = {
                "url": host+"calon_soalan/showCalon",
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
                result = JSON.parse(response);
                data_uri = JSON.parse(result.data.image);
                image = data_uri[data_uri.length-1].data_uri;
                $("#image_calon_"+item.id_calon_soalan).attr("src",image);
            });
        });
    }, 10000);
}