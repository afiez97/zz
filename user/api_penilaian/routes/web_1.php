<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested. 
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('key', function () {
    return MD5('ASDCM-PROTIGAT');
});

$router->post('/login','authController@login');
$router->post('/loginUser','authController@loginUser');



//kenderaan api

$router->post('/tempahan/kenderaan/add', 'pen_tem_kenderaanController@register');
$router->post('/tempahan/kenderaan/view', 'pen_tem_kenderaanController@show');
$router->get('/tempahan/kenderaan/list', 'pen_tem_kenderaanController@list');
$router->post('/tempahan/kenderaan/update', 'pen_tem_kenderaanController@update');
$router->post('/tempahan/kenderaan/delete', 'pen_tem_kenderaanController@delete');

// $router->post('/kenderaanRegister', 'pen_tem_kenderaanController@register');
// $router->get('/kenderaan/show', 'pen_tem_kenderaanController@show');
// $router->put('/kenderaan/update', 'pen_tem_kenderaanController@update');
// $router->delete('/kenderaan/delete', 'pen_tem_kenderaanController@delete');
// $router->delete('/kenderaanStatus', 'pen_tem_kenderaanController@status');


//sajian api

$router->post('/tempahan/sajian/add', 'tem_pen_sjnController@register');
$router->post('/tempahan/sajian/view', 'tem_pen_sjnController@show');
$router->get('/tempahan/sajian/list', 'tem_pen_sjnController@list');
$router->post('/tempahan/sajian/update', 'tem_pen_sjnController@update');
$router->post('/tempahan/sajian/delete', 'tem_pen_sjnController@delete');

//makmal api

$router->post('/tempahan/makmal/add', 'tem_pen_mklController@register');
$router->post('/tempahan/makmal/view', 'tem_pen_mklController@show');
$router->get('/tempahan/makmal/list', 'tem_pen_mklController@list');
$router->post('/tempahan/makmal/update', 'tem_pen_mklController@update');
$router->post('/tempahan/makmal/delete', 'tem_pen_mklController@delete');


//bilik api

$router->post('/tempahan/bilik/add', 'tem_pen_blkController@register');
$router->post('/tempahan/bilik/view', 'tem_pen_blkController@show');
$router->get('/tempahan/bilik/list', 'tem_pen_blkController@list');
$router->post('/tempahan/bilik/update', 'tem_pen_blkController@update');
$router->post('/tempahan/bilik/delete', 'tem_pen_blkController@delete');


//dewan api

$router->post('/tempahan/dewan/add', 'tem_pen_dwnController@register');
$router->post('/tempahan/dewan/view', 'tem_pen_dwnController@show');
$router->get('/tempahan/dewan/list', 'tem_pen_dwnController@list');
$router->post('/tempahan/dewan/update', 'tem_pen_dwnController@update');
$router->post('/tempahan/dewan/delete', 'tem_pen_dwnController@delete');


//sukan api
$router->post('/tempahan/sukan/add','tem_pen_sknController@register');
$router->post('/tempahan/sukan/view','tem_pen_sknController@show');
$router->get('/tempahan/sukan/list','tem_pen_sknController@list');
$router->post('/tempahan/sukan/update','tem_pen_sknController@update');
$router->post('/tempahan/sukan/delete','tem_pen_sknController@delete');


//asrama api
$router->post('/tempahan/asrama/add','tem_pen_asmController@register');
$router->post('/tempahan/asrama/view','tem_pen_asmController@show');
$router->get('/tempahan/asrama/list','tem_pen_asmController@list');
$router->post('/tempahan/asrama/update','tem_pen_asmController@update');
$router->post('/tempahan/asrama/delete','tem_pen_asmController@delete');


//asrama detail api
$router->post('/tempahan/asrama_detail/add','tem_pen_asm_detController@register');
$router->post('/tempahan/asrama_detail/view','tem_pen_asm_detController@show');
$router->get('/tempahan/asrama_detail/list','tem_pen_asm_detController@list');
$router->post('/tempahan/asrama_detail/update','tem_pen_asm_detController@update');
$router->post('/tempahan/asrama_detail/delete','tem_pen_asm_detController@delete');

//fasiliti api
$router->post('/tempahan/fasiliti/add','tem_fasController@register');
$router->post('/tempahan/fasiliti/view','tem_fasController@show');
$router->get('/tempahan/fasiliti/list','tem_fasController@list');
$router->post('/tempahan/fasiliti/update','tem_fasController@update');
$router->post('/tempahan/fasiliti/delete','tem_fasController@delete');


//fasiliti detail api
$router->post('/tempahan/fasiliti_detail/add','tem_pen_detController@register');
$router->post('/tempahan/fasiliti_detail/view','tem_pen_detController@show');
$router->get('/tempahan/fasiliti_detail/list','tem_pen_detController@list');
$router->post('/tempahan/fasiliti_detail/update','tem_pen_detController@update');
$router->post('/tempahan/fasiliti_detail/delete','tem_pen_detController@delete');



//borang penilaian fasiliti api
$router->post('/borang/penilaian_fasiliti/add','brg_pen_fasController@register');
$router->post('/borang/penilaian_fasiliti/view','brg_pen_fasController@show');
$router->get('/borang/penilaian_fasiliti/list','brg_pen_fasController@list');
$router->post('/borang/penilaian_fasiliti/update','brg_pen_fasController@update');
$router->post('/borang/penilaian_fasiliti/delete','brg_pen_fasController@delete');


//borang soalan penilaian fasiliti api
$router->post('/borang/soalan_penilaian_fasiliti/add','brg_soalan_penilaian_fasController@register');
$router->post('/borang/soalan_penilaian_fasiliti/view','brg_soalan_penilaian_fasController@show');
$router->get('/borang/soalan_penilaian_fasiliti/list','brg_soalan_penilaian_fasController@list');
$router->post('/borang/soalan_penilaian_fasiliti/update','brg_soalan_penilaian_fasController@update');
$router->post('/borang/soalan_penilaian_fasiliti/delete','brg_soalan_penilaian_fasController@delete');


//penilaian fasiliti jawapan pengguna api
$router->post('/penilaian/fasiliti_jawapan_pengguna/add','penilaian_pen_jwpn_penggunaController@register');
$router->post('/penilaian/fasiliti_jawapan_pengguna/view','penilaian_pen_jwpn_penggunaController@show');
$router->get('/penilaian/fasiliti_jawapan_pengguna/list','penilaian_pen_jwpn_penggunaController@list');
$router->post('/penilaian/fasiliti_jawapan_pengguna/update','penilaian_pen_jwpn_penggunaController@update');
$router->post('/penilaian/fasiliti_jawapan_pengguna/delete','penilaian_pen_jwpn_penggunaController@delete');


//tempahan fasiliti penilaian api
$router->post('/tempahan/fasiliti_penilaian/add','tem_pen_penilaianController@register');
$router->post('/tempahan/fasiliti_penilaian/view','tem_pen_penilaianController@show');
$router->get('/tempahan/fasiliti_penilaian/list','tem_pen_penilaianController@list');
$router->post('/tempahan/fasiliti_penilaian/update','tem_pen_penilaianController@update');
$router->post('/tempahan/fasiliti_penilaian/delete','tem_pen_penilaianController@delete');

//penilaian fasiliti pengguna api
$router->post('/penilaian/fasiliti_pengguna/add','penilaian_pen_penggunaController@register');
$router->post('/penilaian/fasiliti_pengguna/view','penilaian_pen_penggunaController@show');
$router->get('/penilaian/fasiliti_pengguna/list','penilaian_pen_penggunaController@list');
$router->post('/penilaian/fasiliti_pengguna/update','penilaian_pen_penggunaController@update');
$router->post('/penilaian/fasiliti_pengguna/delete','penilaian_pen_penggunaController@delete');


//merge fasiliti

$router->post('daftar/jenis_fasiliti/register', 'jenis_fasController@register');
$router->get('daftar/jenis_fasiliti/list', 'jenis_fasController@list');
$router->post('daftar/jenis_fasiliti/update', 'jenis_fasController@update'); 
$router->post('daftar/jenis_fasiliti/delete', 'jenis_fasController@delete');
$router->post('daftar/jenis_fasiliti/view', 'jenis_fasController@show');

$router->post('daftar/fasiliti_bilik/register', 'pen_blkController@register');
$router->get('daftar/fasiliti_bilik/list', 'pen_blkController@list');
$router->post('daftar/fasiliti_bilik/update', 'pen_blkController@update'); 
$router->post('daftar/fasiliti_bilik/delete', 'pen_blkController@delete');
$router->post('daftar/fasiliti_bilik/view', 'pen_blkController@show');

$router->post('daftar/fasiliti_sajian/register', 'pen_sjnController@register');
$router->get('daftar/fasiliti_sajian/list', 'pen_sjnController@list');
$router->post('daftar/fasiliti_sajian/update', 'pen_sjnController@update'); 
$router->post('daftar/fasiliti_sajian/delete', 'pen_sjnController@delete');
$router->post('daftar/fasiliti_sajian/view', 'pen_sjnController@show');

$router->post('daftar/fasiliti_dewan/register', 'pen_dwnController@register');
$router->get('daftar/fasiliti_dewan/list', 'pen_dwnController@list');
$router->post('daftar/fasiliti_dewan/update', 'pen_dwnController@update'); 
$router->post('daftar/fasiliti_dewan/delete', 'pen_dwnController@delete');
$router->post('daftar/fasiliti_dewan/view', 'pen_dwnController@show');

$router->post('daftar/fasiliti_makmal/register', 'pen_mklController@register');
$router->get('daftar/fasiliti_makmal/list', 'pen_mklController@list');
$router->post('daftar/fasiliti_makmal/update', 'pen_mklController@update'); 
$router->post('daftar/fasiliti_makmal/delete', 'pen_mklController@delete');
$router->post('daftar/fasiliti_makmal/view', 'pen_mklController@show');

$router->post('daftar/fasiliti_kenderaan/register', 'pen_kdnController@register');
$router->get('daftar/fasiliti_kenderaan/list', 'pen_kdnController@list');
$router->post('daftar/fasiliti_kenderaan/update', 'pen_kdnController@update'); 
$router->post('daftar/fasiliti_kenderaan/delete', 'pen_kdnController@delete');
$router->post('daftar/fasiliti_kenderaan/view', 'pen_kdnController@show');

$router->post('daftar/fasiliti_asrama/register', 'pen_asrController@register');
$router->get('daftar/fasiliti_asrama/list', 'pen_asrController@list');
$router->post('daftar/fasiliti_asrama/update', 'pen_asrController@update'); 
$router->post('daftar/fasiliti_asrama/delete', 'pen_asrController@delete');
$router->post('daftar/fasiliti_asrama/view', 'pen_asrController@show');

$router->post('daftar/fasiliti_sukan/register', 'pen_sknController@register');
$router->get('daftar/fasiliti_sukan/list', 'pen_sknController@list');
$router->post('daftar/fasiliti_sukan/update', 'pen_sknController@update'); 
$router->post('daftar/fasiliti_sukan/delete', 'pen_sknController@delete');
$router->post('daftar/fasiliti_sukan/view', 'pen_sknController@show');

$router->post('daftar/fasiliti_asrama_bilik/register', 'pen_asr_bilikController@register');
$router->get('daftar/fasiliti_asrama_bilik/list', 'pen_asr_bilikController@list');
$router->post('daftar/fasiliti_asrama_bilik/update', 'pen_asr_bilikController@update');
$router->post('daftar/fasiliti_asrama_bilik/delete', 'pen_asr_bilikController@delete');
$router->post('daftar/fasiliti_asrama_bilik/view', 'pen_asr_bilikController@show');

$router->post('daftar/fasiliti_asrama_blok/register', 'pen_asr_blokController@register');
$router->get('daftar/fasiliti_asrama_blok/list', 'pen_asr_blokController@list');
$router->post('daftar/fasiliti_asrama_blok/update', 'pen_asr_blokController@update');
$router->post('daftar/fasiliti_asrama_blok/delete', 'pen_asr_blokController@delete');
$router->post('daftar/fasiliti_asrama_blok/view', 'pen_asr_blokController@show');

$router->post('daftar/jenis_bilik_asrama/register', 'jenis_bilik_asramaController@register');
$router->get('daftar/jenis_bilik_asrama/list', 'jenis_bilik_asramaController@list');
$router->post('daftar/jenis_bilik_asrama/update', 'jenis_bilik_asramaController@update');
$router->post('daftar/jenis_bilik_asrama/delete', 'jenis_bilik_asramaController@delete');
$router->post('daftar/jenis_bilik_asrama/view', 'jenis_bilik_asramaController@show');

$router->post('daftar/polisi_jenis_fasiliti/register', 'polisi_jenis_fasController@register');
$router->get('daftar/polisi_jenis_fasiliti/list', 'polisi_jenis_fasController@list');
$router->post('daftar/polisi_jenis_fasiliti/update', 'polisi_jenis_fasController@update');
$router->post('daftar/polisi_jenis_fasiliti/delete', 'polisi_jenis_fasController@delete');
$router->post('daftar/polisi_jenis_fasiliti/view', 'polisi_jenis_fasController@show');

$router->post('daftar/fasiliti_makmal_detail/register', 'pen_mkl_detController@register');
$router->get('daftar/fasiliti_makmal_detail/list', 'pen_mkl_detController@list');
$router->post('daftar/fasiliti_makmal_detail/update', 'pen_mkl_detController@update');
$router->post('daftar/fasiliti_makmal_detail/delete', 'pen_mkl_detController@delete');
$router->post('daftar/fasiliti_makmal_detail/view', 'pen_mkl_detController@show');

$router->post('daftar/fasiliti_jenama_kenderaan/register', 'pen_jenama_kdnController@register');
$router->get('daftar/fasiliti_jenama_kenderaan/list', 'pen_jenama_kdnController@list');
$router->post('daftar/fasiliti_jenama_kenderaan/update', 'pen_jenama_kdnController@update');
$router->post('daftar/fasiliti_jenama_kenderaan/delete', 'pen_jenama_kdnController@delete');
$router->post('daftar/fasiliti_jenama_kenderaan/view', 'pen_jenama_kdnController@show');

$router->post('daftar/fasiliti_warna_kenderaan/register', 'pen_warna_kdnController@register');
$router->get('daftar/fasiliti_warna_kenderaan/list', 'pen_warna_kdnController@list');
$router->post('daftar/fasiliti_warna_kenderaan/update', 'pen_warna_kdnController@update');
$router->post('daftar/fasiliti_warna_kenderaan/delete', 'pen_warna_kdnController@delete');
$router->post('daftar/fasiliti_warna_kenderaan/view', 'pen_warna_kdnController@show');

$router->post('daftar/fasiliti_model_kenderaan/register', 'pen_model_kdnController@register');
$router->get('daftar/fasiliti_model_kenderaan/list', 'pen_model_kdnController@list');
$router->post('daftar/fasiliti_model_kenderaan/update', 'pen_model_kdnController@update');
$router->post('daftar/fasiliti_model_kenderaan/delete', 'pen_model_kdnController@delete');
$router->post('daftar/fasiliti_model_kenderaan/view', 'pen_model_kdnController@show');

$router->post('daftar/fasiliti_item/register', 'pen_itemController@register');
$router->get('daftar/fasiliti_item/list', 'pen_itemController@list');
$router->post('daftar/fasiliti_item/update', 'pen_itemController@update');
$router->post('daftar/fasiliti_item/delete', 'pen_itemController@delete');
$router->post('daftar/fasiliti_item/view', 'pen_itemController@show');

// $router->post('daftar/fasiliti_makmal_detail/{id}', 'pen_mkl_detController@show');

// IMPORT DARI MEDIA

// pen_kampus api
$router->post('/addKampus', 'pen_kampusController@register');
$router->post('/kampus', 'pen_kampusController@show');
$router->get('/kampusList', 'pen_kampusController@list');
$router->get('/kampusListAll', 'pen_kampusController@listall');
$router->post('/kampusUpdate', 'pen_kampusController@update'); //setting tambah baru
$router->post('/kampusDelete', 'pen_kampusController@delete');

// pen_gelaran api
$router->post('/addGelarans', 'pen_gelaranController@register');
$router->post('/gelarans', 'pen_gelaranController@show');
$router->post('/gelaransHrmis', 'pen_gelaranController@showHrmis');
$router->get('/gelaransList', 'pen_gelaranController@list');
$router->get('/gelaransListAll', 'pen_gelaranController@listall');
$router->post('/gelaransUpdate', 'pen_gelaranController@update'); //setting tambah baru
$router->post('/gelaransDelete', 'pen_gelaranController@delete');

// pen_kluster api
$router->post('/addKlusters', 'pen_klusterController@register');
$router->post('/klusters', 'pen_klusterController@show');
$router->get('/klusters/{FK_kampus}', 'pen_klusterController@showGet');
$router->get('/klustersList', 'pen_klusterController@list');
$router->post('/klustersUpdate', 'pen_klusterController@update'); //setting tambah baru
$router->post('/klustersDelete', 'pen_klusterController@delete');

// pen_subkluster api
$router->post('/addSubklusters', 'pen_subklusterController@register');
$router->post('/subklusters', 'pen_subklusterController@show');
$router->get('/subklusters/{FK_kluster}', 'pen_subklusterController@showGet');
$router->get('/subklustersList', 'pen_subklusterController@list');
$router->post('/subklustersUpdate', 'pen_subklusterController@update'); //setting tambah baru
$router->post('/subklustersDelete', 'pen_subklusterController@delete');

// pen_unit api
$router->post('/addUnits', 'pen_unitController@register');
$router->post('/units', 'pen_unitController@show');
$router->get('/units/{FK_kluster}/{FK_subkluster}', 'pen_unitController@showGet');
$router->get('/unitsList', 'pen_unitController@list');
$router->post('/unitsUpdate', 'pen_unitController@update'); //setting tambah baru
$router->post('/unitsDelete', 'pen_unitController@delete');

// pen_kementerian api
$router->post('/addKementerians', 'pen_kementerianController@register');
$router->post('/kementerians', 'pen_kementerianController@show');
$router->post('/kementeriansHrmis', 'pen_kementerianController@showHrmis');
$router->post('/kementeriansName', 'pen_kementerianController@showName');
$router->get('/kementeriansList', 'pen_kementerianController@list');
$router->post('/kementeriansUpdate', 'pen_kementerianController@update'); //setting tambah baru
$router->post('/kementeriansDelete', 'pen_kementerianController@delete');

// pen_agensi api
$router->post('/addAgensis', 'pen_agensiController@register');
$router->post('/agensis', 'pen_agensiController@show');
$router->post('/agensisKod', 'pen_agensiController@showKod');
$router->get('/agensisList', 'pen_agensiController@list');
$router->post('/agensisUpdate', 'pen_agensiController@update'); //setting tambah baru
$router->post('/agensisDelete', 'pen_agensiController@delete');

// pen_bahagian api
$router->post('/addBahagians', 'pen_bahagianController@register');
$router->post('/bahagians', 'pen_bahagianController@show');
$router->get('/bahagians/{kod_kementerian}/{kod_agensi}', 'pen_bahagianController@showGet');
$router->get('/bahagiansList', 'pen_bahagianController@list');
$router->post('/bahagiansUpdate', 'pen_bahagianController@update'); //setting tambah baru
$router->post('/bahagiansDelete', 'pen_bahagianController@delete');

// pen_ilawam api
$router->post('/addIlawams', 'pen_ilawamController@register');
$router->post('/ilawams', 'pen_ilawamController@show');
$router->get('/ilawams/{kod_bahagian}', 'pen_ilawamController@showGet');
$router->get('/ilawamsList', 'pen_ilawamController@list');
$router->post('/ilawamsUpdate', 'pen_ilawamController@update'); //setting tambah baru
$router->post('/ilawamsDelete', 'pen_ilawamController@delete');

// pen_log api
$router->post('/addLogs', 'pen_logController@register');
$router->post('/logs', 'pen_logController@show');
$router->get('/logsList', 'pen_logController@list');

// pen_sysposkod api
$router->get('/sysposkod/{poskod}', 'pen_sysposkodController@show');
$router->get('/sysposkodList', 'pen_sysposkodController@list');

// pen_users api
$router->post('/addUsers', 'pen_usersController@register');
$router->post('/users', 'pen_usersController@show');
$router->post('/usersIcEmel', 'pen_usersController@showIcEmel');
$router->post('/usersSemakKatalaluan', 'pen_usersController@checkpassword');
$router->post('/usersReset', 'pen_usersController@resetpassword');
$router->post('/usersResetToEmail', 'pen_usersController@resetpasswordtomail');
$router->get('/usersResetKatalaluan/{resetkatalaluan}', 'pen_usersController@showGetResetKatalaluan');
$router->post('/usersResetPassword', 'pen_usersController@resetpassword');
$router->get('/usersGetIc/{no_kad_pengenalan}', 'pen_usersController@showGetIc');
$router->get('/usersList', 'pen_usersController@list');
$router->get('/usersgovsIntanList', 'pen_usersController@listIntan');
$router->get('/usersgovsIntan/{no_kad_pengenalan}', 'pen_usersController@listIntanGetIc');
$router->get('/usersgovsLuarList', 'pen_usersController@listLuar');
$router->get('/usersswastaList', 'pen_usersController@listSwasta');
$router->get('/userspelajarList', 'pen_usersController@listPelajar');
$router->get('/usersListAll', 'pen_usersController@listAll');
$router->get('/usersListPentadbir', 'pen_usersController@listPentadbir');
$router->get('/usersListKerajaan', 'pen_usersController@listKerajaan');
$router->get('/usersListKerajaan/{FK_users}', 'pen_usersController@listKerajaanSingle');
$router->get('/usersEditProfile/{FK_users}', 'pen_usersController@listUsersEditProfile');
$router->get('/usersListSwasta', 'pen_usersController@listSwasta');
$router->get('/usersListPelajar', 'pen_usersController@listPelajar');
$router->post('/usersUpdate', 'pen_usersController@update'); //setting tambah baru
$router->post('/usersEditProfile', 'pen_usersController@editprofile'); //setting tambah baru
$router->post('/usersDelete', 'pen_usersController@delete');

// pen_kategoriperkhidmatan api
$router->post('/addKategoriperkhidmatans', 'pen_kategoriperkhidmatanController@register');
$router->post('/kategoriperkhidmatans', 'pen_kategoriperkhidmatanController@show');
$router->post('/kategoriperkhidmatansHrmis', 'pen_kategoriperkhidmatanController@showHrmis');
$router->get('/kategoriperkhidmatansList', 'pen_kategoriperkhidmatanController@list');
$router->post('/kategoriperkhidmatansUpdate', 'pen_kategoriperkhidmatanController@update'); //setting tambah baru
$router->post('/kategoriperkhidmatansDelete', 'pen_kategoriperkhidmatanController@delete');

// pen_skim api
$router->post('/addSkims', 'pen_skimController@register');
$router->post('/skims', 'pen_skimController@show');
$router->get('/skimsList', 'pen_skimController@list');
$router->post('/skimsUpdate', 'pen_skimController@update'); //setting tambah baru
$router->post('/skimsDelete', 'pen_skimController@delete');

// pen_tarafjawatan api
$router->post('/addTarafjawatans', 'pen_tarafjawatanController@register');
$router->post('/tarafjawatans', 'pen_tarafjawatanController@show');
$router->get('/tarafjawatansList', 'pen_tarafjawatanController@list');
$router->post('/tarafjawatansUpdate', 'pen_tarafjawatanController@update'); //setting tambah baru
$router->post('/tarafjawatansDelete', 'pen_tarafjawatanController@delete');

// pen_jenispengguna api
$router->post('/addJenispenggunas', 'pen_jenispenggunaController@register');
$router->post('/jenispenggunas', 'pen_jenispenggunaController@show');
$router->get('/jenispenggunasList', 'pen_jenispenggunaController@list');
$router->post('/jenispenggunasUpdate', 'pen_jenispenggunaController@update'); //setting tambah baru
$router->post('/jenispenggunasDelete', 'pen_jenispenggunaController@delete');

// pen_jenisperkhidmatan api
$router->post('/addJenisperkhidmatans', 'pen_jenisperkhidmatanController@register');
$router->post('/jenisperkhidmatans', 'pen_jenisperkhidmatanController@show');
$router->get('/jenisperkhidmatansList', 'pen_jenisperkhidmatanController@list');
$router->post('/jenisperkhidmatansUpdate', 'pen_jenisperkhidmatanController@update'); //setting tambah baru
$router->post('/jenisperkhidmatansDelete', 'pen_jenisperkhidmatanController@delete');

// pen_tetapan api
$router->post('/addTetapans', 'pen_tetapanController@register');
$router->post('/tetapans', 'pen_tetapanController@show');
$router->get('/tetapansList', 'pen_tetapanController@list');
$router->post('/tetapansUpdate', 'pen_tetapanController@update'); //setting tambah baru
$router->post('/tetapansDelete', 'pen_tetapanController@delete');

// pen_peranan api
$router->post('/addPeranan', 'pen_perananController@register');
$router->post('/peranan', 'pen_perananController@show');
$router->get('/perananList', 'pen_perananController@list');
$router->post('/perananUpdate', 'pen_perananController@update'); //setting tambah baru
$router->post('/perananDelete', 'pen_perananController@delete');

// pen_capaian api
$router->post('/addCapaian', 'pen_capaianController@register');
$router->post('/capaian', 'pen_capaianController@show');
$router->get('/capaian/{FK_users}', 'pen_capaianController@showGet');
$router->get('/capaianList', 'pen_capaianController@list');
$router->post('/capaianUpdate', 'pen_capaianController@update'); //setting tambah baru
$router->post('/capaianDelete', 'pen_capaianController@delete');