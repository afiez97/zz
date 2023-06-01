$(function () {
    $.ajaxSetup({
        cache: false
    });
    $.each(capaian, function(i, item){
        if(item == sessionStorage.capaian){
            
        }
    });
    let token = window.localStorage.token;
    if(token == null){
        window.location.replace('login/');
    }
    else{
        let noic = window.localStorage.no_kad_pengenalan;
        
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
                $("#text_nama_pengguna").html(nama + `<i class="zmdi zmdi-chevron-down"></i>`);
                $("#text_nama_agensi").html(nama_agensi_master);
                loads_keputusan_penilaian();
                // loads_others();
            }
            else{
                reject_load();
            }
        });
    }
});

function loads_keputusan_penilaian(){
    var form = new FormData();
    form.append("no_kad_pengenalan", window.localStorage.no_kad_pengenalan);
    listKeputusanByKP(form, function(){
        var list = [];
        let bil = 1;
        var columns = [
            { "name": "bil", "title": "Bil" },
            { "name": "penilaian", "title": "Nama & Siri Penilaian"},
            { "name": "tarikh_penilaian", "title": "Tarikh Penilaian", "breakpoints": "md sm xs" },
            { "name": "peratus_set", "title": "Keputusan", "breakpoints": "md sm xs" },
            { "name": "peratus_siri", "title": "Gred", "breakpoints": "md sm xs" },
            { "name": "no_angka_giliran", "title": "No. Angka Giliran", "breakpoints": "md sm xs" },
            { "name": "btn_tindakan", "title": "Tindakan", "breakpoints": "md sm xs" },
        ];
        if(obj.success){
            console.log(obj.data);
            $.each(obj.data, function (i, field) {
                // let status_permohonan;
                list.push({
                    bil: bil++, 
                    id_calon_soalan: field.id_calon_soalan, 
                    penilaian: `<span style='white-space: pre-line;'>`+ field.kod_siri_penilaian + ` - ` + field.nama_penilaian +`</span>`, 
                    tarikh_penilaian: formatDate(field.tarikh_penilaian), 
                    peratus_set: field.peratus_set, 
                    peratus_siri: field.peratus_siri, 
                    no_angka_giliran: field.no_angka_giliran, 
                    btn_tindakan: `<button class="btn btn-primary btn-sm" id="btnKeputusan" onclick="detail(`+field.id_calon_soalan+`,`+field.FK_siri_penilaian+`)">SEMAK</button>`, 
                });
            });
            $("#listKeputusanPenilaian").html("");
            // console.log(list);
            $("#listKeputusanPenilaian").footable({
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
        }
    });
}

function detail(id,FK_siri_penilaian){  
    sessionStorage.id_calon_soalan = id;
    sessionStorage.id_siri_penilaian = FK_siri_penilaian;

    // alert(id);
    window.sessionStorage.child = "5ee13046d0591561c213851e76ef731e";
    checkAuthentication(window.sessionStorage.child);
    

}