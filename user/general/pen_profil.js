$(function () {
    $.ajaxSetup({
        cache: false
    });
    let token = window.localStorage.token;
    if(token == null){
        window.location.replace('login/');
    }
    else{
        let noic = window.localStorage.no_kad_pengenalan;
        // alert(token);
        users(noic,token,function(){
            if(dataUsers.success){
                let data = dataUsers.data;
                nama = data.nama;
                id_users_master = data.id_users;
                nama_master = data.nama;
                emel_master = data.emel;
                noic_master = data.no_kad_pengenalan;
                notel_master = data.notel;
                FK_jenis_pengguna_master = data.FK_jenis_pengguna;
                FK_taraf_jawatan_master = data.taraf_jawatan;
                FK_gelaran_master = data.FK_gelaran;
                emel_kerajaan_master = data.emel_kerajaan;
                notel_kerajaan_master = data.notel_kerajaan;
                nama_jawatan_master = data.nama_jawatan;
                users_intan_master = data.users_intan;
                FK_kampus_master = data.FK_kampus;
                FK_kluster_master = data.FK_kluster;
                FK_kementerian_master = data.FK_kementerian;
                FK_agensi_master = data.FK_agensi;
                nama_majikan_master = data.nama_majikan;
                alamat_majikan_master = data.alamat_majikan;
                notel_majikan_master = data.notel_majikan;
                emel_majikan_master = data.emel_majikan;
                nama_ketua_jabatan_master = data.nama_ketua_jabatan;
                notel_ketua_jabatan_master = data.notel_ketua_jabatan;
                emel_ketua_jabatan_master = data.emel_ketua_jabatan;
                jawatan_ketua_jabatan_master = data.jawatan_ketua_jabatan;
                nama_agensi_master = data.nama_agensi;
                nama_kluster_master = data.nama_kluster;
                updated_at = data.updated_at;
                $('#id_users').val(id_users_master);
                $('#no_kad_pengenalan').val(noic_master);
                $('#emel').val(emel_master);
                $('#notel').val(notel_master);
                $('#emel_kerajaan').val(emel_kerajaan_master);
                $('#notel_kerajaan').val(notel_kerajaan_master);
                $('#nama_jawatan').val(nama_jawatan_master);
                if(data.gambar != null){
                    $("#gambar_original").attr('src', host+'gambar/'+data.gambar)
                }
                $("#text_nama_pengguna").html(nama + `<i class="zmdi zmdi-chevron-down"></i>`);
                $("#text_nama_agensi").html(nama_agensi_master);
                loads_others();
            }
            else{
                reject_load();
            }
        });
    }
});
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