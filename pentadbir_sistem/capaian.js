switch(sessionStorage.capaian) {
    case capaian[0]   : $("#li-pengguna").removeClass('hidden');
                        $("#superadmin").removeClass('hidden').addClass('active');
                        $("#dataSuperAdmin").removeClass('hidden').addClass('active');
                        $("#ptlatihan").removeClass('hidden');
                        $("#pppenilaian").removeClass('hidden');
                        // $("#dataPTLatihan").removeClass('hidden');
                        $("#pengguna").removeClass('hidden');
                        $("#dataPengguna").removeClass('hidden');
                        $("#li-Daftar").removeClass('hidden');
                        $("#textDaftar").html("Super Admin");
                        $("#tab-daftar").attr('onclick',"daftar('1','SuperAdmin')");
                        break;
    case capaian[1]   : $("#ptlatihan").addClass('hidden');
                        $("#pppenilaian").removeClass('hidden').addClass('active');
                        $("#dataPPPenilaian").addClass('hidden').addClass('active');
                        $("#dataPTLatihan").addClass('hidden');
                        $("#pppenilaian").removeClass('hidden');
                        $("#dataPPPenilaian").removeClass('hidden');
                        $("#li-Daftar").removeClass('hidden');
                        $("#textDaftar").html("Pegawai Penyelaras Penilaian");
                        $("#tab-daftar").attr('onclick',"daftar('3','PPPenilaian')");
                        break;
    case capaian[2]   : $("#pppenilaian").removeClass('hidden');
                        $("#dataPPPenilaian").removeClass('hidden');
                        break;
}