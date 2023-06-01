<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_kategoriperkhidmatan;

class pen_kategoriperkhidmatanController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    public function register(Request $request) {
        $nama_kategoriperkhidmatan = $request->input('nama_kategoriperkhidmatan');
        $created_by = $request->input('created_by');
        $updated_by = $request->input('updated_by');
        $statusrekod = $request->input('statusrekod');

        $register = pen_kategoriperkhidmatan::create([
            'nama_kategoriperkhidmatan' => $nama_kategoriperkhidmatan,
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
        $id = $request->input('id_kategoriperkhidmatan');

        $pen_kategoriperkhidmatan = pen_kategoriperkhidmatan::where('id_kategoriperkhidmatan',$id)->first();

        if ($pen_kategoriperkhidmatan)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Show Success!',
                'data'=>$pen_kategoriperkhidmatan
            ],200);
        }
    }

    public function showHrmis(Request $request)  {
        $nama_kategoriperkhidmatan = $request->input('nama_kategoriperkhidmatan');

        $pen_kategoriperkhidmatan = pen_kategoriperkhidmatan::where('nama_kategoriperkhidmatan',$nama_kategoriperkhidmatan)->first();

        if ($pen_kategoriperkhidmatan)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Show Success!',
                'data'=>$pen_kategoriperkhidmatan
            ],200);
        }
    }

    public function list()  {
        $pen_kategoriperkhidmatan = pen_kategoriperkhidmatan::where('statusrekod','1') -> get();

        if ($pen_kategoriperkhidmatan)   {
            return response()->json([
                'success'=>'true',
                'message'=>'List Success!',
                'data'=>$pen_kategoriperkhidmatan
            ],200);
        }
        
    }

    public function update(Request $request)    {
        $id = $request->input('id_kategoriperkhidmatan');
        $nama_kategoriperkhidmatan = $request->input('nama_kategoriperkhidmatan');
        $updated_by = $request->input('updated_by');

        $pen_kategoriperkhidmatan = pen_kategoriperkhidmatan::find($id); 

        $pen_kategoriperkhidmatan -> update([
            'nama_kategoriperkhidmatan' => $nama_kategoriperkhidmatan,
            'updated_by' => $updated_by
        ]);

        if ($pen_kategoriperkhidmatan)  {
            return response()->json([
                'success'=>true,
                'message'=>"Kemaskini Berjaya!",
                'data' => $pen_kategoriperkhidmatan
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
        $id = $request->input('id_kategoriperkhidmatan');

        $pen_kategoriperkhidmatan = pen_kategoriperkhidmatan::find($id); 

        $pen_kategoriperkhidmatan -> update([
            'statusrekod' => '0',
        ]);

        if ($pen_kategoriperkhidmatan)  {
            return response()->json([
                'success'=>true,
                'message'=>"Berjaya Padam!",
                'data' => $pen_kategoriperkhidmatan
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
