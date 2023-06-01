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
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('key', function () {
    return MD5('ASDCM-PROTIGAT');
});

$router->post('/jenis_fasiliti/register', 'jenis_fasController@register');
$router->get('/jenis_fasiliti/list', 'jenis_fasController@list');
$router->post('/jenis_fasiliti/update', 'jenis_fasController@update'); 
$router->post('/jenis_fasiliti/delete', 'jenis_fasController@delete');
$router->get('/jenis_fasiliti/{id}', 'jenis_fasController@show');

$router->post('/fasiliti_bilik/register', 'pen_blkController@register');
$router->get('/fasiliti_bilik/list', 'pen_blkController@list');
$router->post('/fasiliti_bilik/update', 'pen_blkController@update'); 
$router->post('/fasiliti_bilik/delete', 'pen_blkController@delete');
$router->get('/fasiliti_bilik/{id}', 'pen_blkController@show');

$router->post('/fasiliti_sajian/register', 'pen_sjnController@register');
$router->get('/fasiliti_sajian/list', 'pen_sjnController@list');
$router->post('/fasiliti_sajian/update', 'pen_sjnController@update'); 
$router->post('/fasiliti_sajian/delete', 'pen_sjnController@delete');
$router->get('/fasiliti_sajian/{id}', 'pen_sjnController@show');

$router->post('/fasiliti_dewan/register', 'pen_dwnController@register');
$router->get('/fasiliti_dewan/list', 'pen_dwnController@list');
$router->post('/fasiliti_dewan/update', 'pen_dwnController@update'); 
$router->post('/fasiliti_dewan/delete', 'pen_dwnController@delete');
$router->get('/fasiliti_dewan/{id}', 'pen_dwnController@show');

$router->post('/fasiliti_makmal/register', 'pen_mklController@register');
$router->get('/fasiliti_makmal/list', 'pen_mklController@list');
$router->post('/fasiliti_makmal/update', 'pen_mklController@update'); 
$router->post('/fasiliti_makmal/delete', 'pen_mklController@delete');
$router->get('/fasiliti_makmal/{id}', 'pen_mklController@show');

$router->post('/fasiliti_kenderaan/register', 'pen_kdnController@register');
$router->get('/fasiliti_kenderaan/list', 'pen_kdnController@list');
$router->post('/fasiliti_kenderaan/update', 'pen_kdnController@update'); 
$router->post('/fasiliti_kenderaan/delete', 'pen_kdnController@delete');
$router->get('/fasiliti_kenderaan/{id}', 'pen_kdnController@show');

$router->post('/fasiliti_asrama/register', 'pen_asrController@register');
$router->get('/fasiliti_asrama/list', 'pen_asrController@list');
$router->post('/fasiliti_asrama/update', 'pen_asrController@update'); 
$router->post('/fasiliti_asrama/delete', 'pen_asrController@delete');
$router->get('/fasiliti_asrama/{id}', 'pen_asrController@show');

$router->post('/fasiliti_sukan/register', 'pen_sknController@register');
$router->get('/fasiliti_sukan/list', 'pen_sknController@list');
$router->post('/fasiliti_sukan/update', 'pen_sknController@update'); 
$router->post('/fasiliti_sukan/delete', 'pen_sknController@delete');
$router->get('/fasiliti_sukan/{id}', 'pen_sknController@show');

$router->post('/fasiliti_asrama_bilik/register', 'pen_asr_bilikController@register');
$router->get('/fasiliti_asrama_bilik/list', 'pen_asr_bilikController@list');
$router->post('/fasiliti_asrama_bilik/update', 'pen_asr_bilikController@update');
$router->post('/fasiliti_asrama_bilik/delete', 'pen_asr_bilikController@delete');
$router->get('/fasiliti_asrama_bilik/{id}', 'pen_asr_bilikController@show');

$router->post('/fasiliti_asrama_blok/register', 'pen_asr_blokController@register');
$router->get('/fasiliti_asrama_blok/list', 'pen_asr_blokController@list');
$router->post('/fasiliti_asrama_blok/update', 'pen_asr_blokController@update');
$router->post('/fasiliti_asrama_blok/delete', 'pen_asr_blokController@delete');
$router->get('/fasiliti_asrama_blok/{id}', 'pen_asr_blokController@show');

$router->post('/jenis_bilik_asrama/register', 'jenis_bilik_asramaController@register');
$router->get('/jenis_bilik_asrama/list', 'jenis_bilik_asramaController@list');
$router->post('/jenis_bilik_asrama/update', 'jenis_bilik_asramaController@update');
$router->post('/jenis_bilik_asrama/delete', 'jenis_bilik_asramaController@delete');
$router->get('/jenis_bilik_asrama/{id}', 'jenis_bilik_asramaController@show');

$router->post('/polisi_jenis_fasiliti/register', 'polisi_jenis_fasController@register');
$router->get('/polisi_jenis_fasiliti/list', 'polisi_jenis_fasController@list');
$router->post('/polisi_jenis_fasiliti/update', 'polisi_jenis_fasController@update');
$router->post('/polisi_jenis_fasiliti/delete', 'polisi_jenis_fasController@delete');
$router->get('/polisi_jenis_fasiliti/{id}', 'polisi_jenis_fasController@show');

$router->post('/fasiliti_makmal_detail/register', 'pen_mkl_detController@register');
$router->get('/fasiliti_makmal_detail/list', 'pen_mkl_detController@list');
$router->post('/fasiliti_makmal_detail/update', 'pen_mkl_detController@update');
$router->post('/fasiliti_makmal_detail/delete', 'pen_mkl_detController@delete');
$router->get('/fasiliti_makmal_detail/{id}', 'pen_mkl_detController@show');

$router->post('/tempahan_detail/register', 'tempahan_detailController@register');
$router->get('/tempahan_detail/list', 'tempahan_detailController@list');
$router->get('/tempahan_detail/{id}', 'tempahan_detailController@show');

//MIMI 26042022
$router->get('/fasiliti_status/list', 'pen_statusController@list');





