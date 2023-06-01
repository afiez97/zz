

if(window.location.hostname == "localhost"){
    var host = 'http://'+window.location.hostname+'/penilaian/user/api_penilaian/public/';
    var local = 'http://'+window.location.hostname+'/penialaian/user/';
} 
  else if (window.location.hostname == 'www.epenilaian.intan.my'){
    var host = 'http://'+window.location.hostname+'/api_penilaian/public/';
    var local = 'http://'+window.location.hostname+'/';
} 
  else if (window.location.hostname == 'admin.epenilaian.intan.my'){
    var host = 'http://'+window.location.hostname+'/user/api_penilaian/public/';
    var local = 'http://'+window.location.hostname+'/user/';
} 
  else { //PROTIGATECH
    var host = 'https://'+window.location.hostname+'/user/api_penilaian/public/';
    var local = 'https://'+window.location.hostname+'/user/';
}

var id_users_master,nama_master,email_master,noic_master,notel_master,FK_jenis_pengguna_master,skim_master,FK_taraf_jawatan_master,FK_gelaran_master,emel_kerajaan_master,notel_kerajaan_master,nama_jawatan_master,users_intan_master,FK_kampus_master,FK_kluster_master,FK_kementerian_master,FK_agensi_master,nama_majikan_master,alamat_majikan_master,notel_majikan_master,emel_majikan_master,nama_ketua_jabatan_master,notel_ketua_jabatan_master,emel_ketua_jabatan_master,jawatan_ketua_jabatan_master,nama_agensi_master,nama_kluster_master,id_penyelaras_master,token;
let range_count = 0;
var arr_listMenuDetailSiriPenilaian = ["pen_info_siri_penilaian", "pen_us_siri_penilaian", "pen_muka_depan_siri_penilaian", "pen_peng_gred_siri_penilaian", "pen_peng_penilaian_siri_penilaian", "pen_permohonan_calon_siri_penilaian", "pen_pantau_penilaian_siri_penilaian", "pen_list_keputusan_siri_penilaian", "pen_peng_bank_soalan_siri_penilaian", "pen_peng_set_soalan_siri_penilaian", "pen_analisa_jawapan_siri_penilaian", "pen_stat_penilaian_siri_penilaian", "pen_dashboard_penilaian_siri_penilaian", "pen_sah_soalan_siri_penilaian", "pen_sah_markah_siri_penilaian", "pen_list_urusetia", "pen_list_soalan", "pen_list_bank_soalan"];
const char = ['A','B','C','D','E','F','G','H','I','J','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
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

function usersPenilaian(noic,isp,token,returnValue){

    var settings = {
      "url": host + "calonSoalanGetIc/"+noic+"/"+isp,
      "method": "GET",
      "timeout": 0,
      "headers": {
        "AuthorizationExam": window.localStorage.token
      }
    };

    var request = $.ajax(settings);

    request.done(function (response) {
        window.localStorage.token = response.token;
        dataUsers = response;
        returnValue();
    });

    request.fail(function(response, textStatus){
        console.log(response);
        reject_load();
    });
}

function uptUsersKerajaan(form,returnValue){

    var settings = {
        "url": host + "usersUpdateKerajaan",
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
        dataUsers = JSON.parse(response);
        // window.localStorage.token = dataUsers.token;
        returnValue();
    });

    request.fail(function(response, textStatus){
        reject_load();
    });
}

function uptUsersSwasta(form,returnValue){

    var settings = {
        "url": host + "usersUpdateSwasta",
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
        dataUsers = JSON.parse(response);
        // window.localStorage.token = dataUsers.token;
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
            if (item.FK_parent == "0") {
                $('#' + item.idmenu).html(item.icon + '<span>' + item.menu + '</span>');
            } else {
                $('#' + item.idmenu).html(item.icon + '<span>' + item.menu + '</span>');
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

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    // console.log(nStr);

    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [day, month, year].join('-');
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
        cancelButtonText: "Tidak",
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

function logkeluarPenilaian(){
    // window.sessionStorage.clear();
    // window.localStorage.clear();
    window.location.replace("../finish/");
    // window.location.reload();
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
            // checkContent(child);
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
        content != 'c3c330d6c08168eaf6511a83a7d039bc' && // pen_pantau_penilaian_siri_penilaian
        content != 'ee6ed0c8d32a8c5f4f97f6538472974d' && // pen_list_keputusan_siri_penilaian
        content != '38ecb7a826707a7de817034a05683369' && // pen_analisa_jawapan_siri_penilaian
        content != '89f6e60cc53d69f88d639390730bd210' && // pen_stat_penilaian_siri_penilaian
        content != 'f4a88cabd646d977ad558b2c22fdaabb' && // pen_dashboard_penilaian_siri_penilaian
        content != '5143558162aee43811e841e6991f0b3c' && // pen_sah_soalan_siri_penilaian
        content != '3e34a064e47e11ebb503843a96fa67ba'    // pen_sah_markah_siri_penilaian
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
            $('#displaycontent').load("../" + result.parent + "/" + result.child + '.html');
        }
    });
}

function auth_RegUser(form, returnValue){        
    var settings = {
        "url": host + "addUsersSiteAwam",
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
        // console.log(response);
        obj = JSON.parse(response);
        returnValue();
    });

    request.fail(function (response){
        obj = response;
        returnValue();
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
        token = objAddCapaian.token;
        returnValue();
    });

    request.fail(function (response){
        objAddCapaian = response;
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

function jenispenggunalist(returnValue) {

    var settings = {
        "url": host + "jenispenggunasList",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        }
    };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        obj = response;
        returnValue();
    });
    // END Dropdown Agensi List
}

function tarafjawatanlist(returnValue) {

    var settings = {
        "url": host + "tarafjawatansList",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        }
    };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        obj = response;
        returnValue();
    });
    // END Dropdown Agensi List
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
        obj = response;
        returnValue();
    });
    // END Dropdown Agensi List
}

function skimList(returnValue) {
    //Dropdown Skim List
    var settings = {
        "url": host + "skimsList",
        "method": "GET",
        "timeout": 0
    };

    $.ajax(settings).done(function (response) {
        obj = response;
        returnValue();
    });
    // END Dropdown Skim List   
}

function gredList(returnValue) {
    //Dropdown Gred List
    var settings = {
        "url": host + "gredsList",
        "method": "GET",
        "timeout": 0
    };

    $.ajax(settings).done(function (response) {
        obj = response;
        returnValue();
    });
    // END Dropdown Gred List
}

function kategoriperkhidmatanList(returnValue) {
    //Dropdown Kategori Perkhidmatan List
    var settings = {
        "url": host + "kategoriperkhidmatansList",
        "method": "GET",
        "timeout": 0
    };
    $.ajax(settings).done(function (response) {
        obj = response;
        returnValue();
    });
    // END Dropdown Kategori Perkhidmatan List
}

function kat_agensiList(returnValue) {
    var settings = {
        "url": host + "katAgensisList",
        "method": "GET",
        "timeout": 0
    };
    $.ajax(settings).done(function (response) {
        // console.log(response)
        obj = response;
        returnValue();
    });
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
        $('#kerajaan_FK_kementerian').empty();
        $('#kerajaan_FK_kementerian').append($('<option>', {
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
                $('#kerajaan_FK_kementerian').append($('<option>', {
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
                $('#kerajaan_FK_kementerian').append($('<option>', {
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
        $('#kerajaan_FK_agensi').empty();
        $('#kerajaan_FK_agensi').append($('<option>', {
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
                $('#kerajaan_FK_agensi').append($('<option>', {
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
                $('#kerajaan_FK_agensi').append($('<option>', {
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

function check_users(noic, returnValue) {
    var form = new FormData();
    form.append("no_kad_pengenalan", noic);

    var settings = {
        "url": host + "users",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": "media " + window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };
    $.ajax(settings).done(function (response) {
        obj_users = response;
        returnValue();

    });
}

function check_hrmis(noic, returnValue) {
    var settings = {
        "url": "https://admin.dtims.intan.my/api/hrmis/check/"+noic,
        // "url": "http://'+window.location.hostname+'/admin/" + noic + ".json",
        // "url": "http://10.1.3.152/ezxs_webservice/index.php?ic="+noic,
        "method": "GET",
        "timeout": 0,
        // "headers": {
        //     "Authorization": "media " + window.localStorage.token
        // },
    };
    $.ajax(settings).done(function (response) {
        obj_hrmis = JSON.parse(response);
        // obj_hrmis = response;

        returnValue();
    });
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
        obj = JSON.parse(response);

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

function pen_sesi_siri_penilaianlistByTarikhMohonOpen(returnValue){
    var settings = {
        "url": host+"sesi_siri_penilaian/listByTarikhMohonOpen",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": window.localStorage.token
        },
    };
    var request = $.ajax(settings);

    request.done(function (response) {
        obj = response;

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

function pen_calon_soalanshowByFK_sesi(form,returnValue){
    var settings = {
        "url": host+"calon_soalan/showBySesi",
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

    request.fail(function (response) {
        obj= response;

        returnValue();
    });
}

function pen_permohonan_penilaianshowByFK_sesi(form,returnValue){
    var settings = {
        "url": host+"permohonan_penilaian/showBySesi",
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

    request.fail(function (response) {
        obj= response;

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
            console.log(item)
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

function regPermohonanPenilaian(form, returnValue){    
    var settings = {
        "url": host + "permohonan_penilaian/register",
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
        // window.localStorage.token = obj.token;
        returnValue();
    });

    request.fail(function(response){
        obj = response;
        returnValue();
    });  
}

function listPermohonanByKP(form, returnValue){    
    var settings = {
        "url": host + "permohonan_penilaian/listByKP",
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

function listKeputusanByKP(form, returnValue){    
    var settings = {
        "url": host + "calon_soalan/keputusanListByKP",
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

function detailKeputusanByIdCalon(form, returnValue){    
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
        obj = JSON.parse(response);

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"data siri soalan Error","data":""};
        obj = response;

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

// function list_allJawapanNoSiriPenilaian(form,token,returnValue){
//     var settings = {
//         "url": host+"calon_jawapan/listAllJawapanNoSiriPenilaian",
//         "method": "POST",
//         "timeout": 0,
//         "headers": {
//           "Authorization": token
//         },
//         "processData": false,
//         "mimeType": "multipart/form-data",
//         "contentType": false,
//         "data": form
//     };

//     let request = $.ajax(settings);
//     request.done(function (response) {
//         // let obj = JSON.parse(response);
//         obj_Jawapan = JSON.parse(response);

//         returnValue();
        
//     });
//     request.fail(function(){
//         response = {"success":false,"message":"data siri soalan Error","data":""};
//         obj_Jawapan = response;

//         returnValue();
//     });     
// }

function loads_others(){
    jenispenggunalist(function(){
        result = obj;
        $("#FK_jenis_pengguna").html('<option value="">Pilih Jenis Perkhidmatan</option>');
        $("#upt_FK_jenis_pengguna").html('<option value="">Pilih Jenis Perkhidmatan</option>');
        $("#kerajaan_FK_jenis_pengguna").html('<option value="">Pilih Jenis Perkhidmatan</option>');
        $("#swasta_FK_jenis_pengguna").html('<option value="">Pilih Jenis Perkhidmatan</option>');
        $.each(result.data, function(i, item){      
            $("#FK_jenis_pengguna").append('<option value="'+item.id_jenispengguna+'">'+item.jenis_pengguna+'</option>');
            $("#upt_FK_jenis_pengguna").append('<option value="'+item.id_jenispengguna+'">'+item.jenis_pengguna+'</option>');
            $("#kerajaan_FK_jenis_pengguna").append('<option value="'+item.id_jenispengguna+'">'+item.jenis_pengguna+'</option>');
            $("#swasta_FK_jenis_pengguna").append('<option value="'+item.id_jenispengguna+'">'+item.jenis_pengguna+'</option>');
        });
    });
    tarafjawatanlist(function(){
        result = obj;
        $("#FK_taraf_jawatan").html('<option value="">Pilih Taraf Perjawatan</option>');
        $("#upt_FK_taraf_jawatan").html('<option value="">Pilih Taraf Perjawatan</option>');
        $("#kerajaan_FK_taraf_jawatan").html('<option value="">Pilih Taraf Perjawatan</option>');
        $("#swasta_FK_taraf_jawatan").html('<option value="">Pilih Taraf Perjawatan</option>');
        $.each(result.data, function(i, item){      
            $("#FK_taraf_jawatan").append('<option value="'+item.id_tarafjawatan+'">'+item.nama_tarafjawatan+'</option>');
            $("#upt_FK_taraf_jawatan").append('<option value="'+item.id_tarafjawatan+'">'+item.nama_tarafjawatan+'</option>');
            $("#kerajaan_FK_taraf_jawatan").append('<option value="'+item.id_tarafjawatan+'">'+item.nama_tarafjawatan+'</option>');
            $("#swasta_FK_taraf_jawatan").append('<option value="'+item.id_tarafjawatan+'">'+item.nama_tarafjawatan+'</option>');
        });
    });
    gelaranlist(function(){
        result = obj;
        $("#FK_gelaran").html('<option value="">Pilih Gelaran</option>');
        $("#upt_FK_gelaran").html('<option value="">Pilih Gelaran</option>');
        $("#kerajaan_FK_gelaran").html('<option value="">Pilih Gelaran</option>');
        $("#swasta_FK_gelaran").html('<option value="">Pilih Gelaran</option>');
        $.each(result.data, function(i, item){      
            $("#FK_gelaran").append('<option value="'+item.id_gelaran+'">'+item.nama_gelaran+'</option>');
            $("#upt_FK_gelaran").append('<option value="'+item.id_gelaran+'">'+item.nama_gelaran+'</option>');
            $("#kerajaan_FK_gelaran").append('<option value="'+item.id_gelaran+'">'+item.nama_gelaran+'</option>');
            $("#swasta_FK_gelaran").append('<option value="'+item.id_gelaran+'">'+item.nama_gelaran+'</option>');
        });
    });    
    kat_agensiList(function(){
        result = obj;
        $("#FK_kategoriperkhidmatan").html('<option value="">Pilih kategoriperkhidmatan</option>');
        $("#upt_FK_kategoriperkhidmatan").html('<option value="">Pilih kategoriperkhidmatan</option>');
        $("#kerajaan_FK_kategoriperkhidmatan").html('<option value="">Pilih kategoriperkhidmatan</option>');
        $("#swasta_FK_kategoriperkhidmatan").html('<option value="">Pilih kategoriperkhidmatan</option>');
        $.each(result.data, function(i, item){      
            $("#FK_kategoriperkhidmatan").append('<option value="'+item.id_kategoriperkhidmatan+'">'+item.nama_kategoriperkhidmatan+'</option>');
            $("#upt_FK_kategoriperkhidmatan").append('<option value="'+item.id_kategoriperkhidmatan+'">'+item.nama_kategoriperkhidmatan+'</option>');
            $("#kerajaan_FK_kategoriperkhidmatan").append('<option value="'+item.id_kategoriperkhidmatan+'">'+item.nama_kategoriperkhidmatan+'</option>');
            $("#swasta_FK_kategoriperkhidmatan").append('<option value="'+item.id_kategoriperkhidmatan+'">'+item.nama_kategoriperkhidmatan+'</option>');
        });
    });    
    kementerianlist();
    agensilist();    
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
