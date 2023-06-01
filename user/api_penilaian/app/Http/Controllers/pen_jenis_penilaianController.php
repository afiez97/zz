<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_users;
use App\Models\pen_jenis_penilaian;
use Illuminate\Support\Facades\File;

class pen_jenis_penilaianController extends Controller
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

    public function register(Request $request) {
        $nama_jenis_penilaian = $request->input('nama_jenis_penilaian');
        $mod_jenis_penilaian = $request->input('mod_jenis_penilaian');
        $statusrekod = $request->input('statusrekod');
        $created_by = $request->input('created_by');
        $updated_by = $request->input('updated_by');

        $obj = pen_jenis_penilaian::create([
            'nama_jenis_penilaian' => $nama_jenis_penilaian,
            'mod_jenis_penilaian' => $mod_jenis_penilaian,
            'statusrekod' => $statusrekod,
            'created_by' => $created_by,
            'updated_by' => $updated_by
        ]);

        if ($obj)  {
            return response()->json([
                'success'=>true,
                'message'=>'Pendaftaran Rekod Berjaya!',
                'data'=>$obj
            ],201);
        } else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
    }

    public function show(Request $request)  {
        $id = $request->input('id_jenis_penilaian');

        $obj = pen_jenis_penilaian::where('id_jenis_penilaian',$id)-> first();

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Show Success!',
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

    public function list()  {
        $obj = pen_jenis_penilaian::where('statusrekod','1') -> get();

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

    public function listAll()  {
        $obj = pen_jenis_penilaian::get();

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

    public function update(Request $request)    {
        $id = $request->input('id_jenis_penilaian');
        $nama_jenis_penilaian = $request->input('nama_jenis_penilaian');
        $mod_jenis_penilaian = $request->input('mod_jenis_penilaian');
        $updated_by = $request->input('updated_by');

        $obj = pen_jenis_penilaian::where('id_jenis_penilaian',$id)  -> update([
            'nama_jenis_penilaian' => $nama_jenis_penilaian,
            'mod_jenis_penilaian' => $mod_jenis_penilaian,
            'updated_by' => $updated_by
        ]);

        if ($obj)  {
            return response()->json([
                'success'=>true,
                'message'=>"Kemaskini Berjaya!",
                'data' => $obj,
            ],200);
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>"Kemaskini Gagal!",
                'data'=>''
            ],404);
        }
    }

    public function chgmod(Request $request)    {
        $id = $request->input('id_jenis_penilaian');
        $updated_by = $request->input('updated_by');

        // $pen_jenis_penilaian = pen_jenis_penilaian::find($id); 
        $obj_search = pen_jenis_penilaian::where('id_jenis_penilaian',$id)->first(); 
        switch($obj_search->mod_jenis_penilaian)    {
            case 'offline': $obj = pen_jenis_penilaian::where('id_jenis_penilaian',$id) -> update([
                            'mod_jenis_penilaian' => 'online',
                            'updated_by' => $updated_by
                            ]);
                            break;
            case 'online':  $obj = pen_jenis_penilaian::where('id_jenis_penilaian',$id) -> update([
                            'mod_jenis_penilaian' => 'offline',
                            'updated_by' => $updated_by
                            ]);
                            break;
        }
        $obj_search = pen_jenis_penilaian::where('id_jenis_penilaian',$id)->first();

        if ($obj)  {
            return response()->json([
                'success'=>true,
                'message'=>"Berjaya Padam!",
                'data' => $obj_search,
            ],200);
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>"Gagal Padam!",
                'data'=>''
            ],404);
        }
    }

    public function delete(Request $request)    {
        $id = $request->input('id_jenis_penilaian');
        $updated_by = $request->input('updated_by');

        // $pen_jenis_penilaian = pen_jenis_penilaian::find($id); 
        $obj_search = pen_jenis_penilaian::where('id_jenis_penilaian',$id)->first(); 
        switch($obj_search->statusrekod)    {
            case 0: $obj = pen_jenis_penilaian::where('id_jenis_penilaian',$id) -> update([
                        'statusrekod' => '1',
                        'updated_by' => $updated_by
                    ]);
                    break;
            case 1: $obj = pen_jenis_penilaian::where('id_jenis_penilaian',$id) -> update([
                        'statusrekod' => '0',
                        'updated_by' => $updated_by
                    ]);
                    break;
        }
        $obj_search = pen_jenis_penilaian::where('id_jenis_penilaian',$id)->first();

        if ($obj)  {
            return response()->json([
                'success'=>true,
                'message'=>"Berjaya Padam!",
                'data' => $obj_search,
            ],200);
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>"Gagal Padam!",
                'data'=>''
            ],404);
        }
    }
}
