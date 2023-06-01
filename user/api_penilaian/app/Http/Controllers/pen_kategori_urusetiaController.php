<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_users;
use App\Models\pen_kategori_urusetia;

class pen_kategori_urusetiaController extends Controller
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
        $nama_kategori_urusetia = $request->input('nama_kategori_urusetia');
        $polisi_capaian = $request->input('polisi_capaian');
        $created_by = $request->input('created_by');
        $updated_by = $request->input('updated_by');

        $obj = pen_kategori_urusetia::create([
            'nama_kategori_urusetia' => $nama_kategori_urusetia,
            'polisi_capaian' => $polisi_capaian,
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
        $id = $request->input('id_kategori_urusetia');

        $obj = pen_kategori_urusetia::where('id_kategori_urusetia',$id)->first();

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
        $obj = pen_kategori_urusetia::where('statusrekod','1') -> get();

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
        $obj = pen_kategori_urusetia::get();

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
        $id = $request->input('id_kategori_urusetia');
        $nama_kategori_urusetia = $request->input('nama_kategori_urusetia');
        $polisi_capaian = $request->input('polisi_capaian');
        $updated_by = $request->input('updated_by');

        // $pen_kategori_urusetia = pen_kategori_urusetia::find($id); 

        $obj = pen_kategori_urusetia::where('id_kategori_urusetia',$id)  -> update([
            'nama_kategori_urusetia' => $nama_kategori_urusetia,
            'polisi_capaian' => $polisi_capaian,
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

    public function delete(Request $request)    {
        $id = $request->input('id_kategori_urusetia');
        $updated_by = $request->input('updated_by');

        // $pen_kategori_urusetia = pen_kategori_urusetia::find($id); 
        $obj_search = pen_kategori_urusetia::where('id_kategori_urusetia',$id)->first(); 
        switch($obj_search->statusrekod)    {
            case 0: $obj = pen_kategori_urusetia::where('id_kategori_urusetia',$id) -> update([
                        'statusrekod' => '1',
                        'updated_by' => $updated_by
                    ]);
                    break;
            case 1: $obj = pen_kategori_urusetia::where('id_kategori_urusetia',$id) -> update([
                        'statusrekod' => '0',
                        'updated_by' => $updated_by
                    ]);
                    break;
        }
        $obj_search = pen_kategori_urusetia::where('id_kategori_urusetia',$id)->first();

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
