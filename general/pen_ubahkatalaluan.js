$(function () {
    $.ajaxSetup({
        cache: false
    });
    let token = window.localStorage.token;
    users(noic_master,token,function(){
        if(dataUsers.success){
            checkSession();
            $("#leftsidebar").load('../aside/aside_profil.html');
            $("#btnKembali").attr('onclick','kembali2()');
            saveLog("View Page: Profil Pengguna", sessionStorage.browser);
            $('#katalaluansemasa').focus();
        }
        else{
            reject_load();
        }
    }); 
    
});

$('#katalaluansemasa').change(function(){                
    let katalaluan = $("#katalaluansemasa").val();
    let no_kad_pengenalan = noic_master;
    // let katalaluan = $("#katalaluan").val();
    
    var form = new FormData();
    form.append("no_kad_pengenalan", no_kad_pengenalan);
    form.append("katalaluan", katalaluan);

    pen_usersSemakKatalaluan(form,function(){
        if(obj.success){
            $('#formsemasa').removeClass('has-danger').addClass('has-success');
            $('#katalaluansemasamessage').html('Katalaluan Tepat.').removeClass('bg-danger').addClass('bg-success');
            $('#katalaluansemasa').removeClass('form-control-danger').addClass('form-control-success');
        } else {
            $('#formsemasa').addClass('has-danger');
            $('#katalaluansemasamessage').html('Katalaluan Tidak Tepat.').removeClass('bg-success').addClass('bg-danger');
            $('#katalaluansemasa').focus().addClass('form-control-danger');
        }
    });
});

$('#sahkankatalaluan').change(function(){
    if ($('#katalaluanbaharu').val() == $('#sahkankatalaluan').val())   {
        $('#kemaskini').attr('disabled',false);
    } else  {
        swal({
            title: "Ubah Katalaluan",
            text: "Pengesahan katalaluan gagal. ",
            type: "error",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            $('#sahkankatalaluan').focus().addClass('form-control-danger');
        });
    }
});

//FUNCTION UPDATE
var confirmed = false;

$("#updatekatalaluan").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Ubah Katalaluan",
            text: "Anda Pasti Untuk Kemaskini Katalaluan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            let katalaluan = $("#katalaluansemasa").val();
            
            var form = new FormData();
            form.append("no_kad_pengenalan", noic_master);
            form.append("katalaluan", katalaluan);

            pen_usersSemakKatalaluan(form,function(){
                if(obj.success){
                    if ($("#katalaluanbaharu").val() == $("#sahkankatalaluan").val())  {
                        let katalaluanbaharu = $("#katalaluanbaharu").val();
                        // let katalaluan = $("#katalaluan").val();
                        var form = new FormData();
                        form.append("no_kad_pengenalan", noic_master);
                        form.append("katalaluan", katalaluanbaharu);

                        pen_usersResetPassword(form, function(){
                            if(obj.success){
                                swal({
                                    title: "Ubah Katalaluan",
                                    text: "Berjaya! Sila Log Masuk Semula.",
                                    type: "success",
                                    closeOnConfirm: true,
                                    allowOutsideClick: false,
                                    html: false
                                }).then(function(){
                                    saveLog("Logout.", window.sessionStorage.browser);
                                    window.sessionStorage.clear();
                                    window.localStorage.clear();
                                    window.location.replace("../login/"); 
                                });
                            } else {
                                swal({
                                    title: "Ubah Katalaluan",
                                    text: result.message,
                                    type: "error",
                                    closeOnConfirm: true,
                                    allowOutsideClick: false,
                                    html: false
                                }).then(function(){
                                    // window.location.reload();      
                                });
                            }
                        });
                    } else  {
                        swal({
                            title: "Ubah Katalaluan",
                            text: "Maklumat Tidak Sah.",
                            type: "error",
                            closeOnConfirm: true,
                            allowOutsideClick: false,
                            html: false
                        }); 
                    }
                } else {
                    swal({
                        title: "Ubah Katalaluan",
                        text: "Katalaluan Semasa Tidak Tepat",
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function(){
                        $("#katalaluansemasa").focus();
                    });
                }
            });
        });
    }
});

function kembali2(){
    window.sessionStorage.removeItem("child");
    window.location.reload();
}