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

//login & reset password api
$router->get('/testamri','authController@testamri');
$router->post('/addUsersSiteAwam','authController@register');
$router->post('/login','authController@login');
$router->post('/loginPenilaian','authController@loginPenilaian');
$router->post('/loginUser','authController@loginUser');
$router->post('/checkAuth','authController@checkAuth');
$router->post('/checkUsers', 'authController@show');
$router->post('/checkLoginAdmin', 'authController@checkLoginAdmin');
$router->post('/usersIcEmel', 'authController@showIcEmel');
$router->post('/usersReset', 'authController@resetpassword');
$router->post('/usersResetToEmail', 'authController@resetpasswordtomail');
$router->get('/usersResetKatalaluan/{resetkatalaluan}', 'authController@showGetResetKatalaluan');
$router->post('fileUpload', 'authController@uploadFile'); // AzizZ 12.10.2022
// $router->post('/siri_penilaian/showEncId', 'authController@showEncId');
$router->post('/sesi_siri_penilaian/showEncId', 'authController@showEncId');

// IMPORT DARI MEDIA

// pen_submodul api
$router->post('/addSubmoduls', 'pen_submodulController@register');
$router->post('/submoduls', 'pen_submodulController@show');
$router->get('/submoduls/{FK_modul}', 'pen_submodulController@showSubmodul');
$router->get('/submodulsList', 'pen_submodulController@list');
$router->post('/submodulsUpdate', 'pen_submodulController@update'); //setting tambah baru
$router->post('/submodulsDelete', 'pen_submodulController@delete');

// pen_kampus api
$router->post('/addKampus', 'pen_kampusController@register');
$router->post('/kampus', 'pen_kampusController@show');
$router->get('/kampusList', 'pen_kampusController@list');
$router->get('/kampusListAll', 'pen_kampusController@listall');
$router->post('/kampusUpdate', 'pen_kampusController@update'); //setting tambah baru
$router->post('/kampusDelete', 'pen_kampusController@delete');

// pen_kluster api
$router->post('/addKluster', 'pen_klusterController@register');
$router->post('/kluster', 'pen_klusterController@show');
$router->get('/kluster/{FK_kampus}', 'pen_klusterController@showGet');
$router->get('/klusterList', 'pen_klusterController@list');
$router->post('/klusterUpdate', 'pen_klusterController@update'); //setting tambah baru
$router->post('/klusterDelete', 'pen_klusterController@delete');

// pen_gelaran api
$router->post('/addGelarans', 'pen_gelaranController@register');
$router->post('/gelarans', 'pen_gelaranController@show');
$router->post('/gelaransHrmis', 'pen_gelaranController@showHrmis');
$router->get('/gelaransList', 'pen_gelaranController@list');
$router->get('/gelaransListAll', 'pen_gelaranController@listall');
$router->post('/gelaransUpdate', 'pen_gelaranController@update'); //setting tambah baru
$router->post('/gelaransDelete', 'pen_gelaranController@delete');

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
$router->post('/kementeriansList', 'pen_kementerianController@list');
$router->post('/kementeriansListCheck', 'pen_kementerianController@listCheck');
$router->post('/kementeriansUpdate', 'pen_kementerianController@update'); //setting tambah baru
$router->post('/kementeriansDelete', 'pen_kementerianController@delete');

// pen_kat_agensi api
$router->post('/addKatAgensis', 'pen_kat_agensiController@register');
$router->post('/katAgensis', 'pen_kat_agensiController@show');
$router->post('/katAgensisNama', 'pen_kat_agensiController@showNama');
$router->post('/katAgensisKod', 'pen_kat_agensiController@showKod');
$router->get('/katAgensisList', 'pen_kat_agensiController@list');
$router->post('/katAgensisUpdate', 'pen_kat_agensiController@update'); //setting tambah baru
$router->post('/katAgensisDelete', 'pen_kat_agensiController@delete');

// pen_agensi api
$router->post('/addagensis', 'pen_agensiController@register');
$router->post('/agensis', 'pen_agensiController@show');
$router->get('/agensiGroup/{kod_kat_agensi}', 'pen_agensiController@showByKategori'); //AzizZ_20220627
$router->get('/agensis/{kod_kementerian}/{kod_kat_agensi}', 'pen_agensiController@showGet');
$router->post('/agensisList', 'pen_agensiController@list');
$router->post('/agensisUpdate', 'pen_agensiController@update'); //setting tambah baru
$router->post('/agensisDelete', 'pen_agensiController@delete');

// pen_ilawam api
$router->post('/addIlawams', 'pen_ilawamController@register');
$router->post('/ilawams', 'pen_ilawamController@show');
$router->get('/ilawams/{kod_agensi}', 'pen_ilawamController@showGet');
$router->get('/ilawamsList', 'pen_ilawamController@list');
$router->post('/ilawamsUpdate', 'pen_ilawamController@update'); //setting tambah baru
$router->post('/ilawamsDelete', 'pen_ilawamController@delete');

// pen_log api
$router->post('/addLogs', 'pen_logController@register');
$router->post('/logs', 'pen_logController@show');
$router->post('/logsToday', 'pen_logController@showToday');
$router->get('/log/countUserAktif', 'pen_logController@countUserAktif');
$router->post('/logsSearch', 'pen_logController@showSearch');
$router->get('/logsList', 'pen_logController@list');
$router->get('/logsListCurrDate', 'pen_logController@listcurrdate');

// pen_sysposkod api
$router->get('/sysposkod/{poskod}', 'pen_sysposkodController@show');
$router->get('/sysposkodList', 'pen_sysposkodController@list');

// pen_users api
$router->post('/addUsers', 'pen_usersController@register');
$router->post('/users', 'pen_usersController@show');
$router->post('/usersSemakKatalaluan', 'pen_usersController@checkpassword');
$router->post('/usersResetPassword', 'pen_usersController@resetpassword');
$router->get('/usersGetId/{id}', 'pen_usersController@showGetId');
$router->get('/usersGetIc/{no_kad_pengenalan}', 'pen_usersController@showGetIc');
$router->get('/getToken/{no_kad_pengenalan}', 'pen_usersController@getToken');
$router->get('/usersList', 'pen_usersController@list');
$router->get('/usersListAgensi', 'pen_usersController@listAgensi');
$router->get('/usersgovsIntanList', 'pen_usersController@listIntan');
$router->get('/usersPentadbir/{no_kad_pengenalan}/{peranan}', 'pen_usersController@showPentadbir');
$router->get('/usersgovsIntan/{no_kad_pengenalan}', 'pen_usersController@listIntanGetIc');
$router->get('/usersgovsLuarList', 'pen_usersController@listLuar');
$router->get('/usersswastaList', 'pen_usersController@listSwasta');
$router->get('/userspelajarList', 'pen_usersController@listPelajar');
$router->get('/usersListAll', 'pen_usersController@listAll');
$router->post('/usersListPentadbir', 'pen_usersController@listPentadbir');
$router->post('/usersCheckCapaian', 'pen_usersController@checkCapaian');
$router->get('/usersListKerajaan', 'pen_usersController@listKerajaan');
$router->get('/usersListKerajaan/{FK_users}', 'pen_usersController@listKerajaanSingle');
$router->get('/usersEditProfile/{no_kad_pengenalan}', 'pen_usersController@listUsersEditProfile');
$router->get('/usersListSwasta', 'pen_usersController@listSwasta');
$router->get('/usersListPelajar', 'pen_usersController@listPelajar');
$router->post('/usersUpdate', 'pen_usersController@update'); //setting tambah baru
$router->post('/usersUpdateSwasta', 'pen_usersController@updateSwasta'); //setting tambah baru
$router->post('/usersUpdateKerajaan', 'pen_usersController@updateKerajaan'); //setting tambah baru
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
$router->post('/tarafjawatansHrmis', 'pen_tarafjawatanController@showHrmis');
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
$router->get('/peranan/countCapaian', 'pen_perananController@countCapaian');
$router->post('/perananUpdate', 'pen_perananController@update'); //setting tambah baru
$router->post('/perananDelete', 'pen_perananController@delete');

// pen_capaian api
$router->post('/addCapaian', 'pen_capaianController@register');
$router->post('/capaian', 'pen_capaianController@show');
$router->get('/capaian/{FK_users}', 'pen_capaianController@showGet');
$router->get('/capaianList', 'pen_capaianController@list');
$router->get('/capaianListByPeranan/{FK_peranan}', 'pen_capaianController@listByPeranan');
$router->post('/capaianUpdate', 'pen_capaianController@update'); //setting tambah baru
$router->post('/capaianDelete', 'pen_capaianController@delete');

// pen_menu api
$router->post('/addMenus', 'pen_menuController@register');
$router->post('/menus', 'pen_menuController@show');
$router->get('/menusList', 'pen_menuController@list');
$router->post('/menusListByParent', 'pen_menuController@listByParent');
$router->get('/menusTop', 'pen_menuController@top');
$router->get('/menusMid/{FK_parent}', 'pen_menuController@mid');
$router->get('/menusBot/{FK_parent}', 'pen_menuController@bot');
$router->post('/menusUpdate', 'pen_menuController@update'); //setting tambah baru
$router->post('/menusDelete', 'pen_menuController@delete');

// PENILAIAN api

// pen_jenis_penilaian api
$router->post('/jenis_penilaian/add', 'pen_jenis_penilaianController@register');
$router->post('/jenis_penilaian/show', 'pen_jenis_penilaianController@show');
$router->get('/jenis_penilaian/list', 'pen_jenis_penilaianController@list');
$router->get('/jenis_penilaian/listAll', 'pen_jenis_penilaianController@listAll');
$router->post('/jenis_penilaian/update', 'pen_jenis_penilaianController@update'); //setting tambah baru
$router->post('/jenis_penilaian/chgmod', 'pen_jenis_penilaianController@chgmod');
$router->post('/jenis_penilaian/delete', 'pen_jenis_penilaianController@delete');

// pen_kategori_penilaian api
$router->post('/kategori_penilaian/add', 'pen_kategori_penilaianController@register');
$router->post('/kategori_penilaian/show', 'pen_kategori_penilaianController@show');
$router->get('/kategori_penilaian/list', 'pen_kategori_penilaianController@list');
$router->get('/kategori_penilaian/listAll', 'pen_kategori_penilaianController@listAll');
$router->post('/kategori_penilaian/update', 'pen_kategori_penilaianController@update'); //setting tambah baru
$router->post('/kategori_penilaian/delete', 'pen_kategori_penilaianController@delete');

// pen_penilaian api
$router->post('/penilaian/add', 'pen_penilaianController@register');
$router->post('/penilaian/show', 'pen_penilaianController@show');
$router->get('/penilaian/list', 'pen_penilaianController@list');
$router->post('/penilaian/listByPenyelaras', 'pen_penilaianController@listByPenyelaras');
$router->get('/penilaian/countSiriPenilaian', 'pen_penilaianController@countSiriPenilaian');
$router->post('/penilaian/countSiriPenilaianByKluster', 'pen_penilaianController@countSiriPenilaianByKluster');
$router->post('/penilaian/countSiriPenilaianByPenyelaras', 'pen_penilaianController@countSiriPenilaianByPenyelaras');
$router->get('/penilaian/listAll', 'pen_penilaianController@listAll');
$router->post('/penilaian/update', 'pen_penilaianController@update'); //setting tambah baru
$router->post('/penilaian/delete', 'pen_penilaianController@delete');
$router->get('/penilaian/countKategoriPenilaian', 'pen_penilaianController@countKategoriPenilaian');
$router->get('/penilaian/countKategoriPenilaianByKluster/{FK_kluster}', 'pen_penilaianController@countKategoriPenilaianByKluster');
$router->get('/penilaian/countKategoriPenilaianByPenyelaras/{FK_penyelaras}', 'pen_penilaianController@countKategoriPenilaianByPenyelaras');
$router->get('/penilaian/countKategoriPenilaianByUrusetia/{FK_users}', 'pen_penilaianController@countKategoriPenilaianByUrusetia');

// pen_siri_penilaian api
$router->post('/siri_penilaian/add', 'pen_siri_penilaianController@register');
$router->post('/siri_penilaian/show', 'pen_siri_penilaianController@show');
$router->get('/siri_penilaian/list', 'pen_siri_penilaianController@list');
$router->get('/siri_penilaian/listSet/{id_set}', 'pen_siri_penilaianController@listSet');
// $router->get('/siri_penilaian/listByTarikhMohonOpen', 'pen_siri_penilaianController@listByTarikhMohonOpen');
$router->post('/siri_penilaian/listByPenilaian', 'pen_siri_penilaianController@listByPenilaian');
$router->post('/siri_penilaian/listByUrusetiaSiriPenilaian', 'pen_siri_penilaianController@listByUrusetiaSiriPenilaian');
$router->get('/siri_penilaian/listAll', 'pen_siri_penilaianController@listAll');
$router->post('/siri_penilaian/update', 'pen_siri_penilaianController@update'); //setting tambah baru
$router->post('/siri_penilaian/updateKeterbukaan', 'pen_siri_penilaianController@updateKeterbukaan'); //setting tambah baru
$router->post('/siri_penilaian/updateGred', 'pen_siri_penilaianController@updateGred'); //setting tambah baru
$router->post('/siri_penilaian/updateTemplateEmel', 'pen_siri_penilaianController@updateTemplateEmel'); //setting tambah baru
$router->post('/siri_penilaian/updateUrusetia', 'pen_siri_penilaianController@updateUrusetia'); //setting tambah baru
$router->post('/siri_penilaian/delete', 'pen_siri_penilaianController@delete');

// pen_penyelaras api
$router->post('/penyelaras/add', 'pen_penyelarasController@register');
$router->post('/penyelaras/show', 'pen_penyelarasController@show');
$router->get('/penyelaras/showGetIc/{no_kad_pengenalan}', 'pen_penyelarasController@showGetIc');
$router->get('/penyelaras/list', 'pen_penyelarasController@list');
$router->post('/penyelaras/listByKluster', 'pen_penyelarasController@listByKluster');
$router->post('/penyelaras/listKlusterByPenyelaras', 'pen_penyelarasController@listKlusterByPenyelaras');
$router->get('/penyelaras/listAll', 'pen_penyelarasController@listAll');
$router->post('/penyelaras/update', 'pen_penyelarasController@update'); //setting tambah baru
$router->post('/penyelaras/delete', 'pen_penyelarasController@delete');

// pen_urusetia api
$router->post('/urusetia/add', 'pen_urusetiaController@register');
$router->post('/urusetia/show', 'pen_urusetiaController@show');
$router->post('/urusetia/showByPenilaian', 'pen_urusetiaController@showByPenilaian');
$router->post('/urusetia/showBySiriPenilaian', 'pen_urusetiaController@showBySiriPenilaian');
$router->post('/urusetia/showJKBySiriPenilaian', 'pen_urusetiaController@showJKBySiriPenilaian');
$router->get('/urusetia/list', 'pen_urusetiaController@list');
$router->post('/urusetia/listBySiriPenilaian', 'pen_urusetiaController@listBySiriPenilaian');
$router->post('/urusetia/listSiriPenilaian', 'pen_urusetiaController@listSiriPenilaian');
$router->post('/urusetia/listByPenilaian', 'pen_urusetiaController@listByPenilaian');
$router->post('/urusetia/listPenilaianByUrusetia', 'pen_urusetiaController@listPenilaianByUrusetia');
$router->get('/urusetia/listAll', 'pen_urusetiaController@listAll');
$router->post('/urusetia/update', 'pen_urusetiaController@update'); //setting tambah baru
$router->post('/urusetia/delete', 'pen_urusetiaController@delete');
$router->post('/urusetia/permDelete', 'pen_urusetiaController@permDelete');
$router->post('/urusetia/permDeleteUsersSiri', 'pen_urusetiaController@permDeleteUsersSiri');

// pen_kategori_urusetia api
$router->post('/kategori_urusetia/add', 'pen_kategori_urusetiaController@register');
$router->post('/kategori_urusetia/show', 'pen_kategori_urusetiaController@show');
$router->get('/kategori_urusetia/list', 'pen_kategori_urusetiaController@list');
$router->get('/kategori_urusetia/listAll', 'pen_kategori_urusetiaController@listAll');
$router->post('/kategori_urusetia/update', 'pen_kategori_urusetiaController@update'); //setting tambah baru
$router->post('/kategori_urusetia/delete', 'pen_kategori_urusetiaController@delete');

//MIMI 26042022
// $router->get('/fasiliti_status/list', 'pen_statusController@list');

//tetapan status
$router->post('tetapan_status/add','pen_statusController@register');
$router->post('tetapan_status/view','pen_statusController@show');
$router->get('tetapan_status/list','pen_statusController@list');
$router->post('tetapan_status/update','pen_statusController@update');
$router->post('tetapan_status/delete','pen_statusController@delete');

//tetapan status tempahan
$router->post('tetapan_status_tempahan/add','pen_status_tempController@register');
$router->post('tetapan_status_tempahan/view','pen_status_tempController@show');
$router->get('tetapan_status_tempahan/list','pen_status_tempController@list');
$router->post('tetapan_status_tempahan/update','pen_status_tempController@update');
$router->post('tetapan_status_tempahan/delete','pen_status_tempController@delete');

// AMRI 21062022
$router->post('/fasiliti_agensi/list', 'pen_agensiController@list');
$router->post('/fasiliti_agensi/listCheck', 'pen_agensiController@listCheck');
$router->post('/fasiliti_agensi/listCheckNama', 'pen_agensiController@listCheckNama');
$router->post('/fasiliti_agensi/view', 'pen_agensiController@show');
$router->post('/fasiliti_agensi/viewKod', 'pen_agensiController@showKod');
$router->post('/fasiliti_agensi/update', 'pen_agensiController@update'); //setting tambah baru
$router->post('/fasiliti_agensi/delete', 'pen_agensiController@delete');

//pen_jenis_soalan AzizZ 20220929
$router->get('/jenis_soalan/list', 'pen_jenis_soalanController@list');
$router->post('/jenis_soalan/view', 'pen_jenis_soalanController@show');
$router->post('/jenis_soalan/create', 'pen_jenis_soalanController@create');
$router->post('/jenis_soalan/update', 'pen_jenis_soalanController@update');
$router->post('/jenis_soalan/delete', 'pen_jenis_soalanController@delete');

//pen_bank_soalan AzizZ 20220929
$router->get('/banksoalan/listNoInfodetails/{id}', 'pen_bank_soalanController@listNoInfodetails');
$router->get('/banksoalan/list/{id}', 'pen_bank_soalanController@list');
$router->post('/banksoalan/list/deselect', 'pen_bank_soalanController@deselectList');
$router->get('/banksoalan/listByInfodetail/{id}', 'pen_bank_soalanController@listByInfodetail');
$router->post('/banksoalan/view', 'pen_bank_soalanController@show');
$router->post('/banksoalan/add', 'pen_bank_soalanController@create');
$router->post('/banksoalan/update', 'pen_bank_soalanController@update');
$router->post('/banksoalan/delete', 'pen_bank_soalanController@delete');

//pen_siri_soalan AzizZ 20221013
$router->get('/sirisoalan/list/{id}', 'pen_siri_soalanController@list');
$router->post('/sirisoalan/view', 'pen_siri_soalanController@show');
$router->post('/sirisoalan/listAllSoalan', 'pen_siri_soalanController@listAllSoalan');
$router->post('/sirisoalan/infodetail/view', 'pen_siri_soalanController@showInfodetails');
$router->post('/sirisoalan/add', 'pen_siri_soalanController@create');
$router->post('/sirisoalan/add/siri', 'pen_siri_soalanController@create_new');
$router->post('/sirisoalan/updateMark', 'pen_siri_soalanController@updateMark');
$router->post('/sirisoalan/updateSkema', 'pen_siri_soalanController@updateSkema');
$router->post('/sirisoalan/delete', 'pen_siri_soalanController@delete');
$router->post('/sirisoalan/infodetails/delete', 'pen_siri_soalanController@delete_infodetails');
$router->post('/sirisoalan/random', 'pen_siri_soalanController@listRandom');

//pen_siri_soalan AzizZ 20221013
$router->get('/setsoalan/list/{id}', 'pen_set_soalanController@list');
$router->post('/setsoalan/view', 'pen_set_soalanController@show');
$router->post('/setsoalan/viewKodSet', 'pen_set_soalanController@showKodSet');
$router->post('/setsoalan/add', 'pen_set_soalanController@create');
$router->post('/setsoalan/update', 'pen_set_soalanController@update');
$router->post('/setsoalan/updatePeratusSet', 'pen_set_soalanController@updatePeratusSet');
$router->post('/setsoalan/approval', 'pen_set_soalanController@approval');
$router->post('/setsoalan/delete', 'pen_set_soalanController@delete');
$router->post('/setsoalan/uptJK', 'pen_set_soalanController@uptJK');
$router->post('/setsoalan/getJenisPengesahan', 'pen_set_soalanController@getJenisPengesahan');

//pen_data_calon mimi 18052022
$router->get('/data/list', 'pen_data_calonController@list');

//pen_muka_depan mimi 26102022
$router->post('/muka_depan/view', 'pen_muka_depanController@show');
$router->post('/muka_depan/add', 'pen_muka_depanController@create');
$router->post('/muka_depan/update', 'pen_muka_depanController@update');
$router->post('/muka_depan/data_calon', 'pen_muka_depanController@uptDataCalon');

//pen_permohonan_penilaian amri 15112022
$router->post('/permohonan_penilaian/register', 'pen_permohonan_penilaianController@create');
$router->post('/permohonan_penilaian/view', 'pen_permohonan_penilaianController@show');
$router->post('/permohonan_penilaian/showBySesi', 'pen_permohonan_penilaianController@showBySesi');
$router->post('/permohonan_penilaian/listBySiriPenilaian', 'pen_permohonan_penilaianController@listBySiriPenilaian');
$router->post('/permohonan_penilaian/listByKP', 'pen_permohonan_penilaianController@listByKP');
$router->post('/permohonan_penilaian/update', 'pen_permohonan_penilaianController@update');
$router->post('/permohonan_penilaian/approval', 'pen_permohonan_penilaianController@approval');
$router->post('/permohonan_penilaian/data_calon', 'pen_permohonan_penilaianController@uptDataCalon');

//pen_permohonan_penilaian amri 15112022
$router->get('/calonSoalanGetIc/{no_kad_pengenalan}/{FK_siri_penilaian}', 'pen_calon_soalanController@showGetIc');
$router->post('/calon_soalan/register', 'pen_calon_soalanController@create');
$router->post('/calon_soalan/delete', 'pen_calon_soalanController@delete');
$router->post('/calon_soalan/deleteBySesi', 'pen_calon_soalanController@deleteBySesi');
$router->post('/calon_soalan/view', 'pen_calon_soalanController@show');
$router->post('/calon_soalan/showCalon', 'pen_calon_soalanController@showCalon');
$router->post('/calon_soalan/showCalonJsonList', 'pen_calon_soalanController@showCalonJsonList');
$router->post('/calon_soalan/showBySiriPenilaian', 'pen_calon_soalanController@showBySiriPenilaian');
$router->post('/calon_soalan/showBySesi', 'pen_calon_soalanController@showBySesi');
$router->post('/calon_soalan/listBySiriPenilaian', 'pen_calon_soalanController@listBySiriPenilaian');
$router->post('/calon_soalan/listByKP', 'pen_calon_soalanController@listByKP');
$router->post('/calon_soalan/keputusanListByKP', 'pen_calon_soalanController@keputusanListByKP');
$router->post('/calon_soalan/update', 'pen_calon_soalanController@update');
$router->post('/calon_soalan/updateMarkahAkhir', 'pen_calon_soalanController@updateMarkahAkhir');
$router->post('/calon_soalan/updateImage', 'pen_calon_soalanController@updateImage');
$router->post('/calon_soalan/approval', 'pen_calon_soalanController@approval');
$router->post('/calon_soalan/data_calon', 'pen_calon_soalanController@uptDataCalon');
$router->post('/calon_soalan/blastEmail', 'pen_calon_soalanController@blastEmail');
$router->post('/calon_soalan/calonEmail', 'pen_calon_soalanController@calonEmail');
$router->get('/calon_soalan/calonEmailKeputusan/{id_calon_soalan}', 'pen_calon_soalanController@calonEmailKeputusan');
$router->post('/calon_soalan/getMarkah', 'pen_calon_soalanController@getMarkah');
$router->post('/calon_soalan/removeToken', 'pen_calon_soalanController@removeToken');

$router->post('/calon_jawapan/register', 'pen_calon_jawapanController@create');
$router->post('/calon_jawapan/listAllJawapan', 'pen_calon_jawapanController@listAllJawapan');
$router->post('/calon_jawapan/listAllJawapanNoSiriPenilaian', 'pen_calon_jawapanController@listAllJawapanNoSiriPenilaian');
$router->post('/calon_jawapan/uploadFile', 'pen_calon_jawapanController@uploadFile');
$router->post('/calon_jawapan/updateMarks', 'pen_calon_jawapanController@updateMarks');
$router->post('/calon_jawapan/list134', 'pen_calon_jawapanController@list134');
$router->post('/calon_jawapan/list134ByCalon', 'pen_calon_jawapanController@list134ByCalon');
$router->post('/calon_jawapan/listSumMarkahJawapan', 'pen_calon_jawapanController@listSumMarkahJawapan');
$router->post('/calon_jawapan/listSumMarkahJawapanByCalon', 'pen_calon_jawapanController@listSumMarkahJawapanByCalon');

//pen_sesi_siri_penilaian MIMI 15112022
$router->post('/sesi_siri_penilaian/register', 'pen_sesi_siri_penilaianController@register');
$router->get('/sesi_siri_penilaian/list/{id}', 'pen_sesi_siri_penilaianController@list');
$router->get('/sesi_siri_penilaian/listSet/{id_set}', 'pen_sesi_siri_penilaianController@listSet');
$router->get('/sesi_siri_penilaian/listKluster/{FK_kluster}', 'pen_sesi_siri_penilaianController@listKluster');
$router->get('/sesi_siri_penilaian/listPenyelaras/{FK_penyelaras}', 'pen_sesi_siri_penilaianController@listPenyelaras');
$router->get('/sesi_siri_penilaian/listUrusetia/{FK_users}', 'pen_sesi_siri_penilaianController@listUrusetia');
$router->get('/sesi_siri_penilaian/listAll', 'pen_sesi_siri_penilaianController@listAll');
$router->post('/sesi_siri_penilaian/view', 'pen_sesi_siri_penilaianController@show');
$router->post('/sesi_siri_penilaian/viewPautan', 'pen_sesi_siri_penilaianController@showPautan');
$router->post('/sesi_siri_penilaian/add', 'pen_sesi_siri_penilaianController@create');
$router->post('/sesi_siri_penilaian/delete', 'pen_sesi_siri_penilaianController@delete');
$router->get('/sesi_siri_penilaian/listByTarikhMohonOpen', 'pen_sesi_siri_penilaianController@listByTarikhMohonOpen');
$router->post('/sesi_siri_penilaian/update', 'pen_sesi_siri_penilaianController@update');
$router->post('/sesi_siri_penilaian/updateBilCalon', 'pen_sesi_siri_penilaianController@updateBilCalon');
$router->post('/sesi_siri_penilaian/updateSenaraiSet', 'pen_sesi_siri_penilaianController@updateSenaraiSet');

//pen_mod_penilaian MIMI 15112022
$router->get('/mod_penilaian/list', 'pen_mod_penilaianController@list');
$router->post('/mod_penilaian/view', 'pen_mod_penilaianController@show');

//pen_tetapan_masa MIMI 15112022
$router->get('/tetapan_masa/list', 'pen_tetapan_masaController@list');
$router->post('/tetapan_masa/view', 'pen_tetapan_masaController@show');


$router->post('/infodetails/add', 'pen_infodetailsController@create');
$router->post('/infodetails/update', 'pen_infodetailsController@update');
$router->post('/infodetails/view', 'pen_infodetailsController@show');