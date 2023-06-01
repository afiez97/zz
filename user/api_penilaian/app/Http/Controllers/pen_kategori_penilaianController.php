<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_users;
use App\Models\pen_kategori_penilaian;
use Illuminate\Support\Facades\File;

class pen_kategori_penilaianController extends Controller
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
        $nama_kategori_penilaian = $request->input('nama_kategori_penilaian');
        $created_by = $request->input('created_by');
        $updated_by = $request->input('created_by');

        $obj = pen_kategori_penilaian::create([
            'nama_kategori_penilaian' => $nama_kategori_penilaian,
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
        $id = $request->input('id_kategori_penilaian');

        $obj = pen_kategori_penilaian::where('id_kategori_penilaian',$id)-> first();

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
        $obj = pen_kategori_penilaian::where('statusrekod','1') -> get();

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
        $obj = pen_kategori_penilaian::get();

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

    //UPDATE WITH IMAGE
    // public function update(Request $request)    {
    //     $id = $request->input('id_kategori_penilaian');
    //     $nama_kategori_penilaian = $request->input('nama_kategori_penilaian');
    //     $default_logo = $request->input('default_logo');
    //     $new_default_logo = $request->file('new_default_logo');
    //     $updated_by = $request->input('updated_by');
    //     // dd($new_default_logo);
    //     if($new_default_logo != null){
    //         $new_default_logo = $request->file('new_default_logo')->getClientOriginalName();
            
    //         $new_default_logo = $nama_kategori_penilaian . $new_default_logo;

    //         $path = 'kategori_penilaian/';
    //         $destinationPath = $path; // upload path
    //         $request->file('new_default_logo')->move($destinationPath, $new_default_logo);
    //         $default_logo = $new_default_logo;
    //     }

    //     // $pen_kategori_penilaian = pen_kategori_penilaian::find($id); 

    //     $obj = pen_kategori_penilaian::where('id_kategori_penilaian',$id)  -> update([
    //         'nama_kategori_penilaian' => $nama_kategori_penilaian,
    //         'default_logo' => $default_logo,
    //         'updated_by' => $updated_by
    //     ]);

    //     if ($obj)  {
    //         return response()->json([
    //             'success'=>true,
    //             'message'=>"Kemaskini Berjaya!",
    //             'data' => $obj,
    //         ],200);
    //     }
    //     else{
    //         return response()->json([
    //             'success'=>false,
    //             'message'=>"Kemaskini Gagal!",
    //             'data'=>''
    //         ],404);
    //     }
    // }

    public function update(Request $request)    {
        $id = $request->input('id_kategori_penilaian');
        $nama_kategori_penilaian = $request->input('nama_kategori_penilaian');
        // $default_logo = $request->input('default_logo');
        // $new_default_logo = $request->file('new_default_logo');
        $updated_by = $request->input('updated_by');
        // dd($new_default_logo);
        // if($new_default_logo != null){
        //     $new_default_logo = $request->file('new_default_logo')->getClientOriginalName();
            
        //     $new_default_logo = $nama_kategori_penilaian . $new_default_logo;

        //     $path = 'kategori_penilaian/';
        //     $destinationPath = $path; // upload path
        //     $request->file('new_default_logo')->move($destinationPath, $new_default_logo);
        //     $default_logo = $new_default_logo;
        // }

        // $pen_kategori_penilaian = pen_kategori_penilaian::find($id); 

        $obj = pen_kategori_penilaian::where('id_kategori_penilaian',$id)  -> update([
            'nama_kategori_penilaian' => $nama_kategori_penilaian,
            // 'default_logo' => $default_logo,
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
        $id = $request->input('id_kategori_penilaian');

        // $pen_kategori_penilaian = pen_kategori_penilaian::find($id); 
        $obj_search = pen_kategori_penilaian::where('id_kategori_penilaian',$id)->first(); 
        switch($obj_search->statusrekod)    {
            case 0: $obj = pen_kategori_penilaian::where('id_kategori_penilaian',$id) -> update([
                        'statusrekod' => '1',
                    ]);
                    break;
            case 1: $obj = pen_kategori_penilaian::where('id_kategori_penilaian',$id) -> update([
                        'statusrekod' => '0',
                    ]);
                    break;
        }
        $obj_search = pen_kategori_penilaian::where('id_kategori_penilaian',$id)->first();

        if ($obj)  {
            return response()->json([
                'success'=>true,
                'message'=>"Berjaya Padam!",
                'data' => $obj_search
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
