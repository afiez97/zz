<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_calon_jawapan;
use App\Models\pen_users;

class pen_calon_jawapanController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getToken($id)  {
        $salt = "RMY7nZ3+s8xpU1n0O*0o_EGfdoYtd|iU_AzhKCMoSu_xhh-e|~y8FOG*-xLZ";
        $token     = hash("sha256", Str::random(32).$salt);
        $obj = pen_users::where('id_users',$id)->update([
            'token' => $token
        ]);

        $token = false;

        if($obj){
            $obj = pen_users::where('id_users',$id)->first(['token']);
            $random = hash("sha256", Str::random(32)).'0L1v3';
            $token = $random.$obj->token;
        }

        return $token;
    }

    public function getTokenPenilaian($id)  {
        $salt = "RMY7nZ3+s8xpU1n0O*0o_EGfdoYtd|iU_AzhKCMoSu_xhh-e|~y8FOG*-xLZ";
        $token     = hash("sha256", Str::random(32).$salt);
        $obj = pen_calon_jawapan::where('id_calon_jawapan',$id)->update([
            'token' => $token
        ]);

        $token = false;

        if($obj){
            $obj = pen_calon_jawapan::where('id_calon_jawapan',$id)->first(['token']);
            $random = hash("sha256", Str::random(32)).'0L1v3';
            $token = $random.$obj->token;
        }

        return $token;
    }

    public function showGetIc($no_kad_pengenalan, $FK_siri_penilaian)  {
        $obj = pen_calon_jawapan::leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', 'pen_calon_jawapan.FK_siri_penilaian') -> 
                                leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', 'pen_siri_penilaian.FK_penilaian') -> 
                                where('no_kad_pengenalan',$no_kad_pengenalan)->
                                where('FK_siri_penilaian',$FK_siri_penilaian)->
                                where('pen_calon_jawapan.statusrekod','1')->
                                first([
                                    'id_calon_jawapan',
                                    'no_kad_pengenalan',                                            
                                    'nama',
                                    'pen_calon_jawapan.gred',
                                    'jawatan',
                                    'emel',
                                    'no_angka_giliran',
                                    'json_list',
                                    'id_siri_penilaian',
                                    'kod_siri_penilaian',
                                    'tarikh_penilaian',
                                    'waktu_mula',
                                    'waktu_tamat',
                                    'kod_penilaian',
                                    'nama_penilaian',
                                ]);
        if ($obj)   {
            $token = $this->getTokenPenilaian($obj->id_calon_jawapan);
            return response()->json([
                'success'=>true,
                'message'=>'Show Success!',
                'data'=>$obj,
                'token'=>$token
            ],200);
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>"No Data!",
                'data'=>''
            ],400);
        }
    }

    public function create(Request $request){
        $FK_calon_soalan  = $request->input('FK_calon_soalan');
        $no_kad_pengenalan  = $request->input('no_kad_pengenalan');
        $FK_siri_soalan  = $request->input('FK_siri_soalan');
        $jawapan  = $request->input('jawapan');
        $FK_siri_penilaian  = $request->input('FK_siri_penilaian');
        $created_by  = $request->input('no_kad_pengenalan');

        $obj = pen_calon_jawapan::where('FK_siri_penilaian', $FK_siri_penilaian)->
                                    where('FK_calon_soalan', $FK_calon_soalan)->
                                    where('no_kad_pengenalan', $no_kad_pengenalan)->
                                    where('FK_siri_soalan', $FK_siri_soalan);
        
        $objSearch = $obj -> first();

        if ($objSearch){
            $data = [
                'updated_by' => $created_by,
            ];

            if ($jawapan != ''){
                $data['jawapan'] = $jawapan;
            }
            $obj = $obj -> update($data);

            if ($obj)   {
                // $token = $this->getToken($created_by);
                return response()->json([
                    'success'=>true,
                    'message'=>'Simpan Jawapan Berjaya!',
                    'data'=>0
                ],201);
            } else {
                return response()->json([
                    'success'=>false,
                    'message'=>'Simpan Jawapan Gagal!',
                    'data'=>''
                ],400);
            }
        } else{
            $data = [
                'FK_calon_soalan' => $FK_calon_soalan,
                'no_kad_pengenalan' => $no_kad_pengenalan,
                'FK_siri_soalan' => $FK_siri_soalan,
                'jawapan' => $jawapan,
                'FK_siri_penilaian' => $FK_siri_penilaian,
                'created_by' => $created_by,
                'updated_by' => $created_by,
            ];
    
            $obj = pen_calon_jawapan::create($data);

            $id = $obj->id;

            if ($obj)   {
                // $token = $this->getToken($created_by);
                return response()->json([
                    'success'=>true,
                    'message'=>'Simpan Jawapan Berjaya!',
                    'data'=>1
                ],201);
            } else {
                return response()->json([
                    'success'=>false,
                    'message'=>'Simpan Jawapan Gagal!',
                    'data'=>''
                ],401);
            }
        }
    }

    public function update(Request $request){
        $id_set_jawapan      = $request->input('id_set_jawapan');
        $json_list          = $request->input('json_list');

        $data = [
            'json_list' => $json_list
        ];

        $obj = pen_calon_jawapan::where('id_set_jawapan',$id_set_jawapan)->update($data);
        
        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Kemaskini Set jawapan Berjaya!',
                'data'=>$obj
            ],202);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Kemaskini Set jawapan Gagal!',
                'data'=>''
            ],400);
        }
    }

    public function listAllJawapan(Request $request){
        $FK_calon_soalan = $request->input('FK_calon_soalan');
        $FK_siri_penilaian = $request->input('FK_siri_penilaian');

        $obj = pen_calon_jawapan::where('FK_calon_soalan',$FK_calon_soalan)->where('FK_siri_penilaian',$FK_siri_penilaian);

        $obj = $obj -> get();

        // dd($obj)

        if (sizeof($obj)>0)   {
            return response()->json([
                'success'=>true,
                'message'=>'Paparan Data Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Paparan Data Tiada!',
                'data'=>''
            ],200);
        }
    }

    public function listAllJawapanNoSiriPeilaian(Request $request){
        $FK_calon_soalan = $request->input('FK_calon_soalan');
        // $FK_siri_penilaian = $request->input('FK_siri_penilaian');

        $obj = pen_calon_jawapan::where('FK_calon_soalan',$FK_calon_soalan);
        // ->where('FK_siri_penilaian',$FK_siri_penilaian);

        $obj = $obj -> get();

        // dd($obj)

        if (sizeof($obj)>0)   {
            return response()->json([
                'success'=>true,
                'message'=>'Paparan Data Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Paparan Data Tiada!',
                'data'=>''
            ],200);
        }
    }

    public function list134(Request $request){
        $FK_sesi = $request->input('FK_sesi');

        $obj = pen_calon_jawapan::  leftjoin('pen_calon_soalan','id_calon_soalan','FK_calon_soalan')->
                                    leftjoin('pen_siri_soalan','PK_siri_soalan','FK_siri_soalan')->
                                    where('FK_sesi',$FK_sesi)->
                                    where(function($q){
                                        $q->orWhere('FK_jenis_soalan','1');
                                        $q->orWhere('FK_jenis_soalan','3');
                                        $q->orWhere('FK_jenis_soalan','4');
                                    });
        $obj = $obj ->  get([
                            'FK_jenis_soalan',
                            'pen_siri_soalan.jawapan AS jawapan',
                            'pen_calon_jawapan.jawapan AS jawapan_calon',
                            'skema',
                            'mark',
                            'id_calon_jawapan',
                        ]);

        if (sizeof($obj)>0)   {
            return response()->json([
                'success'=>true,
                'message'=>'Paparan Data Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Paparan Data Tiada!',
                'data'=>''
            ],400);
        }
    }

    public function list134ByCalon(Request $request){
        $FK_calon_soalan = $request->input('FK_calon_soalan');

        $obj = pen_calon_jawapan::  leftjoin('pen_calon_soalan','id_calon_soalan','FK_calon_soalan')->
                                    leftjoin('pen_siri_soalan','PK_siri_soalan','FK_siri_soalan')->
                                    where('pen_calon_jawapan.FK_calon_soalan',$FK_calon_soalan)->
                                    where(function($q){
                                        $q->orWhere('FK_jenis_soalan','1');
                                        $q->orWhere('FK_jenis_soalan','3');
                                        $q->orWhere('FK_jenis_soalan','4');
                                    });
        $obj = $obj ->  get([
                            'FK_jenis_soalan',
                            'pen_siri_soalan.jawapan AS jawapan',
                            'pen_calon_jawapan.jawapan AS jawapan_calon',
                            'skema',
                            'mark',
                            'id_calon_jawapan',
                        ]);

        if (sizeof($obj)>0)   {
            return response()->json([
                'success'=>true,
                'message'=>'Paparan Data Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Paparan Data Tiada!',
                'data'=>''
            ],400);
        }
    }

    public function listSumMarkahJawapan(Request $request){
        $FK_sesi = $request->input('FK_sesi');

        $obj = pen_calon_jawapan::  leftjoin('pen_calon_soalan','id_calon_soalan','FK_calon_soalan')->
                                    leftjoin('pen_siri_soalan','PK_siri_soalan','FK_siri_soalan')->
                                    where('FK_sesi',$FK_sesi)->
                                    groupBy('FK_calon_soalan');
        $obj = $obj ->  get([
                            'FK_calon_soalan',
                            DB::RAW("SUM(markah_jawapan) AS markah_jawapan")
                        ]);

        if (sizeof($obj)>0)   {
            return response()->json([
                'success'=>true,
                'message'=>'Paparan Data Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Paparan Data Tiada!',
                'data'=>''
            ],400);
        }
    }

    public function listSumMarkahJawapanByCalon(Request $request){
        $FK_calon_soalan = $request->input('FK_calon_soalan');

        $obj = pen_calon_jawapan::  leftjoin('pen_calon_soalan','id_calon_soalan','FK_calon_soalan')->
                                    leftjoin('pen_siri_soalan','PK_siri_soalan','FK_siri_soalan')->
                                    where('pen_calon_jawapan.FK_calon_soalan',$FK_calon_soalan)->
                                    groupBy('FK_calon_soalan');
        $obj = $obj ->  get([
                            'FK_calon_soalan',
                            DB::RAW("SUM(markah_jawapan) AS markah_jawapan")
                        ]);

        if (sizeof($obj)>0)   {
            return response()->json([
                'success'=>true,
                'message'=>'Paparan Data Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Paparan Data Tiada!',
                'data'=>''
            ],400);
        }
    }

    public function uploadFile(Request $request){
        $bil = $request->input('bil');
        $FK_calon_soalan  = $request->input('FK_calon_soalan');
        $no_kad_pengenalan  = $request->input('no_kad_pengenalan');
        $FK_siri_soalan  = $request->input('FK_siri_soalan');
        $FK_siri_penilaian = $request->input('FK_siri_penilaian');

        if($request->file('file') != null){
            $fileName = $request->file('file')->getClientOriginalName();
            $fileName = $bil . '_' . $FK_calon_soalan . '_' . $no_kad_pengenalan . '_' . $FK_siri_soalan . '_' . $FK_siri_penilaian . '_' . $fileName;

            $path = 'uploads_jawapan';
            $destinationPath = $path; // upload path

            $request->file('file')->move($destinationPath, $fileName);
        }

        return response()->json([
            'success'=>true,
            'message'=>'Paparan Data Berjaya!',
            'data'=>$fileName
        ],200);
    }

    public function updateMarks(Request $request){
        $id_calon_jawapan   = $request->input('id_calon_jawapan');
        $markah_jawapan     = $request->input('markah_jawapan');

        $data = [
            'markah_jawapan' => $markah_jawapan,
            'flag_markah' => 'DONE',
        ];

        $obj = pen_calon_jawapan::where('id_calon_jawapan',$id_calon_jawapan)->update($data);
        
        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$obj
            ],202);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Gagal!',
                'data'=>''
            ],400);
        }
    }

    public function approval(Request $request){
        $id_permohonan_penilaian    = $request->input('id_permohonan_penilaian');
        $status_permohonan          = $request->input('status_permohonan');

        $data = [
            'status_permohonan' => $status_permohonan
        ];

        $obj = pen_calon_jawapan::where(DB::RAW("MD5(id_permohonan_penilaian)"),$id_permohonan_penilaian)->update($data);
        
        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$obj
            ],202);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Gagal!',
                'data'=>''
            ],400);
        }
    }

    public function show(Request $request){
        $id_set_jawapan = $request->input('id_set_jawapan');

        $obj = pen_calon_jawapan::where('id_set_jawapan',$id_set_jawapan)->first();

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Set jawapan Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Set jawapan Gagal!',
                'data'=>''
            ],404);
        }
    }

    public function list($id){

        $obj = pen_calon_jawapan::where('FK_siri_penilaian',$id)
        ->orderBy('kod_set', 'ASC')
        ->get();

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Set jawapan Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Set jawapan Gagal!',
                'data'=>''
            ],404);
        }
    }

    public function listBySiriPenilaian(Request $request){
        $FK_siri_penilaian = $request->input('FK_siri_penilaian');

        $obj = pen_calon_jawapan::leftjoin('pen_users', 'pen_users.no_kad_pengenalan', 'pen_calon_jawapan.no_kad_pengenalan')
                                        ->where('pen_calon_jawapan.FK_siri_penilaian',$FK_siri_penilaian)
                                        ->get([
                                            'id_calon_jawapan',
                                            'pen_users.nama',
                                            'pen_users.no_kad_pengenalan',
                                            'pen_users.notel',
                                            'pen_users.emel',
                                            'pen_users.emel_kerajaan',
                                            'pen_users.emel_majikan',
                                            'pen_users.FK_jenis_pengguna',
                                            'pen_users.nama_jawatan',
                                            'pen_users.skim',
                                            'pen_calon_jawapan.json_list',
                                            'pen_calon_jawapan.no_angka_giliran',
                                        ]);

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Set jawapan Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Set jawapan Gagal!',
                'data'=>''
            ],404);
        }
    }

    public function listByKP(Request $request){
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');

        $obj = pen_calon_jawapan::leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', 'pen_calon_jawapan.FK_siri_penilaian')
                                        ->leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', 'pen_siri_penilaian.FK_penilaian')
                                        ->where('no_kad_pengenalan',$no_kad_pengenalan)
                                        ->get([
                                            'id_permohonan_penilaian',
                                            'pen_penilaian.nama_penilaian',
                                            'pen_siri_penilaian.kod_siri_penilaian',
                                            'pen_siri_penilaian.tarikh_penilaian',
                                            'pen_siri_penilaian.created_at',
                                            'pen_calon_jawapan.status_permohonan'
                                        ]);

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Gagal!',
                'data'=>''
            ],404);
        }
    }

    public function delete(Request $request){
        $id_set_jawapan = $request->input('id_set_jawapan');

        $obj = pen_calon_jawapan::where('id_set_jawapan',$id_set_jawapan)->delete();

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Set jawapan Hapus!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Hapus Set jawapan Gagal!',
                'data'=>''
            ],404);
        }
    }
}
