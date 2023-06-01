var path = window.location.pathname.split("/");
if(window.location.hostname == "localhost"){
    var host = "http://"+window.location.hostname+"/penilaian/user/api_penilaian/public/";
    path = path[2];
} else {
    var host = "http://"+window.location.hostname+"/user/api_penilaian/public/";
    path = path[1];
}
var id_users_master,nama_agensi_master,nama_kluster_master,FK_agensi_master,FK_kluster_master,gambar_master,id_penyelaras_master,nama_master,notel_master,notel_kerajaan_master,emel_master,emel_kerajaan_master,noic_master,token,nama_penilaian_master,nama_jawatan_master;
let range_count = 0;
var arr_listMenuDetailSiriPenilaian = ["pen_info_siri_penilaian", "pen_us_siri_penilaian", "pen_muka_depan_siri_penilaian", "pen_peng_gred_siri_penilaian", "pen_peng_penilaian_siri_penilaian", "pen_permohonan_calon_siri_penilaian", "pen_pantau_penilaian_siri_penilaian", "pen_list_keputusan_siri_penilaian", "pen_peng_bank_soalan_siri_penilaian", "pen_peng_set_soalan_siri_penilaian", "pen_analisa_jawapan_siri_penilaian", "pen_stat_penilaian_siri_penilaian", "pen_dashboard_penilaian_siri_penilaian", "pen_sah_soalan_siri_penilaian", "pen_sah_markah_siri_penilaian", "pen_view_markah_set_soalan", "pen_list_urusetia", "pen_list_soalan", "pen_list_bank_soalan"];
const char = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
// amri hitam
const escapeRegExpMatch = function (s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
const isExactMatch = (str, match) => {
    return new RegExp(`\\b${escapeRegExpMatch(match)}\\b`).test(str);
}
// test sini
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function popUp(URL) {
    
    leftPos = (screen.width - 1024) / 2;
    leftPos = leftPos + 0;
    topPos = (screen.height - 700) / 2;
    
    w = screen.width;
    h = screen.height;
        
    popup = window.open(URL,'name','toolbar=no,location=no,directories=no,menubar=no,scrollbars=yes,status=yes,resizable=no,width='+w+',height='+h+',left='+leftPos+',top='+topPos);
    popup.focus();
  }

function users(noic,token,returnValue){

    var settings = {
      "url": host + "usersGetIc/"+noic,
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Authorization": window.localStorage.token
      }
    };

    var request = $.ajax(settings);

    request.done(function (response) {
        // window.localStorage.token = response.token;
        dataUsers = response;
        returnValue();
    });

    request.fail(function(response, textStatus){
        reject_load();
    });
}

function usersGetId(id,token,returnValue){
    var settings = {
      "url": host + "usersGetId/"+id,
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Authorization": window.localStorage.token
      }
    };

    var request = $.ajax(settings);
    request.done(function (response) {
        dataUsers = response;
        returnValue();
    });

    // request.fail(function(response, textStatus){
    //   reject_load();
    // });
}

function menusList(){
    var settings = {
        "url": host + "menusList",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
    };
    $.ajax(settings).done(function (response) {
        $.each(response.data, function (i, item) {
            let bggray = "";
            if (item.MD5menu == window.sessionStorage.child){
                bggray = "bg-gray-200";
            }
            if (item.FK_parent == "0") {
                $('#' + item.idmenu).addClass(bggray).html(item.icon + '<span>' + item.menu + '</span>');
            } else {
                $('#' + item.idmenu).addClass(bggray).html(item.icon + '<span>' + item.menu + '</span>');
            }
        });
    });
    
}

function penyelaras(noic,token,returnValue){
    var form = new FormData();

    var settings = {
      "url": host + "penyelaras/showGetIc/"+noic,
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Authorization": window.localStorage.token
      }
    };

    var request = $.ajax(settings);

    request.done(function (response) {
        dataPenyelaras = response;
        returnValue();
    });

    request.fail(function(response, textStatus){
      reject_load();
    });
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [day, month, year].join('/');
}

function formatTime(d){
  var d = new Date(d),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();
  times = d.getHours() + ":" + (d.getMinutes()<10?'0':'') + d.getMinutes() + ":" + (d.getSeconds()<10?'0':'') + d.getSeconds()

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('-') +" "+ times;
}

function formatTimeOnly(d){
    var time = d;
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if(AMPM == "pm" && hours<12) hours = hours+12;
    if(AMPM == "am" && hours==12) hours = hours-12;
    console.log(AMPM);
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if(hours<10) sHours = "0" + sHours;
    if(minutes<10) sMinutes = "0" + sMinutes;
    console.log(sHours + ":" + sMinutes);
    return (sHours + ":" + sMinutes);
}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
}

function toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', {
      month: 'short',
    });
}

function reject_load(){
  swal(
    {
        title: "Log Masuk Tamat",
        text: "Keselamatan Sistem",
        type: "error",
        showCancelButton: false,
        allowOutsideClick: false,
    }).then(function(){
        saveLog("Force Logout.", window.sessionStorage.browser);
        window.sessionStorage.clear();
        window.localStorage.clear();
        window.location.replace("../login/");
    });  
}

function logkeluar(){
    swal({
        title: "Log Keluar",
        text: "Anda Pasti Untuk Log Keluar?",
        type: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        closeOnConfirm: true,
        allowOutsideClick: false,
        html: false
    }).then(function () {
        saveLog("Logout.", window.sessionStorage.browser);
        window.sessionStorage.clear();
        window.localStorage.clear();
        window.location.replace("../login/");
    });
}

function checkAuthentication(child) {
    var form = new FormData();
    form.append("no_kad_pengenalan", window.localStorage.no_kad_pengenalan);
    form.append("token", window.localStorage.token);
    var settings = {
        "url": host + "checkAuth",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
    }

    $.ajax(settings).done(function (response) {
        result = response.data;
        if (response.data.id_users != null) {
            checkContent(child);
            if(child != null) {
                loadContent(child);
            } else  {
                $("#displaycontent").show();                
            }
            // $('body').show();
        } else {
            // window.location.replace("/login");
        }
    });
}

function checkContent(content){
    if (content != '15aaa21373a7090f86dcd348a755b94c') { // peranan & capaian
        sessionStorage.removeItem('tab');
    }
    if (content != 'b0f7c80a40e3d2b78df8f0e6c22f31e5' && // pen_list_siri_penilaian
        content != 'd6f1027b300c5e96f439dabb028385be' && // pen_list_bank_soalan
        content != '3737b150ea9ee0191b5dcc8233bfa472' && // pen_info_siri_penilaian
        content != 'a9221c9f4f6ef013df3ca90f4344fed8' && // pen_us_siri_penilaian
        content != '900a5a773ccfab87f28ae75375519def' && // pen_peng_bank_soalan_siri_penilaian
        content != '0d8c319d8ab7514d356a9b19803f814b' && // pen_peng_set_soalan_siri_penilaian
        content != '1c2447405f88bd258c2cb49411f8a004' && // pen_muka_depan_siri_penilaian
        content != 'ed62a3e7209d0b940f0fe6fb113fe869' && // pen_peng_gred_siri_penilaian
        content != '2f8de4d1869e3f63195f41a3dd8fcd74' && // pen_peng_penilaian_siri_penilaian
        content != 'e027f055c19e9df17bb1ceb62d06a813' && // pen_permohonan_calon_siri_penilaian
        content != 'c3c330d6c08168eaf6511a83a7d039bc' && // pen_pantau_penilaian_siri_penilaian
        content != 'ee6ed0c8d32a8c5f4f97f6538472974d' && // pen_list_keputusan_siri_penilaian
        content != '38ecb7a826707a7de817034a05683369' && // pen_analisa_jawapan_siri_penilaian
        content != '89f6e60cc53d69f88d639390730bd210' && // pen_stat_penilaian_siri_penilaian
        content != 'f4a88cabd646d977ad558b2c22fdaabb' && // pen_dashboard_penilaian_siri_penilaian
        content != '5143558162aee43811e841e6991f0b3c' && // pen_sah_soalan_siri_penilaian
        content != '3e34a064e47e11ebb503843a96fa67ba' && // pen_sah_markah_siri_penilaian
        content != 'f2aba07fdc577fb109ccd5daca8860f2' && // pen_view_markah_set_soalan
        content != '78797c6eb1602af05f21fe6c7f0dcb11'    // pen_detail_list_keputusan_siri_penilaian
        ) {
        sessionStorage.removeItem('id_penilaian');
        sessionStorage.removeItem('id_siri_penilaian');
    }
    // if (content != '516d3532d70fde6af5d573655d774419') { // detail_siri_penilaian
    //     sessionStorage.removeItem('id_siri_penilaian');
    // }
}

function loadContent(child){
    var form = new FormData();
    form.append("content", child);
    var settings = {
        "url": host + "menus",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
    };
    $.ajax(settings).done(function (response) {
        result = response.data;
        if (result) {
            $('#displaycontent').load("../" + result.parent + "/" + result.child + '.html').show();
        }
    });
}

function pen_capaianRegister(formCapaian, returnValue){
    var settings = {
        "url": host + "addCapaian",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": formCapaian
    };
    
    var request = $.ajax(settings);

    request.done(function (response) {
        // console.log(response);
        objAddCapaian = JSON.parse(response);
        // window.localStorage.token = objAddCapaian.token;
        // token = objAddCapaian.token;
        returnValue();
    });

    request.fail(function (response){
        objAddCapaian = response;
        returnValue();
    });
}

function pen_usersSemakKatalaluan(form, returnValue){
    var settings = {
        "url": host + "usersSemakKatalaluan",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
    };
    
    var request = $.ajax(settings);

    request.done(function (response) {
        obj = response;
        returnValue();
    });

    request.fail(function (response){
        obj = response;
        returnValue();
    });
}

function pen_usersResetPassword(form, returnValue){
    var settings = {
        "url": host + "usersReset",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
    };
    
    var request = $.ajax(settings);

    request.done(function (response) {
        obj = response;
        returnValue();
    });

    request.fail(function (response){
        obj = response;
        returnValue();
    });
}

function pen_usersEditProfile(form, returnValue){
    var settings = {
        "url": host + "usersEditProfile",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
    };
    
    var request = $.ajax(settings);

    request.done(function (response) {
        window.localStorage.token = response.token;
        console.log(response);
        obj = response;
        returnValue();
    });

    request.fail(function (response){
        obj = response;
        returnValue();
    });
}

function checkCapaian(capaian, token, returnValue){
    var form = new FormData();
    form.append('capaian', capaian);
    form.append('no_kad_pengenalan', localStorage.no_kad_pengenalan);
    var settings = {
      "url": host + "usersCheckCapaian",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Authorization": window.localStorage.token
      },
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false,
      "data": form
    }
    
    var request = $.ajax(settings);

    request.done(function (response) {
        dataCapaian = JSON.parse(response);
        returnValue();
    });

    request.fail(function(response){
        dataCapaian = response;
        returnValue();
    });
}

function checkSession(){
    let token = window.localStorage.token;
       
    checkCapaian(sessionStorage.capaian,token,function(){
        if(!dataCapaian.success){
            reject_load();
        }
    });
}

function checkLoginAdmin(form, returnValue){
    var settings = {
        "url": host + "checkLoginAdmin",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    var request = $.ajax(settings);
    request.done(function (response) {
        // get kena parse. first takyah parse
        objCheck = JSON.parse(response);
        returnValue();
    });

    request.fail(function (response) {
        // takyah parse
        objCheck = response;
        returnValue();        
    });
}

function gelaranlist(returnValue) {

    var settings = {
        "url": host + "gelaransList",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        }
    };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        obj_gelaran = response;
        returnValue();
    });
    // END Dropdown Agensi List
}

function kementerianlist(nama_kementerian) {
    var form = new FormData();
    form.append("FK_peranan", window.sessionStorage.peranan);
    // form.append("FK_kementerian", window.sessionStorage.FK_kementerian);

    var settings = {
        "url": host + "kementeriansList",
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

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        result = JSON.parse(response);
        $('#FK_kementerian_add').empty();
        $('#FK_kementerian_add').append($('<option>', {
            value: "",
            text: "Pilih Kementerian"
        }));
        $('#FK_kementerian').empty();
        $('#FK_kementerian').append($('<option>', {
            value: "",
            text: "Pilih Kementerian"
        }));
        $('#upt_FK_kementerian').empty();
        $('#upt_FK_kementerian').append($('<option>', {
            value: "",
            text: "Pilih Kementerian"
        }));
        $.each(result.data, function (i, item) {
            if (nama_kementerian == item.nama_kementerian) {
                $('#FK_kementerian_add').append($('<option>', {
                    value: item.id_kementerian,
                    text: item.nama_kementerian
                }).attr('selected', true));
                $('#FK_kementerian').append($('<option>', {
                    value: item.id_kementerian,
                    text: item.nama_kementerian
                }).attr('selected', true));
                $('#upt_FK_kementerian').append($('<option>', {
                    value: item.id_kementerian,
                    text: item.nama_kementerian
                }).attr('selected', true));
            } else {
                $('#FK_kementerian_add').append($('<option>', {
                    value: item.id_kementerian,
                    text: item.nama_kementerian
                }));
                $('#FK_kementerian').append($('<option>', {
                    value: item.id_kementerian,
                    text: item.nama_kementerian
                }));
                $('#upt_FK_kementerian').append($('<option>', {
                    value: item.id_kementerian,
                    text: item.nama_kementerian
                }));
            }
        });

    });
    // END Dropdown Kementerian List
}

function agensilist(nama_agensi) {
    var form = new FormData();
    form.append("FK_peranan", window.sessionStorage.peranan);

    var settings = {
        "url": host + "fasiliti_agensi/list",
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

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        result = JSON.parse(response);
        $('#FK_agensi_add').empty();
        $('#FK_agensi_add').append($('<option>', {
            value: "",
            text: "Pilih Agensi"
        }));
        $('#FK_agensi').empty();
        $('#FK_agensi').append($('<option>', {
            value: "",
            text: "Pilih Agensi"
        }));
        $('#FK_agensi_capaian').empty();
        $('#FK_agensi_capaian').append($('<option>', {
            value: "",
            text: "Pilih Agensi"
        }));
        $('#upt_FK_agensi').empty();
        $('#upt_FK_agensi').append($('<option>', {
            value: "",
            text: "Pilih Agensi"
        }));
        $.each(result.data, function (i, item) {
            if (nama_agensi == item.nama_agensi) {
                $('#FK_agensi_add').append($('<option>', {
                    value: item.id_agensi,
                    text: item.nama_agensi
                }).attr('selected', true));
                $('#FK_agensi').append($('<option>', {
                    value: item.id_agensi,
                    text: item.nama_agensi
                }).attr('selected', true));
                $('#FK_agensi_capaian').append($('<option>', {
                    value: item.id_agensi,
                    text: item.nama_agensi
                }).attr('selected', true));
                $('#upt_FK_agensi').append($('<option>', {
                    value: item.id_agensi,
                    text: item.nama_agensi
                }).attr('selected', true));
            } else {
                $('#FK_agensi_add').append($('<option>', {
                    value: item.id_agensi,
                    text: item.nama_agensi
                }));
                $('#FK_agensi').append($('<option>', {
                    value: item.id_agensi,
                    text: item.nama_agensi
                }));
                $('#FK_agensi_capaian').append($('<option>', {
                    value: item.id_agensi,
                    text: item.nama_agensi
                }));
                $('#upt_FK_agensi').append($('<option>', {
                    value: item.id_agensi,
                    text: item.nama_agensi
                }));
            }
        });

    });
    // END Dropdown Agensi List
}

function klusterlist() {
    var settings = {
        "url": host + "klusterList",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
    };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        // console.log(response);
        result = response;
        $('#FK_kluster_add').empty();
        $('#FK_kluster_add').append($('<option>', {
            value: "",
            text: "Pilih Program/Pusat"
        }));
        $('#FK_kluster').empty();
        $('#FK_kluster').append($('<option>', {
            value: "",
            text: "Pilih Program/Pusat"
        }));
        $('#upt_FK_kluster').empty();
        $('#upt_FK_kluster').append($('<option>', {
            value: "",
            text: "Pilih Program/Pusat"
        }));
        $.each(result.data, function (i, item) {
            $('#FK_kluster_add').append($('<option>', {
                value: item.id_kluster,
                text: item.nama_kluster
            }));
            $('#FK_kluster').append($('<option>', {
                value: item.id_kluster,
                text: item.nama_kluster
            }));
            $('#upt_FK_kluster').append($('<option>', {
                value: item.id_kluster,
                text: item.nama_kluster
            }));
        });

    });
    // END Dropdown Agensi List
}

function check_agensi(nama_agensi, returnValue) {
    var form = new FormData();
    form.append("FK_peranan", window.sessionStorage.peranan);
    // form.append("FK_agensi", window.sessionStorage.FK_agensi);
    form.append("nama_agensi", nama_agensi);

    var settings = {
        "url": host + "fasiliti_agensi/listCheckNama",
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

    $.ajax(settings).done(function (response) {
        obj_check_agensi = response;
        returnValue();
    });
    // END Dropdown Agensi List
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

function numberingFormat(name,limit){
    $("input[name='"+name+"']").on('input', function (e) {
        $(this).val($(this).val().replace(/[^0-9]/g, '')).attr('maxlength',limit);
      });
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

function upt_siri_penilaian(form,returnValue){
    var settings = {
        "url": host+"siri_penilaian/update",
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

        returnValue();
    });

    request.fail(function (response) {
        objSiriPenilaian = JSON.parse(response);

        returnValue();
    });
}

function upt_siri_penilaian_keterbukaan(form,returnValue){
    var settings = {
        "url": host+"siri_penilaian/updateKeterbukaan",
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

        returnValue();
    });

    request.fail(function (response) {
        objSiriPenilaian = JSON.parse(response);

        returnValue();
    });
}

function upt_siri_penilaian_template_emel(form,returnValue){
    var settings = {
        "url": host+"siri_penilaian/updateTemplateEmel",
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
        // window.localStorage.token = objSiriPenilaian.token;

        returnValue();
    });

    request.fail(function (response) {
        objSiriPenilaian = JSON.parse(response);

        returnValue();
    });
}

function siriPenilaianMenu(){ // aside
    if (sessionStorage.capaian == capaian[3]){
        var form = new FormData();
        form.append('FK_penilaian', sessionStorage.id_penilaian);
        form.append('FK_users', id_users_master);
        pen_urusetiaListByPenilaian(form, function(){
            resultList = objList;
            if (resultList.success){
                $.each(resultList.data, function(i, item){
                    if (item.urusetia == '1') {
                        pen_kategori_urusetiaShow(1, function(){
                            result = JSON.parse(objKategoriUrusetia.data.polisi_capaian);
                            $.each(result.r, function(i, item){
                                $("#li_" + item).removeClass('hidden');
                            });
                        });
                    }
                    if (item.jk_penggubal == '1') {
                        pen_kategori_urusetiaShow(2, function(){
                            result = JSON.parse(objKategoriUrusetia.data.polisi_capaian);
                            $.each(result.r, function(i, item){
                                $("#li_" + item).removeClass('hidden');
                            });
                        });
                    }
                    if (item.jk_penilai == '1') {
                        pen_kategori_urusetiaShow(3, function(){
                            result = JSON.parse(objKategoriUrusetia.data.polisi_capaian);
                            $.each(result.r, function(i, item){
                                $("#li_" + item).removeClass('hidden');
                            });
                        });
                    }
                    if (item.panel_penilai == '1') {
                        pen_kategori_urusetiaShow(4, function(){
                            result = JSON.parse(objKategoriUrusetia.data.polisi_capaian);
                            $.each(result.r, function(i, item){
                                $("#li_" + item).removeClass('hidden');
                            });
                        });
                    }
                });
            }
        });
    } else if (sessionStorage.capaian == capaian[1]){
        $.each(arr_listMenuDetailSiriPenilaian, function(i, item){
            $("#li_"+item).removeClass('hidden');
        });
        $("#li_pen_list_urusetia").addClass('hidden');        
    } else {
        $.each(arr_listMenuDetailSiriPenilaian, function(i, item){
            $("#li_"+item).removeClass('hidden');
        });
    }

}

function detailSiriPenilaianMenu(){ // aside
    if (sessionStorage.capaian == capaian[3]){
        var form = new FormData();
        form.append('FK_siri_penilaian', sessionStorage.id_siri_penilaian);
        form.append('FK_users', id_users_master);
        pen_urusetiaShowBySiriPenilaian(form, function(){
            resultShow = objShow;
            if (resultShow.success){
                if (resultShow.data.urusetia == '1') {
                    pen_kategori_urusetiaShow(1, function(){
                        result = JSON.parse(objKategoriUrusetia.data.polisi_capaian);
                        $.each(result.r, function(i, item){
                            $("#li_" + item).removeClass('hidden');
                        });
                    });
                }
                if (resultShow.data.jk_penggubal == '1') {
                    pen_kategori_urusetiaShow(2, function(){
                        result = JSON.parse(objKategoriUrusetia.data.polisi_capaian);
                        $.each(result.r, function(i, item){
                            $("#li_" + item).removeClass('hidden');
                        });
                    });                    
                }
                if (resultShow.data.jk_penilai == '1') {
                    pen_kategori_urusetiaShow(3, function(){
                        result = JSON.parse(objKategoriUrusetia.data.polisi_capaian);
                        $.each(result.r, function(i, item){
                            $("#li_" + item).removeClass('hidden');
                        });                     
                    });                    
                }
                if (resultShow.data.panel_penilai == '1') {
                    pen_kategori_urusetiaShow(4, function(){
                        result = JSON.parse(objKategoriUrusetia.data.polisi_capaian);
                        $.each(result.r, function(i, item){
                            $("#li_" + item).removeClass('hidden');
                        });                     
                    });                    
                }
            }
        });
    } else {
        $.each(arr_listMenuDetailSiriPenilaian, function(i, item){
            $("#li_"+item).removeClass('hidden');
        });
    }

}

function pen_siri_penilaianlistByPenilaian(form, returnValue){
    var settings = {
        "url": host+"penilaian/listByPenyelaras",
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
            type: "info",
            showConfirmButton: false,
            allowOutsideClick: false,
            html: false,
            timer: 2000
        }).then(function(){},
            function (dismiss) {}
        );
    });
}

function pen_siri_penilaianlistByUrusetiaSiriPenilaian(form, returnValue){
    var settings = {
        "url": host+"siri_penilaian/listByUrusetiaSiriPenilaian",
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
            type: "info",
            showConfirmButton: false,
            allowOutsideClick: false,
            html: false,
            timer: 2000
        }).then(function(){},
            function (dismiss) {}
        );
    });
}

function pen_kategori_urusetiaShow(id_kategori_urusetia, returnValue){
    var form = new FormData();
    form.append('id_kategori_urusetia', id_kategori_urusetia);
    var settings = {
        "url": host+"kategori_urusetia/show",
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
        objKategoriUrusetia = JSON.parse(response);

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

function pen_urusetiaListByPenilaian(form, returnValue){
    var settings = {
        "url": host + "urusetia/listByPenilaian",
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

    request.done(function(response){
        objList = JSON.parse(response);
        returnValue();
    });

    request.fail(function(response){
        objList = response;
        returnValue();
    });    
}

function pen_urusetiaShowBySiriPenilaian(form, returnValue){
    var settings = {
        "url": host + "urusetia/showBySiriPenilaian",
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

    request.done(function(response){
        objShow = JSON.parse(response);
        returnValue();
    });

    request.fail(function(response){
        objShow = response;
        returnValue();
    });    
}

function pen_urusetiaListBySiriPenilaian(form, returnValue){
    var settings = {
        "url": host + "urusetia/listBySiriPenilaian",
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

    request.done(function(response){
        objList = response;
        returnValue();
    });

    request.fail(function(response){
        objList = response;
        returnValue();
    });    
}

function listMenuDetailSiriPenilaian(FK_parent, returnValue) {
    //Checkbox Submodul List
    var form = new FormData();
    form.append("FK_parent", FK_parent);
    var settings = {
        "url": host + "menusListByParent",
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
        //LIST OPTION
        objMenuList = JSON.parse(response);
        returnValue();
    });
    // END Checkbox Format List
}

function listPermohonanBySiriPenilaian(form, returnValue){    
    var settings = {
        "url": host + "permohonan_penilaian/listBySiriPenilaian",
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
        obj= JSON.parse(response);
        returnValue();
    });

    request.fail(function(response){
        obj = response;
        returnValue();
    });  
}

function apprPermohonanPenilaian(form, returnValue){    
    var settings = {
        "url": host + "permohonan_penilaian/approval",
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
        obj= JSON.parse(response);
        returnValue();
    });

    request.fail(function(response){
        obj = response;
        returnValue();
    });  
}

function blastEmailCalonSoalan(form, returnValue){    
    var settings = {
        "url": host + "calon_soalan/blastEmail",
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
        obj= JSON.parse(response);
        returnValue();
    });

    request.fail(function(response){
        obj = response;
        returnValue();
    });  
}

function calonEmailCalonSoalan(form, returnValue){    
    var settings = {
        "url": host + "calon_soalan/calonEmail",
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
        obj= JSON.parse(response);
        returnValue();
    });

    request.fail(function(response){
        obj = response;
        returnValue();
    });  
}

function calonEmailKeputusan(id_calon_soalan){    
    var settings = {
        "url": host + "calon_soalan/calonEmailKeputusan/"+id_calon_soalan,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
    };

    var request = $.ajax(settings);

    request.done(function (response) {
        console.log(response);
    });

    request.fail(function(response){
        console.log(response);
    });
}

function apprSetSoalan(form, returnValue){    
    var settings = {
        "url": host + "setsoalan/approval",
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
        obj= JSON.parse(response);
        returnValue();
    });

    request.fail(function(response){
        obj = response;
        returnValue();
    });  
}

function regCalonSoalan(form, returnValue){    
    var settings = {
        "url": host + "calon_soalan/register",
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
        obj= JSON.parse(response);
        returnValue();
    });

    request.fail(function(response){
        obj = response;
        returnValue();
    });  
}

function delCalonSoalan(form, returnValue){    
    var settings = {
        "url": host + "calon_soalan/delete",
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
        obj= JSON.parse(response);
        returnValue();
    });

    request.fail(function(response){
        obj = response;
        returnValue();
    });  
}

function showCalonSoalanBySiriPenilaian(form, returnValue){    
    var settings = {
        "url": host + "calon_soalan/showBySiriPenilaian",
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
        obj= JSON.parse(response);
        returnValue();
    });

    request.fail(function(response){
        obj = response;
        returnValue();
    });  
}

function showCalonSoalan(form, returnValue){    
    var settings = {
        "url": host + "calon_soalan/showCalon",
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
        obj= JSON.parse(response);
        returnValue();
    });

    request.fail(function(response){
        obj = response;
        returnValue();
    });  
}

function showCalonSoalanJsonList(form, returnValue){    
    var settings = {
        "url": host + "calon_soalan/showCalonJsonList",
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
        obj= JSON.parse(response);
        returnValue();
    });

    request.fail(function(response){
        obj = response;
        returnValue();
    });  
}

function listCalonSoalanBySiriPenilaian(form, returnValue){    
    var settings = {
        "url": host + "calon_soalan/listBySiriPenilaian",
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
        obj= JSON.parse(response);
        returnValue();
    });

    request.fail(function(response){
        obj = response;
        returnValue();
    });  
}

function list_setSoalan(id_set_soalan,token,returnValue){
    var settings = {
        "url": host+"setsoalan/list/"+id_set_soalan,
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": "PENILAIAN "+token
        }
    };

    let request = $.ajax(settings);
    request.done(function (response) {
        obj_setSoalan = response;
        // obj_setSoalan = JSON.parse(response);

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"daftar bank soalan Error","data":""};
        obj_setSoalan = response;

        returnValue();
    }); 
}

function list_soalan(id_set_soalan,token,returnValue){

    var form = new FormData();
    form.append('id_set_soalan',id_set_soalan);

    // console.log(id_set_soalan);
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
        // obj_setSoalan = response;
        obj_setSoalan = JSON.parse(response);

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"senarai soalan per set Error","data":""};
        obj_setSoalan = response;

        returnValue();
    }); 
}

function update_setSoalan(form,token,returnValue){
    var settings = {
        "url": host+"setsoalan/update",
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
        obj_setSoalan = JSON.parse(response);

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"daftar bank soalan Error","data":""};
        obj_setSoalan = response;

        returnValue();
    }); 
}

function delSetSoalan(form, returnValue){    
    var settings = {
        "url": host + "setsoalan/delete",
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
        obj= JSON.parse(response);
        returnValue();
    });

    request.fail(function(response){
        obj = response;
        returnValue();
    });  
}

function updateBilCalonSesiPenilaian(form,returnValue){

    var settings = {
        "url": host+"sesi_siri_penilaian/updateBilCalon",
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
        obj = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
          
      });

}

function updateSenaraiSetSesiPenilaian(form,returnValue){

    var settings = {
        "url": host+"sesi_siri_penilaian/updateSenaraiSet",
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
        obj = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
          
      });

}

function loadSesiPenilaian(id_siri_penilaian,returnValue){

    var settings = {
        "url": host+"sesi_siri_penilaian/list/"+id_siri_penilaian,
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        // "data": form
      };

      var request = $.ajax(settings);

      request.done(function (response) {
        objSesi = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
          
      });

}

function loadSesiPenilaian(id_siri_penilaian,returnValue){

    var settings = {
        "url": host+"sesi_siri_penilaian/list/"+id_siri_penilaian,
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        // "data": form
      };

      var request = $.ajax(settings);

      request.done(function (response) {
        objSesi = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
          
      });

}

function loadSesiPenilaianBySet(id_set,returnValue){

    var settings = {
        "url": host+"sesi_siri_penilaian/listSet/"+id_set,
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        // "data": form
      };

      var request = $.ajax(settings);

      request.done(function (response) {
        objSesi = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
        objSesi = response;

        returnValue();          
      });

}

function loadSesiAll(returnValue){

    var settings = {
        "url": host+"sesi_siri_penilaian/listAll",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        // "data": form
      };

      var request = $.ajax(settings);

      request.done(function (response) {
        objSesi = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
          
      });

}

function loadSesiPenilaianKluster(FK_kluster,returnValue){

    var settings = {
        "url": host+"sesi_siri_penilaian/listKluster/"+FK_kluster,
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        // "data": form
      };

      var request = $.ajax(settings);

      request.done(function (response) {
        objSesi = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
          
      });

}

function loadSesiPenilaianPenyelaras(FK_penyelaras,returnValue){

    var settings = {
        "url": host+"sesi_siri_penilaian/listPenyelaras/"+FK_penyelaras,
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        // "data": form
      };

      var request = $.ajax(settings);

      request.done(function (response) {
        objSesi = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
          
      });

}

function loadSesiPenilaianUrusetia(FK_users,returnValue){

    var settings = {
        "url": host+"sesi_siri_penilaian/listUrusetia/"+FK_users,
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        // "data": form
      };

      var request = $.ajax(settings);

      request.done(function (response) {
        objSesi = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
          
      });

}

function list_allSoalan(form,token,returnValue){
    var settings = {
        "url": host+"sirisoalan/listAllSoalan",
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

function list_allJawapan(form,token,returnValue){
    var settings = {
        "url": host+"calon_jawapan/listAllJawapan",
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

    let request = $.ajax(settings);
    request.done(function (response) {
        // let obj = JSON.parse(response);
        obj_Jawapan = JSON.parse(response);

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"data siri soalan Error","data":""};
        obj_Jawapan = response;

        returnValue();
    });     
}

function loadContentSesi(id_sesi_siri_penilaian,returnValue){

    var form = new FormData();
    form.append("id_sesi_siri_penilaian", id_sesi_siri_penilaian);

    var settings = {
        "url": host+"sesi_siri_penilaian/view",
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
        objSesi = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
          
      });

}

function uptSesiSiriPenilaian(form,returnValue){
    var settings = {
        "url": host+"sesi_siri_penilaian/update",
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
        objUptSesi = JSON.parse(response);

        returnValue();
      });

      request.fail(function (response) {
          
      });

}

function load_penyelaras(token,FK_kluster,returnValue){
    var settings = {
        "url": host+"capaianListByPeranan/"+capaian[2],
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": token
        },
      };
      var request = $.ajax(settings);

      request.done(function (response) {
        objPenyelaras = response;

        returnValue();
      });

      request.fail(function (response) {
          swal({
              title: "Sila Daftar Peranan Pegawai Penyelaras Penilaian di Bahagian Peranan & Capaian",
              // text: "Berjaya Kemaskini Profile!",
              type: "error",
              showConfirmButton: false,
              allowOutsideClick: false,
              html: false,
              timer: 2000
          }).then(function(){},
              function (dismiss) {
                  if (dismiss === 'timer') {
                        window.sessionStorage.child = "15aaa21373a7090f86dcd348a755b94c";
                        checkAuthentication(window.sessionStorage.child);
                  }
              }
          );
      });
}

function show_setSoalan(form,token,returnValue){
    var settings = {
        "url": host+"setsoalan/view",
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
        obj_setSoalan = JSON.parse(response);

        returnValue();
        
    });
    request.fail(function(){
        obj_setSoalan = response;

        returnValue();
    }); 
}

function show_setSoalanKodSet(form,token,returnValue){
    var settings = {
        "url": host+"setsoalan/viewKodSet",
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
        obj_setSoalan = JSON.parse(response);

        returnValue();
        
    });
    request.fail(function(response){
        obj_setSoalan = response;

        returnValue();
    }); 
}

function saveLog(action_made, browser_name){
    var form = new FormData();
    form.append("no_kad_pengenalan", window.localStorage.no_kad_pengenalan);
    form.append("action_made", action_made);
    form.append("browser_name", browser_name);
    var settings = {
        "url": host + "addLogs",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
    };

    $.ajax(settings).done(function (response) {
        loadLog();
        return;
    });    
}

function loadLog(){    
    var form = new FormData();
    form.append("no_kad_pengenalan", window.localStorage.no_kad_pengenalan);
    var settings = {
        "url": host + "logsToday",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
    };

    $.ajax(settings).done(function (response) {
        $("#userLog").html('');
        $.each(response.data, function(i, item){
            $("#userLog").append(
                '<div class="sl-item">'+
                    '<div class="sl-content">'+
                        '<div class="text-muted">'+ formatTime(item.created_at) +'</div>'+
                        '<p><span style="white-space: pre-line;">'+ item.action_made +'</span></p>'+
                    '</div>'+
                '</div>'
                );
        });
        return;
    });    
}

function getBrowser(){
    var browserName = (function (agent) {switch (true) {
            case agent.indexOf("edge") > -1: return "MS Edge";
            case agent.indexOf("edg/") > -1: return "Edge ( chromium based)";
            case agent.indexOf("opr") > -1 && !!window.opr: return "Opera";
            case agent.indexOf("chrome") > -1 && !!window.chrome: return "Chrome";
            case agent.indexOf("trident") > -1: return "MS IE";
            case agent.indexOf("firefox") > -1: return "Mozilla Firefox";
            case agent.indexOf("safari") > -1: return "Safari";
            default: return "other";
        }
    })(window.navigator.userAgent.toLowerCase());
    return browserName;
}

const capaian = ['c4ca4238a0b923820dcc509a6f75849b','c81e728d9d4c2f636f067f89cc14862c','eccbc87e4b5ce2fe28308fd9f2a7baf3','a87ff679a2f3e71d9181a67b7542122c'];
