$(function () {
    $.ajaxSetup({
        cache: false
    });
    $("#aside_nama").html(nama_master);
    $("#aside_gambar_user").html(`<img src="../user/api_penilaian/public/gambar/`+gambar_master+`" alt="User">`);
    switch(sessionStorage.capaian){
        case capaian[0]: $("#aside_nama_peranan").html('Super Admin'); $(".li_superadmin").removeClass('d-none'); break;
        case capaian[1]: $("#aside_nama_peranan").html('Pegawai Tadbir Latihan'); $(".li_superadmin").html(''); break;
        case capaian[2]: $("#aside_nama_peranan").html('Pegawai Penyelaras Penilaian'); $(".li_superadmin").html(''); break;
        case capaian[3]: $("#aside_nama_peranan").html('Urusetia'); $(".li_superadmin").html(''); break;
    }
    
    menusList();
    if (sessionStorage.child == '959cde393ca127ad75c147ec76ac778b' || // pen_list_penilaian
        sessionStorage.child == 'b0f7c80a40e3d2b78df8f0e6c22f31e5' || // pen_list_siri_penilaian
        sessionStorage.child == 'd6f1027b300c5e96f439dabb028385be'    // pen_list_bank_soalan
        ) {
        siriPenilaianMenu();
    }
    if (sessionStorage.child == '3737b150ea9ee0191b5dcc8233bfa472' || // pen_info_siri_penilaian
        sessionStorage.child == 'a9221c9f4f6ef013df3ca90f4344fed8' || // pen_us_siri_penilaian
        sessionStorage.child == '900a5a773ccfab87f28ae75375519def' || // pen_peng_bank_soalan_siri_penilaian
        sessionStorage.child == '0d8c319d8ab7514d356a9b19803f814b' || // pen_peng_set_soalan_siri_penilaian
        sessionStorage.child == '1c2447405f88bd258c2cb49411f8a004' || // pen_muka_depan_siri_penilaian
        sessionStorage.child == 'ed62a3e7209d0b940f0fe6fb113fe869' || // pen_peng_gred_siri_penilaian
        sessionStorage.child == '2f8de4d1869e3f63195f41a3dd8fcd74' || // pen_peng_penilaian_siri_penilaian
        sessionStorage.child == 'e027f055c19e9df17bb1ceb62d06a813' || // pen_permohonan_calon_siri_penilaian
        sessionStorage.child == 'c3c330d6c08168eaf6511a83a7d039bc' || // pen_pantau_penilaian_siri_penilaian
        sessionStorage.child == 'ee6ed0c8d32a8c5f4f97f6538472974d' || // pen_list_keputusan_siri_penilaian
        sessionStorage.child == '38ecb7a826707a7de817034a05683369' || // pen_analisa_jawapan_siri_penilaian
        sessionStorage.child == '89f6e60cc53d69f88d639390730bd210' || // pen_stat_penilaian_siri_penilaian
        sessionStorage.child == 'f4a88cabd646d977ad558b2c22fdaabb' || // pen_dashboard_penilaian_siri_penilaian
        sessionStorage.child == '5143558162aee43811e841e6991f0b3c' || // pen_sah_soalan_siri_penilaian
        sessionStorage.child == '3e34a064e47e11ebb503843a96fa67ba' || // pen_sah_markah_siri_penilaian
        sessionStorage.child == 'f2aba07fdc577fb109ccd5daca8860f2' || // pen_view_markah_set_soalan
        sessionStorage.child == '78797c6eb1602af05f21fe6c7f0dcb11'    // pen_detail_list_keputusan_siri_penilaian
        ) {
            detailSiriPenilaianMenu();
    }
});

$("#aside_pentadbir_sistem").on('click',function () {
    window.sessionStorage.child = "15aaa21373a7090f86dcd348a755b94c";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_aside_pentadbir_sistem").on('click',function () {
    window.sessionStorage.child = "15aaa21373a7090f86dcd348a755b94c";
    checkAuthentication(window.sessionStorage.child);
});

$("#aside_penilaian").on('click',function () {
    window.sessionStorage.child = "959cde393ca127ad75c147ec76ac778b";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_aside_penilaian").on('click',function () {
    window.sessionStorage.child = "959cde393ca127ad75c147ec76ac778b";
    checkAuthentication(window.sessionStorage.child);
});

$("#aside_takwim_penilaian").on('click',function () {
    window.sessionStorage.child = "7a5ffb2b9ccf7b628e51eb4af9bd906d";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_aside_takwim_penilaian").on('click',function () {
    window.sessionStorage.child = "7a5ffb2b9ccf7b628e51eb4af9bd906d";
    checkAuthentication(window.sessionStorage.child);
});

// $("#aside_laporan").on('click',function () {
//     window.sessionStorage.child = "15aaa21373a7090f86dcd348a755b94c";
//     checkAuthentication(window.sessionStorage.child);
// });

$("#aside_profilpengguna").on('click',function () {
    window.sessionStorage.child = "f5fe4ded77b07f4b4e59a73a3e6773a9";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_aside_profilpengguna").on('click',function () {
    window.sessionStorage.child = "f5fe4ded77b07f4b4e59a73a3e6773a9";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_profil").on('click',function () {
    window.sessionStorage.child = "f5fe4ded77b07f4b4e59a73a3e6773a9";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_profil").on('click',function () {
    window.sessionStorage.child = "f5fe4ded77b07f4b4e59a73a3e6773a9";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_ubahkatalaluan").on('click',function () {
    window.sessionStorage.child = "737b73b65079ce305554d84705dbb94b";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_ubahkatalaluan").on('click',function () {
    window.sessionStorage.child = "737b73b65079ce305554d84705dbb94b";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_peranan_capaian").on('click',function () {
    window.sessionStorage.child = "15aaa21373a7090f86dcd348a755b94c";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_peranan_capaian").on('click',function () {
    window.sessionStorage.child = "15aaa21373a7090f86dcd348a755b94c";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_ttpn_sistem").on('click',function () {
    window.sessionStorage.child = "88aac3ae3e2254496e8a8aa496a495bd";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_ttpn_sistem").on('click',function () {
    window.sessionStorage.child = "88aac3ae3e2254496e8a8aa496a495bd";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_ttpn_kategori_penilaian").on('click',function () {
    window.sessionStorage.child = "f144858fdb7c8393aa0ed78f45ed74bb";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_ttpn_kategori_penilaian").on('click',function () {
    window.sessionStorage.child = "f144858fdb7c8393aa0ed78f45ed74bb";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_ttpn_jenis_penilaian").on('click',function () {
    window.sessionStorage.child = "4112c4ae65e4516f85c63d8362f9e683";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_ttpn_jenis_penilaian").on('click',function () {
    window.sessionStorage.child = "4112c4ae65e4516f85c63d8362f9e683";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_ttpn_kategori_urusetia").on('click',function () {
    window.sessionStorage.child = "6dd1c1098339fb5814c61d8d116c2c8e";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_ttpn_kategori_urusetia").on('click',function () {
    window.sessionStorage.child = "6dd1c1098339fb5814c61d8d116c2c8e";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_list_penilaian").on('click',function () {
    window.sessionStorage.child = "959cde393ca127ad75c147ec76ac778b";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_list_penilaian").on('click',function () {
    window.sessionStorage.child = "959cde393ca127ad75c147ec76ac778b";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_list_urusetia").on('click',function () {
    window.sessionStorage.child = "2df36985caa518c69ddfbdc267e02072";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_list_urusetia").on('click',function () {
    window.sessionStorage.child = "2df36985caa518c69ddfbdc267e02072";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_list_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "b0f7c80a40e3d2b78df8f0e6c22f31e5";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_list_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "b0f7c80a40e3d2b78df8f0e6c22f31e5";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_list_bank_soalan").on('click',function () {
    window.sessionStorage.child = "d6f1027b300c5e96f439dabb028385be";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_list_bank_soalan").on('click',function () {
    window.sessionStorage.child = "d6f1027b300c5e96f439dabb028385be";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_info_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "3737b150ea9ee0191b5dcc8233bfa472";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_info_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "3737b150ea9ee0191b5dcc8233bfa472";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_us_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "a9221c9f4f6ef013df3ca90f4344fed8";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_us_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "a9221c9f4f6ef013df3ca90f4344fed8";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_peng_bank_soalan_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "900a5a773ccfab87f28ae75375519def";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_peng_bank_soalan_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "900a5a773ccfab87f28ae75375519def";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_peng_set_soalan_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "0d8c319d8ab7514d356a9b19803f814b";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_peng_set_soalan_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "0d8c319d8ab7514d356a9b19803f814b";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_muka_depan_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "1c2447405f88bd258c2cb49411f8a004";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_muka_depan_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "1c2447405f88bd258c2cb49411f8a004";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_peng_gred_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "ed62a3e7209d0b940f0fe6fb113fe869";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_peng_gred_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "ed62a3e7209d0b940f0fe6fb113fe869";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_peng_penilaian_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "2f8de4d1869e3f63195f41a3dd8fcd74";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_peng_penilaian_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "2f8de4d1869e3f63195f41a3dd8fcd74";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_permohonan_calon_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "e027f055c19e9df17bb1ceb62d06a813";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_permohonan_calon_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "e027f055c19e9df17bb1ceb62d06a813";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_pantau_penilaian_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "c3c330d6c08168eaf6511a83a7d039bc";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_pantau_penilaian_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "c3c330d6c08168eaf6511a83a7d039bc";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_list_keputusan_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "ee6ed0c8d32a8c5f4f97f6538472974d";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_list_keputusan_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "ee6ed0c8d32a8c5f4f97f6538472974d";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_analisa_jawapan_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "38ecb7a826707a7de817034a05683369";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_analisa_jawapan_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "38ecb7a826707a7de817034a05683369";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_stat_penilaian_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "89f6e60cc53d69f88d639390730bd210";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_stat_penilaian_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "89f6e60cc53d69f88d639390730bd210";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_dashboard_penilaian_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "f4a88cabd646d977ad558b2c22fdaabb";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_dashboard_penilaian_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "f4a88cabd646d977ad558b2c22fdaabb";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_sah_soalan_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "5143558162aee43811e841e6991f0b3c";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_sah_soalan_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "5143558162aee43811e841e6991f0b3c";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_sah_markah_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "3e34a064e47e11ebb503843a96fa67ba";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_sah_markah_siri_penilaian").on('click',function () {
    window.sessionStorage.child = "3e34a064e47e11ebb503843a96fa67ba";
    checkAuthentication(window.sessionStorage.child);
});

$("#pen_takwim_penilaian").on('click',function () {
    window.sessionStorage.child = "7a5ffb2b9ccf7b628e51eb4af9bd906d";
    checkAuthentication(window.sessionStorage.child);
});

$("#sm_pen_takwim_penilaian").on('click',function () {
    window.sessionStorage.child = "7a5ffb2b9ccf7b628e51eb4af9bd906d";
    checkAuthentication(window.sessionStorage.child);
});

$("#logKeluar_web").on('click',function () {
    logkeluar();
});