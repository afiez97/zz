<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_kluster;

class pen_klusterController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function register(Request $request) {
        $nama_kluster = $request->input('nama_kluster');
        $created_by = $request->input('created_by');
        $updated_by = $request->input('updated_by');

        $register = pen_kluster::create([
            'nama_kluster' => $nama_kluster,
            'created_by' => $created_by,
            'updated_by' => $updated_by
        ]);

        if ($register)  {
            return response()->json([
                'success'=>'true',
                'message'=>'Pendaftaran Rekod Berjaya!',
                'data'=>$register
            ],201);
        }

        else    {
            return response()->json([
                'success'=>'false',
                'message'=>'Tak Jadi Boss',
                'data'=>$register
            ],405);
        }
    }

    public function show(Request $request)  {
        $id = $request->input('id_kluster');

        $pen_kluster = pen_kluster::where('id_kluster',$id)->get();

        if ($pen_kluster)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$pen_kluster
            ],201);
        }
    }

    public function showGet($FK_kampus)  {
        // $id = $request->input('id_subkluster');

        $pen_kluster = pen_kluster::where('FK_kampus',$FK_kampus)->get();

        if ($pen_kluster)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$pen_kluster
            ],201);
        }
    }

    public function list()  {
        $pen_kluster = pen_kluster::where('statusrekod','1') -> get(); // list all data

        if (sizeof($pen_kluster) > 0)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$pen_kluster
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'List Failed!',
                'data'=>''
            ],404);
        }
        
    }

    public function update(Request $request)    {
        $id = $request->input('id_kluster');
        $nama_kluster = $request->input('nama_kluster');
        $updated_by = $request->input('updated_by');

        $pen_kluster = pen_kluster::find($id); 

        $pen_kluster -> update([
            'nama_kluster' => $nama_kluster,
            'updated_by' => $updated_by
        ]);

        if ($pen_kluster)  {
            return response()->json([
                'success'=>true,
                'message'=>"Kemaskini Berjaya!",
                'data' => $pen_kluster
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
        $id = $request->input('id_kluster');

        $pen_kluster = pen_kluster::find($id); 

        $pen_kluster -> update([
            'statusrekod' => '0',
        ]);

        if ($pen_kluster)  {
            return response()->json([
                'success'=>true,
                'message'=>"Berjaya Padam!",
                'data' => $pen_kluster
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
