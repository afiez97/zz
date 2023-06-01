<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_kat_agensi;

class pen_kat_agensiController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    public function register(Request $request) {
        $nama_kat_agensi = $request->input('nama_kat_agensi');
        $kod_kat_agensi = $request->input('kod_kat_agensi');
        $created_by = $request->input('created_by');
        $updated_by = $request->input('updated_by');
        $statusrekod = $request->input('statusrekod');

        $register = pen_kat_agensi::create([
            'nama_kat_agensi' => $nama_kat_agensi,
            'kod_kat_agensi' => $kod_kat_agensi,
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
                'message'=>'Tak Jadi Boss',
                'data'=>$register
            ],405);
        }
    }

    public function show(Request $request)  {
        $id = $request->input('id_kat_agensi');

        $pen_kat_agensi = pen_kat_agensi::where('id_kat_agensi',$id)->first();

        if ($pen_kat_agensi)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$pen_kat_agensi
            ],201);
        }
    }

    public function showNama(Request $request)  {
        $nama_kat_agensi = $request->input('nama_kat_agensi');

        $pen_kat_agensi = pen_kat_agensi::where('nama_kat_agensi',$nama_kat_agensi)->first();

        if ($pen_kat_agensi)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$pen_kat_agensi
            ],201);
        }
    }

    public function showKod(Request $request)  {
        $kod_kat_agensi = $request->input('kod_kat_agensi');

        $pen_kat_agensi = pen_kat_agensi::where('kod_kat_agensi',$kod_kat_agensi)->where('statusrekod','1')->first();

        if ($pen_kat_agensi)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$pen_kat_agensi
            ],201);
        } else  {
            return response()->json([
                'success'=>false,
                'message'=>'List Failed!',
                'data'=>''
            ],404);
        }
    }

    public function list()  {
        $pen_kat_agensi = pen_kat_agensi::where('pen_kat_agensi.statusrekod','1') -> get(); // list all data

        if ($pen_kat_agensi)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$pen_kat_agensi
            ],200);
        } else  {
            return response()->json([
                'success'=>false,
                'message'=>'List Failed!',
                'data'=>''
            ],404);
        }
        
    }

    public function update(Request $request)    {
        $id = $request->input('id');
        $nama_kat_agensi = $request->input('nama_kat_agensi');
        $updated_by = $request->input('updated_by');

        $pen_kat_agensi = pen_kat_agensi::find($id); 

        $pen_kat_agensi -> update([
            'nama_kat_agensi' => $nama_kat_agensi,
            'updated_by' => $updated_by
        ]);

        if ($pen_kat_agensi)  {
            return response()->json([
                'success'=>true,
                'message'=>"Kemaskini Berjaya!",
                'data' => $pen_kat_agensi
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
        $id = $request->input('id_kat_agensi');

        $pen_kat_agensi = pen_kat_agensi::find($id); 
        
        $pen_kat_agensi -> update([
            'statusrekod' => '0',
        ]);

        if ($pen_kat_agensi)  {
            return response()->json([
                'success'=>true,
                'message'=>"Berjaya Padam!",
                'data' => $pen_kat_agensi
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
