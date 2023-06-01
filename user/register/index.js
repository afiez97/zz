// const queryString = window.location.search;
// if (queryString != '')  {
//     const urlParams = new URLSearchParams(queryString);
//     const temp = urlParams.get('temp');
//     var settings = {
//         "url": localhost+"usersResetKatalaluan/" + temp,
//         "method": "GET",
//         "timeout": 0,
//     };
//     $.ajax(settings).done(function (response) {
//         $("#no_kad_pengenalan_final").val(response.data.no_kad_pengenalan);
//         if (typeof response.data.no_kad_pengenalan !== 'undefined')  {
//             $("#modal_forgotpassword2").modal('show');
//         } else  {
//             swal({
//                 title: "Lupa Katalaluan",
//                 text: "",
//                 type: "error",
//                 closeOnConfirm: true,
//                 allowOutsideClick: false,
//                 html: "Pautan ini telah luput."
//             }).then(function(){
//                 window.location.replace('../login');
//             });
//         }
//     });    
// }

$(function(){
    $.ajaxSetup ({
        cache: false
    });
    document.getElementById("no_kad_pengenalan_daftar").focus();
});

$("#login").click(function(){    
    $("#login_modal").modal('show');
});

var confirmed = false;

function check_hrmis(noic, returnValue) {
  var settings = {
      "url": "https://admin.dtims.intan.my/api/hrmis/check/"+noic,
    //   "url": "http://'+window.location.hostname+'/admin/" + noic + ".json",
      "method": "GET",
      "timeout": 0,
    //   "headers": {
    //       "Authorization": "fasiliti " + window.sessionStorage.token
    //   },
  };
  $.ajax(settings).done(function (response) {
      obj_hrmis = JSON.parse(response);
    //   obj_hrmis = response;

      returnValue();
  });
}

$('#no_kad_pengenalan_daftar').change(function () {
  jenis_pengguna_list();
  let no_kad_pengenalan = $('#no_kad_pengenalan_daftar').val();
  $("#btn_daftar").prop('disabled', true);
  $("#icon_daftar").prop('class', 'fa fa-cog fa-spin');
  $('#divFK_jenis_pengguna').prop('style', 'display:none');
  if (no_kad_pengenalan != "") {
      check_users(no_kad_pengenalan, function () {
          if (obj_users.success) { // dah daftar
              swal({
                  title: "Semak Pengguna",
                  text: "No Kad Pengenalan " + no_kad_pengenalan + " telah berdaftar di dalam sistem.",
                  type: "warning",
                  closeOnConfirm: true,
                  allowOutsideClick: false,
                  html: false
              }).then(function () {
                    $("#btn_daftar").prop('disabled', true);
                    $("#icon_daftar").prop('class', 'fa fa-search');
                    $('#no_kad_pengenalan_daftar').val('');
                });
          }
          else {
              check_hrmis(no_kad_pengenalan, function () {
                  if (obj_hrmis == 2) { //check hrmis
                      $('#divFK_jenis_pengguna').prop('style', '');
                      $("#btn_daftar").prop('disabled', false);
                      $("#btn_daftar").html('<i id="icon_daftar" class="fa fa-plus"></i> Daftar');
                      $('#FK_jenis_pengguna').val("");
                      window.localStorage.no_kad_pengenalan = no_kad_pengenalan;
                  }
                  else {
                      $('#divFK_jenis_pengguna').prop('style', '');
                      $('#FK_jenis_pengguna').val('1');
                      // $('#FK_jenis_pengguna').attr("style", "pointer-events: none;");
                      $("#btn_daftar").prop('disabled', false);
                      $("#btn_daftar").html('<i id="icon_daftar" class="fa fa-plus"></i> Daftar');
                      // $("#icon_daftar").prop('class','fa fa-plus');
                      window.localStorage.no_kad_pengenalan = no_kad_pengenalan;
                      window.sessionStorage.FK_jenis_pengguna = '1';
                  }
              });
          }
      });
  }
  else {
      $("#btn_daftar").prop('disabled', true);
      $("#icon_daftar").prop('class', 'fa fa-plus');
  }
});

function submit(){
    if($("#FK_jenis_pengguna").val() != ""){
        $("#register_form").submit();
    }
}

function check_users(noic,returnValue){
  var form = new FormData();
  form.append("no_kad_pengenalan",noic);

  var settings = {
      "url": host+"checkUsers",
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false,
      "data": form
  };
  $.ajax(settings).done(function (response) {
      obj_users = JSON.parse(response);
      returnValue();
      
  }); 
}

function jenis_pengguna_list() {
  //Dropdown Jenis Pengguna List
  var settings = {
      "url": host + "jenispenggunasList",
      "method": "GET",
      "timeout": 0,
      "headers": {
          "Authorization": window.localStorage.token
      },
  };

  $.ajax(settings).done(function (response) {
      //LIST OPTION
      $('#FK_jenis_pengguna').empty();
      $('#FK_jenis_pengguna').append($('<option>', {
          value: "",
          text: "Pilih Kategori Pengguna"
      }));
      $.each(response.data, function (i, item) {
          $('#FK_jenis_pengguna').append($('<option>', {
              value: item.id_jenispengguna,
              text: item.jenis_pengguna
          }));
      });

  });
  // END Dropdown Jenis Pengguna List
}

$("#register_form").on('submit',function(e){
  let $this = $(this);  
  if (!confirmed) {
      e.preventDefault();
      $('#contentRegister').load('daftar.html');
      let FK_jenis_pengguna = $("#FK_jenis_pengguna").val();
      let FK_jenis_pengguna_text = $("#FK_jenis_pengguna").text();
      swal({
          title: "Daftar Pengguna",
          text: "Sila lengkapkan butiran pendaftaran.",
          type: "question",
          confirmButtonText: "Teruskan",
          closeOnConfirm: true,
          allowOutsideClick: false,
          html: false
      }).then(function(){
          sessionStorage.FK_jenis_pengguna = FK_jenis_pengguna;
        //   $("#check_ic").modal('hide');
          if (FK_jenis_pengguna == 1) {
              $(".kerajaan").prop('style','display:true');
              $("#loading_modal").modal('hide');
              $("#check_ic").addClass('d-none');
              $("#after_check_ic").removeClass('d-none');
          } else  {
              $(".swasta").prop('style','display:true');
              $("#check_ic").addClass('d-none');
              $("#after_check_ic").removeClass('d-none');
          }
      });
  }
});

$("#checkusers").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        let no_kad_pengenalan = $("#no_kad_pengenalan_Semak").val();

        var form = new FormData();
        form.append("no_kad_pengenalan",no_kad_pengenalan);
        form.append("masa",new Date());
        form.append("landing_page","/user");
        // console.log(nama_user)
        var settings = {
            "url": host+"usersResetToEmail",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };

        $.ajax(settings).done(function (response) {
            // console.log(response);
            result = JSON.parse(response);
            // console.log(result);
            if (!result.success) {            
                swal({
                    title: "Lupa Katalaluan",
                    text: "No Kad Pengenalan " + no_kad_pengenalan + " tidak berdaftar di dalam sistem.",
                    type: "success",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: true
                }).then(function(){
                    window.location.replace('../'); 
                });
            } else  {    
                swal({
                    title: "Lupa Katalaluan",
                    text: "",
                    type: "success",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: result.message
                }).then(function(){
                    sessionStorage.no_kad_pengenalan = no_kad_pengenalan;
                    window.location.reload();   
                });
            }
        });
    }
});

$("#checkusers3").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        $('#hantar').prop('disabled',true);
        $("#icon_hantar").prop('class','fa fa-cog fa-spin');
        let no_kad_pengenalan = $("#no_kad_pengenalan_final").val();
        let katalaluan = $("#katalaluan").val();

        var form = new FormData();
        form.append("no_kad_pengenalan",no_kad_pengenalan);
        form.append("katalaluan",katalaluan);

        // console.log(nama_user)
        var settings = {
            "url": localhost+"usersReset",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": "media " + window.sessionStorage.token
            },
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };
        console.log(settings);

        $.ajax(settings).done(function (response) {
            // console.log(response);
            result = JSON.parse(response);
            // console.log(result);
            if (!result.success) {            
                swal({
                    title: "Lupa Katalaluan",
                    text: "Gagal.",
                    type: "error",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function(){
                    sessionStorage.token = result.token;
                    window.location.reload();
                });
            } else  {    
                swal({
                    title: "Lupa Katalaluan",
                    text: "Katalaluan telah disetsemula. Sila log masuk menggunakan katalaluan baharu.",
                    type: "success",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function(){
                    window.sessionStorage.removeItem("no_kad_pengenalan");
                    window.sessionStorage.removeItem("emel");
                    window.location.reload();   
                });
            }
        });
    }
});

function kembali(){
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.location.replace('../login');
}