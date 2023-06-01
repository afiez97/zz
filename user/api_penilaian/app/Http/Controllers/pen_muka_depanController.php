<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_users;
use App\Models\pen_muka_depan;

class pen_muka_depanController extends Controller
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

    public function list()  {
        $obj = pen_muka_depan::where('pen_muka_depan.statusrekod','1') -> 
                                    get([
                                        'id_muka_depan', 
                                        'FK_siri_penilaian', 
                                        'nama', 'stat_nama', 
                                        'gred', 'stat_gred', 
                                        'jawatan', 
                                        'stat_jawatan', 
                                        'emel', 
                                        'stat_emel', 
                                        'no_kad_pengenalan', 
                                        'stat_no_kad_pengenalan', 
                                        'no_angka_giliran', 
                                        'stat_no_angka_giliran'
                                    ]);

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'List Success!',
                'data'=>$obj
            ],200);
        } else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
        
    }

    public function show(Request $request)  {
        $id = $request->input('id_siri_penilaian');

        $obj = pen_muka_depan::where('pen_muka_depan.statusrekod','1') -> 
                                    where('FK_siri_penilaian',$id) ->
                                    first([
                                        'id_muka_depan', 
                                        'FK_siri_penilaian', 
                                        'arahan', 
                                        'nama', 'stat_nama', 
                                        'gred', 'stat_gred', 
                                        'jawatan', 
                                        'stat_jawatan', 
                                        'emel', 
                                        'stat_emel', 
                                        'no_kad_pengenalan', 
                                        'stat_no_kad_pengenalan', 
                                        'no_angka_giliran', 
                                        'stat_no_angka_giliran'
                                    ]);

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'List Success!',
                'data'=>$obj
            ],200);
        } else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
        
    }

    public function create(Request $request){

        $FK_siri_penilaian = $request -> input('FK_siri_penilaian');
        $arahan = $request -> input('arahan');
        $updated_by = $request->input('updated_by');

        $obj = pen_muka_depan::create([
            'FK_siri_penilaian' => $FK_siri_penilaian,
            'arahan' => $arahan,
            'created_by' => $updated_by,
            'updated_by' => $updated_by

        ]);

        $obj = $obj->id_muka_depan;

        if($obj){
            return response()->json([
                'success'=>true,
                'message'=>'Pendaftaran Rekod Berjaya!',
                'data'=>$obj,
            ],201);

        }else{
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
    }

    public function update(Request $request){

        $id = $request -> input('id_muka_depan');
        $FK_siri_penilaian = $request -> input('FK_siri_penilaian');
        $arahan = $request -> input('arahan');
        $updated_by = $request->input('updated_by');

        $obj = pen_muka_depan::where('id_muka_depan',$id)  -> update([
            'FK_siri_penilaian' => $FK_siri_penilaian,
            'arahan' => $arahan,
            'updated_by' => $updated_by

        ]);

        if($obj){
            return response()->json([
                'success'=>true,
                'message'=>'Kemaskini Rekod Berjaya!',
                'data'=>$id,
            ],201);

        }else{
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
    }

    public function uptDataCalon(Request $request){

        $id = $request -> input('id_muka_depan');

        $nama                       = $request -> input('nama');
        $stat_nama                  = $request -> input('stat_nama');
        $no_kad_pengenalan          = $request -> input('no_kad_pengenalan');
        $stat_no_kad_pengenalan     = $request -> input('stat_no_kad_pengenalan');
        $gred                       = $request -> input('gred');
        $stat_gred                  = $request -> input('stat_gred');
        $jawatan                    = $request -> input('jawatan');
        $stat_jawatan               = $request -> input('stat_jawatan');
        $no_angka_giliran           = $request -> input('no_angka_giliran');
        $stat_no_angka_giliran      = $request -> input('stat_no_angka_giliran');
        $emel                       = $request -> input('emel');
        $stat_emel                  = $request -> input('stat_emel');
        $updated_by                 = $request -> input('updated_by');

        $data = [
            'nama'                      => $nama,
            'stat_nama'                 => $stat_nama,
            'no_kad_pengenalan'         => $no_kad_pengenalan,
            'stat_no_kad_pengenalan'    => $stat_no_kad_pengenalan,
            'gred'                      => $gred,
            'stat_gred'                 => $stat_gred,
            'jawatan'                   => $jawatan,
            'stat_jawatan'              => $stat_jawatan,
            'no_angka_giliran'          => $no_angka_giliran,
            'stat_no_angka_giliran'     => $stat_no_angka_giliran,
            'emel'                      => $emel,
            'stat_emel'                 => $stat_emel,
            'updated_by'                => $updated_by

        ];

        $obj = pen_muka_depan::where('pen_muka_depan.id_muka_depan',$id) -> 
            where('nama',$nama)->
            where('stat_nama',$stat_nama)->
            where('no_kad_pengenalan',$no_kad_pengenalan)->
            where('stat_no_kad_pengenalan',$stat_no_kad_pengenalan)->
            where('gred',$gred)->
            where('stat_gred',$stat_gred)->
            where('jawatan',$jawatan)->
            where('stat_jawatan',$stat_jawatan)->
            where('no_angka_giliran',$no_angka_giliran)->
            where('stat_no_angka_giliran',$stat_no_angka_giliran)->
            where('emel',$emel)->
            where('stat_emel',$stat_emel)->
            where('updated_by',$updated_by)->
            first();

        if($obj){
            return response()->json([
                'success'=>true,
                'message'=>'Kemaskini Rekod Berjaya!',
                'data'=>$obj,
                // 'token'=>$token
            ],201);
        }else{
            $obj = pen_muka_depan::where('pen_muka_depan.id_muka_depan',$id) -> update($data);
    
            if($obj){
                // $token = $this->getToken($updated_by);
    
                return response()->json([
                    'success'=>true,
                    'message'=>'Kemaskini Rekod Berjaya!',
                    'data'=>$obj,
                    // 'token'=>$token
                ],201);
    
            }else{
                
                return response()->json([
                    'success'=>false,
                    'message'=>'Bad Request',
                    'data'=>''
                ],400);
            }
        }
        
    }

}
