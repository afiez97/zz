$(function () {
    $.ajaxSetup({
        cache: false
    });
    $.each(capaian, function(i, item){
        if(item == sessionStorage.capaian){
            
        }
    });
    // menusList();
    $.fn.select2.defaults.set( "theme", "bootstrap" );
    $.fn.modal.Constructor.prototype.enforceFocus = function() {};
    let token = window.localStorage.token;
    if(token == null){
        window.location.replace('../login/');
    }
    else{
        let noic = window.localStorage.no_kad_pengenalan;
        // alert(token);
        users(noic,token,function(){
            if(dataUsers.success){
                let data = dataUsers.data;
                // window.localStorage.token = dataUsers.token;
                nama = data.nama;
                nama_master = data.nama;
                emel_master = data.emel;
                notel_master = data.notel;
                emel_kerajaan_master = data.emel_kerajaan;
                notel_kerajaan_master = data.notel_kerajaan;
                nama_jawatan_master = data.nama_jawatan;
                id_users_master = data.id_users;
                noic_master = data.no_kad_pengenalan;
                nama_agensi_master = data.nama_agensi;
                nama_kluster_master = data.nama_kluster;
                FK_agensi_master = data.FK_agensi;
                FK_kluster_master = data.FK_kluster;
                // jenis_pengesahan = data.statusrekod;
                if(data.gambar != null){
                    gambar_master = data.gambar;
                } else {
                    gambar_master = "default.jpg";
                }
                updated_at = data.updated_at;
    
                if (path != null)    {
                    switch(window.sessionStorage.capaian){
                        case capaian[0]:    if (path != 'super') 
                                                reject_load();
                                            else if (sessionStorage.child == null)  {
                                                $("#leftsidebar").load('../aside/aside_dashboard_super.html');
                                                saveLog("Logged In As: Super Admin", sessionStorage.browser);
                                                pen_penilaianCountSiriPenilaian(function(){
                                                    result = objPenilaian;
                                                    let listpenilaian;
                                                    let total = 0;
                                                    if(result.success){
                                                        $.each(result.data, function(i, item){
                                                            total += item.total;
                                                            if(result.data.length == (i+1)){
                                                                listpenilaian = `<div class="col-lg-3 col-md-4 col-6">
                                                                                    <div class="card info-box-2 hover-zoom-effect">
                                                                                        <h5 class="mt-3 mb-3">JUMLAH PENILAIAN BERDAFTAR</h5>
                                                                                        <div class="content">
                                                                                            <div class="number">`+ total +`</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>`;
                                                                $("#listpenilaian").append(listpenilaian);
                                                                loadSesiAll(function(){
                                                                    let jsonPenilaianDashboard = [];
                                                                    // let first = 0;
                                                                    $.each(objSesi.data, function(i, item){
                                                                        if(jsonPenilaianDashboard.length == 0){
                                                                            jsonPenilaianDashboard.push({
                                                                                nama_penilaian: item.nama_penilaian,
                                                                                siri_penilaian: item.FK_siri_penilaian,
                                                                                tarikh_mula: item.tarikh_mula,
                                                                                tarikh_tamat: item.tarikh_tamat,
                                                                                masa_mula: item.masa_mula,
                                                                                masa_tamat: item.masa_tamat
                                                                            });
                                                                        } else {
                                                                            if(item.FK_siri_penilaian == jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].siri_penilaian){
                                                                                if(item.tarikh_mula < jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].tarikh_mula){
                                                                                    jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].tarikh_mula = item.tarikh_mula;
                                                                                    jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].masa_mula = item.masa_mula;
                                                                                }
                                                                                if(item.tarikh_tamat > jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].tarikh_tamat){
                                                                                    jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].tarikh_tamat = item.tarikh_tamat;
                                                                                    jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].masa_tamat = item.masa_tamat;
                                                                                }
                                                                            } else {
                                                                                jsonPenilaianDashboard.push({
                                                                                    nama_penilaian: item.nama_penilaian,
                                                                                    siri_penilaian: item.FK_siri_penilaian,
                                                                                    tarikh_mula: item.tarikh_mula,
                                                                                    tarikh_tamat: item.tarikh_tamat,
                                                                                    masa_mula: item.masa_mula,
                                                                                    masa_tamat: item.masa_tamat
                                                                                });
                                                                            }
                                                                        }
                                                                    });
                                                                    let done = 0, ongoing = 0;
                                                                    $.each(jsonPenilaianDashboard, function(i, item){
                                                                        if(new Date() > new Date(item.tarikh_tamat + " " + item.masa_tamat)){
                                                                            done++;
                                                                        } else if (new Date() >= new Date(item.tarikh_mula + " " + item.masa_mula) && new Date() <= new Date(item.tarikh_tamat + " " + item.masa_tamat)){
                                                                            ongoing++;
                                                                        }
                                                                    });
                                                                    $("#listpenilaian").append(`
                                                                                    <div class="col-lg-3 col-md-4 col-6">
                                                                                        <div class="card info-box-2 hover-zoom-effect" style="background-color: #76e3b8">
                                                                                            <h5 class="mt-3 mb-3">SELESAI</h5>
                                                                                            <div class="content">
                                                                                                <div class="number">`+ done +`</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    `);
                                                                    $("#listpenilaian").append(`
                                                                                    <div class="col-lg-3 col-md-4 col-6">
                                                                                        <div class="card info-box-2 hover-zoom-effect" style="background-color: #fcc8d4">
                                                                                            <h5 class="mt-3 mb-3">SEDANG BERLANGSUNG</h5>
                                                                                            <div class="content">
                                                                                                <div class="number">`+ ongoing +`</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    `);
                                                                    $("#listpenilaian").append(`
                                                                                    <div class="col-lg-3 col-md-4 col-6">
                                                                                        <div class="card info-box-2 hover-zoom-effect" style="background-color: #f8fcc8">
                                                                                            <h5 class="mt-3 mb-3">AKAN DATANG</h5>
                                                                                            <div class="content">
                                                                                                <div class="number">`+ (total - (done+ongoing)) +`</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    `);
                                                                });
                                                                load_pie_chart();
                                                                pen_logCountUserAktif();
                                                            }
                                                        });
                                                    } else {
                                                        listpenilaian = `<div class="col-lg-3 col-md-4 col-6">
                                                                            <div class="card info-box-2 hover-zoom-effect">
                                                                                <h5 class="mt-3 mb-3">JUMLAH PENILAIAN BERDAFTAR</h5>
                                                                                <div class="content">
                                                                                    <div class="number">`+ total +`</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>`;
                                                        $("#listpenilaian").append(listpenilaian);
                                                    }
                                                });
                                            }
                                            break;
                        case capaian[1]:    if (path != 'ptl') 
                                                reject_load();
                                            else if (sessionStorage.child == null)  {
                                                $("#leftsidebar").load('../aside/aside_dashboard_ptl.html');
                                                saveLog("Logged In As: Pegawai Tadbir Latihan", sessionStorage.browser);
                                                var form = new FormData();
                                                form.append("FK_kluster", FK_kluster_master);
                                                pen_penilaianCountSiriPenilaianByKluster(form, function(){
                                                    result = JSON.parse(objPenilaian);
                                                    let listpenilaian;
                                                    let total = 0;
                                                    if(result.success){
                                                        $.each(result.data, function(i, item){                                                        
                                                            total += item.total;
                                                            if(result.data.length == (i+1)){
                                                                loadSesiPenilaianKluster(FK_kluster_master,function(){
                                                                    let jsonPenilaianDashboard = [];
                                                                    // let first = 0;
                                                                    $.each(objSesi.data, function(i, item){
                                                                        if(jsonPenilaianDashboard.length == 0){
                                                                            jsonPenilaianDashboard.push({
                                                                                nama_penilaian: item.nama_penilaian,
                                                                                siri_penilaian: item.FK_siri_penilaian,
                                                                                tarikh_mula: item.tarikh_mula,
                                                                                tarikh_tamat: item.tarikh_tamat,
                                                                                masa_mula: item.masa_mula,
                                                                                masa_tamat: item.masa_tamat
                                                                            });
                                                                        } else {
                                                                            if(item.FK_siri_penilaian == jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].siri_penilaian){
                                                                                if(item.tarikh_mula < jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].tarikh_mula){
                                                                                    jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].tarikh_mula = item.tarikh_mula;
                                                                                    jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].masa_mula = item.masa_mula;
                                                                                }
                                                                                if(item.tarikh_tamat > jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].tarikh_tamat){
                                                                                    jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].tarikh_tamat = item.tarikh_tamat;
                                                                                    jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].masa_tamat = item.masa_tamat;
                                                                                }
                                                                            } else {
                                                                                jsonPenilaianDashboard.push({
                                                                                    nama_penilaian: item.nama_penilaian,
                                                                                    siri_penilaian: item.FK_siri_penilaian,
                                                                                    tarikh_mula: item.tarikh_mula,
                                                                                    tarikh_tamat: item.tarikh_tamat,
                                                                                    masa_mula: item.masa_mula,
                                                                                    masa_tamat: item.masa_tamat
                                                                                });
                                                                            }
                                                                        }
                                                                    });
                                                                    let done = 0, ongoing = 0, comingsoon = 0;
                                                                    $.each(jsonPenilaianDashboard, function(i, item){
                                                                        if(new Date() > new Date(item.tarikh_tamat + " " + item.masa_tamat)){
                                                                            done++;
                                                                        } else if (new Date() >= new Date(item.tarikh_mula + " " + item.masa_mula) && new Date() <= new Date(item.tarikh_tamat + " " + item.masa_tamat)){
                                                                            ongoing++;
                                                                        } else {
                                                                            comingsoon++;
                                                                        }
                                                                    });
                                                                    $("#listpenilaian").append(`
                                                                                    <div class="col-lg-3 col-md-4 col-6">
                                                                                        <div class="card info-box-2 hover-zoom-effect" style="background-color: #76e3b8">
                                                                                            <h5 class="mt-3 mb-3">SELESAI</h5>
                                                                                            <div class="content">
                                                                                                <div class="number">`+ done +`</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    `);
                                                                    $("#listpenilaian").append(`
                                                                                    <div class="col-lg-3 col-md-4 col-6">
                                                                                        <div class="card info-box-2 hover-zoom-effect" style="background-color: #fcc8d4">
                                                                                            <h5 class="mt-3 mb-3">SEDANG BERLANGSUNG</h5>
                                                                                            <div class="content">
                                                                                                <div class="number">`+ ongoing +`</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    `);
                                                                    $("#listpenilaian").append(`
                                                                                    <div class="col-lg-3 col-md-4 col-6">
                                                                                        <div class="card info-box-2 hover-zoom-effect" style="background-color: #f8fcc8">
                                                                                            <h5 class="mt-3 mb-3">AKAN DATANG</h5>
                                                                                            <div class="content">
                                                                                                <div class="number">`+ (total - (done+ongoing)) +`</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    `);
                                                                });
                                                                load_pie_chart();
                                                                pen_logCountUserAktif();
                                                            }
                                                        });
                                                    } else {
                                                        listpenilaian = `<div class="col-lg-3 col-md-4 col-6">
                                                                            <div class="card info-box-2 hover-zoom-effect">
                                                                                <h5 class="mt-3 mb-3">JUMLAH PENILAIAN BERDAFTAR</h5>
                                                                                <div class="content">
                                                                                    <div class="number">`+ total +`</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>`;
                                                        $("#listpenilaian").append(listpenilaian);
                                                    }
                                                });
                                            }
                                            break;
                        case capaian[2]:    if (path != 'ppp') 
                                                reject_load();
                                            else if (sessionStorage.child == null)  {
                                                $("#leftsidebar").load('../aside/aside_dashboard_ppp.html');
                                                saveLog("Logged In As: Pegawai Penyelaras Penilaian", sessionStorage.browser);
                                                var form = new FormData();
                                                form.append("created_by", id_users_master);
                                                pen_penilaianCountSiriPenilaianByPenyelaras(form, function(){
                                                    result = JSON.parse(objPenilaian);
                                                    let listpenilaian;
                                                    let total = 0;
                                                    if(result.success){
                                                        $.each(result.data, function(i, item){
                                                            total += item.total;
                                                            if(result.data.length == (i+1)){
                                                                listpenilaian = `<div class="col-lg-3 col-md-4 col-6">
                                                                                    <div class="card info-box-2 hover-zoom-effect">
                                                                                        <h5 class="mt-3 mb-3">JUMLAH PENILAIAN BERDAFTAR</h5>
                                                                                        <div class="content">
                                                                                            <div class="number">`+ total +`</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>`;
                                                                $("#listpenilaian").append(listpenilaian);
                                                                loadSesiPenilaianPenyelaras(id_users_master,function(){
                                                                    let jsonPenilaianDashboard = [];
                                                                    // let first = 0;
                                                                    $.each(objSesi.data, function(i, item){
                                                                        if(jsonPenilaianDashboard.length == 0){
                                                                            jsonPenilaianDashboard.push({
                                                                                nama_penilaian: item.nama_penilaian,
                                                                                siri_penilaian: item.FK_siri_penilaian,
                                                                                tarikh_mula: item.tarikh_mula,
                                                                                tarikh_tamat: item.tarikh_tamat,
                                                                                masa_mula: item.masa_mula,
                                                                                masa_tamat: item.masa_tamat
                                                                            });
                                                                        } else {
                                                                            if(item.FK_siri_penilaian == jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].siri_penilaian){
                                                                                if(item.tarikh_mula < jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].tarikh_mula){
                                                                                    jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].tarikh_mula = item.tarikh_mula;
                                                                                    jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].masa_mula = item.masa_mula;
                                                                                }
                                                                                if(item.tarikh_tamat > jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].tarikh_tamat){
                                                                                    jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].tarikh_tamat = item.tarikh_tamat;
                                                                                    jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].masa_tamat = item.masa_tamat;
                                                                                }
                                                                            } else {
                                                                                jsonPenilaianDashboard.push({
                                                                                    nama_penilaian: item.nama_penilaian,
                                                                                    siri_penilaian: item.FK_siri_penilaian,
                                                                                    tarikh_mula: item.tarikh_mula,
                                                                                    tarikh_tamat: item.tarikh_tamat,
                                                                                    masa_mula: item.masa_mula,
                                                                                    masa_tamat: item.masa_tamat
                                                                                });
                                                                            }
                                                                        }
                                                                    });
                                                                    let done = 0, ongoing = 0, comingsoon = 0;
                                                                    $.each(jsonPenilaianDashboard, function(i, item){
                                                                        if(new Date() > new Date(item.tarikh_tamat + " " + item.masa_tamat)){
                                                                            done++;
                                                                        } else if (new Date() >= new Date(item.tarikh_mula + " " + item.masa_mula) && new Date() <= new Date(item.tarikh_tamat + " " + item.masa_tamat)){
                                                                            ongoing++;
                                                                        } else {
                                                                            comingsoon++;
                                                                        }
                                                                    });
                                                                    $("#listpenilaian").append(`
                                                                                    <div class="col-lg-3 col-md-4 col-6">
                                                                                        <div class="card info-box-2 hover-zoom-effect" style="background-color: #76e3b8">
                                                                                            <h5 class="mt-3 mb-3">SELESAI</h5>
                                                                                            <div class="content">
                                                                                                <div class="number">`+ done +`</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    `);
                                                                    $("#listpenilaian").append(`
                                                                                    <div class="col-lg-3 col-md-4 col-6">
                                                                                        <div class="card info-box-2 hover-zoom-effect" style="background-color: #fcc8d4">
                                                                                            <h5 class="mt-3 mb-3">SEDANG BERLANGSUNG</h5>
                                                                                            <div class="content">
                                                                                                <div class="number">`+ ongoing +`</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    `);
                                                                    $("#listpenilaian").append(`
                                                                                    <div class="col-lg-3 col-md-4 col-6">
                                                                                        <div class="card info-box-2 hover-zoom-effect" style="background-color: #f8fcc8">
                                                                                            <h5 class="mt-3 mb-3">AKAN DATANG</h5>
                                                                                            <div class="content">
                                                                                                <div class="number">`+ (total - (done+ongoing)) +`</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    `);
                                                                });
                                                                load_pie_chart();
                                                                pen_logCountUserAktif();
                                                            }
                                                        });
                                                    } else {
                                                        listpenilaian = `<div class="col-lg-3 col-md-4 col-6">
                                                                            <div class="card info-box-2 hover-zoom-effect">
                                                                                <h5 class="mt-3 mb-3">JUMLAH PENILAIAN BERDAFTAR</h5>
                                                                                <div class="content">
                                                                                    <div class="number">`+ total +`</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>`;
                                                        $("#listpenilaian").append(listpenilaian);
                                                    }
                                                });
                                            }
                                            break;
                        case capaian[3]:    if (path != 'us') 
                                                reject_load();
                                            else if (sessionStorage.child == null)  {
                                                $("#leftsidebar").load('../aside/aside_dashboard_us.html');
                                                saveLog("Logged In As: Urusetia", sessionStorage.browser);
                                                var form = new FormData();
                                                form.append("FK_users", id_users_master);
                                                pen_urusetiaListSiriPenilaian(form, function(){
                                                    result = JSON.parse(objSiriPenilaian);
                                                    let listpenilaian;
                                                    let total = 0;
                                                    $.each(result.data, function(i, item){
                                                        total++;
                                                        let urusetia = "", jk_penggubal = "", jk_penilai = "", panel_penilai = "";
                                                        if(item.urusetia == 1)
                                                            urusetia = `<span class="badge badge-success">Urusetia</span> `;
                                                        if(item.jk_penggubal == 1)
                                                            jk_penggubal = `<span class="badge badge-info">Jawatankuasa Penggubal</span> `;
                                                        if(item.jk_penilai == 1)
                                                            jk_penilai = `<span class="badge badge-warning">Jawatankuasa Penilai</span> `;
                                                        if(item.panel_penilai == 1)
                                                            panel_penilai = `<span class="badge badge-danger">Panel Penilai</span> `;
                                                        listpenilaian = `<div class="col-lg-6 col-md-6 col-6">
                                                                            <div class="card info-box-2 hover-zoom-effect" onclick="sp_details(`+ item.id_penilaian +`, `+ item.id_siri_penilaian +`)">
                                                                                <h6 class="mt-3 mb-3">`+ item.nama_penilaian +`</h6>
                                                                                <div class="content">
                                                                                    <div class="text mt-0 mb-3">`+ item.kod_siri_penilaian +`</div>
                                                                                    <div>`+ urusetia + jk_penggubal + jk_penilai + panel_penilai +`</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>`;
                                                        $("#listpenilaian").append(listpenilaian);
                                                        if(result.data.length == (i+1)){
                                                            listpenilaian = `<div class="col-lg-3 col-md-4 col-6">
                                                                                <div class="card info-box-2 hover-zoom-effect">
                                                                                    <h5 class="mt-3 mb-3">JUMLAH PENILAIAN BERDAFTAR</h5>
                                                                                    <div class="content">
                                                                                        <div class="number">`+ total +`</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>`;
                                                            $("#listpenilaian2").append(listpenilaian);
                                                            loadSesiPenilaianUrusetia(id_users_master, function(){
                                                                let jsonPenilaianDashboard = [];
                                                                // let first = 0;
                                                                $.each(objSesi.data, function(i, item){
                                                                    if(jsonPenilaianDashboard.length == 0){
                                                                        jsonPenilaianDashboard.push({
                                                                            nama_penilaian: item.nama_penilaian,
                                                                            siri_penilaian: item.FK_siri_penilaian,
                                                                            tarikh_mula: item.tarikh_mula,
                                                                            tarikh_tamat: item.tarikh_tamat,
                                                                            masa_mula: item.masa_mula,
                                                                            masa_tamat: item.masa_tamat
                                                                        });
                                                                    } else {
                                                                        if(item.FK_siri_penilaian == jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].siri_penilaian){
                                                                            if(item.tarikh_mula < jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].tarikh_mula){
                                                                                jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].tarikh_mula = item.tarikh_mula;
                                                                                jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].masa_mula = item.masa_mula;
                                                                            }
                                                                            if(item.tarikh_tamat > jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].tarikh_tamat){
                                                                                jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].tarikh_tamat = item.tarikh_tamat;
                                                                                jsonPenilaianDashboard[jsonPenilaianDashboard.length - 1].masa_tamat = item.masa_tamat;
                                                                            }
                                                                        } else {
                                                                            jsonPenilaianDashboard.push({
                                                                                nama_penilaian: item.nama_penilaian,
                                                                                siri_penilaian: item.FK_siri_penilaian,
                                                                                tarikh_mula: item.tarikh_mula,
                                                                                tarikh_tamat: item.tarikh_tamat,
                                                                                masa_mula: item.masa_mula,
                                                                                masa_tamat: item.masa_tamat
                                                                            });
                                                                        }
                                                                    }
                                                                });
                                                                let done = 0, ongoing = 0, comingsoon = 0;
                                                                $.each(jsonPenilaianDashboard, function(i, item){
                                                                    if(new Date() > new Date(item.tarikh_tamat + " " + item.masa_tamat)){
                                                                        done++;
                                                                    } else if (new Date() >= new Date(item.tarikh_mula + " " + item.masa_mula) && new Date() <= new Date(item.tarikh_tamat + " " + item.masa_tamat)){
                                                                        ongoing++;
                                                                    } else {
                                                                        comingsoon++;
                                                                    }
                                                                });
                                                                $("#listpenilaian2").append(`
                                                                                <div class="col-lg-3 col-md-4 col-6">
                                                                                    <div class="card info-box-2 hover-zoom-effect" style="background-color: #76e3b8">
                                                                                        <h5 class="mt-3 mb-3">SELESAI</h5>
                                                                                        <div class="content">
                                                                                            <div class="number">`+ done +`</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                `);
                                                                $("#listpenilaian2").append(`
                                                                                <div class="col-lg-3 col-md-4 col-6">
                                                                                    <div class="card info-box-2 hover-zoom-effect" style="background-color: #fcc8d4">
                                                                                        <h5 class="mt-3 mb-3">SEDANG BERLANGSUNG</h5>
                                                                                        <div class="content">
                                                                                            <div class="number">`+ ongoing +`</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                `);
                                                                $("#listpenilaian2").append(`
                                                                                <div class="col-lg-3 col-md-4 col-6">
                                                                                    <div class="card info-box-2 hover-zoom-effect" style="background-color: #f8fcc8">
                                                                                        <h5 class="mt-3 mb-3">AKAN DATANG</h5>
                                                                                        <div class="content">
                                                                                            <div class="number">`+ (total - (done+ongoing)) +`</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                `);
                                                            })
                                                            load_pie_chart();
                                                            pen_logCountUserAktif();
                                                        }
                                                    });
                                                });
                                            }
                                            break;
                    }
                }
                
                $("#text_nama_pengguna").html(nama + '<span class="caret"></span>');
                $("#text_nama_agensi").html(nama_agensi_master);
                $("#aside_gambar_user").html(`<img src="../../api_penilaian/public/gambar/`+gambar_master+`" alt="User">`);

                loadsSideCapaian();
    
                let child = "";
                if (window.sessionStorage.capaian){
                    child = window.sessionStorage.child;
                }
                checkAuthentication(child);
            }
            else{
                reject_load();
            }
        });
        checkCapaian(sessionStorage.capaian,token,function(){
            if(!dataCapaian.success){
                reject_load();
            }
        });
    }
});

$(document).ready(function(){
    
});

$("#dashboard").on('click',function () {
    window.sessionStorage.removeItem("child");
    window.location.reload();
});

$("#ubahkatalaluan").on('click',function () {
    window.sessionStorage.child = "38cf6138d18623265eafa01ce1a74f70";
    checkAuthentication(window.sessionStorage.child);
});

$("#ubahkatalaluan_web").on('click',function () {
    window.sessionStorage.child = "38cf6138d18623265eafa01ce1a74f70";
    checkAuthentication(window.sessionStorage.child);
});

$("#pentadbir_sistem").on('click',function () {
    window.sessionStorage.child = "15aaa21373a7090f86dcd348a755b94c";
    $(".right_menu .menu-app").toggleClass("open stretchRight").siblings().removeClass("open stretchRight"), $(".right_menu .menu-app").hasClass("open") ? $(".overlay").fadeIn() : $(".overlay").fadeOut();
    checkAuthentication(window.sessionStorage.child);
});

$("#penilaian").on('click',function () {
    window.sessionStorage.child = "959cde393ca127ad75c147ec76ac778b";
    $(".right_menu .menu-app").toggleClass("open stretchRight").siblings().removeClass("open stretchRight"), $(".right_menu .menu-app").hasClass("open") ? $(".overlay").fadeIn() : $(".overlay").fadeOut();
    checkAuthentication(window.sessionStorage.child);
});

$("#takwim_penilaian").on('click',function () {
    window.sessionStorage.child = "7a5ffb2b9ccf7b628e51eb4af9bd906d";
    $(".right_menu .menu-app").toggleClass("open stretchRight").siblings().removeClass("open stretchRight"), $(".right_menu .menu-app").hasClass("open") ? $(".overlay").fadeIn() : $(".overlay").fadeOut();
    checkAuthentication(window.sessionStorage.child);
});

$("#profil").on('click',function () {
    window.sessionStorage.child = "f5fe4ded77b07f4b4e59a73a3e6773a9";
    $(".right_menu .menu-app").toggleClass("open stretchRight").siblings().removeClass("open stretchRight"), $(".right_menu .menu-app").hasClass("open") ? $(".overlay").fadeIn() : $(".overlay").fadeOut();
    checkAuthentication(window.sessionStorage.child);
});

$("#sa").on('click', function(){
    let token = window.localStorage.token;
    checkCapaian(capaian[0],token,function(){
        if(dataCapaian.success){
            sessionStorage.capaian = capaian[0];
            sessionStorage.removeItem('child');
            window.location.replace('../super/');
        }
        else{
            swal({
                title: "Ralat",
                text: "Anda Tidak Mempunyai Capaian Sebagai Super Admin",
                type: "error",
                confirmButtonText: "OK",
                closeOnConfirm: true,
                allowOutsideClick: false,
                html: false
            }).then(function () {
                // window.location.reload();
            });
        }
    });
});

$("#ptl").on('click', function(){
    let token = window.localStorage.token;
    checkCapaian(capaian[1],token,function(){
        // console.log(dataCapaian);
        if(dataCapaian.success){
            sessionStorage.capaian = capaian[1];
            sessionStorage.removeItem('child');
            window.location.replace('../ptl/');
        }
        else{
            swal({
                title: "Ralat",
                text: "Anda Tidak Mempunyai Capaian Sebagai Pegawai Tadbir Latihan",
                type: "error",
                confirmButtonText: "OK",
                closeOnConfirm: true,
                allowOutsideClick: false,
                html: false
            }).then(function () {
                // window.location.reload();
            });
        }
    });
});

$("#ppp").on('click', function(){
    let token = window.localStorage.token;
    checkCapaian(capaian[2],token,function(){
        if(dataCapaian.success){
            sessionStorage.capaian = capaian[2];
            sessionStorage.removeItem('child');
            window.location.replace('../ppp/');
        }
        else{
            swal({
                title: "Ralat",
                text: "Anda Tidak Mempunyai Capaian Sebagai Pegawai Penyelaras Penilaian",
                type: "error",
                confirmButtonText: "OK",
                closeOnConfirm: true,
                allowOutsideClick: false,
                html: false
            }).then(function () {
                // window.location.reload();
            });
        }
    });
});

$("#us").on('click', function(){
    let token = window.localStorage.token;
    checkCapaian(capaian[3],token,function(){
        if(dataCapaian.success){
            sessionStorage.capaian = capaian[3];
            sessionStorage.removeItem('child');
            window.location.replace('../us/');
        }
        else{
            swal({
                title: "Ralat",
                text: "Anda Tidak Mempunyai Capaian Sebagai Urusetia", 
                type: "error",
                confirmButtonText: "OK",
                closeOnConfirm: true,
                allowOutsideClick: false,
                html: false
            }).then(function () {
                // window.location.reload();
            });
        }
    });
});

$("#logKeluar").on('click',function () {
    logkeluar();
});

// dashboard admin super

function loadsSideCapaian(){
    var form = new FormData();
    form.append("no_kad_pengenalan", noic_master);
    checkLoginAdmin(form, function(){
        if(objCheck.success){
            let dataCheck = objCheck.data;
            $.each(dataCheck,function(i,field){
                $("#li_"+field.FK_submodul).removeClass('d-none');
            });
        }
    });
}

function pen_penilaianCountSiriPenilaian(returnValue){
    var settings = {
        "url": host+"penilaian/countSiriPenilaian",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
    };
    var request = $.ajax(settings);

    request.done(function (response) {
        objPenilaian = response;

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

function pen_logCountUserAktif(){
    var settings = {
        "url": host+"log/countUserAktif",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
    };
    var request = $.ajax(settings);

    request.done(function (response) {
        objCountUserAktif = response;
        pen_usersTotalUsers(function(){
            $("#total_login").trigger('configure', {
                max: objCountTotalUsers.data.length
            });
            $("#total_login").val(objCountUserAktif.data.length);
            $("#total_login").trigger('change');
        });
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

function pen_usersTotalUsers(returnValue){
    var settings = {
        "url": host+"usersList",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
    };
    var request = $.ajax(settings);

    request.done(function (response) {
        objCountTotalUsers = response;

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

function load_pie_chart(){
    let url = '';
    if(sessionStorage.capaian == capaian[0]){
        url = "penilaian/countKategoriPenilaian";
    } else if(sessionStorage.capaian == capaian[1]){
        url = "penilaian/countKategoriPenilaianByKluster/"+FK_kluster_master;
    } else if(sessionStorage.capaian == capaian[2]){
        url = "penilaian/countKategoriPenilaianByPenyelaras/"+id_users_master;
    } else if(sessionStorage.capaian == capaian[3]){
        url = "penilaian/countKategoriPenilaianByUrusetia/"+id_users_master;
    }
    var settings = {
        "url": host+url,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": window.localStorage.token
        },
    };
    var request = $.ajax(settings);

    request.done(function (response) {8
        var pieChartData = [];
        var pieChartColors = ['#f8a427', '#ef5c64', '#2d9fd1', '#60c7aa',"#3547bb","#bb4d35","#a335bb","#00c276","#ffedfd","#ffeded"];
        $.each(response.data, function(i, item){
            pieChartData[i] = {
                label: item.nama_kategori_penilaian,
                data: item.total,
                color: pieChartColors[i]
            }
        });
        $.plot('#pie_kategori_penilaian', pieChartData, {
        series: {
            pie: {
                show: true,
                radius: 1,
                label: {
                    show: true,
                    radius: 3 / 4,
                    formatter: labelFormatter,
                    background: {
                        opacity: 0
                    }
                }
            }
        },
        grid: {
            hoverable: true
        },
        tooltip: true,
        tooltipOpts: {
            cssClass: "flotTip",
            content: "%p.0%, %s",
            shifts: {
                x: 20,
                y: 0
            },
            defaultTheme: false
        },
        legend: {show: true}
        });
    
        function labelFormatter(label, series) {
            return '<div style="font-size:12pt; text-align:center; padding:2px; color:white;">' + Math.round(series.percent) + '%</div>';
        }

        function legendFormatter(label, series) {
            return '<div style="font-size:8pt;text-align:center;padding:2px;">' + label + ' ' + Math.round(series.percent)+'%</div>';
        }
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

// end dashboard admin super

// dashboard ptl

function pen_penilaianCountSiriPenilaianByKluster(form, returnValue){
    var settings = {
        "url": host+"penilaian/countSiriPenilaianByKluster",
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
        objPenilaian = response;

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

// end dashboard ptl

// dashboard ppp

function pen_penilaianCountSiriPenilaianByPenyelaras(form, returnValue){
    var settings = {
        "url": host+"penilaian/countSiriPenilaianByPenyelaras",
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
        objPenilaian = response;

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

function p_details(id){
    sessionStorage.id_penilaian = id;

    window.sessionStorage.child = "b0f7c80a40e3d2b78df8f0e6c22f31e5";
    checkAuthentication(window.sessionStorage.child);   
}

// end dashboard ppp

// dashboard urusetia

function pen_urusetiaListSiriPenilaian(form, returnValue){
    var settings = {
        "url": host+"urusetia/listSiriPenilaian",
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
        objSiriPenilaian = response;

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

function sp_details(id_penilaian, id_siri_penilaian){
    sessionStorage.id_penilaian = id_penilaian;
    sessionStorage.id_siri_penilaian = id_siri_penilaian;

    window.sessionStorage.child = "3737b150ea9ee0191b5dcc8233bfa472";
    checkAuthentication(window.sessionStorage.child); 
}

// end dashboard urusetia

function checkNotification(){
    $.each(JSON.parse(window.sessionStorage.jenis_fasiliti), function(i, item){
        var list = [];
        var bil = 1;
        var columns = [
            { "name": "bil", "title": "Bil" },
            { "name": "nama_program", "title": "Nama Program" },
            { "name": "nama_fas", "title": "Fasiliti" },
            { "name": "tarikh", "title": "Tarikh" },
            { "name": "status", "title": "Status" },
            { "name": "nama_pemohon", "title": "Pemohon" }
        ];
        var form = new FormData();
        form.append("kod_jenis_fas", item.fasiliti);
        form.append("FK_agensi", window.sessionStorage.FK_agensi);
        var settings = {
            "url": host + "tempahan/fasiliti_detail/listByJenisFas",
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
            $.each(response.data, function(i, item){
                let append = '';
                let icon = '';
                if (item.kod_jenis_fas == 'dwn')   {
                    icon = 'fa-university';
                } else if (item.kod_jenis_fas == 'blk')   {
                    icon = 'fa-home';
                } else if (item.kod_jenis_fas == 'sjn')   {
                    icon = 'fa-coffee';
                } else if (item.kod_jenis_fas == 'mkl')   {
                    icon = 'fa-desktop';
                } else if (item.kod_jenis_fas == 'skn')   {
                    icon = 'fa-dribbble';
                } else if (item.kod_jenis_fas == 'asr')   {
                    icon = 'fa-hotel';
                } else if (item.kod_jenis_fas == 'kdn')   {
                    icon = 'fa-car';
                }
                append = '<a onclick="notification_details(\'' + item.id_tem_pen_det + '\',\'' + item.kod_jenis_fas + '\',\'' + item.id_tem_fas + '\')">'+
                            '<div class="btn btn-warning btn-circle mr-2"><i class="fa '+ icon +'"></i>'+
                            '</div>'+
                            '<div class="mail-contnet">'+
                                '<h5>'+ item.nama_program +'</h5> <span class="mail-desc">'+ item.nama +'</span> <span class="time">'+ formatDate(item.tarikh_mula) +' - '+ formatDate(item.tarikh_tamat) +'</span>'+
                            '</div>'+
                        '</a>';
                $("#notification_list").append(append);
                
            });
        });

    });    
}

function notification_details(id_1,id_2,id_3){
    sessionStorage.id_1 = id_1; // ID per tempahan
    sessionStorage.id_2 = id_2; // KOD jenis fasiliti
    sessionStorage.id_3 = id_3; // ID per permohonan

    window.sessionStorage.content = "html/detail_list_temps";
    $('#content').load('html/detail_list_temps.html');
}