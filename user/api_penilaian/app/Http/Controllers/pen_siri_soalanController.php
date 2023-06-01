<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_bank_soalan;
use App\Models\pen_siri_soalan;
use App\Models\pen_users;

class pen_siri_soalanController extends Controller
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
        $id_bank_soalan = $request->input('id_bank_soalan');
        $id_siri_penilaian = $request->input('id_siri_penilaian');
        
        $obj = pen_bank_soalan::where('PK_bank_soalan',$id_bank_soalan)->first();
        $data = [
            'kod_soalan' => $obj->kod_soalan,
            'PK_bank_soalan' => $obj->PK_bank_soalan,
            'FK_penilaian' => $obj->FK_penilaian,
            'FK_siri_penilaian' => $id_siri_penilaian,
            'FK_jenis_soalan' => $obj->FK_jenis_soalan,
            'topik' => $obj->topik,
            'tahap' => $obj->tahap,
            'soalan' => $obj->soalan,
            'jawapan' => $obj->jawapan,
            'skema' => $obj->skema,
            'mark' => $obj->mark,
            'display_mark' => $obj->display_mark,
            'FK_infodetail' => $obj->FK_infodetail,
            'created_by' => $obj->created_by,            
        ];
        $obj = pen_siri_soalan::create($data);
        
        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Tambah Soalan Berjaya!',
                'data'=>$obj
            ],201);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Tambah Soalan Gagal!',
                'data'=>''
            ],401);
        }

    }

    public function create_new(Request $request){
        $FK_penilaian = $request->input('FK_penilaian');
        $FK_siri_penilaian = $request->input('FK_siri_penilaian');
        $jenis_soalan = $request->input('jenis_soalan');
        $topik = $request->input('topik');
        $tahap = $request->input('tahap');
        $soalan = $request->input('soalan');
        $jawapan = $request->input('jawapan');
        $skema = $request->input('skema');
        $mark = $request->input('mark');
        $display_mark = $request->input('display_mark');
        $FK_infodetail = $request->input('FK_infodetail');
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
            'FK_infodetail' => $FK_infodetail,
            'created_by' => $created_by,
        ];

        $obj = pen_bank_soalan::create($data);

        $PK_bank_soalan = $obj->id;

        if ($obj)   {
            $obj = pen_bank_soalan::where('PK_bank_soalan',$PK_bank_soalan)->first();
            $data = [
                'kod_soalan' => $obj->kod_soalan,
                'PK_bank_soalan' => $obj->PK_bank_soalan,
                'FK_penilaian' => $obj->FK_penilaian,
                'FK_siri_penilaian' => $FK_siri_penilaian,
                'FK_jenis_soalan' => $obj->FK_jenis_soalan,
                'topik' => $obj->topik,
                'tahap' => $obj->tahap,
                'soalan' => $obj->soalan,
                'jawapan' => $obj->jawapan,
                'skema' => $obj->skema,
                'mark' => $obj->mark,
                'display_mark' => $obj->display_mark,
                'FK_infodetail' => $obj->FK_infodetail,
                'created_by' => $obj->created_by,            
            ];
            $obj = pen_siri_soalan::create($data);
            if ($obj)   {
                return response()->json([
                    'success'=>true,
                    'message'=>'Tambah Siri Soalan Berjaya!',
                    'data'=>$obj
                ],201);
            } else{
                return response()->json([
                    'success'=>false,
                    'message'=>'Tambah Siri Soalan Gagal!',
                    'data'=>''
                ],401);
            }          
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Create Failed!',
                'data'=>''
            ],401);
        } 
    }

    public function updateMasa(Request $request){
        
        $id = $request -> input('PK_siri_soalan');
        $saat_menjawab = $request -> input('saat_menjawab');
        $updated_by = $request -> input('created_by');

        $obj = pen_siri_soalan::where('PK_siri_soalan',$id)  -> update([
            'saat_menjawab' => $saat_menjawab,
            'updated_by' => $updated_by

        ]);
        
        // $id = $obj -> PK_siri_soalan;

        if($obj){
        // dd('mana = '.$updated_by);

            // $token = $this->getToken($updated_by);
            return response()->json([
                'success'=>true,
                'message'=>'Kemaskini Rekod Berjaya!',
                'data'=>$obj,
                // 'token'=>$token
            ],201);

        }else{
            // dd('lahh');
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
    }

    public function updateMark(Request $request){
        
        $id = $request -> input('PK_siri_soalan');
        $mark = $request -> input('mark');

        $obj = pen_siri_soalan::where('PK_siri_soalan',$id)  -> update([
            'mark' => $mark 
        ]);

        if($obj){
            return response()->json([
                'success'=>true,
                'message'=>'Kemaskini Rekod Berjaya!',
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

    public function updateSkema(Request $request){
        
        $id = $request -> input('PK_siri_soalan');
        $skema = $request -> input('skema');

        $obj = pen_siri_soalan::where('PK_siri_soalan',$id)  -> update([
            'skema' => $skema 
        ]);

        if($obj){
            return response()->json([
                'success'=>true,
                'message'=>'Kemaskini Rekod Berjaya!',
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

    public function show(Request $request){
        $PK_siri_soalan = $request->input('PK_siri_soalan');

        // dd($PK_siri_soalan);
        $obj = pen_siri_soalan::
        join('pen_jenis_soalan','id_jenis_soalan','FK_jenis_soalan')
        ->leftjoin('pen_infodetails','id_infodetails','FK_infodetail')
        ->where('pen_siri_soalan.PK_siri_soalan',$PK_siri_soalan)
        ->first(
            [
            'pen_siri_soalan.kod_soalan',
            'pen_siri_soalan.PK_siri_soalan',
            'pen_siri_soalan.FK_jenis_soalan',
            'pen_jenis_soalan.jenis_soalan',
            'pen_siri_soalan.FK_jenis_soalan',
            'pen_siri_soalan.topik',
            'pen_siri_soalan.mark',
            'pen_siri_soalan.tahap',
            'pen_siri_soalan.soalan',
            'pen_siri_soalan.jawapan',
            'pen_siri_soalan.skema',
            'pen_siri_soalan.FK_infodetail',
            'pen_infodetails.teks',
        ]
    );

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

    public function listAllSoalan(Request $request){
        $json_list_soalan = $request->input('json_list_soalan');
        $arr_json_list_soalan = json_decode($json_list_soalan);

        $obj = pen_siri_soalan::
        join('pen_jenis_soalan','id_jenis_soalan','FK_jenis_soalan')
        ->leftjoin('pen_infodetails','id_infodetails','FK_infodetail');
        
        $obj = $obj -> where(function($q) use($arr_json_list_soalan){
            for($i=0;$i<count($arr_json_list_soalan);$i++){
                $q->orWhere('PK_siri_soalan',$arr_json_list_soalan[$i]->PK_siri_soalan);
            }
        });

        $obj = $obj -> get([
            'pen_siri_soalan.kod_soalan',
            'pen_siri_soalan.PK_siri_soalan',
            'pen_siri_soalan.FK_jenis_soalan',
            'pen_jenis_soalan.jenis_soalan',
            'pen_siri_soalan.FK_jenis_soalan',
            'pen_siri_soalan.topik',
            'pen_siri_soalan.tahap',
            'pen_siri_soalan.soalan',
            'pen_siri_soalan.jawapan',
            'pen_siri_soalan.skema',
            'pen_siri_soalan.mark',
            'pen_siri_soalan.FK_infodetail',
            'pen_infodetails.teks',
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

    public function showInfodetails(Request $request){
        $FK_infodetail = $request->input('FK_infodetail');

        $obj = pen_siri_soalan::
        join('pen_jenis_soalan','id_jenis_soalan','FK_jenis_soalan')
        ->where('FK_infodetail',$FK_infodetail)
        ->get([
            'pen_siri_soalan.kod_soalan',
            'pen_siri_soalan.PK_siri_soalan',
            'pen_siri_soalan.FK_jenis_soalan',
            'pen_siri_soalan.FK_siri_penilaian',
            'pen_jenis_soalan.jenis_soalan',
            'pen_siri_soalan.FK_jenis_soalan',
            'pen_siri_soalan.topik',
            'pen_siri_soalan.tahap',
            'pen_siri_soalan.soalan',
            'pen_siri_soalan.jawapan',
            'pen_siri_soalan.skema',
            'pen_siri_soalan.FK_infodetail',
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
        $id_siri_penilaian = $id;
        $obj = pen_siri_soalan::
        join('pen_jenis_soalan','id_jenis_soalan','FK_jenis_soalan')
        ->where('FK_siri_penilaian',$id_siri_penilaian)
        ->get([
            'pen_siri_soalan.kod_soalan',
            'pen_siri_soalan.PK_siri_soalan',
            'pen_jenis_soalan.jenis_soalan',
            'pen_siri_soalan.topik',
            'pen_siri_soalan.tahap',
            'pen_siri_soalan.soalan',
            'pen_siri_soalan.jawapan',
            'pen_siri_soalan.skema',
            'pen_siri_soalan.FK_infodetail',
            'pen_siri_soalan.saat_menjawab',
            'pen_siri_soalan.PK_bank_soalan',
        ]);

        // dd($obj);
        if (sizeof($obj) > 0)   {
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

    public function listRandom  (Request $request){
        $id_siri_penilaian = $request->input('id_siri_penilaian');
        $limit = $request->input('limit');
        $obj = pen_siri_soalan::
        join('pen_jenis_soalan','id_jenis_soalan','FK_jenis_soalan')
        ->where('FK_siri_penilaian',$id_siri_penilaian)
        ->orderBy(DB::raw('RAND()'))
        ->take($limit)
        ->get([
            'pen_siri_soalan.kod_soalan',
            'pen_siri_soalan.PK_siri_soalan',
            'pen_jenis_soalan.jenis_soalan',
            'pen_siri_soalan.topik',
            'pen_siri_soalan.tahap',
            'pen_siri_soalan.soalan',
            'pen_siri_soalan.jawapan',
            'pen_siri_soalan.skema',
            'pen_siri_soalan.FK_infodetail',
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

    public function delete(Request $request){
        $FK_siri_penilaian = $request->input('FK_siri_penilaian');
        $PK_siri_soalan = $request->input('PK_siri_soalan');

        $obj = pen_siri_soalan::where('PK_siri_soalan',$PK_siri_soalan)
                                ->where('FK_siri_penilaian',$FK_siri_penilaian)
                                ->delete();
        
        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Padam Rekod Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Padam Rekod Tiada!',
                'data'=>''
            ],400);
        }
    }

    public function delete_infodetails(Request $request){
        $FK_infodetail = $request->input('FK_infodetail');
        $PK_siri_soalan = $request->input('FK_siri_penilaian');

        // dd($FK_infodetail.'~'.$PK_siri_soalan);

        $obj = pen_siri_soalan::where('FK_infodetail',$FK_infodetail)
                                ->where('FK_siri_penilaian',$PK_siri_soalan)
                                ->delete();
        
        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Padam Rekod Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Padam Rekod Tiada!',
                'data'=>''
            ],400);
        }
    }
}
