$(function () {
    $.ajaxSetup({
        cache: false
    });
    let token = window.localStorage.token;
    users(noic_master,token,function(){
        if(dataUsers.success){
            let data = dataUsers.data;
            checkSession();
            $("#leftsidebar").load('../aside/aside_profil.html');
            $("#btnKembali").attr('onclick','kembali2()');
            saveLog("View Page: Profil Pengguna", sessionStorage.browser);
            // $('#katalaluansemasa').focus();
            $('#id_users').val(id_users_master);
            $('#no_kad_pengenalan').val(noic_master);
            $('#emel').val(emel_master);
            $('#notel').val(notel_master);
            $('#emel_kerajaan').val(emel_kerajaan_master);
            $('#notel_kerajaan').val(notel_kerajaan_master);
            $('#nama_jawatan').val(nama_jawatan_master);

            let path = "../../api_penilaian/public/gambar/";
            let gambar = "default.jpg";
            let gambar_default = "default.jpg";
            if(data.gambar != null  && data.gambar != ""){
                gambar = data.gambar;
                gambar_default = data.gambar;
                $('#btn-remove').removeClass('hidden');
                $('#divGambar').html('');
                let append =   `<span class="input-group-text"><i class=" text-muted material-icons">add_a_photo</i></span>
                                <span  id="btn-upload" class="input-group-text input-info-disabled disabled" style="cursor:not-allowed"> 
                                    <a class="text-white " id="url-gambar" >Muat Naik</a> 
                                </span>
                                <span class='input-group-text' style='cursor:not-allowed;'>`+path+gambar_default+`</span>
                                <span id='btn-remove' onclick='removeGambar();' class='input-danger btn-danger input-group-text' style='cursor:pointer'>
                                    <i class=' text-white material-icons'>delete_forever</i>
                                </span>`;
                $('#divGambar').append(append);
            }

            $("#gambar_original").attr("src", path+gambar);
        }
        else{
            reject_load();
        }
    }); 
    
});

//FUNCTION UPDATE
var confirmed = false;

$("#updateprofil").on('submit', function (e) {
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        let id_users = $("#id_users").val();
        let emel = $("#emel").val();
        let notel = $("#notel").val();
        let emel_kerajaan = $("#emel_kerajaan").val();
        let notel_kerajaan = $("#notel_kerajaan").val();
        let gambar = $("#gambar")[0].files[0];
        // let nama_jawatan = $("#nama_jawatan").val();
        // let FK_kementerian = $('#FK_kementerian').val();
        // let FK_agensi = $('#FK_agensi').val();

        var form = new FormData();

        form.append("id_users", id_users);
        form.append("emel", emel);
        form.append("notel", notel);
        form.append("emel_kerajaan", emel_kerajaan);
        form.append("notel_kerajaan", notel_kerajaan);
        form.append("gambar", gambar);
        // form.append("nama_jawatan", nama_jawatan);
        // form.append("FK_kementerian", FK_kementerian);
        // form.append("FK_agensi", FK_agensi);
        form.append("updated_by",id_users);

        pen_usersEditProfile(form, function(){
            if(obj.success){
                swal({
                    title: "Edit Profile",
                    text: "Berjaya Kemaskini Profile!",
                    type: "success",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    html: false,
                    timer: 1000
                }).then(function(){},
                    function (dismiss) {
                        if (dismiss === 'timer') {
                            window.location.reload();
                        }
                    }
                );
            } else {
                swal({
                    title: "Edit Profile",
                    text: "Gagal Kemaskini Profile!",
                    type: "error",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    html: false,
                    timer: 1000
                }).then(function(){},
                    function (dismiss) {
                        if (dismiss === 'timer') {
                            window.location.reload();
                        }
                    }
                );
            }
        });
    }
});

$("#gambar").change(function(event) {

    if($("#gambar").val() != null || $("#gambar").val() != ""){
        
        $('#btn-upload').css('cursor','not-allowed').removeClass('input-info btn-info').removeAttr("onclick").addClass('input-info-disabled disabled');
        $("#url_gambar").removeAttr('href');
        $("#divGambar").append("<span class='input-group-text'>"+$("#gambar").val().split('\\').pop()+"</span><span id='btn-remove' onclick='removeGambar();' class='input-danger btn-danger input-group-text' style='cursor:pointer'><i class=' text-white material-icons'>delete_forever</i></span>");
        
        var reader = new FileReader();

        reader.onload = function (e)
        {

            $('#gambar_original').attr('src', e.target.result);
        }

        reader.readAsDataURL(this.files[0]);

    }

});

$("#btn-remove").click(function () {    
    removeGambar();
});

function removeGambar(){
    let path = "../../api_penilaian/public/gambar";
    let img = "default.jpg";
    let append = '<span class="input-group-text"><i class=" text-muted material-icons">add_a_photo</i></span><span  id="btn-upload" onclick="triggerGambar();" class="input-group-text input-info btn-info" style="cursor:pointer"> <a class="text-white " >Muat Naik</a> </span>';

    $('#gambar_original').attr('src',path+img);
    $('#gambar').val(null);
    $('#btn-remove').addClass('hidden');
    $('#divGambar').html(append);
}

$("#btn-upload").on("click", function(){
    triggerGambar();
});

function triggerGambar(){
    $("#gambar").trigger("click");
}

function kembali2(){
    window.sessionStorage.removeItem("child");
    window.location.reload();
}