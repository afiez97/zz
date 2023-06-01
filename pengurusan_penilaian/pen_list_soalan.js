$(function () {
    $.ajaxSetup({
        cache: false
    });
    checkSession();
    let token = window.localStorage.token;
    $("#leftsidebar").load('../aside/aside_pen_list_soalan.html');
    let id_penilaian = sessionStorage.id_penilaian;
    load_penilaian(id_penilaian,window.localStorage.token,function(){
        if(objPenilaian.success){
            let data = objPenilaian.data;
            console.log(data);
            $("#nama_penilaian_1").html(data.nama_penilaian);
        }
    });
    // users(noic_master,token,function(){
    //     if(dataUsers.success){            
    //     }
    //     else{
    //         reject_load();
    //     }
    // });
});

$("#btnKembali").click(function(){
    sessionStorage.child = "b0f7c80a40e3d2b78df8f0e6c22f31e5";
    checkAuthentication(sessionStorage.child);
});


// Load Data Function

function load_penilaian(id_penilaian,token,returnValue){
    var form = new FormData();
    form.append("id_penilaian", id_penilaian);
    var settings = {
        "url": host+"penilaian/show",
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

//End Load Data Function