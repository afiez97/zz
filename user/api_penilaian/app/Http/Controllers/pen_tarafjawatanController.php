<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_tarafjawatan;

class pen_tarafjawatanController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    public function register(Request $request) {
        $nama_tarafjawatan = $request->input('nama_tarafjawatan');
        $created_by = $request->input('created_by');
        $updated_by = $request->input('updated_by');
        $statusrekod = $request->input('statusrekod');

        $register = pen_tarafjawatan::create([
            'nama_tarafjawatan' => $nama_tarafjawatan,
            'created_by' => $created_by,
            'updated_by' => $updated_by,
            'statusrekod' => $statusrekod
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
                'message'=>'Bad Request',
                'data'=>$register
            ],400);
        }
    }

    public function show(Request $request)  {
        $id = $request->input('id_tarafjawatan');

        $pen_tarafjawatan = pen_tarafjawatan::where('id_tarafjawatan',$id)->first();

        if ($pen_tarafjawatan)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Show Success!',
                'data'=>$pen_tarafjawatan
            ],200);
        }
    }

    public function showHrmis(Request $request)  {
        $nama_tarafjawatan = $request->input('nama_tarafjawatan');

        $pen_tarafjawatan = pen_tarafjawatan::where('nama_tarafjawatan',$nama_tarafjawatan)->first();

        if ($pen_tarafjawatan)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Show Success!',
                'data'=>$pen_tarafjawatan
            ],200);
        }
    }

    public function list()  {
        $pen_tarafjawatan = pen_tarafjawatan::where('statusrekod','1') -> get();

        if ($pen_tarafjawatan)   {
            return response()->json([
                'success'=>'true',
                'message'=>'List Success!',
                'data'=>$pen_tarafjawatan
            ],200);
        }
        
    }

    public function update(Request $request)    {
        $id = $request->input('id_tarafjawatan');
        $nama_tarafjawatan = $request->input('nama_tarafjawatan');
        $updated_by = $request->input('updated_by');

        $pen_tarafjawatan = pen_tarafjawatan::find($id); 

        $pen_tarafjawatan -> update([
            'nama_tarafjawatan' => $nama_tarafjawatan,
            'updated_by' => $updated_by
        ]);

        if ($pen_tarafjawatan)  {
            return response()->json([
                'success'=>true,
                'message'=>"Kemaskini Berjaya!",
                'data' => $pen_tarafjawatan
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
        $id = $request->input('id_tarafjawatan');

        $pen_tarafjawatan = pen_tarafjawatan::find($id); 

        $pen_tarafjawatan -> update([
            'statusrekod' => '0',
        ]);

        if ($pen_tarafjawatan)  {
            return response()->json([
                'success'=>true,
                'message'=>"Berjaya Padam!",
                'data' => $pen_tarafjawatan
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
