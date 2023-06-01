<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_permohonan_penilaian;
use App\Models\pen_users;

class pen_permohonan_penilaianController extends Controller
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

    public function create(Request $request){
        $no_kad_pengenalan  = $request->input('no_kad_pengenalan');
        $FK_siri_penilaian  = $request->input('FK_siri_penilaian');
        $created_by  = $request->input('created_by');

        $obj_search = pen_permohonan_penilaian::where('no_kad_pengenalan', $no_kad_pengenalan) -> where('FK_siri_penilaian', $FK_siri_penilaian) -> first();

        if ($obj_search){
            return response()->json([
                'success'=>false,
                'message'=>'Permohonan Gagal!',
                'data'=>''
            ],401);
        } else{
            $data = [
                'no_kad_pengenalan' => $no_kad_pengenalan,
                'FK_siri_penilaian' => $FK_siri_penilaian,
                'created_by' => $created_by,
                'updated_by' => $created_by,
            ];
    
            $obj = pen_permohonan_penilaian::create($data);

            $id = $obj->id;

            if ($obj)   {
                return response()->json([
                    'success'=>true,
                    'message'=>'Permohonan Berjaya!',
                    'data'=>$obj,
                ],201);
            } else {
                return response()->json([
                    'success'=>false,
                    'message'=>'Permohonan Gagal!',
                    'data'=>''
                ],401);
            }
        }
    }

    public function update(Request $request){
        $id_set_soalan      = $request->input('id_set_soalan');
        $json_list          = $request->input('json_list');

        $data = [
            'json_list' => $json_list
        ];

        $obj = pen_permohonan_penilaian::where('id_set_soalan',$id_set_soalan)->update($data);
        
        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Kemaskini Set Soalan Berjaya!',
                'data'=>$obj
            ],202);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Kemaskini Set Soalan Gagal!',
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

        $obj = pen_permohonan_penilaian::where(DB::RAW("MD5(id_permohonan_penilaian)"),$id_permohonan_penilaian)->update($data);
        
        if ($obj)   {
            $obj = pen_permohonan_penilaian::leftjoin('pen_users', 'pen_users.no_kad_pengenalan', 'pen_permohonan_penilaian.no_kad_pengenalan')
            ->where(DB::RAW("MD5(id_permohonan_penilaian)"),$id_permohonan_penilaian)->first([
                // 'no_kad_pengenalan',
                'pen_users.nama',
                'pen_users.no_kad_pengenalan',
                'pen_users.notel',
                'pen_users.emel',
                'pen_users.emel_kerajaan',
                'pen_users.emel_majikan',
                'pen_users.FK_jenis_pengguna',
                'pen_users.nama_jawatan',
                'pen_users.skim',
                'pen_permohonan_penilaian.status_permohonan',
                'FK_siri_penilaian',
            ]);
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
        $id_set_soalan = $request->input('id_set_soalan');

        $obj = pen_permohonan_penilaian::where('id_set_soalan',$id_set_soalan)->first();

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Set Soalan Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Set Soalan Gagal!',
                'data'=>''
            ],404);
        }
    }

    public function list($id){

        $obj = pen_permohonan_penilaian::where('FK_siri_penilaian',$id)
        ->orderBy('kod_set', 'ASC')
        ->get();

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Set Soalan Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Set Soalan Gagal!',
                'data'=>''
            ],404);
        }
    }

    public function showBySesi(Request $request){
        $FK_sesi = $request->input('FK_sesi');
        $obj = pen_permohonan_penilaian::where('FK_sesi',$FK_sesi)
        ->first();

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Show Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Show Gagal!',
                'data'=>''
            ],400);
        }
    }

    public function listBySiriPenilaian(Request $request){
        $FK_siri_penilaian = $request->input('FK_siri_penilaian');

        $obj = pen_permohonan_penilaian::leftjoin('pen_users', 'pen_users.no_kad_pengenalan', 'pen_permohonan_penilaian.no_kad_pengenalan')
                                        ->where('FK_siri_penilaian',$FK_siri_penilaian)
                                        ->get([
                                            DB::RAW("MD5(id_permohonan_penilaian) AS enc_id_permohonan_penilaian"),
                                            'pen_users.nama',
                                            'pen_users.no_kad_pengenalan',
                                            'pen_users.notel',
                                            'pen_users.emel',
                                            'pen_users.emel_kerajaan',
                                            'pen_users.emel_majikan',
                                            'pen_users.FK_jenis_pengguna',
                                            'pen_users.nama_jawatan',
                                            'pen_users.skim',
                                            'pen_permohonan_penilaian.status_permohonan'
                                        ]);

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Set Soalan Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Set Soalan Gagal!',
                'data'=>''
            ],404);
        }
    }

    public function listByKP(Request $request){
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');

        $obj = pen_permohonan_penilaian::leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', 'pen_permohonan_penilaian.FK_siri_penilaian')
                                        ->leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', 'pen_siri_penilaian.FK_penilaian')
                                        ->where('no_kad_pengenalan',$no_kad_pengenalan)
                                        ->get([
                                            'id_permohonan_penilaian',
                                            'pen_penilaian.nama_penilaian',
                                            'pen_siri_penilaian.kod_siri_penilaian',
                                            'pen_siri_penilaian.tarikh_penilaian',
                                            'pen_siri_penilaian.created_at',
                                            'pen_permohonan_penilaian.status_permohonan'
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
        $id_set_soalan = $request->input('id_set_soalan');

        $obj = pen_permohonan_penilaian::where('id_set_soalan',$id_set_soalan)->delete();

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Set Soalan Hapus!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Hapus Set Soalan Gagal!',
                'data'=>''
            ],404);
        }
    }
}
