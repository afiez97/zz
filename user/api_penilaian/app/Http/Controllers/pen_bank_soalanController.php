<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_bank_soalan;
use App\Models\pen_users;

class pen_bank_soalanController extends Controller
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
        $FK_penilaian = $request->input('FK_penilaian');
        $jenis_soalan = $request->input('jenis_soalan');
        $topik = $request->input('topik');
        $tahap = $request->input('tahap');
        $soalan = $request->input('soalan');
        $jawapan = $request->input('jawapan');
        $skema = $request->input('skema');
        $mark = $request->input('markah');
        $display_mark = $request->input('display_mark');
        $FK_infodetails = $request->input('FK_infodetails');
        $created_by = $request->input('created_by');

        
        $data = [
            'kod_soalan' => $jenis_soalan.date('Yis').strtoupper(Str::random(4)),
            'FK_penilaian' => $FK_penilaian,
            'FK_jenis_soalan' => $jenis_soalan,
            'topik' => $topik,
            'tahap' => $tahap,
            'soalan' => $soalan,
            'jawapan' => $jawapan,
            'skema' => $skema,
            'mark' => $mark,
            'display_mark' => $display_mark,
            'FK_infodetail' => $FK_infodetails,
            'created_by' => $created_by,
        ];
        $obj = pen_bank_soalan::create($data);

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Daftar Berjaya!',
                'data'=>$obj,
            ],201);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Create Failed!',
                'data'=>''
            ],401);
        } 
    }

    public function listByInfodetail($id){
        
        $obj = pen_bank_soalan::join('pen_jenis_soalan','id_jenis_soalan','FK_jenis_soalan')
        ->where('FK_infodetail',$id)->get([
            'pen_bank_soalan.kod_soalan',
            'pen_bank_soalan.PK_bank_soalan',
            'pen_jenis_soalan.jenis_soalan',
            'pen_bank_soalan.topik',
            'pen_bank_soalan.tahap',
            'pen_bank_soalan.soalan',
            'pen_bank_soalan.jawapan',
            'pen_bank_soalan.skema',
        ]);

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Daftar Berjaya!',
                'data'=>$obj,
            ],201);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Create Failed!',
                'data'=>''
            ],404);
        }
    }

    public function update(Request $request){
        $FK_penilaian = $request->input('FK_penilaian');
        $kod_soalan = $request->input('kod_soalan_upt');
        $jenis_soalan = $request->input('jenis_soalan');
        $topik = $request->input('topik');
        $tahap = $request->input('tahap');
        $soalan = $request->input('soalan');
        $jawapan = $request->input('jawapan');
        $skema = $request->input('skema');
        $mark = $request->input('markah');
        $display_mark = $request->input('display_mark');
        $FK_infodetails = $request->input('FK_infodetails');
        $created_by = $request->input('created_by');

        
        $data = [
            'FK_penilaian' => $FK_penilaian,
            'FK_jenis_soalan' => $jenis_soalan,
            'topik' => $topik,
            'tahap' => $tahap,
            'soalan' => $soalan,
            'jawapan' => $jawapan,
            'skema' => $skema,
            'mark' => $mark,
            'display_mark' => $display_mark,
            'FK_infodetail' => $FK_infodetails,
            'created_by' => $created_by,
        ];
        $obj = pen_bank_soalan::where('kod_soalan',$kod_soalan)->update($data);

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Daftar Berjaya!',
                'data'=>$obj,
            ],201);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Create Failed!',
                'data'=>''
            ],401);
        }         
    }

    public function show(Request $request){
        
        $PK_bank_soalan = $request->input('PK_bank_soalan');

        $obj = pen_bank_soalan::join('pen_jenis_soalan','id_jenis_soalan','FK_jenis_soalan')
        ->where('PK_bank_soalan',$PK_bank_soalan)
        ->first([
            'pen_bank_soalan.kod_soalan',
            'pen_bank_soalan.PK_bank_soalan',
            'pen_bank_soalan.FK_jenis_soalan',
            'pen_jenis_soalan.jenis_soalan',
            'pen_bank_soalan.topik',
            'pen_bank_soalan.tahap',
            'pen_bank_soalan.soalan',
            'pen_bank_soalan.jawapan',
            'pen_bank_soalan.skema',
            'pen_bank_soalan.mark',
        ]);

        if ($obj)   {
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

    public function list($id){
        $id_penilaian = $id;
        $obj = pen_bank_soalan::
        join('pen_jenis_soalan','id_jenis_soalan','FK_jenis_soalan')
        ->where('FK_penilaian',$id_penilaian)
        ->get([
            'pen_bank_soalan.kod_soalan',
            'pen_bank_soalan.PK_bank_soalan',
            'pen_bank_soalan.FK_infodetail',
            'pen_jenis_soalan.jenis_soalan',
            'pen_bank_soalan.topik',
            'pen_bank_soalan.tahap',
            'pen_bank_soalan.soalan',
            'pen_bank_soalan.jawapan',
            'pen_bank_soalan.skema',
        ]);
        if ($obj)   {
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

    public function deselectList(Request $request){

        $id_penilaian = $request->input('id_penilaian');
        $id_siri_penilaian = $request->input('id_siri_penilaian');

        $obj = pen_bank_soalan::
        leftjoin('pen_siri_soalan','pen_siri_soalan.PK_bank_soalan','pen_bank_soalan.PK_bank_soalan')->
        join('pen_jenis_soalan','pen_jenis_soalan.id_jenis_soalan','pen_bank_soalan.FK_jenis_soalan')->
        where('pen_bank_soalan.FK_penilaian','=',$id_penilaian)->
        where('pen_siri_soalan.FK_siri_penilaian','=',$id_siri_penilaian)->
        get([
            'pen_bank_soalan.kod_soalan',
            'pen_bank_soalan.PK_bank_soalan',
            'pen_bank_soalan.FK_infodetail',
            'pen_jenis_soalan.jenis_soalan',
            'pen_bank_soalan.topik',
            'pen_bank_soalan.tahap',
            'pen_bank_soalan.soalan',
            'pen_bank_soalan.jawapan',
            'pen_bank_soalan.skema',
            'pen_siri_soalan.FK_siri_penilaian',
        ]);

        // dd($obj);
        
        if ($obj)   {
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

    public function listNoInfodetails($id){
        $id_penilaian = $id;
        $obj = pen_bank_soalan::
        join('pen_jenis_soalan','id_jenis_soalan','FK_jenis_soalan')
        ->where('FK_penilaian',$id_penilaian)
        ->whereNull('FK_infodetail')
        ->get([
            'pen_bank_soalan.kod_soalan',
            'pen_bank_soalan.PK_bank_soalan',
            'pen_bank_soalan.FK_infodetail',
            'pen_jenis_soalan.jenis_soalan',
            'pen_bank_soalan.topik',
            'pen_bank_soalan.tahap',
            'pen_bank_soalan.soalan',
            'pen_bank_soalan.jawapan',
            'pen_bank_soalan.skema',
        ]);
        if ($obj)   {
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

    // public function listInfodetails($id){
    //     $id_penilaian = $id;
    //     $obj = pen_bank_soalan::
    //     join('pen_jenis_soalan','id_jenis_soalan','FK_jenis_soalan')
    //     ->where('FK_penilaian',$id_penilaian)
    //     ->whereNull('FK_infodetail')
    //     ->get([
    //         'pen_bank_soalan.kod_soalan',
    //         'pen_bank_soalan.PK_bank_soalan',
    //         'pen_jenis_soalan.jenis_soalan',
    //         'pen_bank_soalan.topik',
    //         'pen_bank_soalan.tahap',
    //         'pen_bank_soalan.soalan',
    //         'pen_bank_soalan.jawapan',
    //         'pen_bank_soalan.skema',
    //     ]);
    //     if ($obj)   {
    //         return response()->json([
    //             'success'=>true,
    //             'message'=>'Paparan Data Berjaya!',
    //             'data'=>$obj
    //         ],200);
    //     } else{
    //         return response()->json([
    //             'success'=>false,
    //             'message'=>'Paparan Data Tiada!',
    //             'data'=>''
    //         ],400);
    //     }
    // }

    public function delete(Request $request){
        
    }
}
