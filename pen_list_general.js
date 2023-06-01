function list_fk_kampus(process,data){

    var settings = {
        "url": host+"fasiliti_kampus/list",
        "method": "GET",
        "timeout": 0,
        "headers":{
            "Authorization": "fasiliti "+window.localStorage.token
        }
    };
    
    $.ajax(settings).done(function (response) {
        
        $('#'+process+'fk_kampus').empty();
        $('#'+process+'fk_kampus').append('<option>- Pilih Kampus -</option>');
        $.each(response.data, function (i, item) {

            if(data == item.id_kampus){
                $('#'+process+'fk_kampus').append($('<option>', { 
                    value: item.id_kampus,
                    text : item.nama_kampus
                }).attr('selected',true));
            }else{
                $('#'+process+'fk_kampus').append($('<option>', { 
                    value: item.id_kampus,
                    text : item.nama_kampus
                }));
            }
            

            // if(data != '' && data != null) $('#'+process+'fk_kampus').prop('selected','selected');
            
        });
        
    });
}

function list_item_ict(upt, FK_agensi){
    var form = new FormData();
    form.append("FK_peranan", window.sessionStorage.FK_peranan);
    if (FK_agensi != '' && FK_agensi != null)   {
        form.append("FK_agensi", FK_agensi);
    } else{
        form.append("FK_agensi", window.sessionStorage.FK_agensi);
    }
    
    var settings = {
        "url": host + "daftar/fasiliti_item/list",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": "fasiliti " + window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
    };
    
    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#'+upt+'itemICT').empty();
        $('#'+upt+'itemICT').append('<option value="">- Pilih Item ICT -</option>');
        $.each(response.data, function (i, item) {
            if(item.flag_jenis_peralatan == 1){
                $('#'+upt+'itemICT').append($('<option>', { 
                    value: item.nama_peralatan,
                    text : item.nama_peralatan
                }));
            }                
        });            
     });
}

function list_item_bukan_ict(upt, FK_agensi){
    var form = new FormData();
    form.append("FK_peranan", window.sessionStorage.FK_peranan);
    if (FK_agensi != '' && FK_agensi != null)   {
        form.append("FK_agensi", FK_agensi);
    } else{
        form.append("FK_agensi", window.sessionStorage.FK_agensi);
    }
    
    var settings = {
        "url": host + "daftar/fasiliti_item/list",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": "fasiliti " + window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
    };
    
    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#'+upt+'itemxICT').empty();
        $('#'+upt+'itemxICT').append('<option value="">- Pilih Item Bukan ICT -</option>');
        $.each(response.data, function (i, item) {
            if(item.flag_jenis_peralatan == 2){
                $('#'+upt+'itemxICT').append($('<option>', { 
                    value: item.nama_peralatan,
                    text : item.nama_peralatan
                }));
            }            
        });        
     });
}

function list_item_skn(upt, FK_agensi){
    var form = new FormData();
    form.append("FK_peranan", window.sessionStorage.FK_peranan);
    if (FK_agensi != '' && FK_agensi != null)   {
        form.append("FK_agensi", FK_agensi);
    } else{
        form.append("FK_agensi", window.sessionStorage.FK_agensi);
    }
    
    var settings = {
        "url": host + "tetapan_kemudahansukan/list",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": "fasiliti " + window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
    };
    
    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#'+upt+'itemSukan').empty();
        $('#'+upt+'itemSukan').append('<option value="">- Pilih Item Sukan -</option>');
        $.each(response.data, function (i, item) {
            $('#'+upt+'itemSukan').append($('<option>', { 
                value: item.item,
                text : item.item
            }));
            
    });
            
     });
}

function list_jenis_kdn(process,data,FK_agensi){
    var form = new FormData();
    form.append("FK_peranan", window.sessionStorage.FK_peranan);
    if (FK_agensi != '' && FK_agensi != null)   {
        form.append("FK_agensi", FK_agensi);
    } else{
        form.append("FK_agensi", window.sessionStorage.FK_agensi);
    }

    var settings = {
        "url": host+"daftar/fasiliti_jenis_kenderaan/list",
        "method": "POST",
        "timeout": 0,
        "headers":{
            "Authorization": "fasiliti "+window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
      };
    
        $.ajax(settings).done(function (response) {
            //LIST OPTION
            $('#'+process+'jenis').empty();
            $('#'+process+'jenis').append('<option>- Pilih Model -</option>');
            $.each(response.data, function (i, item) {
                if(data == item.jenis){
                    $('#'+process+'jenis').append($('<option>', { 
                        value: item.id_fas_jenis_kdn,
                        text : item.jenis
                    }).attr('selected',true));
                }else{
                    $('#'+process+'jenis').append($('<option>', { 
                        value: item.id_fas_jenis_kdn,
                        text : item.jenis
                    }));
                }              
            });
            
     });
}

function list_jenis_kdn_by_jenama(process,data,FK_jenama,FK_agensi){
    var form = new FormData();
    form.append("FK_jenama", FK_jenama);
    form.append("FK_peranan", window.sessionStorage.FK_peranan);
    if (FK_agensi != '' && FK_agensi != null)   {
        form.append("FK_agensi", FK_agensi);
    } else{
        form.append("FK_agensi", window.sessionStorage.FK_agensi);
    }

    var settings = {
        "url": host+"daftar/fasiliti_jenis_kenderaan/listByJenama",
        "method": "POST",
        "timeout": 0,
        "headers":{
            "Authorization": "fasiliti "+window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
    };
    
    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#'+process+'jenis').empty();
        $('#'+process+'jenis').append('<option>- Pilih Model -</option>');
        $.each(response.data, function (i, item) {
            if(data == item.jenis){
                $('#'+process+'jenis').append($('<option>', { 
                    value: item.id_fas_jenis_kdn,
                    text : item.jenis
                }).attr('selected',true));
            }else{
                $('#'+process+'jenis').append($('<option>', { 
                    value: item.id_fas_jenis_kdn,
                    text : item.jenis
                }));
            }              
        });
        
    });
}

function list_model_kdn(process,data,FK_agensi){
    var form = new FormData();
    form.append("FK_peranan", window.sessionStorage.FK_peranan);
    if (FK_agensi != '' && FK_agensi != null)   {
        form.append("FK_agensi", FK_agensi);
    } else{
        form.append("FK_agensi", window.sessionStorage.FK_agensi);
    }

    var settings = {
        "url": host+"daftar/fasiliti_model_kenderaan/list",
        "method": "POST",
        "timeout": 0,
        "headers":{
            "Authorization": "fasiliti "+window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
    };
    
    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#'+process+'model').empty();
        $('#'+process+'model').append('<option>- Pilih Jenis -</option>');
        $('#'+process+'FK_model').empty();
        $('#'+process+'FK_model').append('<option>- Pilih Jenis -</option>');
        $.each(response.data, function (i, item) {
            if(data == item.model){
                $('#'+process+'model').append($('<option>', { 
                    value: item.id_fas_model_kdn,
                    text : item.model
                }).attr('selected',true));
                $('#'+process+'FK_model').append($('<option>', { 
                    value: item.id_fas_model_kdn,
                    text : item.model
                }).attr('selected',true));
            }else{
                $('#'+process+'model').append($('<option>', { 
                    value: item.id_fas_model_kdn,
                    text : item.model
                }));
                $('#'+process+'FK_model').append($('<option>', { 
                    value: item.id_fas_model_kdn,
                    text : item.model
                }));
            }              
        });
            
     });
}

function list_jenama_kdn(process,data, FK_agensi){
    var form = new FormData();
    form.append("FK_peranan", window.sessionStorage.FK_peranan);
    if (FK_agensi != '' && FK_agensi != null)   {
        form.append("FK_agensi", FK_agensi);
    } else{
        form.append("FK_agensi", window.sessionStorage.FK_agensi);
    }

    var settings = {
        "url": host+"daftar/fasiliti_jenama_kenderaan/list",
        "method": "POST",
        "timeout": 0,
        "headers":{
            "Authorization": "fasiliti "+window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
    };
    
    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#'+process+'jenama').empty();
        $('#'+process+'jenama').append('<option>- Pilih Jenama -</option>');
        $('#'+process+'FK_jenama').empty();
        $('#'+process+'FK_jenama').append('<option>- Pilih Jenama -</option>');
        $.each(response.data, function (i, item) {
            if(data == item.jenama){
                $('#'+process+'jenama').append($('<option>', { 
                    value: item.id_fas_jenama_kdn,
                    text : item.jenama
                }).attr('selected',true));
                $('#'+process+'FK_jenama').append($('<option>', { 
                    value: item.id_fas_jenama_kdn,
                    text : item.jenama
                }).attr('selected',true));
            }else{
                $('#'+process+'jenama').append($('<option>', { 
                    value: item.id_fas_jenama_kdn,
                    text : item.jenama
                }));
                $('#'+process+'FK_jenama').append($('<option>', { 
                    value: item.id_fas_jenama_kdn,
                    text : item.jenama
                }));
            }              
        });
            
     });
}

function list_warna_kdn(process,data, FK_agensi){
    var form = new FormData();
    form.append("FK_peranan", window.sessionStorage.FK_peranan);
    if (FK_agensi != '' && FK_agensi != null)   {
        form.append("FK_agensi", FK_agensi);
    } else{
        form.append("FK_agensi", window.sessionStorage.FK_agensi);
    }
    // console.log(data)
    var settings = {
        "url": host+"daftar/fasiliti_warna_kenderaan/list",
        "method": "POST",
        "timeout": 0,
        "headers":{
            "Authorization": "fasiliti "+window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
    };
    
    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#'+process+'warna').empty();
        $('#'+process+'warna').append('<option>- Pilih Warna -</option>');
        $.each(response.data, function (i, item) {
            if(data == item.warna){
                $('#'+process+'warna').append($('<option>', { 
                    value: item.id_fas_warna_kdn,
                    text : item.warna
                }).attr('selected',true));
            }else{
                $('#'+process+'warna').append($('<option>', { 
                    value: item.id_fas_warna_kdn,
                    text : item.warna
                }));
            }
        });
            
     });
}

function list_jenis_bilik_asrama(process,data, FK_agensi){
    var form = new FormData();
    form.append("FK_peranan", window.sessionStorage.FK_peranan);
    if (FK_agensi != '' && FK_agensi != null)   {
        form.append("FK_agensi", FK_agensi);
    } else{
        form.append("FK_agensi", window.sessionStorage.FK_agensi);
    }
    var settings = {
        "url": host+"daftar/jenis_bilik_asrama/list",
        "method": "POST",
        "timeout": 0,
        "headers":{
            "Authorization": "fasiliti "+window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
    };
    
    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#'+process+'FK_jenis_bilik_asrama').empty();
        $('#'+process+'FK_jenis_bilik_asrama').append('<option>- Pilih Jenis Bilik -</option>');
        $.each(response.data, function (i, item) {
            if(data == item.id_jenis_bilik_asrama){
                $('#'+process+'FK_jenis_bilik_asrama').append($('<option>', { 
                    value: item.id_jenis_bilik_asrama,
                    text : item.jenis_bilik_asrama
                }).attr('selected',true));
            }else{
                $('#'+process+'FK_jenis_bilik_asrama').append($('<option>', { 
                    value: item.id_jenis_bilik_asrama,
                    text : item.jenis_bilik_asrama
                }));
            }
        });
            
     });
}

function list_level(process,data,FK_asrama){
    var form = new FormData();
    form.append("id",FK_asrama);

    var settings = {
        "url": host + "daftar/fasiliti_asrama/view",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": "fasiliti " + window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    }
    // console.log(settings)
    $.ajax(settings).done(function (response) {
        let obj = JSON.parse(response);
        // console.log(JSON.parse(obj.data.bil_level));
        $('#'+process+'level').empty();
        $('#'+process+'level').append('<option>- Pilih Aras -</option>');
        $.each(JSON.parse(obj.data.bil_level),function(i, item){
            if(item.bil_level == data){
                $('#'+process+'level').append($('<option>', { 
                    value: item.bil_level,
                    text : item.bil_level
                }).attr('selected',true));
            }else{
                $('#'+process+'level').append($('<option>', { 
                    value: item.bil_level,
                    text : item.bil_level
                }));
            }
        });    
     });
}

function list_status(process,data){
    var settings = {
        "url": host+"tetapan_status/list",
        "method": "GET",
        "timeout": 0,
        "headers":{
            "Authorization": "fasiliti "+window.localStorage.token
        }
    };
    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#'+process+'status').empty();
        $('#'+process+'status').append('<option>- Pilih Status -</option>');
        $.each(response.data, function (i, item) {
            if(data == item.id_fas_status){
                $('#'+process+'status').append($('<option>', { 
                    value: item.id_fas_status,
                    text : item.status
                }).attr('selected',true));
            }else{
                $('#'+process+'status').append($('<option>', { 
                    value: item.id_fas_status,
                    text : item.status
                }));
            }
        });
            
     });
}

function list_status_tempahan(process,colName,data){
    
    var settings = {
        "url": host+"tetapan_status_tempahan/list",
        "method": "GET",
        "timeout": 0,
        "headers":{
            "Authorization": "fasiliti "+window.localStorage.token
        }
    };
    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#'+process+colName).empty();
        $('#'+process+colName).append('<option>- Pilih Status Pengesahan -</option>');
        $.each(response.data, function (i, item) {
            if(data == item.id_fas_status_temp){
                $('#'+process+colName).append($('<option>', { 
                    value: item.id_fas_status_temp,
                    text : item.status
                }).attr('selected',true));
            }else{
                $('#'+process+colName).append($('<option>', { 
                    value: item.id_fas_status_temp,
                    text : item.status
                }));
            }
        });
            
     });
}

// AMRI 
function list_pic(process,data){
    var settings = {
        "url": host+"usersList",
        "method": "GET",
        "timeout": 0,
        "headers":{
            "Authorization": "fasiliti "+window.localStorage.token
        }
    };
    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#'+process+'nama_pic').empty();
        // $('#'+process+'nama_pic').append('<option>- Pilih Status -</option>');
        $.each(response.data, function (i, item) {
            if(data == item.no_kad_pengenalan){
                $('#'+process+'nama_pics').append($('<option>', { 
                    value: item.no_kad_pengenalan,
                    text : item.nama
                }).attr('selected',true));
            }else{
                $('#'+process+'nama_pics').append($('<option>', { 
                    value: item.no_kad_pengenalan,
                    text : item.nama
                }));
            }
        });
            
     });
}

//MIMI 28062022
function list_pemandu_kdn(process,data, FK_agensi){
    var form = new FormData();
    form.append("FK_peranan", window.sessionStorage.FK_peranan);
    if (FK_agensi != '' && FK_agensi != null)   {
        form.append("FK_agensi", FK_agensi);
    } else{
        form.append("FK_agensi", window.sessionStorage.FK_agensi);
    }

    var settings = {
        "url": host+"daftar/fasiliti_pemandu_kenderaan/list",
        "method": "POST",
        "timeout": 0,
        "headers":{
            "Authorization": "fasiliti "+window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
    };
    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#'+process+'nama_pemandu_kdn').empty();
        // $('#'+process+'nama_pic').append('<option>- Pilih Status -</option>');
        $.each(response.data, function (i, item) {
            if(data == item.no_kad_pengenalan){
                $('#'+process+'list_nama_pemandu_kdn').append($('<option>', { 
                    value: item.no_kad_pengenalan,
                    text : item.nama
                }).attr('selected',true));
            }else{
                $('#'+process+'list_nama_pemandu_kdn').append($('<option>', { 
                    value: item.no_kad_pengenalan,
                    text : item.nama
                }));
            }
        });
            
    });

}

function list_kdn(process,data, FK_agensi){
    var form = new FormData();
    form.append("FK_peranan", window.sessionStorage.FK_peranan);
    if (FK_agensi != '' && FK_agensi != null)   {
        form.append("FK_agensi", FK_agensi);
    } else{
        form.append("FK_agensi", window.sessionStorage.FK_agensi);
    }

    var settings = {
        "url": host+"daftar/fasiliti_kenderaan/list",
        "method": "POST",
        "timeout": 0,
        "headers":{
            "Authorization": "fasiliti "+window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
    };
    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#'+process+'nama_fas_kdn').empty();
        $('#'+process+'details_kdn').empty();
        $.each(response.data, function (i, item) {
            if(data == item.jenama){
                $('#'+process+'list_fas_kdn').append($('<option>', { 
                    value: item.id_fas_kdn,
                    text : item.jenama
                }).attr('selected',true));
            }else{
                $('#'+process+'list_fas_kdn').append($('<option>', { 
                    value: item.id_fas_kdn,
                    text : item.jenama
                }));
            }
        });
            
    });

}

function list_jenis_soalan(process,data){
    var form = new FormData();
    // form.append("",);
    // form.append("",);
    var settings = {
        "url": host+"borang/jenis_soalan_penilaian_fasiliti/list",
        "method": "GET",
        "timeout": 0,
        "headers":{
            "Authorization": "fasiliti "+window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
    };
    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#'+process+'jenis_soalan').empty();
        $('#'+process+'jenis_soalan').append('<option value="">-PILIH JENIS SOALAN-</option>');
        $.each(response.data, function (i, item) {
            if(data == item.id_jenis_soalan){
                $('#'+process+'jenis_soalan').append($('<option>', { 
                    value: item.id_jenis_soalan,
                    text : item.jenis
                }).attr('selected',true));
            }else{
                $('#'+process+'jenis_soalan').append($('<option>', { 
                    value: item.id_jenis_soalan,
                    text : item.jenis
                }));
            }
        });
            
    });
}

function list_program(process,data){
    var form = new FormData();
    // form.append("FK_peranan", window.sessionStorage.FK_peranan);
    form.append("FK_agensi", window.sessionStorage.FK_agensi);
    
    var settings = {
        "url": host+"tempahan/fasiliti/list",
        "method": "POST",
        "timeout": 0,
        "headers":{
            "Authorization": "fasiliti "+window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
    };
    $.ajax(settings).done(function (response) {
        
        //LIST OPTION
        $('#'+process+'nama_program').empty();
        // $('#'+process+'nama_pic').append('<option>- Pilih Status -</option>');
        $.each(response.data, function (i, item) {
            // console.log(item.nama_program);
            if(data == item.id_tem_fas){
                $('#'+process+'list_program').append($('<option>', { 
                    value: item.nama_program,
                    text : item.nama_program
                }).attr('selected',true));
            }else{
                $('#'+process+'list_program').append($('<option>', { 
                    value: item.nama_program,
                    text : item.nama_program
                }));
            }
        });
            
    });

}

function list_agensi(process,data){
    var form = new FormData();
    form.append("FK_peranan",1);
    // form.append("",);
    var settings = {
        "url": host+"agensisList",
        "method": "POST",
        "timeout": 0,
        "headers":{
            "Authorization": "fasiliti "+window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
    };
    $.ajax(settings).done(function (response) {
        // console.log(response);
        //LIST OPTION
        $('#'+process+'FK_agensi').empty();
        $('#'+process+'FK_agensi').append('<option value="">-PILIH AGENSI-</option>');
        $.each(response.data, function (i, item) {
            
            if(data == item.id_agensi){
                $('#'+process+'list_fk_agensi').append($('<option>', { 
                    value: item.id_agensi,
                    text : item.nama_agensi
                }).attr('selected',true));
            }else{
                $('#'+process+'list_fk_agensi').append($('<option>', { 
                    value: item.id_agensi,
                    text : item.nama_agensi
                }));
            }
        });
            
    });
}

function list_asrama(process,colName,data){

    var form = new FormData();
    form.append("FK_peranan", window.sessionStorage.FK_peranan);
    form.append("FK_agensi", window.sessionStorage.FK_agensi);

    var settings = {
        "url": host+"daftar/fasiliti_asrama/list",
        "method": "POST",
        "timeout": 0,
        "headers":{
            "Authorization": "fasiliti "+window.localStorage.token
        },
        "processData": false,
        "contentType": false,
        "data": form
    };
    $.ajax(settings).done(function (response) {

        $('#'+process+colName).empty();
        $('#'+process+colName).append('<option>- Pilih Asrama -</option>');
        $.each(response.data, function (i, item) {
            if(data == item.id_fas){
                // if(flag == 1){
                    $('#'+process+colName).append($('<option>', { 
                        value: item.id_fas,
                        text : item.nama_fas
                    }).attr('selected',true));
                // }else{
                //     $('#'+process+colName).append($('<option>', { 
                //         value: item.id_fas,
                //         text : item.nama_fas
                //     }).attr('selected',true));
                // }

                getListBilik(data);
            }else{
                $('#'+process+colName).append($('<option>', { 
                    value: item.id_fas,
                    text : item.nama_fas
                }));
            }
        });

        if(data !='' && data != null){
            $('#'+process+colName).attr('disabled','disabled');
        }

    });

}

function list_bilik_asrama(list_selected){

    $('#id_fas_bilik_asrama').empty();
    $('#id_fas_bilik_asrama').append('<option>- Pilih Bilik Asrama -</option>');
    $.each(list_selected, function (i, item){

        $('#id_fas_bilik_asrama').append($('<option>', { 
            value: item.id_fas,
            text : item.nama_fas
        }));

    })
}